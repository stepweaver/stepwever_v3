/**
 * Content data for /brief: the shareable one-page dossier.
 */

export const briefData = {
  identity: {
    eyebrow: 'λstepweaver // operator brief',
    name: 'Stephen Weaver',
    roles: ['Full-Stack Developer', 'Systems Builder', 'Automation & AI Integration'],
    statement:
      'I build operational web systems, automation, and AI-assisted tooling for businesses that have outgrown duct-tape workflows. Former business analyst, operations manager, and Air Force cryptologic linguist. I\'ve spent 8+ years bridging the gap between how systems work and how people actually use them.',
  },
  roleFit: {
    title: 'Where I fit',
    items: [
      'Full-stack engineering and implementation (Next.js, React, Node.js)',
      'Workflow automation and tool integration (n8n, APIs, webhooks)',
      'AI-assisted systems and LLM integration',
      'Internal tools, dashboards, and operational consoles',
      'Contract, sprint, and project-based work',
      'Legacy process cleanup and prototype-to-production builds',
    ],
  },
  flagshipProjects: [
    {
      slug: 'stepweaver-dev',
      label: 'stepweaver.dev',
      type: 'Multi-surface platform',
      summary:
        'Next.js 15 portfolio platform with terminal UX, AI chat, Notion-fed codex, route group architecture, and a shared protected API layer.',
      tags: ['Next.js', 'Notion API', 'Groq', 'Tailwind CSS', 'Vercel'],
      href: '/projects/stepweaver-dev',
    },
    {
      slug: 'silent-auction',
      label: 'Silent Auction Platform',
      type: 'Real-time operational app',
      summary:
        'Fundraising platform with real-time bidding state, Supabase Realtime, role-based access, and live event operations under actual pressure.',
      tags: ['Next.js', 'Supabase', 'Realtime', 'Auth', 'PostgreSQL'],
      href: '/projects/silent-auction',
    },
    {
      slug: 'lsigil-setup',
      label: 'λsigil // Lead Ops Runtime',
      type: 'Lead ops runtime',
      summary:
        'Local-first lead ops for contractor/service prospecting: seed or Brave discovery, static-HTML rubric scoring and contact-path extraction, verification, append-only notes, reporting, human-approved drafts. NDJSON resolver, Next.js console (web-deployed run done), optional OpenRouter after fetch, multi-shell adapters. Evolved from OpenClaw setup work into a real operator runtime.',
      tags: ['Next.js', 'NDJSON', 'OpenRouter', 'Node.js', 'Shell'],
      href: '/projects/lsigil-setup',
    },
  ],
  stackSnapshot: {
    title: 'Working stack',
    categories: [
      { label: 'Frontend', items: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript'] },
      { label: 'Backend', items: ['Node.js', 'Next.js API routes', 'PostgreSQL', 'Supabase'] },
      { label: 'Automation', items: ['n8n', 'REST APIs', 'Webhooks', 'OpenRouter'] },
      { label: 'Infra', items: ['Vercel', 'Neon', 'GitHub', 'Notion API'] },
    ],
  },
  ctas: [
    { label: 'View Resume', href: '/resume', variant: 'primary' },
    { label: 'See All Projects', href: '/projects', variant: 'secondary' },
    { label: 'GitHub', href: 'https://github.com/stepweaver', variant: 'secondary', external: true },
    { label: 'Contact', href: '/contact', variant: 'secondary' },
  ],
};
