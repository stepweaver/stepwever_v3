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
              Digital leverage: more clarity, fewer keystrokes, faster wins.
            </h3>

            {/* Narrative */}
            <div className='prose prose-invert font-ocr max-w-none space-y-4 text-terminal-text'>
              <p className='text-lg'>
                I'm Stephen, founder of{' '}
                <GlitchLambda className='text-terminal-text' />
                stepweaver-a one-man shop for businesses that need things built,
                automated, or fixed fast.
              </p>

              <p className='text-lg'>I turn ideas into working systems:</p>

              <ul className='space-y-3 font-ocr text-lg'>
                <li>Automations that cut the busywork</li>
                <li>Dashboards that show you what matters</li>
                <li>Sites and tools you'll actually use</li>
              </ul>

              <p className='text-lg'>
                You work directly with me-no layers, no long waits, no nonsense.
              </p>
            </div>

            {/* CTA */}
            <footer className='space-y-4'>
              <p className='font-ibm text-terminal-cyan text-2xl lg:text-3xl'>
                If you want to ship real solutions instead of talking about
                them, let's build.
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
