/**
 * Parse a single segment for markdown links. Returns array of strings and link elements.
 */
function parseSegmentForLinks(segment, keyPrefix = '') {
  if (!segment) return [];
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(segment)) !== null) {
    if (match.index > lastIndex) {
      parts.push(segment.substring(lastIndex, match.index));
    }
    const linkText = match[1];
    const linkUrl = match[2];
    parts.push(
      <a
        key={`${keyPrefix}link-${match.index}`}
        href={linkUrl}
        target={linkUrl.startsWith('http') ? '_blank' : undefined}
        rel={linkUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
        className='text-terminal-green hover:text-terminal-cyan underline underline-offset-2 break-words'
        download={linkUrl.endsWith('.pdf') ? linkText.replace(/\s+/g, '_') + '.pdf' : undefined}
      >
        {linkText}
      </a>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < segment.length) {
    parts.push(segment.substring(lastIndex));
  }

  return parts.length ? parts : [segment];
}

/**
 * Parse markdown-style links in chat messages and convert them to React elements.
 * Supports [text](url) format.
 * When options.renderAgentName is provided, "λlambda" is rendered as renderAgentName(key) + "lambda" (so the λ can be a glitching symbol).
 * @param {string} text - The message text containing markdown links
 * @param {{ renderAgentName?: (key: string) => React.ReactNode }} [options]
 * @returns {Array} - Array of React elements and strings
 */
export function parseChatLinks(text, options) {
  if (!text || typeof text !== 'string') {
    return [text];
  }

  const renderAgentName = options?.renderAgentName;

  if (renderAgentName && text.includes('λlambda')) {
    const segments = text.split('λlambda');
    const result = [];
    for (let i = 0; i < segments.length; i++) {
      result.push(...parseSegmentForLinks(segments[i], `seg-${i}-`));
      if (i < segments.length - 1) {
        result.push(renderAgentName(`agent-${i}`), 'lambda');
      }
    }
    return result;
  }

  const parts = parseSegmentForLinks(text, '');
  return parts.length ? parts : [text];
}