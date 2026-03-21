export const PROJECTS_DATA = {
  'soap-stache': {
    title: 'Soap Stache',
    description:
      'A CMS-backed storefront demo built with Next.js, Sanity, and Stripe. It shows editable catalog content, cart state, and a demo-safe checkout flow without pretending to be a live store.',
    imageUrl: '/images/soap_stache.webp',
    link: 'https://app-soap-stache.vercel.app/',
    githubRepo: 'stepweaver/app-soap-stache',
    tags: ['Next.js', 'Sanity CMS', 'Stripe', 'E-commerce Demo', 'App Router'],
    overview:
      'Soap Stache is the storefront side of a small-brand commerce build. It handles catalog browsing, merchandising, cart behavior, policy pages, and checkout handoff. The Sanity studio lives in a separate repo.',
    problem:
      'I wanted a storefront that felt real without faking production status. The challenge was combining editable content, believable product flow, and a clear demo boundary.',
    role:
      'I owned the storefront architecture, route structure, component composition, cart state, Sanity integration, Stripe demo wiring, metadata setup, and frontend implementation.',
    solution:
      'I built it in Next.js 15 with the App Router, GROQ-fed Sanity content, React Context cart state, and localStorage persistence. The checkout flow posts cart data to an internal API route and redirects through Stripe in demo mode.',
    architecture:
      'The codebase is split cleanly: `app/` for routes and layout, `components/` for reusable UI, `contexts/` for cart state, and `lib/` for Sanity and Stripe helpers. The homepage is assembled from smaller sections instead of one oversized page component. Some catalog data is still fetched client-side with `useEffect`, which keeps the build simpler but is weaker for SEO than server-rendered or statically generated catalog pages.',
    features: [
      'App Router storefront with marketing pages, policy pages, product routes, and checkout success flow',
      'Sanity-backed catalog content and media integration',
      'Persistent shopping cart with quantity management and derived totals',
      'Stripe checkout handoff configured for demo/test use',
      'Structured metadata, canonical configuration, robots rules, and JSON-LD scaffolding',
      'Responsive merchandising sections for featured products, reviews, and brand storytelling',
    ],
    engineering: [
      'React Context manages cart state across the app, with localStorage used to restore cart contents between sessions',
      'Cart items use a composite identifier strategy so product variants/types can be tracked independently',
      'Product images are resized and quality-tuned through Sanity URL builders instead of shipping original assets directly',
      'The app injects structured data and preconnect hints for external services such as Stripe and Google Fonts',
      'ProductGrid includes explicit loading, error, retry, and empty states instead of assuming content always exists',
      'Demo mode is enforced in both the UI and the README so the project does not imply live order processing',
    ],
    outcome: [
      'Produced a believable storefront demo that feels closer to a real product build than a static mockup',
      'Created a reusable reference pattern for CMS-backed catalog sites with a safe checkout demonstration layer',
      'Demonstrated frontend architecture choices that balance polish, maintainability, and realistic commerce behavior',
      'Gave the portfolio a stronger example of product thinking than a brochure-style site alone',
    ],
    tradeoffs: [
      'This repo does not present a full production commerce stack: there is no visible auth layer, order persistence, inventory enforcement, or automated test suite',
      'Some catalog data is fetched client-side, which is simpler to build but weaker for SEO than server-rendered or statically regenerated catalog pages',
      'The companion Sanity Studio repo is referenced in the README but not bundled with this codebase, so schema-level claims should stay modest unless both repos are reviewed together',
      'A few implementation details still need cleanup, including mismatched SEO/domain configuration and asset references in layout metadata',
    ],
    whyItMatters:
      'It shows storefront architecture, reusable stateful UI, and a clear line between demo behavior and production commerce.',
  },

  'lambda-orthodontics': {
    title: 'Lambda Orthodontics',
    description:
      'A frameworkless orthodontics site built as a vanilla JavaScript SPA with a custom router, a centralized content model, and a small Express backend for demo-safe form handling.',
    imageUrl: '/images/lambda_ortho.webp',
    link: 'https://lambdaortho.vercel.app/',
    githubRepo: 'https://github.com/stepweaver/myers-vanilla.git',
    tags: ['Vanilla JavaScript', 'Express', 'SPA Architecture', 'Custom Router', 'Responsive UI'],
    overview:
      'This is a front-end-heavy practice-site demo. I built it without a framework and used a custom router, modular page structure, and a thin Node/Express server.',
    problem:
      'The site needed real multi-page behavior, shared content, dynamic detail pages, and believable form flows without pretending to be a production healthcare platform.',
    role:
      'I owned the architecture, frontend implementation, routing system, component structure, shared data model, and the Express backend used for demo submissions.',
    solution:
      'I split the app into a persistent layout shell, route-aware page modules, reusable sections, and a centralized site data file. Express serves the app and handles contact, referral, and scheduling submissions.',
    architecture:
      'The client handles layout, routing, and rendering. Express serves static assets, provides a few narrow API endpoints, and falls back to `index.html` for SPA routing. Shared content lives in `siteData.js`, which keeps homepage sections, treatments, careers, FAQs, and form options consistent across the app.',
    features: [
      'Custom client-side router with static and dynamic routes for treatment and career detail pages',
      'History API navigation with internal link interception and route-aware active nav state',
      'Per-route scroll position save and restore for smoother SPA navigation',
      'Centralized content model in `siteData.js` for practice info, treatments, careers, scheduling steps, and FAQs',
      'API-backed demo flows for contact, referral, and scheduling via Express JSON endpoints',
      'Responsive navigation with mobile menu behavior and body scroll locking',
      'Client-simulated UI flows for job applications, newsletter signup, and patient portal interactions',
    ],
    engineering: [
      'Built as a vanilla JS SPA instead of relying on React or another framework, which forced explicit decisions around routing, lifecycle, and DOM updates',
      'Separated persistent layout concerns from route-level rendering so navigation updates the main content area instead of rebuilding the whole page',
      'Used a `Map` to preserve scroll positions by route and restored them after navigation for better UX on a multi-view SPA',
      'Kept the backend intentionally narrow: static file serving, a site data endpoint, and three demo submission endpoints',
      'Used reusable render/init patterns across components to keep DOM binding logic close to the markup it controls',
      'Added cleanup for the rotating hero so route changes do not leave timers running in the background',
      'Implemented stronger client-side validation and feedback on the referral flow than a simple alert-only form',
    ],
    outcome: [
      'Produced a practice-site demo that behaves more like an application than a static mockup',
      'Demonstrated that a small codebase can still support routing, dynamic detail pages, reusable content, and form workflows without a framework dependency',
      'Created a reusable reference build for future service work where a polished front end matters more than a heavy application stack',
      'Made demo boundaries explicit by avoiding data persistence and labeling the site as a demonstration experience',
    ],
    tradeoffs: [
      'There is no real authentication, session management, or patient portal backend; those flows are simulated',
      'Only contact, referral, and scheduling post to Express endpoints; job applications, newsletter signup, and patient portal flows are intentionally client-simulated interactions',
      'Form behavior is not fully consistent across the app; some flows have loading and inline feedback while others still rely on alerts',
      'There are no automated tests in the repo',
      'The referral page includes healthcare-style confidentiality language, but the demo backend is not implementing production-grade secure data handling',
      'Some detail content is extended locally in page modules instead of being fully driven from one normalized data source',
    ],
    whyItMatters:
      'It shows practical SPA architecture without framework shortcuts. It also stays honest about where the demo stops.',
  },

  'rpg-dice-roller': {
    title: 'RPG Dice Roller',
    description:
      'A client-side RPG dice roller with notation-aware roll logic, Web Crypto-backed randomness, selective rerolls, and browser-persisted history.',
    imageUrl: '/images/dice_roller.png',
    showComponentAsHero: true,
    link: '/dice-roller',
    tags: ['Web Development', 'React', 'Web Crypto', 'Interactive Tool'],
    overview:
      'This is a real utility, not a visual toy. It supports mixed pools, modifiers, notes, held-die rerolls, copyable notation, and keyboard shortcuts. The important part is the split between roll logic and presentation.',
    problem:
      'Most browser dice rollers are either shallow randomizers or noisy tools with weak logic. I wanted one that handled actual RPG use cases while still fitting the terminal language of the site. It also needed to stay fully client-side, preserve history without a backend, and avoid naive `Math.random()` handling for game results.',
    role:
      'I designed and built the project end to end: route integration, React component structure, roll engine design, notation parsing, held-die reroll behavior, keyboard interaction model, browser persistence, styling, and tests for the core logic layer.',
    solution:
      'I built the roller in two layers. The first is a reusable engine in `lib/roller.js` that handles parsing, validation, roll execution, rerolls, totals, and formatting. The second is a React UI layer for pool building, result display, and history. For randomness, I used `crypto.getRandomValues()` when available and paired it with rejection sampling to avoid modulo bias.',
    architecture:
      'The logic layer handles parsing, validation, rolling, rerolls, totals, and output shaping. The UI layer handles pool state, result display, history, and keyboard interaction. That separation keeps the engine portable and makes it easier to reuse in terminal commands.',
    outcome: [
      'Built a portfolio piece that behaves like a real utility instead of a visual demo',
      'Created a reusable roll engine that can support both the dedicated `/dice-roller` UI and `/terminal` commands without duplicating logic',
      "Improved randomness quality by using the browser's Web Crypto API for die results and rejection sampling to avoid uneven face distribution",
      'Kept the entire experience client-side, which reduced complexity, preserved privacy, and made the tool feel instant',
      'Added test coverage around notation parsing, pool validation, and total calculation so the project reads as engineered software, not just styled UI',
    ],
    features: [
      'Reusable roll engine separated from the React UI layer',
      'Web Crypto API randomization with rejection sampling',
      'Held-die rerolls with stable position-based state',
      'Notation-aware mixed dice pools and modifiers',
      'Browser-persisted history with localStorage',
      'Keyboard shortcuts and terminal-aligned UX',
    ],
    keyFeatures: [
      {
        title: 'Reusable roll engine',
        description:
          'The core logic lives in `lib/roller.js`, not in component click handlers. It parses notation, validates pools, rolls dice, calculates totals, shapes result objects, and formats output.',
      },
      {
        title: 'Web Crypto API over Math.random()',
        description:
          'For die results, the roller prefers `crypto.getRandomValues()` over `Math.random()`. I also used rejection sampling before modulo conversion so arbitrary ranges map cleanly without subtle bias.',
      },
      {
        title: 'Held-die reroll state model',
        description:
          'Selective rerolls are handled by tracking held dice with stable position-based keys. That preserves exact locked outcomes while rerolling only the dice the user has not held.',
      },
      {
        title: 'Notation-aware workflow',
        description:
          'The project supports actual dice notation instead of only button clicks. Pool composition, modifiers, totals, and copyable formula strings all flow through the notation layer.',
      },
      {
        title: 'Client-side persistence without backend overhead',
        description:
          'Recent rolls are stored in `localStorage` with timestamps and defensive error handling. History survives refreshes without introducing a database or account system.',
      },
      {
        title: 'Keyboard-first product design',
        description:
          'The roller includes shortcuts for rolling, copying notation, resetting the pool, and clearing results. It feels faster and more like a tool.',
      },
    ],
    techStack: {
      frontend: [
        'Next.js 15 – Dedicated App Router route for /dice-roller',
        'React 19 – Component composition, client-side state, memoized callbacks',
        'Tailwind CSS 4 – Terminal-inspired layout, CRT glow, responsive styling',
        'Lucide React / React Icons – UI symbols and interaction cues',
      ],
      logic_and_architecture: [
        'lib/roller.js – Core roll engine, notation parsing, validation, reroll logic, total calculation, output shaping',
        'lib/diceConstants.js – Centralized dice metadata, labels, limits, and display helpers',
        'Component split – DiceRoller, DicePoolBuilder, DiceResult, and RollHistory with clear responsibilities',
        'Structured state management – Pool state, result state, held-die state, and persistent history kept distinct',
      ],
      randomness_and_fairness: [
        'Web Crypto API – `crypto.getRandomValues()` used for stronger die-result randomness when available',
        'Rejection sampling – Avoids modulo bias when mapping random values into arbitrary die ranges',
        'Math.random() fallback – Preserved only as a compatibility fallback when crypto is unavailable',
      ],
      persistence_and_testing: [
        'localStorage – Browser-side history persistence with error handling',
        'Clipboard API with fallback behavior – Copies notation/results for quick sharing',
        'Jest – Tests for notation parsing, pool validation, and total calculation',
      ],
    },
    projectStructure: `RPG Dice Roller (inside λstepweaver v3)
├── app/
│   └── dice-roller/
│       └── page.jsx              # Dedicated /dice-roller route
├── components/
│   └── DiceRoller/
│       ├── DiceRoller.jsx        # Main container, state model, keyboard interactions
│       ├── DicePoolBuilder.jsx   # Pool composition UI and modifier controls
│       ├── DiceResult.jsx        # Roll output, totals, held-die interactions
│       └── RollHistory.jsx       # Persistent recent-roll history
├── lib/
│   ├── roller.js                # Core engine: randomization, parsing, validation, rerolls
│   └── diceConstants.js         # Dice metadata, labels, limits, and UI helpers
├── utils/
│   └── dateFormatter.js         # Timestamp formatting for roll history
└── __tests__/ or test files     # Engine-level behavior verification`,
    terminalIntegration: {
      description:
        'I separated the logic layer from the UI so the same engine can power terminal commands elsewhere in the portfolio. Dice behavior stays consistent across surfaces instead of being reimplemented.',
      usage: [
        'Reuse the same parser and result formatter for a future roll command inside the λstepweaver terminal',
        'Keep notation support consistent between button-driven UI and typed command workflows',
        'Return structured roll data that can be rendered either visually or as terminal text output',
      ],
      example: `λ roll 3d6+2
Rolling 3d6+2
3d6: [4, 2, 6] = 12
Modifier: +2
Total: 14`,
    },
    keyboardShortcuts: [
      'ENTER: Roll the current dice pool',
      'C: Copy the current notation or result string',
      'R: Reset the dice pool to a clean state',
      'ESC: Clear the current result while keeping the configured pool',
    ],
    diceNotation: [
      '3d6 – Roll three six-sided dice',
      '1d20+5 – Roll one d20 and add a modifier',
      '2d8+1d6-2 – Mixed pool with both addition and subtraction',
    ],
    userExperienceFindings: {
      strengths: [
        'Feels like a real tool: users can build practical pools, annotate them, reroll selectively, and keep history',
        'Technical decisions reinforce trust: stronger randomization, notation-aware logic, and deterministic held-die behavior make the roller more defensible',
        'Fast and private: everything runs client-side, so there is no waiting on an API and no need to send roll history anywhere',
        'Consistent with the λstepweaver brand: the retro terminal presentation supports the portfolio identity without sacrificing utility',
        'Logic/UI separation creates room for extension: the engine can be reused in terminal commands, dialogs, or future game-adjacent tools',
      ],
      areasForImprovement: [
        'Typed notation input would make power-user workflows faster than repeated click-based pool construction',
        'The held-die interaction could benefit from stronger visual cues so locked versus rerolled dice read more clearly',
        'Accessibility could be improved with additional contrast tuning, clearer focus indicators, and more explicit ARIA support around result interactions',
        'README coverage should expand so the dice roller is documented as part of the broader portfolio codebase rather than discovered only by browsing the site',
      ],
    },
    readmeRecommendations: [
      'Document the dice roller as a first-class project inside the main stepwever_v3 README',
      'Call out the architecture split between UI components and `lib/roller.js` so readers see that the logic is reusable',
      'Mention the Web Crypto API and rejection sampling explicitly; that is one of the stronger technical decisions in the project',
      'List keyboard shortcuts, localStorage persistence behavior, and the hold-and-reroll system in the usage section',
      'Show one or two example notation strings and explain how the same engine could be reused in terminal commands',
    ],
    conclusion:
      'This is a good example of the kind of software I like building: focused, interactive, visually distinct, and technically cleaner than it needed to be for the size of the tool.',
  },

  'portfolio-terminal': {
    title: 'Portfolio Terminal',
    description:
      'A browser terminal for navigating the portfolio through actual commands instead of static navigation.',
    imageUrl: '/images/terminal_ui.png',
    link: '/terminal',
    githubRepo: 'https://github.com/stepweaver/stepwever_v3',
    tags: ['Next.js', 'Terminal UI', 'Interactive UX', 'AI Integration', 'Command Router', 'JavaScript'],
    overview:
      'This is an application layer inside the portfolio. It exposes real site behavior through commands: resume browsing, Codex content, AI chat, weather lookup, contact capture, mini-games, and shared dice rolling.',
    problem:
      'The hard part was not the styling. It was building a command surface that could handle state, shared integrations, and client/server boundaries without collapsing into one large component.',
    role:
      'I designed and built the terminal page, shell behavior, command router, stateful modes, shared integrations, and supporting API usage. That includes parsing, history and cursor behavior, content modes, weather and contact flows, dice command integration, and the shared AI backend.',
    solution:
      'I split it into a client-only terminal shell, modular command handlers, and mode-specific helpers instead of treating the whole feature as one monolith. Where possible, I reused existing site logic rather than duplicating behavior: the `roll` command uses the shared dice engine, and the `chat` command posts into the shared `/api/chat` route.',
    architecture:
      'This sits on top of the Next.js app as a client-rendered interaction layer. The terminal page dynamically imports the heavy client-only pieces, which keeps server-rendering concerns separate from keyboard-driven UI logic. Supporting flows are split into hooks and data modules. Server-backed features cross into protected API routes, where validation, rate limiting, sanitization, and bot checks live.',
    features: [
      'Command-driven portfolio navigation with help, resume, Codex, weather, roll, chat, contact, and game commands',
      'Stateful interaction modes for Resume, Codex, Zork, Blackjack, contact capture, and weather selection',
      'Shared dice notation support through the same roller logic used by the dedicated RPG Dice Roller',
      'Shared AI chat integration through the site’s protected `/api/chat` backend',
      'Guided contact intake flow that collects name, email, and message from inside the terminal',
      'Keyboard-oriented UX with command history, cursor movement, focus recovery, and terminal-style output rendering',
    ],
    engineering: [
      'Separated page shell, terminal runtime, command handlers, hooks, and content modules instead of putting all behavior in one file',
      'Used dynamic imports for client-only terminal pieces to keep interactive shell logic out of the server-rendered path',
      'Implemented mode-aware command routing so active experiences like Codex, Resume, and games can intercept input before the standard command switch',
      'Sanitized rendered terminal HTML on the client and protected server routes with validation, rate limiting, same-origin checks, and bot-detection signals',
      'Reused a shared dice engine that parses notation and uses stronger randomness via `crypto.getRandomValues` when available',
      'Connected terminal chat to a server-controlled AI route with fallback provider handling and prompt-protection logic instead of exposing prompt behavior directly in the client',
      'Added UX details that matter in a command interface: duplicate-command suppression, scroll control, local appearance persistence, and deliberate focus management',
    ],
    outcome: [
      'Turned the portfolio into a more distinctive interaction system without abandoning maintainability',
      'Created a reusable command surface that shows frontend systems thinking rather than only visual styling',
      'Reduced duplication by reusing shared chat and dice logic instead of building terminal-only versions',
      'Produced a project that signals engineering range: input handling, component architecture, client/server boundaries, and defensive API design',
    ],
    tradeoffs: [
      'This is a browser terminal interface, not a full shell or virtual filesystem, and the case study should stay honest about that scope',
      'The main terminal component still carries a lot of responsibility, even though the architecture is more modular than a one-file implementation',
      'Weather lookup is a client-side integration, which is simpler to wire but less ideal than fully proxying it through the server',
      'I found test tooling in the repo, but I would not claim strong terminal-specific automated coverage without adding or pointing to those tests explicitly',
      'Some extensibility hooks appear prepared for future use, but not every one of them is clearly exercised in the current app',
    ],
    whyItMatters:
      'It turns a gimmick-prone idea into an engineered interface.',
  },

  'stepweaver-dev': {
    title: 'stepweaver.dev',
    description:
      'A Next.js portfolio application with standard routes, a browser terminal, structured project pages, Notion-backed content, and a protected AI chat backend.',

    imageUrl: '/images/stepweaver-dev.png',
    githubRepo: 'stepweaver/stepwever_v3',

    tags: [
      'Next.js',
      'React',
      'App Router',
      'Terminal UI',
      'AI Chat',
      'Notion API',
      'Portfolio Platform',
      'Vercel',
    ],
    overview:
      'stepweaver.dev is my portfolio, but it is also the project that best shows how I think. It started as a basic personal site, then evolved through several rewrites as my skills, tooling, and goals changed. What began as a simple web presence became a publishing system, a case-study platform, a command-driven interface, and a place to consolidate the technical and aesthetic ideas I actually care about. The result is not a generic portfolio template. It is a custom application built to feel like mine.',

    problem:
      'The main problem was never just "build a portfolio." A standard portfolio would have been easier, but it would also have been false to the way I work and the kinds of interfaces I like. I wanted a site that could hold projects, notes, experiments, and technical writing while also reflecting my actual taste: terminals, monospaced type, neon, cyberpunk, systems thinking, and deliberate interaction design. There was also a practical problem behind the rewrites. I wanted a way to publish what I was learning so the act of documenting it would reinforce the learning itself.',
    role:
      'I owned the project end to end across multiple iterations. That included the original static version, the move to a more component-driven frontend, the rebuild in Next.js, MDX-based publishing, later Notion CMS integration, terminal UX design, project architecture, route structure, content modeling, shared chat behavior, middleware, and deployment decisions. I also shaped the site’s visual and interaction language. I used AI to explore programming-theme palettes and variations, but the final composition, behavior, and overall direction were mine.',
    solution:
      'I treated the site as an evolving system instead of a one-time build. The earliest version was a simple HTML page. From there I rebuilt it with more modern frontend tooling, then moved to Next.js when I wanted first-class routing and publishing support. I added MDX so I could write in Markdown and publish directly to the site. I experimented with Obsidian as an authoring bridge, but when that proved awkward, I kept the content flow simpler and committed MDX directly. After using headless CMS patterns in other projects, I adapted a Notion integration I had already proven elsewhere and used that to support a more flexible content model. The terminal came later, not because the site needed a novelty feature, but because I genuinely like command-line interfaces and wanted the portfolio to expose that part of my taste and thinking.',

    architecture:
      'Architecturally, the project reflects layered iteration rather than a single greenfield design. The current application uses Next.js App Router as the base, with conventional route-driven pages alongside a terminal interaction surface. Structured project data feeds reusable case-study rendering. Shared hooks and internal API routes support content retrieval and chat behavior. Middleware handles security concerns such as CSP nonce generation and request hardening. Some of the architecture exists because the site needed those capabilities; some of it exists because this project has been a long-running place for me to absorb and apply what I learn. That history matters, because the current shape of the codebase is the result of real requirements accumulated over time, not a contrived exercise.',

    features: [
      'Command-driven terminal with navigation, utilities, and mode-aware input handling',
      'Reusable project-detail rendering from structured project data',
      'Shared AI chat backend used by the terminal and the chat widget',
      'Notion-backed codex and documentation content exposed through internal API routes',
      'Stateful flows for command history, weather selection, contact intake, and local UI preferences',
      'Standard route-based navigation alongside terminal-based exploration',
    ],

    engineering: [
      'Built on Next.js App Router with a clear split between routes, shared libraries, and terminal modules',
      'Used dynamic imports for client-heavy interactive features to reduce initial load',
      'Added CSP nonce middleware and explicit security headers',
      'Protected API routes with same-origin checks, sanitization, anti-bot fields and timing checks, and rate limiting',
      'Centralized AI chat behavior behind one server route with provider fallback and prompt isolation',
      'Kept the dice engine as a shared tested utility instead of embedding it in terminal UI code',
    ],

    outcome: [
      'Built a portfolio that shows frontend engineering, API design, interaction design, and content architecture in one codebase',
      'Created reusable infrastructure for new case studies',
      'Gave the site room for experiments, writing, documentation, and tools without turning it into disconnected sections',
      'Made the portfolio itself part of the work',
    ],

    tradeoffs: [
      'Some important UI surfaces are still concentrated in large components, especially the generic project page and the terminal core',
      'The clearest visible test coverage is around shared utility logic, not the full interactive surface area',
      'Rate limiting can fall back to in-memory behavior when KV storage is not configured',
      'Parts of the content model are built for growth, but some live sections are still sparse',
    ],

    whyItMatters:
      'This project matters because it is the clearest expression of how I build when I am not trying to imitate what a portfolio is supposed to look like. Every major change came from a real need or a real preference: publish what I learn, simplify the writing workflow, adapt proven CMS patterns, expose projects more clearly, and make the interface feel like something I would actually enjoy using. The terminal, typography, colors, naming, and interaction details are not arbitrary styling choices. They are part of the point. λstepweaver is the most accurate visual and technical expression of my identity I have built so far.',
  },

  'neon-profile-card': {
    title: 'Neon Profile Card',
    description:
      'A client-side profile-card experiment that evolved into the operator-card system on the λstepweaver homepage.',
    imageUrl: null,
    showComponentAsHero: true,
    githubRepo: 'stepweaver/stepwever_v3',
    tags: ['Next.js', 'React', 'UI Architecture', 'Animation', 'Portfolio Engineering'],
    overview:
      'This started as a reusable identity card with fallback profile data and motion. It later informed the production hero card and the live case-study demo path.',
    problem:
      'The portfolio needed a hero element with more signal than a static block of text. The hard part was making it reusable instead of flashy once.',
    role:
      'I designed and implemented the experimental NeonProfileCard, the production HeroOperatorCard, the shared MatrixSync animation layer, and the project-route integration that lets the case study render a live component.',
    solution:
      'I split the work into a card component, a shared animation hook, and a route-level live demo mapping. That kept the motion logic reusable and let the production version diverge where needed.',
    architecture:
      'The experiment lives in `components/NeonProfileCard`, the production homepage version lives in `components/Hero`, shared motion lives in `hooks/useMatrixSync` and `components/ui/MatrixSync`, and the project route chooses which live component to inject via `app/projects/[slug]/page.jsx`.',
    features: [
      'NeonProfileCard supports an optional profile prop with fallback data for name, role, tagline, status, avatar, and badges',
      'Badge handling is defensive: strings and object-shaped badge values are both tolerated, and non-array badge input collapses safely to an empty list',
      'MatrixSync renders a terminal-style status panel with phase-based color changes, attempt counts, and animated register cells',
      'useMatrixSync centralizes the timed animation loop, including randomized delays, phase changes, and reset behavior after repeated attempts',
      'The case-study route can inject a live demo component by slug instead of relying only on screenshots or static prose',
      'The homepage version uses Next/Image for the portrait and memoization on key hero components',
    ],
    engineering: [
      'This is client-side interaction work for the component itself: no auth, no persistence, and no server mutation logic',
      'The strongest technical decision is separating timed animation logic from the presentation layer. MatrixSync reads state; useMatrixSync owns sequencing and phase transitions',
      'The hook is configurable enough to reuse: it accepts custom glyph sets and cell counts, which is why the standalone NeonProfileCard can use a different visual character set from the homepage card',
      'The slug-driven project page makes interactive case studies a platform feature instead of a hard-coded exception',
      'The project inherits shared app hardening: CSP nonce generation, security headers, import optimization, production console stripping, compression, and asset caching',
      'The route layout generates metadata from project data, so the case study participates in the broader SEO and social-preview system even though the page itself is interactive',
    ],
    outcome: [
      'The experiment became part of the live homepage instead of staying isolated',
      'The animation logic now exists as a reusable hook-driven pattern rather than being buried inside one card',
      'The project detail system can showcase the component as a live hero, which is stronger proof than a static screenshot-only case study',
      'The work adds a distinct branded identity layer to the portfolio without requiring a separate application or deployment',
    ],
    tradeoffs: [
      'The current live case study renders HeroOperatorCard as the hero, not the standalone NeonProfileCard, so the page should describe that distinction explicitly',
      'There is no component-specific test coverage surfaced for this feature even though the repo has Jest configured at the project level',
      'Validation is lightweight. The standalone card has safe fallbacks and badge normalization, but there is no formal schema validation for profile input',
      'There is no project-specific screenshot or OG image, so this entry currently falls back to the shared default social preview image',
      'Because this is a UI-engineering case study, outcomes are qualitative. The repo does not prove conversion or engagement metrics',
    ],
    whyItMatters:
      'It is a UI-engineering project. The point is component design, animation abstraction, and demo integration.',
  },

  'it-consulting': {
    title: 'IT Consulting',
    description:
      'Fractional IT and systems consulting for small businesses that need clearer tooling, cleaner workflows, and better technical decisions.',
    imageUrl: '/images/it_consulting.png',
    link: null,
    githubRepo: 'stepweaver/stepwever_v3',
    tags: ['IT Consulting', 'Systems Analysis', 'Integration Planning', 'Business Systems'],
    overview:
      'This is a service entry, not a product. The actual work is systems analysis: tool audits, workflow mapping, reporting strategy, integration planning, and implementation guidance.',
    problem:
      'Small businesses rarely fail because of one bad tool. They usually fail at the seams: duplicated work, unclear ownership, weak reporting, and manual handoffs.',
    role:
      'I work as a technical partner on the business side. I map the current system, identify breakpoints, explain tradeoffs, and help decide what to keep, replace, integrate, or simplify.',
    solution:
      'The work starts with discovery and audit, then moves into current-state mapping, tool evaluation, reporting design, source-of-truth decisions, process cleanup, and rollout guidance.',
    architecture:
      'In the repo, this is a structured service entry rendered through the same project system as the build case studies. Metadata is generated separately in `app/projects/[slug]/layout.jsx`, which keeps canonical URLs, social tags, and keywords out of the interactive page component.',
    features: [
      'Technology and workflow audits grounded in how work actually moves today',
      'Tool and vendor evaluation with tradeoffs explained in plain language',
      'Integration planning to reduce duplicate entry and disconnected systems',
      'Reporting and dashboard strategy focused on reliable business visibility',
      'Process cleanup before scale turns small inefficiencies into expensive ones',
      'Implementation guidance during migrations, rollouts, or operational changes',
    ],
    engineering: [
      'The entry is data-driven rather than hard-coded: one object in `projectsData.js` feeds the shared service/case-study renderer',
      'The `/projects/[slug]` page separates interactive client behavior from server-side metadata generation in the paired layout file',
      'Shared `ProjectSection`, `SectionList`, `BulletList`, and `TechStackGrid` components keep service pages structurally consistent with technical project writeups',
      'The page shell supports optional proof surfaces like a repo panel, which makes `githubRepo` an important credibility field for service entries',
      'Heavier visual pieces are lazy-loaded and wrapped in an `ErrorBoundary`, which keeps the shared project shell more resilient',
      'This page inherits the broader site hardening: nonce-based CSP, security headers, image optimization, package import optimization, production console stripping, compression, and asset caching',
    ],
    outcome: [
      'Positions IT consulting as systems work rather than generic technology advice',
      'Gives the portfolio a clearer bridge between shipped builds and the decision-making layer behind them',
      'Creates a reusable service-page pattern that can scale across consulting offers without a separate custom template',
      'Helps explain where audits, integration planning, reporting strategy, and implementation guidance fit together',
    ],
    tradeoffs: [
      'This repo does not include private client audits, migration plans, vendor scorecards, or implementation documents, so the public proof is the service framing more than consulting deliverables',
      'There is no standalone consulting application here; this is a service entry inside the broader λstepweaver portfolio system',
      'Public outcomes should stay capability-based unless paired with sanitized examples, metrics, or before-and-after artifacts',
      'The live site and public repo appear slightly out of sync, so this entry is strongest once the deployment and source match again',
    ],
    whyItMatters:
      'It explains the systems-thinking layer behind the rest of the portfolio.',
  },

  'n8n-automations': {
    title: 'n8n Automations',
    description:
      'Automation service for event-driven workflows, data movement, business rules, and failure-aware integrations built around n8n.',
    imageUrl: '/images/n8n_automations.png',
    link: null,
    githubRepo: null,
    tags: ['Automation', 'n8n', 'Integration Architecture', 'Systems Design'],
    isService: true,
    overview:
      'This is a service entry, not a public n8n product. The value is workflow design: triggers, validation, branching, retries, alerts, and handoff.',
    problem:
      'A lot of teams already own the right tools. The process between them is what breaks: inbox handoffs, duplicate entry, drift between systems, and silent failures.',
    role:
      'I own the workflow design layer end to end: process mapping, trigger selection, data shaping, branching logic, failure handling, monitoring strategy, and handoff documentation.',
    solution:
      'I use n8n as an orchestration layer for practical business workflows such as intake routing, CRM updates, approval flows, reporting, and cross-system synchronization.',
    architecture:
      'The delivery model is event-driven: trigger, validate, normalize, route, persist or notify, then retry or alert on failure. In the repo, the service is modeled as structured data inside the same slug-driven case-study system used by the rest of the portfolio.',
    features: [
      'Workflow mapping based on the real business process, not just the list of apps',
      'n8n workflows for multi-step, branching, stateful business processes',
      'Webhook and API integrations across the tools a team already uses',
      'Data transformation and validation between source and destination systems',
      'Retries, fallback handling, and visible failure alerts instead of silent breakage',
      'Documentation and handoff so the workflow does not become a black box',
    ],
    engineering: [
      'The page itself is data-driven rather than hard-coded: one project object feeds a shared case-study renderer and reusable UI sections',
      'The case-study route is a client component, while metadata is generated in the paired layout so the page keeps interactive behavior without giving up canonical, Open Graph, and Twitter metadata',
      'The shared project shell lazy-loads heavier visual components and wraps the page in an ErrorBoundary',
      'The broader λstepweaver portfolio applies nonce-based CSP, hardening headers, asset caching, import optimization, console stripping in production, compression, and bundle-analysis tooling',
      'The strongest engineering story here is operational thinking: idempotent design, boundary validation, failure visibility, and maintainable workflow ownership',
    ],
    outcome: [
      'Designed to reduce manual copy-and-paste work between business systems',
      'Designed to cut preventable data-entry errors and missed handoffs',
      'Designed to move work faster between people, inboxes, and platforms',
      'Designed to keep customer, lead, or status data more consistent across tools',
      'Designed to make workflow state more visible instead of hiding it in email and memory',
    ],
    tradeoffs: [
      'This repo does not contain public n8n workflow exports, credential configuration, or deployment manifests, so the case study proves the service framing more than a concrete workflow build',
      'Most real automation work touches private systems and secrets, which limits how much client-specific implementation detail can be shown publicly',
      'Without at least one sanitized workflow diagram or before-and-after process example, readers have to trust the description more than inspect the implementation',
    ],
    whyItMatters:
      'Automation work is deciding where state moves, what is authoritative, and how failures surface.',
  },

  'ai-integrations': {
    title: 'AI Integrations',
    description:
      'A service-facing AI integration case study anchored by a shipped build: λlambda, a shared chat backend used by the widget, page chat, and terminal.',
    imageUrl: '/images/ai_integrations.png',
    tags: ['AI Integration', 'Next.js', 'LLM UX', 'Prompt Engineering', 'API Security'],
    overview:
      'This page should read as proof of a real AI integration pattern, not as a generic AI pitch. The concrete example is λlambda.',
    problem:
      'Calling an LLM API is easy. Building one assistant that behaves coherently across multiple interfaces without exposing prompts or degrading into a toy is harder.',
    role:
      'I owned the prompt design, API route design, client surfaces, terminal integration, provider fallback, abuse protection, and the interaction details.',
    solution:
      'I built a shared `/api/chat` route and treated it as the single source of truth. Web chat surfaces reuse a common `useChat` hook. The terminal uses the same backend through a thinner adapter.',
    architecture:
      'The UI is split across widget, page chat, and terminal. The backend normalizes messages, limits payloads, sanitizes input, applies same-origin checks, rate limits, bot detection, and provider fallback. The system prompt lives in a server-only module.',
    features: [
      'Shared λlambda persona across the floating widget, dedicated page chat, and terminal command',
      'Channel-aware prompting so terminal responses stay plain-text and terse while site chat can return markdown links',
      'Multi-turn widget/page chat with local history and example questions',
      'Image paste support in the web widget with bounded attachment counts and size checks',
      'Provider fallback from Groq to OpenAI with timeout handling and user-safe error messages',
      'A live, inspectable proof surface for AI work inside the portfolio itself',
    ],
    engineering: [
      'Kept the system prompt server-only and explicitly prevented clients from owning prompt behavior',
      'Centralized request hardening through a protected-route helper that composes rate limiting, bot checks, parsing, and sanitization',
      'Added same-origin and optional allowlist checks before the route will process requests',
      'Normalized incoming messages, truncated long payloads, capped message history, and filtered suspicious prompt-injection-like content',
      'Used VisualViewport-aware scrolling and a sentinel-based auto-scroll hook so fullscreen/mobile chat behaves better when the keyboard opens',
      'Loaded interactive chat surfaces client-side with dynamic imports to avoid SSR friction for highly interactive UI',
    ],
    outcome: [
      'Shipped a real AI feature on the live portfolio instead of describing AI work abstractly',
      'Created a reusable pattern for future client work: interface layer, protected backend, server-owned prompts, and provider routing',
      'Demonstrated that AI can be woven into multiple interfaces without duplicating backend logic',
      'Kept operational scope small enough for a portfolio deployment by avoiding unnecessary infrastructure',
    ],
    tradeoffs: [
      'No persistent memory or user accounts are implemented in this repo; widget/page history lives only in local React state and terminal calls are effectively single-turn',
      'No retrieval layer, document grounding, or citation system is implemented here; responses are driven by the curated system prompt and request context',
      'The previous service copy drifted beyond the shipped implementation by referencing adjacent ideas like Postgres-backed memory, Slack capture, MCP retrieval, and broader AI stacks that are not part of this repo',
      'Jest is configured for the codebase, but AI/chat-specific test coverage is not yet part of the visible repository',
    ],
    whyItMatters:
      'It is actual integration work with visible boundaries and shipped proof.',
  },

  'google-analytics': {
    title: 'Google Analytics & Measurement Strategy',
    description:
      'Measurement strategy for websites that need clean events, useful reporting, and instrumentation tied to business questions.',
    imageUrl: null,
    link: null,
    githubRepo: 'stepweaver/stepwever_v3',
    tags: ['Measurement Strategy', 'GA4', 'Event Design', 'Next.js', 'SEO'],
    isService: true,
    overview:
      'This is a service page backed by a smaller but real implementation in the portfolio. Analytics is isolated, mounted once, and allowed explicitly through the app security model.',
    problem:
      'Many sites “have analytics” and still cannot answer basic questions. The problem is usually the event model, not the script tag.',
    role:
      'I translate business questions into event design, conversion definitions, naming rules, and reporting structure. I also fit instrumentation into the surrounding app architecture.',
    solution:
      'I treat analytics as application design. Define what matters, instrument it deliberately, and keep the tracking layer separate from the UI layer.',
    architecture:
      'The case study lives inside the shared `/projects/[slug]` system driven by `lib/projectsData.js`. The measurement-related implementation follows a clean boundary: analytics is loaded client-side through a dedicated wrapper, mounted from the root layout, and permitted through a nonce-based CSP in middleware.',
    features: [
      'Service-facing case study integrated into a reusable data-driven project system',
      'Measurement-aware portfolio implementation with a dedicated client-only analytics wrapper',
      'Server-generated metadata and share cards for route-level SEO consistency',
      'Structured-data support and canonical metadata as part of the measurement baseline',
      'Security-header and nonce handling that keeps third-party script loading explicit',
      'A portfolio framing that connects analytics to websites, SEO, reporting, and optimization work',
    ],
    engineering: [
      'Kept analytics behind a dedicated wrapper component instead of scattering third-party script logic across pages',
      'Loaded analytics client-side with SSR disabled so instrumentation does not complicate server rendering',
      'Mounted analytics once in the root layout, which avoids per-page duplication and keeps the app shell responsible for instrumentation',
      'Used middleware-generated nonces and CSP headers so script execution is explicit rather than permissive',
      'Generated project metadata from route data, which keeps SEO and content structure consistent across case-study pages',
      'Used a shared case-study renderer so service pages and build pages follow the same architectural spine',
    ],
    outcome: [
      'Made analytics and measurement strategy a visible part of the λstepweaver service stack instead of leaving it implied',
      'Created a reusable place in the portfolio to explain measurement work in technical terms',
      'Demonstrated measurement-aware implementation habits in the portfolio itself, even without exposing client GA properties',
      'Kept the public proof honest: the repo shows architecture and implementation patterns, not confidential client dashboards or production analytics accounts',
    ],
    tradeoffs: [
      'This repo does not expose a public GA4 property, GTM container, event schema, or Looker Studio dashboard',
      'The current public proof is architectural rather than outcome-rich; there are no before/after metrics or sanitized dashboard screenshots yet',
      'Because this is a service page inside the main portfolio repo, it reads less like a standalone project than entries tied to a shippable app',
      'Jest is configured at the repo level, but no analytics-specific tests are visible in the public implementation',
      'The credibility ceiling stays lower until the page includes a concrete artifact such as an event map, implementation snippet, or reporting example',
    ],
    whyItMatters:
      'It shows that I think about instrumentation as part of the system, not as an afterthought.',
    techStack: {
      implementation: [
        'Next.js 15 - App Router portfolio and data-driven case-study routes',
        'React 19 - client-rendered case-study UI and app-shell integration',
        'Vercel Analytics - lightweight site analytics mounted from the root layout',
        'Route metadata and structured data - SEO and measurement baseline',
        'CSP / nonce middleware - explicit third-party script handling',
      ],
    },
  },

  'lcerebro': {
    title: 'λcerebro',
    description:
      'A memory-layer architecture in progress: durable storage in Supabase, pgvector retrieval, and MCP access across AI clients.',
    imageUrl: '/images/cerebro.png',
    link: null,
    tags: ['AI', 'Memory Layer', 'MCP', 'Supabase', 'Postgres', 'Build in progress'],
    overview:
      'Phase 1 is architecture first. The goal is to make context portable instead of trapping it inside one chat product.',
    problem:
      'Most AI workflows are siloed. Notes, prompts, and useful history end up spread across tools and become hard to search, reuse, or carry forward.',
    role:
      'I defined the Phase 1 framing, storage model, retrieval shape, security boundaries, and the portfolio case-study translation of that design.',
    solution:
      'The Phase 1 model is straightforward: capture raw text, generate embeddings and metadata, store both in Supabase, expose retrieval through MCP, and keep the memory layer model-agnostic.',
    architecture:
      'The core is a `thoughts` table with content, metadata, timestamps, and a `vector(1536)` embedding. Retrieval happens through a database-side similarity function. MCP sits in front of that as the tool interface.',
    features: [
      'Durable thought records that combine raw text, embeddings, metadata, and timestamps in one storage model',
      'Vector-based semantic retrieval designed around a `vector(1536)` embedding column',
      'Database-side search function for thresholded similarity matching and metadata-aware filtering',
      'Security model based on row-level security, server-side secrets, and a separate access key for the MCP endpoint',
      'Remote MCP connection model so the same memory layer can be used from ChatGPT, Claude Desktop, Claude Code, and other compatible clients',
      'Explicit separation between capture, storage, retrieval, and client interface layers',
    ],
    engineering: [
      'Supabase / Postgres is the Phase 1 storage layer because it can hold raw text, JSON metadata, timestamps, and vector embeddings in one system',
      'pgvector enables semantic retrieval, with a `vector(1536)` embedding field sized to match the guide’s embedding setup',
      'The schema design uses dedicated indexes for the main access paths: vector similarity, JSON metadata filtering, and recent-item browsing',
      'A database-side `match_thoughts` function keeps similarity search close to the data instead of pushing ranking logic entirely into the application layer',
      'The security posture is server-oriented: row-level security is enabled, privileged operations are intended to run through a secret-bearing server path, and the MCP layer adds a separate access key boundary',
      'The MCP surface is a cleaner abstraction than wiring each AI client directly to the database, because it exposes task-shaped tools instead of raw tables',
      'Metadata extraction is treated as a secondary layer; retrieval is driven primarily by embeddings, not by perfect classification',
      'Cold-start behavior and remote connector ergonomics are real operational concerns at this layer, so latency and connection handling belong in the technical story',
    ],
    techStack: {
      foundation: [
        'Supabase - managed Postgres, API surface, secrets, and Edge Functions',
        'PostgreSQL - durable storage for thoughts, metadata, and timestamps',
      ],
      retrieval: [
        'pgvector - vector embeddings and semantic similarity search',
        'SQL functions and indexes - database-side retrieval logic and performance',
      ],
      ai: [
        'OpenRouter - embedding generation and lightweight metadata extraction',
        'Model-agnostic memory design - retrieval layer is intended to outlive any single model provider',
      ],
      interface: [
        'Model Context Protocol (MCP) - tool-based read/write access across AI clients',
        'Remote Edge Function endpoint - shared gateway for capture, search, list, and stats flows',
      ],
      security: [
        'Row Level Security (RLS) - table-level protection',
        'Service-role / secret-based server access - privileged operations kept off the client',
        'Access-key protected MCP URL - separate connector boundary for remote tools',
      ],
    },
    outcome: [
      'The case study now describes a real Phase 1 system shape instead of only a broad memory thesis',
      'λcerebro reads more like a storage/retrieval architecture project than a vague AI idea',
      'The portfolio entry better communicates database design, retrieval design, security boundaries, and MCP delivery together',
      'Work-in-progress status remains explicit, which keeps the case study credible while still making the technical direction legible',
    ],
    tradeoffs: [
      'There is still no dedicated λcerebro repo or live MCP demo linked from this page',
      'This portfolio repo does not yet expose inspectable λcerebro-specific runtime code for the database schema, Edge Function, or deployment flow',
      'Claims should stay framed as Phase 1 architecture and implementation direction unless backed by a dedicated codebase or public demo',
      'Metadata extraction is inherently best-effort, so retrieval quality should not be described as depending on perfect tagging',
      'Remote Edge Functions can introduce cold-start latency, so speed and responsiveness should be described as operational tradeoffs rather than assumed strengths',
    ],
    whyItMatters:
      'It treats AI memory as infrastructure, not a UI feature.',
    improveNext: [
      'Ship a dedicated λcerebro runtime repo or public demo so the case study can point to inspectable code',
      'Add bulk-import flows for existing notes, conversations, or external systems',
      'Add additional capture sources beyond direct AI-tool usage',
      'Document observability, latency, and error-handling decisions once the runtime is exposed',
      'Introduce a clearer auth / multi-user model if the system expands beyond single-user memory',
    ],
  },

  'iam-resist': {
    title: 'I AM [RESIST]',
    description:
      'A mission-driven publishing and commerce platform built with Next.js 15, combining Notion-backed editorial workflows, feed aggregation, and a small merch pipeline.',
    imageUrl: '/images/resist_sticker.png',
    link: 'https://iamresist.org',
    githubRepo: 'stepweaver/iamresist',
    tags: ['Next.js', 'React', 'Notion API', 'Stripe', 'Supabase', 'Printify', 'RSS'],
    overview:
      'I built one codebase for editorial content, curated media, news aggregation, and a small store. The point was not to split those concerns across separate systems.',
    problem:
      'The challenge was combining multiple content streams, non-developer publishing through Notion, external feed aggregation, and real checkout and fulfillment in one maintainable app.',
    role:
      'I owned the route structure, Notion integration, feed services, checkout flow, Stripe and Printify webhooks, Supabase order storage, metadata, SEO helpers, deployment, and UI.',
    solution:
      'I split content access, feed assembly, order persistence, and fulfillment into separate layers. On the backend, route handlers validate input, create Stripe sessions, verify webhooks, persist orders, and submit fulfillment requests.',
    architecture:
      'Notion mapping, feed aggregation, checkout, and fulfillment all live behind explicit module boundaries. The codebase supports multiple content types and a commerce pipeline without turning into one giant page file.',
    features: [
      'Notion-backed publishing for voices, curated videos, journal entries, book-club content, and protest music',
      'Unified feed architecture that merges RSS, curated media, and editorial content',
      'Configuration-driven sticker catalog with multiple products, bundle options, and mix-and-match cart pricing',
      'Stripe Checkout flow for both legacy single-product purchases and cart-based checkout',
      'Supabase-backed order storage with fulfillment status tracking',
      'Printify integration for order submission, production handoff, shipment updates, and tracking links',
      'Order status pages for customers after purchase',
      'Reusable metadata helpers for Open Graph and Twitter cards across editorial and product pages',
    ],
    engineering: [
      'Next.js 15 App Router and React 19 for route-based separation between content pages, product pages, and API handlers',
      'Repository-style Notion modules with pagination helpers instead of querying Notion directly inside page components',
      'Feed services use `unstable_cache`, `p-limit`, and `Promise.allSettled` to reduce repeated API work and degrade gracefully when one source fails',
      'Utility-layer normalization for slugs, YouTube IDs, thumbnails, and lightweight content cleanup',
      'Strict environment validation and server-only modules for secrets and admin clients',
      'Stripe webhook signature verification using raw request bodies before order creation',
      'Retry logic around transient database and fulfillment operations',
      'FulfillmentProvider abstraction keeps Printify-specific logic out of the rest of the application',
      'Cron-secured keep-alive, warm-home, and revalidation routes for operational maintenance and cache management',
    ],
    outcome: [
      'Shipped a live site that combines publishing, aggregation, curation, and commerce in one coherent product',
      'Created a maintainable content workflow where new editorial material can be managed through Notion instead of code changes',
      'Built an end-to-end order pipeline: payment, persistence, confirmation, fulfillment submission, shipment update',
      'Produced a stronger technical portfolio piece than a standard blog or store because the project spans frontend architecture, backend integrations, and operational concerns',
    ],
    tradeoffs: [
      'There is no automated test suite in the repo, so correctness is enforced through code structure and manual verification rather than formal coverage',
      'Customer order access is only lightly protected; the API route checks email for full details, but the server-rendered order page currently exposes order data by ID if the URL is known',
      'This is not a full commerce platform with inventory, auth, admin dashboards, or complex catalog management; it is intentionally narrower',
      'Some operational features, like feed warming and refresh orchestration, appear to rely partly on external scheduling/configuration rather than being fully self-contained in the repo',
    ],
    whyItMatters:
      'It shows real product engineering across content, integrations, and transactions.',
  },

  'mishawaka-shower-booking': {
    title: 'Food Pantry Shower Booking System',
    description:
      'A Google Apps Script and Google Sheets booking prototype that replaces an ad hoc shower line with same-day reservations, phone lookup, and a staff dashboard.',
    imageUrl: '/images/shower_booking.png',
    link: 'https://github.com/stepweaver/food-pantry-shower-scheduler',
    githubRepo: 'stepweaver/food-pantry-shower-scheduler',
    tags: ['Google Apps Script', 'Google Sheets', 'Vanilla JavaScript', 'PWA', 'Operational Workflow'],
    overview:
      'This is a low-cost operational workflow tool built around real constraints: limited budget, stressed users on phones, no paid infrastructure, and staff who should not have to manage custom software.',
    problem:
      'The system had to prevent double-booking, stay usable on mobile, work within Apps Script limits, and still provide staff with an operational view.',
    role:
      'I owned the Apps Script backend, Google Sheets schema, booking flow, staff dashboard, validation, state handling, maintenance jobs, and setup documentation.',
    solution:
      'I built a web app backed by a Google Sheet with configuration and slot data. The public flow uses phone-number lookup and a single-page state machine. The staff dashboard handles visibility, check-in, cancellation, and open/close control.',
    architecture:
      'The backend is function-oriented. Caching, locking, validation, scheduling, and admin actions are separated by responsibility. Google Sheets serves as both datastore and config layer.',
    features: [
      'Same-day slot reservation flow with phone-number lookup instead of user accounts',
      'Config-driven operating hours, slot duration, grace period, and concurrency via Google Sheets',
      'Public booking and reservation-status experience combined into one mobile-first interface',
      'Guest-side countdowns, check-in window logic, cancellation, and reservation recovery flows',
      'Staff dashboard with masked phone display, manual check-in, cancellation, and booking open/close controls',
      'PWA-oriented manifest/install flow plus basic service-worker caching',
      'Automatic slot expiration and daily cleanup via time-driven triggers',
      'Setup guide, user guide, and signage asset for handoff and deployment',
    ],
    engineering: [
      'CacheService is used for config, slot availability, and rate-limit counters to reduce repeated spreadsheet reads and cold-start pain',
      'LockService protects the booking write path so concurrent requests do not double-book the same slot',
      'The backend normalizes Google Sheets time values from strings, numbers, or Date objects before business-logic checks',
      'Combined bootstrap APIs reduce front-end round trips on initial load',
      'Validation exists on both sides: the UI gates obvious bad input, while the server re-validates phone numbers, times, and admin setting changes',
      'The public UI uses explicit screen transitions and 30-second status refreshes instead of a framework state library',
      'Admin authentication is intentionally lightweight: a shared key from the Config sheet is checked with constant-time comparison, with added delay to reduce brute-force probing',
      'Tradeoff: the admin key is passed in the URL, which keeps deployment simple but is weaker than a real session model',
      'The `LOOKUP_PER_IP` constant name no longer matches the current implementation, because lookup limiting appears to be keyed by normalized phone number',
    ],
    outcome: [
      'Produced a working prototype that demonstrates a credible low-cost scheduling workflow without paid hosting, SMS, staff tablets, or a custom database',
      'Turned the project into something another organization could realistically deploy by shipping setup, staff, and user documentation alongside the code',
      'Created a stronger portfolio example than a generic CRUD demo because the build is tied to a real operational constraint set: concurrency, privacy, latency, and handoff',
      'If rolled out as designed, the flow should reduce waiting-on-site and make shower availability more predictable for both guests and staff',
    ],
    tradeoffs: [
      'The repo explicitly presents this as a concept / working prototype, not a live production deployment with measured usage outcomes',
      'There is no automated test suite; correctness is enforced through code structure, guardrails, and manual flow testing',
      'Admin auth is a shared secret in the URL rather than a proper user/session system',
      'PWA support is best described as installable / offline-friendly rather than fully offline-first',
      'Some repo documentation is stale: it still references check-in codes, extra admin actions, and integration behaviors that do not match the current implementation exactly',
    ],
    whyItMatters:
      'It shows practical systems work under real budget and deployment constraints.',
  },

  'llambda-llm-agent': {
    title: 'λlambda LLM Agent',
    description:
      'A portfolio-native LLM assistant built into the Next.js site and exposed through a widget, a dedicated chat page, and a terminal command, all backed by one protected route.',
    imageUrl: '/images/chatbot.png',
    link: '/terminal',
    githubRepo: 'stepweaver/stepwever_v3',
    tags: ['Next.js', 'React', 'LLM', 'Groq', 'OpenAI', 'Prompt Architecture', 'Terminal UX', 'AI Integration'],
    overview:
      'λlambda is not a generic embed. It is a shared AI layer that lets visitors ask direct questions about the portfolio through multiple interfaces without duplicating backend logic.',
    problem:
      'Portfolio sites make people infer too much. I wanted a faster interface for discovery, but it had to stay native to the site and keep prompt logic on the server.',
    role:
      'I designed the interaction model, built the shared chat architecture, wrote the server-only prompt system, implemented the protected API route, and added the request guardrails.',
    solution:
      'I built one `/api/chat` backend and let each surface talk to it differently. The widget and page chat share a common path. The terminal uses the same backend through a command bridge.',
    architecture:
      'The key boundary is server over client. Prompts stay server-side. The route handles validation, same-origin checks, rate limiting, bot heuristics, timeout handling, and provider fallback before any model call.',
    features: [
      'Shared chat backend across widget, dedicated page chat, and terminal command surfaces',
      'Server-only prompt composition with channel-aware behavior for terminal vs website chat',
      'Groq-first provider strategy with OpenAI fallback when needed',
      'Image attachment support in website chat for multimodal prompts',
      'Terminal `chat` command that routes into the same AI backend instead of a separate implementation',
      'Natural transcript behavior with sticky-bottom scrolling and “jump to latest” affordances',
      'Clipboard image paste support and attachment previews in the website chat UI',
      'Response safety measures including sanitization, suspicious-message filtering, and prompt-leak redaction',
    ],
    engineering: [
      'Unified `/api/chat` route centralizes request validation, provider selection, and response handling so AI logic is not duplicated across surfaces',
      'Same-origin enforcement reduces the chance of cross-site abuse against the chat endpoint',
      'Rate limiting and bot protection use IP/user-agent keying plus honeypot/timestamp checks to reduce spam and scripted misuse',
      'Conversation history is normalized before model submission: roles are constrained, content is trimmed, suspicious assistant messages are filtered, and history depth is capped',
      'Multimodal requests are handled explicitly by converting supported image attachments into provider-friendly message content',
      'The widget/page chat uses shared hooks for state, submission flow, and auto-scroll behavior, while terminal keeps a separate bridge appropriate for command-driven UX',
      'Responses are marked `no-store`, upstream failures are handled with controlled fallbacks, and provider timeouts return bounded error behavior instead of hanging the UI',
      'The broader app also applies CSP and security headers at the middleware layer to reinforce client-side trust boundaries',
    ],
    outcome: [
      'Built a reusable AI layer inside the portfolio instead of three disconnected chat implementations',
      'Made the same portfolio assistant available through a widget, a full chat surface, and a terminal command without exposing prompt logic to the client',
      'Added image-aware chat support to the website interface, expanding the project beyond plain-text Q&A',
      'Created a stronger technical showcase for prompt architecture, route protection, UX engineering, and AI integration work',
      'Likely reduces discovery friction for visitors who prefer asking direct questions instead of browsing multiple pages first',
    ],
    tradeoffs: [
      'This is a prompt-driven assistant, not a tool-using autonomous agent with memory, retrieval, or workflow execution',
      'Answers are not yet source-grounded with citations back to projects, resume entries, or Codex content',
      'Terminal and website chat share the backend route, but only the widget and dedicated page chat share the same front-end hook path',
      'Rate limiting falls back to in-memory storage unless KV-backed persistence is configured',
      'The repo includes test infrastructure, but the project would be more credible with dedicated tests for chat normalization, guardrails, and channel behavior',
    ],
    whyItMatters:
      'It turns the portfolio into a conversational interface without hiding the implementation reality.',
  },

  'silent-auction': {
    title: 'Silent Auction Platform',
    description:
      'A full-stack silent auction platform built with Next.js, Supabase, and Resend for real event operations: bidder onboarding, alias-based bidding, live auction updates, donation pledges, donor workflows, and closeout administration.',
    imageUrl: '/images/lambda_preview.png',
    link: 'https://tinyurl.com/mary-frank-silent-auction',
    githubRepo: 'stepweaver/silent-auction',
    tags: ['Next.js', 'Supabase', 'Realtime', 'Security', 'Resend'],
    overview:
      'I built this as a real operations tool for a school fundraiser. The job was to make public bidding feel simple for families while still giving organizers the controls they actually needed.',
    problem:
      'Silent auctions look simple until you work through the trust model and event logistics. Bidders need a fast, phone-friendly flow. Organizers need visibility and control. Donors need a separate way to manage contributed items. The system also has to protect bidder privacy and enforce auction rules on the server.',
    role:
      'I designed and built the application end to end: frontend flows, backend routes, data model, authentication patterns, bidding rules, email workflows, admin tooling, donor tooling, demo-mode behavior, and deployment setup.',
    solution:
      'I structured the app around trust boundaries. Public catalog and bidding surfaces stay fast and interactive, while sensitive operations run through server-side routes backed by Supabase and validated before any state change is accepted.',
    architecture:
      'The project uses Next.js App Router for the application shell, Supabase for PostgreSQL and realtime updates, and Resend for transactional email. Public pages, donor flows, and admin routes are separated. Anon Supabase access handles catalog and realtime behavior, while service-role access stays in API routes and protected server-side operations.',
    features: [
      'Guided bidder onboarding with email verification and alias/avatar creation',
      'Alias-based bidding to preserve privacy during the live auction',
      'Mobile-friendly catalog with category filtering and per-item detail pages',
      'Realtime bidding updates powered by Supabase',
      'Bidder dashboard for tracking bids and managing notification preferences',
      'Leaderboard views for hot items, bidding wars, popular items, and top earners',
      'Donation pledges alongside item bidding',
      'Donor portal for registered donors to manage donated items',
      'Admin dashboard for item management, auction timing, QR access, donation review, and closeout',
      'Automated winner and admin email workflows',
    ],
    engineering: [
      'Next.js 16 + React 19 gave the project a modern App Router foundation with a clean separation between public pages and protected routes',
      'Supabase fit the problem well because the project needed both relational auction data and realtime bid updates',
      'Resend handled transactional email flows for verification, outbid, winner, and admin notifications',
      'Zod-based validation and server-side bid enforcement keep auction rules out of the UI layer',
      'The architecture distinguishes anon client access from service-role server access, which is the right trust boundary for a public bidding system',
      'Admin and vendor access are not treated as the same problem: admin uses Basic Auth on protected routes, while vendor flows use HttpOnly session cookies',
      'CSRF protection and rate limiting were added around state-changing flows like bidding, donations, alias creation, and vendor item actions',
      'The demo-mode path is an architectural feature, not just a UI switch: it isolates public showcase behavior from real-event data and email side effects',
    ],
    outcome: [
      'Built a real event operations platform instead of a one-off fundraiser microsite',
      'Created a smoother auction experience for bidders while giving organizers structured control over items, timing, closeout, and communications',
      'Protected sensitive workflows by enforcing auction rules and auth boundaries server-side instead of trusting the browser',
      'Added a separate donor workflow and donation support, making the platform broader than a simple bidding app',
      'Turned the project into a strong portfolio-grade reference for full-stack architecture, realtime UX, security hardening, and operational tooling',
    ],
    tradeoffs: [
      'The repo includes targeted unit tests for bid rules and vendor sessions, but this is not yet a heavily test-saturated codebase',
      'The documented rate limiting is in-memory, which is reasonable for this scale but not the final form for multi-instance production traffic',
      'Like many practical apps, some user-facing pages remain interactive and client-heavy because responsiveness matters during event use',
      'The strength of the project is not theoretical perfection. It is that the risky parts of the workflow were identified and deliberately hardened',
    ],
    whyItMatters:
      'It demonstrates product thinking, trust-aware backend design, realtime data flow, role-based access patterns, and the discipline to build the parts an organizer actually depends on.',
  },

  'bill-planner': {
    title: 'Cashflow Ledger',
    description:
      'A full-stack household cashflow planner that maps recurring bills and expected income into paycheck windows.',
    imageUrl: '/images/cashflow_ledger.png',
    githubRepo: 'stepweaver/weaver-bill-planner',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Drizzle ORM', 'Auth.js', 'Zod', 'React Hook Form', 'Tailwind CSS'],
    overview:
      'The app is built around a simple question: given a month of bills and a month of paychecks, what gets covered when? It models timing, not just categories.',
    problem:
      'Bills recur on different schedules, income clusters unevenly, and due dates do not care when a paycheck lands. The hard part was making that understandable without building a spreadsheet clone or a brittle rules engine.',
    role:
      'I designed and built the application end to end: schema design, route structure, server actions, validation, authentication, paycheck-window assignment logic, month propagation flow, and planning UI.',
    solution:
      'I built the app with Next.js App Router, TypeScript, Neon Postgres, and Drizzle. Forms use React Hook Form with Zod. Server actions revalidate affected pages and recompute assignments when income changes.',
    architecture:
      'The app uses a small relational core: ledgers, months, bill templates, income events, and bill instances. App routes handle top-level navigation. Feature folders own forms and actions. Shared helpers in `src/lib` handle metrics, paycheck-window generation, propagation, auth helpers, and validation schemas.',
    features: [
      'Create months from bill templates or by propagating a previous month forward',
      'Review and edit bill and income drafts before saving a new month',
      'Track expected vs received income and scheduled vs paid bills',
      'Auto-assign bills into paycheck windows based on due dates',
      'Support manual bill-to-paycheck overrides when the automatic assignment is not what the user wants',
      'Filter bills by status, including due, paid, overdue, and unassigned',
      'Manage reusable bill templates with default due rules and payment links',
      'Show month-level metrics such as expected income, paid expenses, overdue counts, and unassigned bills',
    ],
    engineering: [
      'Feature-based folder structure keeps domain logic separated from page composition',
      'Server actions enforce ledger ownership before reads and writes instead of trusting client state',
      'Zod schemas validate login, month creation, bills, income entries, and templates',
      'Paycheck-window logic groups same-day income events, merges adjacent paydays, creates a pre-income window, and assigns bills by date boundaries',
      'Income edits trigger bill reassignment so the month view stays consistent after planning changes',
      'Month propagation clamps carried-forward dates to valid month boundaries instead of assuming all months have the same length',
      'Optional Postgres RLS SQL is included, even though the current app scope stays intentionally simple',
      'External payment links are opened with safe link attributes and auth cookies are configured as `httpOnly`',
    ],
    outcome: [
      'Produced a real full-stack planning app rather than a static UI concept',
      'Encoded a household planning problem into reusable domain logic instead of burying it in components',
      'Created a practical workflow for planning a month before bills start landing, not just logging transactions after the fact',
      'Established a solid MVP foundation for future additions like richer reporting, stronger multi-user support, or automated tests',
    ],
    tradeoffs: [
      'Authentication is MVP-grade credentials auth backed by environment configuration, not a full account system',
      'The app is scoped around a default household ledger, which simplifies ownership and avoids more complex collaboration rules',
      'No automated tests or visible CI workflow are present in the repo yet',
      'The current build is strongest at monthly planning and assignment, not long-horizon forecasting or advanced budgeting analytics',
      'Some schema capacity exists ahead of the surfaced UI, which suggests the model is slightly ahead of the product polish in a few places',
    ],
    whyItMatters:
      'It shows domain modeling, workflow design, and scheduling logic applied to a real planning problem.',
  },

  'service-business-demo': {
    title: 'λlambda Heating & Air',
    description:
      'A static-first local service business demo that turns a multi-location SEO problem into generated landing pages, reusable vanilla-JS components, and lightweight Express lead capture.',
    imageUrl: '/images/lambda_heating_air.webp',
    link: 'https://lambda-heating-air.vercel.app/',
    githubRepo: 'stepweaver/heartland-heating-air',
    tags: ['Vanilla JavaScript', 'Express', 'SEO', 'Lead Generation', 'Agency Demo'],
    overview:
      'This is a generalized local-service demo adapted from real client work. The useful part is the system: structured location and service data, generated pages, and narrow backend form handling.',
    problem:
      'Local service sites often need many near-duplicate service/location pages without becoming a pile of hand-maintained HTML.',
    role:
      'I owned the information architecture, content modeling, page generation, component structure, Express routes, form validation, reCAPTCHA integration, email handling, and demo adaptation.',
    solution:
      'I kept it static-first. Core pages are plain HTML enhanced by ES-module components. Location pages are generated from structured data. Express only handles the parts that need a server.',
    architecture:
      'Presentation, content modeling, generation, and backend form handling are kept separate. `public/components` holds reusable view modules, `public/data` holds source data, `scripts/` handles generation utilities, and `server.js` serves static files and exposes the form endpoints.',
    features: [
      'Generated location/service landing pages written from structured data instead of manually copied HTML',
      'Reusable vanilla-JS component layer for navigation, hero, reviews, contact, careers, service pages, and location pages',
      'Express-backed contact and quote endpoints with required-field checks, email validation, and reCAPTCHA verification',
      'Nodemailer notifications and confirmation emails so form submissions behave like a real business workflow',
      'Careers section with structured job data, job-detail routes, and a general-application path',
      'SEO-oriented page metadata, schema markup, sitemap generation, and canonical handling',
      'Static-friendly deployment model that keeps the frontend simple while preserving backend-powered lead capture',
    ],
    engineering: [
      'Used a static-first architecture to keep most pages cheap to host and fast to serve, while reserving Express for the server concerns that actually require it',
      'Modeled location and service content as structured data so the long-tail SEO footprint could be generated instead of hand-maintained',
      'Organized the frontend into discrete ES-module components rather than one monolithic script, which makes the site easier to re-skin and extend',
      'Added client-side validation in the contact flow and mirrored core validation on the server for a sensible defense-in-depth pattern',
      'Handled careers detail pages with client-side route updates and a server catch-all so deep links can still resolve to the correct HTML shell',
      'Built demo-mode touches such as booking fallbacks, health/test-email endpoints, and mock testimonial data to make the project usable as a portfolio artifact instead of a dead mockup',
    ],
    outcome: [
      'Turned a repetitive local-SEO page problem into a reusable generation pattern',
      'Produced a portfolio-safe demo that shows how a real agency/client implementation can be abstracted into a reusable technical asset',
      'Created a small full-stack marketing site where the frontend stays lightweight but the lead flows still feel operational',
      'Established a credible base for future reuse across other service-business builds, especially where static content and lead capture matter more than complex app state',
    ],
    tradeoffs: [
      'The repo is stronger as an architecture demo than as a production-ready product. It has no database, no user accounts, and no fully integrated booking platform',
      'The demo is only partially generalized today. Some legacy Heartland-specific branding, metadata, canonicals, and narrative copy still remain in the checked-in code',
      'The careers UI is ahead of the backend: file inputs are present, but the checked-in job-application flow does not implement a real resume upload pipeline',
      'The page-generation idea is real, but the checked-in generator script still needs module-format cleanup before the build story feels polished from a fresh clone',
      'There is no visible automated test suite or CI workflow in the current repo',
    ],
    whyItMatters:
      'It shows how I turn a repetitive SEO problem into a reusable technical pattern.',
  },

  'orthodontic-tracker': {
    title: 'Orthodontic Turn Tracker',
    description:
      'A mobile-first orthodontic turn and treatment-note tracker built with vanilla JavaScript, a thin Node/Vercel API layer, JWT-based household auth, and Supabase persistence.',
    imageUrl: '/images/lambda_preview.png',
    link: null,
    githubRepo: 'https://github.com/stepweaver/spread-turn-tracker',
    tags: ['Vanilla JavaScript', 'Node.js', 'Supabase', 'JWT Auth', 'Mobile-First UX'],
    overview:
      'This is a focused full-stack utility for a shared household care workflow. It tracks turns, notes, schedule state, and progress.',
    problem:
      'The app needed to answer simple operational questions reliably: was a turn already logged, which arch changed, when is the next turn due, and what happened last time?',
    role:
      'I owned the frontend, browser-side state, API design, authentication flow, Supabase integration, schema design, and treatment schedule logic.',
    solution:
      'I built it as a lightweight client plus a thin backend. The browser handles state and rendering. The API handles login, token verification, settings, turns, and treatment notes.',
    architecture:
      'This is a compact single-view app rather than a routed SPA. The frontend is delivered through one HTML shell with one main JavaScript controller. The backend uses small API handlers and an SPA fallback. Authentication is custom and pragmatic: approved users are defined in environment variables, JWTs are issued by the backend, and the database is accessed server-side with Supabase.',
    features: [
      'Household login flow with JWT session verification',
      'Turn logging for upper and lower arches',
      'Support for interval-based and twice-per-week schedules',
      'Next-due-date and treatment progress calculations',
      'Treatment notes stored alongside turn history',
      'Mobile-first interface for quick daily use',
    ],
    engineering: [
      'Uses normalized relational tables for settings, turns, and treatment notes instead of storing everything in one blob',
      'Implements custom JWT auth with backend verification',
      'Loads settings, turns, and notes in parallel to reduce wait time after login',
      'Escapes user-provided note content before rendering it back into the DOM',
      'Uses a shared-household access model so multiple approved users can work against one record',
    ],
    outcome: [
      'Produced a usable full-stack treatment tracker for a real household workflow',
      'Turned a repetitive care task into a clearer, lower-friction process',
      'Created a portfolio project that demonstrates practical full-stack product thinking',
    ],
    tradeoffs: [
      'The frontend is intentionally simple, but most client logic lives in one main JavaScript file',
      'The shared-household model is pragmatic, not a generalized multi-user architecture',
      'There is no visible automated test suite in the repo',
      'The current repo appears to contain a settings-save bug that should be fixed before presenting it as polished',
    ],
    whyItMatters:
      'It shows how I approach small real-world software problems: model the data carefully, choose a right-sized architecture, and solve the workflow without adding unnecessary complexity.',
  },

  'website-refreshes': {
    title: 'Website Refreshes & Technical Cleanup',
    description:
      'Modern website rebuilds and technical cleanup for businesses stuck with outdated sites, Facebook-only presence, weak lead capture, or disconnected tools.',
    imageUrl: null,
    link: null,
    githubRepo: null,
    tags: [
      'Website Refresh',
      'Lead Capture',
      'Local SEO',
      'Technical Cleanup',
      'Next.js',
      'Analytics',
    ],
    isService: true,
    overview:
      'λstepweaver rebuilds outdated websites and cleans up the technical systems around them for businesses that have clearly outgrown their current setup. That usually means one or more of the following: the site is old and no longer reflects the business; the mobile experience is weak; calls to action are buried or unclear; forms exist but do not support a clean inquiry flow; analytics are either missing or not useful; or the business relies too heavily on Facebook, a directory page, or word of mouth with no stable web layer underneath it. The work is not centered on appearance alone. The point is to make the site more usable, more current, and more connected to actual business activity.',
    problem:
      'Many small businesses do not have a clean break point where they decide to modernize. The site stays online. A few things get patched. A social profile becomes the main public presence. Forms get added without much structure. Messaging drifts. Eventually the business has something that technically works, but no longer works well. Typical symptoms include homepage copy that does not clearly explain the service; no obvious next step for a visitor; poor mobile layout; weak or missing lead capture; no meaningful measurement layer; too much dependence on platforms the business does not control; and inconsistent technical setup that makes future changes harder. At that point, the problem is not just design. It is that the digital system is no longer supporting the business cleanly.',
    role:
      'I lead discovery, rebuild, and cleanup work across the public site and supporting systems: page structure, messaging, mobile usability, calls to action, forms, analytics, basic SEO and metadata, and integrations with email, CRM, or lightweight automation. The scope follows what is actually broken or holding the business back—not a generic redesign checklist.',
    solution:
      'λstepweaver approaches this as a practical rebuild, not a branding exercise for its own sake. The work starts with identifying what is broken, unclear, outdated, or disconnected. From there, the site and surrounding technical pieces are reworked around a few concrete goals: make the business easier to understand, make the next step obvious, make lead capture reliable, and make the setup easier to maintain. Depending on the project, that can include page restructuring, mobile cleanup, improved calls to action, form setup, analytics instrumentation, basic SEO structure, and system integrations.',
    architecture:
      'Implementations are scoped to the business and do not assume a one-size-fits-all stack. The website layer may be rebuilt in Next.js or another appropriate framework depending on the need. Supporting systems can include GA4 event tracking, form handling, CRM or inbox routing, lightweight automations, structured metadata, and technical cleanup that reduces friction for both users and owners. The goal is not to introduce complexity. The goal is to remove it where possible and make the remaining system easier to reason about.',
    features: [
      'Website refreshes for outdated or underperforming business sites',
      'Mobile-first cleanup for navigation, layout, and calls to action',
      'Lead-capture improvements through clearer inquiry paths and form handling',
      'Technical cleanup for sites that have become inconsistent, brittle, or hard to maintain',
      'Basic local SEO structure, metadata, and page organization',
      'GA4 setup or refinement tied to real business actions instead of vanity metrics',
      'Optional system integrations for intake, automation, and follow-up workflows',
      'Support for businesses moving beyond a Facebook-only or directory-dependent presence',
    ],
    process: [
      'Review the current setup: public web presence, mobile usability, lead path clarity, technical gaps, measurement gaps, messaging and information structure, and any obvious disconnect between how the business operates and how the site presents it.',
      'Scope the project around the highest-friction issues first. That may mean a focused refresh rather than a full rebuild. In other cases, the current setup is fragmented enough that starting clean is the better option.',
      'Deliver the rebuild and cleanup with practical business value in mind—not feature accumulation.',
    ],
    commonUseCases: [
      'An outdated website that no longer matches the business',
      'A Facebook-first or Facebook-only public presence',
      'Strong word-of-mouth but weak digital infrastructure',
      'No clear website conversion path',
      'Poor mobile usability',
      'Analytics that are missing or not actionable',
      'Disconnected tools that create manual follow-up work',
      'Local service businesses, owner-operated businesses, small brands, and teams transitioning out of an early-stage DIY setup',
    ],
    engineering: [
      'The entry is data-driven: one object in `projectsData.js` feeds the shared `/projects/[slug]` case-study renderer used across the portfolio',
      'Service pages use the same layout shell, metadata generation, and section components as technical project writeups for consistency',
      'The broader site applies the same baseline: structured metadata, image optimization where assets exist, and security headers appropriate for a production Next.js app',
    ],
    outcome: [
      'The practical outcome is a cleaner digital system that better matches the current state of the business.',
      'Instead of a site that merely exists, the business gets a web presence that is easier to trust, easier to navigate, easier to measure, and more useful as an operating asset.',
      'This work is especially relevant for local service businesses, small brands, and owner-operated companies that have grown past the setup they originally started with.',
    ],
    tradeoffs: [
      'This portfolio page describes a service line, not a single anonymized client engagement; public proof is capability framing rather than before/after metrics or live site URLs unless added later',
      'Each engagement is scoped individually; stack and deliverables vary by business need',
      'Deep branding, content strategy, or ongoing marketing retainers are out of scope unless explicitly scoped',
    ],
    whyItMatters:
      'A website that is merely present is not the same thing as a website that is useful. For a lot of smaller businesses, the digital problem is not that they need a massive platform rebuild. It is that they need a current, credible, technically sound presence that helps people understand the business and take the next step.',
    techStack: {
      implementation: [
        'Next.js – common choice for modern rebuilds when it fits the project',
        'HTML/CSS/vanilla or other stacks – when a lighter or existing stack is the right answer',
        'Google Analytics 4 – event design and useful reporting',
        'Forms & routing – inquiry flow, notifications, CRM or inbox handoff',
        'Structured metadata & local SEO foundations',
        'Automation tooling – where n8n or similar fits the workflow',
      ],
    },
  },
};

export function getProjectBySlug(slug) {
  return PROJECTS_DATA[slug] || null;
}