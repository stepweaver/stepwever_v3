'use client';

import BackgroundCanvas from '../components/BackgroundCanvas/BackgroundCanvas';
import Hero from '../components/Hero/Hero';
import WhyWorkWithUs from '../components/WhyWorkWithUs/WhyWorkWithUs';

export default function HomePage() {
  return (
    <div className='min-h-screen relative bg-terminal-dark'>
      <BackgroundCanvas />

      {/* Hero Section */}
      <Hero />

      {/* Why Work With Us Section */}
      <WhyWorkWithUs />

      {/* Additional content sections */}
      <div className='relative z-20'>
        <div className='h-screen'></div>
        <div className='h-screen'></div>
        <div className='h-screen'></div>
      </div>
    </div>
  );
}
