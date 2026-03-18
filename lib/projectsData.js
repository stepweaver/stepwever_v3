export const PROJECTS_DATA = {
  'soap-stache': {
    title: 'Soap Stache',
    description:
      'A modern, demo-mode e-commerce storefront for handcrafted soaps, built with Next.js, Sanity CMS, and Stripe-powered checkout. The site showcases a Michigan-themed, mobile-first design and a full CMS-driven product catalog without processing real payments.',
    imageUrl: '/images/soap_stache.webp',
    link: 'https://app-soap-stache.vercel.app/',
    tags: ['E-commerce', 'Next.js', 'Sanity CMS', 'Stripe'],
    problem:
      'I wanted a portfolio-grade, client-ready e-commerce reference build that feels like a real soap shop: non-technical content editors needed to manage product photos, descriptions, pricing, and availability; checkout had to follow realistic Stripe patterns; and the architecture needed to be SEO-friendly and maintainable over time - all while running in a clearly labeled demo mode with no real orders.',
    role:
      'Solo full-stack developer responsible for the dual-repo architecture (Next.js storefront and Sanity Studio CMS), Stripe demo checkout integration, cart state management, API routes, and deployment. I designed the soap product schema (grit level, scent profile, hero/featured display flags, launch date, availability) and built the CartContext for persistent, localStorage-backed cart state.',
    solution:
      'I built a dual-repo architecture: app-soap-stache (Next.js 15 storefront) and studio-soap-stache (Sanity Studio CMS). The frontend uses the App Router for dynamic product listing and detail pages, a React Context-powered cart, and a Stripe Checkout flow explicitly configured in demo mode so no real payments are processed. Sanity serves as the headless CMS with a custom `soap` schema (grit, scent, launch date, special display status, availability) and a `subscriber` schema for marketing lists. A persistent demo banner, structured data helpers, sitemap, and robots configuration round out a production-style, SEO-aware e-commerce demo.',
    outcome: [
      'Content autonomy: Products, photos, pricing, and availability are all managed in Sanity Studio - no code changes required for catalog updates.',
      'Realistic checkout UX: Full cart, Stripe Checkout handoff, and success page that model how a real store would behave, while remaining in safe demo mode.',
      'Performance and SEO: Next.js App Router routing, Sanity image transformation, and CDN-friendly static assets for a fast, SEO-ready storefront.',
      'Reusable reference: A ready-made pattern for small product shops that want a CMS-backed catalog, Stripe checkout, and clear demo vs production boundaries.',
    ],
    features: [
      'Demo-mode E-commerce: Complete shopping cart and checkout experience wired to Stripe in test/demo mode',
      'Content Management: Sanity CMS for product catalog, copy, and media without developer involvement',
      'Payment Flow: Stripe-powered checkout flow that follows real-world patterns while avoiding real charges',
      'Responsive Design: Mobile-first layout and Tailwind CSS styling tuned for a handcrafted soap brand',
      'Product Management: Rich product schema with grit, scent, launch date, and hero/featured flags',
      'Michigan Pride: Local branding, copy, and themed sections that ground the demo in a real place',
      'Real-time Updates: Live content updates through Sanity when connected to a project',
      'SEO Optimized: App Router metadata, sitemap, robots configuration, and structured data helpers',
    ],
    techStack: {
      frontend: [
        'Next.js 15 – App Router storefront with dynamic product pages',
        'React 19 – Modern React features for interactive UI',
        'Tailwind CSS 4 – Utility-first styling for responsive layouts',
        'React Icons – Icon library for UI elements',
      ],
      backend: [
        'Sanity CMS – Headless content management system for products and content',
        'Sanity Studio – Content editing interface in a companion repo',
        'Sanity JavaScript client – GROQ queries for product and marketing content',
        'Sanity image URLs – Image optimization and transformation',
      ],
      payment: [
        'Stripe – Checkout and payment APIs configured for demo/test mode',
        'Stripe.js – Client-side Stripe integration for redirecting to Checkout',
      ],
      development: [
        'ESLint – Code linting and formatting',
        'PostCSS – CSS processing',
        'Turbopack – Fast bundler for development',
      ],
    },
    projectStructure: `soap-stache/
├── app-soap-stache/              # Next.js App Router storefront
│   ├── app/                      # Routes and layouts (home, products, contact, etc.)
│   │   ├── about/                # About page
│   │   ├── api/                  # API routes (Stripe checkout/webhooks)
│   │   ├── products/             # Product listing and dynamic product pages
│   │   ├── subscribe/            # Subscription plans (demo)
│   │   ├── success/              # Checkout success page
│   │   ├── sitemap.xml/          # Sitemap route
│   │   └── robots.txt/           # Robots configuration
│   ├── components/               # React components (layout, product, marketing, demo banner)
│   ├── contexts/                 # React contexts (CartContext for cart state)
│   ├── lib/                      # Utility libraries
│   │   ├── sanity.js             # Sanity client and image URL helpers
│   │   ├── stripe.js             # Client-side Stripe helper (getStripe)'
│   │   └── stripe-server.js      # Server-side Stripe client
│   └── public/                   # Static assets and icons
└── studio-soap-stache/           # Sanity Studio (CMS)
    ├── schemaTypes/              # Content schemas
    │   ├── soapType.js           # Soap product schema (grit, scent, display status, etc.)
    │   └── subscriberType.js     # Newsletter subscriber schema
    └── sanity.config.js          # Sanity Studio configuration`,
    contentManagement: {
      productSchema: [
        'Basic Info: Title, slug, description, blurb',
        'Pricing: Price with validation',
        'Media: Product photos with hotspot functionality',
        'Status: New product badges, availability toggle',
        'Display: Featured/Hero product designation with a single Hero guard',
        'Details: Grit level (0-5), scent profile',
        'Metadata: Launch date, ordering',
      ],
      contentTypes: [
        {
          name: 'Soap products (soapType.js)',
          features: [
            'Complete product catalog management',
            'Image optimization and transformation',
            'Availability fields to toggle products on and off without code changes',
            'Special display status (Featured/Hero) for homepage and hero treatment',
          ],
        },
        {
          name: 'Newsletter subscribers (subscriberType.js)',
          features: [
            'Email subscription management',
            'Marketing list foundation for future email campaigns',
          ],
        },
      ],
      studioFeatures: [
        'Real-time Collaboration: Multiple editors can work simultaneously',
        'Custom Validation: Business rules for product management',
        'Image Management: Hotspot cropping and optimization',
        'Content Preview: See how content will appear on the website',
        'Version Control: Track content changes over time',
      ],
    },
    ecommerceFeatures: {
      shoppingCart: [
        'Persistent cart state with React Context',
        'Add/remove items',
        'Quantity management',
        'Cart total calculation with clear item counts',
      ],
      checkout: [
        'Stripe Checkout integration configured in demo/test mode',
        'Payment flow modeled after real production patterns without charging cards',
        'Order confirmation success page for a realistic post-checkout experience',
        'Webhook structure ready for future live order handling',
      ],
      productManagement: [
        'Dynamic product pages with Next.js dynamic routes',
        'Homepage and listing sections for featured and hero products',
        'Inventory-style fields for availability and launch timing',
        'Schema fields for grit, scent, and display status to control how products appear',
      ],
    },
    designSystem: {
      components: [
        'Layout: Navbar, Footer, Hero sections',
        'Product: ProductCard, ProductGrid, FeaturedProducts',
        'E-commerce: Cart, checkout components',
        'Marketing: ReviewsSection, MichiganPrideSection, EmailSubscribe',
      ],
      styling: [
        'Tailwind CSS 4: Utility-first styling',
        'Responsive Design: Mobile-first approach',
        'Custom Components: Reusable UI elements',
        'Michigan Theme: Local branding and colors',
      ],
    },
    apiRoutes: [
      '/api/checkout - Create Stripe checkout sessions',
      '/api/webhooks/stripe - Handle Stripe webhooks',
      'Sanity GROQ queries for product data',
      'Real-time content updates',
      'Image optimization and transformation',
    ],
    performance: [
      'Next.js App Router: Optimized routing and rendering',
      'Image Optimization: Sanity image transformation',
      'Code Splitting: Automatic bundle optimization',
      'CDN: Content delivery network for static assets',
      'Turbopack: Fast development builds',
    ],
    security: [
      'Environment Variables: Secure API key management',
      'Stripe Security: PCI-compliant payment processing',
      'Sanity Security: Role-based access control',
      'Input Validation: Client and server-side validation',
    ],
  },
  'lambda-orthodontics': {
    title: 'Lambda Orthodontics',
    description:
      'A frameworkless orthodontics website demo built as a vanilla JavaScript SPA with a custom client-side router, centralized content model, and a lightweight Express server for demo-safe form handling.',
    imageUrl: '/images/lambda_ortho.webp',
    link: 'https://lambdaortho.vercel.app/',
    githubRepo: 'https://github.com/stepweaver/myers-vanilla.git',
    tags: ['Vanilla JavaScript', 'Express', 'SPA Architecture', 'Custom Router', 'Responsive UI'],
    overview:
      'Lambda Orthodontics is a front-end-heavy demo build for an orthodontics practice website. Instead of using a framework, I built it as a vanilla JavaScript single-page application with a custom router, modular page and section components, and a lightweight Express server. The project is intentionally positioned as a polished practice-site demo, not a production healthcare platform.',
    problem:
      'The challenge was to make a brochure-style healthcare site feel like a real application without dragging in framework overhead or pretending the demo had production infrastructure behind it. It needed multi-page behavior, reusable content, dynamic detail routes, responsive navigation, and believable form flows while staying honest about what was simulated.',
    role:
      'I owned the architecture, front-end implementation, routing system, component structure, shared data model, and the lightweight Node/Express backend used for demo-mode submissions.',
    solution:
      'I split the project into a persistent layout shell, route-aware page modules, reusable UI sections, and a centralized site data file. A custom Router handles History API navigation, link interception, dynamic route matching, active nav state, and scroll restoration. On the server, Express stays intentionally small: it serves static assets, exposes API-backed demo flows for contact, referral, and scheduling, and returns success responses without persistence.',
    architecture:
      'The app uses a thin-server, front-end-heavy architecture. Express serves the static front end, exposes `/api/sitedata`, `/api/contact`, `/api/referral`, and `/api/schedule`, and falls back to `index.html` for SPA routing. On the client, `main.js` boots the app, `Layout.js` renders the persistent shell, `Router.js` handles route matching, browser history, and scroll restoration, and page modules render route-level content. Shared content lives in `siteData.js`, which keeps homepage sections, treatment cards, job listings, FAQs, and form options consistent across the app.',
    features: [
      'Custom client-side router with static and dynamic routes for treatment and career detail pages',
      'History API navigation with internal link interception and route-aware active nav state',
      'Per-route scroll position save and restore for smoother SPA navigation',
      'Centralized content model in `siteData.js` for practice info, treatments, careers, scheduling steps, and FAQs',
      'API-backed demo flows for contact, referral, and scheduling via Express JSON endpoints',
      'Responsive navigation with mobile menu behavior and body scroll locking',
      'Client-simulated UI flows for job applications, newsletter signup, and patient portal interactions'
    ],
    engineering: [
      'Built as a vanilla JS SPA instead of relying on React or another framework, which forced explicit decisions around routing, lifecycle, and DOM updates',
      'Separated persistent layout concerns from route-level rendering so navigation updates the main content area instead of rebuilding the whole page',
      'Used a `Map` to preserve scroll positions by route and restored them after navigation for better UX on a multi-view SPA',
      'Kept the backend intentionally narrow: static file serving, a site data endpoint, and three demo submission endpoints',
      'Used reusable render/init patterns across components to keep DOM binding logic close to the markup it controls',
      'Added cleanup for the rotating hero so route changes do not leave timers running in the background',
      'Implemented stronger client-side validation and feedback on the referral flow than a simple alert-only form'
    ],
    outcome: [
      'Produced a believable practice-site demo that behaves more like an application than a static mockup',
      'Demonstrated that a small codebase can still support routing, dynamic detail pages, reusable content, and form workflows without framework dependency',
      'Created a reusable reference build for future service work where a polished front end matters more than a heavy application stack',
      'Made demo boundaries explicit by avoiding data persistence and labeling the site as a demonstration experience'
    ],
    tradeoffs: [
      'There is no real authentication, session management, or patient portal backend; those flows are simulated',
      'Only contact, referral, and scheduling post to Express endpoints; job applications, newsletter signup, and patient portal flows are intentionally client-simulated interactions',
      'Form behavior is not fully consistent across the app; some flows have loading and inline feedback while others still rely on alerts',
      'There are no automated tests in the repo',
      'The referral page includes healthcare-style confidentiality language, but the demo backend is not implementing production-grade secure data handling',
      'Some detail content is extended locally in page modules instead of being fully driven from one normalized data source'
    ],
    whyItMatters:
      'This project is a strong example of practical front-end engineering without framework crutches. Its value is not that it imitates a full healthcare platform, but that it shows deliberate SPA architecture, clear demo boundaries, thoughtful UX details, and disciplined separation between reusable content, route logic, and server responsibilities.'
  },
  'rpg-dice-roller': {
    title: 'RPG Dice Roller',
    description:
      'A fully client-side RPG dice roller with notation-aware roll logic, Web Crypto-backed randomness, selective rerolls, and browser-persisted history.',

    imageUrl: '/images/dice_roller.png',
    showComponentAsHero: true,
    link: '/dice-roller',
    tags: ['Web Development', 'React', 'Web Crypto', 'Interactive Tool'],

    overview:
      "The result is a full-screen dice utility at /dice-roller that supports mixed pools, modifiers, notes, held-die rerolls, copyable notation, and keyboard shortcuts. Under the hood, the more interesting part is the architecture: I separated roll logic from presentation, centralized dice metadata, used the browser's Web Crypto API for stronger randomness, and added tests around notation parsing and result calculation.",

    problem:
      'Most browser dice rollers are either ultra-basic randomizers or flashy tools with shallow logic. I wanted something that handled real RPG use cases  mixed dice pools, modifiers, annotations, and selective rerolls - while also fitting my terminal design language.\n\nThat introduced a few technical requirements. The roller needed to stay fully client-side, preserve user history without a backend, keep reroll behavior deterministic and understandable, and avoid the “good enough” approach of using Math.random() naively for game results.',

    role:
      'I designed and built the project end-to-end: route integration, React component architecture, roll engine design, notation parsing, held-die reroll behavior, keyboard interaction model, browser persistence, terminal-themed UI styling, and test coverage for the core logic layer.',

    solution:
      'I built the roller as two layers. The first is a reusable engine in lib/roller.js that handles notation parsing, validation, roll execution, rerolls, total calculation, and formatting. The second is a React UI layer composed of focused components for pool building, result display, and roll history. That separation keeps the logic testable and makes it possible to reuse the same engine elsewhere in the portfolio, including terminal-style roll commands.\n\nFor actual die results, I intentionally moved beyond Math.random() and used globalThis.crypto.getRandomValues() when available. I paired that with rejection sampling so values can be mapped into ranges like d20 or d100 without introducing modulo bias. In other words: I did not just make the roller “look good” - I improved the fairness and technical integrity of the randomization itself.\n\nHeld-die rerolls are modeled with stable keys tied to specific result positions, so players can lock individual outcomes and reroll only the remaining dice. Notes, formulas, totals, and timestamps are persisted to localStorage with defensive error handling, which keeps the tool fast, private, and independent of any server round-trip.',

    outcome: [
      'Built a portfolio piece that behaves like a real utility: visitors could use it during actual RPG sessions instead of only viewing it as a demo.',
      'Created a reusable roll engine that can support both the dedicated /dice-roller UI and /terminal commands without duplicating logic.',
      "Improved randomness quality by using the browser's Web Crypto API for die results and rejection sampling to avoid uneven face distribution.",
      'Kept the entire experience client-side, which reduced complexity, preserved privacy, and made the tool feel instant.',
      'Added test coverage around notation parsing, pool validation, and total calculation so the project reads as engineered software, not just styled UI.',
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
          'The core logic lives in lib/roller.js instead of inside component click handlers. That engine is responsible for parsing notation, validating pools, rolling dice, calculating totals, shaping result objects, and formatting output. This keeps the business logic portable and makes the UI easier to reason about.',
      },
      {
        title: 'Web Crypto API over Math.random()',
        description:
          'For actual die results, the roller prefers crypto.getRandomValues() rather than relying on Math.random(). That is a deliberate engineering choice: dice outcomes are the one place where stronger randomness matters. I also used rejection sampling before modulo conversion so arbitrary ranges map cleanly without subtle probability bias.',
      },
      {
        title: 'Held-die reroll state model',
        description:
          'Selective rerolls are handled by tracking held dice with stable position-based keys. That allows the roller to preserve exact locked outcomes while rerolling only the dice the user has not held. It is a cleaner and more trustworthy model than re-running an entire pool and trying to visually fake the result.',
      },
      {
        title: 'Notation-aware workflow',
        description:
          'The project supports dice notation concepts instead of only button clicks. Pool composition, modifiers, totals, and copyable formula strings are all driven by a notation-aware logic layer, which makes the tool easier to extend into typed commands, terminal integrations, and richer roll workflows later.',
      },
      {
        title: 'Client-side persistence without backend overhead',
        description:
          'Recent rolls are stored in localStorage with timestamps and defensive error handling. That means history survives refreshes and return visits without introducing a database, API, or user account system for a tool that does not need one.',
      },
      {
        title: 'Keyboard-first product design',
        description:
          'The roller includes shortcut-driven interaction for rolling, copying notation, resetting the pool, and clearing results. That makes it feel faster and more tool-like, especially for repeat use, and fits the broader λstepweaver terminal design language.',
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
        'Web Crypto API – crypto.getRandomValues() used for stronger die-result randomness when available',
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
        'One reason I separated the logic layer from the UI is that the same engine can power terminal commands elsewhere in the portfolio. That means dice behavior can stay consistent across multiple surfaces instead of being reimplemented in slightly different ways.',
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
        'Feels like a real tool, not a portfolio ornament: users can build practical pools, annotate them, reroll selectively, and keep history.',
        'Technical decisions reinforce trust: stronger randomization, notation-aware logic, and deterministic held-die behavior make the roller more defensible.',
        'Fast and private: everything runs client-side, so there is no waiting on an API and no need to send roll history anywhere.',
        'Consistent with the λstepweaver brand: the retro terminal presentation supports the portfolio identity without sacrificing utility.',
        'Logic/UI separation creates room for extension: the engine can be reused in terminal commands, dialogs, or future game-adjacent tools.',
      ],
      areasForImprovement: [
        'Typed notation input would make power-user workflows faster than repeated click-based pool construction.',
        'The held-die interaction could benefit from stronger visual cues or micro-animations so locked vs rerolled dice read even more clearly.',
        'Accessibility could be strengthened further with additional contrast tuning, clearer focus indicators, and more explicit ARIA support around result interactions.',
        'README coverage should be expanded so the dice roller is documented as part of the broader portfolio codebase rather than discovered only by browsing the site.',
      ],
    },

    readmeRecommendations: [
      'Document the dice roller as a first-class project inside the main stepwever_v3 README.',
      'Call out the architecture split between UI components and lib/roller.js so readers understand the logic is reusable.',
      'Mention the Web Crypto API and rejection sampling explicitly; that is one of the most interesting technical decisions in the project.',
      'List keyboard shortcuts, localStorage persistence behavior, and the hold-and-reroll system in the usage section.',
      'Show one or two example notation strings and explain how the same engine could be reused in terminal commands.',
    ],

    conclusion:
      'This project is a good example of the kind of software I like building: focused, interactive, visually distinct, and technically cleaner than it needs to be for the size of the tool. The interesting part is not just that it rolls dice - it is that the roller was built with deliberate decisions around fairness, architecture, reuse, client-side persistence, and UX. That makes it a stronger portfolio piece than a basic “fun widget,” and a better reflection of how I think about software design.',
  },
  'portfolio-terminal': {
    title: 'Portfolio Terminal UI',
    description:
      'Browser-based command interface for my portfolio, built as a lightweight shell with modular command routing, stateful modes, shared utilities, and AI-backed interactions instead of a fake prompt effect.',
    imageUrl: '/images/terminal_ui.png',
    link: '/terminal',
    githubRepo: 'stepweaver/stepwever_v3',
    tags: ['Next.js', 'React', 'Terminal UI', 'Command Architecture', 'AI'],

    overview:
      'I built the terminal as a real interface layer for the portfolio, not just a themed hero section. Visitors can navigate content, launch special modes, query shared tools, send a message, and talk to λlambda through commands instead of menus.\n\nUnder the hood, the terminal is structured like a small client-side shell. The main terminal component owns input, prompt rendering, cursor state, focus behavior, scrolling, and output lines, while command execution is delegated into separate command/data modules. That split made it possible to add resume browsing, Codex mode, weather lookup, AI chat, dice rolling, and embedded games without turning the terminal into one giant switch statement.\n\nThe result is a browser-based terminal that behaves more like a small operating surface than a decorative portfolio gimmick.',

    problem:
      'Most portfolio terminals are basically styled text boxes with hardcoded output. I wanted something that could actually act as an alternate interface for the site: a place where users could explore content, jump between routes, launch utilities, and interact with shared features through a command model instead of only through traditional navigation.',

    users:
      'The main users are recruiters, clients, and technically curious visitors who want fast signal. The terminal is designed to let them inspect my work, browse content, and interact with portfolio systems in a way that feels closer to using software than reading a brochure.',

    role:
      'I designed and built the terminal architecture, command router, mode handling, AI integration, weather flow, contact flow, dice integration, keyboard behavior, and the surrounding interface system that makes it feel cohesive inside the broader λstepweaver portfolio.',

    solution:
      'I separated shell concerns from command concerns. `Terminal.jsx` manages shell behavior like lines, input, cursor position, duplicate-command suppression, prompt state, focus management, and scroll behavior, while `components/Terminal/commands/index.js` routes commands into specialized modules for navigation, resume, Codex, weather, AI chat, dice rolling, and games. The terminal also supports stateful modes, so input can be interpreted differently when the user is inside flows like contact, weather selection, resume, Codex, Blackjack, or Zork.\n\nThat architecture let me treat the terminal as another client of shared app logic rather than a one-off component. For example, the `roll` command reuses the same dice engine as the standalone RPG Dice Roller, and the `chat` command connects to the same protected AI backend used in my λlambda chat agent.',

    features: [
      'Mode-aware command system that changes input behavior for resume, Codex, contact, weather selection, Blackjack, and Zork',
      '`chat` command wired to the shared λlambda backend instead of a terminal-only mock implementation',
      '`roll` command backed by the shared dice engine in `lib/roller.js`',
      '`weather` flow with location lookup, geolocation fallback, and multi-result selection handling',
      'Terminal-native contact flow that collects name, email, and message step-by-step',
      '`cd` navigation commands that bridge from the terminal into site routes like `/contact`, `/codex`, and `/dice-roller`',
      'Keyboard-driven interaction with history navigation, cursor movement, and focused input behavior',
      'Embedded game commands for Blackjack and Zork to reinforce the terminal as an interactive surface rather than static content',
    ],

    keyFeatures: [
      {
        title: 'Shell architecture instead of a monolith',
        description:
          'The terminal component is responsible for shell behavior, not business logic. It manages prompt state, command submission, line rendering, cursor movement, scrolling, and focus, while command execution is delegated into a dedicated command router and supporting modules. That separation keeps the UI layer understandable and makes the command set easier to extend.',
      },
      {
        title: 'Mode-based input routing',
        description:
          'The terminal checks active modes before it processes standard commands. If the user is in contact mode, weather selection, resume mode, Codex mode, Blackjack, or Zork, the same input field is interpreted in a mode-specific way. That gives the interface real statefulness instead of treating every command as an isolated one-shot action.',
      },
      {
        title: 'Shared logic across surfaces',
        description:
          'The terminal reuses application logic instead of duplicating it. The `chat` command talks to the shared AI route, and the `roll` command reuses the same dice engine used by the standalone dice roller. That makes the terminal part of the system architecture, not just a visual novelty layered on top.',
      },
      {
        title: 'Security-minded rendering and integration',
        description:
          'Terminal output can include formatted HTML, so rendered HTML is sanitized with DOMPurify before it is injected. At the app level, the project also uses nonce-based CSP middleware and a set of hardening headers, which helps support a safer environment for dynamic UI and third-party integrations.',
      },
      {
        title: 'UX engineering that makes it feel deliberate',
        description:
          'A lot of the terminal polish comes from small interaction decisions: duplicate rapid-command suppression, input re-focus after output changes, scroll-to-bottom behavior tied to actual line growth, click-to-open content targets, and imperative methods that let parent components programmatically execute commands or push Codex filters into the terminal.',
      },
    ],

    techStack: {
      frontend: [
        'Next.js 15 – App Router, route-based composition, and dynamic client-only terminal loading',
        'React 19 – component state, hooks, refs, and imperative handles for shell interaction',
        'Tailwind CSS 4 – terminal styling, HUD framing, and responsive layout',
      ],
      terminal: [
        'Dedicated `Terminal.jsx` shell component for prompt, input, rendering, and command orchestration',
        'Command router in `components/Terminal/commands/index.js` for modular command handling',
        'Custom hooks for command history, contact flow, and weather selection',
        'Mode-driven command handling for resume, Codex, games, and guided flows',
        'DOMPurify sanitization before rendering HTML output',
      ],
      sharedLogic: [
        'Shared `lib/roller.js` dice engine reused by both the terminal and standalone dice roller',
        'Shared AI backend through `/api/chat`',
        'Shared route navigation into portfolio pages and tools',
      ],
      integrations: [
        'AI chat route with protected server-side prompt construction and upstream timeout handling',
        'Weather integration with geolocation and city lookup',
        'Contact API submission from the guided terminal contact flow',
      ],
      security: [
        'Nonce-based CSP middleware with additional hardening headers',
        'Sanitized terminal HTML output with DOMPurify',
        'Protected AI route with request limits, sanitization, and timeout boundaries',
      ],
    },

    projectStructure: `λstepweaver v3 – Portfolio Terminal
├── app/
│   └── terminal/
│       └── page.jsx                  # terminal route with client-only loading
├── components/
│   └── Terminal/
│       ├── Terminal.jsx             # shell state, input handling, rendering, orchestration
│       ├── TerminalShell.jsx        # appearance wrapper and localStorage-backed mode preference
│       ├── commands/
│       │   └── index.js             # command router and mode-aware dispatch
│       ├── hooks/
│       │   ├── useCommandHistory.js # command history traversal
│       │   ├── useContactForm.js    # guided contact flow state
│       │   └── useWeatherSelection.js
│       └── data/                    # command-specific content and mode handlers
├── app/api/chat/route.js            # shared λlambda AI route
├── app/api/contact/route.js         # contact submission endpoint
├── lib/
│   └── roller.js                    # shared dice engine
└── middleware.js                    # CSP nonce + security headers`,

    challenges: [
      'Avoiding the common “fake terminal” trap and giving the UI real state, routing, and reusable application behavior',
      'Keeping the main terminal component from collapsing into a monolith as commands and modes expanded',
      'Making a command-driven interface still feel usable through keyboard handling, focus management, and discoverable output',
      'Supporting formatted terminal output without opening the door to unsafe HTML rendering',
    ],

    performance: [
      'The terminal page dynamically imports heavy client-only pieces with `ssr: false`, which is a sensible fit for a browser-driven interactive shell.',
      'The terminal uses memoization and callback memoization around rendering and interaction helpers to reduce unnecessary churn in a UI that updates frequently.',
      'Scrolling behavior is tied to actual line growth instead of firing blindly on every render.',
    ],

    security: [
      'Formatted terminal output is sanitized with DOMPurify before rendering.',
      'The broader app uses middleware-generated nonces and a Content Security Policy for document responses.',
      'The shared AI route includes request limits such as message-length caps, message-count caps, and upstream timeout handling.',
    ],

    outcome: [
      'The portfolio terminal works as a genuine interaction layer across the site instead of a decorative effect.',
      'It ties together content, navigation, AI chat, weather lookup, contact capture, and shared dice logic through one command surface.',
      'The modular command-and-mode structure makes it much easier to extend than a one-off terminal mockup.',
      'It gives the portfolio a stronger engineering story because the implementation is about architecture, reuse, and interaction design, not just styling.',
    ],

    improveNext: [
      'Actually enforce the configured max history size in the history hook instead of only passing a limit constant into the shell.',
      'Strengthen client-side validation in the guided contact flow before submission.',
      'Add terminal-focused tests around command routing, mode transitions, and edge-case interactions.',
      'Improve advantage/disadvantage handling in the `roll` command so it reports highest/lowest explicitly instead of currently mapping both shortcuts to `2d20`.',
    ],

    conclusion:
      'This project matters to me because it pushed the portfolio past presentation and into interface design. The terminal is still playful, but the real value is architectural: modular command routing, stateful modes, shared utilities, protected integrations, and a shell that can keep growing without becoming throwaway code. That makes it a much stronger engineering case study than “I made a terminal-themed homepage.”',
  },
  'neon-profile-card': {
    title: 'Profile Card',
    description:
      'A cyberpunk-inspired profile card experiment that evolved into the operator-card system on the λstepweaver homepage. Built with Next.js 15, React 19, and Tailwind CSS 4, it combines identity design, reusable UI primitives, and a terminal-style Matrix Sync animation.',
    imageUrl: null,
    showComponentAsHero: true,
    link: null,
    tags: ['UI Design', 'Component Design', 'Animation'],
    overview:
      'This project started as a stylized profile-card experiment: a glowing digital identity card with a retro terminal feel, animated status feedback, and a faux uplink sequence. The standalone version lives as NeonProfileCard and is rendered as an interactive demo inside the project case study. From there, I productionized the idea into the homepage Operator Card using shared UI primitives like HUDPanel, StatusPill, and MatrixSync. The result is not just a cool component, but a small visual system that strengthens the first impression of the portfolio and reinforces the site\'s CRT-inspired brand.',
    problem:
      'The portfolio needed a stronger above-the-fold identity. A plain hero section could communicate information, but it did not fully express the site\'s personality or its retro-terminal design language. I wanted a component that could introduce me quickly, feel branded and memorable, and still be structured enough to reuse or evolve elsewhere in the interface.',
    role:
      'I designed and built both the standalone profile card experiment and the productionized homepage operator card. That included layout, visual language, motion, state sequencing, and breaking the final version into reusable primitives.',
    solution:
      'I built NeonProfileCard as a self-contained React component that accepts profile data and layers in a branded presentation: avatar, name, role, tagline, status, badges, and a Matrix Sync panel. I then extracted the production homepage version into a more modular composition built from HUDPanel, StatusPill, MatrixSync, and GlitchLambda. The animation logic lives in a reusable useMatrixSync hook, which cycles through connection states and keeps the terminal effect consistent across components.',
    outcome: [
      'Stronger first impression: the homepage now introduces Stephen through a branded operator card instead of a generic hero block.',
      'Reusable UI system: the concept grew from a single component into shared primitives that can be reused across the site.',
      'Better storytelling: the card communicates role, personality, availability, and aesthetic in one compact module.',
      'Portfolio-ready demo: the standalone component can still be showcased independently inside its case study route.',
      'Responsive presentation: the card remains readable and visually dense without collapsing on smaller screens.',
    ],
    features: [
      'Standalone NeonProfileCard component with optional profile prop and sensible fallback data',
      'Productionized HeroOperatorCard for the live homepage experience',
      'Shared HUDPanel wrapper for console-style section framing',
      'Animated StatusPill with pulse effect and optional link behavior',
      'Reusable MatrixSync display powered by useMatrixSync',
      'GlitchLambda mark for subtle branded motion in the terminal readout',
      'Matrix state sequence: INIT UPLINK, SCANNING CONSTRUCT, TRACE, SIGNAL LOCK, HANDSHAKE FAIL, CARRIER LOST, USR UNPLUGGED',
      'Responsive tag and badge layout for compact identity details',
      'Dynamic demo injection through the project page route',
    ],
    techStack: {
      frontend: [
        'Next.js 15 - App Router architecture',
        'React 19 - Component composition and client-side state',
        'Tailwind CSS 4 - Utility-first styling, glow effects, spacing, and responsive layout',
      ],
      uiSystem: [
        'NeonProfileCard - standalone showcase component',
        'HeroOperatorCard - production homepage implementation',
        'HUDPanel, StatusPill, MatrixSync, GlitchLambda - reusable UI primitives',
      ],
      interaction: [
        'useMatrixSync hook - timed terminal-state animation',
        'Next.js dynamic imports - project-page demo loading',
        'Next/Image - optimized homepage avatar rendering',
      ],
    },
    projectStructure: `components/
  NeonProfileCard/
    NeonProfileCard.jsx     # Standalone profile card demo component
  Hero/
    Hero.jsx                # Homepage hero composition
    HeroOperatorCard.jsx    # Production homepage operator card
  ui/
    HUDPanel.jsx            # Console-style panel wrapper
    StatusPill.jsx          # Animated status indicator
    MatrixSync.jsx          # Reusable matrix readout UI
    GlitchLambda.jsx        # Glitching lambda brand mark
hooks/
  useMatrixSync.js          # Matrix sync state machine and animation logic
app/
  projects/[slug]/page.jsx  # Demo injection for the neon-profile-card project
lib/
  projectsData.js           # Case study content and project metadata`,
    demoHighlights: [
      'A standalone experimental component that informed the live homepage design',
      'Shared animation logic extracted into a reusable hook',
      'Aesthetic exploration turned into reusable interface primitives',
      'Strong branding without needing a large, complicated hero layout',
    ],
    readmeRecommendations: [
      'Mention the homepage Operator Card in the Features section',
      'Call out the reusable HUDPanel, StatusPill, and MatrixSync primitives',
      'Note that the Profile Card also exists as a standalone project demo',
      'Add one screenshot of the live homepage card and one screenshot of the standalone demo component',
    ],
  },
  'it-consulting': {
    title: 'IT Consulting',
    description:
      'IT consulting for small businesses that need clearer systems, better tool decisions, and less operational drag. I help teams assess what they have, identify what is not working, and build a practical path forward without unnecessary complexity.',
    imageUrl: '/images/it_consulting.png',
    link: null,
    tags: ['IT Consulting', 'Strategic Planning', 'System Integration'],
    isService: true,
    serviceIntro:
      'This is hands-on IT consulting for businesses that have outgrown guesswork. With a background as a business analyst and web developer, I bridge technical teams and stakeholders so unclear operational pain turns into practical technical decisions and next steps.',
    problem:
      'Small businesses and growing teams often end up with too many tools, manual processes, fragmented reporting, and unclear ownership of technical decisions. Leadership knows something is inefficient, but it is hard to see exactly where to start or how to clean things up without breaking what already works.',
    role:
      'I act as a fractional technical partner on the business side: evaluating your current systems and workflows, mapping where things break down, and helping you decide what to keep, fix, or replace. I stay close enough to the details to understand the real work, but high-level enough to keep decisions aligned with business goals.',
    solution:
      'I help clients evaluate their current setup, identify gaps, and make smarter decisions about systems, workflows, and implementation. That can include technology and workflow audits, tool and vendor evaluation, system integration planning, reporting and dashboard strategy, process cleanup, and implementation guidance.',
    outcome: [
      'Clearer technical direction that is grounded in how the business actually runs',
      'Fewer redundant tools and manual processes holding work together',
      'Better coordination between business needs and technical implementation',
      'More confidence in tool, vendor, and process decisions',
      'A roadmap you can actually execute with your current team or partners',
    ],
    features: [
      'Technology and workflow audits to understand how work really gets done today',
      'Tool and vendor evaluation with tradeoffs explained in plain language',
      'System integration planning to reduce double-entry and disconnected data',
      'Reporting and dashboard strategy so key metrics are reliable and visible',
      'Process cleanup and operational simplification before you scale bad workflows',
      'Implementation guidance and decision support during rollouts or migrations',
    ],
    benefits: [
      'Turn vague technical frustration into a concrete, prioritized plan',
      'Reduce wasted spend on overlapping or underused tools',
      'Align systems, workflows, and reporting with how your business actually operates',
      'Avoid reactive, one-off technology choices that create long-term complexity',
    ],
    exampleUseCases: [
      'A small business with too many disconnected tools and no clear source of truth that needs a practical consolidation and integration plan',
      'A growing team that wants to choose the right systems before scaling up headcount and hardening messy processes',
      'An organization that wants cleaner reporting and better cross-team coordination without rebuilding everything from scratch',
      'A founder who needs a pragmatic technical advisor before hiring a larger agency or full internal team',
    ],
    process: [
      'Discovery: Understand the business, current tools, workflows, pain points, and goals',
      'Audit: Map systems and processes to identify inefficiencies, risks, gaps, and quick wins',
      'Recommendation: Define practical next steps, priorities, and a future-state stack or plan',
      'Support: Provide implementation guidance, vendor and tooling decisions, and rollout support as needed',
    ],
    techStack: {
      consulting: [
        'Technology assessment and audits',
        'Workflow analysis and optimization',
        'System integration planning',
        'Infrastructure and platform decisions',
        'Security-minded best practices',
        'Scalability and growth planning',
      ],
    },
  },
  'n8n-automations': {
    title: 'n8n Automations',
    description:
      'n8n workflow automation service focused on event-driven integrations, business-rule enforcement, failure visibility, and eliminating manual handoffs between systems.',
    imageUrl: '/images/n8n_automations.png',
    link: null,
    githubRepo: null,
    tags: ['Automation', 'n8n', 'Integration Architecture', 'Systems Design'],
    isService: true,
    overview:
      'This entry represents an automation service inside the shared λstepweaver case-study framework, not a standalone public n8n application. The codebase proves the reusable service-page architecture; the service itself is about designing and implementing workflows that move data between tools, apply business logic, surface failures, and stay understandable after handoff.',
    problem:
      'A lot of companies already have the right tools, but the process between them is still manual. Form submissions land in inboxes, leads get re-entered, status changes drift across systems, reports get assembled by hand, and “automation” often means a brittle happy path that nobody monitors once it is live.',
    role:
      'I own the workflow design layer end to end: process mapping, trigger selection, data shaping, branching logic, failure handling, monitoring strategy, and handoff documentation. I am not just connecting apps. I am deciding where automation should intervene, what state should move, and how the workflow should fail safely when upstream data is messy or downstream systems are unavailable.',
    solution:
      'I use n8n as an orchestration layer for practical business workflows: intake routing, CRM updates, notification pipelines, scheduled reporting, approval flows, and cross-system synchronization. The emphasis is not on the number of nodes in a canvas; it is on making the workflow operationally reliable through validation, transformation, branching rules, retries, visible alerts, and documentation that a client can actually maintain.',
    architecture:
      'Repo-supported architecture: this service is modeled as structured data inside a shared slug-driven case-study system, then rendered through a single `/projects/[slug]` route with reusable sections, stack cards, metadata generation, and shared portfolio hardening. Inference about service delivery: the automation layer follows an event-driven pipeline — trigger, validate, normalize, route, persist or notify, then retry or alert on failure.',
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
      'Inference: the strongest engineering story in this service is operational thinking — idempotent design, validation at boundaries, failure visibility, and maintainable workflow ownership',
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
      'This deserves a place in the portfolio because automation is systems engineering, not just app connection. The valuable work is deciding what should trigger, what data is authoritative, how state moves, how failures surface, and how a team inherits the workflow afterward. Framed honestly as a service offering backed by sound architecture and operational judgment, it strengthens λstepweaver. Framed as if this repo contains a public n8n product, it overreaches.',
  },
  'ai-integrations': {
    title: 'AI Integrations',
    description:
      'A service-facing case study anchored by a real build: λlambda, a portfolio-native AI system that shares one protected chat backend across a floating widget, a dedicated page chat, and the terminal.',
    imageUrl: '/images/ai_integrations.png',
    tags: ['AI Integration', 'Next.js', 'LLM UX', 'Prompt Engineering', 'API Security'],
    overview:
      'This page is strongest when treated as proof of a shipped AI integration pattern, not a vague AI pitch. The concrete example in this repo is λlambda: a shared chat system that appears in multiple UI surfaces while keeping prompt control, provider orchestration, and safety decisions on the server.',
    problem:
      'Calling an LLM API is easy. Building a usable, portfolio-grade integration is harder. The same assistant had to behave coherently in a floating site widget, a full page chat, and a command-line terminal without exposing the system prompt, hanging on slow providers, or turning the experience into a toy.',
    role:
      'I owned the architecture end to end: prompt design, API route design, client surfaces, terminal integration, provider fallback logic, abuse protection, and the interaction details that make the chat feel usable on desktop and mobile.',
    solution:
      'I built a shared `/api/chat` route in Next.js and treated it as the single source of truth for model access. The web chat surfaces reuse a common `useChat` hook for local message state, starter prompts, attachments, loading, and error handling. The terminal uses a lighter adapter that hits the same backend but formats output for a console workflow. Channel-specific instructions are appended server-side so the terminal stays terse and plain-text while the site chat can use markdown links and slightly richer formatting.',
    architecture:
      'Client-side, the system is split into three surfaces: ChatWidget, ChatBot, and the terminal `chat` command. Server-side, the Node runtime chat route normalizes messages, sanitizes text, clamps history and payload sizes, applies same-origin checks, rate limits, and bot detection, then calls Groq first with an OpenAI fallback. The system prompt lives in a server-only module and is selected through `buildSystemPrompt(channel)`, which creates a clean server/client boundary.',
    features: [
      'Shared λlambda persona across the floating widget, dedicated page chat, and terminal command',
      'Channel-aware prompting so terminal responses stay plain-text and terse while site chat can return markdown links',
      'Multi-turn widget/page chat with local history and example questions',
      'Image paste support in the web widget with bounded attachment counts and size checks',
      'Provider fallback from Groq to OpenAI with timeout handling and user-safe error messages',
      'A live, inspectable proof surface for AI work inside the portfolio itself'
    ],
    engineering: [
      'Kept the system prompt server-only and explicitly prevented clients from owning prompt behavior',
      'Centralized request hardening through a protected-route helper that composes rate limiting, bot checks, parsing, and sanitization',
      'Added same-origin and optional allowlist checks before the route will process requests',
      'Normalized incoming messages, truncated long payloads, capped message history, and filtered suspicious prompt-injection-like content',
      'Used VisualViewport-aware scrolling and a sentinel-based auto-scroll hook so fullscreen/mobile chat behaves better when the keyboard opens',
      'Loaded interactive chat surfaces client-side with dynamic imports to avoid SSR friction for highly interactive UI'
    ],
    outcome: [
      'Shipped a real AI feature on the live portfolio instead of describing AI work abstractly',
      'Created a reusable pattern for future client work: interface layer, protected backend, server-owned prompts, and provider routing',
      'Demonstrated that AI can be woven into multiple interfaces without duplicating backend logic',
      'Kept operational scope small enough for a portfolio deployment by avoiding unnecessary infrastructure'
    ],
    tradeoffs: [
      'No persistent memory or user accounts are implemented in this repo; widget/page history lives only in local React state and terminal calls are effectively single-turn',
      'No retrieval layer, document grounding, or citation system is implemented here; responses are driven by the curated system prompt and request context',
      'The previous service copy drifted beyond the shipped implementation by referencing adjacent ideas like Postgres-backed memory, Slack capture, MCP retrieval, and broader AI stacks that are not part of this repo',
      'Jest is configured for the codebase, but AI/chat-specific test coverage is not yet part of the visible repository'
    ],
    whyItMatters:
      'This is the difference between saying “I can do AI integrations” and actually shipping one. The repo shows prompt boundaries, channel-aware behavior, client/server separation, provider fallback, basic abuse resistance, and interface design choices that make an LLM feature feel intentional instead of stapled on.',
  },
  'google-analytics': {
    title: 'Google Analytics & Measurement Strategy',
    description:
      'GA4 setup, event tracking, and reporting that turn website traffic into usable business signals.',
    imageUrl: null,
    link: null,
    tags: ['Analytics', 'Data Tracking', 'Business Intelligence'],
    isService: true,
    serviceIntro:
      'A lot of businesses have analytics installed and still have no idea what their website is actually doing. I help turn that into something useful: clean tracking, meaningful events, and reporting that helps people make better decisions instead of staring at vanity metrics.\n\nThis service is about turning website traffic into something usable: understanding where visitors come from, what pages matter, what calls to action get used, and where the site is losing people before they convert. Instead of treating analytics like a checkbox, I treat it like part of the business system.\n\nThis service fits naturally with the rest of what I build: websites, dashboards, automations, and digital systems. On the public services side of λstepweaver, analytics already shows up as part of websites, digital presence, growth work, and ongoing optimization. This case study makes that capability explicit: I do not just build websites that look better. I help build websites that can be measured, interpreted, and improved.',
    problem:
      'A lot of sites technically "have analytics," but the setup is shallow. You get traffic numbers, maybe some acquisition data, but not much clarity about which pages are doing work, which interactions matter, or whether the site is helping the business move forward. That is especially common when a site has forms, click-to-call actions, campaign links, landing pages, or local SEO goals but no meaningful event tracking or conversion structure behind them. In GA4, measurement is event-based, which makes it powerful, but also easy to under-configure if nobody maps the events back to real business goals.',
    role:
      'I approach analytics the same way I approach dashboards, internal tools, and reporting: start with the business question, then design the measurement around it. My background in SQL analytics, Tableau reporting, and business analysis shapes the work here. I am not just thinking about whether tracking fires. I am thinking about whether the reporting will help someone understand performance, explain results, and decide what to change next.',
    solution:
      'Depending on the project, this can include the following. GA4 supports automatically collected events, recommended events for richer reporting, realtime visibility, and standard reports for acquisition, pages, and events. The goal is to use those capabilities in a practical way, not drown the client in noise.',
    features: [
      'GA4 property setup and baseline configuration',
      'Key event and conversion tracking',
      'Form submission and lead-action tracking',
      'Landing page and traffic-source reporting',
      'Campaign / UTM consistency',
      'Dashboard-friendly event naming and reporting structure',
      'Lightweight implementation that is easy to maintain',
    ],
    outcome: [
      'Clearer reporting and better visibility into what users actually do',
      'Cleaner conversion tracking so you know which actions matter',
      'Stronger foundation for SEO, campaigns, content decisions, and future optimization',
      'A site that tells the truth - measurement that supports better decisions instead of vanity metrics',
    ],
    benefits: [
      'Clean feedback loop between site performance and business decisions',
      'Visibility into which sources, pages, and actions actually drive results',
      'Reporting that supports explanation and iteration, not just numbers',
    ],
    exampleUseCases: [
      'GA4 setup or migration with event mapping and conversion structure aligned to business goals',
      'Forms, lead actions, and landing pages with meaningful event tracking and conversion reporting',
    ],
    process: [
      'Discovery: Start with the business question and map goals to measurable events',
      'Event design: Define key events and conversion structure',
      'Implementation: GA4/GTM setup, event tracking, and baseline configuration',
      'Reporting: Dashboards and reporting that support decisions',
      'Iteration: Use data to improve content, pages, and conversion paths',
    ],
    services: [
      'GA4 property setup and baseline configuration',
      'Key event and conversion tracking',
      'Form and lead-action tracking',
      'Landing page and traffic-source reporting',
      'Campaign / UTM consistency and reporting structure',
      'Lightweight, maintainable implementation',
    ],
    techStack: {
      analytics: [
        'Google Analytics 4 (GA4) - event-based measurement and reporting',
        'Google Tag Manager - tag management and deployment',
        'Looker Studio - custom reporting and dashboards',
        'Event design and conversion tracking - mapping business goals to events',
        'Next.js / React - modern sites where analytics is implemented (this repo uses Next.js 15 and React 19, with a dedicated analytics area in the component structure)',
      ],
    },
  },
  'lcerebro': {
    title: 'λcerebro',
    description:
      'An in-progress memory-layer project focused on portable, user-owned context: capture thoughts into durable storage and make them retrievable across AI workflows instead of locking memory inside a single chat tool.',
    imageUrl: '/images/cerebro.png',
    link: null,
    githubRepo: '',
    tags: ['AI', 'Memory Layer', 'Architecture', 'Postgres', 'Build in progress'],
    overview:
      'λcerebro is an architecture-led second-brain project. The core idea is that the most valuable part of an AI workflow is not the model alone, but the memory layer behind it: durable context that lives outside any single chat window, provider, or UI. In the current portfolio repo, λcerebro is represented as an in-progress case study with an early systems design direction rather than a fully inspectable standalone application.',
    problem:
      'Most AI workflows are context-siloed. Notes live in one tool, prompts live in another, and useful history disappears inside individual chats. That makes memory fragile, non-portable, and hard to reuse across models or interfaces.',
    role:
      'I defined the systems direction, problem framing, and target architecture for capture, storage, and retrieval. Based on what this repo currently proves, this case study should be framed as architecture ownership and early build progress, not as a fully shipped production system.',
    solution:
      'I framed λcerebro as a two-part memory system: ingest thoughts into durable storage, then expose retrieval through a model-agnostic interface so context can move with the user instead of staying trapped inside one AI product. The current portfolio implementation captures that architecture direction and project intent, while the deeper runtime implementation remains in progress.',
    architecture:
      'Within this repo, λcerebro lives inside the shared `projectsData.js` data model and is rendered by the generic `/projects/[slug]` case-study route. That means the portfolio currently proves the project narrative, stack direction, and intended system boundaries more than the final runtime internals. The target product architecture is a split between ingestion and retrieval, but the dedicated application code is not yet exposed here.',
    features: [
      'Clear model-agnostic memory thesis: context should be portable, durable, and user-owned',
      'Early architecture direction centered on capture, storage, and retrieval as separate concerns',
      'Shared portfolio route and case-study system let the project evolve without a one-off page implementation',
      'Explicit in-progress status keeps the page honest instead of presenting unfinished work as complete',
    ],
    engineering: [
      'The project is surfaced through a data-driven case-study architecture rather than a bespoke page, which keeps portfolio entries consistent and easier to extend',
      'The surrounding project-detail system separates layout, section wrappers, list rendering, and stack rendering into reusable components',
      'The case-study route is client-rendered because the shared shell uses UI state, dynamic component loading, and DOM-side layout behavior',
      'Site-level middleware and protected-route helpers show production-minded patterns in the portfolio repo, even though λcerebro-specific runtime code is not yet surfaced here',
    ],
    outcome: [
      'λcerebro is established as a credible direction for a future memory-layer build, not just a vague idea',
      'The page now communicates the real value proposition without overselling unlinked implementation details',
      'Work-in-progress status is explicit, which makes the case study more trustworthy',
    ],
    tradeoffs: [
      'There is no dedicated λcerebro repo or live demo linked yet',
      'This repo does not currently expose inspectable λcerebro-specific ingestion, retrieval, schema, or deployment code',
      'Claims about Slack capture, embeddings, vector search, and MCP should be treated as target architecture unless supported by a dedicated codebase or demo',
      'The strongest evidence today is architectural framing, not end-to-end runtime proof',
    ],
    whyItMatters:
      'λcerebro matters because it points at a real systems problem: AI tools are only as useful as the memory they can carry forward. As a portfolio piece, it becomes strong when presented honestly as an in-progress architecture build aimed at portable, user-owned context instead of as a finished platform.',
  },
  'iam-resist': {
    title: 'I AM [RESIST]',
    description:
      'A mission-driven publishing and commerce platform built with Next.js 15, combining Notion-backed editorial workflows, multi-source feed aggregation, and a small print-on-demand merch pipeline in one maintainable codebase.',
    imageUrl: '/images/resist_sticker.png',
    link: 'https://iamresist.org',
    githubRepo: 'stepweaver/iamresist',
    tags: ['Next.js', 'React', 'Notion API', 'Stripe', 'Supabase', 'Printify', 'RSS'],

    overview:
      'I AM [RESIST] is a personal publishing platform that merges editorial content, curated media, news aggregation, and a small merchandise shop into a single application. Instead of splitting content and commerce into separate systems, I built one Next.js codebase with clear boundaries for content repositories, feed services, order handling, and fulfillment.',

    problem:
      'The hard part was not rendering pages. It was building one maintainable system that could ingest multiple content streams, let non-developers publish through Notion, aggregate external feeds without becoming brittle, and still support real checkout and fulfillment flows. The project also had to preserve a publication-first tone so the shop felt secondary to the mission rather than turning the site into a generic storefront.',

    role:
      'Solo full-stack developer. I owned the application architecture, App Router route structure, Notion integration layer, feed aggregation services, checkout flow, Stripe and Printify webhooks, Supabase order storage, metadata and SEO helpers, deployment configuration, and the visual/document-style UX of the site.',

    solution:
      'I organized the app around explicit boundaries. Notion access lives in repository modules under lib/notion, feed assembly lives in lib/feeds, order persistence lives in lib/db, and fulfillment logic is abstracted behind a provider interface in lib/fulfillment. On the frontend, the App Router handles editorial pages, archive views, product pages, and order status routes. On the backend, route handlers validate cart or checkout input, create Stripe sessions, verify webhook signatures, persist orders to Supabase, send confirmation emails, and submit fulfillment requests to Printify.',

    architecture:
      'Architecturally, this is strongest as a separation-of-concerns project. Content ingestion is not mixed into page components. Notion databases are mapped through repo modules, feed services handle aggregation and caching, checkout and webhook logic stay in API routes, and fulfillment is isolated behind a provider abstraction. The result is a codebase that supports multiple content types and a commerce pipeline without collapsing into one giant page-driven implementation.',

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
      'Feed services use unstable_cache, p-limit, and Promise.allSettled to reduce repeated API work and degrade gracefully when one source fails',
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
      'This project matters because it shows real product engineering rather than isolated UI work. It demonstrates that I can design boundaries, integrate third-party systems, manage server/client responsibilities, and ship a live application that supports real publishing and transaction flows without overengineering the stack.',
  },
  'mishawaka-shower-booking': {
    title: 'Food Pantry Shower Booking System',
    description:
      'A zero-cost, zero-infrastructure self-service shower booking system built entirely with Google Apps Script and Google Sheets. It tackles the “people waiting around all day” problem by letting guests book specific time slots from their phones, leave, and return within a short check-in window instead of waiting on-site.',
    imageUrl: '/images/terminal_ui.png',
    link: null,
    githubRepo: 'stepweaver/food-pantry-shower-scheduler',
    tags: ['Google Apps Script', 'PWA', 'Community Service', 'Zero Infrastructure'],
    problem:
      'The Food Pantry had to discontinue shower services because people were waiting around all day hoping to get a shower. Large groups congregated outside, staff were strained trying to manage an informal first-come-first-served line, and guests were wasting entire days for a service that might not be available.',
    context:
      'Built for a community pantry with near-zero budget and limited staff time. The “users” were guests booking from phones (often under stress) and staff who needed a simple operational dashboard.',
    role:
      'As the full-stack developer, I designed and built the entire booking system, including the Google Apps Script backend, Google Sheets data model, mobile-first public booking experience, staff-facing admin dashboard, automated triggers, and handoff-ready documentation.',
    solution:
      'I built a complete booking system entirely within Google Apps Script, deployed as a web app and backed by a Google Sheet. Guests enter a phone number, see available 30-minute slots for that day, and book a specific time from their own phones. They receive a simple 6-character check-in code, can leave immediately, and return within a 10-minute window around their slot to check in. Under the hood, the system uses server-side caching, lock-protected booking operations, and a staff dashboard so pantry staff can see who is booked, who has arrived, and which slots have expired.',
    outcome: [
      'Service Restored: Pantry can now offer showers again without operational chaos',
      'Zero Infrastructure Cost: Entire system runs on free Google services',
      'Better Resource Management: Staff can plan and manage shower availability',
      'Improved User Experience: Users can book and leave, return at scheduled time',
      'Privacy-Focused: Phone numbers deleted nightly, minimal data retention',
    ],
    improveNext: [
      'Add clearer multilingual UI affordances (labels + help text) so the flow stays usable across a wider range of guests.',
      'Improve resilience for low-connectivity moments (more explicit retry states and “what to do next” guidance).',
      'Add lightweight reporting (slot utilization, no-shows) in a way that keeps privacy tight and admin overhead low.',
    ],
    features: [
      'Zero-Cost Solution: Built entirely on free Google services (Apps Script, Sheets)',
      'Mobile-First PWA: Installable on phones, works offline, feels like native app',
      'Self-Service Booking: Users book slots themselves, no staff tablets needed',
      'Auto-Expiration: Unclaimed slots automatically released after grace period',
      'Phone Number Memory: Browser localStorage remembers phone numbers',
      'Real-Time Status: Countdown timers and live status updates',
      'Check-In System: 10-minute window before/after scheduled time',
      'Admin Dashboard: Staff can view bookings, check in users, manage system',
      'Configurable Settings: All settings in Google Sheets, no code changes needed',
      'Rate Limiting: Prevents booking abuse and protects server resources',
      'LockService Protection: Prevents race conditions and double-bookings',
      'Automated Maintenance: Daily cleanup and auto-expiration triggers',
      'Host Site Integration: Config endpoint for embedding in other websites',
    ],
    techStack: {
      backend: [
        'Google Apps Script - Server-side logic and API endpoints',
        'Google Sheets - Data storage (Slots and Config sheets)',
        'CacheService - Server-side caching for performance (5min config, 30sec slots)',
        'LockService - Race condition prevention for concurrent bookings',
        'Utilities - Date/time handling, code generation, validation',
      ],
      frontend: [
        'HTML5/CSS3 - Semantic markup and modern styling',
        'Vanilla JavaScript - No frameworks, minimal dependencies',
        'Service Worker - PWA support and offline caching',
        'localStorage - Client-side phone number persistence',
      ],
      deployment: [
        'Google Apps Script Web App - Free hosting with automatic scaling',
        'Time-Driven Triggers - Automated maintenance (every 5min and daily)',
      ],
    },
    projectStructure: `food-pantry-shower-scheduler/
├── Code.gs                    # Main Apps Script backend
│   ├── Configuration & Caching
│   ├── Rate Limiting
│   ├── Web App Routing (doGet/doPost)
│   ├── PWA Support (manifest, service worker)
│   ├── Security Utilities (constant-time comparison)
│   ├── Time & Date Utilities
│   ├── Slot Management (optimized with caching)
│   ├── Status & Check-In
│   ├── Admin Functions
│   ├── Automated Triggers (auto-expiration, daily cleanup)
│   └── API Functions (called from HTML)
│
├── booking.html              # Public booking page (PWA)
│   ├── Mobile-first responsive design
│   ├── Phone entry and lookup
│   ├── Status display with countdown
│   ├── Booking interface with time slots
│   ├── Check-in functionality
│   └── PWA install prompt
│
├── admin.html                # Staff dashboard
│   ├── Today's bookings view
│   ├── Status statistics
│   ├── Manual actions (check in, complete, no-show, cancel)
│   ├── Booking toggle (open/close system)
│   └── Real-time updates
│
├── SIGNAGE.html             # Printable sign with QR code / URL handoff
│
├── README.md                # Concept and high-level documentation
├── SETUP_GUIDE.md           # Step-by-step setup instructions for pantry staff
└── CASE_STUDY.md            # Detailed case study and technical narrative`,
    coreFeatures: {
      bookingFlow: [
        'Users enter phone number (saved in browser localStorage)',
        'System checks for existing booking for that phone number today',
        'Shows available time slots (30-minute windows)',
        'User selects slot and receives unique 6-character check-in code',
        'User can leave immediately - no waiting required',
      ],
      statusTracking: [
        'Users revisit the page - phone number auto-detected',
        'Shows countdown to scheduled time',
        'Check-in button becomes available 10 minutes before slot time',
        'Real-time status updates every 30 seconds',
      ],
      checkInSystem: [
        'Check-in window: 10 minutes before through 10 minutes after scheduled time',
        'Users tap "Check In" when they arrive',
        'Staff sees checked-in users on admin dashboard',
        'Unclaimed slots automatically expire after grace period',
      ],
      adminDashboard: [
        'View all today\'s bookings with statuses',
        'See who\'s waiting, who\'s checked in',
        'Manual actions: check in, mark complete, mark no-show, cancel',
        'Open/close booking system with custom messages',
        'Real-time updates every 30 seconds',
      ],
    },
    performanceOptimizations: [
      'Server-Side Caching: Config cache (5min TTL), Slots cache (30sec TTL), Rate limit cache (1min TTL)',
      'Batch Operations: Combined API calls reduce round trips (apiGetInitialData, apiGetAdminInitialData)',
      'LockService Protection: Prevents race conditions on concurrent bookings with 10-second timeout',
      'Optimized Spreadsheet Reads: Single data read per execution, cached results',
    ],
    securityFeatures: [
      'Rate Limiting: Max 5 booking attempts per phone per minute, 20 lookups per minute per IP, 30 admin actions per minute',
      'Constant-Time Comparison: Prevents timing attacks on admin authentication',
      'Server-Side Validation: All inputs validated server-side',
      'Privacy: Phone numbers deleted nightly via automated trigger',
      'LockService: Prevents double-bookings and race conditions',
    ],
    automatedMaintenance: [
      'Auto-Expiration Trigger (Every 5 Minutes): Scans all "booked" slots, marks as "expired" if grace period passed, releases slots for others',
      'Daily Cleanup Trigger (6 AM Daily): Deletes all rows older than today, clears all caches, maintains database performance',
    ],
    configurationSystem: [
      'All settings configurable via Google Sheets Config sheet - no code changes needed',
      'slot_duration_min: Minutes per slot (default: 30)',
      'grace_period_min: Check-in window after slot time (default: 10)',
      'start_time/end_time: Operating hours (24h format)',
      'slots_per_time: Concurrent showers available (default: 1)',
      'weekdays_only: Block weekend booking (default: TRUE)',
      'booking_enabled: Master on/off switch',
      'booking_closed_message: Custom message when closed',
      'admin_key: Staff dashboard password',
      'timezone: Timezone for date/time calculations',
      'rate_limit_enabled: Enable abuse prevention (default: TRUE)',
    ],
    integrationFeatures: [
      'Host Site Integration: Config endpoint (?action=config) for embedding in other websites',
      'Returns booking status and custom closed messages',
      'Allows host sites to check booking status before loading interface',
      'Fail-open design: Defaults to enabled if config check fails',
    ],
    userExperience: [
      'Mobile-First Design: PWA support, installable on phones, responsive layout',
      'Touch-Optimized: Large buttons, easy tap targets',
      'Offline Capable: Service worker caches for offline access',
      'Phone Number Memory: Browser localStorage remembers phone numbers',
      'Real-Time Updates: Status refreshes every 30 seconds',
      'Clear Countdown: Shows time until slot and check-in window',
    ],
    lessonsLearned: {
      whatWorkedWell: [
        'Google Sheets as Database: Familiar interface for staff, no database setup needed',
        'PWA Architecture: Installable on phones, feels like native app',
        'Caching Strategy: Dramatically improved performance on free hosting',
        'Phone Number as ID: No accounts needed, simple user experience',
        'Auto-Expiration: Prevents slot hoarding, ensures fair distribution',
      ],
      challengesOvercome: [
        'Apps Script Latency: Solved with aggressive caching and batch operations',
        'Race Conditions: LockService prevents double-bookings',
        'Mobile Experience: PWA features make it feel native',
        'Privacy Concerns: Nightly deletion of phone numbers addresses concerns',
      ],
    },
    screenshots: [
      'Public booking UI showing today’s available time slots, countdown timers, and mobile-first layout.',
      'Staff admin dashboard view with today’s bookings, statuses, and controls for check-in, completion, and no-shows.',
    ],
    challenges: [
      'Designing a booking flow that felt trustworthy and simple for guests who may have limited smartphone experience or unreliable connectivity.',
      'Working within Google Apps Script quotas and execution limits while still supporting real-time status updates and avoiding race conditions.',
      'Keeping privacy and data retention tight while still giving staff enough information to operate the system effectively.',
    ],
  },

  'llambda-llm-agent': {
    title: 'λlambda LLM Agent',
    description:
      'A portfolio-native LLM assistant built inside my Next.js portfolio, exposed through a floating widget, a dedicated chat surface, and a terminal command, all backed by one protected server route.',
    imageUrl: '/images/chatbot.png',
    link: '/terminal',
    githubRepo: 'stepweaver/stepwever_v3',
    tags: [
      'Next.js',
      'React',
      'LLM',
      'Groq',
      'OpenAI',
      'Prompt Architecture',
      'Terminal UX',
      'AI Integration',
    ],
    overview:
      'λlambda is not a generic chatbot embed. It is a shared AI layer inside my portfolio that lets visitors ask practical questions about my work, projects, and background from multiple interfaces without duplicating backend logic. The most important architectural choice was treating the AI experience as a system with channels, constraints, and safeguards rather than as a one-off widget.',
    problem:
      'Traditional portfolio sites make people work too hard. Recruiters and clients often have to infer fit from scattered project cards, resume bullets, and marketing copy. I wanted a faster interface for discovery, but it had to feel native to the site, stay technically honest, and avoid exposing internal prompt logic or turning the portfolio into a gimmick.',
    role:
      'Solo full-stack developer. I designed the UX and interaction model, implemented the shared chat architecture, wrote the server-only prompt system, built the protected API route, wired terminal and website chat surfaces into the same backend, and added the guardrails around input handling, rate limiting, bot resistance, and provider fallback.',
    solution:
      'I built λlambda as a multi-surface assistant inside a Next.js 15 App Router application. The widget and dedicated chat surface share a common chat hook and transcript flow, while the terminal uses a thinner command bridge that still posts into the same `/api/chat` route. On the server, requests are normalized, sanitized, filtered, and routed through channel-aware prompt instructions before calling Groq as the primary provider and OpenAI as fallback. The result is one backend contract with different front-end personalities depending on where the conversation starts.',
    architecture:
      'The core boundary is server over client. The system prompt lives on the server, not in the browser. The `/api/chat` route enforces same-origin checks, rate limiting, bot heuristics, message validation, timeout handling, and prompt-leak redaction before any provider call is made. Widget/page chat share common state and scrolling behavior, while the terminal intentionally keeps its own interaction model and response rendering. That separation keeps the shell experience distinct without forking the backend logic.',
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
      'Inference: likely reduces discovery friction for visitors who prefer asking direct questions instead of browsing multiple pages first',
    ],
    tradeoffs: [
      'This is a prompt-driven assistant, not a tool-using autonomous agent with memory, retrieval, or workflow execution',
      'Answers are not yet source-grounded with citations back to projects, resume entries, or Codex content',
      'Terminal and website chat share the backend route, but only the widget and dedicated page chat share the same front-end hook path',
      'Rate limiting falls back to in-memory storage unless KV-backed persistence is configured',
      'The repo includes test infrastructure, but the project would be more credible with dedicated tests for chat normalization, guardrails, and channel behavior',
    ],
    whyItMatters:
      'This project matters because it turns a portfolio into a conversational interface without hiding the engineering reality. It demonstrates system design, prompt discipline, server-client boundary control, UX detail work, and pragmatic AI integration in one build. It is stronger as evidence of thoughtful product engineering than as a claim of “I built an agent,” and that is exactly how I would present it.',
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
      'I built this as a real operations tool for a school fundraiser. The job was to make public bidding feel simple for families while still giving organizers the controls they actually needed: registration, anonymous bidding, item management, donations, winner communication, and clean auction closeout. The result is a purpose-built event platform with live bidding, multiple user roles, and demo-safe deployment patterns.',

    problem:
      'Silent auctions seem straightforward until you work through the trust model and event logistics. Bidders need a fast, phone-friendly flow. Organizers need visibility and control. Donors need a separate way to manage contributed items. The system should also protect bidder privacy, enforce auction rules on the server, and handle notifications responsibly. This project was really about building software for an event workflow, not just rendering a catalog of items.',

    role:
      'I designed and built the application end to end: frontend flows, backend routes, data model, authentication patterns, bidding rules, email workflows, admin tooling, donor tooling, demo-mode behavior, and deployment setup. I also hardened the project over time by tightening route protection and moving sensitive logic into trusted server paths.',

    solution:
      'I structured the app around distinct trust boundaries. Public catalog and bidding surfaces stay fast and interactive, while sensitive operations run through server-side routes backed by Supabase and validated before any state changes are accepted. Admin operations are protected separately from bidder flows, donor access has its own session model, and bidder enrollment is enforced before protected auction actions become available.\n\nOn the product side, I treated the auction like a real event system. The app supports guided onboarding, alias/avatar creation, item detail pages, live bid updates, leaderboard views, donation pledges, donor item management, QR-friendly item access, and closeout communication. On the operational side, it includes admin controls for auction timing, item management, QR access, donation review, and winner/admin email workflows.',

    architecture:
      'The project uses Next.js App Router for the application shell, Supabase for PostgreSQL and realtime updates, and Resend for transactional email. The route structure is split across public pages, donor/vendor flows, and admin routes. The data flow also reflects a deliberate trust split: anon Supabase access is used for client-facing catalog and realtime behavior, while service-role access is reserved for API routes, notifications, and protected server-side operations.\n\nThat separation matters because it keeps the interactive auction experience responsive without pushing business-critical decisions into the browser. The repo documentation also shows a clear auth model: Basic Auth for admin operations, HttpOnly cookie sessions for vendor access, and HttpOnly enrollment cookies for bidder gating on protected paths.',

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

    engineering:
      [
        'Next.js 16 + React 19 gave the project a modern App Router foundation with a clean separation between public pages and protected routes.',
        'Supabase fit the problem well because the project needed both relational auction data and realtime bid updates.',
        'Resend handled transactional email flows for verification, outbid, winner, and admin notifications.',
        'Zod-based validation and server-side bid enforcement keep auction rules out of the UI layer.',
        'The architecture distinguishes anon client access from service-role server access, which is the right trust boundary for a public bidding system.',
        'Admin and vendor access are not treated as the same problem: admin uses Basic Auth on protected routes, while vendor flows use HttpOnly session cookies.',
        'CSRF protection and rate limiting were added around state-changing flows like bidding, donations, alias creation, and vendor item actions.',
        'The demo-mode path is an architectural feature, not just a UI switch: it isolates public showcase behavior from real-event data and email side effects.',
      ],

    outcome: [
      'Built a real event operations platform instead of a one-off fundraiser microsite.',
      'Created a smoother auction experience for bidders while giving organizers structured control over items, timing, closeout, and communications.',
      'Protected sensitive workflows by enforcing auction rules and auth boundaries server-side instead of trusting the browser.',
      'Added a separate donor workflow and donation support, making the platform broader than a simple bidding app.',
      'Turned the project into a strong portfolio-grade reference for full-stack architecture, realtime UX, security hardening, and operational tooling.',
    ],

    tradeoffs: [
      'The repo includes targeted unit tests for bid rules and vendor sessions, but this is not yet a heavily test-saturated codebase.',
      'The documented rate limiting is in-memory, which is reasonable for this scale but not the final form for multi-instance production traffic.',
      'Like many practical apps, some user-facing pages remain interactive and client-heavy because responsiveness matters during event use.',
      'The strength of the project is not theoretical perfection. It is that the risky parts of the workflow were identified and deliberately hardened.',
    ],

    whyItMatters:
      'This is the kind of project I want more of: software that looks approachable on the surface but has real operational complexity underneath. It demonstrates product thinking, trust-aware backend design, realtime data flow, role-based access patterns, and the discipline to build not just the happy path, but the parts an organizer actually depends on when an event is live.',
  },

  'bill-planner': {
    title: 'Weaver Bill Planner',
    description:
      'A full-stack household bill planning app that maps recurring bills and expected income into paycheck windows, helping users see what is due, what is paid, and which bills still need to be covered before the month gets away from them.',
    imageUrl: '/images/terminal_ui.png',
    link: 'https://github.com/stepweaver/weaver-bill-planner',
    githubRepo: 'stepweaver/weaver-bill-planner',
    tags: [
      'Next.js',
      'TypeScript',
      'PostgreSQL',
      'Drizzle ORM',
      'Auth.js',
      'Zod',
      'React Hook Form',
      'Tailwind CSS',
    ],
    overview:
      'Weaver Bill Planner is a product-style planning tool built around a simple but practical question: given a month of bills and a month of paychecks, what gets covered when? Instead of stopping at static budget categories, the app models months, income events, bill templates, and bill instances, then groups bills into paycheck windows so the user can plan against timing rather than guess from a running total.',
    problem:
      'The hard part was not rendering lists of bills. It was turning a real household planning problem into a data model and workflow that stayed understandable. Bills recur on different schedules, paychecks may land close together, due dates can fall before the first paycheck of the month, and users sometimes need to override automatic logic. The app needed to support that without becoming a spreadsheet clone or a fragile rules engine.',
    role:
      'I designed and built the application end to end: schema design, route structure, server actions, validation, authentication, paycheck-window assignment logic, month propagation flow, and the UI for creating, reviewing, and maintaining monthly plans.',
    solution:
      'I built the app with Next.js App Router, TypeScript, Neon Postgres, and Drizzle ORM, using feature-based folders to separate auth, bills, income, months, and templates. Forms use React Hook Form with Zod validation, while data mutations run through server actions that revalidate affected pages and recompute bill assignments when income changes. The core planning logic lives in reusable helpers rather than UI components, which keeps the rules testable in isolation later and keeps the interface focused on workflow.',
    architecture:
      'The app is structured around a small relational core: ledgers, months, bill templates, income events, and bill instances. App routes handle top-level navigation and page composition, feature folders own forms and actions for their domain, and shared helpers in src/lib handle metrics, paycheck-window generation, propagation, auth helpers, and validation schemas. Authentication is intentionally lightweight for MVP use: Auth.js credentials with protected routes, server-side session checks, and IP-based login rate limiting. Inference: the DATABASE_URL fallback and repeated database guards suggest the project was also shaped to build safely before full environment wiring is present.',
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
      'External payment links are opened with safe link attributes and auth cookies are configured as httpOnly',
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
      'This project matters because it shows more than CRUD. It demonstrates domain modeling, server/client boundary decisions, validation, security-minded MVP choices, and a piece of scheduling logic that solves a real user problem. It is the kind of build that proves I can turn an everyday operational headache into a coherent product with architecture behind it.',
  },

  // λlambda Heating & Air – generalized local service SEO demo
  'service-business-demo': {
    title: 'λlambda Heating & Air',
    description:
      'A static-first local service business demo that turns a multi-location SEO problem into generated landing pages, reusable vanilla-JS components, and lightweight Express-backed lead capture.',
    imageUrl: '/images/lambda_heating_air.webp',
    link: 'https://lambda-heating-air.vercel.app/',
    githubRepo: 'stepweaver/heartland-heating-air',
    tags: ['Vanilla JavaScript', 'Express', 'SEO', 'Lead Generation', 'Agency Demo'],
    overview:
      'λlambda Heating & Air is a generalized local-service website demo adapted from real client work. The interesting part is not just the homepage design. The repo models locations, services, and business content in structured JavaScript modules, uses scripts to generate location-specific SEO pages ahead of time, and pairs that static content layer with a small Express backend for form handling and email notifications.',
    problem:
      'Local service businesses often need many near-duplicate pages built around service and location combinations, plus core marketing pages and lead forms, without the overhead of a full CMS or a heavyweight framework. The hard part was turning that into a reusable system instead of a pile of manually maintained HTML while still keeping it simple enough to fork, re-skin, and host cheaply.',
    role:
      'I owned the implementation end to end: information architecture, data modeling for locations and services, static page generation, vanilla-JS component composition, Express route handling, form validation, reCAPTCHA integration, email template wiring, and the adaptation of the original client pattern into a portfolio-safe demo.',
    solution:
      'I kept the architecture static-first. Core marketing pages are plain HTML shells enhanced by ES-module components. Location/service pages are generated into the public tree ahead of time from structured data instead of being authored one by one. Express is only used where a server genuinely helps: serving the site, accepting contact and quote submissions, verifying reCAPTCHA, and sending internal/customer emails through Nodemailer. That keeps the browsing experience lightweight while still making the demo behave like a working lead-generation site.',
    architecture:
      'The repo is split into four main layers. First, `public/components` holds reusable view modules such as Navbar, Hero, Contact, Careers, ServicePage, and LocationPage. Second, `public/data` holds services, careers, testimonials, and the location/service source data used by the generator. Third, `scripts/` contains the location-page generation and SEO maintenance utilities. Fourth, `server.js` serves static files and exposes `/api/contact`, `/api/quote`, `/api/job-application`, `/api/health`, and `/api/test-email`. The result is a small system with a clear boundary between presentation, content modeling, generation, and backend form handling.',
    features: [
      'Generated location/service landing pages written from structured data instead of manually copied HTML.',
      'Reusable vanilla-JS component layer for navigation, hero, reviews, contact, careers, service pages, and location pages.',
      'Express-backed contact and quote endpoints with required-field checks, email validation, and reCAPTCHA verification.',
      'Nodemailer notifications and confirmation emails so form submissions behave like a real business workflow.',
      'Careers section with structured job data, job-detail routes, and a general-application path.',
      'SEO-oriented page metadata, schema markup, sitemap generation, and canonical handling.',
      'Static-friendly deployment model that keeps the frontend simple while preserving backend-powered lead capture.',
    ],
    engineering: [
      'Used a static-first architecture to keep most pages cheap to host and fast to serve, while reserving Express for the small set of server concerns that actually require it.',
      'Modeled location and service content as structured data so the long-tail SEO footprint could be generated instead of hand-maintained.',
      'Organized the frontend into discrete ES-module components rather than one monolithic script, which makes the site easier to re-skin and extend.',
      'Added client-side validation in the contact flow and mirrored core validation on the server for a basic but sensible defense-in-depth pattern.',
      'Handled careers detail pages with client-side route updates and a server catch-all so deep links can still resolve to the correct HTML shell.',
      'Built demo-mode touches such as booking fallbacks, health/test-email endpoints, and mock testimonial data to make the project usable as a portfolio artifact instead of a dead mockup.',
    ],
    outcome: [
      'Turned a repetitive local-SEO page problem into a reusable generation pattern.',
      'Produced a portfolio-safe demo that shows how a real agency/client implementation can be abstracted into a reusable technical asset.',
      'Created a small full-stack marketing site where the frontend stays lightweight but the lead flows still feel operational.',
      'Established a credible base for future reuse across other service-business builds, especially where static content and lead capture matter more than complex app state.',
    ],
    tradeoffs: [
      'The repo is stronger as an architecture demo than as a production-ready product. It has no database, no user accounts, and no fully integrated booking platform.',
      'The demo is only partially generalized today. Some legacy Heartland-specific branding, metadata, canonicals, and narrative copy still remain in the checked-in code.',
      'The careers UI is ahead of the backend: file inputs are present, but the checked-in job-application flow does not implement a real resume upload pipeline.',
      'The page-generation idea is real, but the checked-in generator script still needs module-format cleanup before the build story feels polished from a fresh clone.',
      'There is no visible automated test suite or CI workflow in the current repo.',
    ],
    whyItMatters:
      'This project matters because it shows systems thinking, not just page styling. It demonstrates how I model a repetitive SEO/content problem, choose a lightweight server/client boundary, and translate a real service-business need into a reusable technical pattern. It is most credible when presented honestly as a static-generation and lead-flow architecture demo with some cleanup still in progress.',
  },
};

export function getProjectBySlug(slug) {
  return PROJECTS_DATA[slug] || null;
}

