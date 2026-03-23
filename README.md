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
- **Layout:** route groups separate default site chrome `(site)` from console-style pages `(console)` (no site footer) and embed-style pages `(embed)` (e.g. book-shower), so layout is composition—not DOM hacks

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
- `npm test` - Run Jest (security helpers, rate limit, Codex selectors, carousel slug checks, etc.)
- `npm run verify:carousel` - Quick Jest check that every homepage carousel slug exists in project data

## Project Structure

```
├── app/                         # Next.js App Router
│   ├── (site)/                  # Default chrome: navbar, footer, chat widget
│   │   ├── page.jsx             # Home
│   │   ├── codex/               # Blog / codex listing + posts
│   │   ├── contact/             # Contact page
│   │   ├── projects/page.jsx    # Project index
│   │   └── …                    # resume, meshtastic, privacy, etc.
│   ├── (console)/               # Console-style pages (nav + chat, no site footer)
│   │   ├── terminal/            # Interactive terminal (`chat` = λlambda)
│   │   ├── projects/[slug]/     # Case study detail (server shell + client page)
│   │   ├── dice-roller/
│   │   └── yankee-samurai/
│   ├── (embed)/                 # Minimal chrome (e.g. book-shower)
│   ├── api/
│   │   ├── chat/                # Protected AI chat (λlambda)
│   │   ├── contact/             # Contact form handler
│   │   ├── codex/               # Public post list JSON
│   │   ├── notion-image/        # Signed-token image URL refresh
│   │   └── …
│   └── layout.jsx               # Root: theme, analytics—chrome lives in route groups
├── components/                  # React components
│   ├── Terminal/                # Terminal shell, commands, and UI
│   ├── ChatWidget/              # Floating/fullscreen website chat powered by λlambda
│   ├── ChatBot/                 # Dedicated page chat surface
│   └── Chat/                    # Shared chat message components
├── hooks/                       # Shared hooks (chat, scrolling, bot protection)
├── lib/                         # apiSecurity, requestOrigin, codex/selectors, chat/requestBuilder, schemas, …
├── docs/                        # Documentation (email, AI chat setup, etc.)
├── utils/                       # Utility functions (rateLimit, safeHref, sanitize, …)
├── __tests__/                   # Jest tests for risky paths
└── public/                      # Static assets
```

## Technologies Used

- Next.js 15
- React 19
- Tailwind CSS
- Nodemailer
- Lucide React Icons
- React Icons
- Zod (API request validation)
- Jest + Testing Library (targeted tests for security and shared utilities)
