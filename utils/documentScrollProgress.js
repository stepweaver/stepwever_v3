/**
 * Document scroll progress [0, 1] for canvas / parallax.
 * When the page is not scrollable (maxScroll <= 0), returns 0 — never divides by ~1
 * with a stale window.scrollY from the previous route (that produced wrong tints).
 */
export function getDocumentScrollProgressY() {
  if (typeof window === 'undefined') return 0;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  if (maxScroll <= 0) return 0;
  const scrollTop = window.scrollY || 0;
  const clamped = Math.min(Math.max(scrollTop, 0), maxScroll);
  return clamped / maxScroll;
}

export function getDocumentScrollProgressX() {
  if (typeof window === 'undefined') return 0;
  const maxScroll = document.documentElement.scrollWidth - window.innerWidth;
  if (maxScroll <= 0) return 0;
  const scrollLeft = window.scrollX || 0;
  const clamped = Math.min(Math.max(scrollLeft, 0), maxScroll);
  return clamped / maxScroll;
}
