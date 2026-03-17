# λstepweaver portfolio & terminal

Practical transformations, powered by code — presented as a terminal-first portfolio with embedded case studies, utilities, and services.

## Key surfaces

- Terminal UI at `/terminal` with command-driven navigation, tools, and chat
- λlambda LLM agent for portfolio-native AI chat (terminal `chat <message>` and web chat surfaces)
- Project detail system at `/projects/[slug]` for case studies like the Silent Auction Platform, I AM [RESIST], and service offerings
- Embedded utilities such as the RPG Dice Roller and Neon profile card demo

## Features

- Reusable CRT-inspired hero UI with Operator Card, animated status pill, and Matrix Sync terminal effects
- Modern Next.js 15 with App Router
- Tailwind CSS for styling
- Contact form with Nodemailer integration
- Terminal-style UI components
- λlambda LLM agent for portfolio-native AI chat
- Responsive design

## Flagship systems

- **λlambda LLM Chat Agent**: Branded portfolio-native chat agent that shares a protected `/api/chat` route across web chat and the terminal, helping visitors ask questions about experience and projects and routing them to relevant case studies.
- **Silent Auction Platform**: Next.js + Supabase auction platform built and donated for a school PTO fundraiser, with real-time bidding, QR item access, donor tools, and organizer closeout workflows.
- **I AM [RESIST]**: Next.js publishing and merch system that ties Notion-powered editorial content to a Stripe/Printify shop, designed as a small activism publication rather than a simple blog.

### Related docs

- AI setup: [docs/AI_CHAT_SETUP.md](./docs/AI_CHAT_SETUP.md)
- λlambda case study: visit `/projects/llambda-llm-agent` in the running app

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
