/**
 * Server-side bot detection utilities.
 *
 * Layers:
 *  1. Honeypot – hidden field that humans never fill; bots do.
 *  2. Timing   – bots submit within milliseconds; humans take seconds.
 *  3. Gibberish – random-keyboard content has measurable entropy patterns.
 *
 * Usage in an API route:
 *   import { detectBot } from '@/utils/botProtection';
 *   const bot = detectBot(body);          // body = parsed JSON
 *   if (bot.isBot) return NextResponse.json({ error: 'Blocked' }, { status: 422 });
 */

// ── Honeypot ────────────────────────────────────────────────────────
// The client renders an invisible field named `_hp_website`.
// If it contains ANY value the submission is from a bot.
function checkHoneypot(body) {
  const honeypotValue = body?._hp_website;
  if (honeypotValue && String(honeypotValue).trim().length > 0) {
    return { isBot: true, reason: 'honeypot' };
  }
  return { isBot: false };
}

// ── Timing ──────────────────────────────────────────────────────────
// The client embeds `_t` = Date.now() when the form/widget mounts.
// If the submission arrives in < MIN_MS, it's a bot.
const MIN_HUMAN_MS = 3_000; // 3 seconds minimum for a real human

function checkTiming(body) {
  const loadedAt = Number(body?._t);
  if (!loadedAt || Number.isNaN(loadedAt)) {
    // Missing timestamp — treat as suspicious but not outright blocked.
    // Bots that don't run JS won't send this field at all.
    return { isBot: true, reason: 'missing_timestamp' };
  }

  const elapsed = Date.now() - loadedAt;
  if (elapsed < MIN_HUMAN_MS) {
    return { isBot: true, reason: 'too_fast' };
  }

  // Guard against obviously spoofed timestamps (> 24 hours old)
  if (elapsed > 24 * 60 * 60 * 1000) {
    return { isBot: true, reason: 'stale_timestamp' };
  }

  return { isBot: false };
}

// ── Gibberish / content quality ─────────────────────────────────────
// Simple heuristic: if a string has very few vowels relative to its
// length, or contains long runs of consonants, it's likely random.

const VOWELS = new Set('aeiouAEIOU');

function vowelRatio(str) {
  if (!str || str.length === 0) return 1; // empty → pass
  const letters = str.replace(/[^a-zA-Z]/g, '');
  if (letters.length < 4) return 1; // too short to judge
  const count = [...letters].filter((c) => VOWELS.has(c)).length;
  return count / letters.length;
}

function longestConsonantRun(str) {
  const letters = str.replace(/[^a-zA-Z]/g, '');
  let max = 0;
  let current = 0;
  for (const c of letters) {
    if (!VOWELS.has(c)) {
      current++;
      if (current > max) max = current;
    } else {
      current = 0;
    }
  }
  return max;
}

function checkGibberish(text, fieldName = 'field') {
  if (!text || typeof text !== 'string') return { isBot: false };

  const cleaned = text.trim();
  if (cleaned.length < 5) return { isBot: false }; // too short to analyse

  // Very low vowel ratio → gibberish
  const ratio = vowelRatio(cleaned);
  if (ratio < 0.12 && cleaned.length > 8) {
    return { isBot: true, reason: `gibberish_${fieldName}` };
  }

  // Long consonant runs (> 6 consecutive consonants is rare in real words)
  const run = longestConsonantRun(cleaned);
  if (run > 6) {
    return { isBot: true, reason: `consonant_run_${fieldName}` };
  }

  // Very high ratio of uppercase in the middle of words (randomly cased)
  const letters = cleaned.replace(/[^a-zA-Z]/g, '');
  if (letters.length > 8) {
    // Count case transitions (aB, Ba, etc.)
    let transitions = 0;
    for (let i = 1; i < letters.length; i++) {
      const prevUpper = letters[i - 1] === letters[i - 1].toUpperCase();
      const currUpper = letters[i] === letters[i].toUpperCase();
      if (prevUpper !== currUpper) transitions++;
    }
    const transitionRatio = transitions / letters.length;
    if (transitionRatio > 0.6) {
      return { isBot: true, reason: `random_case_${fieldName}` };
    }
  }

  return { isBot: false };
}

// ── Main detector ───────────────────────────────────────────────────
/**
 * Run all bot-detection checks on a request body.
 *
 * @param {Object} body – The parsed JSON body (may include _hp_website, _t)
 * @param {Object} [options]
 * @param {boolean} [options.checkContent=true] – Run gibberish check on name/email/message
 * @param {boolean} [options.requireTimestamp=true] – Reject if _t is missing
 * @returns {{ isBot: boolean, reason?: string }}
 */
export function detectBot(body, options = {}) {
  const { checkContent = true, requireTimestamp = true } = options;

  // 1. Honeypot
  const hp = checkHoneypot(body);
  if (hp.isBot) return hp;

  // 2. Timing
  const timing = checkTiming(body);
  if (timing.isBot) {
    // If timestamp is missing and we don't require it, skip
    if (timing.reason === 'missing_timestamp' && !requireTimestamp) {
      // pass
    } else {
      return timing;
    }
  }

  // 3. Content quality (gibberish)
  if (checkContent) {
    const nameCheck = checkGibberish(body?.name, 'name');
    if (nameCheck.isBot) return nameCheck;

    const messageCheck = checkGibberish(body?.message, 'message');
    if (messageCheck.isBot) return messageCheck;
  }

  return { isBot: false };
}

/**
 * Strip bot-protection meta-fields from the body before processing.
 * This keeps _hp_website and _t out of your business logic.
 */
export function stripBotFields(body) {
  if (!body || typeof body !== 'object') return body;
  const { _hp_website, _t, ...rest } = body;
  return rest;
}
