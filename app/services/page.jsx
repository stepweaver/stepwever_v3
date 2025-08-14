'use client';

import BackgroundCanvas from '@/components/BackgroundCanvas/BackgroundCanvas';
import ServicesPage from '@/components/ServicesPage/ServicesPage';
import generateStructuredData from '../structured-data';

export default function Services() {
  const structuredData = generateStructuredData();

  return (
    <>
      {/* Enhanced structured data for SEO */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.organization),
        }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.website),
        }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.localBusiness),
        }}
      />

      <div className='relative'>
        <BackgroundCanvas />
        <ServicesPage />
      </div>
    </>
  );
}
