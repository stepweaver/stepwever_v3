/**
 * Normalized proof map linking service lanes to project slugs.
 * Slugs must match keys in lib/projectsData.js PROJECTS_DATA.
 */

export const proofLinks = {
  'lead-systems': [
    {
      slug: 'lsigil-setup',
      label: 'λsigil // Lead Ops Runtime',
      reason:
        'Contractor/service lead ops: seed or Brave discovery, static-HTML fetch and rubric scoring, contact-path extraction, verification, approval-gated drafts, append-only notes and reporting, NDJSON resolver, Next.js console with a completed web-deployed run, optional OpenRouter after acquisition.',
    },
    {
      slug: 'portfolio-terminal',
      label: 'Portfolio Terminal',
      reason: 'Custom intake and review surface built as an interactive terminal: operator-first UX pattern applied to the portfolio.',
    },
  ],
  automation: [
    {
      slug: 'llambda-llm-agent',
      label: 'λlambda LLM Agent',
      reason: 'Shared AI layer across web chat and terminal: demonstrates multi-surface integration and shared API architecture.',
    },
    {
      slug: 'stepweaver-dev',
      label: 'stepweaver.dev',
      reason: 'Multi-surface Next.js platform with Notion API integration, shared authentication, and cross-surface data flow.',
    },
    {
      slug: 'n8n-automations',
      label: 'n8n Automations',
      reason: 'Direct automation workflow engineering: multi-step processes, tool handoffs, and operational integration patterns.',
    },
  ],
  'web-platforms': [
    {
      slug: 'stepweaver-dev',
      label: 'stepweaver.dev',
      reason: 'Production Next.js platform with terminal, AI chat, Notion CMS, route groups, and shared protected API layer.',
    },
    {
      slug: 'silent-auction',
      label: 'Silent Auction Platform',
      reason: 'Real-time fundraising app with Supabase, live bidding state, and role-based access, a functional event operations tool.',
    },
    {
      slug: 'soap-stache',
      label: 'Soap Stache',
      reason: 'CMS-backed storefront with Sanity, Stripe handoff, cart state, and structured metadata; demonstrates e-commerce architecture.',
    },
  ],
};

/**
 * Flat lookup: given a slug, return which service lanes it supports.
 */
export function getServiceLanesForSlug(slug) {
  return Object.entries(proofLinks)
    .filter(([, items]) => items.some((p) => p.slug === slug))
    .map(([lane]) => lane);
}

/**
 * Get proof items for a given service lane key.
 */
export function getProofForLane(lane) {
  return proofLinks[lane] || [];
}
