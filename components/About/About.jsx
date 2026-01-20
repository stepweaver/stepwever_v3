'use client';

import { memo } from 'react';
import NeonProfileCard from '@/components/NeonProfileCard/NeonProfileCard';

function About() {
  return (
    <section id='about' className='relative z-30 py-12'>
      {/* 1. Use explicit padding for mobile, minimal for desktop */}
      <div className='mx-auto px-4 sm:px-6 md:px-8 lg:px-6 xl:px-6 2xl:px-6 max-w-none'>
        {/* 2. CSS Grid → easier to manage two columns + re‑order on mobile */}
        <div className='grid gap-8 lg:gap-12 lg:grid-cols-[minmax(auto,420px)_1fr]'>
          {/* ────────────── Bio Card ────────────── */}
          <aside className='lg:sticky lg:top-24 order-2 lg:order-1 flex justify-center lg:justify-start'>
            <NeonProfileCard
              profile={{
                name: 'Stephen Weaver',
                role: 'Full-Stack Developer',
                tagline: 'Builder of Things · Solver of Problems',
                status: 'OPEN TO WORK',
                avatar: '/images/pixarMe.png',
                badges: [
                  'Developer',
                  'Data Strategist',
                  'Veteran',
                  'Yankee Samurai',
                  { text: 'Rebel', accent: true },
                ],
              }}
            />
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
              I speak both business and tech.
            </h3>

            {/* Narrative */}
            <div className='prose prose-invert font-ibm max-w-none space-y-4 text-terminal-text'>
              <p className='text-lg'>
                I'm Stephen Weaver, a full-stack developer with an unconventional
                path. I've worn a lot of hats: Air Force linguist, restaurant
                manager, business analyst, and now a developer who loves building
                things that actually work.
              </p>

              <p className='text-lg'>My journey so far:</p>

              <ul className='space-y-3 text-lg'>
                <li>U.S. Air Force veteran (Airborne Linguist)</li>
                <li>Restaurant manager</li>
                <li>Business analyst</li>
                <li>Self-taught developer</li>
                <li>DevOps engineering (Current Focus)</li>
              </ul>

              <p className='text-lg'>
                That mix of experiences means I don't just write code, I understand
                the problems that code is supposed to solve. I've been on both sides
                of the equation, and I bring that perspective to everything I build.
              </p>
            </div>

            {/* CTA */}
            <footer className='space-y-4'>
              <p className='font-ibm text-terminal-cyan text-2xl lg:text-3xl'>
                Curious about my work or want to chat?
              </p>
              <p className='text-lg font-ibm text-terminal-text'>
                Check out my{' '}
                <a
                  href='/resume'
                  className='text-terminal-green hover:text-terminal-yellow transition-colors underline hover:no-underline font-bold'
                >
                  resume
                </a>{' '}
                or{' '}
                <a
                  href='/contact'
                  className='text-terminal-green hover:text-terminal-yellow transition-colors underline hover:no-underline font-bold'
                >
                  drop me a message
                </a>
                .
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
