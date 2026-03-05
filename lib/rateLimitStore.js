/**
 * Rate limit store adapters.
 * When KV_REST_API_URL and KV_REST_API_TOKEN are set (Vercel KV), uses Redis.
 * Otherwise falls back to in-memory (see utils/rateLimit.js).
 *
 * Store adapter shape: { get(key) => Promise<{ count, resetAt } | null>, set(key, value) => Promise<void> }
 */

const PREFIX = "rl:";

/**
 * Get Vercel KV store adapter when KV is configured.
 * Returns null if KV env vars are not set.
 */
export function getKVStore() {
  const url = process.env.KV_REST_API_URL || process.env.KV_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.KV_REST_API_READ_ONLY_TOKEN;

  if (!url || !token) return null;

  try {
    const { kv } = require("@vercel/kv");
    return {
      get: async (key) => {
        const raw = await kv.get(`${PREFIX}${key}`);
        if (raw == null) return null;
        return typeof raw === "object" ? raw : JSON.parse(String(raw));
      },
      set: async (key, value) => {
        const ttlSec = Math.ceil((value.resetAt - Date.now()) / 1000);
        await kv.set(`${PREFIX}${key}`, JSON.stringify(value), { ex: Math.max(60, ttlSec) });
      },
    };
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[rateLimitStore] KV not available:", err.message);
    }
    return null;
  }
}
