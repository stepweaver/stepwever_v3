'use client';

import { memo } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import HeroOperatorCard from './HeroOperatorCard';
import TerminalLink from './TerminalLink';
import WhyStephen from '@/components/WhyStephen/WhyStephen';
import About from '@/components/About/About';

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
    <section className='relative z-30 pt-0 pb-8 sm:pb-10 md:pb-12 w-full'>
      <div className='w-full px-1 sm:px-2 md:px-3 lg:px-4 xl:px-6 2xl:px-8'>
        <div className='grid grid-cols-1 lg:grid-cols-[390px_1fr] gap-8 lg:gap-10 xl:gap-12 lg:items-start'>
          <div className='min-w-0 flex flex-col lg:self-start w-full'>
            <HeroOperatorCard />
          </div>
          <div className='hidden lg:flex min-w-0 flex-col h-full min-h-0'>
            <About />
          </div>
        </div>

        <div className='mt-12 sm:mt-16 w-full px-2 sm:px-4 md:px-0' id='projects'>
          <div className='mb-6 sm:mb-8 flex items-end justify-between gap-4'>
            <div className='min-w-0'>
              <div className='text-[10px] sm:text-xs tracking-[0.28em] text-neon/60 font-ocr uppercase'>
                Featured projects
              </div>
              <h2 className='mt-2 text-xl sm:text-2xl md:text-3xl font-ibm text-terminal-green leading-tight'>
                Projects
              </h2>
              <p className='mt-3 max-w-3xl text-sm sm:text-base font-ibm text-text/85 leading-relaxed'>
                Real builds across web apps, automation, and AI tooling with clear outcomes and production-minded architecture.
              </p>
            </div>
            <Link
              href='/projects'
              className='hidden sm:inline-flex items-center border border-neon/30 px-3 py-2 font-ibm text-sm text-neon/80 transition-colors hover:border-neon/60 hover:text-neon'
            >
              View all projects
            </Link>
          </div>

          <ProjectCarousel />
        </div>

        <div className='mt-10 lg:mt-12 lg:ml-[calc(390px+2.5rem)] xl:ml-[calc(390px+3rem)] px-2 sm:px-4 md:px-0'>
          <WhyStephen />
        </div>

        <div className='mt-10 px-2 sm:px-4 md:px-0 lg:hidden'>
          <About />
        </div>

        {/* Keep terminal accent after core narrative so first-time scans stay focused. */}
        <div className='mt-8 lg:ml-[calc(390px+2.5rem)] xl:ml-[calc(390px+3rem)] px-2 sm:px-4 md:px-0'>
          <TerminalLink />
        </div>
      </div>
    </section>
  );
}

export default memo(Hero);
