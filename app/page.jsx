'use client';

import BackgroundCanvas from '@/components/BackgroundCanvas/BackgroundCanvas';
import Hero from '@/components/Hero/Hero';
import About from '@/components/About/About';
import WhyWorkWithUs from '@/components/WhyWorkWithUs/WhyWorkWithUs';
import SuccessStories from '@/components/SuccessStories/SuccessStories';
import WhatWeDo from '@/components/WhatWeDo/WhatWeDo';
import Experience from '@/components/Experience/Experience';
import PartnerFeedback from '@/components/PartnerFeedback/PartnerFeedback';
import Approach from '@/components/Approach/Approach';
import CTA from '@/components/CTA/CTA';
import generateStructuredData from './structured-data';

export default function HomePage() {
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

        {/* What We Do Section */}
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
