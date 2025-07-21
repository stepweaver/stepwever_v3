'use client';

import BackgroundCanvas from '../components/BackgroundCanvas/BackgroundCanvas';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import WhyWorkWithUs from '../components/WhyWorkWithUs/WhyWorkWithUs';
import SuccessStories from '../components/SuccessStories/SuccessStories';
import WhatWeDo from '../components/WhatWeDo/WhatWeDo';
import Experience from '../components/Experience/Experience';
import PartnerFeedback from '../components/PartnerFeedback/PartnerFeedback';

export default function HomePage() {
  return (
    <div className='min-h-screen relative bg-terminal-dark'>
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

      {/* Additional content sections */}
      <div className='relative z-20'>
        <div className='h-screen'></div>
        <div className='h-screen'></div>
      </div>
    </div>
  );
}
