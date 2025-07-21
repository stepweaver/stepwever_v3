# StepWeaver v3

Growth Systems for Fast-Moving Businesses

## Features

- Modern Next.js 15 with App Router
- Tailwind CSS for styling
- Contact form with Nodemailer integration
- Terminal-style UI components
- Responsive design

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up email configuration (see [EMAIL_SETUP.md](./EMAIL_SETUP.md)):

   ```bash
   # Create .env.local file with your email credentials
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_TO=inquiries@stepweaver.dev
   SEND_CONFIRMATION_EMAIL=false
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Test email configuration:
   - Use the contact form to send test messages
   - Emails will be sent to inquiries@stepweaver.dev

## Email Setup

For detailed email configuration instructions, see [EMAIL_SETUP.md](./EMAIL_SETUP.md).

**Important**: To send emails to `inquiries@stepweaver.dev`, add `EMAIL_TO=inquiries@stepweaver.dev` to your `.env.local` file.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
├── app/                 # Next.js App Router
│   ├── api/            # API routes
│   │   └── contact/    # Contact form handler
│   └── contact/        # Contact page
├── components/         # React components
├── utils/             # Utility functions
│   └── email.js       # Email utilities
└── public/            # Static assets
```

## Technologies Used

- Next.js 15
- React 19
- Tailwind CSS
- Nodemailer
- Lucide React Icons
- React Icons
