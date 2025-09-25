'use client';

import Image from 'next/image';
import { memo } from 'react';
import GlitchLambda from '@/components/ui/GlitchLambda';

function About() {
  return (
    <section id='about' className='relative z-30 py-12'>
      {/* 1️⃣  Use explicit padding for mobile, minimal for desktop */}
      <div className='mx-auto px-4 sm:px-6 md:px-8 lg:px-6 xl:px-6 2xl:px-6 max-w-none'>
        {/* 2️⃣  CSS Grid → easier to manage two columns + re‑order on mobile */}
        <div className='grid gap-8 lg:gap-12 lg:grid-cols-[minmax(auto,320px)_1fr]'>
          {/* ────────────── Bio Card ────────────── */}
          <aside className='lg:sticky lg:top-24 order-2 lg:order-1'>
            <div className='rounded-xl bg-terminal-light/40 backdrop-blur p-8'>
              {/* Avatar */}
              <div className='relative lg:mx-0 mb-6 h-48 w-48 overflow-hidden rounded-xl'>
                <Image
                  src='/images/pixarMe.png'
                  alt='Stephen Weaver, Founder of λstepweaver'
                  fill
                  className='object-cover'
                  sizes='192px'
                  priority
                />
              </div>

              {/* Meta */}
              <h3 className='font-ibm text-4xl text-terminal-text mb-2'>
                Stephen Weaver
              </h3>
              <p className='font-ocr text-2xl tracking-wider uppercase text-terminal-green mb-6'>
                Founder
              </p>

              <ul className='space-y-1 font-ocr text-xl text-terminal-text'>
                <li>Developer</li>
                <li>Data Strategist</li>
                <li>Veteran</li>
                <li className='italic text-base'>Rebel</li>
              </ul>
            </div>
          </aside>

          {/* ────────────── Main Copy ────────────── */}
          <article className='space-y-8 order-1 lg:order-2'>
            {/* Heading */}
            <header>
              <h2 className='font-ibm text-terminal-green text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight'>
                ABOUT ME
              </h2>
            </header>

            {/* Strapline */}
            <h3 className='font-ibm text-terminal-text text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight'>
              Digital leverage, forged in experience.
            </h3>

            {/* Narrative */}
            <div className='prose prose-invert font-ocr max-w-none space-y-4 text-terminal-text'>
              <p className='text-lg'>
                I’m Stephen Weaver, founder of{' '}
                <GlitchLambda className='text-terminal-text' />
                stepweaver — a one-man skunkworks delivering fast, no-nonsense
                solutions: websites, automations, dashboards, and marketing
                systems that actually work.
              </p>

              <p className='text-lg'>I've worn many hats:</p>

              <ul className='space-y-3 font-ocr text-lg'>
                <li>Airborne Linguist (U.S. Air Force)</li>
                <li>Business Analyst</li>
                <li>Retail (restaurant) Manager</li>
                <li>Developer & Builder</li>
                <li>Founder</li>
              </ul>

              <p className='text-lg'>
                What I've learned across those paths is simple: the most fulfilling work has been building and fixing systems that actually work. That's why I launched <GlitchLambda className='text-terminal-text' />stepweaver - to cut through corporate bloat and deliver high-impact solutions and the highest standards.
              </p>
            </div>

            {/* CTA */}
            <footer className='space-y-4'>
              <p className='font-ibm text-terminal-cyan text-2xl lg:text-3xl'>
              Every business needs a secret weapon. I just happen to be one you can hire.
              </p>
              <p className='text-lg font-ocr text-terminal-text'>
                <a
                  href='/services'
                  className='text-terminal-green hover:text-terminal-yellow transition-colors underline hover:no-underline font-bold'
                >
                  Browse services and pricing
                </a>{' '}
                or{' '}
                <a
                  href='/contact'
                  className='text-terminal-green hover:text-terminal-yellow transition-colors underline hover:no-underline font-bold'
                >
                  get in touch
                </a>{' '}
                to discuss your project.
              </p>
            </footer>
          </article>
        </div>
      </div>
    </section>
  );
}

// memo is optional but inexpensive
export default memo(About);
