export default function generateStructuredData() {
  const baseUrl = 'https://stepweaver.dev';

  // Main organization data
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "λstepweaver",
    "url": baseUrl,
    "logo": `${baseUrl}/images/lambda_stepweaver.png`,
    "description": "Practical transformation, powered by code. We build lean data pipelines, automations, and high-impact web experiences that transform businesses through efficient, scalable solutions.",
    "foundingDate": "2023",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "inquiries@stepweaver.dev"
    },
    "sameAs": [
      "https://github.com/stepweaver",
      "https://bsky.app/profile/stepweaver.dev"
    ],
    "founder": {
      "@type": "Person",
      "name": "Stephen Weaver",
      "jobTitle": "Founder & Lead Developer",
      "description": "Veteran, business analyst, and rebel developer obsessed with helping businesses scale."
    },
    "serviceType": [
      "Business Automation",
      "Data Pipeline Development",
      "Web Application Development",
      "Process Optimization",
      "API Integration",
      "Business Intelligence"
    ],
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Growth Systems",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Data Pipeline Development",
            "description": "Build lean data pipelines that connect your POS, accounting, and SaaS APIs into one live source of truth."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Web Application Development",
            "description": "Craft lightning-fast marketing sites and web applications using React, Next.js, and modern technologies."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Business Process Automation",
            "description": "AI-powered process automations that free up whole roles, not just tasks."
          }
        }
      ]
    }
  };

  // Website schema
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "λstepweaver",
    "url": baseUrl,
    "description": "Practical transformation, powered by code. We build lean data pipelines, automations, and high-impact web experiences.",
    "publisher": {
      "@type": "Organization",
      "name": "λstepweaver",
      "url": baseUrl
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/codex?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  // Breadcrumb schema for navigation
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Codex",
        "item": `${baseUrl}/codex`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Terminal",
        "item": `${baseUrl}/terminal`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Contact",
        "item": `${baseUrl}/contact`
      }
    ]
  };

  // Local business schema for better local SEO
  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "λstepweaver",
    "description": "Practical transformation, powered by code. We build lean data pipelines, automations, and high-impact web experiences.",
    "url": baseUrl,
    "telephone": "+1-555-0123", // Replace with actual phone if available
    "email": "inquiries@stepweaver.dev",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "40.7128", // Replace with actual coordinates
      "longitude": "-74.0060"
    },
    "openingHours": "Mo-Fr 09:00-17:00",
    "priceRange": "$$",
    "currenciesAccepted": "USD",
    "paymentAccepted": "Cash, Credit Card, Bank Transfer"
  };

  // Person schema for founder
  const personData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Stephen Weaver",
    "jobTitle": "Founder & Lead Developer",
    "description": "Veteran, business analyst, and rebel developer obsessed with helping businesses scale.",
    "url": baseUrl,
    "image": `${baseUrl}/images/pixarMe.png`,
    "sameAs": [
      "https://github.com/stepweaver",
      "https://bsky.app/profile/stepweaver.dev"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "λstepweaver"
    },
    "knowsAbout": [
      "Business Automation",
      "Data Pipeline Development",
      "Web Application Development",
      "React",
      "Next.js",
      "Node.js",
      "Business Intelligence"
    ]
  };

  // FAQ schema for common questions
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What services does λstepweaver offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer data pipeline development, web application development, business process automation, API integration, and business intelligence services."
        }
      },
      {
        "@type": "Question",
        "name": "How can I contact λstepweaver?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can contact us through our contact form at stepweaver.dev/contact or email us directly at inquiries@stepweaver.dev"
        }
      },
      {
        "@type": "Question",
        "name": "What technologies does λstepweaver use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We use modern technologies including React, Next.js, Node.js, Python, and various cloud platforms to build scalable solutions."
        }
      }
    ]
  };

  return {
    organization: organizationData,
    website: websiteData,
    breadcrumb: breadcrumbData,
    localBusiness: localBusinessData,
    person: personData,
    faq: faqData
  };
} 