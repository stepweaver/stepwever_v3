import { PROJECTS_DATA } from './projectsData';

const FEATURED_ORDER = [
  'stepweaver-dev',
  'silent-auction',
  'bill-planner',
  'llambda-llm-agent',
  'portfolio-terminal',
  'iam-resist',
  'lcerebro',
  'lsigil-setup',
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
  'website-refreshes',
];

const CARD_COPY = {
  'silent-auction': {
    description:
      'Next.js + Supabase auction platform I built for a school PTO fundraiser. It replaced paper bidding with mobile sign-up, live bidding, QR-linked items, and closeout tools for organizers.',
    builtFor: 'a school PTO fundraiser',
    solved: 'paper bidding and live event admin overhead',
    delivered: 'a mobile-first auction system with live updates and organizer controls',
    actions: [
      'Real-time bidding flow with clear item status and winning bids during the event',
      'Organizer controls for opening and closing items, resolving ties, and announcing winners',
    ],
  },

  'iam-resist': {
    description:
      'Next.js publishing and merch system built to keep activism writing, curated feeds, and print-on-demand commerce in one maintainable codebase.',
    actions: [
      'Notion-powered feeds for voices, protest music, book club, journal, timeline, and Intel/Newswire, structured more like a small publication than a simple blog',
      'Stripe + Supabase + Printify shop for a multi-product sticker catalog, with order pages and email notifications for confirmation and shipping updates',
    ],
  },

  'llambda-llm-agent': {
    description:
      'Portfolio LLM agent that answers questions about my work in both the site chat and the terminal chat command.',
    builtFor: 'recruiters and clients trying to understand what I build',
    solved: 'too much portfolio clicking and not enough context',
    delivered: 'one shared chat backend across the site and terminal',
    actions: [
      'Terminal at `/terminal` with commands for resume, Codex, dice roller, chat, navigation, and small tools',
      'Shared λlambda chat backend used by both the terminal chat command and the web chat UI',
    ],
  },

  lcerebro: {
    description:
      'Postgres-backed memory layer for AI context I can actually own, with Slack ingest working now and MCP retrieval planned next.',
    builtFor: 'builders who do not want AI memory trapped in a vendor UI',
    solved: 'memory lock-in and treating chat history like infrastructure',
    delivered: 'a Postgres capture pipeline with pgvector and structured metadata',
    actions: [
      'Thought ingest from Slack into Postgres with embeddings and metadata',
      'MCP server for semantic search and retrieval across AI tools, currently in progress',
      'Build log documented in the Codex as λcerebro develops',
    ],
  },

  'bill-planner': {
    description:
      'Cashflow planning app that maps bills to income periods and tracks planned, pending, and paid using Neon + Drizzle.',
    builtFor: 'real household cashflow planning',
    solved: 'timing gaps between paychecks and due dates',
    delivered: 'a month view grouped by income window with a clear status flow',
    actions: [
      'Map each bill to a specific income period so you can see what each deposit is covering before the month starts',
      'Track each bill through planned, pending, and paid with a clear view of upcoming obligations and remaining room in each period',
    ],
  },

  'ai-integrations': {
    description:
      'AI integration work for teams that need practical automation, agents, or AI features wired into existing systems.',
    actions: [
      'Design and build AI-assisted workflows, agents, and internal tools around real business inputs and outputs',
      'Connect model APIs to existing systems without turning the stack into a science project',
    ],
  },

  'lambda-orthodontics': {
    description:
      'Vanilla JavaScript + Express orthodontic site demo showing how a practice site can handle marketing, scheduling, referrals, and patient flows without a heavy framework.',
    actions: [
      'Component-style ES modules with a custom router for client-side navigation, dynamic treatment and career pages, and scroll restoration',
      'Six demo forms wired to Express JSON endpoints with validation and UX feedback for proposal and pitch work',
    ],
  },

  'service-business-demo': {
    description:
      'Local-service SEO demo for HVAC-style businesses. It uses centralized content and generated location pages to handle the usual "service in city" landing-page problem at scale.',
    actions: [
      'Dynamic service and location pages generated from a shared content model to show a scalable pattern for local search pages',
      'Vanilla JavaScript frontend with Express lead forms, email notifications, and Google reCAPTCHA to model a real service-business flow',
    ],
  },

  'n8n-automations': {
    description:
      'n8n automation work that connects tools and removes repeat manual steps.',
    actions: [
      'Move data between apps with documented n8n workflows',
      'Replace repetitive copy-paste work with automations that can be monitored and maintained later',
    ],
  },

  'mishawaka-shower-booking': {
    description:
      'Shower booking system for a community food pantry, built entirely with Google Apps Script and Google Sheets. Guests reserve a slot, leave, and return during a short check-in window instead of waiting all day.',
    builtFor: 'a community food pantry',
    solved: 'all-day waiting and staff scheduling bottlenecks',
    delivered: 'a self-service booking flow with a staff dashboard',
    actions: [
      'Self-service mobile booking with one-slot-per-day limits, short check-in windows, and nightly cleanup so guests do not have to stay on-site all day',
      'Staff dashboard in Google Sheets with real-time booking visibility, rate limiting, and lock protection against double-booking',
    ],
  },

  'it-consulting': {
    description:
      'IT consulting focused on operations, tool cleanup, and getting systems to match how the business actually works.',
    actions: [
      'Systems analysis, tool selection support, and process review grounded in business analysis work',
      'Implementation support when the right answer is a working system, not another recommendation deck',
    ],
  },

  'orthodontic-tracker': {
    description:
      'Family orthodontic expander tracker for top and bottom turns, visit notes, and progress history.',
    actions: [
      'Log top and bottom expander turns with a clear due-today view a household can share',
      'Store visit notes and history in Supabase instead of scattering them across paper and text messages',
    ],
  },

  'soap-stache': {
    description:
      'Client-ready e-commerce demo built with Next.js, Sanity, and Stripe. It gives non-technical sellers product control and a realistic checkout flow without running a live store.',
    actions: [
      'Shopping cart and Stripe Checkout flow backed by a Sanity product catalog, intentionally kept in demo mode for safe exploration',
      'Michigan-themed storefront that gives content editors control through Sanity Studio while staying mobile-first and SEO-aware',
    ],
  },

  'rpg-dice-roller': {
    description:
      'Browser RPG utility built into the portfolio for actual tabletop use, with mixed dice pools, hold and reroll, keyboard shortcuts, and local history.',
    builtFor: 'real tabletop sessions',
    solved: 'slow dice math and awkward rerolls on mobile',
    delivered: 'a fast dice pool builder with hold, reroll, and saved history',
    actions: [
      'Mixed dice pools, hold and reroll, and keyboard shortcuts in a terminal-style UI',
      'Fully client-side with localStorage history, built as a reusable small tool instead of a one-off demo',
    ],
  },

  'stepweaver-dev': {
    description:
      'Custom Next.js portfolio platform: normal pages plus a command terminal, data-driven project case studies, Notion-fed codex, and one shared AI chat layer behind middleware-hardened APIs.',
    builtFor: 'visitors who want the whole system story, not a single UI trick',
    solved: 'treating the portfolio as a brochure when the repo is a small app platform',
    delivered: 'multi-surface App Router app with reusable `/projects/[slug]` rendering and protected shared chat',
    actions: [
      'App Router surfaces—homepage, terminal, codex, project pages, APIs—with structured data driving case studies instead of one-off templates',
      'CSP nonce middleware, same-origin and rate-limited API routes, sanitization, and dynamic imports for heavy client modules',
    ],
  },

  'portfolio-terminal': {
    description:
      'Interactive portfolio shell built in Next.js and React. It replaces standard navigation with commands for projects, AI chat, tools, contact, and utilities.',
    builtFor: 'people who want proof fast instead of clicking through a brochure',
    solved: 'portfolio browsing that hides the interesting parts behind normal navigation',
    delivered: 'a command-driven interface for projects, tools, and chat',
    actions: [
      'Terminal interface that routes visitors to resume, Codex, λlambda chat, contact flow, weather lookup, dice rolling, and embedded games from one surface',
      'Shared AI backend and dice engine with channel-aware behavior and crypto-backed randomness so the terminal behaves like an environment, not a visual skin',
    ],
  },

  'neon-profile-card': {
    description:
      'Homepage identity component built in Next.js, React, and Tailwind. It replaces a generic hero with a reusable operator-card UI that fits the rest of the terminal system.',
    actions: [
      'Reusable React component with a profile data model, IBM/OCR typography, and CRT-style glow treatment',
      'Matrix Sync status animation tuned to the λstepweaver terminal aesthetic',
    ],
  },

  'google-analytics': {
    description:
      'GA4 setup for businesses that need useful measurement, not just traffic totals, with event tracking tied to leads, pages, and conversion actions.',
    actions: [
      'Analytics setup that answers practical questions: where traffic comes from, which pages perform, and which actions convert',
      'Clean implementation, useful events, and reporting built for decisions instead of vanity metrics',
    ],
  },

  'website-refreshes': {
    description:
      'Modern website rebuilds and technical cleanup for businesses stuck with outdated sites, Facebook-only presence, weak lead capture, or disconnected tools.',
    actions: [
      'Rebuilds focused on practical problems: weak mobile UX, buried CTAs, poor inquiry flow, and disconnected tools',
      'Technical cleanup that turns a stale web presence into a usable business asset instead of a placeholder',
    ],
  },

  'lsigil-setup': {
    description:
      'Defining λsigil as a file-driven operational agent under λstepweaver: stable identity, durable workspace context, inspectable rules, and explicit model routing—usable for real work, not just a generic shell.',
    actions: [
      'Structured identity and memory through IDENTITY.md, SOUL.md, USER.md, MEMORY.md, and AGENTS.md so behavior is legible and versionable',
      'Validated the active workspace, gateway/TUI workflow, and model-routing policy for higher-value reasoning and coding work',
    ],
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

  const override = CARD_COPY[slug] || {};

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

/** Curated homepage carousel: same slugs as FEATURED_ORDER (7 items). Full catalog stays in CAROUSEL_PROJECTS. */
export const HOMEPAGE_FEATURED_SLUGS = [...FEATURED_ORDER];

export const HOMEPAGE_CAROUSEL_PROJECTS = HOMEPAGE_FEATURED_SLUGS.map(buildCard);

export const CAROUSEL_PROJECTS = projectOrder().map(buildCard);