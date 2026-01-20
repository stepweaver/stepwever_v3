export default function generateStructuredData() {
  const baseUrl = 'https://stepweaver.dev';

  // Website schema
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Stephen Weaver - Developer Portfolio",
    "url": baseUrl,
    "description": "Full-stack developer portfolio showcasing web development, automation, and software projects. Built with Next.js, React, and modern web technologies.",
    "author": {
      "@type": "Person",
      "name": "Stephen Weaver"
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

  // Person schema for Stephen
  const personData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Stephen Weaver",
    "alternateName": "Yankee Samurai",
    "jobTitle": "Full-Stack Developer",
    "description": "Full-stack developer with a background in Air Force intelligence, business analysis, and software development. Passionate about building web applications and automation solutions.",
    "url": baseUrl,
    "image": `${baseUrl}/images/pixarMe.png`,
    "sameAs": [
      "https://github.com/stepweaver",
      "https://bsky.app/profile/stepweaver.dev"
    ],
    "email": "stephen@stepweaver.dev",
    "knowsAbout": [
      "Web Development",
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "JavaScript",
      "Python",
      "PostgreSQL",
      "Automation",
      "API Development",
      "Full-Stack Development"
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Full-Stack Developer",
      "occupationLocation": {
        "@type": "Country",
        "name": "United States"
      },
      "skills": "React, Next.js, Node.js, TypeScript, PostgreSQL, API Development"
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
        "name": "Resume",
        "item": `${baseUrl}/resume`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Codex",
        "item": `${baseUrl}/codex`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Terminal",
        "item": `${baseUrl}/terminal`
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "Contact",
        "item": `${baseUrl}/contact`
      }
    ]
  };

  return {
    website: websiteData,
    person: personData,
    breadcrumb: breadcrumbData
  };
}
