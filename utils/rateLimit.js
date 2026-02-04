// In-memory store for rate limiting (in production, use Redis or similar)
const rateLimitStore = new Map();

/**
 * Simple in-memory rate limiter
 * @param {string} key - The key to rate limit (usually IP or user ID)
 * @param {number} maxRequests - Maximum requests allowed
 * @param {number} windowMs - Time window in milliseconds
 * @returns {Object} - Rate limit status
 */
export const checkRateLimit = (key, maxRequests = 5, windowMs = 15 * 60 * 1000) => {
  const now = Date.now();
  const windowStart = now - windowMs;

  // Get existing requests for this key
  const requests = rateLimitStore.get(key) || [];

  // Filter out old requests outside the window
  const recentRequests = requests.filter(timestamp => timestamp > windowStart);

  // Check if limit exceeded
  const isLimited = recentRequests.length >= maxRequests;

  if (!isLimited) {
    // Add current request
    recentRequests.push(now);
    rateLimitStore.set(key, recentRequests);
  }

  // Clean up old entries periodically
  if (Math.random() < 0.01) { // 1% chance to clean up
    cleanupRateLimitStore();
  }

  return {
    isLimited,
    remaining: Math.max(0, maxRequests - recentRequests.length),
    resetTime: windowStart + windowMs,
    retryAfter: isLimited ? Math.ceil((windowStart + windowMs - now) / 1000) : 0
  };
};

/**
 * Clean up old rate limit entries
 */
const cleanupRateLimitStore = () => {
  const now = Date.now();
  const maxAge = 60 * 60 * 1000; // 1 hour

  for (const [key, requests] of rateLimitStore.entries()) {
    const recentRequests = requests.filter(timestamp => now - timestamp < maxAge);
    if (recentRequests.length === 0) {
      rateLimitStore.delete(key);
    } else {
      rateLimitStore.set(key, recentRequests);
    }
  }
};

/**
 * Get client IP from request
 * @param {Request} request - Next.js request object
 * @returns {string} - Client IP
 */
export const getClientIP = (request) => {
  // Check for forwarded headers first
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  // Fallback to other headers
  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }

  // For development, use a default
  return '127.0.0.1';
};

/**
 * Create rate limit middleware for Next.js API routes
 * @param {Object} options - Rate limit options
 * @param {Function} [options.getKey] - Optional (request) => string to derive rate-limit key (e.g. IP + UA). Defaults to getClientIP(request).
 * @returns {Function} - Middleware function
 */
export const createRateLimit = (options = {}) => {
  const {
    maxRequests = 5,
    windowMs = 15 * 60 * 1000, // 15 minutes
    message = 'Too many requests, please try again later.',
    statusCode = 429,
    getKey = null,
  } = options;

  return async (request) => {
    const key = typeof getKey === 'function' ? getKey(request) : getClientIP(request);
    const rateLimit = checkRateLimit(key, maxRequests, windowMs);

    if (rateLimit.isLimited) {
      return new Response(
        JSON.stringify({
          error: message,
          retryAfter: rateLimit.retryAfter
        }),
        {
          status: statusCode,
          headers: {
            'Content-Type': 'application/json',
            'X-RateLimit-Limit': maxRequests.toString(),
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
            'Retry-After': rateLimit.retryAfter.toString()
          }
        }
      );
    }

    return null; // Continue to next middleware/handler
  };
}; 