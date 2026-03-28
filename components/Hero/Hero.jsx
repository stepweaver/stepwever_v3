'use client';

import { memo } from 'react';
import Link from 'next/link';
import HeroOperatorCard from './HeroOperatorCard';
import TerminalLink from './TerminalLink';
import WhyStephen from '@/components/WhyStephen/WhyStephen';
import About from '@/components/About/About';
import ProjectCarousel from './ProjectCarousel';

function Hero() {
  return (
    <section className='relative z-30 pt-0 pb-8 sm:pb-10 md:pb-12 w-full'>
      <div className='w-full px-1 sm:px-2 md:px-3 lg:px-4 xl:px-6 2xl:px-8'>
        {/*
          Single About instance with id="about" so /#about targets the visible Background block.
          Explicit grid placement: mobile column order matches narrative; lg keeps operator | about on row 1.
        */}
        <div className='grid grid-cols-1 grid-rows-[auto] lg:grid-cols-[390px_1fr] gap-x-8 lg:gap-x-10 xl:gap-x-12 lg:items-start'>
          <div className='min-w-0 flex flex-col w-full col-start-1 row-start-1 lg:row-start-1 lg:col-start-1 lg:self-start'>
            <HeroOperatorCard />
          </div>

          <div
            className='col-start-1 row-start-2 mt-12 sm:mt-16 w-full px-2 sm:px-4 md:px-0 lg:row-start-2 lg:col-span-2'
            id='projects'
          >
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

          <div className='col-start-1 row-start-3 mt-10 lg:mt-12 px-2 sm:px-4 md:px-0 lg:row-start-3 lg:col-start-2'>
            <WhyStephen />
          </div>

          <div className='col-start-1 row-start-4 mt-10 min-w-0 px-2 sm:px-4 md:px-0 lg:mt-0 lg:px-0 lg:row-start-1 lg:col-start-2 lg:self-start'>
            <About />
          </div>

          {/* Keep terminal accent after core narrative so first-time scans stay focused. */}
          <div className='col-start-1 row-start-5 mt-8 px-2 sm:px-4 md:px-0 lg:row-start-4 lg:col-start-2'>
            <TerminalLink />
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Hero);
