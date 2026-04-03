'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import Hero from '@/components/Hero/Hero';
import Experience from '@/components/Experience/Experience';
import TerminalLink from '@/components/Hero/TerminalLink';
import { InkDivider } from '@/components/ui/InkDivider';

const BackgroundCanvas = dynamic(
  () => import('@/components/BackgroundCanvas/BackgroundCanvas'),
  { ssr: false }
);

export default function HomePageContent() {
  return (
    <div className='relative'>
      <BackgroundCanvas />

      <Hero />
      <InkDivider showSeal={true} className='py-0.5 sm:py-1' />

      <Experience />

      <div className='relative z-30 w-full px-3 sm:px-6 md:px-8 lg:px-12 py-4'>
        <TerminalLink />
      </div>

      {/* Quick entry strip */}
      <div className='relative z-30 w-full px-3 sm:px-6 md:px-8 lg:px-12 py-4'>
        <div className='border border-neon/15 bg-panel/20 p-4'>
          <p className='font-ocr text-xs uppercase tracking-[0.28em] text-text-label mb-3'>
            Quick entry
          </p>
          <div className='flex flex-wrap gap-3'>
            <Link
              href='/services'
              className='inline-flex items-center border border-neon/30 px-4 py-2 font-ocr text-xs text-text-secondary uppercase tracking-[0.12em] hover:border-neon/60 hover:text-neon transition-colors'
            >
              Services →
            </Link>
            <Link
              href='/start-here'
              className='inline-flex items-center border border-neon/30 px-4 py-2 font-ocr text-xs text-text-secondary uppercase tracking-[0.12em] hover:border-neon/60 hover:text-neon transition-colors'
            >
              Start Here →
            </Link>
            <Link
              href='/brief'
              className='inline-flex items-center border border-neon/30 px-4 py-2 font-ocr text-xs text-text-secondary uppercase tracking-[0.12em] hover:border-neon/60 hover:text-neon transition-colors'
            >
              Brief →
            </Link>
            <Link
              href='/capabilities'
              className='inline-flex items-center border border-neon/30 px-4 py-2 font-ocr text-xs text-text-secondary uppercase tracking-[0.12em] hover:border-neon/60 hover:text-neon transition-colors'
            >
              Capabilities →
            </Link>
          </div>
        </div>
      </div>

      <InkDivider showSeal={false} />
    </div>
  );
}
