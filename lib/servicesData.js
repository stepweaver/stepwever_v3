// Services + Cafeteria Menu page for solo tech consultancy
// Fixed-price offers with custom and retainer options

export const SERVICES_DATA = {
  // Hero section
  hero: {
    headline: "Business problems solved. Systems automated. Solutions delivered.",
    subheadline: "From concept to code - I handle the whole solution.",
    ctaPrimary: "Start Your Project"
  },

  // Quick-Pick Solutions - Fixed-price offers
  quickPickSolutions: [
    {
      id: 'contact-site',
      title: 'Single-Page Contact Site',
      price: 350,
      delivery: '48-hour turnaround',
      description: 'Mobile-friendly, includes hosting setup',
      benefit: 'Professional web presence that converts visitors',
      icon: 'globe'
    },
    {
      id: 'simple-automation',
      title: 'Simple Automation',
      price: 325,
      delivery: '3-5 days',
      description: 'One n8n workflow (e.g., form → CRM → QuickBooks)',
      benefit: 'Eliminate repetitive tasks and data entry',
      icon: 'zap'
    },
    {
      id: 'sheets-dashboard',
      title: 'Google Sheets Dashboard',
      price: 450,
      delivery: '5-7 days',
      description: 'Connect live data for instant reporting',
      benefit: 'Real-time insights at your fingertips',
      icon: 'bar-chart'
    },
    {
      id: 'receipt-capture',
      title: 'Photo Receipt Capture',
      price: 300,
      delivery: '3-5 days',
      description: 'Take a photo, log it in Sheets or QuickBooks',
      benefit: 'Never lose another receipt or expense',
      icon: 'camera'
    },
    {
      id: 'follow-up-flow',
      title: 'Email or SMS Follow-Up Flow',
      price: 275,
      delivery: '3-5 days',
      description: 'Automated customer follow-up sequence',
      benefit: 'Stay connected without the manual work',
      icon: 'mail'
    },
    {
      id: 'data-integration',
      title: 'Mini Data Integration',
      price: 325,
      delivery: '5-7 days',
      description: 'Connect two systems via API for a single process',
      benefit: 'Your systems finally talk to each other',
      icon: 'link'
    }
  ],

  // Retainer options
  retainers: [
    {
      id: 'starter',
      title: 'Starter Retainer',
      description: 'Perfect for ongoing maintenance and small updates',
      features: [
        'Monthly system health checks',
        'Minor updates and fixes',
        'Email support with 48-hour response',
        'Perfect for maintaining existing solutions'
      ]
    },
    {
      id: 'growth',
      title: 'Growth Retainer',
      description: 'Ongoing development with priority support',
      features: [
        'Everything in Starter plus ongoing development',
        'Priority support with 24-hour response',
        '1-2 new features or workflows monthly',
        'Strategic consultation on technology decisions'
      ]
    },
    {
      id: 'ops-partner',
      title: 'Ops Partner Retainer',
      description: 'Full partnership for ongoing optimization',
      features: [
        'Dedicated technology partnership',
        'Continuous system optimization',
        'Same-day support for critical issues',
        'Monthly strategy sessions and roadmap planning'
      ]
    }
  ],

  // Custom work explanation
  customWork: {
    title: 'Custom & Retainer Work',
    description: 'Any quick-pick item can be expanded into a custom solution or combined into a comprehensive package. Custom solutions and retainer pricing are tailored to your specific needs and scope.',
    benefits: [
      'Scale any cafeteria menu item to fit your specific needs',
      'Combine multiple solutions into integrated systems',
      'Get ongoing support and optimization',
      'Build exactly what your business requires'
    ]
  },

  // Full service detail sections
  services: {
    automation: {
      title: 'Workflow Automation & System Integration',
      description: 'Connect your business systems and eliminate manual work.',
      included: [
        'n8n, Zapier, or Make.com workflow setup',
        'API integrations between existing systems',
        'Automated data sync and notifications',
        'Custom middleware for unique requirements'
      ],
      outcomes: [
        'Save 10-20 hours per week on repetitive tasks',
        'Reduce data entry errors to near zero',
        'Scale operations without adding staff'
      ]
    },
    development: {
      title: 'Custom Software & API Development',
      description: 'Build tools that fit your exact workflow and requirements.',
      included: [
        'Custom web applications and internal tools',
        'API development for system connections',
        'Database design and optimization',
        'Mobile-responsive interfaces'
      ],
      outcomes: [
        'Tools designed around your processes',
        'Full ownership of your custom solutions',
        'Faster operations with purpose-built systems'
      ]
    },
    analysis: {
      title: 'Business Process Analysis & Improvement',
      description: 'Identify inefficiencies and optimize your operations.',
      included: [
        'Current state process mapping',
        'Bottleneck identification and solutions',
        'Technology recommendations',
        'Implementation roadmaps with timelines'
      ],
      outcomes: [
        'Streamlined workflows that save time',
        'Improved team productivity and satisfaction',
        'Better profit margins through efficiency'
      ]
    },
    analytics: {
      title: 'Data & Analytics Solutions',
      description: 'Turn your data into actionable business insights.',
      included: [
        'Dashboard creation (Google Sheets, Tableau, Power BI)',
        'Multi-source data integration',
        'Automated reporting and alerts',
        'KPI tracking and visualization'
      ],
      outcomes: [
        'Make data-driven decisions confidently',
        'Spot trends and opportunities early',
        'Reduce time spent creating reports'
      ]
    }
  },

  // How I Work - 4-step process
  process: [
    {
      step: 1,
      title: 'Discovery',
      description: 'Understand your needs, pain points, and goals.',
      details: [
        'Map current workflows and identify bottlenecks',
        'Understand your team\'s daily challenges',
        'Define success metrics and project scope',
        'Assess existing tools and systems'
      ]
    },
    {
      step: 2,
      title: 'Design',
      description: 'Map out the right solution, using the right tools.',
      details: [
        'Choose technologies that fit your team\'s capabilities',
        'Design solutions that integrate with existing systems',
        'Create project timeline with clear milestones',
        'Plan for scalability and future growth'
      ]
    },
    {
      step: 3,
      title: 'Build',
      description: 'Implement quickly, with transparency.',
      details: [
        'Regular check-ins and progress updates',
        'Iterative development with working prototypes',
        'Thorough testing before deployment',
        'Clear documentation for your team'
      ]
    },
    {
      step: 4,
      title: 'Support',
      description: 'Ensure it runs smoothly and grows with you.',
      details: [
        'Monitor system performance and reliability',
        'Provide training for your team',
        'Ongoing maintenance and updates',
        'Scale solutions as your business grows'
      ]
    }
  ],

  // Closing CTA
  cta: {
    headline: "Let's build something that works - start small or think big.",
    description: "Ready to solve your business challenges with practical technology solutions?",
    ctaText: "Book Your Project"
  },

  // Contact info
  contact: {
    email: 'hello@stepweaver.dev',
    calendlyUrl: 'https://calendly.com/your-calendar'
  }
};

export default SERVICES_DATA;
