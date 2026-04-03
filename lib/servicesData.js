/**
 * Content data for /services/* detail routes (not the main landing).
 * Main /services copy lives in lib/servicesLandingData.js
 */

export const servicePages = {
  'lead-systems': {
    hero: {
      eyebrow: 'λstepweaver // services // lead systems',
      title: 'Lead capture, review, and research systems built for operators.',
      body: 'Systems that help your team find, qualify, and act on leads without drowning in manual steps. Internal consoles, enrichment pipelines, review workflows, built for how your operation actually works.',
    },
    pains: [
      { id: '01', title: 'Leads fall into the void', body: 'Inquiries come in from multiple places and get lost before anyone acts on them.' },
      { id: '02', title: 'Review is all manual', body: 'Your team is copy-pasting, re-keying, or checking tabs to qualify a single lead.' },
      { id: '03', title: 'No research pipeline', body: 'Finding and enriching prospects is someone\'s full-time side job instead of a system.' },
      { id: '04', title: 'No visibility until it\'s too late', body: 'You find out a lead went cold after it already fell out of the process.' },
    ],
    capabilities: [
      'Lead capture forms with structured intake and routing',
      'Prospect review consoles for human-gated qualification',
      'Enrichment pipelines with optional AI-assisted research',
      'Append-only storage patterns for audit trails',
      'Signal gathering and prioritization logic',
      'Multi-surface adapters (web, terminal, API)',
    ],
    limits: [
      'Not a CRM replacement: this is custom tooling, not a packaged product',
      'Does not include ongoing list sourcing or outreach execution',
      'AI enrichment requires OpenRouter or similar API access',
    ],
    proof: ['lsigil-setup', 'portfolio-terminal'],
    cta: {
      title: 'Need a lead system that actually works?',
      body: 'Describe your intake and review process. I\'ll tell you what\'s buildable and what the right system looks like.',
    },
  },
  automation: {
    hero: {
      eyebrow: 'λstepweaver // services // automation',
      title: 'Integrations, workflow automation, and operational glue.',
      body: 'Connect the tools that aren\'t talking to each other. Reduce the manual steps that eat your team\'s time. Build the reporting and notification flows that tell you what\'s actually happening.',
    },
    pains: [
      { id: '01', title: 'Tools that don\'t connect', body: 'Your CRM, your forms, your spreadsheets, your inbox: none of them feed each other.' },
      { id: '02', title: 'Manual reporting every week', body: 'Someone is pulling data by hand into a format that could be automated.' },
      { id: '03', title: 'Status updates that require asking', body: 'You find out something happened by asking, not by being notified.' },
      { id: '04', title: 'AI subscriptions you\'re not using', body: 'The tools are there. The connective tissue is missing.' },
    ],
    capabilities: [
      'n8n workflow automation for multi-step processes',
      'API integration between tools and services',
      'Data sync between platforms and storage layers',
      'Reporting automation with scheduled delivery',
      'Status notifications and alert routing',
      'AI-assisted operational workflows via OpenRouter or similar',
    ],
    limits: [
      'Custom automation, not white-label SaaS tooling',
      'Requires stable API access to the tools being connected',
      'Complex multi-system orchestration scoped separately',
    ],
    proof: ['llambda-llm-agent', 'stepweaver-dev', 'n8n-automations'],
    cta: {
      title: 'What workflow is costing your team the most time?',
      body: 'Send me the manual process and I\'ll tell you what\'s automatable and how long it takes to build.',
    },
  },
  'web-platforms': {
    hero: {
      eyebrow: 'λstepweaver // services // web platforms',
      title: 'Websites built to support operations, not just market them.',
      body: 'Lead capture, business workflows, content systems, booking flows, and lightweight app behavior, all in a site that actually functions as part of your operation.',
    },
    pains: [
      { id: '01', title: 'Site that doesn\'t convert', body: 'Traffic arrives. Nothing happens. No intake, no routing, no followup trigger.' },
      { id: '02', title: 'Content stuck behind a developer', body: 'Every small update requires a code push or a ticket.' },
      { id: '03', title: 'No integration with your actual process', body: 'The site and the operation are completely separate systems.' },
      { id: '04', title: 'Template that doesn\'t fit your business', body: 'The WordPress theme works until it doesn\'t, and now you\'re trapped.' },
    ],
    capabilities: [
      'Next.js sites with App Router and production-ready architecture',
      'CMS integration (Notion, Sanity, or headless options)',
      'Lead capture and intake routing',
      'Booking and scheduling flows',
      'Service business websites with real functionality',
      'Operational surfaces and lightweight internal tools',
    ],
    limits: [
      'Not full e-commerce builds (cart, inventory, fulfillment) without scoping',
      'Does not include ongoing SEO campaigns or marketing strategy',
      'Design is functional and brand-aligned, not agency creative production',
    ],
    proof: ['stepweaver-dev', 'silent-auction', 'soap-stache'],
    cta: {
      title: 'What should your site actually do?',
      body: 'Tell me what your business needs the site to handle. I\'ll scope what\'s buildable.',
    },
  },
};
