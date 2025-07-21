import { NextResponse } from 'next/server';
import {
  validateEmail,
  sendContactEmail,
  sendConfirmationEmail,
  isEmailConfigured
} from '@/utils/email';

export async function POST(request) {
  try {
    const formData = await request.json();
    const { name, email, message } = formData;

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
      await sendContactEmail(formData);

      // Send confirmation email to the user (optional)
      if (process.env.SEND_CONFIRMATION_EMAIL === 'true') {
        await sendConfirmationEmail(formData);
      }
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      return NextResponse.json(
        { error: 'Failed to send email. Please check your email configuration.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Message sent successfully! We\'ll get back to you soon.',
    });

  } catch (error) {
    console.error('Error sending email:', error);

    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
} 