import { NextResponse } from 'next/server';
import {
  validateEmail,
  sendContactEmail,
  sendConfirmationEmail,
  isEmailConfigured
} from '@/utils/email';
import { sanitizeFormData } from '@/utils/sanitize';
import { createRateLimit } from '@/utils/rateLimit';

export async function POST(request) {
  try {
    // Apply rate limiting
    const rateLimit = createRateLimit({
      maxRequests: 3, // Allow 3 requests per 15 minutes
      windowMs: 15 * 60 * 1000, // 15 minutes
      message: 'Too many contact form submissions. Please try again later.'
    });

    const rateLimitResult = await rateLimit(request);
    if (rateLimitResult) {
      return rateLimitResult;
    }

    const formData = await request.json();

    // Sanitize all form data
    const sanitizedData = sanitizeFormData(formData);
    const { name, email, message } = sanitizedData;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Check if email configuration is set up
    if (!isEmailConfigured()) {
      console.error('Email configuration missing. Please set EMAIL_USER and EMAIL_PASS environment variables.');
      return NextResponse.json(
        { error: 'Email service not configured. Please set up your email credentials in .env.local' },
        { status: 500 }
      );
    }

    try {
      // Send contact email
      await sendContactEmail(sanitizedData);

      // Send confirmation email to the user (optional)
      if (process.env.SEND_CONFIRMATION_EMAIL === 'true') {
        await sendConfirmationEmail(sanitizedData);
      }
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      return NextResponse.json(
        { error: 'Failed to send email. Please check your email configuration.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Message sent successfully! I\'ll get back to you soon.',
    });

  } catch (error) {
    console.error('Error sending email:', error);

    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
} 