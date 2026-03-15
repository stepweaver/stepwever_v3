export const CAROUSEL_PROJECTS = [
  {
    title: 'λcerebro',
    description:
      'Postgres-backed memory for thoughts. Capture via Slack, retrieve via MCP. Your second brain, owned by you. Read the build log in the Codex.',
    imageUrl: '/images/cerebro.png',
    keywords: ['AI', 'Postgres', 'MCP', 'Memory Layer', 'Build in progress'],
    actions: [
      'Thought ingest via Slack → embedding + metadata → Postgres with pgvector',
      'MCP server for semantic search and retrieval in any AI tool',
      'Deep-dive writeup: “Building cerebro - a Postgres + MCP memory layer for AI tools” in the Codex',
    ],
    tags: ['AI', 'Postgres', 'MCP', 'Memory Layer', 'Build in progress'],
    slug: 'lcerebro',
    comingSoon: true,
  },
  {
    title: 'λlambda LLM Agent',
    description:
      "Productized portfolio infrastructure: shared multi-surface AI (widget, page chat, terminal) through one protected route. Server-only prompt, channel-aware behavior-built, not pasted in.",
    imageUrl: '/images/chatbot.png',
    keywords: ['AI', 'LLM', 'Portfolio', 'Terminal UX'],
    actions: [
      'Shared AI architecture across website widget, page chat, and terminal command',
      'Channel-aware behavior: terminal plain-text, website chat with markdown',
    ],
    link: '/terminal',
    tags: ['AI', 'LLM', 'Next.js', 'Portfolio', 'Terminal UX', 'Groq', 'OpenAI'],
    slug: 'llambda-llm-agent',
  },
  {
    title: 'AI Integrations',
    description: 'AI tool integration to enhance workflows.',
    imageUrl: '/images/ai_integrations.png',
    keywords: ['AI Integration', 'Machine Learning', 'Productivity'],
    actions: [
      'Custom AI solutions for business needs',
      'Enhanced workflows with intelligent automation',
    ],
    tags: ['AI Integration', 'Machine Learning', 'Productivity'],
    slug: 'ai-integrations',
    isService: true,
  },
  {
    title: 'Lambda Orthodontics Website - Demo',
    description:
      'Demo orthodontic practice site with modular vanilla JS, client-side routing, and centralised data.',
    imageUrl: '/images/screely-lambda.png',
    keywords: ['Healthcare', 'Website', 'Vanilla JS', 'Demo Forms'],
    actions: [
      'Modular components and client-side Router without a framework',
      'Six demo forms (contact, schedule, referral, careers, portal, newsletter)',
    ],
    link: 'https://lambdaortho.vercel.app/',
    tags: ['Web Development', 'Healthcare', 'Forms'],
    slug: 'lambda-orthodontics',
  },
  {
    title: 'n8n Automations',
    description: 'Custom automation workflows to connect apps.',
    imageUrl: '/images/n8n_automations.png',
    keywords: ['Automation', 'n8n', 'Workflow Integration'],
    actions: [
      'Connect apps and services seamlessly',
      'Automate repetitive tasks and data transfers',
    ],
    tags: ['Automation', 'n8n', 'Workflow Integration'],
    slug: 'n8n-automations',
    isService: true,
  },
  {
    title: 'Soap Stache',
    description: 'E-commerce platform with shopping cart and Stripe payments.',
    imageUrl: '/images/screely-stache.png',
    keywords: ['E-commerce', 'Next.js', 'Sanity CMS', 'Stripe'],
    actions: [
      'Complete shopping cart and checkout with Stripe integration',
      'Content management through Sanity CMS',
    ],
    link: 'https://app-soap-stache.vercel.app/',
    tags: ['E-commerce', 'Next.js', 'Sanity CMS', 'Stripe'],
    slug: 'soap-stache',
    isDemo: true,
  },
  {
    title: 'IT Consulting',
    description: 'Strategic IT consulting to streamline operations.',
    imageUrl: '/images/it_consulting.png',
    keywords: ['IT Consulting', 'Strategic Planning', 'System Integration'],
    actions: [
      'Technology planning and implementation',
      'System optimization and workflow improvement',
    ],
    tags: ['IT Consulting', 'Strategic Planning', 'System Integration'],
    slug: 'it-consulting',
    isService: true,
  },
  {
    title: 'I AM [RESIST]',
    description:
      'A personal, antifascist project combining activism, journalism and e-commerce-curated multimedia, journal, timeline and Resist merchandise.',
    imageUrl: '/images/screely-resist.png',
    keywords: ['Activism', 'Notion API', 'Next.js', 'E-commerce', 'Stripe', 'Printify'],
    actions: [
      'Daily Brief trending feed (Supabase + YouTube API) refreshed via cron',
      'Notion CMS for curated content, journal, book club; Stripe + Printify shop',
    ],
    link: 'https://iamresist.org',
    tags: ['Web Development', 'Next.js', 'Notion API', 'E-commerce', 'Stripe', 'Printify', 'Supabase'],
    slug: 'iam-resist',
  },
  {
    title: 'RPG Dice Roller',
    description:
      'Fully client-side RPG dice roller with hold & reroll, persistent history and keyboard shortcuts. No data sent to server.',
    imageUrl: '/images/screely-dice.png',
    keywords: ['Gaming', 'Interactive', 'Web App', 'RPG', 'Client-side'],
    actions: [
      'Dice pool builder with hold & reroll for advantage/disadvantage',
      'Persistent history in localStorage; keyboard shortcuts',
    ],
    link: '/dice-roller',
    tags: ['Web Development', 'Gaming', 'Interactive'],
    slug: 'rpg-dice-roller',
  },
  {
    title: 'Profile Card',
    description:
      'Glassmorphism-inspired ID card with neon CRT glow and animated Matrix Sync terminal sequence.',
    imageUrl: '/images/screely-profilcard.png',
    keywords: ['UI System', 'Tailwind CSS', 'Neon', 'React'],
    actions: [
      'Reusable React component with profile data model and IBM/OCR typography',
      'Animated Matrix Sync terminal sequence with React state and animation hooks',
    ],
    tags: ['UI Design', 'Tailwind CSS', 'Animation', 'React'],
    slug: 'neon-profile-card',
  },
  {
    title: 'Google Analytics',
    description: 'Analytics setup and optimization for tracking.',
    imageUrl: null,
    keywords: ['Analytics', 'Data Tracking', 'Business Intelligence'],
    actions: [
      'Comprehensive tracking setup and configuration',
      'Actionable insights from business data',
    ],
    tags: ['Analytics', 'Data Tracking', 'Business Intelligence'],
    slug: 'google-analytics',
    isService: true,
  },
];
