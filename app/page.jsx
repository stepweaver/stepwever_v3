import Script from 'next/script';
import generateStructuredData from './structured-data';
import HomePageContent from './HomePageContent';

export default function HomePage() {
  const structuredData = generateStructuredData();

  return (
    <>
      {/* JSON-LD structured data for SEO - runs on server */}
      <Script
        id='ld-website'
        type='application/ld+json'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData.website) }}
      />
      <Script
        id='ld-person'
        type='application/ld+json'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData.person) }}
      />

      <HomePageContent />
    </>
  );
}
