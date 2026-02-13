'use client';

import { memo } from 'react';
import { HUDPanel } from '@/components/ui/HUDPanel';
import { ModuleHeader } from '@/components/ui/ModuleHeader';

function About() {
  return (
    <section id='about' className='relative z-30 pt-0 pb-12'>
      <div className='w-full min-w-0'>
        <article className='space-y-8 max-w-none'>
            <HUDPanel title="OPERATOR PROFILE" id="λ-ABOUT-01">
              <ModuleHeader name="BIO" className="mb-4" />
              <h3 className='font-ibm text-text text-xl md:text-2xl lg:text-3xl leading-tight mb-6'>
                I speak both business and tech.
              </h3>

              <div className='prose prose-invert font-ibm max-w-none space-y-4 text-text'>
                <p className='text-base md:text-lg leading-relaxed'>
                  I'm Stephen Weaver, a full-stack developer with an unconventional
                  path. I've worn a lot of hats: Air Force linguist, restaurant
                  manager, business analyst, and now a developer who loves building
                  things that actually work.
                </p>
                <p className='text-base md:text-lg leading-relaxed'>My journey so far:</p>
                <ul className='space-y-3 text-base md:text-lg leading-relaxed'>
                  <li>U.S. Air Force veteran (Airborne Linguist)</li>
                  <li>Restaurant manager</li>
                  <li>Business analyst</li>
                  <li>Self-taught developer</li>
                  <li>DevOps engineering (Current Focus)</li>
                </ul>
                <p className='text-base md:text-lg leading-relaxed'>
                  That mix of experiences means I don't just write code, I understand
                  the problems that code is supposed to solve.
                </p>
              </div>

              <footer className='mt-8 space-y-4'>
                <p className='font-ibm text-accent text-lg md:text-xl'>
                  Curious about my work or want to chat?
                </p>
                <p className='text-base md:text-lg font-ibm text-text leading-relaxed'>
                  Check out my{' '}
                  <a href='/resume' className='text-neon hover:text-accent transition-colors underline hover:no-underline font-bold'>
                    resume
                  </a>{' '}
                  or{' '}
                  <a href='/contact' className='text-neon hover:text-accent transition-colors underline hover:no-underline font-bold'>
                    drop me a message
                  </a>
                  .
                </p>
              </footer>
            </HUDPanel>
        </article>
      </div>
    </section>
  );
}

// memo is optional but inexpensive
export default memo(About);
