import { NextResponse } from 'next/server';
import {
  sendContactEmail,
  sendConfirmationEmail,
  isEmailConfigured,
} from '@/utils/email';
import { sanitizeFormData } from '@/utils/sanitize';
import { createRateLimit } from '@/utils/rateLimit';
import { withProtectedRoute } from '@/lib/apiSecurity';
import { contactBodySchema } from '@/lib/schemas/contact.schema';
import { jsonSecurityHeaders } from '@/lib/jsonSecurityHeaders';
import { logError } from '@/lib/observability/logger';

const isDev = process.env.NODE_ENV === 'development';

// Production stays strict (spam). Dev allows many tries—local testing burns through 3/15min fast.
const contactRateLimit = createRateLimit({
  keyPrefix: 'contact',
  maxRequests: isDev ? 120 : 3,
  windowMs: 15 * 60 * 1000,
  message: 'Too many contact form submissions. Please try again later.',
  requireDistributedStoreInProduction: true,
});

const GENERIC_FAILURE = 'Message could not be sent. Please try again later.';

const EMAIL_UNCONFIGURED_DEV =
  'Contact email is not configured on the server. Add EMAIL_USER and EMAIL_PASS to .env.local at the project root (same folder as package.json), then stop and restart `npm run dev`.';

function json(body, status = 200) {
  return NextResponse.json(body, { status, headers: jsonSecurityHeaders() });
}

export async function POST(request) {
  try {
    const result = await withProtectedRoute(request, {
      allowedMethods: ['POST'],
      enforceOrigin: true,
      rateLimit: contactRateLimit,
      schema: contactBodySchema,
      botCheck: { opts: { checkContent: true, requireTimestamp: true } },
      requireJsonContentType: true,
      onBotDetected: () => {
        console.warn('[CONTACT] Bot blocked');
        return json({
          message: "Message sent successfully! I'll get back to you soon.",
        });
      },
      sanitize: sanitizeFormData,
    });

    if (result.error) return result.error;

    const { name, email, message } = result.body || {};

    if (!isEmailConfigured()) {
      logError('contact_email_unconfigured', { route: '/api/contact' });
      const error =
        process.env.NODE_ENV === 'development'
          ? EMAIL_UNCONFIGURED_DEV
          : GENERIC_FAILURE;
      return json({ error }, 500);
    }

    try {
      await sendContactEmail(result.body);

      if (process.env.SEND_CONFIRMATION_EMAIL === 'true') {
        await sendConfirmationEmail(result.body);
      }
    } catch (emailError) {
      logError('contact_email_send_failed', {
        route: '/api/contact',
        cause: emailError?.message,
      });
      return json({ error: GENERIC_FAILURE }, 500);
    }

    return json({
      message: "Message sent successfully! I'll get back to you soon.",
    });
  } catch (error) {
    logError('contact_unexpected', {
      route: '/api/contact',
      cause: error?.message,
    });
    return json({ error: GENERIC_FAILURE }, 500);
  }
}
