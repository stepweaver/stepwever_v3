/**
 * Content for the main /services B2B landing page only.
 * Edit here to update copy without touching JSX.
 */

export const servicesLanding = {
  sectionEyebrows: {
    proofSignals: 'Signals',
    serviceLanes: 'Lanes',
    engagement: 'Engagement',
    selectedProof: 'Selected proof',
  },

  proofSignalsTitle: 'Credibility at a glance',
  serviceLanesTitle: 'What I help with',

  hero: {
    eyebrow: 'λstepweaver // services',
    title: 'Practical web systems, automation, and local visibility fixes for small businesses.',
    body: 'I help small businesses improve lead capture, clean up workflow handoffs, and build simple web systems that are easy to maintain after launch.',
    primaryCta: { label: "Tell me what's broken", href: '/contact?intent=brief&source=services' },
    secondaryCta: { label: 'See proof', href: '#selected-proof' },
  },

  proofSignals: [
    {
      title: 'Local discovery',
      signal: 'Most customers start with search and maps.',
      explanation:
        "Incomplete or inconsistent profiles add friction before anyone talks to you. Clean listings and a clear site reduce drop-off at first contact.",
      source: null,
    },
    {
      title: 'Lead handoffs',
      signal: 'Leads die in the gap between tools.',
      explanation:
        'When intake, inbox, and follow-up aren’t connected, response slows and opportunities get lost. Tighter handoffs protect revenue you already earned.',
      source: null,
    },
    {
      title: 'Operational websites',
      signal: 'A brochure site is not always enough.',
      explanation:
        'Pages that capture intent, route inquiries, and support light workflows earn their keep. Everything else is maintenance overhead.',
      source: null,
    },
  ],

  serviceLanes: [
    {
      key: 'visibility',
      title: 'Local visibility and lead capture',
      body: [
        'Google Business Profile cleanup, landing pages, and contact paths that make it obvious how to reach you.',
        'Intake and routing improvements so inquiries land where your team actually works.',
      ],
    },
    {
      key: 'workflow',
      title: 'Workflow cleanup and automation',
      body: [
        'Fewer manual handoffs between spreadsheets, inboxes, and line-of-business tools.',
        'Small automations: reporting, alerts, and internal steps that remove repeated copy-paste work.',
      ],
    },
    {
      key: 'websites',
      title: 'Business websites that do actual work',
      body: [
        'Not brochure-only: lead capture, light operational behavior, and content you can update without a rebuild.',
        'Maintainable builds with clear ownership so you are not locked to a black box.',
      ],
    },
  ],

  engagementModel: {
    title: 'How engagements run',
    steps: [
      {
        key: 'build',
        label: 'Build',
        body: 'Fixed-scope work on a defined problem: landing pages, local presence fixes, workflow cleanup, small automations, and business web systems.',
      },
      {
        key: 'handoff',
        label: 'Handoff',
        body: 'Documentation, admin access, walkthroughs, and plain-English notes so you can run the result without being dependent on me day to day.',
      },
      {
        key: 'retainer',
        label: 'Retainer',
        body: 'Ongoing support for maintenance, upgrades, reporting, content help, improvements, and priority fixes when something breaks.',
      },
    ],
  },

  selectedProof: {
    sectionTitle: 'Depth when you need it',
    sectionIntro:
      'Technical case studies and project write-ups live in the portfolio. These are shortcuts if you want receipts before you reach out.',
    featured: {
      slug: 'stepweaver-dev',
      title: 'stepweaver.dev',
      reason:
        'Multi-surface platform combining portfolio, tools, and shared operational patterns: production Next.js, guarded APIs, and content wiring.',
      linkLabel: 'View project',
    },
    secondary: [
      {
        slug: 'lsigil-setup',
        title: 'λsigil Setup',
        reason:
          'Lead research and review workflow with local-first operational design and a focused operator console.',
        linkLabel: 'View project',
      },
      {
        slug: 'llambda-llm-agent',
        title: 'λlambda LLM Agent',
        reason:
          'Shared AI layer across site and terminal with guarded API architecture, not a bolt-on chat widget.',
        linkLabel: 'View project',
      },
    ],
    portfolioLink: { label: 'Full project index', href: '/projects' },
  },

  cta: {
    title: "Tell me what's costing you time or leads.",
    body: 'Send a short note with your business context and the failure you are seeing. I will reply with what is realistic to fix first.',
    primaryCta: { label: 'Get in touch', href: '/contact?intent=brief&source=services' },
  },
};
