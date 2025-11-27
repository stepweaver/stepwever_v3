export const PROJECTS_DATA = {
  'soap-stache': {
    title: 'Soap Stache',
    description:
      'A modern e-commerce platform for handcrafted soaps, built with Next.js, Sanity CMS, and Stripe payments. This project features a beautiful, responsive design with Michigan pride themes and comprehensive product management.',
    imageUrl: '/images/screely-stache.png',
    link: 'https://app-soap-stache.vercel.app/',
    tags: ['E-commerce', 'Next.js', 'Sanity CMS', 'Stripe'],
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
      'Self-contained `NeonProfileCard` React component—just swap the profile prop to reskin it',
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
      'Zero extra JavaScript—animations handled with CSS keyframes already in the theme',
      'Shared fonts and color tokens mean no additional network requests',
      'Component renders as static HTML so it can be inlined by the server',
    ],
    security: [
      'External inspiration link opens in a hardened `_blank` tab with `rel="noopener noreferrer"`',
      'Static showcase component—no runtime inputs to sanitize',
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
};

export function getProjectBySlug(slug) {
  return PROJECTS_DATA[slug] || null;
}

