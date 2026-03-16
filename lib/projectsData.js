export const PROJECTS_DATA = {
  'soap-stache': {
    title: 'Soap Stache',
    description:
      'A modern, demo-mode e-commerce storefront for handcrafted soaps, built with Next.js, Sanity CMS, and Stripe-powered checkout. The site showcases a Michigan-themed, mobile-first design and a full CMS-driven product catalog without processing real payments.',
    imageUrl: '/images/screely-stache.png',
    link: 'https://app-soap-stache.vercel.app/',
    tags: ['E-commerce', 'Next.js', 'Sanity CMS', 'Stripe'],
    problem:
      'I wanted a portfolio-grade, client-ready e-commerce reference build that feels like a real soap shop: non-technical content editors needed to manage product photos, descriptions, pricing, and availability; checkout had to follow realistic Stripe patterns; and the architecture needed to be SEO-friendly and maintainable over time—all while running in a clearly labeled demo mode with no real orders.',
    role:
      'Solo full-stack developer responsible for the dual-repo architecture (Next.js storefront and Sanity Studio CMS), Stripe demo checkout integration, cart state management, API routes, and deployment. I designed the soap product schema (grit level, scent profile, hero/featured display flags, launch date, availability) and built the CartContext for persistent, localStorage-backed cart state.',
    solution:
      'I built a dual-repo architecture: app-soap-stache (Next.js 15 storefront) and studio-soap-stache (Sanity Studio CMS). The frontend uses the App Router for dynamic product listing and detail pages, a React Context-powered cart, and a Stripe Checkout flow explicitly configured in demo mode so no real payments are processed. Sanity serves as the headless CMS with a custom `soap` schema (grit, scent, launch date, special display status, availability) and a `subscriber` schema for marketing lists. A persistent demo banner, structured data helpers, sitemap, and robots configuration round out a production-style, SEO-aware e-commerce demo.',
    outcome: [
      'Content autonomy: Products, photos, pricing, and availability are all managed in Sanity Studio—no code changes required for catalog updates.',
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
      'A demo website for a fictional orthodontic practice. The live site (lambdaortho.vercel.app) combines marketing information with scheduling tools to showcase web-development skills. A banner at the top of each page invites prospective patients and referring dentists to engage. The site is responsive, has a clean, professional aesthetic and uses modern colours and icons. Built with vanilla JavaScript and Express.js, it uses modular components, client-side routing backed by a custom Router class, a small set of JSON demo APIs, and centralised data in siteData.js—all forms are demo-only and log submissions rather than sending emails or storing data.',
    imageUrl: '/images/screely-lambda.png',
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
      'I built a single-page application using vanilla JavaScript and Express.js. On the frontend, ES6 modules follow a component pattern: create… functions return markup and init… functions attach behaviour. A custom Router class handles client-side navigation, dynamic treatment and career detail routes, link interception and scroll restoration, all mounted inside a Layout component. On the backend, a lightweight Express server serves static files from public/ and exposes JSON demo endpoints (GET /api/sitedata plus POST /api/contact, /api/referral and /api/schedule) that log submissions and return success responses without persisting data. All forms—contact, schedule, referral, job applications, patient portal login and newsletter signup—validate input, show loading states, log to the console and display success or error messages while remaining clearly demo-only.',
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
      'Centralised data: siteData.js holds contact info, treatments, process steps, job listings and more—content updates rarely require touching component logic',
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
        "Stephen has a great tenacity to solve problems in the world of technical development and engineering. We were fortunate enough to work alongside him multiple times, in which he delivered the dependable digital foundations for our Clients. With each project, his work significantly improved and become more operational. For those needing a digital facelift — it's not your job to understand how it's done. Instead, focus on finding someone you trust to help craft your vision inside your digital landscape. Stephen is one of those someones. God Bless.",
      attribution: 'HERO POINT CONSULTING',
      role: 'Agency Partner (Testimonial from Griffin H.)',
    },
  },
  'rpg-dice-roller': {
    title: 'RPG Dice Roller',
    description:
      'Terminal-styled RPG dice roller built directly into the portfolio, with mixed dice pools, hold & reroll, keyboard shortcuts, and browser-saved history—all fully client-side.',
    imageUrl: '/images/screely-llambda.png',
    showComponentAsHero: true,
    link: '/dice-roller',
    tags: ['Web Development', 'Gaming', 'Interactive', 'Terminal'],
    overview:
      'I wanted something on the site that felt interactive, useful, and true to my style. The RPG Dice Roller is a small product at /dice-roller: a full-screen, terminal-styled utility for tabletop games. It runs entirely in the browser—rolls and history never leave the user\'s machine. The tool showcases interface design, state management, client-side persistence, and product thinking in a keyboard-friendly format with hold-and-reroll support and local browser history.',
    problem:
      'Most online dice rollers are either single-button randomizers or separate tools that feel disconnected from the rest of a site. I wanted a dice roller that supported real RPG use cases—mixed pools, modifiers, annotations, and selective hold-and-reroll behavior—while fitting the λstepweaver terminal interface and staying fully client-side.',
    role:
      'As the sole developer and designer, I implemented the rolling engine, React components, route integration, keyboard-first UX, and localStorage persistence, and tuned the behavior and styling to match the λstepweaver terminal design system.',
    solution:
      'I built a Next.js route at /dice-roller that mounts a dedicated DiceRoller component. The core logic lives in lib/roller.js: notation parsing, rolling, result shaping, and pool validation. The UI is split into components for pool building, result display, and roll history. The interface exposes keyboard shortcuts, a Quick Start-style flow, and the retro terminal theme. The DiceRoller module uses useMemo and useCallback, centralized dice constants in lib/diceConstants.js, and error handling around localStorage.',
    outcome: [
      'A practical tabletop tool visitors can actually use during sessions, not just a portfolio demo.',
      'Fast, keyboard-friendly workflows via shortcuts for rolling, copying notation, resetting, and clearing results.',
      'Clear separation between reusable roll logic and the UI, so the engine can be reused in a terminal command or embeddable dialog.',
      'Local, privacy-conscious persistence: roll history and notes live in the browser via localStorage, with no server round-trips.',
    ],
    keyFeatures: [
      {
        title: 'Dice pool builder',
        description:
          'Players construct mixed dice pools by clicking terminal-styled icons for d4 through d100. Each click increments the count; adjacent controls adjust a global modifier, and a notes field lets players annotate rolls (e.g. "initiative", "attack with Bless"). The live formula updates as the pool changes.',
      },
      {
        title: 'Hold & reroll engine',
        description:
          'When a roll is executed, the results view shows each individual die. Clicking a die toggles it into a held state; held dice are preserved on the next roll while the remaining dice are rerolled. This models advantage/disadvantage and "keep/drop" mechanics more faithfully than a simple re-roll-all button.',
      },
      {
        title: 'Persistent roll history',
        description:
          'A history sidebar records recent rolls with notation, total, and timestamp. Data is stored in browser localStorage with error handling, so users can reload or return later and still see their recent rolls.',
      },
      {
        title: 'Terminal-inspired UI and guidance',
        description:
          'The dice roller reuses the λstepweaver terminal theme—CRT glow, IBM/OCR typography, neon palette. Quick-start copy and on-screen hints walk players through building a pool, rolling, holding dice, and using keyboard shortcuts.',
      },
      {
        title: 'Fully client-side and privacy-friendly',
        description:
          'All computation and persistence happen in the browser. The app never sends roll data, notes, or history to a server, which keeps latency low and state private.',
      },
    ],
    userExperienceFindings: {
      strengths: [
        'Interactive and intuitive: drag-and-click interface for building pools; Quick Start and Sys.BRIEF provide immediate context',
        'Flexibility: mix dice types, add modifiers and notes, copy results; hold feature supports advantage/disadvantage',
        'Offline and private: runs entirely in the browser; fast, no network latency; data stays on the user\'s machine',
        'Persistent history: local storage allows tracking outcomes across sessions',
        'Branding consistency: retro aesthetic aligns with λstepweaver portfolio theme',
      ],
      areasForImprovement: [
        'README documentation: stepweaver v3 README does not mention the Dice Roller; contributors may not know it exists or how to run it locally',
        'Dice quantity adjustment: adding multiple dice requires repeated clicks; numeric input or typed expressions (e.g. "3d6+2") could speed up pool creation',
        'Accessibility: monochrome terminal aesthetic may pose contrast issues; ensure ARIA labels and keyboard focus handling for hold function',
        'Clearer Roll feedback: when holding and rerolling, a small confirmation or animation would make locked vs rerolled dice obvious',
        'Module toggles: no visible control for enabling/disabling modules; explicit toggles would help users understand which modules are active',
      ],
    },
    readmeRecommendations: [
      'Location: app/dice-roller/ (or relevant path). Accessible at /dice-roller in the deployed site',
      'Purpose: RPG dice roller supporting complex pools, hold & reroll, persistent history and keyboard shortcuts',
      'Usage: Build pool (click dice icons, adjust counts, add modifiers/notes); Roll (Enter or button); Hold & reroll (click result to lock, then roll again); Persistent history (saved with timestamp; Reset to clear)',
      'Technology: React/Next.js and Tailwind CSS; browser localStorage for persistence; no backend required',
      'Accessibility: Fully client-side; keyboard shortcuts; theme invert toggle',
    ],
    conclusion:
      'This is the kind of project I like building: small, focused, interactive, and polished enough to feel like a real product. It shows that I can take a playful idea, give it a clear interface, structure the logic cleanly, and integrate it into a larger brand experience without it feeling bolted on. The module README points toward future reuse—terminal-command integration and embeddable dialog versions—so it was built as a reusable feature, not a throwaway demo. I position it as a product-thinking / UX / front-end engineering piece, not a client-results case study with fake ROI.',
    features: [
      'Multiple Dice Types: Support for d4, d6, d8, d10, d12, d20, and d100',
      'Flexible Pool Building: Add any combination of dice with custom quantities to build complex pools',
      'Modifiers: Add positive or negative modifiers on top of the pool',
      'Roll Breakdown: View individual die results and subtotals grouped by dice type, plus a final total',
      'Roll History: Last 10 rolls saved with timestamps in localStorage, surviving page reloads',
      'Copy to Clipboard: Copy standard dice notation (e.g. 3d6+2) for sharing or session notes',
      'Keyboard Shortcuts: ENTER to roll, C to copy notation, R to reset the pool, ESC to clear the current result',
      'Responsive Design: Layout adapts cleanly to desktop, tablet, and mobile',
      'Accessibility: Full keyboard navigation and screen reader-friendly structure',
    ],
    techStack: {
      frontend: [
        'Next.js 15 and React 19 for the route and UI components',
        'Client-side DiceRoller component cluster (DiceRoller, DicePoolBuilder, DiceResult, RollHistory)',
        'Tailwind CSS for terminal-inspired layout, typography, and responsive behavior',
        'Lucide-react and React Icons for UI icons',
      ],
      logic: [
        'Core rolling engine in lib/roller.js (roll, rollDice, buildNotation, parseDiceNotation)',
        'Centralized dice metadata in lib/diceConstants.js for sides, labels, and palette mapping',
        'React hooks with useMemo and useCallback to avoid unnecessary re-renders',
      ],
      persistence_and_testing: [
        'Browser localStorage for roll history with defensive error handling',
        'Jest test suite for the rolling engine (notation parsing, calculation, pool validation)',
      ],
    },
    projectStructure: `RPG Dice Roller (λstepweaver v3)
├── components/
│   └── DiceRoller/
│       ├── DiceRoller.jsx        # Main container and state management
│       ├── DicePoolBuilder.jsx   # UI for building and editing the dice pool and modifiers
│       ├── DiceResult.jsx        # Displays roll totals, breakdown, and held dice
│       └── RollHistory.jsx       # Sidebar listing recent rolls from localStorage
├── lib/
│   ├── roller.js                 # Core dice rolling engine and notation utilities
│   └── diceConstants.js          # Shared dice metadata (sides, labels, colors)
├── utils/
│   └── dateFormatter.js         # Formats timestamps for roll history
└── app/dice-roller/
    └── page.jsx                 # /dice-roller route, wrapped in an error boundary`,
    terminalIntegration: {
      description:
        'The rolling engine in lib/roller.js is designed to be reused in the λstepweaver terminal, so the same logic can power a future roll command without duplicating behavior.',
      usage: [
        'Use a command like roll 3d6+2 to trigger the same engine that backs the UI',
        'Leverage structured result data (breakdown, totals, modifier) to print readable terminal output',
        'Reuse the same parsing and validation logic across both UI and terminal surfaces',
      ],
      example: `λ roll 3d6+2
Rolling 3d6+2:
  3d6: [4, 2, 6] = 12
  Modifier: +2
Total: 14`,
    },
    keyboardShortcuts: [
      'ENTER: Roll the current dice pool',
      'C: Copy the current roll notation to the clipboard',
      'R: Reset the dice pool back to zeroed counts',
      'ESC: Clear the current roll result while keeping the pool',
    ],
    diceNotation: [
      '3d6 – Roll three six-sided dice',
      '1d20+5 – Roll one twenty-sided die and add five',
      '2d8+1d6-2 – Roll two eight-sided dice, one six-sided die, then subtract two',
    ],
    plannedFeatures: [
      'Terminal command integration so the same engine powers both the UI and the λstepweaver terminal roll command',
      'Embeddable DiceRollerDialog component for blog posts or project pages',
      'Typed notation input (e.g. 3d6+2) to generate or adjust the visual dice pool',
      'Additional accessibility refinements around contrast, focus outlines, and hold/reroll announcements',
    ],
    challenges: [
      'Designing the hold-and-reroll behavior so it feels intuitive for tabletop players while staying simple in the UI (click-to-hold vs. more advanced selection).',
      'Balancing the dense, retro terminal aesthetic with readability and accessibility, especially contrast and focus states.',
      'Keeping the roll engine generic and reusable while exposing enough structure for a rich UI (breakdowns, timestamps, notation round-tripping).',
    ],
  },
  'neon-profile-card': {
    title: 'Profile Card',
    description:
      'A digital ID card inspired by NETRUNNER\'s neon challenge cards, evolved into the hero component on the main landing page of the λstepweaver portfolio. Retains the retro CRT aesthetic while improving usability, accessibility and reusability. Built with Next.js 15, React 19 and Tailwind CSS v4.',
    imageUrl: null,
    showComponentAsHero: true,
    link: 'https://codenhack.com/projects/neon-profile-card',
    tags: ['UI Design', 'Tailwind CSS', 'Animation'],
    overview:
      'The Profile Card project started as a digital ID card inspired by NETRUNNER\'s neon challenge cards and has evolved into the hero component on the main landing page of the λstepweaver portfolio. The redesign retains the retro CRT aesthetic while improving usability, accessibility and reusability. Built with Next.js 15 (app router), React 19 and Tailwind CSS v4, the component serves as a reusable profile card that can be rendered statically by the server but animates on the client via small hooks. The card displays an avatar, name, role, current focus, status indicator and descriptive tags. A terminal-style "Matrix Sync" bar simulates connecting to an uplink. The design uses IBM 3270 typeface for headings and OCR-A for body text, layered neon gradients, and optional scanline textures to evoke an old CRT monitor.',
    problem:
      'The original portfolio hero section was static and lacked the visual impact needed to communicate the brand\'s cyberpunk/retro-tech aesthetic. The redesign aimed to: create a visually striking, glowing profile card that matched the rest of the CRT-themed site; make the card modular and reusable so it could be swapped with different profile data without rewriting markup; provide an animated status indicator and a terminal-style sequence while keeping the component accessible for assistive technologies; ensure the card is fully responsive down to 320px and can be rendered as static HTML for performance.',
    role:
      'As the frontend developer and designer, I was responsible for building the React component, implementing the glassmorphism design, and creating the animated Matrix Sync terminal sequence.',
    solution:
      'I implemented a NeonProfileCard React component that encapsulates all visual and behavioural logic.',
    outcome: [
      'Enhanced user experience: The new hero grabs visitors\' attention with its glowing animation and immediately communicates the developer\'s role and personality. Interactive feedback (status pulses and matrix sequence) without overwhelming the page.',
      'Improved maintainability: By separating data and presentation, new profiles can be created by editing a JSON/TS file. The component can be used in other contexts (e.g. project showcase cards) with minimal adjustments.',
      'Accessibility and performance: Semantic HTML, ARIA labels and proper dl semantics for screen readers. All animations are CSS-based. Shared fonts and color tokens reduce network requests; component renders statically on the server.',
      'Consistent branding: Retro CRT look, neon gradient palette and custom fonts align the card with the rest of the λstepweaver site.',
    ],
    features: [
      'Glassmorphism container with layered neon gradients and optional CRT scanline texture; Tailwind arbitrary gradient values and mix-blend-mode layering for glow',
      'Semantic layout separating header, profile picture, information grid and footer; uses <section>, <dl>/<dt> for screen-reader structure',
      'Animated active status indicator: status pill pulses via CSS keyframes in global theme; label/value pairs announced correctly by screen readers',
      'Matrix Sync terminal sequence: React state machine rotates through connection statuses; useEffect schedules updates; static HTML for hydration on client',
      'Reusable data model: profile info (name, role, current focus, status, tags, avatar) in separate data file; component receives as props',
      'Lucide React icons and custom fonts (IBM 3270, OCR-A); Tailwind utility classes for layout and responsiveness',
    ],
    techStack: {
      frontend: [
        'Next.js 15 - App Router',
        'React 19 - Component-based UI',
        'Tailwind CSS v4 - Arbitrary values for gradients and glow layers',
      ],
      design: [
        'Lucide React icons (ShieldCheck, Activity, QrCode)',
        'IBM 3270 for headers, OCR-A for body copy',
        'Glassmorphism overlays with Tailwind arbitrary backgrounds',
      ],
      utilities: [
        'Profile data in lib/profiles.ts (or equivalent)',
        'Demo component registry for project page injection',
      ],
    },
    projectStructure: `app/
  page.tsx                # Homepage using <NeonProfileCard /> as hero
components/
  neon-profile-card/
    NeonProfileCard.jsx   # Main React component with optional client hook
    NeonProfileCard.css   # Tailwind classes & keyframes for glow and animation
lib/
  profiles.ts             # Data model for different profiles

Homepage integration: Hero imports NeonProfileCard and passes profile data. Static server component wraps the card; hydration only for matrix animation.
Demo injection: Projects section uses /projects/[slug] to inject the card into its case study page.`,
    demoHighlights: [
      'Self-contained NeonProfileCard-swap the profile prop to reskin',
      'Accessible status indicator and label/value pairs for screen readers',
      'Client-side React hooks for Matrix Sync terminal animation',
      'Tailwind CSS v4; renders as static HTML, hydrates only for animation',
    ],
    readmeRecommendations: [
      'Highlight the Profile Card in the Features section; explain homepage hero uses reusable component with Tailwind glassmorphism and Matrix Sync animation',
      'Document component architecture: components/neon-profile-card, lib/profiles.ts; code snippets for import and usage',
      'Add demo screenshots or GIFs of the card',
      'Clarify optional client-side hook: component renders statically but can accept prop to run matrix animation; instructions for disabling animations for accessibility',
      'Update credits/inspiration: acknowledge original Neon Profile Card concept; mention open-source icons and fonts',
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
      'Practical AI integrations for websites, internal tools, reporting, and workflows—grounded in your business, not generic internet mush.',
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
      'I connect AI to real workflows—websites, internal tools, reporting stacks, forms, content pipelines, and support processes—so it can actually do useful work in context. The goal is not to bolt on a chatbot for the sake of it. The goal is to reduce friction, save time, and make existing systems more useful.',
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
    title: 'Google Analytics',
    description:
      'Google Analytics setup, configuration, and optimization to track what matters most to your business. Get accurate data, actionable insights, and reports that help you make informed decisions.',
    imageUrl: null,
    link: null,
    tags: ['Analytics', 'Data Tracking', 'Business Intelligence'],
    isService: true,
    serviceIntro:
      'These capabilities are available for hire. I specialize in GA4 and GA4 migrations, with Google Tag Manager, Looker Studio dashboards, and BigQuery integration for advanced analysis.',
    problem:
      'Businesses need accurate website analytics to understand visitor behavior, track conversions, and make data-driven decisions, but struggle with proper setup, configuration, or migration from Universal Analytics.',
    role:
      'I set up and configure Google Analytics, create custom dashboards, implement event tracking, and train teams. Deliverables include GA4 implementation, GTM setup, Looker Studio dashboards, and BigQuery integration for advanced analysis.',
    solution:
      'I provide comprehensive Google Analytics services including setup, goal tracking, custom event configuration, e-commerce tracking, custom dashboards, data quality audits, and team training.',
    outcome: [
      'Better insights: Understand how visitors interact with your website',
      'Improved tracking: Accurate conversion and ROI measurement',
      'Data-driven decisions: Make informed choices about your online presence',
      'Enhanced optimization: Identify opportunities for improvement',
    ],
    features: [
      'Setup & Configuration: Proper installation and configuration of Google Analytics',
      'Goal Tracking: Set up conversion goals and track key business metrics',
      'Event Tracking: Configure custom events for user interactions and conversions',
      'E-commerce Tracking: Full e-commerce tracking for online stores',
      'Custom Dashboards: Create custom dashboards focused on your business metrics',
      'Data Quality: Ensure accurate data collection and fix tracking issues',
      'Reporting: Set up automated reports and data visualization',
      'Training: Train your team on how to use and interpret analytics data',
    ],
    benefits: [
      'Understand how visitors interact with your website',
      'Track conversions and measure marketing ROI',
      'Make data-driven decisions about your online presence',
      'Identify opportunities for improvement and optimization',
    ],
    exampleUseCases: [
      'GA4 migration from Universal Analytics with proper event mapping and GTM configuration',
      'E-commerce conversion funnel tracking and Looker Studio dashboard for a custom product catalog',
    ],
    services: [
      'Initial setup and configuration',
      'Conversion goal configuration',
      'Custom event tracking setup',
      'E-commerce tracking implementation',
      'Custom dashboard creation',
      'Data quality audits and fixes',
      'Report automation and scheduling',
      'Team training and documentation',
    ],
    techStack: {
      analytics: [
        'Google Analytics 4 (GA4) - Modern analytics platform',
        'Google Tag Manager - Tag management and deployment',
        'Looker Studio - Custom reporting and dashboards',
        'Event Tracking - Custom event implementation',
        'E-commerce Tracking - Enhanced e-commerce setup',
        'Conversion Tracking - Goal and conversion optimization',
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
      'Mission-driven publishing and commerce platform built with Next.js that combines multi-source content ingestion, editorial curation, and a print-on-demand sticker shop powered by Notion, Stripe, Supabase, and Printify.',
    imageUrl: '/images/resist_sticker.png',
    link: 'https://iamresist.org',
    tags: ['Web Development', 'Next.js', 'Notion API', 'E-commerce', 'Stripe', 'Printify', 'Supabase'],
    overview:
      'I AM [RESIST] is a personal, self-funded project that combines activism, journalism and e-commerce into a single Next.js application. The site describes itself as "a call to awareness, a chronicle of resistance"-not an organisation or political party. Its creator, a military veteran, explains that the goal of the project is to document the authoritarian drift in America and amplify fact-based reporting and antifascist creators. The project is unapologetically antifascist and emphasises that silence in the face of fascism is surrender. Under the hood, it brings together multi-source content ingestion (Notion, RSS, YouTube), editorial curation, and a small but growing print-on-demand sticker catalog in one mission-driven interface.',
    problem:
      'I needed a single, maintainable site that could serve multiple content streams (voices/videos, protest music, book club, blog-style journal) and a small merchandise store without a separate backend team-owning the full pipeline from content ingestion and API design through payment and fulfillment automation.',
    role:
      'As the full-stack developer, I built the entire platform: Notion CMS integration, feed services (voices, protest music, unified archive), Stripe Checkout and webhooks, Supabase for orders, Printify integration and fulfillment webhooks, security headers and CSP, and deployment on Vercel.',
    solution:
      'I built a Next.js application with Notion as the CMS for all content types. Content flow: Notion databases and external RSS feeds go through feed services (voicesFeed, protestMusicFeed, unifiedArchive) and are cached and merged for the homepage and archive pages. Shop flow: Stripe Checkout → Stripe webhook → create order in Supabase, send confirmation email, submit to Printify → Printify webhook updates order status. The app uses concurrency limits, retries, and idempotent webhook handling for reliability.',
    outcome: [
      'Shipped: Full site with homepage, voices feed, protest music, book club, journal, shop, and order status',
      'Automation: Orders flow from payment → DB → email → Printify without manual steps; fulfillment status updates via webhooks',
      'Stability: Concurrency limits and retries in feeds and DB/Printify code; webhook handlers written for idempotency',
      'Security: Centralized security headers and CSP; no hardcoded secrets; env-based config',
    ],
    mission: {
      title: 'Mission and Manifesto',
      points: [
        'A personal journal and archive: presents a timeline of events, observations and voices documenting the erosion of democracy',
        'A call to awareness rather than a call to arms: seeks to educate and resist the normalisation of fascist ideas through art, writing and community',
        'Created by a veteran who believes the oath to defend the Constitution extends beyond military service; trained to "listen between the lines" and committed to truth and liberty',
        'Unapologetically antifascist and independent: aims to amplify fact-based reporting and antifascist creators',
      ],
      symbolism:
        'The [RESIST] flag: a black field (the unknown), a white star for truth, and three downward arrows representing anti-fascism, anti-monarchism and anti-exclusion. These elements symbolise resistance to power without restraint and a commitment to liberty and equality.',
    },
    contentSections: [
      {
        section: 'Home (Briefing)',
        purpose: 'Landing page displaying the Resist flag, mission tagline ("Silence in the face of fascism is surrender") and calls-to-action',
        elements: [
          'Daily Brief: rolling 24-hour feed that can surface trending videos from Supabase + YouTube Data API when a separate job populates the trending table; otherwise falls back gracefully to the default Intel feed (Notion + RSS)',
          'Intel feed and Newswire: recent protest videos, commentary, music, and external reporting presented together so the site feels like a small, opinionated publication rather than a simple blog',
          'Currently Reading card linking to book club',
          'Links to mission and Discord; note that external content belongs to original creators',
        ],
      },
      {
        section: 'Mission',
        purpose: 'The manifesto described above',
        elements: ['Emphasises independence, antifascist stance and the meaning of the [RESIST] flag'],
      },
      {
        section: 'Intel',
        purpose: 'Curated multimedia content: protest videos, music, books and resources',
        elements: [
          'Filters: Voices of Dissent, Curated Videos, Protest Music, Books, Resources',
          'Cards show titles, dates, source creators; link to original content with share buttons',
          'Dozens of cards with titles such as "The #SaveAct will get a vote in the senate…" and "How many American deaths will MAGA accept in Iran"',
        ],
      },
      {
        section: 'Journal',
        purpose: 'Personal essays and commentary by the site author',
        elements: [
          '"Because I Know Better" reflects on trust in news sources and the author\'s background as an intelligence analyst',
          'Update notes (e.g. 13 Jan 2026, 9 Mar 2026) share current events and critique',
          'Each entry has share buttons; some links (e.g. "Yankee Samurai") are broken (404)',
        ],
      },
      {
        section: 'Timeline',
        purpose: 'Chronological record of Trump administration actions during second term that undermine elections and democratic norms',
        elements: [
          'Events by date and category: rewriting election rules, targeting election officials, supporting underminers, retreating from federal role',
          'Links to external sources (mostly Brennan Center for Justice)',
          'Examples: president pardoning 1,500 January 6 rioters, executive order pausing election security, DOJ withdrawing from pro-voter cases',
        ],
      },
      {
        section: 'Supply',
        purpose: 'E-commerce page selling vinyl stickers with Resist imagery and satirical art',
        elements: [
          'Product cards: picture, price, quantity selector, Add to Cart',
          'Features: Car-durable, UV-resistant, Weatherproof',
          'Stripe and Printify for payments and fulfillment',
        ],
      },
      {
        section: 'Legal & Copyright',
        purpose: 'Copyright notices, fair-use policies, terms, privacy, refund, return, shipping, product liability',
        elements: [
          'YouTube embeds via official API; book covers under fair use',
          'Data retention and user rights',
          'Refund, return and shipping policies',
        ],
      },
    ],
    userExperienceFindings: {
      strengths: [
        'Strong visual identity: consistent dark-red-white palette and Resist flag convey antifascist stance; homepage hero is striking',
        'Clear navigation but heavy layout: top nav provides easy access to all sections and footer repeats nav; however, Intel page loads a long list without pagination, filtering is not immediately intuitive, and "Loading…" persists after content appears',
        'Dynamic content integration: Daily Brief 24-hour trending feed and Intel curation demonstrate effective API integration (Supabase, YouTube, Notion)',
        'E-commerce integration: Supply page uses Stripe and Printify; product cards highlight features and price',
        'Content richness: multiple content types-manifesto, curated news, personal essays, timeline and products-provide a comprehensive resource',
      ],
      areasForImprovement: [
        'Broken links: Journal entry "Yankee Samurai" leads to 404; fix or remove',
        'README mismatch: README describes Daily Brief cron and shop setup but omits mission, Intel, Journal, Timeline; lacks env vars (Notion, Supabase, Discord) and political content warnings',
        'Accessibility: heavy colour contrast and long scroll may be difficult for some; consider keyboard navigation, improved filter controls, alt text for images',
        'Cart visibility: no dedicated cart page; side-cart overlay could be improved; add more obvious cart button in navigation',
      ],
    },
    readmeRecommendations: [
      'Project purpose: State that I AM [RESIST] is a personal project chronicling authoritarian drift, amplifying antifascist voices and selling Resist merchandise; not an official organisation, political party or call to arms',
      'Site structure: Describe Home/Daily Brief, Mission, Intel (videos, protest music, books, resources), Journal, Timeline, Supply shop, Legal; summarise content sources (Supabase, Notion, YouTube, curated RSS, personal writing)',
      'Setup instructions: List all env vars-Supabase (SUPABASE_URL, SUPABASE_KEY), YouTube (GOOGLE_API_KEY), Notion (NOTION_TOKEN, NOTION_DATABASE_ID), Stripe (STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, STRIPE_PRICE_ID_*), Printify (PRINTIFY_API_TOKEN, PRINTIFY_SHOP_ID, PRINTIFY_PRODUCT_ID_*), CRON_SECRET, DISCORD_INVITE_LINK',
      'Cron job: Keep existing Daily Brief explanation; clarify fallback to static feed until Supabase is seeded',
      'Shop setup: Stripe price IDs, Printify product IDs; mention shop supports activism; link to legal page for return, refund, shipping policies',
      'Contributing guidelines: Politically sensitive project; guidelines on contributions (abide by antifascist mission, avoid hate speech); instructions for issues and PRs',
      'License and credits: Add license; credit external creators; acknowledge YouTube embeds and book covers under fair use; Brennan Center for timeline sources',
      'Disclaimer: Warn about political content; may be blocked in certain jurisdictions; opinions are solely those of the author',
    ],
    conclusion:
      'I AM [RESIST] is a compelling example of using modern web technology to document political events and advocate for democratic values. Through a combination of curated multimedia content, original writing, historical timelines and a small shop, the project invites visitors to engage critically with current events. Updating the repository\'s README to accurately reflect the mission and architecture will help future contributors and users understand its goals and operate the application effectively. In summary, it is a personal, antifascist project built with Next.js that combines a news feed, manifesto, curated multimedia content, journal entries, a historical timeline, and a small shop. The current README only describes the Daily Brief cron job and shop setup; it omits the mission, Intel, Journal, and Timeline sections. Rewriting the README to explain the activist purpose, outline all major site sections, list required environment variables, and add policies on contributions and political content is recommended.',
    features: [
      'Unified content experience: One homepage and navigation for voices feed, protest music, book club, journal, Newswire, and curated content',
      'Notion as CMS: Non-developers update videos, books, and journal entries via Notion; the app consumes via Notion API',
      'Voices feed: Fetches RSS per voice from Notion, p-limit for concurrency, merges with curated Notion videos, dedupes by URL, 24-hour boost for recently curated items',
      'Protest music: Dedicated feed and section driven by Notion + RSS',
      'Book club: Books and reading journal entries from Notion; dedicated pages per book and per entry',
      'Stripe Checkout: API route creates session and redirects; customer pays on Stripe-hosted page',
      'Stripe webhook: Verifies signature, handles checkout.session.completed; on success: insert order in Supabase, send confirmation email, submit to Printify',
      'Printify integration: Provider class for create order and status; Printify webhook updates fulfillment status in DB; retry logic for API calls',
      'Order lifecycle: Customers view order details and status via orders pages; confirmation and shipping updates are sent via the email service wired to the same Supabase order data',
      'Security headers: HSTS, X-Frame-Options, CSP, Permissions-Policy, and strict Content-Security-Policy in next.config',
    ],
    techStack: {
      frontend: [
        'Next.js 15 - App Router, React 19, Tailwind CSS',
        'Server-side rendering with revalidate for content and feeds',
        'Image config: AVIF/WebP, remote patterns for Notion, YouTube, etc.',
      ],
      backend: [
        'Supabase (Postgres) - Orders, fulfillment status, trending video table for Daily Brief; schema and migrations in repo',
        'Lazy DB client so app can run without DB for local content-only work',
      ],
      payment: [
        'Stripe - Checkout and webhooks (checkout.session.completed)',
        'Webhook signature verification with raw body and signing secret',
      ],
      contentManagement: [
        'Notion API - Databases for voices, videos, journal, book club, protest music (implied by source; not explicitly in README)',
        'Rich content extraction via notion-blocks; pagination for large datasets',
      ],
      contentAggregation: [
        'YouTube Data API v3 - Fetching recent videos and view counts; free tier 10,000 units/day',
        'Supabase - Trending video table for the optional Daily Brief; population is handled by an external job, not this repo',
        'RSS (e.g. Libsyn) - Parsed and merged with Notion data',
        'Feed services: voicesFeed.service, protestMusicFeed.service, unifiedArchive.service',
        'p-limit for concurrency; Promise.allSettled so one failed feed does not break the rest',
        'Fallback to the default Intel feed until the Supabase trending table is populated, so ingest remains resilient even when one source fails',
      ],
      ecommerce: [
        'Stripe - Payment processing',
        'Printify - Product fulfillment; PRINTIFY_API_TOKEN, PRINTIFY_SHOP_ID, PRINTIFY_PRODUCT_ID_*',
        'Configuration-driven sticker catalog with multiple designs and bundles (I AM [RESIST] flag, Gadsden parody, Trump TACO, All Mad Here)',
      ],
      development: [
        'Vercel - Static site generation, edge functions, cron jobs',
        'Cron-secured keep-alive and warm-home routes for cache warming and uptime, with support for external feed-refresh orchestration rather than a hard-coded 15-minute cron inside the app',
        'ESLint, PostCSS; production console stripping (keep error/warn), optimizePackageImports for Notion and RSS parser',
      ],
    },
    projectStructure: `iam-resist/
├── app/
│   ├── api/                    # API routes
│   │   ├── checkout/          # Stripe Checkout session
│   │   ├── notion-blocks/     # Notion block fetching
│   │   ├── orders/[id]/       # Order details
│   │   ├── voices-archive/    # Archive endpoint
│   │   ├── voices-feed/       # Voices feed
│   │   └── webhooks/          # Stripe, Printify webhooks
│   ├── book-club/             # Book club pages (per book, per entry)
│   ├── curated/[slug]/        # Curated content pages
│   ├── journal/               # Journal pages
│   ├── orders/[id]/           # Order status page
│   ├── posts/                 # Blog-style posts
│   ├── shop/                  # Shop and sticker
│   ├── timeline/              # Timeline
│   └── voices/                # Voices feed and archive
│
├── lib/
│   ├── db/                    # Supabase client, schema
│   ├── feeds/                 # voicesFeed, protestMusicFeed, unifiedArchive, voicesArchive
│   ├── fulfillment/           # Printify provider
│   ├── notion/                # client, books, journal, protestMusic, readingJournal, videos, voices repos
│   ├── stripe.js              # Stripe client
│   └── notion-blocks.js       # Block content extraction
│
└── public/                     # Static assets`,
    contentManagement: {
      notionIntegration: [
        'Multiple database support: Voices, videos, journal, book club, protest music',
        'Rich content extraction with Notion blocks API',
        'Pagination support for large datasets',
        'Clear service boundaries: feeds, Notion repos, fulfillment provider',
      ],
      contentTypes: [
        {
          name: 'Voices feed',
          description: 'RSS per voice from Notion; merged with curated videos; deduped by URL; 24-hour boost for recently curated',
        },
        {
          name: 'Protest music',
          description: 'Dedicated feed and section driven by Notion + RSS',
        },
        {
          name: 'Book club',
          description: 'Books and reading journal entries from Notion; pages per book and per entry',
        },
        {
          name: 'Journal / posts',
          description: 'Notion-driven articles with slugs and metadata',
        },
        {
          name: 'Curated videos',
          description: 'Notion database of hand-picked YouTube/TikTok links; merged into main feed with deduplication by platform ID',
        },
      ],
    },
    youtubeIntegration: {
      description:
        'Voices feed and curated videos: RSS per voice from Notion, merged with curated Notion videos, deduped by URL. Curated items get a 24-hour boost so they surface at the top when fresh.',
      features: [
        'Fetches RSS per voice (source) from Notion; p-limit caps concurrency to avoid rate limits',
        'Merges with curated Notion videos; dedupes by URL',
        '24-hour boost for recently curated items so they surface at top',
        'Normalize to common feed-item shape; dedupe by YouTube ID, TikTok ID, or URL',
      ],
      workflow: [
        '1. Voices (sources) and curated videos live in Notion databases',
        '2. Feed services fetch Notion data and RSS per voice',
        '3. Results merged, deduped, and sorted with 24-hour boost for curated',
        '4. Homepage and archive pages consume cached, merged feed',
      ],
    },
    ecommerceFeatures: {
      checkout: [
        'Stripe Checkout: API route creates session with line items and redirects; customer pays on Stripe-hosted page',
        'Stripe webhook: Verifies stripe-signature with signing secret; returns 400 on failure so Stripe can retry',
        'Order creation idempotent where possible (e.g. lookup by Stripe session before creating)',
      ],
      productManagement: [
        'Printify integration: Provider class for create order and get status; Printify webhook updates order fulfillment status in DB',
        'Retry logic for Printify API calls; webhook updates status by order ID so repeated events do not corrupt data',
        'Order status page: Customers view order details and fulfillment status via /orders/[id] backed by Supabase',
      ],
    },
    securityFeatures: [
      'Stripe webhook: Raw body and signature verification; 400 on failure for retries',
      'Security headers in next.config: HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy',
      'Strict Content-Security-Policy for scripts, styles, images, connect/frame sources',
      'Image routes: cache and no-referrer for asset protection',
      'Environment variables for Supabase, Stripe, Printify; no hardcoded secrets',
    ],
    apiRoutes: [
      'POST /api/checkout - Create Stripe Checkout session',
      'POST /api/webhooks/stripe - Stripe webhook (checkout.session.completed)',
      'POST /api/webhooks/printify - Printify fulfillment status updates',
      'GET /api/orders/[id] - Order details',
      'GET /api/voices-feed - Voices feed',
      'GET /api/voices-archive - Voices archive',
      'GET /api/notion-blocks?pageId=xxx - Fetch Notion blocks for rich content',
    ],
    designSystem: {
      typography: [
        'Monospaced fonts for bracketed elements ([RESIST], [TRUTH], [WITNESS])',
        'Stencil/redacted aesthetic',
      ],
      colors: [
        'Red (#A32121) - Primary accent',
        'Black (#000) - Background',
        'White (#FFF) - Text',
        'Constructivist-inspired palette',
      ],
      symbols: [
        'Three arrows: Resistance to fascism, monarchism, and exclusion',
        'Bracket system: [RESIST], [TRUTH], [WITNESS], [DISSENT], [SOLIDARITY]',
      ],
    },
    performance: [
      'Concurrency limits: p-limit(4) for feed fetches to avoid rate limits',
      'Promise.allSettled so one failed feed does not block the rest; filter to fulfilled values, dedupe, sort',
      'Next.js unstable_cache or revalidate so we do not hit Notion/RSS on every request',
      'Retries in DB and Printify code for transient failures',
      'Lazy DB client so app can run without DB for local content-only work',
    ],
    // [PLACEHOLDER] TODO: add primary UI screenshots and any notable implementation challenges/decisions.
    screenshots: [
      '[PLACEHOLDER] TODO: add primary hero/homepage screenshot path and alt text for I AM [RESIST].',
    ],
    challenges: [
      '[PLACEHOLDER] TODO: summarize 2–3 key architectural or product decisions that shaped I AM [RESIST].',
    ],
  },
  'mishawaka-shower-booking': {
    title: 'Mishawaka Shower Booking System',
    description:
      'A zero-cost, zero-infrastructure self-service shower booking system built entirely with Google Apps Script and Google Sheets. It tackles the “people waiting around all day” problem by letting guests book specific time slots from their phones, leave, and return within a short check-in window instead of waiting on-site.',
    imageUrl: '/images/screely-llambda.png',
    link: 'https://github.com/stepweaver/food-pantry-shower-scheduler',
    tags: ['Google Apps Script', 'PWA', 'Community Service', 'Zero Infrastructure'],
    problem:
      'The Mishawaka Food Pantry had to discontinue shower services because people were waiting around all day hoping to get a shower. Large groups congregated outside, staff were strained trying to manage an informal first-come-first-served line, and guests were wasting entire days for a service that might not be available.',
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
      '[PLACEHOLDER] TODO: add key screenshots for the public booking UI and admin dashboard.',
    ],
    challenges: [
      '[PLACEHOLDER] TODO: note the most important scalability, UX, or Apps Script constraints you had to design around.',
    ],
  },

  'llambda-llm-agent': {
    title: 'λlambda LLM Agent',
    description:
      "A portfolio-native LLM agent designed and built for λstepweaver. λlambda acts as Stephen Weaver's AI advocate and thinking partner, helping visitors understand his background, skills, projects, and working style through a shared chat system available in both the website UI and the terminal interface.",
    imageUrl: '/images/chatbot.png',
    link: '/terminal',
    tags: ['AI', 'LLM', 'Next.js', 'Portfolio', 'Terminal UX', 'Prompt Engineering', 'Groq', 'OpenAI'],
    showComponentAsHero: true,

    overview:
      "λlambda is productized portfolio infrastructure-not a generic chatbot bolted onto a static site. The core differentiators are the shared multi-surface architecture (website widget, page chat, and terminal all use the same backend), server-only prompt discipline (clients cannot supply or override system instructions), and channel-aware behavior: terminal and widget return intentionally different response styles-plain-text vs markdown, punchy vs richer-while routing through a single protected `/api/chat` route. That architecture makes the system feel built, not pasted in. Visitors get an AI advocate that translates vague intent into clear guidance about Stephen's work, skills, and fit.",

    problem:
      "Traditional portfolio sites make visitors do too much interpretation. A recruiter, client, or collaborator has to infer capability from scattered pages, infer fit from project thumbnails, and infer personality from copy. Stephen needed a better interface: one that could answer practical questions about his work, route people to the right proof, and do it without turning the site into a gimmick or a generic chatbot wrapper.",

    role:
      "Solo full-stack developer and product designer. I designed the agent concept, wrote the server-only prompt architecture, implemented the shared chat state and terminal integrations, built the API route and security controls, configured provider fallback behavior, and shaped the UX so the system felt native to the λstepweaver brand rather than bolted on.",

    solution:
      "I built λlambda as a shared, multi-surface AI system inside a Next.js 15 application. On the front end, the site uses a common chat hook for the widget and page chat, plus a terminal-specific command path for `chat <message>`. On the back end, all AI traffic flows through a single protected `/api/chat` route, which sanitizes inputs, rate-limits requests, enforces same-origin checks, applies bot protection, selects channel-specific prompt behavior, and calls Groq first with OpenAI as a fallback. The prompt itself is kept server-only and intentionally positions λlambda as an advocate, explainer, and routing layer for Stephen's public work. One important technical distinction: the terminal shell is largely client-side-it presents as a browser-based, local experience-but the AI itself is not. The `chat` command explicitly posts to `/api/chat`; there is no client-side model or local inference. That separation keeps the case study technically honest and makes clear that the terminal is a first-class surface into the same server-side agent.",

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
        'Type `chat <message>` in the terminal to ask λlambda about Stephen\'s background, projects, or skills',
        'Terminal mode returns plain-text answers tuned for short, command-line-friendly output',
        'The same backend route powers both terminal and website chat, but the prompt changes by channel',
        'Client-side shell, server-side AI: the terminal UI is browser-based; the chat command posts to /api/chat',
      ],
      example: 'chat What kind of systems do you build?',
    },

    userExperienceFindings: {
      strengths: [
        'The agent reduces decision friction for recruiters, clients, and collaborators',
        'The terminal and widget feel native to the site\'s brand instead of duplicating generic SaaS chat patterns',
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

    resources: [
      'Repo: https://github.com/stepweaver/stepweaver_v3',
      'AI setup: docs/AI_CHAT_SETUP.md (Groq/OpenAI configuration and `/api/chat` details)',
      'Live project page: /projects/llambda-llm-agent (portfolio case study view)',
    ],

    conclusion:
      "λlambda turns a personal portfolio into an interactive discovery system. Instead of asking visitors to decode a résumé, skim a project archive, and guess fit on their own, the site gives them a focused AI interface that can explain Stephen's work, route them to the right proof, and stay aligned with the λstepweaver voice. Technically, the project succeeds because it treats the agent as productized infrastructure: shared multi-surface architecture, server-only prompt discipline, and channel-specific behavior through one protected route. The terminal shell is client-side; the AI is not-the chat command explicitly posts to /api/chat. That distinction keeps the implementation honest and makes clear that this is built, not pasted in.",
    screenshots: [
      'Floating chat widget showing λlambda answering a question about Stephen’s background.',
      'Dedicated page chat surface embedded in a project detail view.',
      'Terminal view demonstrating the `chat <message>` command and plain-text responses.',
    ],
    challenges: [
      'Balancing multi-surface consistency (widget, page chat, terminal) with channel-specific tone and formatting.',
      'Designing server-only prompt and route protections that kept the implementation honest while still feeling fast in a portfolio setting.',
      'Choosing and tuning the provider strategy (Groq-first with OpenAI fallback) to keep latency and cost predictable for a personal site.',
    ],
  },

  // [PLACEHOLDER] Silent Auction Platform – case study skeleton
  'silent-auction': {
    title: 'Silent Auction Platform',
    description:
      'Custom silent auction platform, built and donated for the Mary Frank Elementary PTO, that combines bidder onboarding, alias-based real-time bidding, QR-friendly item access, donations, donor item management, and organizer closeout tools into one mobile-friendly system powered by Next.js and Supabase.',
    imageUrl: '/images/screely-llambda.png',
    link: null,
    githubRepo: 'stepweaver/silent-auction',
    tags: ['Fundraising', 'Next.js', 'Supabase', 'Real-time', 'Production'],
    overview:
      'I built and donated a purpose-built silent auction platform for the Mary Frank Elementary PTO so they could run a real school fundraiser online. The app gives bidders a phone-friendly way to check in, create an alias, browse items, bid in real time, and track their activity, while giving organizers the admin tools they need to manage items, timing, QR access, donations, and auction closeout from a single system.',
    problem:
      'The PTO needed more than a static catalog—it needed a practical event tool. Families had to be able to join from their phones, create a bidding identity, and place and track bids without friction. Organizers needed structure around bidder onboarding, anonymous public bidding, item access (including QR codes in the gym), deadline management, closing, and follow-up communication. The previous manual approach spread work across paper bid sheets, ad hoc coordination, and separate admin tasks that were hard to manage during a live fundraiser.',
    role:
      'I handled the product design, UX, frontend, backend integration, bidding logic, donor and admin workflows, and deployment. I designed the alias-based privacy model, implemented the real-time bidding experience on top of Supabase Realtime, built the operational closeout tools and email workflows, and later added a portfolio-safe demo mode so I could keep the project live without exposing real event data or payment behavior.',
    solution:
      'The final product is a Next.js and Supabase-backed fundraising platform that connects several workflows into one flow: bidders check in with name and email, verify their email, and create an alias before entering the auction; the catalog is category-based with item pages that show current bid and next minimum bid, updating live via Supabase Realtime; public surfaces (catalog, item pages, leaderboard) show only bidder aliases to preserve privacy while keeping the event exciting; bidders get a dashboard to review bids and manage optional email notifications; donors can log in to a separate portal to submit and manage items; and organizers have an admin dashboard to control auction open/close, manage items and donations, generate QR codes, and send closeout emails.',
    features: [
      'Guided bidder onboarding with email verification and alias/avatar creation',
      'Alias-based, anonymous public bidding surfaces that show activity without exposing personal data',
      'Real-time bidding with live updates to catalog, item pages, and leaderboard via Supabase Realtime',
      'QR-code friendly item links for in-room access from printed signage',
      'Bidder dashboard to review bids and manage opt-in bid confirmation and outbid emails',
      'Live leaderboard highlighting hot items, bidding wars, popular items, and top earners',
      'Donation pledges and a donor portal where registered donors can log in and manage donated items',
      'Admin dashboard for item management, auction start/deadline controls, QR workflows, and closeout operations',
      'Automated winner and admin summary emails at close, plus optional outbid alerts with throttling',
      'Demo mode that swaps to an isolated schema and disables email so the app can run as a portfolio-safe showcase',
    ],
    techStack: {
      frontend: [
        'Next.js 16 – Application shell, routing, and auction views',
        'React 19 – Component-based UI for catalog, bidding, dashboards, and admin screens',
        'Tailwind CSS 4 – Utility-first design system for a mobile-first event UI',
        'daisyUI – Accessible, themed component primitives for forms and layouts',
        'Framer Motion – Micro-animations and transitions for interactive bidding and leaderboard states',
      ],
      backend: [
        'Supabase (Postgres) – Auction items, bids, donors, and event settings',
        'Supabase Realtime – Live bid updates streamed to catalog, item, and leaderboard views',
        'Supabase Storage – Item photo storage and thumbnail hosting',
        'Resend – Transactional email for verification, confirmations, outbid alerts, winners, and admin summaries',
        'sharp – Server-side thumbnail generation to avoid hitting Vercel image optimization limits',
        'zod – Validation for API routes and forms',
        'jsonwebtoken – Secure session and vendor portal authentication flows',
        'pdf-lib – Part of the supporting toolkit for working with documents and exports',
      ],
      deployment: [
        'Vercel – Hosting for the Next.js app with environment-based configuration for demo vs production mode',
        'Supabase – Managed Postgres, Realtime, and Storage for auction data and media',
        'GitHub Actions – Automation for Supabase keep-alive pings and optional demo-reset cron',
      ],
    },
    outcome: [
      'Consolidated the core fundraiser workflows—bidding, donations, donor item management, and organizer controls—into a single system instead of scattered paper processes and ad hoc tools.',
      'Gave families a mobile-first way to move from onboarding to active bidding with clear feedback and real-time updates during the event.',
      'Gave organizers structured controls for auction timing, item oversight, QR access, and automated closeout emails, reducing manual work at the deadline.',
      'Turned the production build into a portfolio-safe demo deployment that mirrors the real event behavior without exposing live data or payments.',
    ],
    screenshots: [
      'Auction catalog and item grid showing categories and current bids',
      'Item detail and bidding screen with alias-based bid history and next-minimum bid',
      'Admin dashboard with item list, deadline controls, QR tools, and closeout actions',
    ],
    challenges: [
      'Designing a privacy model that kept public bidding activity visible and fun while ensuring bidder emails and personal details never appeared on client-facing views—aliases are resolved on the server and only anonymized data is exposed.',
      'Engineering for real event conditions rather than perfect desktop browsing, including handling weak connections, retries, and timeouts so bidders on mobile devices could continue participating without losing state.',
      'Managing image performance and cost by generating and serving Supabase-hosted thumbnails, with Next.js image optimization disabled to avoid free-tier transformation limits when many items were visible at once.',
      'Balancing production requirements with a safe demo story by adding a dedicated demo schema, email suppression, and a reset workflow so the same codebase can power both live fundraisers and portfolio showcases.',
    ],
  },

  'bill-planner': {
    title: 'Bill Planner',
    description:
      'Bill and income planning app that helps you map expenses onto income periods and see cashflow before the month starts.',
    imageUrl: '/images/screely-llambda.png',
    link: null,
    githubRepo: 'stepweaver/weaver-bill-planner',
    tags: ['Budgeting', 'Planning', 'Neon', 'Drizzle'],
    overview:
      "Bill Planner is a small, opinionated budgeting tool built to solve a specific pain I kept running into: I could see my list of bills and I could see my bank balance, but I could not see, in one place, how each deposit was actually going to cover specific bills over the month. General-purpose budgeting apps tend to focus on categories and envelopes; banks focus on cleared transactions. I needed a concrete scheduler—a way to plan the month by mapping bills directly onto income events and then keep that plan honest as payments move from \"scheduled\" to \"pending\" to \"paid.\" Bill Planner gives me that surface: a month view broken into income periods, color-coded across the calendar and bill lists, with a simple status pipeline and HUD so I can see what is due, what is in-flight, and what has cleared before I commit to new spending.",
    problem:
      "Planning around the timing of income and bills is harder than it looks on paper. Bills land on different days, income deposits can move around by holidays, and some expenses drift between months. Traditional budgeting tools help you think in categories, but they rarely help you answer the concrete questions that matter week to week: \"Will this income period actually cover the mortgage, utilities, and car payment?\", \"If I move this bill forward, what does it do to the next income period?\", \"What is still only scheduled versus actually pending at the bank?\". In practice, that meant juggling a calendar, a spreadsheet, my bank app, and mental math. Without a purpose-built view, it was easy to double-commit the same income, lose track of which bills were merely scheduled versus truly paid, and end up surprised by cash timing even if the yearly budget was fine.",
    role:
      'I acted as solo product designer and full-stack engineer. I defined the domain model around months, income events, bills, templates, and a single household ledger; designed the paycheck-window UX and status pipeline so the app mirrors how cash actually moves; implemented the Next.js 16 App Router application, server actions, and dashboard components; set up Neon Postgres with Drizzle ORM for schema and migrations; wired Auth.js with a credentials-based login, basic rate limiting, and environment-driven credentials; and documented the setup and deployment path so the app can run on Vercel backed by Neon with a straightforward local development story.',
    solution:
      'Bill Planner organizes everything around a single open month and its income periods. When you sign in, you either land on the open month or create one from the months list. For that month, you add income events with dates and amounts; the app turns those into income windows and uses them to group bills. As you add bills—with due dates, planned amounts, links, and notes—they are automatically slotted into the appropriate window based on timing. From there, you review each window, confirm which bills that income will cover, and manually reassign anything that should move. As you schedule and pay bills in your bank, you move them through a simple status pipeline (`scheduled` → `pending` → `paid`) so the month view always reflects reality. A HUD at the top of the month shows expected vs actual income, planned vs paid expenses, remaining totals per income window, leftover cash, and counts of overdue or unassigned bills. When the month is done, you close it and seed the next month from templates so you start from a realistic baseline instead of a blank page.',
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
      'Designing a bill status pipeline that matches the real-world lifecycle of payments—especially the distinction between \"scheduled\" and \"pending\"—without adding so much complexity that the tool feels heavyweight.',
      'Building a templates system flexible enough to handle monthly, specific-date, and multi-weekday-in-month patterns without introducing a separate rule engine that would be hard to maintain.',
      'Staying intentionally scoped to a single default Household ledger and environment-driven credentials for the MVP, while leaving room in the schema and code paths for future multi-ledger or richer auth without painting the project into a corner.',
    ],
  },

  'orthodontic-tracker': {
    title: 'Orthodontic / Expansion Tracker',
    description:
      'Family health tool for tracking orthodontic expander turns, visit notes, and treatment progress with a shared, phone-friendly tracker.',
    imageUrl: '/images/screely-llambda.png',
    link: null,
    githubRepo: 'stepweaver/spread-turn-tracker',
    tags: ['Health', 'Family Tools'],
    overview:
      'The Orthodontic / Expansion Tracker is a small, focused web app I built to keep our family’s orthodontic appliance turns and visits from falling through the cracks. Instead of relying on memory, sticky notes, or scattered text messages, it gives us a single shared place to log turns, record visit notes, and see at a glance where we are in the treatment plan.',
    problem:
      'Orthodontic expansion is repetitive and time-bound: turn the appliance a specific number of times, on a specific cadence, for weeks or months. In practice, that meant trying to remember “Did we turn it this morning?”, re-reading paper instructions, and digging through texts after each appointment. There was no shared record for caregivers, no clear sense of how many turns remained, and no easy way to look back at what the orthodontist said three visits ago.',
    role:
      'I designed and built the tracker end-to-end: modeling the Supabase tables for users, settings, turns, and treatment notes; wiring a small set of Node/Vercel API routes for auth and CRUD; and creating a mobile-first front-end that feels at home on a phone home screen. I also tuned the flows so that real daily usage—logging turns, skimming history, and capturing visit notes—stays fast and low-friction for non-technical family members.',
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
      'Made it much easier to walk into visits with context—recent turns, notes, and a sense of overall progress—rather than trying to reconstruct events from memory.',
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
    imageUrl: '/images/screely-llambda.png',
    link: null,
    githubRepo: 'stepweaver/heartland-heating-air',
    tags: ['Web Development', 'SEO', 'Agency Demo', 'Vanilla JS'],
    isAgencySubcontract: true,
    overview:
      'λlambda Heating & Air is a reusable local-service SEO demo adapted from a real client implementation. Instead of hand-authoring dozens of “service in city” pages, the site models locations, services, and business details as structured data and uses a Node script to generate SEO landing pages and a sitemap. On top of that content layer, it adds a simple, fast frontend, Express-based form handling, and email notifications so the system feels like a working lead-generation website—not just a static design.',
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
      'Lightweight frontend: Vanilla JavaScript components for navbar, hero, footers, and content sections—easy to understand, fork, and re-skin for other service businesses.',
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
        'Working with Stephen, we were able to turn a one-off local-service website into a reusable pattern—dynamic pages, clean lead flows, and a structure we could adapt for other clients.',
      attribution: 'Agency partner',
      role: 'Digital lead-generation & web projects',
    },
  },
};

export function getProjectBySlug(slug) {
  return PROJECTS_DATA[slug] || null;
}

