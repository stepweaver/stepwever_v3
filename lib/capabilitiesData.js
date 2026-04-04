/**
 * Capability-first proof model for /capabilities.
 * Each entry maps a capability to concrete evidence, related projects, and stack.
 */

export const CAPABILITY_BUCKETS = [
  {
    key: 'operational-web',
    title: 'Operational Web Platforms',
    description: 'Websites that function as part of the operation: intake, routing, content, booking, and lightweight app behavior.',
    evidence: [
      'Next.js App Router with production-grade route structure and metadata',
      'CMS integration patterns: Notion API (Codex), Sanity (Soap Stache)',
      'Lead capture and intake routing wired to real business flows',
      'Booking and scheduling surface (Mishawaka Shower Booking)',
      'Service business websites with functional forms and real output',
    ],
    relatedProjects: [
      { slug: 'stepweaver-dev', label: 'stepweaver.dev' },
      { slug: 'silent-auction', label: 'Silent Auction Platform' },
      { slug: 'soap-stache', label: 'Soap Stache' },
      { slug: 'mishawaka-shower-booking', label: 'Mishawaka Shower Booking' },
    ],
    stack: ['Next.js', 'React', 'Tailwind CSS', 'Notion API', 'Sanity CMS', 'Vercel'],
    trustFlags: ['Production-deployed', 'App Router', 'Real client work'],
  },
  {
    key: 'automation-integration',
    title: 'Automation and Integration',
    description: 'Tool handoffs, data sync, workflow automation, reporting flows, and AI-assisted operational glue that reduces manual work.',
    evidence: [
      'n8n multi-step workflow automation for business processes',
      'API-to-API integrations across CRM, data, and communication tools',
      'Shared API architecture serving multiple surfaces from one endpoint',
      'OpenRouter-based AI enrichment pipelines',
      'Scheduled reporting and status notification systems',
    ],
    relatedProjects: [
      { slug: 'n8n-automations', label: 'n8n Automations' },
      { slug: 'llambda-llm-agent', label: 'λlambda LLM Agent' },
      { slug: 'stepweaver-dev', label: 'stepweaver.dev' },
      { slug: 'lsigil-setup', label: 'λsigil Lead Ops Runtime' },
    ],
    stack: ['n8n', 'REST APIs', 'Webhooks', 'OpenRouter', 'Node.js', 'Next.js API routes'],
    trustFlags: ['Production flows', 'Multi-tool', 'Error-handled'],
  },
  {
    key: 'ai-systems',
    title: 'AI-Assisted Systems',
    description: 'LLM integration, prompt architecture, context management, and AI-native UX that does real work without feeling gimmicky.',
    evidence: [
      'λlambda: portfolio-native AI agent shared across web chat and terminal',
      'System prompt engineering with persona, boundaries, and context injection',
      'Multi-provider fallback (Groq → OpenAI) with rate limiting and bot detection',
      'Vision model routing for image-capable messages',
      'OpenRouter after acquisition in λsigil: analyst/skeptic passes and constrained drafting on static HTML evidence, not search or crawl',
      'Terminal AI bridge: shared /api/chat across two distinct UX surfaces',
    ],
    relatedProjects: [
      { slug: 'llambda-llm-agent', label: 'λlambda LLM Agent' },
      { slug: 'lsigil-setup', label: 'λsigil Lead Ops Runtime' },
      { slug: 'lcerebro', label: 'λcerebro' },
    ],
    stack: ['Groq', 'OpenAI', 'OpenRouter', 'Next.js API routes', 'Zod', 'Rate limiting'],
    trustFlags: ['Production-deployed', 'Security-hardened', 'Shared architecture'],
  },
  {
    key: 'protected-apis',
    title: 'Protected APIs and Trust Boundaries',
    description: 'API routes with real security: rate limiting, bot detection, origin enforcement, schema validation, and prompt injection protection.',
    evidence: [
      'Multi-layer chat API: schema validation (Zod), bot detection, prompt injection guard, origin enforcement',
      'Rate limiting with per-instance fallback when KV is unavailable',
      'Nonce-protected server-rendered structured data',
      'CORS and origin enforcement across protected API routes',
      'Redaction layer for system prompt leak attempts',
    ],
    relatedProjects: [
      { slug: 'stepweaver-dev', label: 'stepweaver.dev' },
      { slug: 'llambda-llm-agent', label: 'λlambda LLM Agent' },
      { slug: 'silent-auction', label: 'Silent Auction Platform' },
    ],
    stack: ['Zod', 'Next.js Middleware', 'Vercel KV', 'Rate limiting', 'CORS'],
    trustFlags: ['Security-first', 'Production-hardened'],
  },
  {
    key: 'internal-tools',
    title: 'Internal Tools and Consoles',
    description: 'Operator-facing dashboards, review consoles, and internal surfaces built to support how teams actually work.',
    evidence: [
      'Portfolio terminal: full command-line interface to the portfolio as an operator console',
      'λsigil operator console: Next.js lead review for contractor prospecting—evidence-oriented qualification, contact paths (forms/booking/mail), verification, optional multi-pass model review, approval-gated drafts, notes, reporting, append-only NDJSON (web-deployed run done)',
      'HUD-style project detail pages with sidebar panels and status bars',
      'Multi-panel console layout patterns across project detail pages',
    ],
    relatedProjects: [
      { slug: 'portfolio-terminal', label: 'Portfolio Terminal' },
      { slug: 'lsigil-setup', label: 'λsigil Lead Ops Runtime' },
      { slug: 'stepweaver-dev', label: 'stepweaver.dev' },
    ],
    stack: ['Next.js', 'React', 'Tailwind CSS', 'NDJSON', 'Shell adapters'],
    trustFlags: ['Operator-first UX', 'Human-gated', 'Audit-safe'],
  },
  {
    key: 'realtime-data',
    title: 'Realtime and Data-Driven UX',
    description: 'Live state, real-time updates, and data-driven UI that reflects what\'s actually happening, not a static snapshot.',
    evidence: [
      'Silent Auction Platform: real-time bidding state with Supabase Realtime',
      'Bill Planner: cash-flow calculations with Neon PostgreSQL and Auth.js',
      'Orthodontic Tracker: patient progress tracking with structured data',
      'Background canvas with dynamic rendering and WebGL-adjacent animation',
    ],
    relatedProjects: [
      { slug: 'silent-auction', label: 'Silent Auction Platform' },
      { slug: 'bill-planner', label: 'Bill Planner' },
      { slug: 'orthodontic-tracker', label: 'Orthodontic Tracker' },
    ],
    stack: ['Supabase Realtime', 'PostgreSQL', 'Neon', 'Drizzle ORM', 'Auth.js'],
    trustFlags: ['Live state', 'Auth-gated', 'Production data'],
  },
  {
    key: 'lead-research',
    title: 'Lead Ops and Research Tooling',
    description: 'Systems for capturing, enriching, and reviewing leads and prospects with human-gated workflows and append-only audit trails.',
    evidence: [
      'λsigil: local-first lead ops (seed/Brave discovery, evidence bundles from static HTML, contact-path interpretation, verify, multi-pass AI review optional, approve, notes, reports, one-problem/one-offer drafts); web-deployed console; OpenRouter post-acquisition',
      'Multi-shell adapter pattern: works from web console, terminal, and CLI',
      'Human-gated review workflow: enrichment runs on approval, not automatically',
      'Append-only storage for lead history without mutation risk',
    ],
    relatedProjects: [
      { slug: 'lsigil-setup', label: 'λsigil Lead Ops Runtime' },
      { slug: 'portfolio-terminal', label: 'Portfolio Terminal' },
    ],
    stack: ['Next.js', 'NDJSON', 'OpenRouter', 'Shell scripting', 'Node.js'],
    trustFlags: ['Local-first', 'Append-only', 'Human-gated'],
  },
  {
    key: 'reporting-business',
    title: 'Reporting and Business Systems',
    description: 'Dashboards, trackers, and reporting surfaces that give operators visibility into what\'s actually happening in the operation.',
    evidence: [
      'Bill Planner: household cash-flow planning with real calculation logic',
      'Google Analytics integration and reporting setup across client builds',
      'Orthodontic Tracker: structured patient data with progress reporting',
      'Business analyst background: 8+ years of process, reporting, and operations work',
    ],
    relatedProjects: [
      { slug: 'bill-planner', label: 'Bill Planner' },
      { slug: 'orthodontic-tracker', label: 'Orthodontic Tracker' },
      { slug: 'google-analytics', label: 'Google Analytics Setup' },
    ],
    stack: ['PostgreSQL', 'Neon', 'Drizzle ORM', 'Google Analytics', 'Notion API'],
    trustFlags: ['BA background', 'Process-aware', 'Data-grounded'],
  },
];

export function getCapabilityByKey(key) {
  return CAPABILITY_BUCKETS.find((c) => c.key === key) || null;
}
