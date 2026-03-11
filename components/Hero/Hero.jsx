'use client';

import { memo } from 'react';
import dynamic from 'next/dynamic';
import HeroOperatorCard from './HeroOperatorCard';
import TerminalLink from './TerminalLink';

const About = dynamic(() => import('@/components/About/About'), {
  loading: () => <div className='min-h-[200px]' />,
});

const ProjectCarousel = dynamic(() => import('./ProjectCarousel'), {
  ssr: false,
  loading: () => (
    <div className='min-h-[400px] flex items-center justify-center'>
      <div className='hud-panel p-6 w-full max-w-md motion-safe:animate-pulse'>
        <div className='text-xs tracking-[0.2em] text-neon/50 font-ocr uppercase'>SCANNING MODULES...</div>
        <div className='mt-4 space-y-3'>
          <div className='h-4 bg-neon/10 w-3/4' />
          <div className='h-4 bg-neon/10 w-1/2' />
          <div className='h-4 bg-neon/10 w-2/3' />
        </div>
      </div>
    </div>
  ),
});

function Hero() {
  return (
    <section className='relative z-30 pt-0 pb-2 sm:pb-4 md:pb-6 w-full'>
      <div className='w-full px-1 sm:px-2 md:px-3 lg:px-4 xl:px-6 2xl:px-8'>
        <div className='grid grid-cols-1 lg:grid-cols-[390px_1fr] gap-8 lg:gap-10 xl:gap-12 lg:items-stretch'>
          <div className='min-w-0 flex flex-col'>
            <HeroOperatorCard />
          </div>

          {/* About content — same row height as left on desktop so bottom borders align */}
          <div className='min-w-0 flex flex-col h-full min-h-0'>
            <About />
          </div>
        </div>

        {/* Below the two panels so it never affects their height */}
        <div className='mt-6 sm:mt-8 lg:ml-[calc(390px+2.5rem)] xl:ml-[calc(390px+3rem)] px-2 sm:px-4 md:px-0'>
          <TerminalLink />
        </div>
        <div className='mt-12 sm:mt-16 w-full px-2 sm:px-4 md:px-0'>
          <ProjectCarousel />
        </div>
      </div>
    </section>
  );
}

export default memo(Hero);
