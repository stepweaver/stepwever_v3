export const PROJECTS_DATA = {
  'soap-stache': {
    title: 'Soap Stache',
    description:
      'A modern e-commerce platform for handcrafted soaps, built with Next.js, Sanity CMS, and Stripe payments. This project features a beautiful, responsive design with Michigan pride themes and comprehensive product management.',
    imageUrl: '/images/screely-stache.png',
    link: 'https://app-soap-stache.vercel.app/',
    tags: ['E-commerce', 'Next.js', 'Sanity CMS', 'Stripe'],
    problem:
      'The client needed a modern e-commerce solution to sell handcrafted soaps online with easy content management and secure payment processing.',
    role:
      'As the full-stack developer, I was responsible for building the entire e-commerce platform including frontend, backend integration, CMS setup, and payment processing.',
    solution:
      'I built a complete Next.js e-commerce platform with Sanity CMS for content management and Stripe for secure payments. The solution includes a shopping cart, checkout flow, product catalog, and real-time content updates.',
    outcome: [
      'Improved workflow: Easy product management through Sanity CMS',
      'Better UX: Modern, responsive design with smooth shopping experience',
      'Enhanced performance: Fast loading times with Next.js optimization',
      'Secure payments: PCI-compliant Stripe integration',
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
      'A modern, responsive demo website for Lambda Orthodontics built with vanilla JavaScript and Express.js.',
    imageUrl: '/images/screely-lambda.png',
    link: 'https://lambdaortho.vercel.app/',
    tags: ['Web Development', 'Healthcare', 'Forms'],
    isAgencySubcontract: true,
    problem:
      'The client needed a modern, professional website for their orthodontic practice with functional contact forms and appointment scheduling capabilities.',
    role:
      'As the frontend developer, I was responsible for building the responsive website interface, implementing form validation, and creating a clean, professional design.',
    solution:
      'I built a responsive website with vanilla JavaScript and Express.js, featuring three fully functional demo forms (contact, referral, and appointment scheduling) with validation and user feedback.',
    outcome: [
      'Better UX: Clean, professional design matching the practice brand',
      'Improved workflow: Functional forms for patient inquiries and appointments',
      'Fast performance: Lightweight vanilla JavaScript implementation',
      'Clear brand presence: Modern design that represents the practice well',
    ],
    features: [
      'Responsive design with modern UI/UX',
      'Demo contact, referral, and appointment scheduling forms',
      'Clean, professional design matching the orthodontic practice brand',
      'Fast loading with vanilla JavaScript (no heavy frameworks)',
      'Form validation and user feedback',
      'Demo functionality - forms log submissions and show success messages',
    ],
    techStack: {
      frontend: [
        'Vanilla JavaScript (ES6 modules)',
        'CSS with custom properties',
        'Lucide Icons',
      ],
      backend: [
        'Node.js',
        'Express.js',
      ],
    },
    projectStructure: `lambda-orthodontics/
├── app.js                 # Express server entry point
├── package.json           # Dependencies and scripts
├── public/               # Static files
│   ├── index.html        # Main HTML file
│   ├── main.js           # JavaScript entry point
│   ├── siteData.js       # Site content data
│   ├── styles.css        # Global styles
│   ├── components/       # React-like components
│   └── images/           # Image assets
└── .gitignore           # Git ignore rules`,
    demoForms: [
      {
        name: 'Contact Form',
        description: 'General inquiries with demo success messages',
      },
      {
        name: 'Referral Form',
        description: 'Professional referral submissions for dentists',
      },
      {
        name: 'Schedule Consultation Form',
        description: 'Appointment requests with demo success messages',
      },
    ],
    formFeatures: [
      'Validates user input',
      'Shows loading states',
      'Displays success messages',
      'Logs submissions to console',
      'Resets after successful submission',
    ],
  },
  'rpg-dice-roller': {
    title: 'RPG Dice Roller',
    description:
      'A full-featured dice rolling application for tabletop RPG sessions, built with Next.js and styled to match the stepweaver terminal aesthetic. Features terminal integration - roll dice directly from the command line!',
    imageUrl: '/images/screely-dice.png',
    link: '/dice-roller',
    tags: ['Web Development', 'Gaming', 'Interactive', 'Terminal'],
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
        'Next.js - React framework',
        'React - Component-based UI',
        'Tailwind CSS - Styling',
      ],
      utilities: [
        'Custom dice rolling engine (lib/roller.js)',
        'Dice notation parser',
        'LocalStorage for history persistence',
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
    title: 'Neon Profile Card',
    description:
      'A glowing digital ID card experience inspired by the NETRUNNER Neon Profile Card concept. Rebuilt in the CRT aesthetic with Tailwind CSS, Lucide icons, and reusable React components with client-side state management for animated Matrix Sync terminal sequence.',
    imageUrl: '/images/screely-profilcard.png',
    link: 'https://codenhack.com/projects/neon-profile-card',
    tags: ['UI Design', 'Tailwind CSS', 'Animation'],
    problem:
      'The project needed a reusable, visually striking profile card component that matches the CRT aesthetic and includes animated terminal sequences.',
    role:
      'As the frontend developer and designer, I was responsible for building the React component, implementing the glassmorphism design, and creating the animated Matrix Sync terminal sequence.',
    solution:
      'I built a reusable NeonProfileCard React component with glassmorphism styling, animated status indicators, and client-side state management for the Matrix Sync terminal animation. The component is fully responsive and accessible.',
    outcome: [
      'Better UX: Visually striking component with smooth animations',
      'Improved reusability: Easy to customize with different profile data',
      'Enhanced accessibility: Screen reader support and semantic HTML',
      'Clear brand presence: Matches the CRT aesthetic perfectly',
    ],
    features: [
      'Glassmorphism container with layered neon gradients and CRT scanline vibes',
      'Semantic layout that separates header, profile, information grid, and footer',
      'Animated active status indicator with accessible pulse effect',
      'Reusable data model so avatar/name/fields can be swapped without touching markup',
      'Animated Matrix Sync terminal with React state management showing automated connection attempt sequence',
      'Responsive stacking that keeps the grid legible down to 320px wide',
    ],
    techStack: {
      frontend: [
        'Next.js 15 App Router page for `/projects/[slug]`',
        'React server component with optional client usage',
        'Tailwind CSS v4 arbitrary values for gradients and glow layers',
      ],
      design: [
        'Lucide React icon set (ShieldCheck, Activity, QrCode)',
        'Glassmorphism overlays composed with Tailwind arbitrary backgrounds',
        'IBM 3270 for headers and OCR-A for body copy per site typography rules',
      ],
      utilities: [
        'PROJECTS_DATA registry for metadata-driven project pages',
        'Demo component registry that injects showcase UI by slug',
        'Re-usable profile data shape for rapid customization',
      ],
    },
    demoHighlights: [
      'Self-contained `NeonProfileCard` React component-just swap the profile prop to reskin it',
      'Accessible status indicator and label/value pairs for screen readers',
      'Client-side React hooks for automated Matrix Sync terminal animation sequence',
      'Tailwind CSS v4 for styling with React component architecture',
    ],
    projectStructure: `neon-profile-card/
├── components/
│   └── NeonProfileCard/
│       └── NeonProfileCard.jsx   # Standalone glowing ID card component
└── app/
    └── projects/
        └── [slug]/page.jsx      # Adds demo injection based on slug`,
    designSystem: {
      components: [
        'NeonProfileCard - glassy, glowing ID card',
        'Demo showcase section on the project detail page',
        'Status chips and label/value info tiles that can be reused elsewhere',
      ],
      styling: [
        'Transparent containers layered over the BackgroundCanvas',
        'Neon green + magenta gradients with CRT glow shadows',
        'Fully responsive flex + grid composition with Tailwind utilities',
      ],
    },
    performance: [
      'Zero extra JavaScript-animations handled with CSS keyframes already in the theme',
      'Shared fonts and color tokens mean no additional network requests',
      'Component renders as static HTML so it can be inlined by the server',
    ],
    security: [
      'External inspiration link opens in a hardened `_blank` tab with `rel="noopener noreferrer"`',
      'Static showcase component-no runtime inputs to sanitize',
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
    problem:
      'Businesses need strategic guidance to make informed technology decisions, optimize their systems, and integrate tools effectively.',
    role:
      'As an IT consultant, I provide technology assessments, strategic planning, system integration guidance, and ongoing consultation to help businesses leverage technology effectively.',
    solution:
      'I offer comprehensive IT consulting services including technology assessment, strategic planning, system integration, workflow optimization, vendor selection, and implementation support.',
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
    problem:
      'Businesses struggle with repetitive manual tasks, data entry errors, and disconnected systems that require manual data transfers.',
    role:
      'As an automation specialist, I design and build custom n8n workflows to connect apps, automate processes, and eliminate manual tasks.',
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
    problem:
      'Businesses want to leverage AI to automate intelligent tasks, improve customer service, and gain insights from data, but lack the technical expertise to integrate AI tools effectively.',
    role:
      'As an AI integration specialist, I design and implement AI solutions, integrate AI services into workflows, and build custom AI applications for specific business needs.',
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
    problem:
      'Businesses need accurate website analytics to understand visitor behavior, track conversions, and make data-driven decisions, but struggle with proper setup and configuration.',
    role:
      'As an analytics specialist, I set up and configure Google Analytics, create custom dashboards, implement event tracking, and train teams on using analytics effectively.',
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
        'Google Data Studio - Custom reporting and dashboards',
        'Event Tracking - Custom event implementation',
        'E-commerce Tracking - Enhanced e-commerce setup',
        'Conversion Tracking - Goal and conversion optimization',
      ],
    },
  },
  'iam-resist': {
    title: 'I AM [RESIST]',
    description:
      'A powerful personal journal and archive documenting America\'s authoritarian drift, built with Next.js 15 and Notion as a headless CMS. Features automatic YouTube RSS feed integration, rich content management, and a bold constructivist-inspired design system.',
    imageUrl: '/images/screely-resist.png',
    link: 'https://iamresist.org',
    tags: ['Web Development', 'Headless CMS', 'Notion API', 'RSS Integration', 'Next.js'],
    problem:
      'The project needed a content management system that allows publishing from mobile/desktop without deployment, automatic YouTube content aggregation, and rich content support with multiple content types.',
    role:
      'As the full-stack developer, I built the entire platform including Notion CMS integration, YouTube RSS feed aggregation, content management system, and the constructivist-inspired design.',
    solution:
      'I built a Next.js platform using Notion as a headless CMS, enabling content publishing without deployment. The solution includes automatic YouTube RSS integration, smart video curation, multiple content types, and intelligent caching for performance.',
    outcome: [
      'Faster workflow: Publish content directly from Notion without deployment',
      'Better UX: Rich content support with formatting and embedded media',
      'Improved SEO: Optimized performance with intelligent caching',
      'Enhanced content management: Multiple content types with automatic aggregation',
    ],
    features: [
      'Notion as Headless CMS: Publish content directly from mobile or desktop - no deployment needed',
      'Automatic YouTube RSS Integration: Auto-fetch videos from YouTube channels via RSS feeds',
      'Smart Video Curation: Curated videos automatically replace RSS versions with no duplicates',
      'Multiple Content Types: Books, Articles, Journal Entries, Resources, Videos, Timeline',
      'Rich Content Support: Full Notion page content with formatting, lists, code blocks, and embedded media',
      'SSRF Protection: Domain whitelisting and security best practices for RSS feeds',
      'Intelligent Caching: 30-minute RSS cache and configurable TTL for performance',
      'Channel Resolution: Automatic YouTube channel ID resolution with language localization',
    ],
    techStack: {
      frontend: [
        'Next.js 15 - React framework with App Router',
        'React 19 - Latest React with concurrent features',
        'Tailwind CSS 4 - Utility-first CSS framework',
        'Lucide React - Beautiful icon library',
        'Simple Icons - Brand icons',
      ],
      contentManagement: [
        'Notion API - Headless CMS integration via @notionhq/client',
        'Multiple database support for different content types',
        'Rich content extraction (blocks, formatted text, metadata)',
        'Pagination support for large datasets',
      ],
      contentAggregation: [
        'rss-parser - RSS/Atom feed parsing',
        'YouTube RSS feed integration',
        'Automatic channel content fetching',
        'Feed normalization and caching',
        'Channel URL normalization and ID resolution',
      ],
      development: [
        'Turbopack - Next-generation bundler for fast development',
        'ESLint - Code linting',
        'PostCSS - CSS processing',
      ],
    },
    projectStructure: `iam-resist/
├── app/
│   ├── api/                    # API routes
│   │   ├── articles/          # Article endpoints
│   │   ├── books/             # Book endpoints
│   │   ├── videos/            # Video endpoints
│   │   ├── journal/           # Journal endpoints
│   │   └── notion-blocks/     # Notion block fetching
│   ├── book-club/             # Book club pages
│   ├── components/            # Reusable React components
│   ├── journal/               # Journal pages
│   ├── timeline/              # Timeline visualization
│   └── videos/                # Video listing pages
│
├── lib/                        # Core libraries
│   ├── notion.js              # Notion API integration
│   ├── notion-blocks.js       # Block content extraction
│   ├── voicesFeed.js          # RSS feed parsing
│   ├── voicesVideoIntegration.js  # Video merging logic
│   ├── articles.js            # Article helpers
│   ├── bookclub.js            # Book club helpers
│   ├── cache.js               # Caching utilities
│   └── utils.js               # General utilities
│
└── public/                     # Static assets
    └── images/                # Images and logos`,
    contentManagement: {
      notionIntegration: [
        'Multiple database support: Books, Articles, Journal, Videos, Voices, Resources, Timeline',
        'Rich content extraction with Notion blocks API',
        'Pagination support for large datasets',
        'Database ID normalization and caching',
        'Real-time content updates - no deployment needed',
      ],
      contentTypes: [
        {
          name: 'Books',
          description: 'Antifascist reading list with detailed metadata',
        },
        {
          name: 'Articles',
          description: 'Long-form articles and essays with rich formatting',
        },
        {
          name: 'Journal Entries',
          description: 'Personal reflections and notes',
        },
        {
          name: 'Resources',
          description: 'Curated links and educational materials',
        },
        {
          name: 'Videos',
          description: 'Curated YouTube and TikTok videos with commentary',
        },
        {
          name: 'Reading Journal',
          description: 'Book-related notes and discussions',
        },
        {
          name: 'Timeline',
          description: 'Chronological events and milestones',
        },
      ],
    },
    youtubeIntegration: {
      description:
        'Automatic YouTube content aggregation via RSS feeds with intelligent merging and curation',
      features: [
        'Auto-fetch latest videos from YouTube channels via RSS feeds',
        'Channel URL normalization (handles @channelname, /channel/ID, /user/name formats)',
        'Channel ID resolution with special handling for multi-language channels',
        'Smart video merging: Curated videos automatically replace RSS versions',
        'Duplicate detection by video ID to prevent duplicates',
        'Curated badge system to distinguish curated vs. RSS content',
        '30-minute RSS feed caching with configurable TTL',
      ],
      workflow: [
        '1. Add YouTube channel URL to Voices database in Notion',
        '2. System resolves channel ID and fetches RSS feed',
        '3. Videos automatically appear in unified feed',
        '4. Curated videos in Videos database replace RSS versions',
        '5. No duplicates - matching by video ID',
      ],
    },
    securityFeatures: [
      'SSRF Protection: Domain whitelist for RSS feeds (ALLOWED_RSS_DOMAINS)',
      'Request Timeouts: Prevents hanging requests',
      'Size Limits: Max XML/HTML size limits to prevent DoS',
      'Environment Variables: Secure API key management',
      'Input Validation: Server-side validation for all inputs',
    ],
    apiEndpoints: [
      'GET /api/articles - Get all articles',
      'GET /api/articles/paginated - Paginated articles',
      'GET /api/books - Get all books',
      'GET /api/books/[slug] - Get single book',
      'GET /api/books/paginated - Paginated books',
      'GET /api/videos - Get all curated videos',
      'GET /api/videos/paginated - Paginated videos',
      'GET /api/journal/paginated - Paginated journal entries',
      'GET /api/reading-journal/paginated - Paginated reading notes',
      'GET /api/notion-blocks?pageId=xxx - Fetch blocks for rich content',
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
      'RSS Feed Caching: 30-minute cache (configurable via RSS_CACHE_TTL)',
      'Notion Data: Next.js revalidate on API routes',
      'YouTube Channel Resolution: 24-hour cache',
      'In-memory caching for frequently accessed data',
      'Optimized API queries with pagination',
    ],
  },
  'mishawaka-shower-booking': {
    title: 'Mishawaka Shower Booking System',
    description:
      'A zero-cost, zero-infrastructure self-service shower booking system built entirely with Google Apps Script. Solves the "people waiting around all day" problem by letting users book specific time slots from their phones, leave, and return within 10 minutes of their scheduled time.',
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
        'View all today's bookings with statuses',
        'See who's waiting, who's checked in',
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
};

export function getProjectBySlug(slug) {
  return PROJECTS_DATA[slug] || null;
}

