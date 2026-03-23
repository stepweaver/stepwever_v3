import { NextResponse } from 'next/server';
import { detectBot, stripBotFields } from '@/utils/botProtection';
import { isAllowedRequestOrigin } from '@/lib/requestOrigin';
import { jsonSecurityHeaders } from '@/lib/jsonSecurityHeaders';

function isOriginAllowlistConfigured() {
  const o = (process.env.ALLOWED_ORIGINS || '').trim();
  const h = (process.env.ALLOWED_HOSTS || '').trim();
  return !!(o || h);
}

/**
 * Centralized security for protected API routes.
 * Order: method → origin (optional) → rate limit → parse body → bot → schema → sanitize.
 *
 * @param {Request} request
 * @param {Object} options
 * @param {string[]} [options.allowedMethods=['POST']]
 * @param {boolean} [options.enforceOrigin=true]
 * @param {Function} [options.rateLimit]
 * @param {Function} [options.parseJson]
 * @param {Object} [options.botCheck]
 * @param {Function} [options.onBotDetected]
 * @param {import('zod').ZodTypeAny} [options.schema]
 * @param {Function} [options.sanitize]
 * @param {boolean} [options.securityHeaders=true]
 */
export async function withProtectedRoute(request, options = {}) {
  const {
    allowedMethods = ['POST'],
    enforceOrigin = true,
    rateLimit,
    parseJson = (r) => r.json(),
    botCheck = null,
    onBotDetected = null,
    schema = null,
    sanitize = null,
    securityHeaders = true,
  } = options;

  const hdr = securityHeaders ? jsonSecurityHeaders() : {};
  const jsonErr = (body, status) =>
    NextResponse.json(body, { status, headers: hdr });

  if (!allowedMethods.includes(request.method)) {
    return { error: jsonErr({ error: 'Method not allowed' }, 405) };
  }

  if (enforceOrigin) {
    if (process.env.NODE_ENV === 'production' && !isOriginAllowlistConfigured()) {
      return { error: jsonErr({ error: 'Service temporarily unavailable.' }, 503) };
    }
    if (!isAllowedRequestOrigin(request)) {
      return { error: jsonErr({ error: 'Forbidden' }, 403) };
    }
  }

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

  let validatedBody = cleanBody;
  if (schema && cleanBody != null) {
    const parsed = schema.safeParse(cleanBody);
    if (!parsed.success) {
      const details =
        process.env.NODE_ENV === 'development' ? parsed.error.flatten() : undefined;
      return {
        error: jsonErr(
          { error: 'Invalid request', ...(details ? { details } : {}) },
          400
        ),
      };
    }
    validatedBody = parsed.data;
  }

  const sanitizedBody =
    typeof sanitize === 'function' ? sanitize(validatedBody) : validatedBody;

  return { body: sanitizedBody };
}

export { jsonSecurityHeaders } from '@/lib/jsonSecurityHeaders';
