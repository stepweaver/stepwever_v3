import nodemailer from 'nodemailer';

// Create transporter instance
let transporter = null;

export const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
  return transporter;
};

// Validate email format
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Send contact form email
export const sendContactEmail = async (formData) => {
  const { name, email, message } = formData;

  const emailContent = {
    subject: `New Contact Form Submission from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #007bff; margin-top: 0;">Contact Information</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
        </div>
        
        <div style="background-color: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 5px;">
          <h3 style="color: #007bff; margin-top: 0;">Project Summary</h3>
          <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; color: #6c757d; font-size: 14px;">
          <p>This message was sent from the contact form on your website.</p>
          <p>Timestamp: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `,
    text: `
New Contact Form Submission

Contact Information:
- Name: ${name}
- Email: ${email}

Project Summary:
${message}

Timestamp: ${new Date().toLocaleString()}
    `,
  };

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO || process.env.EMAIL_USER, // Send to inquiries@stepweaver.dev or fallback to sender
    replyTo: email,
    subject: emailContent.subject,
    html: emailContent.html,
    text: emailContent.text,
  };

  const transport = getTransporter();
  return await transport.sendMail(mailOptions);
};

// Send confirmation email to user
export const sendConfirmationEmail = async (formData) => {
  const { name, email, message } = formData;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Thank you for contacting us',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Thank you for reaching out!</h2>
        <p>Hi ${name},</p>
        <p>We've received your message and will get back to you as soon as possible.</p>
        <p>Here's a copy of your message:</p>
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
        <p>Best regards,<br>Stephen<br>FOUNDER<br>λstepweaver</p>
      </div>
    `,
  };

  const transport = getTransporter();
  return await transport.sendMail(mailOptions);
};

// Check if email is configured
export const isEmailConfigured = () => {
  return !!(process.env.EMAIL_USER && process.env.EMAIL_PASS);
};

// Test email configuration
export const testEmailConfig = async () => {
  try {
    const transport = getTransporter();
    await transport.verify();
    return { success: true, message: 'Email configuration is valid' };
  } catch (error) {
    console.error('Email configuration test failed:', error);
    return { success: false, message: error.message };
  }
}; 