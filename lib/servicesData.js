/**
 * Content data for /services and its subpages.
 * Edit here to update all services page content.
 */

export const servicesPage = {
  hero: {
    eyebrow: 'λstepweaver // services',
    title: 'Operational systems for businesses that have outgrown duct-tape workflows.',
    body: 'I build the web infrastructure, automation, and tooling that holds operations together: websites that do real work, integrations that reduce manual effort, and lead systems that support how your team actually moves.',
    primaryCta: { label: 'Send me the problem', href: '/contact?intent=brief' },
    secondaryCta: { label: 'Book a quick intro', href: '/contact?intent=intro' },
  },
  problems: [
    {
      id: '01',
      title: 'Workflows held together by copy-paste',
      body: 'Manual handoffs between tools create silent failure points. Work gets lost, duplicated, or delayed.',
    },
    {
      id: '02',
      title: 'Sites that market but don\'t operate',
      body: 'Your website looks fine but doesn\'t capture leads, route inquiries, or integrate with your actual process.',
    },
    {
      id: '03',
      title: 'No visibility into what\'s working',
      body: 'Reporting is manual. You can\'t see the pipeline without pulling it together yourself each time.',
    },
    {
      id: '04',
      title: 'AI tools with no connective tissue',
      body: 'You\'ve got the subscriptions. They don\'t talk to each other, and nothing feeds back into your workflow.',
    },
    {
      id: '05',
      title: 'Systems only one person understands',
      body: 'Critical processes live in someone\'s head or a fragile spreadsheet. Handoff is always a risk.',
    },
    {
      id: '06',
      title: 'Vendor lock-in and black boxes',
      body: 'Your current tooling makes it hard to understand, modify, or move what you own.',
    },
  ],
  lanes: [
    {
      key: 'web-platforms',
      label: '01',
      title: 'Operational Web Platforms',
      body: 'Websites that do more than exist. Lead capture, business workflows, content systems, operational surfaces. Built to support the actual work, not just the marketing.',
      examples: ['Service business websites with real intake', 'Booking and scheduling flows', 'Content-driven platforms', 'Lightweight web apps'],
      href: '/services/web-platforms',
    },
    {
      key: 'automation',
      label: '02',
      title: 'Automation and Integration',
      body: 'Tool handoffs, data sync, reporting flows, status notifications, and AI-assisted operational glue. Reduce manual work. Make systems talk to each other.',
      examples: ['n8n and API workflow automation', 'Tool-to-tool integrations', 'Reporting and data pipeline work', 'Notification and status systems'],
      href: '/services/automation',
    },
    {
      key: 'lead-systems',
      label: '03',
      title: 'Lead and Research Systems',
      body: 'Systems for capturing, reviewing, and acting on leads and prospects. Internal consoles, enrichment pipelines, human-gated review workflows. Built for operators, not for show.',
      examples: ['Lead capture and intake systems', 'Prospect review consoles', 'Enrichment and research pipelines', 'Signal gathering and prioritization'],
      href: '/services/lead-systems',
    },
  ],
  process: [
    { step: '01', title: 'Brief', body: 'You describe the workflow, the failure point, or the outcome you need. I ask until the problem is clear.' },
    { step: '02', title: 'Scope', body: 'I map out what needs to be built, what connects to what, and where the risks are. No surprises in the build.' },
    { step: '03', title: 'Build', body: 'I build it. Clean code, documented decisions, tested where it matters. You get something maintainable.' },
    { step: '04', title: 'Handoff', body: 'You own it. I document what I built and how it works. No dependency on me to run it.' },
  ],
  fit: {
    good: [
      'Founders or operators who need a real system, not a brochure',
      'Businesses with manual workflows that have gotten expensive',
      'Teams who know the problem but can\'t find someone to build the solution',
      'Short-to-medium contract builds with a clear scope',
      'Prototype cleanup or production-ready rebuilds',
      'Internal tools that need to actually get used',
    ],
    bad: [
      'Vague mandates with no real problem defined',
      'Requests to replicate exactly what another agency built',
      'Pure strategy work with no implementation expected',
      'Hype-only engagements with no budget or scoped deliverable',
      'Large multi-team process consulting without a technical component',
    ],
  },
  cta: {
    title: 'Send the problem.',
    body: 'I work best when there\'s a real system to improve, wire together, debug, or ship under constraint. Tell me what\'s broken or what you need built.',
    primaryCta: { label: 'Send me the problem', href: '/contact?intent=brief' },
    secondaryCta: { label: 'Book a quick intro', href: '/contact?intent=intro' },
  },
};

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
