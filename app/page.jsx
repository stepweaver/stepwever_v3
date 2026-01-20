'use client';

import dynamic from 'next/dynamic';
import Hero from '@/components/Hero/Hero';
import generateStructuredData from './structured-data';

// Lazy load BackgroundCanvas - heavy canvas operations
const BackgroundCanvas = dynamic(
  () => import('@/components/BackgroundCanvas/BackgroundCanvas'),
  { ssr: false }
);

// Lazy load below-the-fold components
const About = dynamic(() => import('@/components/About/About'), {
  loading: () => <div className='min-h-[400px]' />,
});
const Experience = dynamic(() => import('@/components/Experience/Experience'), {
  loading: () => <div className='min-h-[400px]' />,
});

// Memoize structured data to avoid regenerating on every render
const structuredData = generateStructuredData();

export default function HomePage() {
  return (
    <>
      {/* Enhanced structured data for SEO */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.website),
        }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.person),
        }}
      />

      <div className='relative'>
        <BackgroundCanvas />

        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <About />

        {/* Experience & Tech Arsenal Section */}
        <Experience />
      </div>
    </>
  );
}
