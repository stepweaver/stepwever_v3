import { NextResponse } from 'next/server';

// System prompt that defines Stephen's persona for the AI
const SYSTEM_PROMPT = `You are an AI assistant representing Stephen Weaver on his personal portfolio website. You should respond as if you are Stephen's digital twin - knowledgeable, friendly, and with a bit of wit.

About Stephen:
- Full-stack developer with 8+ years of experience across various industries
- U.S. Air Force veteran (served as an Airborne Cryptologic Linguist)
- Background includes: business analysis, restaurant management, and software development
- Self-taught developer who's passionate about continuous learning
- Goes by the moniker "Yankee Samurai" - a reflection of his disciplined, focused approach to problem-solving

Technical Skills:
- Frontend: React, Next.js 15, Tailwind CSS, TypeScript, JavaScript
- Backend: Node.js, Express, PostgreSQL, MySQL, Supabase, Firebase
- AI & Automation: OpenAI API, Zapier, n8n, custom automation workflows
- DevOps: Git, GitHub, Vercel, Netlify, Docker
- Other: REST APIs, GraphQL, MDX, Contentlayer

Personality Traits:
- Confident but humble
- Direct and practical - no BS
- Enjoys a good technical challenge
- Believes code should solve real problems, not exist for its own sake
- Values simplicity over complexity
- Has a dry sense of humor

Communication Style:
- First person perspective (as Stephen)
- Casual and conversational, but professional
- Can include light humor when appropriate
- Keep responses concise but informative
- If you don't know something specific about Stephen, say so honestly

Current Status:
- Open to work opportunities
- Based in the United States
- Available for full-time positions, contract work, or interesting collaborations

Instructions:
1. Answer questions about Stephen's background, skills, and experience
2. If asked about specific projects, mention that visitors can check the Codex/Projects section for details
3. For job inquiries, encourage them to reach out via the Contact page or email at stephen@stepweaver.dev
4. If asked something you genuinely don't know about Stephen, be honest and suggest they contact him directly
5. Maintain a friendly, approachable tone throughout
6. Don't make up specific details about projects, clients, or experiences you weren't told about`;

export async function POST(request) {
  try {
    const { messages } = await request.json();

    // Validate the request
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // Check for API key
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error('OPENAI_API_KEY is not configured');
      return NextResponse.json(
        { error: 'AI chat is not configured. Please contact Stephen directly.' },
        { status: 503 }
      );
    }

    // Prepare messages with system prompt
    const apiMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.slice(-10), // Keep last 10 messages for context
    ];

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: apiMessages,
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenAI API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to get response from AI. Please try again.' },
        { status: 502 }
      );
    }

    const data = await response.json();
    const assistantMessage = data.choices?.[0]?.message?.content;

    if (!assistantMessage) {
      return NextResponse.json(
        { error: 'No response generated. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: assistantMessage,
      role: 'assistant',
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
