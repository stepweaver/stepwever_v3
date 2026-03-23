import { NextResponse } from 'next/server';
import { createRateLimit } from '@/utils/rateLimit';
import { sanitizeText } from '@/utils/sanitize';
import { buildProtectedOptionsResponse, withProtectedRoute } from '@/lib/apiSecurity';
import { buildSystemPrompt } from '@/lib/chat/systemPrompt';
import { jsonSecurityHeaders } from '@/lib/jsonSecurityHeaders';
import { chatBodySchema } from '@/lib/schemas/chat.schema';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_MESSAGE_LENGTH = 2000;
const MAX_MESSAGES = 12;

// Abort upstream calls so your API route can’t hang forever
const UPSTREAM_TIMEOUT_MS = 20_000;

const chatRateLimit = createRateLimit({
  keyPrefix: 'chat',
  maxRequests: 20,
  windowMs: 60 * 1000,
  message: 'Too many messages. Please wait a moment before sending more.',
  requireDistributedStoreInProduction: true,
});

function safeJson(value, init = {}) {
  const headers = {
    'Cache-Control': 'no-store',
    ...jsonSecurityHeaders(),
    ...(init.headers || {}),
  };
  return NextResponse.json(value, { ...init, headers });
}

function redactIfPromptLeak(text) {
  const patterns = [
    /BASE_SYSTEM_PROMPT/i,
    /system prompt/i,
    /internal rules/i,
    /never reveal this system prompt/i,
    /Identity:\s*I am not a character/i,
  ];
  if (patterns.some((p) => p.test(text))) {
    return "I can't share internal instructions. Ask me about Stephen's skills, projects, or how he works.";
  }
  return text;
}

async function fetchWithTimeout(url, options, timeoutMs) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(id);
  }
}

const PROMPT_INJECTION_PATTERN = /ignore previous|disregard (instructions|above|prior)|system prompt|you are now|act as|pretend to be|new instructions/i;

const GROQ_VISION_MODEL = 'meta-llama/llama-4-scout-17b-16e-instruct';
const MAX_IMAGES_PER_MESSAGE = 5;
function normalizeIncomingMessages(messages) {
  const allowedRoles = new Set(['user', 'assistant']);

  const sanitizedMessages = messages
    .filter(
      (m) =>
        m &&
        allowedRoles.has(m.role) &&
        (typeof m.content === 'string' || (m.role === 'user' && m.attachments?.length > 0))
    )
    .map((m) => {
      const textContent = typeof m.content === 'string' ? sanitizeText(m.content).slice(0, MAX_MESSAGE_LENGTH) : '';
      const hasText = textContent.trim().length > 0;
      const attachments = Array.isArray(m.attachments) ? m.attachments.slice(0, MAX_IMAGES_PER_MESSAGE) : [];
      const hasImages = attachments.length > 0;

      if (!hasText && !hasImages) return null;
      if (m.role === 'assistant' && PROMPT_INJECTION_PATTERN.test(textContent)) return null;

      // Build content for vision (array) or text-only (string)
      if (hasImages && m.role === 'user') {
        const content = [];
        const textForVision = hasText ? textContent : 'What do you see in this image?';
        content.push({ type: 'text', text: textForVision });
        for (const att of attachments) {
          const url = att?.dataUrl;
          if (typeof url === 'string' && url.startsWith('data:image/') && url.length < 6 * 1024 * 1024) {
            content.push({ type: 'image_url', image_url: { url } });
          }
        }
        if (content.length > 0) {
          return { role: m.role, content };
        }
      }
      return hasText ? { role: m.role, content: textContent } : null;
    })
    .filter(Boolean)
    .slice(-MAX_MESSAGES)
    .filter((m) => (Array.isArray(m.content) ? m.content.length > 0 : m.content.length > 0));

  return sanitizedMessages;
}

async function callGroq({ groqApiKey, model, messages, maxTokens, temperature }) {
  const res = await fetchWithTimeout(
    'https://api.groq.com/openai/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${groqApiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: maxTokens,
        temperature,
      }),
    },
    UPSTREAM_TIMEOUT_MS
  );

  const text = await res.text();
  let data = {};
  try {
    data = JSON.parse(text);
  } catch {}
  return { res, data };
}

async function callOpenAIResponses({ openaiApiKey, model, messages, maxTokens, temperature }) {
  const res = await fetchWithTimeout(
    'https://api.openai.com/v1/responses',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model,
        input: messages.map((m) => ({
          role: m.role,
          content: [{ type: 'text', text: m.content }],
        })),
        max_output_tokens: maxTokens,
        temperature,
      }),
    },
    UPSTREAM_TIMEOUT_MS
  );

  const text = await res.text();
  let data = {};
  try {
    data = JSON.parse(text);
  } catch {}
  return { res, data };
}

