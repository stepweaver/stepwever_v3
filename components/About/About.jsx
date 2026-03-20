'use client';

import { memo } from 'react';
import Link from 'next/link';

function About() {
  return (
    <section id='about' className='relative z-30 h-full flex flex-col'>
      <div className="flex-1 flex flex-col min-h-0 px-2 py-6 sm:px-4 md:p-6">
        {/* Section ID tag - no border, just a label */}
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
            I'm Stephen Weaver. My path into software was not linear. I served as an Airborne Cryptologic Linguist in the U.S. Air Force. After that, I worked in restaurant operations and business analysis before moving deeper into development. That background still shapes how I build. I pay attention to process, constraints, maintenance, and whether a system is actually useful once real people have to use it.
          </p>
          <p className='text-base md:text-lg leading-relaxed'>Background:</p>
          <ul className='space-y-3 text-base md:text-lg leading-relaxed'>
            <li>U.S. Air Force veteran; Airborne Cryptologic Linguist</li>
            <li>Restaurant operations and management</li>
            <li>Business analysis</li>
            <li>Self-taught developer</li>
            <li>Current focus: DevOps and infrastructure</li>
          </ul>
          <p className='text-base md:text-lg leading-relaxed'>
            I do not treat software as an isolated technical exercise. I look at the workflow, the handoffs, the data, and the failure points. Then I build from there.
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
              send me a message
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
