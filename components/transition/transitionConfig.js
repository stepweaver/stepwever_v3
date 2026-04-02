/**
 * Editorial / long-read surfaces get the full terminal scan sequence.
 * Extend CONTENT_PATH_PREFIXES only when the rule is explicit (same UX as codex/meshtastic).
 */
export const CONTENT_PATH_PREFIXES = ['/codex', '/meshtastic'];

export function isContentRoute(path) {
  if (!path) return false;
  return CONTENT_PATH_PREFIXES.some((prefix) => path.startsWith(prefix));
}

/** Fade duration: content wrapper + terminal overlay out; single source of truth for timers and CSS. */
export const FADE_MS = 280;

/** Fast handoff when no full-screen loader (opacity 0 → 1 on new page). */
export const STANDARD_HANDOFF_MS = 260;

/** Terminal “body” phase for editorial routes (after navigation commits). */
export const CONTENT_BODY_MS = 650;

/** Terminal body when navigation was slow (escalation) but destination is not editorial. */
export const ESCALATED_BODY_MS = 520;

/** After this delay with no route commit, show the full terminal loader over the old page. */
export const SLOW_NAV_THRESHOLD_MS = 160;

/** Reduced motion: nearly immediate; skip cinematic loader. */
export const REDUCED_MOTION_FADE_MS = 40;
