export const CAROUSEL_PROJECTS = [
  // Featured: strongest, most legible proof
  {
    title: 'Silent Auction Platform',
    description:
      'Live event fundraising app with real-time bidding, QR-access bidding links, and an operator dashboard used for a real school auction.',
    imageUrl: '/images/screely-llambda.png',
    keywords: ['Fundraising', 'Real-time bidding', 'Next.js', 'Supabase'],
    actions: [
      'Real-time bidding experience for a school silent auction with clear item status and winning bids',
      'Operator controls for opening/closing items, resolving ties, and announcing winners at the end of the event',
    ],
    tags: ['Fundraising', 'Real-time', 'Next.js', 'Supabase'],
    slug: 'silent-auction',
  },
  {
    title: 'I AM [RESIST]',
    description:
      'Mission-driven publishing and commerce platform that combines multi-source content ingestion, editorial curation, and a print-on-demand sticker shop powered by Notion, Stripe, Supabase, and Printify.',
    imageUrl: '/images/resist_sticker.png',
    keywords: ['Notion CMS', 'Next.js', 'E-commerce', 'Stripe', 'Printify'],
    actions: [
      'Notion-powered feeds for voices, protest music, book club, journal, timeline, and Intel/Newswire content that make the site feel like a small publication rather than a simple blog',
      'Stripe + Supabase + Printify shop for a multi-product sticker catalog, with order pages and email notifications covering confirmation and shipping updates',
    ],
    link: 'https://iamresist.org',
    tags: ['Web Development', 'Next.js', 'Notion API', 'E-commerce', 'Stripe', 'Printify', 'Supabase'],
    slug: 'iam-resist',
  },
  {
    title: 'λlambda LLM Agent',
    description:
      'Groq-powered portfolio-native agent that lives in both the terminal and the UI, a shared multi-surface AI routed through one protected `/api/chat` endpoint.',
    imageUrl: '/images/chatbot.png',
    keywords: ['AI', 'LLM', 'Portfolio', 'Terminal UX'],
    actions: [
      'Shared AI architecture across website widget, page chat, and terminal command with channel-aware behavior',
      'Server-only prompt discipline, Groq-first provider strategy, and OpenAI fallback behind a single secured route',
    ],
    link: '/terminal',
    tags: ['AI', 'LLM', 'Next.js', 'Portfolio', 'Terminal UX', 'Groq', 'OpenAI'],
    slug: 'llambda-llm-agent',
  },
  {
    title: 'λcerebro',
    description:
      'Postgres-backed memory layer for thoughts: capture via Slack, retrieve via MCP. Your second brain, owned by you.',
    imageUrl: '/images/cerebro.png',
    keywords: ['AI', 'Postgres', 'MCP', 'Memory Layer', 'Build in progress'],
    actions: [
      'Thought ingest via Slack → embedding + metadata → Postgres with pgvector',
      'MCP server for semantic search and retrieval in any AI tool (in progress)',
      'Build log chronicled in the Codex as λcerebro evolves',
    ],
    tags: ['AI', 'Postgres', 'MCP', 'Memory Layer', 'Build in progress'],
    slug: 'lcerebro',
    comingSoon: true,
  },
  {
    title: 'Bill Planner',
    description:
      'Bill and income planning app that lets you map expenses onto income periods and track planned vs pending vs paid using Neon + Drizzle.',
    imageUrl: '/images/screely-llambda.png',
    keywords: ['Budgeting', 'Planning', 'Neon', 'Drizzle'],
    actions: [
      'Map each bill to a specific income period so you can see which deposits are covering which expenses before the month starts',
      'Track the lifecycle of each bill (planned → pending → paid) with an at-a-glance view of upcoming obligations and leftover room in each period',
    ],
    tags: ['Budgeting', 'Planning', 'Neon', 'Drizzle'],
    slug: 'bill-planner',
  },

  // More Work – core services and agency/client builds
  {
    title: 'AI Integrations',
    description: 'AI tool integration services to enhance workflows and build AI-native products.',
    imageUrl: '/images/ai_integrations.png',
    keywords: ['AI Integration', 'Machine Learning', 'Productivity'],
    actions: [
      'Design and implementation of AI-assisted workflows, agents, and internal tools',
      'Groq/OpenAI-backed integrations similar to the λlambda agent that plug into existing systems',
    ],
    tags: ['AI Integration', 'Machine Learning', 'Productivity'],
    slug: 'ai-integrations',
    isService: true,
  },
  {
    title: 'Lambda Orthodontics Website - Demo',
    description:
      'Demo orthodontic practice site built with vanilla JavaScript and Express.js, using a custom SPA router, modular components and a centralised siteData file.',
    imageUrl: '/images/screely-lambda.png',
    keywords: ['Healthcare', 'Website', 'Vanilla JS', 'Demo Forms'],
    actions: [
      'Component-style ES modules with a custom Router for client-side navigation, dynamic treatment/career pages and scroll restoration',
      'Six demo forms (contact, schedule, referral, careers, portal, newsletter) wired to Express JSON demo APIs with validation and UX feedback for agency-style pitches',
    ],
    link: 'https://lambdaortho.vercel.app/',
    tags: ['Web Development', 'Healthcare', 'Forms'],
    slug: 'lambda-orthodontics',
  },
  {
    title: 'λlambda Heating & Air',
    description:
      'Local-service SEO demo for a heating and air business, built around centralized content and generated service/location landing pages on a lightweight vanilla JS + Express stack.',
    imageUrl: '/images/screely-llambda.png',
    keywords: ['Service Business', 'Local SEO', 'Marketing Site', 'Vanilla JS', 'Express'],
    actions: [
      'Dynamic service and location pages generated from a shared content model, designed to showcase SEO-friendly patterns for “service in city” searches.',
      'Lightweight vanilla JavaScript frontend with Express-based lead-capture forms, email notifications, and Google reCAPTCHA to simulate real business flows.',
    ],
    tags: ['Web Development', 'SEO', 'Agency Demo', 'Vanilla JS', 'Express'],
    slug: 'service-business-demo',
  },
  {
    title: 'n8n Automations',
    description: 'Custom automation workflows built with n8n to connect your apps and eliminate manual tasks.',
    imageUrl: '/images/n8n_automations.png',
    keywords: ['Automation', 'n8n', 'Workflow Integration'],
    actions: [
      'Connect apps and services with n8n workflows that move data reliably between tools',
      'Replace repetitive copy-paste work with documented, monitored automations',
    ],
    tags: ['Automation', 'n8n', 'Workflow Integration'],
    slug: 'n8n-automations',
    isService: true,
  },
  {
    title: 'Mishawaka Shower Booking System',
    description:
      'Zero-cost, zero-infrastructure shower booking system for a community food pantry, built entirely with Google Apps Script and Google Sheets so guests can book a specific slot, leave, and return within a short check-in window instead of waiting around all day.',
    imageUrl: '/images/screely-llambda.png',
    keywords: ['Google Apps Script', 'Community Service', 'Zero Infrastructure'],
    actions: [
      'Self-service mobile booking with one-slot-per-day limits, short check-in windows, and nightly data cleanup so guests do not have to wait on-site all day',
      'Staff dashboard backed by Google Sheets with real-time booking visibility, rate limiting, and lock protection to prevent double-bookings',
    ],
    tags: ['Google Apps Script', 'PWA', 'Community Service'],
    slug: 'mishawaka-shower-booking',
  },
  {
    title: 'IT Consulting',
    description: 'Strategic IT consulting to streamline operations, clean up tool sprawl, and align systems with business goals.',
    imageUrl: '/images/it_consulting.png',
    keywords: ['IT Consulting', 'Strategic Planning', 'System Integration'],
    actions: [
      'Technology roadmapping, vendor selection support, and systems analysis rooted in 8+ years as a business analyst',
      'Hands-on implementation support to make sure plans become working systems, not just slide decks',
    ],
    tags: ['IT Consulting', 'Strategic Planning', 'System Integration'],
    slug: 'it-consulting',
    isService: true,
  },
  {
    title: 'Orthodontic / Expansion Tracker',
    description:
      'Family orthodontic expander tracker to log top/bottom turns, visit notes, and progress over time.',
    imageUrl: '/images/screely-llambda.png',
    keywords: ['Health Tracking', 'Family Tools'],
    actions: [
      'Tracks top and bottom expander turns with a clear “what is due today” view your household can share',
      'Backed by Supabase so visit notes and history stay organized instead of scattered across paper and texts',
    ],
    tags: ['Health', 'Family Tools'],
    slug: 'orthodontic-tracker',
  },

  // Additional work and services
  {
    title: 'Soap Stache',
    description:
      'Demo-mode e-commerce storefront for handcrafted soaps with a full shopping cart, Sanity CMS-backed product catalog, and Stripe-powered checkout that never charges real cards.',
    imageUrl: '/images/screely-stache.png',
    keywords: ['E-commerce', 'Next.js', 'Sanity CMS', 'Stripe'],
    actions: [
      'Complete shopping cart and Stripe Checkout flow backed by a Sanity-powered product catalog, wired intentionally in demo/test mode for safe exploration',
      'Michigan-themed, mobile-first storefront that gives content editors autonomy via Sanity Studio while staying SEO-aware and portfolio-ready',
    ],
    link: 'https://app-soap-stache.vercel.app/',
    tags: ['E-commerce', 'Next.js', 'Sanity CMS', 'Stripe'],
    slug: 'soap-stache',
    isDemo: true,
  },
  {
    title: 'RPG Dice Roller',
    description:
      'Fully client-side RPG dice roller with hold & reroll, persistent history, and keyboard shortcuts. No data sent to the server.',
    imageUrl: '/images/screely-llambda.png',
    keywords: ['Gaming', 'Interactive', 'Web App', 'RPG', 'Client-side'],
    actions: [
      'Dice pool builder with hold & reroll for advantage/disadvantage-style mechanics',
      'Persistent history in localStorage plus terminal integration via the `roll` command',
    ],
    link: '/dice-roller',
    tags: ['Web Development', 'Gaming', 'Interactive'],
    slug: 'rpg-dice-roller',
  },
  {
    title: 'Profile Card',
    description:
      'Glassmorphism-inspired ID card with neon CRT glow and an animated Matrix Sync terminal sequence that powers the portfolio hero.',
    imageUrl: '/images/screely-profilcard.png',
    keywords: ['UI System', 'Tailwind CSS', 'Neon', 'React'],
    actions: [
      'Reusable React component with a profile data model, IBM/OCR typography, and CRT-styled glow',
      'Matrix Sync status animation tuned to the λstepweaver terminal aesthetic',
    ],
    tags: ['UI Design', 'Tailwind CSS', 'Animation', 'React'],
    slug: 'neon-profile-card',
  },
  {
    title: 'Google Analytics',
    description: 'Analytics setup, GA4 migrations, and dashboards so you can actually see what your site is doing.',
    imageUrl: null,
    keywords: ['Analytics', 'Data Tracking', 'Business Intelligence'],
    actions: [
      'GA4, Tag Manager, and Looker Studio setup focused on the events and conversions that matter to your business',
      'Data quality audits and reporting so dashboards turn into decisions, not just charts',
    ],
    tags: ['Analytics', 'Data Tracking', 'Business Intelligence'],
    slug: 'google-analytics',
    isService: true,
  },
  {
    title: 'Portfolio Terminal UI',
    description:
      'Command-driven portfolio interface that turns a typical developer site into an interactive system surface for navigation, AI chat, utilities, and small tools.',
    imageUrl: '/images/screely-llambda.png',
    keywords: ['Terminal UX', 'AI', 'Interactive', 'Web App', 'Portfolio'],
    actions: [
      'Browser-first terminal that routes into resume, Codex, AI chat, contact, games, weather lookup, and dice rolling from one interface',
      'Shared command and AI architecture that reuses the protected chat backend and dice engine used across the rest of the portfolio',
    ],
    link: '/terminal',
    tags: ['Web Development', 'Terminal UX', 'AI', 'Interactive'],
    slug: null,
  },
];
