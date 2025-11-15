'use client';

import { memo } from 'react';
import GlitchLambda from '@/components/ui/GlitchLambda';
import NeonProfileCard from '@/components/NeonProfileCard/NeonProfileCard';

function About() {
  return (
    <section id='about' className='relative z-30 py-12'>
      {/* 1️⃣  Use explicit padding for mobile, minimal for desktop */}
      <div className='mx-auto px-4 sm:px-6 md:px-8 lg:px-6 xl:px-6 2xl:px-6 max-w-none'>
        {/* 2️⃣  CSS Grid → easier to manage two columns + re‑order on mobile */}
        <div className='grid gap-8 lg:gap-12 lg:grid-cols-[minmax(auto,320px)_1fr]'>
          {/* ────────────── Bio Card ────────────── */}
          <aside className='lg:sticky lg:top-24 order-2 lg:order-1 flex justify-center lg:justify-start'>
            <NeonProfileCard
              profile={{
                name: 'Stephen Weaver',
                role: 'Founder',
                tagline: 'Principal Builder · λstepweaver',
                status: 'ACTIVE',
                avatar: '/images/pixarMe.png',
                badges: [
                  'Developer',
                  'Data Strategist',
                  'IT Consultant',
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
                I'm Stephen Weaver, founder of{' '}
                <GlitchLambda className='text-terminal-text' />
                stepweaver - a one-man skunkworks delivering fast, no-nonsense
                solutions: websites, automations, dashboards, and marketing
                systems that actually work.
              </p>

              <p className='text-lg'>My background spans both worlds:</p>

              <ul className='space-y-3 font- text-lg'>
                <li>U.S. Air Force veteran (Airborne Linguist)</li>
                <li>Business analyst who built reporting systems</li>
                <li>Restaurant manager who learned operations</li>
                <li>Developer who builds what businesses actually need</li>
              </ul>

              <p className='text-lg'>
                This unique combination means I don't just build websites and
                apps - I understand your business challenges and create
                solutions that actually solve them. No tech jargon, no corporate
                bloat. Just working systems that help you grow.
              </p>
            </div>

            {/* CTA */}
            <footer className='space-y-4'>
              <p className='font-ibm text-terminal-cyan text-2xl lg:text-3xl'>
                Every business needs a secret weapon. I just happen to be one
                you can hire.
              </p>
              <p className='text-lg font-ibm text-terminal-text'>
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
