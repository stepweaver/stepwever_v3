# stepweaver v3

Practical transformations, powered by code.

## Features

- Modern Next.js 15 with App Router
- Tailwind CSS for styling
- Contact form with Nodemailer integration
- Terminal-style UI components
- λlambda LLM agent for portfolio-native AI chat
- Responsive design

## Featured Project: λlambda LLM Agent

λlambda is the branded LLM agent built into this portfolio. It acts as Stephen Weaver's AI advocate and thinking partner, helping visitors understand his background, projects, and working style through conversational UI across both the website and the terminal.

Instead of behaving like a generic chatbot, λlambda is wired directly into the portfolio experience: the same protected `/api/chat` route powers the website chat surfaces and the terminal `chat <message>` command, with channel-aware behavior for each surface. Under the hood, the agent prefers Groq for fast, free usage and falls back to OpenAI when configured.

- Answers questions about Stephen's experience, skills, and projects
- Routes visitors to relevant case studies and proof points
- Extends the terminal `chat <message>` command with a branded AI experience
- Uses Groq by default, with OpenAI as a fallback provider

### Related docs

- AI setup: [docs/AI_CHAT_SETUP.md](./docs/AI_CHAT_SETUP.md)
- Case study: visit `/projects/llambda-llm-agent` in the running app

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
   EMAIL_TO=stephen@stepweaver.dev
   SEND_CONFIRMATION_EMAIL=false
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Test email configuration:
   - Use the contact form to send test messages
   - Emails will be sent to stephen@stepweaver.dev

## Email Setup

For detailed email configuration instructions, see [EMAIL_SETUP.md](./EMAIL_SETUP.md).

**Important**: To send emails to `stephen@stepweaver.dev`, add `EMAIL_TO=stephen@stepweaver.dev` to your `.env.local` file.

## AI Chat Setup

The terminal includes a `chat` command powered by LLMs. For setup instructions, see [AI_CHAT_SETUP.md](./docs/AI_CHAT_SETUP.md).

**Quick setup** (free option):
```bash
# Add to .env.local
GROQ_API_KEY=gsk_your_key_here  # Get free key at https://console.groq.com/
```

The chat will automatically use Groq's free tier. OpenAI is supported as a fallback.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
├── app/                         # Next.js App Router
│   ├── terminal/                # Interactive terminal with `chat` command (λlambda surface)
│   ├── projects/
│   │   └── [slug]/              # Project detail pages (includes λlambda LLM agent case study)
│   ├── api/
│   │   ├── chat/                # Protected AI chat route for λlambda
│   │   └── contact/             # Contact form handler
│   └── contact/                 # Contact page
├── components/                  # React components
│   ├── Terminal/                # Terminal shell, commands, and UI
│   ├── ChatWidget/              # Floating/fullscreen website chat powered by λlambda
│   ├── ChatBot/                 # Dedicated page chat surface
│   └── Chat/                    # Shared chat message components
├── hooks/                       # Shared hooks (chat, scrolling, bot protection)
├── docs/                        # Documentation (email, AI chat setup, etc.)
├── utils/                       # Utility functions
└── public/                      # Static assets
```

## Technologies Used

- Next.js 15
- React 19
- Tailwind CSS
- Nodemailer
- Lucide React Icons
- React Icons
