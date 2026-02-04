/**
 * Parse markdown-style links in chat messages and convert them to React elements
 * Supports [text](url) format
 * @param {string} text - The message text containing markdown links
 * @returns {Array} - Array of React elements and strings
 */
export function parseChatLinks(text) {
  if (!text || typeof text !== 'string') {
    return [text];
  }

  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    // Add the link element
    const linkText = match[1];
    const linkUrl = match[2];
    parts.push(
      <a
        key={`link-${match.index}`}
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

  // Add remaining text after the last link
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  // If no links were found, return the original text
  if (parts.length === 0) {
    return [text];
  }

  return parts;
}