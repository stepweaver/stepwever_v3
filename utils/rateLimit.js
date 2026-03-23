/**
 * Rate limiting for Next.js API routes.
 * Uses Vercel KV when configured; in production, callers can require
 * distributed backing storage and fail closed when unavailable.
 */

import { createHash } from "crypto";
import { getKVStore } from "@/lib/rateLimitStore";
import { jsonSecurityHeaders } from "@/lib/jsonSecurityHeaders";

const inMemoryStore = new Map();

const defaultStore = {
  get: async (key) => inMemoryStore.get(key) || null,
  set: async (key, value) => {
    inMemoryStore.set(key, value);
  },
};

export const getClientIP = (request) => {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIP = request.headers.get("x-real-ip");
  if (realIP) return realIP;
  return "127.0.0.1";
};

function hashKeyPart(value) {
  return createHash("sha256").update(String(value)).digest("hex").slice(0, 32);
}

function defaultKeyedRequest(request, keyPrefix) {
  const ip = getClientIP(request);
  const ua = (request.headers.get("user-agent") || "no-ua").slice(0, 120);
  const id = hashKeyPart(`${ip}:${ua}`);
  return keyPrefix ? `${keyPrefix}:${id}` : id;
}

function resolveStore(explicitStore) {
  if (explicitStore) return explicitStore;
  return getKVStore() ?? defaultStore;
}

let warnedMissingKv = false;
let warnedMissingKvStrict = false;

function warnMissingKvOnce() {
  if (process.env.NODE_ENV !== "production" || getKVStore() || warnedMissingKv) {
    return;
  }
  warnedMissingKv = true;
  console.warn(
    "[rateLimit] Vercel KV not configured (KV_REST_API_URL / KV_REST_API_TOKEN). " +
      "Using in-memory limits per serverless instance — add KV for production-grade abuse control."
  );
}

function warnMissingKvStrictOnce() {
  if (process.env.NODE_ENV !== "production" || getKVStore() || warnedMissingKvStrict) {
    return;
  }
  warnedMissingKvStrict = true;
  console.error(
    "[rateLimit] Vercel KV not configured (KV_REST_API_URL / KV_REST_API_TOKEN). " +
      "Protected routes are fail-closed until a distributed rate-limit store is configured."
  );
}

/**
 * @param {Object} options
 * @param {number} [options.maxRequests=5]
 * @param {number} [options.windowMs]
 * @param {string} [options.message]
 * @param {number} [options.statusCode=429]
 * @param {Function} [options.getKey]
 * @param {string} [options.keyPrefix] - namespaces stored keys (e.g. chat, contact)
 * @param {Object} [options.store]
 * @param {boolean} [options.requireDistributedStoreInProduction=true]
 */
export const createRateLimit = (options = {}) => {
  const {
    maxRequests = 5,
    windowMs = 15 * 60 * 1000,
    message = "Too many requests, please try again later.",
    statusCode = 429,
    getKey = null,
    keyPrefix = "",
    store = null,
    requireDistributedStoreInProduction = true,
  } = options;

  const backingStore = resolveStore(store);
  const useHashDefault =
    typeof getKey !== "function" &&
    (Boolean(keyPrefix) || process.env.NODE_ENV === "production");

  const effectiveGetKey =
    typeof getKey === "function"
      ? getKey
      : (request) =>
          useHashDefault
            ? defaultKeyedRequest(request, keyPrefix)
            : getClientIP(request);

  return async (request) => {
    const missingDistributedStore =
      !store && process.env.NODE_ENV === "production" && !getKVStore();
    if (missingDistributedStore && requireDistributedStoreInProduction) {
      warnMissingKvStrictOnce();
      return new Response(
        JSON.stringify({
          error: "Service temporarily unavailable.",
          code: "rate_limit_store_unavailable",
        }),
        {
          status: 503,
          headers: {
            "Content-Type": "application/json",
            ...jsonSecurityHeaders(),
          },
        }
      );
    }
    if (missingDistributedStore) {
      warnMissingKvOnce();
    }

    const key = effectiveGetKey(request);
    const now = Date.now();

    const existing = await backingStore.get(key);
    const resetAt = existing?.resetAt ?? now + windowMs;
    const resetSec = Math.ceil(resetAt / 1000);

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
            "X-RateLimit-Limit": String(maxRequests),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": String(resetSec),
            ...jsonSecurityHeaders(),
          },
        }
      );
    }

    await backingStore.set(key, { count: existing.count + 1, resetAt });
    return null;
  };
};
