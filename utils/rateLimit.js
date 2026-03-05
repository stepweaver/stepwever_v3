/**
 * Rate limiting for Next.js API routes.
 *
 * Store adapter shape (for Vercel KV, Redis, etc.):
 *   - get(key) => Promise<{ count, resetAt } | null>
 *   - set(key, value) => Promise<void>
 *
 * When no store is provided, uses in-memory Map (resets per serverless instance).
 * When KV_REST_API_URL and KV_REST_API_TOKEN are set, uses Vercel KV.
 */

import { getKVStore } from "@/lib/rateLimitStore";

const inMemoryStore = new Map();

const defaultStore = {
  get: async (key) => inMemoryStore.get(key) || null,
  set: async (key, value) => {
    inMemoryStore.set(key, value);
  },
};

/**
 * Get client IP from request
 */
export const getClientIP = (request) => {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIP = request.headers.get("x-real-ip");
  if (realIP) return realIP;
  return "127.0.0.1";
};

/**
 * Create rate limit middleware for Next.js API routes
 * @param {Object} options - Rate limit options
 * @param {number} [options.maxRequests=5] - Max requests per window
 * @param {number} [options.windowMs=900000] - Window in ms (15 min default)
 * @param {string} [options.message] - Error message when limited
 * @param {Function} [options.getKey] - (request) => string for rate-limit key
 * @param {Object} [options.store] - Store adapter { get, set }. Overrides auto-detection.
 */
export const createRateLimit = (options = {}) => {
  const {
    maxRequests = 5,
    windowMs = 15 * 60 * 1000,
    message = "Too many requests, please try again later.",
    statusCode = 429,
    getKey = null,
    store = null,
  } = options;

  const backingStore = store ?? getKVStore() ?? defaultStore;

  return async (request) => {
    const key = typeof getKey === "function" ? getKey(request) : getClientIP(request);
    const now = Date.now();

    const existing = await backingStore.get(key);
    const resetAt = existing?.resetAt ?? now + windowMs;

    if (!existing || now > resetAt) {
      await backingStore.set(key, { count: 1, resetAt: now + windowMs });
      return null;
    }

    if (existing.count >= maxRequests) {
      const retryAfter = Math.max(1, Math.ceil((resetAt - now) / 1000));
      return new Response(
        JSON.stringify({ error: message, retryAfter }),
        {
          status: statusCode,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": String(retryAfter),
          },
        }
      );
    }

    await backingStore.set(key, { count: existing.count + 1, resetAt });
    return null;
  };
};
