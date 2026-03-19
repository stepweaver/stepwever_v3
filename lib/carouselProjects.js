import { PROJECTS_DATA } from './projectsData';

const FEATURED_ORDER = [
  'silent-auction',
  'bill-planner',
  'llambda-llm-agent',
  'portfolio-terminal',
  'iam-resist',
  'lcerebro',
];

const REMAINING_ORDER = [
  'ai-integrations',
  'lambda-orthodontics',
  'service-business-demo',
  'n8n-automations',
  'mishawaka-shower-booking',
  'it-consulting',
  'orthodontic-tracker',
  'soap-stache',
  'rpg-dice-roller',
  'neon-profile-card',
  'google-analytics',
];

const CARD_OVERRIDES = {
  'silent-auction': {
    description:
      'Built and donated for a school PTO fundraiser, this Next.js + Supabase auction platform replaced paper bidding with mobile onboarding, real-time bidding, QR item access, and organizer closeout tools.',
    builtFor: 'a school PTO fundraiser',
    solved: 'paper bidding and live-event admin chaos',
    delivered:
      'a mobile-first, real-time auction system with organizer controls',
    keywords: ['Fundraising', 'Real-time bidding', 'Next.js', 'Supabase'],
    actions: [
      'Real-time bidding experience for a school silent auction with clear item status and winning bids',
      'Operator controls for opening/closing items, resolving ties, and announcing winners at the end of the event',
    ],
    link: 'https://tinyurl.com/mary-frank-silent-auction',
    tags: ['Fundraising', 'Real-time', 'Next.js', 'Supabase'],
  },

  'iam-resist': {
    description:
      'Next.js publishing and merch platform built to unify activism content, editorial curation, and print-on-demand commerce in one maintainable system.',
    keywords: ['Notion CMS', 'Next.js', 'E-commerce', 'Stripe', 'Printify'],
    actions: [
      'Notion-powered feeds for voices, protest music, book club, journal, timeline, and Intel/Newswire content that make the site feel like a small publication rather than a simple blog',
      'Stripe + Supabase + Printify shop for a multi-product sticker catalog, with order pages and email notifications covering confirmation and shipping updates',
    ],
    tags: [
      'Web Development',
      'Next.js',
      'Notion API',
      'E-commerce',
      'Stripe',
      'Printify',
      'Supabase',
    ],
  },

  'llambda-llm-agent': {
    description:
      'Portfolio-native LLM chat agent that acts as my AI advocate across web chat and the terminal `chat <message>` command.',
    builtFor: 'recruiters and clients exploring λstepweaver',
    solved:
      'discovery friction across projects, resume, and “what does he actually do?”',
    delivered: 'one shared chat brain across web chat and terminal commands',
    keywords: ['AI', 'Terminal UI', 'Next.js'],
    actions: [
      'λstepweaver terminal at `/terminal` with commands for resume, Codex, dice roller, chat, navigation, and small tools',
      'Shared λlambda chat backend powering both the terminal `chat <message>` command and web chat surfaces',
    ],
    tags: ['AI', 'Terminal UI', 'Interactive'],
  },

  lcerebro: {
    description:
      'Postgres-backed memory layer for people who want AI context they actually own, with Slack capture now working and MCP-based retrieval planned next.',
    builtFor: 'builders who want AI context they actually own',
    solved: 'memory lock-in and fragile prompt-history-as-infrastructure',
    delivered:
      'a Postgres-backed capture pipeline with pgvector and metadata',
    keywords: ['AI', 'Postgres', 'MCP', 'Memory Layer', 'Build in Progress'],
    actions: [
      'Thought ingest via Slack → embedding + metadata → Postgres with pgvector',
      'MCP server for semantic search and retrieval in any AI tool (in progress)',
      'Build log chronicled in the Codex as λcerebro evolves',
    ],
    tags: ['AI', 'Postgres', 'MCP', 'Memory Layer', 'Build in Progress'],
    comingSoon: true,
  },

  'bill-planner': {
    description:
      'Bill and income planning app that lets you map expenses onto income periods and track planned vs pending vs paid using Neon + Drizzle.',
    builtFor: 'real household cashflow planning',
    solved: 'timing blind spots between paychecks and due dates',
    delivered:
      'a month view grouped into income windows with a clear status pipeline',
    keywords: ['Budgeting', 'Planning', 'Neon', 'Drizzle'],
    actions: [
      'Map each bill to a specific income period so you can see which deposits are covering which expenses before the month starts',
      'Track the lifecycle of each bill (planned → pending → paid) with an at-a-glance view of upcoming obligations and leftover room in each period',
    ],
    tags: ['Budgeting', 'Planning', 'Neon', 'Drizzle'],
  },

  'ai-integrations': {
    description:
      'AI tool integration services to enhance workflows and build AI-native products.',
    keywords: ['AI Integration', 'Machine Learning', 'Productivity'],
    actions: [
      'Design and implementation of AI-assisted workflows, agents, and internal tools',
      'Groq/OpenAI-backed integrations similar to the λlambda agent that plug into existing systems',
    ],
    tags: ['AI Integration', 'Machine Learning', 'Productivity'],
    isService: true,
  },

  'lambda-orthodontics': {
    description:
      'Vanilla JavaScript + Express orthodontic demo built to show how a practice site can combine marketing, scheduling, referrals, and patient flows in one maintainable system without a heavy framework.',
    keywords: ['Healthcare', 'Website', 'Vanilla JS', 'Demo Forms'],
    actions: [
      'Component-style ES modules with a custom Router for client-side navigation, dynamic treatment and career pages, and scroll restoration',
      'Six demo forms wired to Express JSON demo APIs with validation and UX feedback for agency-style pitches',
    ],
    tags: ['Web Development', 'Healthcare', 'Forms'],
  },

  'service-business-demo': {
    description:
      "Local-service SEO demo built for heating-and-air style businesses, using centralized content and generated location pages to solve the 'service in city' landing-page problem at scale.",
    keywords: [
      'Service Business',
      'Local SEO',
      'Marketing Site',
      'Vanilla JS',
      'Express',
    ],
    actions: [
      'Dynamic service and location pages generated from a shared content model, designed to showcase SEO-friendly patterns for “service in city” searches',
      'Lightweight vanilla JavaScript frontend with Express-based lead-capture forms, email notifications, and Google reCAPTCHA to simulate real business flows',
    ],
    tags: [
      'Web Development',
      'SEO',
      'Agency Demo',
      'Vanilla JS',
      'Express',
    ],
  },

  'n8n-automations': {
    description:
      'Custom automation workflows built with n8n to connect your apps and eliminate manual tasks.',
    keywords: ['Automation', 'n8n', 'Workflow Integration'],
    actions: [
      'Connect apps and services with n8n workflows that move data reliably between tools',
      'Replace repetitive copy-paste work with documented, monitored automations',
    ],
    tags: ['Automation', 'n8n', 'Workflow Integration'],
    isService: true,
  },

  'mishawaka-shower-booking': {
    description:
      'Zero-cost, zero-infrastructure shower booking system for a community food pantry, built entirely with Google Apps Script and Google Sheets so guests can book a specific slot, leave, and return within a short check-in window instead of waiting around all day.',
    builtFor: 'a community food pantry',
    solved: 'all-day waiting and staff scheduling bottlenecks',
    delivered: 'a self-service slot booking flow with a staff dashboard',
    keywords: [
      'Google Apps Script',
      'Community Service',
      'Zero Infrastructure',
    ],
    actions: [
      'Self-service mobile booking with one-slot-per-day limits, short check-in windows, and nightly data cleanup so guests do not have to wait on-site all day',
      'Staff dashboard backed by Google Sheets with real-time booking visibility, rate limiting, and lock protection to prevent double-bookings',
    ],
    tags: ['Google Apps Script', 'PWA', 'Community Service'],
  },

  'it-consulting': {
    description:
      'Strategic IT consulting to streamline operations, clean up tool sprawl, and align systems with business goals.',
    keywords: ['IT Consulting', 'Strategic Planning', 'System Integration'],
    actions: [
      'Technology roadmapping, vendor selection support, and systems analysis rooted in business analysis experience',
      'Hands-on implementation support to make sure plans become working systems, not just slide decks',
    ],
    tags: ['IT Consulting', 'Strategic Planning', 'System Integration'],
    isService: true,
  },

  'orthodontic-tracker': {
    description:
      'Family orthodontic expander tracker to log top and bottom turns, visit notes, and progress over time.',
    keywords: ['Health Tracking', 'Family Tools'],
    actions: [
      'Tracks top and bottom expander turns with a clear “what is due today” view a household can share',
      'Backed by Supabase so visit notes and history stay organized instead of scattered across paper and texts',
    ],
    tags: ['Health', 'Family Tools'],
  },

  'soap-stache': {
    description:
      'Client-ready e-commerce demo built with Next.js, Sanity, and Stripe so non-technical sellers can manage products and test a realistic checkout flow without running a live store.',
    keywords: ['E-commerce', 'Next.js', 'Sanity CMS', 'Stripe'],
    actions: [
      'Complete shopping cart and Stripe Checkout flow backed by a Sanity-powered product catalog, wired intentionally in demo/test mode for safe exploration',
      'Michigan-themed, mobile-first storefront that gives content editors autonomy via Sanity Studio while staying SEO-aware and portfolio-ready',
    ],
    tags: ['E-commerce', 'Next.js', 'Sanity CMS', 'Stripe'],
    isDemo: true,
  },

  'rpg-dice-roller': {
    description:
      'Browser-based RPG utility built into the portfolio for real tabletop play, with mixed dice pools, hold-and-reroll, keyboard shortcuts, and local history.',
    builtFor: 'real tabletop sessions',
    solved: 'slow dice math and awkward rerolls on mobile',
    delivered:
      'a fast dice pool builder with hold/reroll and persisted history',
    keywords: ['Gaming', 'Interactive', 'Web App', 'RPG', 'Client-side'],
    actions: [
      'Mixed dice pools, hold & reroll, and keyboard shortcuts in a terminal-styled UI',
      'Fully client-side with localStorage history, built as a reusable small product rather than a one-off demo',
    ],
    tags: ['Web Development', 'Gaming', 'Interactive', 'Terminal'],
  },

  'portfolio-terminal': {
    description:
      'Interactive portfolio shell built in Next.js and React that replaces brochure-style navigation with a command-driven interface for projects, AI chat, tools, contact, and utilities.',
    builtFor: 'people who want proof fast, not a brochure',
    solved: 'portfolio browsing that feels like homework',
    delivered:
      'a command-driven interface that routes to projects, tools, and chat',
    keywords: ['Terminal UI', 'Next.js', 'React', 'AI'],
    actions: [
      'Interactive portfolio terminal that routes visitors into resume, Codex, λlambda chat, contact flow, weather lookup, dice rolling, and embedded games from a single surface',
      'Shared AI backend and dice engine with channel-aware behavior and crypto-backed randomness so the terminal feels like a real operating environment, not just a skin',
    ],
    tags: ['Web Development', 'Terminal UI', 'Interactive', 'AI'],
  },

  'neon-profile-card': {
    description:
      'Homepage identity system built in Next.js, React, and Tailwind to replace a generic hero with a reusable operator-card UI that strengthens branding and first impression.',
    keywords: ['UI System', 'Tailwind CSS', 'React', 'Animation'],
    actions: [
      'Reusable React component with a profile data model, IBM/OCR typography, and CRT-styled glow',
      'Matrix Sync status animation tuned to the λstepweaver terminal aesthetic',
    ],
    tags: ['UI Design', 'Tailwind CSS', 'Animation', 'React'],
  },

  'google-analytics': {
    description:
      'GA4 measurement setup for businesses that need more than vanity traffic numbers, with event tracking and reporting tied to real leads, pages, and conversion actions.',
    keywords: ['Analytics', 'Data Tracking', 'Business Intelligence'],
    actions: [
      'Practical analytics that answer real questions: where traffic comes from, which pages perform, and which actions convert',
      'Clean implementation, useful events, and reporting that supports better decisions',
    ],
    tags: ['Analytics', 'Data Tracking', 'Business Intelligence'],
    isService: true,
  },
};

