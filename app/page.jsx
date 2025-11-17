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
const WhyWorkWithUs = dynamic(
  () => import('@/components/WhyWorkWithUs/WhyWorkWithUs'),
  { loading: () => <div className='min-h-[400px]' /> }
);
const SuccessStories = dynamic(
  () => import('@/components/SuccessStories/SuccessStories'),
  { loading: () => <div className='min-h-[400px]' /> }
);
const WhatWeDo = dynamic(() => import('@/components/WhatWeDo/WhatWeDo'), {
  loading: () => <div className='min-h-[400px]' />,
});
const Experience = dynamic(() => import('@/components/Experience/Experience'), {
  loading: () => <div className='min-h-[400px]' />,
});
const PartnerFeedback = dynamic(
  () => import('@/components/PartnerFeedback/PartnerFeedback'),
  { loading: () => <div className='min-h-[400px]' /> }
);
const Approach = dynamic(() => import('@/components/Approach/Approach'), {
  loading: () => <div className='min-h-[400px]' />,
});
const CTA = dynamic(() => import('@/components/CTA/CTA'), {
  loading: () => <div className='min-h-[200px]' />,
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
          __html: JSON.stringify(structuredData.breadcrumb),
        }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.localBusiness),
        }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.person),
        }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData.faq) }}
      />

      <div className='relative'>
        <BackgroundCanvas />

        {/* Hero Section */}
        <Hero />

        {/* Why Work With Us Section */}
        <WhyWorkWithUs />

        {/* Success Stories Section */}
        <SuccessStories />

        {/* About Section */}
        <About />

        {/* What I Do Section */}
        <WhatWeDo />

        {/* Experience & Tech Arsenal Section */}
        <Experience />

        {/* Partner Feedback Section */}
        <PartnerFeedback />

        {/* Approach Section */}
        <Approach />

        {/* CTA Section */}
        <CTA />
      </div>
    </>
  );
}
