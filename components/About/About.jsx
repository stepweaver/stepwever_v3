'use client';

import { memo } from 'react';
import Link from 'next/link';

function About() {
  return (
    <section id='about' className='relative z-30 h-full flex flex-col'>
      <div className="flex-1 flex flex-col min-h-0 p-6">
        {/* Section ID tag — no border, just a label */}
        <div className='mb-4 flex items-start justify-between gap-4'>
          <p className='text-xs tracking-[0.28em] text-neon/70 font-ocr uppercase'>BACKGROUND</p>
          <div className='text-right text-xs text-muted font-mono shrink-0'>
            <div className='tracking-[0.22em] text-neon/50 uppercase font-ocr text-[10px]'>ID</div>
            <div className='font-mono text-neon/80 whitespace-nowrap'>BIO-01</div>
          </div>
        </div>

        <h3 className='font-ibm text-text text-xl md:text-2xl lg:text-3xl leading-tight mb-6 shrink-0'>
          I speak both business and tech.
        </h3>

        <div className='prose prose-invert font-ibm max-w-none space-y-4 text-text flex-1 min-h-0'>
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

        <footer className='mt-auto pt-8 space-y-4 shrink-0'>
          <p className='font-ibm text-accent text-lg md:text-xl'>
            Curious about my work or want to chat?
          </p>
          <p className='text-base md:text-lg font-ibm text-text leading-relaxed'>
            Check out my{' '}
            <Link href='/resume' className='text-neon hover:text-accent transition-colors underline hover:no-underline font-bold'>
              resume
            </Link>{' '}
            or{' '}
            <Link href='/contact' className='text-neon hover:text-accent transition-colors underline hover:no-underline font-bold'>
              drop me a message
            </Link>
            .
          </p>
        </footer>
      </div>
    </section>
  );
}

// memo is optional but inexpensive
export default memo(About);
