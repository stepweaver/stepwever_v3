// AI Chat handler for Terminal
// Sends messages to the AI API and returns responses

const AI_SYSTEM_PROMPT = `You are an AI version of Stephen Weaver, a Full-Stack Developer, AI-Native Technologist, and Business Analyst.
You have his knowledge, experience, and witty personality. Answer any questions as if you are Stephen, in a casual, confident, and slightly humorous tone.
Keep responses concise (2-4 sentences max) since this is a terminal interface.
If a question is about Stephen's work, skills, or background, answer with those details.
If it's unrelated, you can joke or redirect to talking about tech.
Do not use markdown formatting - just plain text suitable for a terminal.`;

export async function sendAIMessage(message, callback) {
  // Show loading indicator
  if (callback && callback.setLines) {
    callback.setLines((prev) => [
      ...prev,
      '<span class="text-terminal-yellow">⟳ Thinking...</span>',
    ]);
  }

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: AI_SYSTEM_PROMPT },
          { role: 'user', content: message },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to get response');
    }

    // Remove loading indicator and add response
    if (callback && callback.setLines) {
      callback.setLines((prev) => {
        // Remove the "Thinking..." line
        const filtered = prev.filter(
          (line) => !line.includes('⟳ Thinking...')
        );
        return [
          ...filtered,
          `<span class="text-terminal-cyan">┌─ AI Response ─────────────────────</span>`,
          `<span class="text-terminal-text">${escapeHtml(data.message)}</span>`,
          `<span class="text-terminal-cyan">└───────────────────────────────────</span>`,
        ];
      });
    }

    return [];
  } catch (error) {
    // Remove loading indicator and show error
    if (callback && callback.setLines) {
      callback.setLines((prev) => {
        const filtered = prev.filter(
          (line) => !line.includes('⟳ Thinking...')
        );
        return [
          ...filtered,
          `<span class="text-terminal-red">Error: ${error.message || 'Failed to communicate with AI'}</span>`,
        ];
      });
    }
    return [];
  }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = typeof document !== 'undefined' ? document.createElement('div') : null;
  if (div) {
    div.textContent = text;
    return div.innerHTML;
  }
  // Fallback for SSR
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function getAIHelpText() {
  return [
    `<span class="text-terminal-green">AI Chat Command:</span>`,
    ``,
    `<span class="text-terminal-cyan">Usage:</span>`,
    `<span class="text-terminal-text">ai &lt;your message&gt; - Ask Stephen's AI anything</span>`,
    ``,
    `<span class="text-terminal-cyan">Examples:</span>`,
    `<span class="text-terminal-text">ai What's your tech stack?</span>`,
    `<span class="text-terminal-text">ai Tell me about your background</span>`,
    `<span class="text-terminal-text">ai Are you open to work?</span>`,
    ``,
    `<span class="text-terminal-dimmed">Tip: You can also use the floating chat widget (bottom right corner)</span>`,
  ];
}