function compactArray(values = []) {
  return [...new Set(values.filter(Boolean))];
}

function projectOrder() {
  const ordered = [...FEATURED_ORDER, ...REMAINING_ORDER];
  const seen = new Set(ordered);

  const extras = Object.keys(PROJECTS_DATA).filter((slug) => !seen.has(slug));

  return [...ordered, ...extras];
}

function buildActions(project, override) {
  if (override.actions) return override.actions;

  if (Array.isArray(project.keyFeatures) && project.keyFeatures.length > 0) {
    return project.keyFeatures.slice(0, 2).map((item) => {
      if (!item?.title && !item?.description) return null;
      if (item.title && item.description) return `${item.title} — ${item.description}`;
      return item.title || item.description;
    }).filter(Boolean);
  }

  if (Array.isArray(project.features)) {
    return project.features.slice(0, 2);
  }

  return [];
}

function buildKeywords(project, override) {
  if (override.keywords) return override.keywords;
  if (project.keywords) return project.keywords;
  if (Array.isArray(project.tags)) return project.tags.slice(0, 4);
  return [];
}

function buildCard(slug) {
  const project = PROJECTS_DATA[slug];

  if (!project) {
    throw new Error(`Missing project for carousel slug: ${slug}`);
  }

  const override = CARD_OVERRIDES[slug] || {};

  return {
    title: override.title ?? project.title,
    description: override.description ?? project.description,
    builtFor: override.builtFor ?? project.builtFor ?? null,
    solved: override.solved ?? project.solved ?? null,
    delivered: override.delivered ?? project.delivered ?? null,
    imageUrl: override.imageUrl ?? project.imageUrl ?? null,
    keywords: compactArray(buildKeywords(project, override)),
    actions: compactArray(buildActions(project, override)),
    link: override.link ?? project.link ?? null,
    githubRepo: override.githubRepo ?? project.githubRepo ?? null,
    tags: compactArray(override.tags ?? project.tags ?? []),
    slug,
    isService: override.isService ?? project.isService ?? false,
    comingSoon: override.comingSoon ?? project.comingSoon ?? false,
    isDemo: override.isDemo ?? project.isDemo ?? false,
  };
}

export const CAROUSEL_PROJECTS = projectOrder().map(buildCard);