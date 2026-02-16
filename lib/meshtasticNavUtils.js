/**
 * Shared link class generator for Meshtastic docs sidebar & mobile nav.
 * Returns Tailwind classes for active/inactive doc links.
 *
 * @param {boolean} active - Whether the link is currently active
 * @returns {string} Tailwind class string
 */
export function getLinkClass(active) {
  return `block py-1.5 px-2 rounded-sm text-sm transition-colors border-l-2 -ml-0.5 pl-2.5 font-ocr ${
    active
      ? 'text-neon bg-neon/10 border-neon [text-shadow:var(--terminal-text-glow)]'
      : 'text-text/70 border-transparent hover:text-neon hover:bg-neon/5 hover:border-neon/30'
  }`;
}
