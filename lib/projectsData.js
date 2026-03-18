export const PROJECTS_DATA = {
  'soap-stache': {
    title: 'Soap Stache',
    description:
      'A CMS-backed e-commerce demo storefront built with Next.js, Sanity, and Stripe. It models a realistic small-shop browsing and checkout experience while keeping the entire purchase flow safely in demo mode.',
    imageUrl: '/images/soap_stache.webp',
    link: 'https://app-soap-stache.vercel.app/',
    githubRepo: 'stepweaver/app-soap-stache',
    tags: ['Next.js', 'Sanity CMS', 'Stripe', 'E-commerce Demo', 'App Router'],
    overview:
      'Soap Stache is a storefront reference build for a small product brand. The project focuses on the customer-facing application: a Next.js App Router frontend with Sanity-fed product content, a persistent cart, realistic checkout handoff, policy/support pages, and SEO-oriented metadata. Per the project README, the content studio lives in a separate companion Sanity repo, so this repository is best understood as the storefront layer rather than a full commerce platform.',
    problem:
      'I wanted a portfolio-grade storefront that felt like a real small-brand shop without pretending to be a live production business. The challenge was to combine editable catalog content, believable product merchandising, and a real checkout pattern while making the non-transactional demo boundary obvious and safe.',
    role:
      'I owned the storefront architecture, route structure, component composition, cart state, Sanity integration, Stripe demo wiring, metadata/structured data setup, and the overall frontend implementation.',
    solution:
      'I built the storefront in Next.js 15 using the App Router and a modular component structure. Product content is fetched from Sanity with GROQ queries, images are transformed through Sanity URL helpers, and cart state is managed with React Context plus localStorage persistence. The checkout flow posts cart data to an internal API route and redirects through Stripe in demo mode, giving the project a realistic commerce shape without processing live orders.',
    architecture:
      'The codebase is organized around a clear storefront split: `app/` for routes and layout, `components/` for reusable UI and merchandising sections, `contexts/` for cart state, and `lib/` for Sanity and Stripe helpers. The homepage is assembled from focused sections rather than one oversized page component. One important tradeoff is that some catalog data fetching happens in client components with `useEffect`, which keeps the implementation simple but is less SEO-friendly than fully server-rendered or statically regenerated catalog pages.',
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
      'Demo mode is treated as an implementation concern, not just marketing copy: the cart UI and README both reinforce that no real orders are processed',
    ],
    outcome: [
      'Produced a believable small-business storefront demo that feels more like a real product build than a static mockup',
      'Created a reusable reference pattern for CMS-backed catalog sites with a safe checkout demonstration layer',
      'Demonstrated frontend architecture choices that balance polish, maintainability, and realistic commerce behavior',
      'Gave the portfolio a stronger example of applied product thinking than a brochure-style marketing site alone',
    ],
    tradeoffs: [
      'This repo does not present a full production commerce stack: there is no visible auth layer, order persistence, inventory enforcement, or automated test suite',
      'Some catalog data is fetched client-side, which is simpler to build but weaker for SEO than server-rendered or statically regenerated catalog pages',
      'The companion Sanity Studio repo is referenced in the README but not bundled with this codebase, so schema-level claims should be kept modest unless both repos are reviewed together',
      'A few implementation details still need cleanup, including mismatched SEO/domain configuration and asset references in the layout metadata',
    ],
    whyItMatters:
      'This project matters because it shows more than visual polish. It demonstrates how I think about real storefront architecture: separating content concerns from presentation, modeling a believable purchase flow, building reusable stateful UI, and drawing a clear line between a demo-safe reference build and a production system.',
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
    title: 'Portfolio Terminal',
    description:
      'A browser-based terminal interface for navigating my portfolio through real commands instead of static UI. It routes users into shared site features like AI chat, dice rolling, content browsing, weather lookup, and contact capture through a modular command system rather than a fake prompt effect.',
    imageUrl: '/images/terminal_ui.png',
    link: '/terminal',
    githubRepo: 'https://github.com/stepweaver/stepwever_v3',
    tags: ['Next.js', 'Terminal UI', 'Interactive UX', 'AI Integration', 'Command Router', 'JavaScript'],
    overview:
      'This project is an interactive terminal layer inside my main portfolio app. The goal was not to mimic a terminal visually and stop there, but to create a command-driven interface that could expose real site capabilities: resume browsing, Codex content discovery, AI chat, weather lookup, contact submission, mini-games, and shared dice rolling. In practice, it behaves more like an alternative application shell for the portfolio than a novelty widget.',
    problem:
      'The hard part was making the terminal feel engineered instead of gimmicky. A fake terminal is easy. A maintainable command surface that supports stateful modes, client/server boundaries, reusable logic, and input UX without collapsing into one giant component is harder. It also had to coexist cleanly with the rest of the site and stay honest about what it actually does.',
    role:
      'I designed and built the terminal page, shell behavior, command router, stateful command modes, shared integrations, and the supporting API usage. That included command parsing, history and cursor behavior, content modes, weather and contact flows, dice command integration, and the connection into the shared AI backend used elsewhere in the portfolio.',
    solution:
      'I split the build into a client-only terminal shell, modular command handlers, and mode-specific helpers instead of treating the whole feature as one monolith. The shell owns input state, rendered lines, keyboard behavior, focus, and output rendering. The command layer routes standard commands and gives precedence to active modes like Resume, Codex, Zork, Blackjack, contact capture, and weather selection. Where possible, I reused existing site logic rather than duplicating behavior: the `roll` command uses the shared dice engine, and the `chat` command posts into the shared `/api/chat` route.',
    architecture:
      'Architecturally, this sits on top of the Next.js app as a client-rendered interaction surface. The terminal page dynamically imports the heavy client-only pieces, which keeps server rendering concerns separate from keyboard-driven UI logic. Inside the shell, command execution is mode-aware rather than flat. Supporting flows are split into hooks and data modules for things like contact intake, weather selection, resume browsing, Codex browsing, and mini-games. Server-backed features cross into protected API routes, where validation, rate limiting, sanitization, and bot checks live. That division matters: the terminal feels rich on the client, but the risky work still happens behind guarded server boundaries.',
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
      'Created a reusable command surface that showcases frontend systems thinking rather than only visual styling',
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
      'This project matters because it demonstrates the kind of engineering judgment I want my portfolio to represent: taking a visually interesting idea, giving it real architecture, reusing shared systems, respecting client/server boundaries, and adding enough polish and protection that it reads as a serious build instead of a novelty demo.',
  },
  'neon-profile-card': {
    title: 'Neon Profile Card',
    description:
      'A client-side profile-card experiment that grew into the operator-card system on the λstepweaver homepage. Built inside the main Next.js portfolio, it pairs reusable motion logic with branded CRT-style UI instead of living as a throwaway visual mockup.',
    imageUrl: null,
    showComponentAsHero: true,
    githubRepo: 'stepweaver/stepwever_v3',
    tags: ['Next.js', 'React', 'UI Architecture', 'Animation', 'Portfolio Engineering'],
    overview:
      'This project is a frontend interaction build, not a standalone product. It began as a generic NeonProfileCard with fallback profile data and configurable badges, then informed the production HeroOperatorCard used on the homepage. The interesting part is the evolution: the animation logic was pulled into a shared hook, the component was wired into the slug-driven case-study system, and the live version now sits inside the broader portfolio platform rather than in a one-off sandbox.',
    problem:
      'The portfolio needed a hero element that could do more than display text. It had to communicate identity, availability, tone, and technical personality in a compact space while still fitting the larger terminal/CRT language of the site. The hard part was turning a visual experiment into something reusable and shippable instead of a single flashy component.',
    role:
      'I designed and implemented the experimental NeonProfileCard, the production HeroOperatorCard on the homepage, the reusable MatrixSync animation layer, and the project-route integration that lets the case study render a live component instead of static screenshots.',
    solution:
      'I split the work into three layers. First, NeonProfileCard acts as the experimental surface: it accepts a profile prop, falls back to default demo data, normalizes badges, and renders a branded identity card. Second, MatrixSync and useMatrixSync hold the timed terminal sequence so the animation logic is not hard-coded into the display markup. Third, the project detail route dynamically maps the neon-profile-card slug to a live demo component and can render it as the case-study hero. That kept the effect reusable while letting the production homepage card diverge from the original experiment.',
    architecture:
      'The architecture is small but deliberate. The standalone experiment lives in components/NeonProfileCard, the production homepage version lives in components/Hero, shared motion lives in hooks/useMatrixSync and components/ui/MatrixSync, and the project detail system chooses which live component to inject via app/projects/[slug]/page.jsx. The project page is a client component because it controls interactive demo rendering, while app/projects/[slug]/layout.jsx keeps metadata generation on the server side for SEO and social previews.',
    features: [
      'NeonProfileCard supports an optional profile prop with fallback data for name, role, tagline, status, avatar, and badges.',
      'Badge handling is defensive: strings and object-shaped badge values are both tolerated, and non-array badge input collapses safely to an empty list.',
      'MatrixSync renders a terminal-style status panel with phase-based color changes, attempt counts, and animated register cells.',
      'useMatrixSync centralizes the timed animation loop, including randomized delays, phase changes, and reset behavior after repeated attempts.',
      'The case-study route can inject a live demo component by slug instead of relying only on screenshots or static prose.',
      'The homepage version uses Next/Image for the portrait and memoization on key hero components.'
    ],
    engineering: [
      'This is entirely client-side interaction work for the component itself: no auth, no persistence, and no server mutation logic.',
      'The strongest technical decision is separating the timed animation logic from the presentation layer. MatrixSync reads state; useMatrixSync owns sequencing, glyph generation, terminal output, and phase transitions.',
      'The hook is configurable enough to reuse: it accepts custom glyph sets and cell counts, which is why the standalone NeonProfileCard can use a different visual character set from the homepage card.',
      'The slug-driven project page makes interactive case studies a platform feature. The neon-profile-card entry is not a special hard-coded page; it plugs into the same project shell as other case studies.',
      'The project inherits portfolio-wide hardening from the shared app: CSP nonce generation and security headers in middleware, plus package import optimization, production console stripping, compression, and long-term asset caching in Next.js config.',
      'The route layout generates metadata from project data, so the case study participates in the broader SEO and social-preview system even though the page itself is interactive.'
    ],
    outcome: [
      'The experiment became part of the live homepage instead of staying as an isolated mock component.',
      'The animation logic now exists as a reusable hook-driven pattern rather than being buried inside one card.',
      'The project detail system can showcase the component as a live hero, which is stronger proof than a static screenshot-only case study.',
      'The work adds a distinct branded identity layer to the portfolio without requiring a separate application or deployment.'
    ],
    tradeoffs: [
      'The current live case study renders HeroOperatorCard as the hero, not the standalone NeonProfileCard, so the page should describe that distinction explicitly.',
      'There is no component-specific test coverage surfaced for this feature even though the repo has Jest configured at the project level.',
      'Validation is lightweight. The standalone card has safe fallbacks and badge normalization, but there is no formal schema validation for profile input.',
      'There is no project-specific screenshot or OG image, so this entry currently falls back to the shared default social preview image.',
      'Because this is a UI-engineering case study, outcomes are qualitative. The repo does not prove conversion or engagement metrics.'
    ],
    whyItMatters:
      'This is a solid portfolio piece when framed honestly: not as a full application, but as a reusable interface system inside a production portfolio. It shows component design, animation abstraction, route-level demo integration, and enough platform thinking to prove that the UI was engineered, not just styled.',
  },
  'it-consulting': {
    title: 'IT Consulting',
    description:
      'Fractional IT and systems consulting for small businesses that need clearer tooling, cleaner workflows, and better technical decisions without unnecessary complexity.',
    imageUrl: '/images/it_consulting.png',
    link: null,
    githubRepo: 'stepweaver/stepwever_v3',
    tags: ['IT Consulting', 'Systems Analysis', 'Integration Planning', 'Business Systems'],
    overview:
      'This is a service-facing case study, not a standalone SaaS product. The repo-backed proof is the shared λstepweaver case-study system that presents consulting capabilities through a slug-driven project route, reusable detail components, server-generated metadata, and portfolio-wide security and performance hardening. Framed honestly, the service is about practical systems work: tool audits, workflow mapping, reporting strategy, integration planning, and implementation guidance for teams that have outgrown guesswork.',
    problem:
      'Small businesses usually do not fail because they picked one terrible tool. They struggle because work is spread across too many tools, ownership is fuzzy, reporting is fragmented, and manual handoffs hide the real failure points. The hard part is not buying something new. It is understanding what is already in place, what is authoritative, what is duplicated, and what should actually change first.',
    role:
      'I work as a fractional technical partner on the business side. That means translating operational pain into a systems view: inventorying tools, mapping workflows, identifying breakpoints, explaining tradeoffs, and helping leadership decide what to keep, replace, integrate, or simplify. I stay close enough to the implementation details to make sound recommendations, but I keep the work tied to business outcomes instead of technology for its own sake.',
    solution:
      'I approach consulting like systems analysis rather than abstract advice. The work typically starts with discovery and audit, then moves into current-state mapping, tool and vendor evaluation, reporting and dashboard planning, source-of-truth decisions, process cleanup, and rollout guidance. In portfolio terms, this page should present that capability the same way the rest of λstepweaver presents shipped work: as a concrete, structured, technically reasoned offering rather than vague service copy.',
    architecture:
      'Repo-supported architecture: this service lives as structured data inside `lib/projectsData.js` and is rendered through the shared `/projects/[slug]` App Router page. The page itself is a client component so it can support the interactive console-style shell, mobile brief toggle, and optional demo surfaces. Metadata is generated separately in `app/projects/[slug]/layout.jsx`, which preserves canonical URLs, Open Graph tags, Twitter cards, and keyword generation without pushing SEO concerns into the interactive page component. The result is a reusable portfolio framework that can present both build case studies and service offerings through one consistent system.',
    features: [
      'Technology and workflow audits grounded in how work actually moves today',
      'Tool and vendor evaluation with tradeoffs explained in plain language',
      'Integration planning to reduce duplicate entry and disconnected systems',
      'Reporting and dashboard strategy focused on reliable business visibility',
      'Process cleanup before scale turns small inefficiencies into expensive ones',
      'Implementation guidance during migrations, rollouts, or operational changes'
    ],
    engineering: [
      'The entry is data-driven rather than hard-coded: one object in `projectsData.js` feeds the shared service/case-study renderer',
      'The `/projects/[slug]` page separates interactive client behavior from server-side metadata generation in the paired layout file',
      'Shared `ProjectSection`, `SectionList`, `BulletList`, and `TechStackGrid` components keep service pages structurally consistent with technical project writeups',
      'The page shell supports optional proof surfaces like a repo panel, which makes `githubRepo` an important credibility field for service entries',
      'Heavier visual pieces are lazy-loaded and wrapped in an `ErrorBoundary`, which keeps the shared project shell more resilient',
      'This page inherits the broader site hardening: nonce-based CSP, security headers, image optimization, package import optimization, production console stripping, compression, and asset caching'
    ],
    outcome: [
      'Positions IT consulting as systems work rather than generic “technology advice”',
      'Gives the portfolio a clearer bridge between shipped builds and the decision-making layer behind them',
      'Creates a reusable service-page pattern that can scale across consulting offers without a separate custom template',
      'Designed to help potential clients see where audits, integration planning, reporting strategy, and implementation guidance fit together'
    ],
    tradeoffs: [
      'This repo does not include private client audits, migration plans, vendor scorecards, or implementation documents, so the public proof is the service framing more than consulting deliverables',
      'There is no standalone consulting application here; this is a service entry inside the broader λstepweaver portfolio system',
      'Public outcomes should stay capability-based unless paired with sanitized examples, metrics, or before-and-after artifacts',
      'The live site and public repo appear slightly out of sync, so this entry is strongest once the deployment and source match again'
    ],
    whyItMatters:
      'This page deserves to exist because it explains the systems-thinking layer behind the rest of the portfolio. Websites, dashboards, automations, analytics, and AI integrations are all easier to understand when visitors can also see the consulting judgment that connects them. The key is to keep the framing honest: the repo proves the architecture, the delivery framework, and the engineering mindset—not confidential client work that is not exposed publicly.',
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
      'A service-facing case study about measurement architecture: turning websites into systems that answer business questions through clean events, useful reporting, and lightweight instrumentation.',
    imageUrl: null,
    link: null,
    githubRepo: 'stepweaver/stepwever_v3',
    tags: ['Measurement Strategy', 'GA4', 'Event Design', 'Next.js', 'SEO'],
    isService: true,

    overview:
      'This is best framed as a service case study backed by a measurement-aware portfolio implementation, not as a standalone public analytics product. In this repo, the public proof is smaller but real: a dedicated analytics wrapper, root-level instrumentation, route metadata, structured data, and CSP-aware script handling. Together, those choices show how I think about analytics - not as a random snippet dropped into a page, but as part of the application architecture.',

    problem:
      'Most sites technically “have analytics,” but the implementation is shallow. Teams can see traffic and pageviews, yet still cannot answer basic business questions: which page is generating leads, which CTA is getting used, which source is worth money, or where users drop off before converting. The hard part is not adding a script. The hard part is defining an event model that maps business intent to measurable behavior and then implementing it in a way that stays understandable over time.',

    role:
      'I own the measurement thinking end to end: translating business questions into events, deciding what should count as a conversion, keeping naming and reporting consistent, and fitting instrumentation into the surrounding site architecture. In the public repo, that shows up as the service-case-study system itself plus a measurement-conscious portfolio implementation rather than a client-exposed GA container.',

    solution:
      'My approach is to treat analytics as application design. I start with outcomes, define the events and conversions that matter, decide where instrumentation belongs, and keep the tracking layer isolated from presentation concerns. In this portfolio repo, the public implementation is intentionally lightweight: analytics is wrapped in its own client component, mounted once at the app shell, and paired with metadata, structured-data, and security-header decisions that make the site measurable without turning the codebase into tag soup.',

    architecture:
      'The case study lives inside a reusable `/projects/[slug]` system driven by `lib/projectsData.js`. Route metadata is generated server-side from the project object, while the page renderer handles shared sections like problem, architecture, engineering, outcomes, and service-specific presentation. The measurement-related implementation follows a clean boundary: analytics is loaded client-side through a dedicated wrapper, mounted from the root layout after render, and allowed through a nonce-based CSP in middleware. That separation matters because instrumentation should be additive and observable, not deeply entangled with route or content logic.',

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
      'This page matters when it shows that I do more than publish websites. I think about measurement loops: what should be tracked, how instrumentation fits into the stack, how security and metadata affect implementation, and how reporting becomes a decision tool instead of a vanity dashboard.',

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
      'A Phase 1 memory-layer architecture for portable AI context, centered on durable storage in Supabase, vector retrieval with pgvector, and MCP-based access across AI clients.',
    imageUrl: '/images/cerebro.png',
    link: null,
    tags: ['AI', 'Memory Layer', 'MCP', 'Supabase', 'Postgres', 'Build in progress'],
    overview:
      'λcerebro is a second-brain / memory-infrastructure project aimed at separating valuable context from any single chat UI or model vendor. The Phase 1 design follows a concrete pipeline: capture raw text, generate embeddings and structured metadata, store both in Supabase, expose retrieval through an MCP edge endpoint, and make the same memory available across multiple AI clients. The visible proof is the architecture and case-study implementation; the dedicated runtime build remains in progress.',
    problem:
      'Most AI workflows are context-siloed. Notes live in one tool, prompts live in another, and useful history disappears inside individual chats. That makes memory fragile, non-portable, and hard to reuse across models, interfaces, and ongoing work.',
    role:
      'I owned the Phase 1 system framing, storage/search/security design, and the technical translation of that architecture into a portfolio-ready case study. This should be presented as architecture ownership and implementation planning grounded in a concrete setup pattern, not as a fully shipped standalone product.',
    solution:
      'I framed Phase 1 as four cooperating layers: durable storage in Supabase/Postgres, semantic retrieval with pgvector and SQL functions, secure access through service-role secrets and an access key, and a model-agnostic MCP interface so capture and search can travel with the user across AI tools instead of staying trapped inside one app.',
    architecture:
      'Phase 1 centers on a `thoughts` table that stores raw `content`, a `vector(1536)` embedding, structured `metadata`, and timestamps. Retrieval is handled by a `match_thoughts` SQL function that ranks rows by vector similarity and can optionally filter against JSON metadata. Security is handled with row-level security plus service-role access for server-side operations. On top of that database layer, a remote Edge Function acts as the MCP surface for capture, search, recent-thought browsing, and stats, using an access key so the memory layer can be shared across supported AI clients without exposing the underlying database directly.',
    features: [
      'Durable thought records that combine raw text, embeddings, metadata, and timestamps in one storage model',
      'Vector-based semantic retrieval designed around a `vector(1536)` embedding column',
      'Database-side search function for thresholded similarity matching and metadata-aware filtering',
      'Security model based on row-level security, server-side secrets, and a separate access key for the MCP endpoint',
      'Remote MCP connection model so the same memory layer can be used from ChatGPT, Claude Desktop, Claude Code, and other compatible clients',
      'Explicit separation between capture, storage, retrieval, and client interface layers'
    ],
    engineering: [
      'Supabase / Postgres is the Phase 1 storage layer because it can hold raw text, JSON metadata, timestamps, and vector embeddings in one system',
      'pgvector enables semantic retrieval, with a `vector(1536)` embedding field sized to match the guide’s embedding setup',
      'The schema design uses dedicated indexes for the main access paths: vector similarity, JSON metadata filtering, and recent-item browsing',
      'A database-side `match_thoughts` function keeps similarity search close to the data instead of pushing ranking logic entirely into the application layer',
      'The security posture is server-oriented: row-level security is enabled, privileged operations are intended to run through a secret-bearing server path, and the MCP layer adds a separate access key boundary',
      'The MCP surface is a cleaner abstraction than wiring each AI client directly to the database, because it exposes task-shaped tools instead of raw tables',
      'Metadata extraction is treated as a helpful secondary layer; semantic retrieval is driven primarily by embeddings, not by perfect classification',
      'Cold-start behavior and remote connector ergonomics are real operational concerns at this layer, so latency and connection handling belong in the technical story, not just the product story'
    ],
    techStack: {
      foundation: [
        'Supabase - managed Postgres, API surface, secrets, and Edge Functions',
        'PostgreSQL - durable storage for thoughts, metadata, and timestamps'
      ],
      retrieval: [
        'pgvector - vector embeddings and semantic similarity search',
        'SQL functions and indexes - database-side retrieval logic and performance'
      ],
      ai: [
        'OpenRouter - embedding generation and lightweight metadata extraction',
        'Model-agnostic memory design - retrieval layer is intended to outlive any single model provider'
      ],
      interface: [
        'Model Context Protocol (MCP) - tool-based read/write access across AI clients',
        'Remote Edge Function endpoint - shared gateway for capture, search, list, and stats flows'
      ],
      security: [
        'Row Level Security (RLS) - table-level protection',
        'Service-role / secret-based server access - privileged operations kept off the client',
        'Access-key protected MCP URL - separate connector boundary for remote tools'
      ]
    },
    outcome: [
      'The case study now describes a real Phase 1 system shape instead of only a broad memory thesis',
      'λcerebro reads more like a storage/retrieval architecture project than a vague AI idea',
      'The portfolio entry better communicates database design, retrieval design, security boundaries, and MCP delivery together',
      'Work-in-progress status remains explicit, which keeps the case study credible while still making the technical direction legible'
    ],
    tradeoffs: [
      'There is still no dedicated λcerebro repo or live MCP demo linked from this page',
      'This portfolio repo does not yet expose inspectable λcerebro-specific runtime code for the database schema, Edge Function, or deployment flow',
      'Claims should stay framed as Phase 1 architecture and implementation direction unless backed by a dedicated codebase or public demo',
      'Metadata extraction is inherently best-effort, so retrieval quality should not be described as depending on perfect tagging',
      'Remote Edge Functions can introduce cold-start latency, so speed and responsiveness should be described as operational tradeoffs rather than assumed strengths'
    ],
    whyItMatters:
      'λcerebro matters because it treats AI memory as infrastructure instead of a feature hidden inside one chat product. The stronger portfolio version is not “AI with memory.” It is a concrete explanation of how durable storage, vector retrieval, security boundaries, and MCP access combine to make context portable, user-owned, and reusable across tools.',
    improveNext: [
      'Ship a dedicated λcerebro runtime repo or public demo so the case study can point to inspectable code',
      'Add bulk-import flows for existing notes, conversations, or external systems',
      'Add additional capture sources beyond direct AI-tool usage',
      'Document observability, latency, and error-handling decisions once the runtime is exposed',
      'Introduce a clearer auth / multi-user model if the system expands beyond single-user memory'
    ]
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
      'A Google Apps Script + Google Sheets booking prototype that replaces an ad hoc shower line with same-day slot reservations, phone-number lookup, and a staff dashboard.',
    imageUrl: '/images/terminal_ui.png',
    link: 'https://github.com/stepweaver/food-pantry-shower-scheduler',
    githubRepo: 'stepweaver/food-pantry-shower-scheduler',
    tags: [
      'Google Apps Script',
      'Google Sheets',
      'Vanilla JavaScript',
      'PWA',
      'Operational Workflow',
    ],
    overview:
      'This project is a working prototype for a low-cost shower scheduling workflow built for a food pantry context. Instead of asking guests to wait on-site, the system lets them reserve a same-day slot, leave, and return during a defined check-in window. The repo includes the Apps Script backend, two HTML frontends, setup docs, a user guide, and signage assets.',
    problem:
      'The hard part was not the interface alone. The system had to work within Google Apps Script limits, avoid paid infrastructure, stay usable for stressed guests on phones, prevent double-booking, and give staff an operational view without asking them to manage custom software or databases.',
    role:
      'Solo full-stack developer. I owned the Apps Script backend, Google Sheets schema/config model, public booking flow, staff dashboard, state handling, validation, automated maintenance jobs, and deployment/handoff documentation.',
    solution:
      'I built the app as a Google Apps Script web app backed by a Google Sheet with Slots and Config tabs. The public UI uses phone-number-based lookup rather than accounts, shows only currently available same-day slots, remembers the guest’s number in localStorage, and switches between phone entry, booking, confirmation, status, and closed states inside one page. The backend caches configuration and today’s bookings, lock-protects booking writes, validates inputs server-side, and exposes combined initial-load APIs so the UI can bootstrap with fewer round trips. Staff get a separate dashboard for visibility, check-in, cancellation, open/close control, and a small settings surface.',
    architecture:
      'Architecturally, this is a small, function-oriented system rather than a framework app. Code.gs is organized by domain: configuration/caching, rate limiting, routing, security utilities, time utilities, slot management, status/check-in, admin actions, automated triggers, and API wrappers. The browser/server boundary is explicit: both booking.html and admin.html call Apps Script functions through google.script.run, while Google Sheets acts as both datastore and non-technical configuration layer. The public page behaves like a screen-based state machine; the admin page is a separate operational surface.',
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
      'Combined bootstrap APIs (apiGetInitialData and apiGetAdminInitialData) reduce front-end round trips on initial load',
      'Validation exists on both sides: the UI gates obvious bad input, while the server re-validates phone numbers, times, and admin setting changes',
      'The public UI uses explicit screen transitions and 30-second status refreshes instead of a framework state library',
      'Admin authentication is intentionally lightweight: a shared key from the Config sheet is checked with constant-time comparison, with added delay to reduce brute-force probing',
      'Tradeoff: the admin key is passed in the URL, which keeps deployment simple but is weaker than a real session model',
      'Inference: the LOOKUP_PER_IP constant name no longer matches the current implementation, because lookup limiting appears to be keyed by normalized phone number',
    ],
    outcome: [
      'Produced a working prototype that demonstrates a credible low-cost scheduling workflow without paid hosting, SMS, staff tablets, or a custom database',
      'Turned the project into something another organization could realistically deploy by shipping setup, staff, and user documentation alongside the code',
      'Created a stronger portfolio example than a generic CRUD demo because the build is tied to a real operational constraint set: concurrency, privacy, latency, and handoff',
      'Inference: if rolled out as designed, the flow should reduce waiting-on-site and make shower availability more predictable for both guests and staff',
    ],
    tradeoffs: [
      'The repo explicitly presents this as a concept / working prototype, not a live production deployment with measured usage outcomes',
      'There is no automated test suite; correctness is enforced through code structure, guardrails, and manual flow testing',
      'Admin auth is a shared secret in the URL rather than a proper user/session system',
      'PWA support is best described as installable / offline-friendly rather than fully offline-first',
      'Some repo documentation is stale: it still references check-in codes, extra admin actions, and integration behaviors that do not match the current implementation exactly',
    ],
    whyItMatters:
      'This project matters because it shows practical systems thinking under real constraints. It is not flashy, but it demonstrates that I can map a messy service problem into a maintainable workflow, choose a stack that matches the budget, and add enough reliability, validation, and documentation to make a small tool genuinely usable.',
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

  'orthodontic-tracker': {
    title: 'Orthodontic Turn Tracker',
    description:
      'A mobile-first orthodontic turn and treatment-note tracker built with vanilla JavaScript, a small Node/Vercel API layer, JWT-based household auth, and Supabase persistence.',
    imageUrl: '/images/lambda_preview.png',
    link: null,
    githubRepo: 'https://github.com/stepweaver/spread-turn-tracker',
    tags: [
      'Vanilla JavaScript',
      'Node.js',
      'Supabase',
      'JWT Auth',
      'Mobile-First UX',
    ],
    overview:
      'This project is a focused full-stack utility for tracking orthodontic expander turns, treatment notes, and progress across a shared household workflow.',
    problem:
      'The hard part was turning a repetitive real-world care task into a simple tool that could answer practical questions reliably: whether a turn had already been logged, which arch was adjusted, when the next turn was due, and what changed at the last visit.',
    role:
      'I owned the project end to end: frontend UI, browser-side state management, API design, authentication flow, Supabase integration, schema design, and treatment schedule logic.',
    solution:
      'I built the app as a lightweight client plus a thin backend. The browser handles auth state, data loading, progress rendering, and interaction flows. API handlers handle login, token verification, settings, turns, and treatment notes. Supabase stores normalized settings, turn history, and notes.',
    architecture:
      'This is a compact single-view app rather than a routed SPA. The frontend is delivered through a single HTML shell with one main JavaScript controller, while the backend uses small API handlers and an SPA fallback. Authentication is custom and pragmatic: approved users are defined in environment variables, JWTs are issued by the backend, and the database is accessed server-side with Supabase.',
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
      'This project shows how I approach small real-world software problems: model the data carefully, choose a right-sized architecture, and solve the workflow without adding unnecessary complexity.',
  },
};

export function getProjectBySlug(slug) {
  return PROJECTS_DATA[slug] || null;
}

