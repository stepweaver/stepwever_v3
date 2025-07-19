'use client';

import BackgroundCanvas from '../components/BackgroundCanvas';
import Hero from '../components/Hero';

export default function HomePage() {
  return (
    <div className='min-h-screen relative bg-terminal-dark'>
      <BackgroundCanvas />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Additional content sections */}
      <div className='relative z-20'>
        <div className='h-screen'></div>
        <div className='h-screen'></div>
        <div className='h-screen'></div>
        <div className='h-screen'></div>
      </div>
    </div>
  );
}
