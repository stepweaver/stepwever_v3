import { NextResponse } from 'next/server';
import { detectBot, stripBotFields } from '@/utils/botProtection';

/**
 * Centralized security choreography for protected API routes.
 * Applies: rate limit → parse body → bot check → strip bot fields → optional sanitize.
 *
 * @param {Request} request - The incoming request
 * @param {Object} options
 * @param {Function} options.rateLimit - (request) => Response | null from createRateLimit()
 * @param {Function} [options.parseJson] - (request) => Promise<object>. Default: request.json()
 * @param {Object} [options.botCheck] - { opts } for detectBot(). Omit to skip bot check.
 * @param {Function} [options.onBotDetected] - (reason?: string) => NextResponse. Called when bot is detected.
 * @param {Function} [options.sanitize] - (body) => body. Optional sanitization after stripBotFields.
 * @returns {Promise<{ error?: Response, body?: object }>}
 */
export async function withProtectedRoute(request, options = {}) {
  const {
    rateLimit,
    parseJson = (r) => r.json(),
    botCheck = null,
    onBotDetected = null,
    sanitize = null,
  } = options;

  if (typeof rateLimit === 'function') {
    const rateLimitResult = await rateLimit(request);
    if (rateLimitResult) {
      return { error: rateLimitResult };
    }
  }

  let body;
  try {
    body = await (typeof parseJson === 'function' ? parseJson(request) : request.json());
  } catch {
    body = null;
  }

  if (botCheck && typeof onBotDetected === 'function' && body != null) {
    const botResult = detectBot(body, botCheck.opts || {});
    if (botResult.isBot) {
      return { error: onBotDetected(botResult.reason) };
    }
  }

  const cleanBody = body ? stripBotFields(body) : body;
  const sanitizedBody = typeof sanitize === 'function' ? sanitize(cleanBody) : cleanBody;

  return { body: sanitizedBody };
}
