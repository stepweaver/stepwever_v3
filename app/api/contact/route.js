import { NextResponse } from 'next/server';
import {
  validateEmail,
  sendContactEmail,
  sendConfirmationEmail,
  isEmailConfigured
} from '@/utils/email';
import { sanitizeFormData } from '@/utils/sanitize';
import { createRateLimit } from '@/utils/rateLimit';
import { withProtectedRoute } from '@/lib/apiSecurity';

export async function POST(request) {
  try {
    const result = await withProtectedRoute(request, {
      rateLimit: createRateLimit({
        maxRequests: 3,
        windowMs: 15 * 60 * 1000,
        message: 'Too many contact form submissions. Please try again later.'
      }),
      botCheck: { opts: { checkContent: true, requireTimestamp: true } },
      onBotDetected: () => {
        console.warn('[CONTACT] Bot blocked');
        return NextResponse.json({ message: "Message sent successfully! I'll get back to you soon." });
      },
      sanitize: sanitizeFormData
    });

    if (result.error) return result.error;

    const { name, email, message } = result.body || {};

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    if (!isEmailConfigured()) {
      console.error('Email configuration missing. Please set EMAIL_USER and EMAIL_PASS environment variables.');
      return NextResponse.json(
        { error: 'Email service not configured. Please set up your email credentials in .env.local' },
        { status: 500 }
      );
    }

    try {
      await sendContactEmail(result.body);

      if (process.env.SEND_CONFIRMATION_EMAIL === 'true') {
        await sendConfirmationEmail(result.body);
      }
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      return NextResponse.json(
        { error: 'Failed to send email. Please check your email configuration.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Message sent successfully! I'll get back to you soon.",
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
