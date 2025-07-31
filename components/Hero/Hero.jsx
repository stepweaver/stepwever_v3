'use client';

import { memo } from 'react';
import HeroHeadline from './HeroHeadline';
import HeroDescription from './HeroDescription';
import TerminalLink from './TerminalLink';
import ProjectCarousel from './ProjectCarousel';

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
