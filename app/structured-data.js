export default function generateStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "λstepweaver",
    "url": "https://stepweaver.dev",
    "logo": "https://stepweaver.dev/images/lambda_stepweaver.png",
    "description": "We build lean data pipelines, automations, and high-impact web experiences that slash waste and surface profit opportunities in weeks-not quarters.",
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
      "https://bsky.app/profile/stepweaver.bsky.social"
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

  return structuredData;
} 