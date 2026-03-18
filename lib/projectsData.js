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
    title: 'Lambda Orthodontics Website - Demo',
    description:
      'A demo website for a fictional orthodontic practice. The live site (lambdaortho.vercel.app) combines marketing information with scheduling tools to showcase web-development skills. A banner at the top of each page invites prospective patients and referring dentists to engage. The site is responsive, has a clean, professional aesthetic and uses modern colours and icons. Built with vanilla JavaScript and Express.js, it uses modular components, client-side routing backed by a custom Router class, a small set of JSON demo APIs, and centralised data in siteData.js - all forms are demo-only and log submissions rather than sending emails or storing data.',
    imageUrl: '/images/lambda_ortho.webp',
    link: 'https://lambdaortho.vercel.app/',
    githubRepo: 'stepweaver/myers-vanilla',
    tags: ['Web Development', 'Healthcare', 'Forms'],
    isAgencySubcontract: true,
    overview:
      'Lambda Orthodontics is presented as a demo website for a fictional orthodontic practice. The live site combines marketing information with scheduling tools to show off web-development skills. The navigation bar leads users to pages about the practice, treatments, process, scheduling, reviews, team, careers, contact, a patient portal and referrals. Under the hood, the site is a vanilla JavaScript single-page application (SPA) driven by a custom Router class and a central Layout component. Content (contact information, treatment descriptions, process steps, job listings and more) is centralised in public/siteData.js and exposed via a lightweight Express layer and JSON APIs, so most content changes do not require updates to component logic.',
    problem:
      'A demo website was needed to showcase orthodontic practice marketing and scheduling capabilities. The site had to present a professional, responsive experience with multiple interactive forms-all for demonstration purposes, logging submissions rather than performing backend actions.',
    role:
      'As the frontend developer, I built the responsive website interface, implemented the custom client-side Router, created modular component architecture with vanilla JavaScript, centralised content in siteData.js, wired the forms to Express demo endpoints, and implemented form validation and user feedback across all demo flows.',
    solution:
      'I built a single-page application using vanilla JavaScript and Express.js. On the frontend, ES6 modules follow a component pattern: create… functions return markup and init… functions attach behaviour. A custom Router class handles client-side navigation, dynamic treatment and career detail routes, link interception and scroll restoration, all mounted inside a Layout component. On the backend, a lightweight Express server serves static files from public/ and exposes JSON demo endpoints (GET /api/sitedata plus POST /api/contact, /api/referral and /api/schedule) that log submissions and return success responses without persisting data. All forms - contact, schedule, referral, job applications, patient portal login and newsletter signup - validate input, show loading states, log to the console and display success or error messages while remaining clearly demo-only.',
    outcome: [
      'Professional design: Polished, responsive site with coherent colour palette and modern icons',
      'Comprehensive content: Pages cover practice story, treatments, process, team, testimonials, careers, patient portal, and referrals',
      'User-friendly navigation: Sticky nav bar and client-side routing via a custom Router for seamless page transitions and scroll restoration',
      'Modular architecture: Centralised data and component-based structure (create/init pattern) for maintainability and future extension',
      'Clear demo purpose: All forms explicitly documented as non-functional demo flows with visible disclaimers and JSON-only backend',
    ],
    features: [
      'Responsive design with modern UI/UX and professional aesthetic',
      'Client-side routing: Custom Router class maps paths to page-render functions, handles dynamic routes and restores scroll position between pages',
      'Modular components: ES6 modules emulate a component-based architecture without a framework using paired create/init functions',
      'Centralised data: siteData.js holds contact info, treatments, process steps, job listings and more - content updates rarely require touching component logic',
      'Dynamic treatment pages: /treatments/[slug] routes for detailed treatment info (benefits, pros/cons, process, candidates)',
      'Dynamic job pages: Careers section with detail pages for each position and application forms',
      'Demo forms: Contact, schedule, referral, job applications, patient portal login and newsletter signup-all submit to Express demo endpoints, log submissions and show success/error messages without sending or storing data',
      'Form validation and feedback: HTML validation plus client-side checks, loading states, inline success/error panels and fallbacks that prompt users to call the office',
    ],
    techStack: {
      frontend: [
        'Vanilla JavaScript (ES6 modules) - No React or framework',
        'Custom Router.js - Client-side routing, dynamic detail routes, link interception, history API and scroll restoration',
        'Component pattern - create… functions return HTML; init… functions attach event handlers and wire API calls',
        'CSS with custom properties',
        'Lucide Icons (or similar icon library)',
      ],
      backend: [
        'Node.js',
        'Express.js - Serves static files from public/ and exposes JSON demo endpoints for site data and form submissions (no database or persistence)',
      ],
      deployment: [
        'Vercel (lambdaortho.vercel.app) - Live demo site',
        'Railway or similar - Server listens on port 3000 (configurable via environment variables)',
      ],
    },
    projectStructure: `lambda-orthodontics/ (stepweaver/myers-vanilla)
├── app.js                    # Express server; serves static assets and JSON demo APIs
├── package.json              # Dependencies and scripts (npm run dev, npm start)
├── public/                   # Static files and SPA assets
│   ├── index.html            # Main HTML file
│   ├── main.js               # App entry; mounts Layout and initialises Router
│   ├── Router.js             # Client-side SPA router; maps routes to pages; handles history and scroll restoration
│   ├── siteData.js           # Centralised content (contact, treatments, process, jobs, etc.)
│   ├── styles.css            # Global styles
│   ├── components/           # Modular page/section components (Layout, Navbar, pages, forms, etc.)
│   └── images/               # Image assets
└── .gitignore                # Git ignore rules`,
    demoForms: [
      {
        name: 'Contact Form',
        description: 'General inquiries; demo success/error messages; encourages call if form fails',
      },
      {
        name: 'Schedule Consultation Form',
        description: 'Appointment requests with date picker and time selection; demo only',
      },
      {
        name: 'Referral Form',
        description: 'Professional referral submissions for dentists; collects practice info, patient info, reason for referral, urgency, clinical notes, attachments, scheduling preferences; demo disclaimer at bottom; demo only',
      },
      {
        name: 'Job Application Forms',
        description: 'Careers section-application forms per position; demo only',
      },
      {
        name: 'Patient Portal Login',
        description: 'Simulated sign-in; demo only; highlights portal features',
      },
      {
        name: 'Newsletter Signup',
        description: 'Email subscription; demo only',
      },
    ],
    formFeatures: [
      'Validates user input (HTML required, client-side checks)',
      'Shows loading states during simulated submission',
      'Displays success or error messages',
      'Logs submissions to console-no backend integration',
      'Resets after successful submission',
      'Missing fields prompt users to call the office directly',
    ],
    keyPages: [
      'Home: Hero section "Confident Smiles, Personalised Care", Schedule Consultation and Referring Offices CTAs, treatments summary, about, process, team preview, testimonials, FAQs, newsletter signup; sticky nav highlights active page on scroll',
      'About: Mission, values, history; 2000+ patients treated, 15+ years service; core values (compassionate care, modern techniques, community involvement-sponsoring local schools and events)',
      'Treatments: Cards for Traditional Metal Braces, Clear Ceramic Braces, Invisalign Clear Aligners, Lingual Braces; each lists key benefits and expected duration; Learn More triggers dynamic route (e.g. /treatments/invisalign-clear-aligners)',
      'Treatment detail pages: Key benefits, pros & cons, treatment process (step-by-step), candidates and suitability, call-to-action for consultation',
      'Process: Five stages-Initial Consultation, Treatment Planning, Treatment Start, Active Treatment, Retention; includes 3D digital impressions, custom appliances, retainers',
      'Schedule: Consultation booking form with personal details, date picker, time selection; client-side validation; missing fields prompt users to call office',
      'Reviews: 4.9/5 from 200+ reviews, patient testimonials',
      'Team: Staff profiles (e.g. Dr. Marty McFly, Dr. Elle Woods-orthodontists, assistants, coordinators, hygienists); expertise and friendly demeanour',
      'Careers: Culture, benefits (health insurance, retirement, professional development, work–life balance); open positions (Dental Assistant, Treatment Coordinator, Orthodontic Technician) with detail pages and application forms',
      'Contact: General inquiry form; subject selection (e.g. Schedule Consultation, Questions About Treatment); success/error messages encourage call if form fails',
      'Patient Portal: Simulated login; highlights features (appointment scheduling, treatment progress, payment/billing, secure messaging, educational resources); account creation guidance; demo disclaimer',
      'Referrals: Benefits for dental professionals (expert care, rapid response, detailed reporting); referral process (submit, 24-hour response, ongoing updates); testimonials from referring doctors; extensive referral form with practice info, patient info, clinical notes, attachments, scheduling preferences',
    ],
    treatmentDetailContent: [
      'Key benefits: e.g. Invisalign aligners nearly invisible, removable, easy to clean',
      'Pros & cons: discreet but requires discipline, may cost more, less suitable for complex cases',
      'Treatment process: scanning teeth, custom plan, fabricating aligners, wearing 1–2 weeks per set, monitoring progress',
      'Candidates and suitability: who benefits most, when alternatives may be better',
      'Call-to-action: schedule free consultation or contact office; demo disclaimer',
    ],
    strengths: [
      'Professional design and responsiveness: polished look, coherent colour palette, works well on different screen sizes',
      'Comprehensive content: pages cover practice story, treatment options, process details, team profiles, testimonials, career opportunities, patient portal features and referral information',
      'User-friendly navigation: sticky nav bar and client-side routing make it easy to move between sections without reloading pages',
      'Modular architecture: centralised data and component-based structure facilitate maintainability and reuse',
    ],
    limitations: [
      'Demo-only functionality: all forms (contact, schedule, referral, job application, patient portal, newsletter) are non-functional; clear notices help but README should acknowledge all demo forms',
      'No accessibility statement: site does not mention accessibility considerations such as alt text for images or keyboard navigation',
      'Limited dynamic behaviour: without backend or persistent storage, cannot maintain user sessions (e.g. patient portal login) or store form submissions; adding a simple backend or serverless function could make the demo more realistic',
    ],
    readmeRecommendations: [
      'Additional forms: README lists three demo forms (contact, referral, schedule) but site also has job application forms, patient portal login and newsletter signup-update to mention all',
      'Dynamic pages: mention that treatments and job postings have dynamic detail pages, and explain how client-side routing works',
      'Data structure: describe siteData.js as the central place for content and how adding or modifying data updates the site',
      'Development scripts: specify how to build or deploy for production',
      'Disclaimer: emphasise that all user-input forms-including patient portal and job applications-are for demonstration only',
    ],
    conclusion:
      'Lambda Orthodontics demonstrates how to build a modern, responsive single-page website using vanilla JavaScript. By separating concerns into modular components and centralising data, the project remains maintainable and easy to extend. The site effectively showcases an orthodontic practice\'s services, process, team and engagement opportunities. To make the repository more informative and avoid misunderstanding, the README should be updated to reflect all interactive elements and dynamic pages, provide more detail on the architecture and clearly state that every form (contact, schedule, referral, careers, patient portal, newsletter) is non-functional. Despite being a demo, the project illustrates strong front-end skills and could serve as a foundation for a fully functional web application.',
    testimonial: {
      quote:
        "Stephen has a great tenacity to solve problems in the world of technical development and engineering. We were fortunate enough to work alongside him multiple times, in which he delivered the dependable digital foundations for our Clients. With each project, his work significantly improved and become more operational. For those needing a digital facelift - it's not your job to understand how it's done. Instead, focus on finding someone you trust to help craft your vision inside your digital landscape. Stephen is one of those someones. God Bless.",
      attribution: 'HERO POINT CONSULTING',
      role: 'Agency Partner (Testimonial from Griffin H.)',
    },
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
    'I separated shell concerns from command concerns. `Terminal.jsx` manages shell behavior like lines, input, cursor position, duplicate-command suppression, prompt state, focus management, and scroll behavior, while `components/Terminal/commands/index.js` routes commands into specialized modules for navigation, resume, Codex, weather, AI chat, dice rolling, and games. The terminal also supports stateful modes, so input can be interpreted differently when the user is inside flows like contact, weather selection, resume, Codex, Blackjack, or Zork.\n\nThat architecture let me treat the terminal as another client of shared app logic rather than a one-off component. For example, the `roll` command reuses the same dice engine as the standalone RPG Dice Roller, and the `chat` command connects to the same protected AI backend used in my λlambda chat agent.' ,

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
      'Practical n8n automations that connect the tools your business already uses and remove fragile manual work.',
    imageUrl: '/images/n8n_automations.png',
    link: null,
    tags: ['Automation', 'n8n', 'Workflow Integration'],
    isService: true,
    serviceIntro:
      'These capabilities are available for hire. I build practical n8n automations that connect the tools your business already uses and remove fragile manual work. This is a good fit for teams that are tired of copying information between systems, chasing updates across email and spreadsheets, or relying on someone to remember the next step. I design workflows that move data where it needs to go, apply business logic, handle failures cleanly, and stay understandable after handoff.',
    problem:
      'Many businesses have the same problem in different forms: the work technically functions, but only because someone is manually holding it together. That usually looks like form submissions living in inboxes, leads getting entered twice, reports being assembled by hand, disconnected tools creating inconsistent data, or automations that break silently because nobody really owns them.',
    role:
      'I design and build custom n8n workflows around your actual process, not just the apps involved. I map the business flow, decide where automation should step in, then implement, test, and document the workflow so it is reliable and understandable after handoff.',
    solution:
      'I build n8n workflows that move data where it needs to go, apply your business rules, and handle errors and edge cases instead of ignoring them. That can include lead capture, CRM updates, internal alerts, follow-up sequences, scheduled reporting, status changes, approval flows, webhook-based integrations, and multi-step processes that need transformation, routing, and monitoring in the middle.',
    outcome: [
      'Less manual copy-and-paste work across tools',
      'Fewer preventable errors in data entry and handoffs',
      'Faster movement of work between systems and people',
      'More consistent data and status across your key tools',
      'Better visibility into how work actually flows through the business',
    ],
    features: [
      'Workflow mapping and automation planning around your real process',
      'Custom n8n workflow builds for multi-step, branching processes',
      'API and webhook integrations between the tools you already use',
      'Data transformation and validation between systems',
      'Error handling, retries, and fallback logic for reliability',
      'Monitoring and alert setup so failures are visible instead of silent',
      'Documentation and handoff training so your team is not left with a black box',
      'Ongoing support when you need changes or new branches of a workflow',
    ],
    benefits: [
      'Reduce repetitive manual work and copy-paste across tools',
      'Cut down on preventable errors and missed follow-ups',
      'Speed up handoffs between systems and people',
      'Improve consistency across your CRM, inbox, spreadsheets, and other tools',
      'Increase visibility into where work is and what happens next',
    ],
    exampleUseCases: [
      'A website form that creates a lead record, alerts the team, and starts a follow-up sequence automatically',
      'Customer or order data kept in sync between platforms without manual re-entry',
      'Reports that pull from multiple sources on a schedule and deliver clean summaries automatically',
      'Internal request workflows that route to the right person and track status changes',
      'Notification pipelines that alert the team when important events happen in real time',
    ],
    commonUseCases: [
      'Intake forms that no longer live only in inboxes, but update systems and trigger next steps',
      'Internal queues where status changes propagate cleanly across tools',
      'Reporting workflows that move from ad-hoc spreadsheet wrangling to scheduled, reliable summaries',
      'Cross-tool synchronizations that keep customer or project records aligned without double entry',
    ],
    techStack: {
      automation: [
        'n8n - Open-source workflow automation platform',
        'API integrations with popular business tools',
        'Webhooks and custom triggers',
        'Data transformation and validation',
      ],
    },
  },
  'ai-integrations': {
    title: 'AI Integrations',
    description:
      'Practical AI integrations for websites, internal tools, reporting, and workflows - grounded in your business, not generic internet mush.',
    imageUrl: '/images/ai_integrations.png',
    link: null,
    tags: ['AI Integration', 'Machine Learning', 'Productivity'],
    isService: true,
    serviceIntro:
      'These capabilities are available for hire. I built the λlambda LLM agent on this site: a shared multi-surface AI system with persistent memory, server-only prompts, and channel-aware behavior. I am also building λcerebro, a Postgres-backed memory layer for capturing thoughts through Slack and retrieving them through MCP. The idea is simple: your second brain, owned by you. That same approach can be applied to business systems.',
    problem:
      'Most businesses do not need “AI strategy.” They need a working system. The real problems are messy workflows, repetitive manual work, knowledge trapped in documents or inboxes, and forms or inbound messages that go nowhere useful.',
    role:
      'I help design and build AI-assisted systems that fit the way your business already works. That includes figuring out where AI belongs (and where it does not), shaping prompts and context, wiring tools together, and giving teams an interface that feels usable instead of experimental.',
    solution:
      'I connect AI to real workflows - websites, internal tools, reporting stacks, forms, content pipelines, and support processes - so it can actually do useful work in context. The goal is not to bolt on a chatbot for the sake of it. The goal is to reduce friction, save time, and make existing systems more useful.',
    outcome: [
      'Reduced repetitive manual work across writing, tagging, summarizing, and classification tasks',
      'Faster triage and response workflows for support, intake, and internal requests',
      'Internal knowledge that is easier to access and reuse instead of living only in documents or chat threads',
      'More consistent writing and communication across teams and customer touchpoints',
      'Systems that feel clearer and easier to use because AI is integrated where it actually helps',
    ],
    features: [
      'AI integrations inside websites and web apps',
      'Internal assistants connected to your documents, workflows, and business context',
      'Prompt and context design for more reliable, grounded outputs',
      'Knowledge retrieval systems for internal use (FAQs, SOPs, process documentation)',
      'Workflow automation with AI in the loop for routing, summarization, and decision support',
      'Lightweight agent-style tools that can classify, route, summarize, or assist with responses',
      'Custom interfaces for teams who need something more useful than a generic chat window',
    ],
    benefits: [
      'Introduce AI where it clearly reduces friction instead of adding confusion',
      'Speed up triage, routing, and response across support, intake, and reporting workflows',
      'Make internal knowledge and prior work easier to find and reuse',
      'Improve consistency and quality in outward-facing communication and internal documents',
      'Build AI capabilities you actually control instead of renting a generic black-box tool',
    ],
    exampleUseCases: [
      'A website assistant grounded in your business, not generic internet mush',
      'A support workflow that summarizes, classifies, and drafts responses before a human edits and sends',
      'A content system that turns rough inputs into usable drafts for marketing, documentation, or reports',
      'A reporting helper that explains trends or organizes incoming data for easier review',
      'A memory-backed assistant that keeps continuity across interactions for specific teams or processes',
    ],
    useCases: [
      'Intake forms that route, summarize, and prepare next actions automatically',
      'Support queues where AI drafts responses, classifies tickets, and surfaces relevant internal docs',
      'Internal knowledge assistants for FAQs, SOPs, and process documentation',
      'Content workflows that turn rough, messy inputs into structured, on-voice drafts',
      'Reporting helpers that narrate trends or organize incoming data for decision-makers',
      'Agent-style tools that tag, classify, and route records or messages inside existing systems',
    ],
    techStack: {
      ai: [
        'OpenAI API - generation, summarization, extraction, and assistant behavior',
        'Google AI - used where it fits the stack and use case',
        'Postgres - structured memory, retrieval, and application data',
        'Next.js - custom frontends and integrated web experiences',
        'MCP and tool-based patterns - retrieval and action layers instead of hard-coded prompts',
        'Automation platforms and APIs - wiring AI into forms, CRMs, inboxes, reporting, and internal tools',
      ],
    },
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
      'A Postgres-backed memory layer for thoughts: capture via Slack, retrieve via MCP. Your second brain, owned by you.',
    imageUrl: '/images/cerebro.png',
    link: null,
    tags: ['AI', 'Postgres', 'MCP', 'Memory Layer', 'Build in progress'],
    isService: false,
    comingSoon: true,
    overview:
      'The truly smart part of an AI workflow is not just the model, but the memory layer behind it. Memory should live outside the model, outside the chat window, and outside any single app. λcerebro is a living journal-a second brain-built as infrastructure: Postgres-backed, exposed through MCP, with a private interface for managing the context my AI tools can use.',
    serviceIntro:
      'λcerebro is a Postgres-backed memory layer for thoughts. Capture via Slack, retrieve via MCP. Your second brain, owned by you.',
    problem:
      'Chat tools and note apps lock you into silos. Your context lives in ChatGPT, not Claude. You copy-paste between apps. λcerebro puts memory in a Postgres database you own, exposed via MCP so any AI can search it.',
    role:
      'Solo developer: architecture, Postgres schema, Supabase Edge Functions, Slack capture app, and MCP server for retrieval.',
    solution:
      'Two-part architecture: Capture (Slack → Edge Function → embedding + metadata → Postgres with pgvector) and Retrieval (MCP server exposing semantic search, recent entries, pattern analysis to any AI client).',
    outcome: [
      'Phase 1 complete: database live, pipeline wired, first thought captured. Capture works.',
      'Next: MCP retrieval.',
    ],
    features: [
      'Thought ingest via Slack',
      'Embedding + metadata extraction',
      'Postgres + pgvector',
      'MCP server for semantic search and retrieval',
    ],
    benefits: [
      'Own your memory',
      'Switch models without losing context',
      'Decentralized, portable, durable',
    ],
    plannedFeatures: [
      'MCP retrieval server',
      'Weekly Review prompt: clusters by topic, scans for unresolved action items, detects patterns across days, finds connections you missed, identifies gaps in what you\'re tracking',
    ],
    techStack: {
      backend: ['Supabase', 'Postgres', 'pgvector', 'Edge Functions'],
      ai: ['OpenRouter - embeddings and metadata extraction', 'MCP - retrieval protocol', 'Slack - capture interface'],
    },
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
    title: 'Mishawaka Shower Booking System',
    description:
      'A zero-cost, zero-infrastructure self-service shower booking system built entirely with Google Apps Script and Google Sheets. It tackles the “people waiting around all day” problem by letting guests book specific time slots from their phones, leave, and return within a short check-in window instead of waiting on-site.',
    imageUrl: '/images/terminal_ui.png',
    link: null,
    githubRepo: 'stepweaver/food-pantry-shower-scheduler',
    tags: ['Google Apps Script', 'PWA', 'Community Service', 'Zero Infrastructure'],
    problem:
      'The Mishawaka Food Pantry had to discontinue shower services because people were waiting around all day hoping to get a shower. Large groups congregated outside, staff were strained trying to manage an informal first-come-first-served line, and guests were wasting entire days for a service that might not be available.',
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

  'λlambda-llm-agent': {
    title: 'λlambda LLM Agent',
    description:
      "A portfolio-native LLM agent designed and built for λstepweaver. λlambda acts as Stephen Weaver's AI advocate and thinking partner, helping visitors understand his background, skills, projects, and working style through a shared chat system available in both the website UI and the terminal interface.",
    imageUrl: '/images/chatbot.png',
    showComponentAsHero: true,
    link: '/terminal',
    tags: ['AI', 'LLM', 'Next.js', 'Portfolio', 'Terminal UX', 'Prompt Engineering', 'Groq', 'OpenAI'],

    overview:
      "λlambda is productized portfolio infrastructure-not a generic chatbot bolted onto a static site. The core differentiators are the shared multi-surface architecture (website widget, page chat, and terminal all use the same backend), server-only prompt discipline (clients cannot supply or override system instructions), and channel-aware behavior: terminal and widget return intentionally different response styles-plain-text vs markdown, punchy vs richer-while routing through a single protected `/api/chat` route. That architecture makes the system feel built, not pasted in. Visitors get an AI advocate that translates vague intent into clear guidance about Stephen's work, skills, and fit.",

    problem:
      "Traditional portfolio sites make visitors do too much interpretation. A recruiter, client, or collaborator has to infer capability from scattered pages, infer fit from project thumbnails, and infer personality from copy. Stephen needed a better interface: one that could answer practical questions about his work, route people to the right proof, and do it without turning the site into a gimmick or a generic chatbot wrapper.",
    context:
      "Built for portfolio discovery: recruiters, clients, and collaborators who want fast, accurate answers about Stephen's work, fit, and proof-without having to guess from a résumé grid.",

    role:
      "Solo full-stack developer and product designer. I designed the agent concept, wrote the server-only prompt architecture, implemented the shared chat state and terminal integrations, built the API route and security controls, configured provider fallback behavior, and shaped the UX so the system felt native to the λstepweaver brand rather than bolted on.",

    solution:
      "I built λlambda as a shared, multi-surface AI system inside a Next.js 15 application. On the front end, the site uses a common chat hook for the widget and page chat, plus a terminal-specific command path for `chat <message>`. On the back end, all AI traffic flows through a single protected `/api/chat` route, which sanitizes inputs, rate-limits requests, enforces same-origin checks, applies bot protection, selects channel-specific prompt behavior, and calls Groq first with OpenAI as a fallback. The prompt itself is kept server-only and intentionally positions λlambda as an advocate, explainer, and routing layer for Stephen's public work. One important technical distinction: the terminal shell is largely client-side-it presents as a browser-based, local experience-but the AI itself is not. The `chat` command explicitly posts to `/api/chat`; there is no client-side model or local inference. That separation keeps the case study technically honest and makes clear that the terminal is a first-class surface into the same server-side agent.",
    improveNext: [
      'Add a source-grounded knowledge layer (Codex/projects as citations) so answers can point at concrete proof instead of relying on prompt-only recall.',
      'Instrument high-intent questions (without creepy tracking) so the site can evolve around what visitors actually ask.',
      'Refine “handoff” paths: when intent is clear, route cleanly to contact with context included (and explicit consent).',
    ],

    outcome: [
      'Productized portfolio infrastructure: shared multi-surface architecture, server-only prompt discipline, and channel-aware behavior through one protected route-built, not pasted in',
      'Unified website chat and terminal chat behind one shared server route and prompt system; terminal and widget intentionally differ in output style while sharing the same backend',
      'Created a clearer discovery path for visitors who want fast answers about skills, projects, and fit',
      'Preserved brand voice through a custom system prompt tuned for clarity, restraint, and systems thinking',
      'Added operational safeguards: same-origin checks, rate limiting, bot detection, sanitization, timeout handling, and prompt-leak redaction',
      'Extended the system to support image attachments in the website chat flow for vision-capable prompts',
    ],

    features: [
      'Shared AI architecture across multiple surfaces: website widget, page chat, and terminal command interface',
      'Channel-aware behavior: terminal mode returns plain-text, punchier responses; website chat supports markdown links and slightly richer formatting',
      'Server-only system prompt with persona, public knowledge constraints, routing rules, and safety guardrails',
      'Terminal integration through `chat <message>` with inline terminal-style response rendering',
      'Shared chat state hook for input, transcript, loading, errors, and attachments',
      'Image attachment support in website chat, with message normalization for multimodal requests',
      'Provider strategy that prefers Groq for speed/cost and falls back to OpenAI when needed',
      'Prompt injection filtering, prompt-leak redaction, request timeouts, and no-store response handling',
      'Natural chat scrolling behavior with sticky-bottom logic and mobile visual viewport handling',
      'Bot protection using honeypot fields and timing heuristics',
    ],

    techStack: {
      frontend: [
        'Next.js 15 - App Router application framework',
        'React 19 - interactive chat and terminal UI',
        'Tailwind CSS 4 - styling and responsive layout',
        'Lucide React - iconography across chat and terminal surfaces',
      ],
      ai: [
        'Groq Chat Completions API - primary provider',
        'OpenAI Responses API - fallback provider',
        'Custom server-side prompt composition - channel-specific behavior for terminal vs widget chat',
      ],
      backend: [
        'Next.js Route Handlers - `/api/chat` endpoint',
        'Custom sanitization utilities - plain text and HTML safety',
        'Custom route protection middleware - bot filtering and request preprocessing',
        'Rate limiting with Vercel KV adapter support and in-memory fallback',
      ],
      ux: [
        'Shared `useChat` hook - message state, loading, attachments, submission flow',
        'Shared `useAutoScroll` hook - sticky-bottom chat behavior',
        'Terminal command interpreter - command-based access to the same AI system',
      ],
    },

    projectStructure: `stepweaver_v3/
├── app/
│   ├── terminal/
│   │   └── page.jsx                 # Terminal page with LLM module surfaced in UI
│   ├── api/
│   │   └── chat/
│   │       └── route.js             # Unified AI API route
│   └── projects/
│       └── [slug]/
│           └── page.jsx             # Existing project detail renderer
├── components/
│   ├── Terminal/
│   │   ├── Terminal.jsx             # Terminal shell and command execution
│   │   ├── commands/
│   │   │   └── index.js             # chat <message> command registration
│   │   └── data/
│   │       └── ai.js                # Terminal-to-chat bridge
│   ├── ChatWidget/
│   │   └── ChatWidget.jsx           # Floating/fullscreen website chat
│   ├── ChatBot/
│   │   └── ChatBot.jsx              # Dedicated page chat surface
│   └── Chat/
│       └── ChatMessage.jsx          # Shared message renderer
├── hooks/
│   ├── useChat.js                   # Shared chat logic
│   ├── useAutoScroll.js             # Natural transcript scrolling
│   └── useBotProtection.js          # Client-side bot metadata
├── lib/
│   ├── chat/
│   │   └── systemPrompt.js          # Server-only λlambda prompt + channel modes
│   ├── apiSecurity.js               # Shared protected-route helper
│   └── rateLimitStore.js            # KV adapter support
└── utils/
    ├── sanitize.js                  # Text/HTML sanitization
    ├── rateLimit.js                 # Rate limiting
    └── botProtection.js             # Honeypot/timing heuristics`,

    apiRoutes: [
      '/api/chat - accepts normalized conversation payloads from widget and terminal surfaces',
      '/api/chat OPTIONS - returns preflight headers with same-origin enforcement',
      'Provider calls: Groq chat completions first, OpenAI Responses API as fallback',
    ],

    performance: [
      'Shared route design avoids duplicating chat logic across multiple interfaces',
      'Groq-first provider strategy favors lower-latency, lower-cost responses',
      'Request timeout handling prevents hung upstream AI calls from stalling the route',
      'Chat responses are marked `Cache-Control: no-store` to avoid stale or sensitive caching',
      'DOMPurify/JSDOM are lazy-loaded for HTML sanitization utilities to reduce cold-start cost on text-only routes',
      'The site applies explicit cache headers and a Content Security Policy in Next.js config',
    ],

    security: [
      'Server-only system prompt; clients cannot supply or override system instructions',
      'Same-origin guard validates request origin/host pairing',
      'Rate limiting keyed by client IP and user agent',
      'Prompt injection filtering removes suspicious assistant content from replayed messages',
      'Prompt-leak redaction blocks responses that appear to expose internal instructions',
      'Input sanitization trims and cleans user content before model submission',
      'Bot protection uses a honeypot field and timing heuristics',
      'Timeout handling and controlled error responses reduce operational risk',
      'Optional Vercel KV-backed rate-limit storage for production durability',
    ],

    designSystem: {
      typography: [
        'Terminal-inspired copy framing, concise system labels, and operator-style status text',
        'Brand voice emphasizes calm, precise, systems-oriented communication',
      ],
      colors: [
        'The AI experience inherits the CRT/cyber-terminal palette already established across λstepweaver',
        'Chat and terminal surfaces are visually aligned with the broader portfolio aesthetic',
      ],
      symbols: [
        'λlambda identity is anchored to the lambda symbol and positioned as a functional system, not a mascot',
        'The terminal surface reinforces the "operator / module / command" mental model',
      ],
    },

    terminalIntegration: {
      description:
        "λlambda is not limited to a floating widget. It is exposed directly inside the site's terminal experience as a first-class command, reinforcing the idea that the agent is part of the product architecture rather than an afterthought. The terminal shell itself is largely client-side-it renders in the browser and feels local-but the AI is fully server-side. When you run `chat <message>`, the command explicitly POSTs to `/api/chat`; there is no client-side model or local inference. That separation is intentional: the terminal is a first-class surface into the same protected backend, not a separate or simulated experience.",
      usage: [
        "Type `chat <message>` in the terminal to ask λlambda about Stephen's background, projects, or skills",
        'Terminal mode returns plain-text answers tuned for short, command-line-friendly output',
        'The same backend route powers both terminal and website chat, but the prompt changes by channel',
        'Client-side shell, server-side AI: the terminal UI is browser-based; the chat command posts to /api/chat',
      ],
      example: 'chat What kind of systems do you build?',
    },

    userExperienceFindings: {
      strengths: [
        'The agent reduces decision friction for recruiters, clients, and collaborators',
        "The terminal and widget feel native to the site's brand instead of duplicating generic SaaS chat patterns",
        'The shared chat architecture keeps behavior more consistent across surfaces',
        'Sticky-bottom transcript behavior and visual viewport handling address common mobile chat UX issues',
      ],
      areasForImprovement: [
        'The chat experience would benefit from analytics tied to real visitor intent and conversion outcomes',
        'A retrieval layer or structured knowledge source could make responses more maintainable as the site grows',
        'Conversation memory is intentionally constrained to public prompt context; richer source-grounded answers would require a formal content indexing layer',
      ],
    },

    plannedFeatures: [
      'Connect λlambda to a structured project/content knowledge layer instead of prompt-only public context',
      'Add conversation analytics around common questions, exit points, and conversion paths',
      'Expand multimodal support and source-grounded responses where appropriate',
      'Route high-intent conversations more directly into contact and lead-capture workflows',
    ],

    conclusion:
      "λlambda turns a personal portfolio into an interactive discovery system. Instead of asking visitors to decode a résumé, skim a project archive, and guess fit on their own, the site gives them a focused AI interface that can explain Stephen's work, route them to the right proof, and stay aligned with the λstepweaver voice. Technically, the project succeeds because it treats the agent as productized infrastructure: shared multi-surface architecture, server-only prompt discipline, and channel-specific behavior through one protected route. The terminal shell is client-side; the AI is not-the chat command explicitly posts to /api/chat. That distinction keeps the implementation honest and makes clear that this is built, not pasted in.",
  },

  'silent-auction': {
  title: 'Silent Auction Platform',
  description:
    'A full-stack silent auction platform built with Next.js, Supabase, and Resend for real event operations: bidder onboarding, alias-based bidding, live auction updates, donation pledges, donor workflows, and closeout administration.',
  imageUrl: '/images/silent-auction.webp',
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
    title: 'Bill Planner',
    description:
      'Bill and income planning app that helps you map expenses onto income periods and see cashflow before the month starts.',
    imageUrl: '/images/terminal_ui.png',
    link: null,
    githubRepo: 'stepweaver/weaver-bill-planner',
    tags: ['Budgeting', 'Planning', 'Neon', 'Drizzle'],
    overview:
      "Bill Planner is a small, opinionated budgeting tool built to solve a specific pain I kept running into: I could see my list of bills and I could see my bank balance, but I could not see, in one place, how each deposit was actually going to cover specific bills over the month. General-purpose budgeting apps tend to focus on categories and envelopes; banks focus on cleared transactions. I needed a concrete scheduler - a way to plan the month by mapping bills directly onto income events and then keep that plan honest as payments move from \"scheduled\" to \"pending\" to \"paid.\" Bill Planner gives me that surface: a month view broken into income periods, color-coded across the calendar and bill lists, with a simple status pipeline and HUD so I can see what is due, what is in-flight, and what has cleared before I commit to new spending.",
    problem:
      "Planning around the timing of income and bills is harder than it looks on paper. Bills land on different days, income deposits can move around by holidays, and some expenses drift between months. Traditional budgeting tools help you think in categories, but they rarely help you answer the concrete questions that matter week to week: \"Will this income period actually cover the mortgage, utilities, and car payment?\", \"If I move this bill forward, what does it do to the next income period?\", \"What is still only scheduled versus actually pending at the bank?\". In practice, that meant juggling a calendar, a spreadsheet, my bank app, and mental math. Without a purpose-built view, it was easy to double-commit the same income, lose track of which bills were merely scheduled versus truly paid, and end up surprised by cash timing even if the yearly budget was fine.",
    role:
      'I acted as solo product designer and full-stack engineer. I defined the domain model around months, income events, bills, templates, and a single household ledger; designed the paycheck-window UX and status pipeline so the app mirrors how cash actually moves; implemented the Next.js 16 App Router application, server actions, and dashboard components; set up Neon Postgres with Drizzle ORM for schema and migrations; wired Auth.js with a credentials-based login, basic rate limiting, and environment-driven credentials; and documented the setup and deployment path so the app can run on Vercel backed by Neon with a straightforward local development story.',
    solution:
      'Bill Planner organizes everything around a single open month and its income periods. When you sign in, you either land on the open month or create one from the months list. For that month, you add income events with dates and amounts; the app turns those into income windows and uses them to group bills. As you add bills - with due dates, planned amounts, links, and notes - they are automatically slotted into the appropriate window based on timing. From there, you review each window, confirm which bills that income will cover, and manually reassign anything that should move. As you schedule and pay bills in your bank, you move them through a simple status pipeline (`scheduled` → `pending` → `paid`) so the month view always reflects reality. A HUD at the top of the month shows expected vs actual income, planned vs paid expenses, remaining totals per income window, leftover cash, and counts of overdue or unassigned bills. When the month is done, you close it and seed the next month from templates so you start from a realistic baseline instead of a blank page.',
    features: [
      'Months – Open, close, and review months, with a single \"Household\" ledger and the ability to seed a new month from a previous one instead of rebuilding from scratch.',
      'Income – Add income events per month that define income windows; these windows drive both the calendar coloring and how bills are grouped for review.',
      'Bills – Track bills with due dates, amounts, payment links, and notes; bills are automatically grouped into income windows with the option to manually reassign them when your plan changes.',
      'Statuses – Move bills through a clear lifecycle of scheduled → pending → paid so the UI stays aligned with what is actually happening at your bank instead of just what you intended to pay.',
      'HUD – A heads-up display for each month that shows expected vs actual income, planned vs paid expenses, remaining to-allocate amounts per income window, leftover cash, and counts of overdue or unassigned bills.',
      'Templates – Define recurring bill templates (including multi-weekday-in-month patterns) that act as defaults when you create a new month, so setup becomes a quick review pass instead of re-entering everything.',
      'Settings & Legend – An informational settings view that exposes the default ledger, explains the paycheck-window color coding, and documents how to change login credentials via environment variables.',
    ],
    techStack: {
      frontend: [
        'Next.js 16 – App Router application shell and page routing for months, income, bills, templates, and settings.',
        'React and TypeScript – Strongly-typed components for the month view, paycheck windows, bill forms, and dashboard HUD.',
        'Tailwind CSS and shadcn/ui – Utility-first styling and accessible components for tables, forms, and HUD panels.',
        'date-fns – Date utilities for building paycheck windows, labeling months, and handling due dates.',
      ],
      backend: [
        'Neon – Postgres database for bills, income, and schedules',
        'Drizzle ORM – type-safe schema and queries',
        'Drizzle migrations and seed scripts – Schema management and seeding of the default \"Household\" ledger.',
        'Auth.js (credentials) – Session management backed by a credentials provider and server-side session checks.',
        'Zod and React Hook Form – Validation and form handling for auth and bill/income inputs.',
      ],
      deployment: [
        'Vercel – Hosting for the Next.js app with environment-based configuration for local, preview, and production.',
        'Neon Postgres – Managed database for months, income events, bills, and templates.',
        '.env.local and project env – DATABASE_URL, AUTH_SECRET, and AUTHORIZED_USERS configured per environment without exposing secrets to the client.',
      ],
    },
    outcome: [
      'Turned vague paycheck-to-paycheck planning into a concrete, visual workflow where each bill is explicitly assigned to a paycheck window and tracked from intention to cleared payment.',
      'Reduced month-start friction by letting me roll forward a realistic baseline from templates and then make small adjustments, instead of rebuilding a bill plan from scratch every few weeks.',
      'Made it much harder to accidentally double-commit the same paycheck by exposing leftover cash, unassigned bills, and overdue items directly in the HUD.',
      'Created a reusable reference implementation for a focused, single-ledger budgeting tool that can evolve into multi-ledger or multi-household support without rewriting the core model.',
    ],
    screenshots: [
      'Month view showing paycheck-window color bands, grouped bills, and the HUD with income vs expenses and leftover cash.',
      'Bill list and detail view highlighting due dates, planned amounts, payment links, notes, and the scheduled → pending → paid status pipeline.',
      'Templates screen demonstrating how recurring bills are configured, including multi-weekday-in-month patterns that seed new months.',
      'Settings view with the paycheck-window color legend and ledger information for the default Household.',
    ],
    challenges: [
      'Modeling paycheck windows in a way that stays intuitive when income dates move or multiple checks land close together, while still giving the user manual control over which check covers which bill.',
      'Designing a bill status pipeline that matches the real-world lifecycle of payments - especially the distinction between \"scheduled\" and \"pending\" -without adding so much complexity that the tool feels heavyweight.',
      'Building a templates system flexible enough to handle monthly, specific-date, and multi-weekday-in-month patterns without introducing a separate rule engine that would be hard to maintain.',
      'Staying intentionally scoped to a single default Household ledger and environment-driven credentials for the MVP, while leaving room in the schema and code paths for future multi-ledger or richer auth without painting the project into a corner.',
    ],
  },

  'orthodontic-tracker': {
    title: 'Orthodontic / Expansion Tracker',
    description:
      'Family health tool for tracking orthodontic expander turns, visit notes, and treatment progress with a shared, phone-friendly tracker.',
    imageUrl: '/images/terminal_ui.png',
    link: null,
    githubRepo: 'stepweaver/spread-turn-tracker',
    tags: ['Health', 'Family Tools'],
    overview:
      'The Orthodontic / Expansion Tracker is a small, focused web app I built to keep our family’s orthodontic appliance turns and visits from falling through the cracks. Instead of relying on memory, sticky notes, or scattered text messages, it gives us a single shared place to log turns, record visit notes, and see at a glance where we are in the treatment plan.',
    problem:
      'Orthodontic expansion is repetitive and time-bound: turn the appliance a specific number of times, on a specific cadence, for weeks or months. In practice, that meant trying to remember “Did we turn it this morning?”, re-reading paper instructions, and digging through texts after each appointment. There was no shared record for caregivers, no clear sense of how many turns remained, and no easy way to look back at what the orthodontist said three visits ago.',
    role:
      'I designed and built the tracker end-to-end: modeling the Supabase tables for users, settings, turns, and treatment notes; wiring a small set of Node/Vercel API routes for auth and CRUD; and creating a mobile-first front-end that feels at home on a phone home screen. I also tuned the flows so that real daily usage - logging turns, skimming history, and capturing visit notes - stays fast and low-friction for non-technical family members.',
    solution:
      'The app centers on a shared, household-style tracker backed by Supabase. Approved users log in with credentials defined in environment variables, and all of them see and update the same underlying data. A configurable schedule (either every-N-days or twice-per-week) drives when turns are due, with separate counts for the top and bottom appliance. Each logged turn updates history, remaining counts, and the next-due time automatically, while a simple treatment-notes view keeps appointment notes and reminders in one place instead of scattered across paper and messaging apps.',
    features: [
      'Top and bottom turn tracking so upper and lower appliances can be logged independently without losing the overall picture.',
      'Flexible schedule options that support an every-N-days cadence or a twice-per-week pattern, driven by settings stored in Supabase.',
      'Clear progress visibility with current counts, remaining turns, and a simple status view that makes it obvious what is due next.',
      'Turn history with optional notes so we can look back at what happened on specific days or during tricky stretches of treatment.',
      'Treatment notes for appointments, adjustments, and reminders so instructions live alongside the actual turn log.',
      'Shared access for multiple approved logins, all working against the same underlying family tracker.',
      'Persistent, cloud-backed storage in Supabase instead of fragile, browser-only local storage.',
      'Mobile-first interface tuned for phones and easy “add to home screen” usage.',
    ],
    techStack: {
      frontend: [
        'HTML, CSS, and vanilla JavaScript for a lightweight, fast-loading UI that works well on mobile.',
        'Mobile-first layout and styling so the primary experience feels like a simple app, not a shrunken desktop site.',
      ],
      backend: [
        'Node.js APIs deployed as Vercel serverless functions for login, token verification, settings, turns, and treatment notes.',
        '@supabase/supabase-js client for talking to the Postgres database.',
        'JWT-based authentication with environment-configured users so only approved logins can access the tracker.',
        'bcryptjs-backed password handling to support hashed credentials in configuration instead of plain-text secrets.',
      ],
      deployment: [
        'Vercel for hosting the front-end and serverless API routes.',
        'Supabase Postgres for persistent storage of users, settings, turns, and treatment notes.',
        'Simple local dev loop with npm scripts and a small Node server for running the app at http://127.0.0.1:3000.',
      ],
    },
    outcome: [
      'Turned an anxiety-prone, memory-based orthodontic routine into a clear, shared checklist with an obvious “what is due today” view.',
      'Reduced the odds of missed or double turns by making it trivial to log activity immediately on a phone and see the most recent history.',
      'Made it much easier to walk into visits with context - recent turns, notes, and a sense of overall progress - rather than trying to reconstruct events from memory.',
      'Created a reusable, database-backed pattern for small family tools that need shared access, simple auth, and structured history over time.',
    ],
    screenshots: [
      'Daily turns view showing remaining top and bottom turns, current status, and next-due timing.',
      'Turn history list with recent days, arches, and optional notes visible at a glance.',
      'Settings view where total planned turns, schedule type, interval, and child name are configured.',
      'Treatment notes view summarizing appointment notes and reminders in one place.',
    ],
    challenges: [
      'Designing a schedule model that handles both every-N-days and twice-per-week patterns without turning the settings UI into something clinical or intimidating.',
      'Keeping the interface simple enough for quick, real-world use while still surfacing enough context (history, remaining turns, notes) to be genuinely helpful.',
      'Balancing security and convenience by using environment-configured users and JWTs instead of full-blown account management, while still enforcing that only approved logins can see family treatment data.',
    ],
    plannedFeatures: [
      'Richer timeline and calendar-style views for turns and visits over the full span of treatment.',
      'Exportable treatment history (for example, CSV or PDF) to share with providers or keep for long-term records.',
      'Lightweight reminders or notifications around due turns and upcoming visits, tuned for real-world family schedules.',
      'More granular roles or access modes instead of a single shared household-style login.',
    ],
  },

  // λlambda Heating & Air – generalized local service SEO demo
  'service-business-demo': {
    title: 'λlambda Heating & Air',
    description:
      'Local service SEO demo for a heating and air business, built around centralized content, generated location/service landing pages, and lightweight Express-based lead-capture flows.',
    imageUrl: '/images/lambda_heating_air.webp',
    link: 'https://lambda-heating-air.vercel.app/',
    githubRepo: 'stepweaver/heartland-heating-air',
    tags: ['Web Development', 'SEO', 'Agency Demo', 'Vanilla JS'],
    isAgencySubcontract: true,
    overview:
      'λlambda Heating & Air is a reusable local-service SEO demo adapted from a real client implementation. Instead of hand-authoring dozens of “service in city” pages, the site models locations, services, and business details as structured data and uses a Node script to generate SEO landing pages and a sitemap. On top of that content layer, it adds a simple, fast frontend, Express-based form handling, and email notifications so the system feels like a working lead-generation website -not just a static design.',
    problem:
      'Local service businesses often need to rank for long-tail searches that combine a service and a place, like “furnace repair in Mishawaka” or “duct cleaning near South Bend.” Building and maintaining those pages manually is repetitive, error-prone, and easy to let drift out of sync as offerings, hours, or service areas change. For agency work, the challenge is even sharper: you want a template that can be re-skinned for new clients without rebuilding the entire SEO footprint from scratch each time.',
    role:
      'I acted as the primary developer and system designer for this implementation and its generalized demo. That included defining the content model for locations, services, and businessInfo; building the Node-based generator that turns that data into HTML SEO pages and a sitemap; wiring the Express server for contact, quote, and careers forms; and integrating Nodemailer and Google reCAPTCHA so the flows behave like a real lead-generation stack while staying portfolio-safe.',
    solution:
      'The core of λlambda Heating & Air is a static-friendly architecture powered by centralized content and a generation script. The data layer defines a shared set of locations, service offerings, and business details in plain JavaScript/JSON modules. A Node script consumes that data to generate HTML pages for each location/service combination, compose SEO-friendly titles and meta descriptions, and write a sitemap that reflects the current service-area footprint. On the frontend, vanilla JavaScript, HTML, and CSS drive a set of reusable components for navigation, hero sections, service highlights, and location content. On the backend, an Express server serves the built pages, handles POST requests from contact, quote, and job-application forms, verifies Google reCAPTCHA tokens, and uses Nodemailer to send notification/confirmation emails. The result is a small, understandable stack where adding a city, adjusting a service, or changing business info flows through the generator instead of requiring manual edits across dozens of pages.',
    features: [
      'Dynamic SEO pages: Generated landing pages for each service/location combination (e.g., “AC repair in [city]”) using a shared content model instead of copy-paste HTML.',
      'Centralized content model: Single-source-of-truth files for locations, services, and businessInfo that drive page copy, headings, and metadata across the site.',
      'Static page generation script: Node-based generator that builds the public/locations structure, assembles titles/descriptions, and writes a sitemap from the same data.',
      'Lead-capture flows: Contact, quote, and careers/job-application forms wired to Express endpoints with validation, user feedback states, and success/error messaging.',
      'Email notifications: Nodemailer-backed emails for internal notifications and user confirmations so submissions feel like real business flows.',
      'Spam protection: Google reCAPTCHA integration on key forms to reduce automated spam while keeping the UX straightforward for real users.',
      'Lightweight frontend: Vanilla JavaScript components for navbar, hero, footers, and content sections - easy to understand, fork, and re-skin for other service businesses.',
      'Portfolio-safe demo: Business name and content adapted into λlambda Heating & Air, preserving the system design from the original client work while avoiding real PII or production data.',
    ],
    techStack: {
      frontend: [
        'Vanilla JavaScript (ES modules) for interactive behavior and shared components',
        'HTML templates for core marketing and landing pages',
        'CSS for layout, typography, and responsive design',
      ],
      backend: [
        'Node.js for scripts and server runtime',
        'Express.js for serving static pages and handling form submissions',
        'Nodemailer for sending email notifications and confirmations',
        'Google reCAPTCHA verification to protect forms from automated abuse',
      ],
      tooling: [
        'Custom static page generation script for service/location landing pages and sitemap',
        'NPM scripts for local development and build workflows',
      ],
    },
    outcome: [
      'Reusable SEO architecture: Demonstrates how to turn a “service in city” SEO problem into a structured content model and generator instead of a pile of near-duplicate pages.',
      'Agency-ready template: Shows how a real client implementation can be generalized into a portfolio-safe demo that can be re-skinned for new local-service businesses.',
      'Practical full-stack wiring: Combines a small, understandable stack (vanilla JS + Express) with real lead-generation flows, email handling, and spam protection.',
      'Maintainable long-tail footprint: Adding new cities or services becomes a content and configuration change, not a manual authoring project.',
    ],
    screenshots: [
      'Homepage hero and primary service callouts for λlambda Heating & Air.',
      'Example “[service] in [location]” SEO landing page generated from the shared content model.',
      'Contact or quote request form with visible validation and confirmation messaging.',
      'Careers/job-application page flow showing how lead-capture patterns extend beyond basic contact forms.',
    ],
    challenges: [
      'Balancing reuse with realism: SEO pages needed enough localized and service-specific copy to feel targeted, while still being generated from a shared content model.',
      'Avoiding content drift: Centralizing locations, services, and businessInfo reduced copy-paste risk, but the generator and templates had to stay disciplined about where text came from.',
      'Sanitization vs. fidelity: Converting a real branded implementation into a generic λlambda Heating & Air demo required scrubbing names, URLs, and copy while preserving the underlying system design.',
      'Incremental cleanup: At the time of writing, some frontend copy, testimonials, and docs still reference the original brand, so final polishing would include removing those residual references before treating this as a fully greenfield demo.',
    ],
    testimonial: {
      quote:
        'Working with Stephen, we were able to turn a one-off local-service website into a reusable pattern - dynamic pages, clean lead flows, and a structure we could adapt for other clients.',
      attribution: 'Agency partner',
      role: 'Digital lead-generation & web projects',
    },
  },
};

export function getProjectBySlug(slug) {
  return PROJECTS_DATA[slug] || null;
}

