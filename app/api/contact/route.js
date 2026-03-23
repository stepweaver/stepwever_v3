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

const contactRateLimit = createRateLimit({
  keyPrefix: 'contact',
  maxRequests: 3,
  windowMs: 15 * 60 * 1000,
  message: 'Too many contact form submissions. Please try again later.',
  requireDistributedStoreInProduction: true,
});

const GENERIC_FAILURE = 'Message could not be sent. Please try again later.';

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
      return json({ error: GENERIC_FAILURE }, 500);
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
