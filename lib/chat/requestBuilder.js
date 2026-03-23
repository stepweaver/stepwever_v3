/**
 * Single JSON shape for POST /api/chat (widget + terminal).
 *
 * @param {Object} opts
 * @param {'widget'|'terminal'} opts.channel
 * @param {Array<{ role: string, content?: string, attachments?: unknown[] }>} opts.messages
 * @param {{ _t?: number, _hp_website?: string }} opts.botFields
 */
export function buildChatRequestPayload({ channel, messages, botFields }) {
  const ch = channel === 'terminal' ? 'terminal' : 'widget';
  return {
    channel: ch,
    messages: (messages || []).map((m) => ({
      role: m.role,
      content: m.content,
      ...(Array.isArray(m.attachments) && m.attachments.length > 0
        ? { attachments: m.attachments }
        : {}),
    })),
    ...botFields,
  };
}
