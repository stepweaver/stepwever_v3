// AI Chat handler for Terminal
// Sends messages to the AI API and returns responses

// Record module load time for bot-protection timing check
const MODULE_LOADED_AT = Date.now();

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
        channel: 'terminal',
        messages: [{ role: 'user', content: message }],
        _hp_website: '',            // honeypot (always empty)
        _t: MODULE_LOADED_AT,       // timing stamp
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to get response');
    }

    // Remove loading indicator and add response
    if (callback && callback.setLines) {
      callback.setLines((prev) => {
        const filtered = prev.filter((line) => !line.includes('⟳ Thinking...'));
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
    if (callback && callback.setLines) {
      callback.setLines((prev) => {
        const filtered = prev.filter((line) => !line.includes('⟳ Thinking...'));
        return [
          ...filtered,
          `<span class="text-terminal-red">Error: ${escapeHtml(
            error.message || 'Failed to communicate with AI'
          )}</span>`,
        ];
      });
    }
    return [];
  }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div =
    typeof document !== 'undefined' ? document.createElement('div') : null;
  if (div) {
    div.textContent = text;
    return div.innerHTML;
  }
  // Fallback for SSR
  return String(text)
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
    `<span class="text-terminal-text">ai &lt;your message&gt; - Ask λlambda about Stephen</span>`,
    ``,
    `<span class="text-terminal-cyan">Examples:</span>`,
    `<span class="text-terminal-text">ai What's your tech stack?</span>`,
    `<span class="text-terminal-text">ai Tell me about your background</span>`,
    `<span class="text-terminal-text">ai Are you open to work?</span>`,
    ``,
    `<span class="text-terminal-dimmed">Tip: You can also use the floating chat widget (bottom right corner)</span>`,
  ];
}
