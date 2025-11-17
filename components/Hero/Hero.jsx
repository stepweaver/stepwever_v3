'use client';

import { memo } from 'react';
import dynamic from 'next/dynamic';
import HeroHeadline from './HeroHeadline';
import HeroDescription from './HeroDescription';
import TerminalLink from './TerminalLink';

// Lazy load ProjectCarousel - it's a large component (798 lines) with complex logic
// This reduces initial JS execution time significantly
const ProjectCarousel = dynamic(() => import('./ProjectCarousel'), {
  ssr: true, // Keep SSR for SEO and initial render
  loading: () => (
    <div className='min-h-[400px] flex items-center justify-center'>
      <div className='text-terminal-muted font-ocr'>Loading projects...</div>
    </div>
  ),
});

function Hero() {
  return (
    <section className='relative z-30 pt-0 pb-4 sm:pb-8 md:pb-12'>
      <div className='mx-auto px-4 sm:px-6 md:px-8 lg:px-6 xl:px-6 2xl:px-6 max-w-none'>
        <HeroHeadline />
        <HeroDescription />
        <TerminalLink />
        <ProjectCarousel />
      </div>
    </section>
  );
}

// memo is optional but inexpensive
export default memo(Hero);
