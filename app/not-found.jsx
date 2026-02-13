'use client';

import Link from 'next/link';
import GlitchLambda from '@/components/ui/GlitchLambda';

export default function NotFound() {
  return (
    <main className='min-h-screen w-full flex items-center justify-center p-8'>
      <section
        className='text-center max-w-lg animate-fade-in'
        aria-labelledby='error-heading'
      >
        {/* λ logo */}
        <GlitchLambda className='mx-auto mb-6 h-10 w-auto text-neon' />

        {/* glitching 404 */}
        <h1
          id='error-heading'
          className='glitch font-ibm text-terminal-red text-8xl leading-none mb-4'
          data-text='404'
        >
          404
        </h1>

        {/* sub-heading */}
        <p className='font-ibm text-neon text-2xl mb-2 tracking-wider'>
          PAGE&nbsp;NOT&nbsp;FOUND
        </p>

        <p className='font-ocr text-text mb-8'>
          Looks like that directory is empty. Let's&nbsp;get you back to the
          main console.
        </p>

        {/* home button */}
        <Link
          href='/'
          className='inline-block font-ibm bg-neon text-background px-6 py-3 rounded-lg border-2 border-neon hover:bg-neon/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon transition-colors'
        >
          RETURN&nbsp;HOME
        </Link>
      </section>
    </main>
  );
}
