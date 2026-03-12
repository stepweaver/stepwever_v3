export const PROJECTS_DATA = {
  'soap-stache': {
    title: 'Soap Stache',
    description:
      'A modern e-commerce platform for handcrafted soaps, built with Next.js, Sanity CMS, and Stripe payments. This project features a beautiful, responsive design with Michigan pride themes and comprehensive product management.',
    imageUrl: '/images/screely-stache.png',
    link: 'https://app-soap-stache.vercel.app/',
    tags: ['E-commerce', 'Next.js', 'Sanity CMS', 'Stripe'],
    problem:
      'A handcrafted soap maker needed a modern e-commerce solution to sell online with two key requirements: non-technical content management (product photos, descriptions, pricing, inventory) and secure, PCI-compliant payment processing. The site had to support local Michigan branding, featured product sections, and real-time updates without developer involvement for every product change.',
    role:
      'Solo full-stack developer: architecting and building the entire platform-Next.js frontend, Sanity Studio CMS, Stripe integration, checkout flow, API routes, and deployment. Designed the product schema (grit level, scent profile, featured/hero flags) and built the CartContext for persistent cart state.',
    solution:
      'I built a dual-repo architecture: app-soap-stache (Next.js 15 frontend) and studio-soap-stache (Sanity CMS). The frontend uses App Router for dynamic product pages, React Context for cart state, and Stripe Checkout for payments. Sanity serves as the headless CMS with a custom soapType schema (grit, scent, availability, featured flags). Webhooks handle order confirmation and inventory updates. Tailwind CSS 4 powers the mobile-first design with Michigan pride theming.',
    outcome: [
      'Content autonomy: Client manages products, photos, and inventory via Sanity Studio-no code deploys for catalog changes',
      'Conversion-ready: Full cart, Stripe Checkout, and order confirmation flow with webhook handling',
      'Performance: Next.js App Router, code splitting, Sanity image transformation, and CDN delivery',
      'Security: Environment-based secrets, PCI-compliant Stripe, Sanity role-based access, input validation',
    ],
    features: [
      'Modern E-commerce: Complete shopping cart and checkout experience',
      'Content Management: Sanity CMS for easy product and content management',
      'Payment Processing: Secure Stripe integration for payments',
      'Responsive Design: Mobile-first design with Tailwind CSS',
      'Product Management: Advanced product catalog with categories, pricing, and inventory',
      'Michigan Pride: Local branding and themed content',
      'Real-time Updates: Live content updates through Sanity',
      'SEO Optimized: Next.js App Router with optimized performance',
    ],
    techStack: {
      frontend: [
        'Next.js 15 - React framework with App Router',
        'React 19 - Latest React with concurrent features',
        'Tailwind CSS 4 - Utility-first CSS framework',
        'React Icons - Icon library for UI elements',
      ],
      backend: [
        'Sanity CMS - Headless content management system',
        'Sanity Studio - Content editing interface',
        'Sanity Client - JavaScript client for content queries',
        'Sanity Image URL - Image optimization and transformation',
      ],
      payment: [
        'Stripe - Payment processing and checkout',
        'Stripe.js - Client-side payment integration',
      ],
      development: [
        'ESLint - Code linting and formatting',
        'PostCSS - CSS processing',
        'Turbopack - Fast bundler for development',
      ],
    },
    projectStructure: `soap-stache/
├── app-soap-stache/          # Next.js frontend application
│   ├── app/                  # Next.js App Router pages
│   │   ├── about/           # About page
│   │   ├── api/             # API routes (Stripe webhooks, checkout)
│   │   ├── cart/            # Shopping cart page
│   │   ├── contact/         # Contact page
│   │   ├── products/        # Product pages
│   │   └── success/         # Order success page
│   ├── components/          # React components
│   │   ├── layout/          # Layout components (Navbar, Footer, Hero)
│   │   ├── ui/              # Reusable UI components
│   │   └── [feature]/       # Feature-specific components
│   ├── contexts/            # React contexts (CartContext)
│   ├── lib/                 # Utility libraries
│   │   ├── sanity.js        # Sanity client configuration
│   │   ├── stripe.js        # Stripe client configuration
│   │   └── stripe-server.js # Server-side Stripe utilities
│   └── public/              # Static assets
└── studio-soap-stache/      # Sanity Studio (CMS)
    ├── schemaTypes/         # Content schemas
    │   ├── soapType.js      # Product schema
    │   └── subscriberType.js # Newsletter subscriber schema
    └── sanity.config.js     # Sanity configuration`,
    contentManagement: {
      productSchema: [
        'Basic Info: Title, slug, description, blurb',
        'Pricing: Price with validation',
        'Media: Product photos with hotspot functionality',
        'Status: New product badges, availability toggle',
        'Display: Featured/Hero product designation',
        'Details: Grit level (0-5), scent profile',
        'Metadata: Launch date, ordering',
      ],
      contentTypes: [
        {
          name: 'Soap Products (soapType.js)',
          features: [
            'Complete product catalog management',
            'Image optimization and transformation',
            'Inventory and availability tracking',
            'Special display status (Featured/Hero)',
          ],
        },
        {
          name: 'Newsletter Subscribers (subscriberType.js)',
          features: [
            'Email subscription management',
            'Marketing list integration',
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
        'Cart total calculation',
      ],
      checkout: [
        'Stripe Checkout integration',
        'Secure payment processing',
        'Order confirmation',
        'Webhook handling for order updates',
      ],
      productManagement: [
        'Dynamic product pages with Next.js dynamic routes',
        'Product filtering and search',
        'Inventory tracking',
        'Featured product sections',
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
      'A demo website for a fictional orthodontic practice. The live site (lambdaortho.vercel.app) combines marketing information with scheduling tools to showcase web-development skills. A banner at the top of each page invites prospective patients and referring dentists to engage. The site is responsive, has a clean, professional aesthetic and uses modern colours and icons. Built with vanilla JavaScript and Express.js, it uses modular components, client-side routing, and centralised data-all forms are demo-only and log submissions rather than sending emails.',
    imageUrl: '/images/screely-lambda.png',
    link: 'https://lambdaortho.vercel.app/',
    githubRepo: 'stepweaver/myers-vanilla',
    tags: ['Web Development', 'Healthcare', 'Forms'],
    isAgencySubcontract: true,
    overview:
      'Lambda Orthodontics is presented as a demo website for a fictional orthodontic practice. The live site combines marketing information with scheduling tools to show off web-development skills. The navigation bar leads users to pages about the practice, treatments, process, scheduling, reviews, team, careers, contact, a patient portal and referrals. The README describes the project as a demo built with vanilla JavaScript and Express.js; it claims the forms are demo only and log submissions rather than sending emails. Site content (contact information, treatment descriptions, process steps and job listings) is centralised in public/siteData.js, allowing content updates without modifying component logic.',
    problem:
      'A demo website was needed to showcase orthodontic practice marketing and scheduling capabilities. The site had to present a professional, responsive experience with multiple interactive forms-all for demonstration purposes, logging submissions rather than performing backend actions.',
    role:
      'As the frontend developer, I built the responsive website interface, implemented the custom client-side Router, created modular component architecture with vanilla JavaScript, centralised content in siteData.js, and implemented form validation and user feedback across all demo forms.',
    solution:
      'I built a single-page application using vanilla JavaScript and Express.js. The front-end uses ES6 modules with a component pattern (create… and init… functions), a custom Router class for client-side routing with scroll restoration, and centralised siteData.js for all content. The Express server serves static files only; there are no dynamic API endpoints. All forms-contact, schedule, referral, job applications, patient portal login, and newsletter signup-validate input, show loading states, log to console, and display success or error messages.',
    outcome: [
      'Professional design: Polished, responsive site with coherent colour palette and modern icons',
      'Comprehensive content: Pages cover practice story, treatments, process, team, testimonials, careers, patient portal, and referrals',
      'User-friendly navigation: Sticky nav bar and client-side routing for seamless page transitions',
      'Modular architecture: Centralised data and component-based structure for maintainability',
      'Clear demo purpose: All forms explicitly documented as non-functional with visible disclaimers',
    ],
    features: [
      'Responsive design with modern UI/UX and professional aesthetic',
      'Client-side routing: Custom Router class maps paths to page-render functions with scroll restoration',
      'Modular components: ES6 modules emulate component-based architecture without a framework',
      'Centralised data: siteData.js holds contact info, treatments, process steps, job listings-content updates without touching component logic',
      'Dynamic treatment pages: /treatments/[slug] routes for detailed treatment info (benefits, pros/cons, process, candidates)',
      'Dynamic job pages: Careers section with detail pages for each position and application forms',
      'Demo forms: Contact, schedule, referral, job applications, patient portal login, newsletter signup-all log submissions and show success/error messages',
      'Form validation: HTML validation plus client-side checks; missing fields prompt users to call the office',
    ],
    techStack: {
      frontend: [
        'Vanilla JavaScript (ES6 modules) - No React or framework',
        'Custom Router.js - Client-side routing, link interception, history API, scroll restoration',
        'Component pattern - create… functions return HTML; init… functions attach event handlers',
        'CSS with custom properties',
        'Lucide Icons (or similar icon library)',
      ],
      backend: [
        'Node.js',
        'Express.js - Serves static files from public/ only; no API endpoints or database',
      ],
      deployment: [
        'Vercel (lambdaortho.vercel.app) - Live demo site',
        'Railway or similar - Server listens on port 3000 (configurable via environment variables)',
      ],
    },
    projectStructure: `lambda-orthodontics/ (stepweaver/myers-vanilla)
├── app.js                 # Express entry point; serves static files from public/
├── package.json           # Dependencies and scripts (npm run dev, npm start)
├── public/                # Static files
│   ├── index.html         # Main HTML file
│   ├── main.js            # JavaScript entry point
│   ├── Router.js          # Client-side router; maps paths to page-render functions; scroll restoration
│   ├── siteData.js        # Centralised content (contact, treatments, process, jobs)
│   ├── styles.css         # Global styles
│   ├── components/        # Modular components (Hero.js, SchedulePage.js, etc.)
│   └── images/            # Image assets
└── .gitignore             # Git ignore rules`,
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
  },
  'rpg-dice-roller': {
    title: 'RPG Dice Roller',
    description:
      'A functional demonstration of interactive UI design for tabletop RPGs within the λstepweaver portfolio. Fully client-side: all rolls and history are saved locally in the browser, so no data is transmitted to a server. Embedded at stepweaver.dev/dice-roller alongside About, Resume, Codex, Meshtastic, Terminal and Contact.',
    imageUrl: '/images/screely-dice.png',
    link: '/dice-roller',
    tags: ['Web Development', 'Gaming', 'Interactive', 'Terminal'],
    overview:
      'Within the λstepweaver portfolio, the Dice Roller stands out as a functional demonstration of interactive UI design for tabletop role-playing games. The application is fully client-side: all rolls and history are saved locally in the browser, so no data is transmitted to a server. It is embedded at stepweaver.dev/dice-roller and sits alongside other portfolio pages. The tool aims to provide a fast and flexible way to roll complex dice pools with the ability to hold individual dice for re-rolls and to track results over time. Keyboard shortcuts (e.g. hitting Enter to roll) are supported for speed.',
    problem:
      'Tabletop RPG players needed a digital dice rolling tool that supports complex dice notation, tracks roll history, and integrates seamlessly with the terminal aesthetic.',
    role:
      'As the full-stack developer, I built the entire dice rolling application including the rolling engine, UI components, terminal integration, and localStorage persistence.',
    solution:
      'I built a comprehensive dice rolling app with support for multiple dice types, modifiers, roll history, keyboard shortcuts, and terminal integration. The app features smooth animations and a responsive design.',
    outcome: [
      'Faster workflow: Quick dice rolling with keyboard shortcuts',
      'Better UX: Intuitive interface with visual feedback and animations',
      'Enhanced functionality: Terminal integration for seamless workflow',
      'Improved usability: Roll history and copy-to-clipboard features',
    ],
    keyFeatures: [
      {
        title: 'Dice pool builder',
        description: 'Users construct custom dice pools by clicking icons for d4, d6, d8, d10, d12, d20 and d100. Each click increments the count. The pool displays the current formula (e.g. [2d20] × [1d6]) before rolling. Adjacent + and – buttons adjust the global modifier; a text field lets users annotate the roll (e.g. "Attack roll - Initiative").',
      },
      {
        title: 'Roll engine with hold & reroll',
        description: 'Pressing Roll (or Enter) generates random results for each die. Results display with the roll total; a copy button copies notation and outcome. The Hold & reroll module: clicking a result locks that die so it is preserved on the next roll while remaining dice are rerolled. Useful for advantage/disadvantage or exploding dice mechanics.',
      },
      {
        title: 'Persistent history module',
        description: 'Saves every roll to local storage with a timestamp and notation. The history table shows recent rolls and totals. Reset button clears the current pool and starts over.',
      },
      {
        title: 'User guidance and UI polish',
        description: 'Quick Start sidebar provides step-by-step instructions. Sys.BRIEF panel summarizes the tool\'s purpose. Retro terminal aesthetic matches λstepweaver branding. Invert toggle in the navigation bar switches between light and dark themes.',
      },
      {
        title: 'Accessibility and extras',
        description: 'Keyboard shortcuts (Enter to roll); notes field for annotating rolls; copy button for clipboard sharing; persistent local storage; no external dependencies-all computation occurs client-side for privacy and speed.',
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
      'The Dice Roller illustrates λstepweaver\'s ability to craft thoughtful, interactive tools within a modern web framework. It balances usability (Quick Start, persistent history) with advanced features (hold & reroll, notations and notes). Updating the repository documentation to showcase this tool would enhance transparency and enable potential collaborators to explore, extend or reuse the component. Further improvements-such as input-driven dice quantities, explicit module toggles and accessibility refinements-could elevate the user experience even further.',
    features: [
      'Multiple Dice Types: Support for d4, d6, d8, d10, d12, d20, and d100',
      'Flexible Pool Building: Add any combination of dice with custom quantities',
      'Modifiers: Add positive or negative modifiers to your rolls',
      'Roll Breakdown: See individual die results and subtotals by dice type',
      'Roll History: Last 10 rolls saved with timestamps (persisted in localStorage)',
      'Copy to Clipboard: Copy dice notation for sharing or documentation',
      'Keyboard Shortcuts: ENTER to roll, C to copy, R to reset, ESC to clear',
      'Randomized Colors: Each die type gets a random color from the terminal palette',
      'Smooth Animations: Dice roll animation with shake/tumble effect',
      'Responsive Design: Works on desktop, tablet, and mobile',
      'Terminal Integration: Roll dice directly from the terminal with `roll` command',
      'Roll Comments: Tag your rolls with notes like "Attack roll" or "Initiative"',
      'Dice Tray: Hold specific dice and re-roll others (Yahtzee-style) - click dice to hold them, then re-roll the rest',
    ],
    techStack: {
      frontend: [
        'Next.js 15 - App Router',
        'React 19 - Component-based UI',
        'Tailwind CSS - Styling',
        'Lucide React Icons, React Icons',
      ],
      utilities: [
        'Custom dice rolling engine (lib/roller.js)',
        'Dice notation parser',
        'LocalStorage for history persistence',
        'Fully client-side: React state for dice pool, localStorage for history; modular component design; no backend required',
      ],
    },
    terminalIntegration: {
      description:
        'The dice roller is fully integrated into the site\'s terminal emulator! You can roll dice directly from the command line.',
      usage: [
        'Type `roll 3d6+2` to roll three 6-sided dice and add 2',
        'Type `roll 1d20` for a single d20 roll',
        'Type `roll 2d10 + 1d6 + 5` for complex rolls',
        'Type `roll advantage` for advantage rolls (2d20 keep highest)',
        'Type `roll disadvantage` for disadvantage rolls (2d20 keep lowest)',
      ],
      example: `λ roll 3d6+2
Rolling 3d6+2:
  3d6: [4, 2, 6] = 12
  Modifier: +2
Total: 14`,
    },
    keyboardShortcuts: [
      'ENTER - Roll the dice',
      'C - Copy the current roll notation',
      'R - Reset the entire dice pool',
      'ESC - Clear current results',
    ],
    diceNotation: [
      '3d6 - Roll three 6-sided dice',
      '1d20+5 - Roll one 20-sided die and add 5',
      '2d8+1d6-2 - Roll two 8-sided dice, one 6-sided die, and subtract 2',
    ],
    plannedFeatures: [
      'Advantage/Disadvantage: Enhanced support for D&D advantage/disadvantage mechanics (keep highest/lowest)',
      'Dialog Component: Embeddable dice roller for blog posts or project pages',
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
      'Strategic IT consulting services to streamline operations, optimize workflows, and help you make informed technology decisions. From technology planning to system integration, I help businesses leverage the right tools for their needs.',
    imageUrl: null,
    link: null,
    tags: ['IT Consulting', 'Strategic Planning', 'System Integration'],
    isService: true,
    serviceIntro:
      'These capabilities are available for hire. With a background as a business analyst and web developer, I bridge technical teams and stakeholders to deliver practical technology guidance.',
    problem:
      'Many businesses face unclear IT strategy, redundant systems, vendor sprawl, or difficulty coordinating between technical teams and decision-makers. Without a clear roadmap, technology investments often underdeliver.',
    role:
      'I provide technology assessments, strategic planning, system integration guidance, and ongoing consultation. Deliverables include IT audits, technology roadmaps, vendor selection analyses, and implementation support.',
    solution:
      'I offer comprehensive IT consulting including technology assessment, strategic planning, system integration, workflow optimization, vendor selection, and implementation support.',
    outcome: [
      'Improved decision-making: Data-driven technology choices aligned with business goals',
      'Better workflow: Optimized processes with the right tools and integrations',
      'Reduced costs: Elimination of redundant systems and inefficient processes',
      'Enhanced productivity: Streamlined workflows that improve team efficiency',
    ],
    features: [
      'Technology Assessment: Evaluate your current systems and identify opportunities for improvement',
      'Strategic Planning: Develop roadmaps for technology adoption and digital transformation',
      'System Integration: Connect your existing tools and platforms for seamless workflows',
      'Workflow Optimization: Analyze and improve business processes with technology solutions',
      'Vendor Selection: Help choose the right tools and platforms for your business needs',
      'Implementation Support: Guide your team through technology rollouts and training',
      'Ongoing Consultation: Regular check-ins to ensure your technology stack evolves with your business',
    ],
    benefits: [
      'Make informed technology decisions aligned with business goals',
      'Optimize operations with the right tools and integrations',
      'Reduce technology costs by eliminating redundant systems',
      'Improve team productivity with streamlined workflows',
    ],
    exampleUseCases: [
      'IT audit for a small business that identified security gaps and redundant SaaS subscriptions, leading to a consolidated stack and cost savings',
      'Technology roadmap for a growing team that outlined phased adoption of project management and CRM tools with clear migration paths',
    ],
    process: [
      'Discovery: Understand your current systems, pain points, and business objectives',
      'Analysis: Identify gaps, inefficiencies, and opportunities for improvement',
      'Recommendation: Provide strategic recommendations with clear implementation paths',
      'Implementation: Support rollout and ensure successful adoption',
      'Optimization: Ongoing refinement to maximize value from your technology investments',
    ],
    techStack: {
      consulting: [
        'Technology Assessment & Audits',
        'System Integration Planning',
        'Workflow Analysis & Optimization',
        'Infrastructure Design',
        'Security Best Practices',
        'Scalability Architecture',
      ],
    },
  },
  'n8n-automations': {
    title: 'n8n Automations',
    description:
      'Custom automation workflows built with n8n to connect your apps and eliminate manual tasks. From simple data transfers to complex multi-step processes, I build reliable automations that save time and reduce errors.',
    imageUrl: null,
    link: null,
    tags: ['Automation', 'n8n', 'Workflow Integration'],
    isService: true,
    serviceIntro:
      'These capabilities are available for hire. I design robust n8n workflows with API integration, error handling, and monitoring-plus documentation and training so you can maintain and extend them.',
    problem:
      'Businesses struggle with repetitive manual tasks, data entry errors, and disconnected systems that require manual data transfers.',
    role:
      'I design and build custom n8n workflows to connect apps, automate processes, and eliminate manual tasks. Deliverables include workflow diagrams, documentation, and training so your team can maintain and extend automations.',
    solution:
      'I build custom n8n automation workflows that connect your apps, transform data, handle errors gracefully, and include monitoring and documentation for your team.',
    outcome: [
      'Faster workflow: Eliminated repetitive manual data entry and transfers',
      'Reduced errors: Automated processes reduce human error',
      'Better efficiency: Free up time for higher-value work',
      'Improved consistency: Data consistency across all systems',
    ],
    features: [
      'Custom Workflows: Tailored automation solutions for your specific business processes',
      'App Integration: Connect popular tools like CRM, email, accounting, and more',
      'Data Transformation: Format and transform data as it flows between systems',
      'Error Handling: Built-in error handling and retry logic for reliability',
      'Monitoring: Set up alerts and monitoring for your automation workflows',
      'Documentation: Complete documentation so your team understands how it works',
      'Maintenance: Ongoing support and updates as your needs evolve',
    ],
    benefits: [
      'Eliminate repetitive manual data entry and transfers',
      'Reduce errors from manual processes',
      'Free up time for higher-value work',
      'Ensure data consistency across all your systems',
    ],
    exampleUseCases: [
      'Newsletter sign-ups from a website form automatically synced to Mailchimp with welcome email triggers',
      'CRM and project management tools synced so new leads and opportunities flow bidirectionally; alerting pipeline for high-value deals',
    ],
    commonUseCases: [
      'Form submissions automatically create CRM records and send notifications',
      'E-commerce orders sync to inventory and accounting systems',
      'Email campaigns triggered by customer actions or events',
      'Data synchronization between multiple platforms',
      'Automated reporting and data aggregation',
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
      'AI tool integration services to enhance your workflows and boost productivity. From ChatGPT integrations to custom AI solutions, I help you leverage AI to automate tasks and improve decision-making.',
    imageUrl: null,
    link: null,
    tags: ['AI Integration', 'Machine Learning', 'Productivity'],
    isService: true,
    serviceIntro:
      'These capabilities are available for hire. I built the λlambda LLM agent on this site-a shared multi-surface AI with persistent memory, server-only prompts, and channel-aware behavior. I’m also developing λcerebro, a Postgres-backed memory layer for thoughts-capture via Slack, retrieve via MCP. Your second brain, owned by you. These can be custom-built for your needs.',
    problem:
      'Businesses want to leverage AI to automate intelligent tasks, improve customer service, and gain insights from data, but lack the technical expertise to integrate AI tools effectively.',
    role:
      'I design and implement AI solutions, integrate AI services into workflows, and build custom AI applications. Deliverables include prompt and context design, workflow integration, custom knowledge bases, and agent architectures.',
    solution:
      'I provide AI integration services including tool integration, custom AI solutions, workflow enhancement, data analysis, content generation, customer support automation, and decision support systems.',
    outcome: [
      'Automated intelligent tasks: AI handles tasks requiring human judgment',
      'Better customer service: Faster response times with AI-powered support',
      'Enhanced insights: Data analysis and reporting from large datasets',
      'Improved productivity: AI-assisted workflows boost efficiency',
    ],
    features: [
      'AI Tool Integration: Connect AI services like ChatGPT, Claude, and others to your workflows',
      'Custom AI Solutions: Build tailored AI applications for your specific business needs',
      'Workflow Enhancement: Add AI capabilities to existing processes for smarter automation',
      'Data Analysis: Use AI to analyze and extract insights from your business data',
      'Content Generation: Automate content creation for marketing, documentation, and communications',
      'Customer Support: Integrate AI chatbots and assistants for improved customer service',
      'Decision Support: AI-powered tools to help with business decisions and recommendations',
    ],
    benefits: [
      'Automate intelligent tasks that previously required human judgment',
      'Improve response times for customer inquiries and support',
      'Generate insights from large amounts of data',
      'Enhance productivity with AI-assisted workflows',
    ],
    exampleUseCases: [
      'ChatGPT integrated into a custom knowledge base for internal FAQ and support responses',
      'Agent architecture with persistent memory and context for multi-turn conversations and tool use',
    ],
    useCases: [
      'AI-powered email responses and customer support',
      'Automated content generation for marketing and documentation',
      'Intelligent data analysis and reporting',
      'AI-assisted decision-making tools',
      'Custom chatbots for websites and customer service',
      'Smart categorization and tagging of data',
    ],
    techStack: {
      ai: [
        'OpenAI API - GPT models for text generation and analysis',
        'Google AI - Vertex AI, Gemini, and other Google AI services',
        'Machine Learning Libraries - TensorFlow, PyTorch integrations',
        'Natural Language Processing - Text analysis and understanding',
        'Computer Vision - Image recognition and processing',
        'Custom Models - Train and deploy custom AI models',
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
    imageUrl: '/cerebro.png',
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
      'A personal, self-funded project that combines activism, journalism and e-commerce into a single Next.js application. The site describes itself as "a call to awareness, a chronicle of resistance"-not an organisation or political party. Its creator, a military veteran, documents the authoritarian drift in America and amplifies fact-based reporting and antifascist creators. The project is unapologetically antifascist and emphasises that silence in the face of fascism is surrender.',
    imageUrl: '/images/screely-resist.png',
    link: 'https://iamresist.org',
    tags: ['Web Development', 'Next.js', 'Notion API', 'E-commerce', 'Stripe', 'Printify', 'Supabase'],
    overview:
      'I AM [RESIST] is a personal, self-funded project that combines activism, journalism and e-commerce into a single Next.js application. The site describes itself as "a call to awareness, a chronicle of resistance"-not an organisation or political party. Its creator, a military veteran, explains that the goal of the project is to document the authoritarian drift in America and amplify fact-based reporting and antifascist creators. The project is unapologetically antifascist and emphasises that silence in the face of fascism is surrender.',
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
          'Daily Brief: rolling 24-hour trending feed of videos (Supabase + YouTube Data API) refreshed every 15 min via cron',
          'Intel feed: recent protest videos, commentary and music',
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
      'Unified content experience: One homepage and navigation for voices feed, protest music, book club, journal, and curated content',
      'Notion as CMS: Non-developers update videos, books, and journal entries via Notion; the app consumes via Notion API',
      'Voices feed: Fetches RSS per voice from Notion, p-limit for concurrency, merges with curated Notion videos, dedupes by URL, 24-hour boost for recently curated items',
      'Protest music: Dedicated feed and section driven by Notion + RSS',
      'Book club: Books and reading journal entries from Notion; dedicated pages per book and per entry',
      'Stripe Checkout: API route creates session and redirects; customer pays on Stripe-hosted page',
      'Stripe webhook: Verifies signature, handles checkout.session.completed; on success: insert order in Supabase, send confirmation email, submit to Printify',
      'Printify integration: Provider class for create order and status; Printify webhook updates fulfillment status in DB; retry logic for API calls',
      'Order status: Customers view order details and status via orders page backed by Supabase',
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
        'Supabase - Trending video table for Daily Brief; cron job refreshes every 15 min via Vercel cron',
        'RSS (e.g. Libsyn) - Parsed and merged with Notion data',
        'Feed services: voicesFeed.service, protestMusicFeed.service, unifiedArchive.service',
        'p-limit for concurrency; Promise.allSettled so one failed feed does not break the rest',
        'Fallback to default list until Supabase table is populated',
      ],
      ecommerce: [
        'Stripe - Payment processing',
        'Printify - Product fulfillment; PRINTIFY_API_TOKEN, PRINTIFY_SHOP_ID, PRINTIFY_PRODUCT_ID_*',
        'Two main stickers by default',
      ],
      development: [
        'Vercel - Static site generation, edge functions, cron jobs',
        'Cron: CRON_SECRET for cron route; runs every 15 min to refresh Daily Brief',
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
  },
  'mishawaka-shower-booking': {
    title: 'Mishawaka Shower Booking System',
    description:
      'A zero-cost, zero-infrastructure self-service shower booking system built entirely with Google Apps Script. Solves the \'people waiting around all day\' problem by letting users book specific time slots from their phones, leave, and return within 10 minutes of their scheduled time.',
    imageUrl: '/images/screely-shower-booking.png',
    link: 'https://github.com/stepweaver/mishawaka-shower-booking',
    tags: ['Google Apps Script', 'PWA', 'Community Service', 'Zero Infrastructure'],
    problem:
      'The Mishawaka Food Pantry had to discontinue shower services because homeless individuals were waiting around all day hoping to get a shower. This created safety concerns, resource strain, and forced the pantry to stop offering showers entirely.',
    role:
      'As the full-stack developer, I built the entire booking system including the Google Apps Script backend, mobile-first PWA frontend, admin dashboard, automated triggers, and comprehensive documentation.',
    solution:
      'I built a complete booking system entirely within Google Apps Script, deployed as a web app. Users book time slots from their phones, receive confirmation codes, and can leave immediately. They return within 10 minutes of their scheduled time to check in. The system includes auto-expiration of unclaimed slots, server-side caching for performance, and a staff dashboard for management.',
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
    projectStructure: `mishawaka-shower-booking/
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
├── SIGNAGE.html             # Printable sign with QR code placeholder
│
├── README.md                # Comprehensive documentation
├── SETUP_GUIDE.md           # Step-by-step setup instructions
└── CASE_STUDY.md            # Detailed case study`,
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
  },

  'llambda-llm-agent': {
    title: 'λlambda LLM Agent',
    description:
      "A portfolio-native LLM agent designed and built for λstepweaver. λlambda acts as Stephen Weaver's AI advocate and thinking partner, helping visitors understand his background, skills, projects, and working style through a shared chat system available in both the website UI and the terminal interface.",
    imageUrl: '/images/lambda_preview.png',
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
        'The public project catalog does not yet include λlambda as a dedicated case-study entry',
        'The chat experience would benefit from analytics tied to real visitor intent and conversion outcomes',
        'A retrieval layer or structured knowledge source could make responses more maintainable as the site grows',
        'Conversation memory is intentionally constrained to public prompt context; richer source-grounded answers would require a formal content indexing layer',
      ],
    },

    plannedFeatures: [
      'Add a dedicated λlambda project page to the portfolio project system',
      'Connect λlambda to a structured project/content knowledge layer instead of prompt-only public context',
      'Add conversation analytics around common questions, exit points, and conversion paths',
      'Expand multimodal support and source-grounded responses where appropriate',
      'Route high-intent conversations more directly into contact and lead-capture workflows',
    ],

    conclusion:
      "λlambda turns a personal portfolio into an interactive discovery system. Instead of asking visitors to decode a résumé, skim a project archive, and guess fit on their own, the site gives them a focused AI interface that can explain Stephen's work, route them to the right proof, and stay aligned with the λstepweaver voice. Technically, the project succeeds because it treats the agent as productized infrastructure: shared multi-surface architecture, server-only prompt discipline, and channel-specific behavior through one protected route. The terminal shell is client-side; the AI is not-the chat command explicitly posts to /api/chat. That distinction keeps the implementation honest and makes clear that this is built, not pasted in.",
  },
};

export function getProjectBySlug(slug) {
  return PROJECTS_DATA[slug] || null;
}