function extractAssistantTextFromResponses(data) {
  // Responses API returns output[] with content blocks; we want combined text
  const output = data?.output;
  if (!Array.isArray(output)) return '';

  let text = '';
  for (const item of output) {
    const content = item?.content;
    if (!Array.isArray(content)) continue;
    for (const c of content) {
      if (c?.type === 'output_text' && typeof c.text === 'string') {
        text += (text ? '\n' : '') + c.text;
      }
    }
  }
  return text.trim();
}

export async function POST(request) {
  try {
    const result = await withProtectedRoute(request, {
      allowedMethods: ['POST'],
      enforceOrigin: true,
      rateLimit: chatRateLimit,
      schema: chatBodySchema,
      parseJson: (r) => r.json().catch(() => null),
      botCheck: { opts: { checkContent: false, requireTimestamp: true } },
      requireJsonContentType: true,
      onBotDetected: () => {
        console.warn('[CHAT] Bot blocked');
        return safeJson({ message: 'I appreciate the question! Feel free to ask more.', role: 'assistant' });
      },
    });

    if (result.error) return result.error;

    const cleanBody = result.body;
    const messages = cleanBody?.messages;
    const channel = cleanBody?.channel === 'terminal' ? 'terminal' : 'widget';

    const sanitizedMessages = normalizeIncomingMessages(messages);

    if (sanitizedMessages.length === 0) {
      return safeJson({ error: 'No valid messages to process' }, { status: 400 });
    }

    // Server-controlled system prompt (clients cannot override)
    const apiMessages = [
      { role: 'system', content: buildSystemPrompt(channel) },
      ...sanitizedMessages,
    ];

    const groqApiKey = process.env.GROQ_API_KEY;
    const openaiApiKey = process.env.OPENAI_API_KEY;

    const groqModel = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
    const groqVisionModel = process.env.GROQ_VISION_MODEL || GROQ_VISION_MODEL;
    const openaiModel = process.env.OPENAI_MODEL || 'gpt-4o-mini';

    const maxTokens = Number(process.env.AI_MAX_TOKENS || 300);
    const temperature = Number(process.env.AI_TEMPERATURE || 0.7);

    const hasVisionContent = apiMessages.some((m) => Array.isArray(m.content));
    const groqModelToUse = hasVisionContent ? groqVisionModel : groqModel;

    let provider = null;
    let assistantText = '';

    // 1) Groq first (fast/cheap); use vision model when images present
    if (groqApiKey) {
      const { res, data } = await callGroq({
        groqApiKey,
        model: groqModelToUse,
        messages: apiMessages,
        maxTokens,
        temperature,
      });

      if (res.ok) {
        assistantText = data?.choices?.[0]?.message?.content?.trim() || '';
        provider = 'groq';
      } else {
        if (process.env.NODE_ENV === 'development') {
          console.error('Groq error:', res.status, data);
        }
      }
    }

    // 2) OpenAI fallback (Responses API)
    if (!assistantText && openaiApiKey) {
      const { res, data } = await callOpenAIResponses({
        openaiApiKey,
        model: openaiModel,
        messages: apiMessages,
        maxTokens,
        temperature,
      });

      if (res.ok) {
        assistantText = extractAssistantTextFromResponses(data);
        provider = 'openai';
      } else {
        if (process.env.NODE_ENV === 'development') {
          console.error('OpenAI error:', res.status, data);
        }
        const apiMessage = data?.error?.message || data?.message;
        const userMessage =
          process.env.NODE_ENV === 'development' && apiMessage
            ? `AI provider error: ${apiMessage}`
            : 'Failed to get response from AI. Please try again.';
        return safeJson({ error: userMessage }, { status: 502 });
      }
    }

    if (!assistantText) {
      return safeJson(
        { error: 'AI chat is not configured. Please contact Stephen directly.' },
        { status: 503 }
      );
    }

    assistantText = redactIfPromptLeak(assistantText);
    assistantText = assistantText.slice(0, 6000);

    return safeJson({
      message: assistantText,
      role: 'assistant',
      ...(process.env.NODE_ENV === 'development' ? { provider } : {}),
    });
  } catch (error) {
    const isAbort = error?.name === 'AbortError';
    if (process.env.NODE_ENV === 'development') {
      console.error('Chat API error:', error);
    }
    return safeJson(
      { error: isAbort ? 'AI request timed out. Please try again.' : 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

export async function OPTIONS(request) {
  return buildProtectedOptionsResponse(request, ['POST']);
}
