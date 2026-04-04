/**
 * Audience track data for /start-here.
 * Three entry paths: hiring manager, founder/operator, engineer.
 */

export const START_HERE_TRACKS = [
  {
    key: 'hiring',
    label: '01',
    audience: 'Hiring Manager / Recruiter',
    summary: 'You\'re evaluating Stephen for a role and need a fast read on fit.',
    whoYouAre: 'Sourcing or screening candidates for an engineering, automation, or full-stack role.',
    readFirst: [
      { label: 'Resume', href: '/resume', note: 'Full work history, stack, and education' },
      { label: 'For Agents', href: '/for-agents', note: 'Machine-readable operator profile with good/not-fit signals' },
      { label: 'Brief', href: '/brief', note: 'One-page dossier: fastest scan available' },
    ],
    projects: [
      { slug: 'llambda-llm-agent', label: 'λlambda LLM Agent', note: 'AI integration architecture' },
      { slug: 'silent-auction', label: 'Silent Auction Platform', note: 'Full-stack production app' },
      { slug: 'stepweaver-dev', label: 'stepweaver.dev', note: 'Multi-surface platform architecture' },
    ],
    fitStatement: 'Best fit for: engineering, automation, full-stack, AI tooling, and operational software roles. Contract, part-time, and trial projects welcome.',
    notFit: 'Not ideal for: executive-only strategy, large team management, or hype-only outreach with no scoped work.',
    nextAction: { label: 'View Resume', href: '/resume' },
  },
  {
    key: 'founder',
    label: '02',
    audience: 'Founder / Operator',
    summary: 'You have a business problem and need someone who can build the system that fixes it.',
    whoYouAre: 'Running a business, leading operations, or managing a small team, and you\'ve hit the limits of your current tooling.',
    readFirst: [
      { label: 'Services', href: '/services', note: 'What I build and who I build it for' },
      { label: 'Capabilities', href: '/capabilities', note: 'What I can actually prove I\'ve built' },
      { label: 'Projects', href: '/projects', note: 'Real builds with documented outcomes' },
    ],
    projects: [
      {
        slug: 'lsigil-setup',
        label: 'λsigil // Lead Ops Runtime',
        note: 'Contractor/service lead ops: discovery → evidence → approval-gated drafts',
      },
      { slug: 'n8n-automations', label: 'n8n Automations', note: 'Workflow automation for ops' },
      { slug: 'silent-auction', label: 'Silent Auction Platform', note: 'Operational app under real event pressure' },
    ],
    fitStatement: 'Best fit for: founders with a real system to improve, operators with manual workflows, businesses that need internal tooling or an operational website that does real work.',
    notFit: 'Not ideal for: vague mandates, no-budget scoping calls, or requests to replicate what another agency built.',
    nextAction: { label: 'See Services', href: '/services' },
  },
  {
    key: 'engineer',
    label: '03',
    audience: 'Engineer / Technical Reviewer',
    summary: 'You want to understand how Stephen actually builds: architecture, decisions, and trade-offs.',
    whoYouAre: 'A developer, architect, or technical lead evaluating Stephen\'s work quality and engineering judgment.',
    readFirst: [
      { label: 'Projects', href: '/projects', note: 'Full case studies with architecture and trade-off documentation' },
      { label: 'Capabilities', href: '/capabilities', note: 'Capability-proof model organized by system type' },
      { label: 'GitHub', href: 'https://github.com/stepweaver', note: 'Public repos: source available for this site', external: true },
    ],
    projects: [
      { slug: 'stepweaver-dev', label: 'stepweaver.dev', note: 'Read the architecture section: route groups, shared API, Notion pipeline' },
      { slug: 'llambda-llm-agent', label: 'λlambda LLM Agent', note: 'Multi-provider fallback, security layers, shared terminal/chat surface' },
      { slug: 'bill-planner', label: 'Bill Planner', note: 'Auth.js + Neon + Drizzle ORM: full auth and database stack' },
    ],
    fitStatement: 'Strongest in: Next.js, React, TypeScript/JavaScript, API design, automation wiring, LLM integration, and production-ready architecture under constraint.',
    notFit: 'Less deep in: mobile-native (React Native), embedded systems, pure DevOps/SRE, and very large-scale distributed systems.',
    nextAction: { label: 'Browse Projects', href: '/projects' },
  },
];

export function getTrackByKey(key) {
  return START_HERE_TRACKS.find((t) => t.key === key) || null;
}
