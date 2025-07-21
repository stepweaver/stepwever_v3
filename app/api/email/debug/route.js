import { NextResponse } from 'next/server';
import { isEmailConfigured, getTransporter } from '@/utils/email';

export async function GET() {
  try {
    // Check environment variables
    const envCheck = {
      EMAIL_SERVICE: process.env.EMAIL_SERVICE,
      EMAIL_USER: process.env.EMAIL_USER,
      EMAIL_PASS: process.env.EMAIL_PASS ? '***SET***' : 'NOT SET',
      EMAIL_TO: process.env.EMAIL_TO,
      SEND_CONFIRMATION_EMAIL: process.env.SEND_CONFIRMATION_EMAIL,
    };

    // Check if email is configured
    const configured = isEmailConfigured();

    // Test transporter creation
    let transporterTest = null;
    try {
      if (configured) {
        const transporter = getTransporter();
        transporterTest = 'Transporter created successfully';
      }
    } catch (error) {
      transporterTest = `Transporter error: ${error.message}`;
    }

    return NextResponse.json({
      success: true,
      environment: envCheck,
      configured,
      transporterTest,
      message: 'Debug information retrieved successfully'
    });

  } catch (error) {
    console.error('Debug error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to get debug information',
      error: error.message,
    }, { status: 500 });
  }
} 