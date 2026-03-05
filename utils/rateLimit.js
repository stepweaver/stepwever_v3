/**
 * Rate limiting for Next.js API routes.
 *
 * Store adapter shape (for Vercel KV, Redis, etc.):
 *   - get(key) => { count, resetAt } | null
 *   - set(key, value) => void
 *
 * When no store is provided, uses in-memory Map (resets per serverless instance).
 * For production on Vercel, use @vercel/kv with a simple adapter.
 */

const inMemoryStore = new Map();

const defaultStore = {
  get: (key) => inMemoryStore.get(key) || null,
  set: (key, value) => inMemoryStore.set(key, value),
};

/**
 * Get client IP from request
 * @param {Request} request - Next.js request object
 * @returns {string} - Client IP
 */
export const getClientIP = (request) => {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }

  return '127.0.0.1';
};

/**
 * Create rate limit middleware for Next.js API routes
 * @param {Object} options - Rate limit options
 * @param {number} [options.maxRequests=5] - Max requests per window
 * @param {number} [options.windowMs=900000] - Window in ms (15 min default)
 * @param {string} [options.message] - Error message when limited
 * @param {Function} [options.getKey] - (request) => string for rate-limit key
 * @param {Object} [options.store] - Store adapter { get, set }. Default: in-memory (serverless-resets)
 * @returns {Function} - (request) => Response | null
 */
export const createRateLimit = (options = {}) => {
  const {
    maxRequests = 5,
    windowMs = 15 * 60 * 1000,
    message = 'Too many requests, please try again later.',
    statusCode = 429,
    getKey = null,
    store = null,
  } = options;

  const backingStore = store || defaultStore;

  return async (request) => {
    const key = typeof getKey === 'function' ? getKey(request) : getClientIP(request);
    const now = Date.now();

    const existing = backingStore.get(key);
    const resetAt = existing?.resetAt ?? now + windowMs;

    // Window rolled over or first request
    if (!existing || now > resetAt) {
      backingStore.set(key, { count: 1, resetAt: now + windowMs });
      return null;
    }

    // Still in window
    if (existing.count >= maxRequests) {
      const retryAfter = Math.max(1, Math.ceil((resetAt - now) / 1000));
      return new Response(
        JSON.stringify({
          error: message,
          retryAfter,
        }),
        {
          status: statusCode,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': String(retryAfter),
          },
        }
      );
    }

    backingStore.set(key, { count: existing.count + 1, resetAt });
    return null;
  };
};
