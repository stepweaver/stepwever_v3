'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import Hero from '@/components/Hero/Hero';
import { InkDivider } from '@/components/ui/InkDivider';

const BackgroundCanvas = dynamic(
  () => import('@/components/BackgroundCanvas/BackgroundCanvas'),
  { ssr: false }
);

const Experience = dynamic(() => import('@/components/Experience/Experience'), {
  loading: () => <div className='min-h-[400px]' />,
});

export default function HomePageContent() {
  return (
    <div className='relative'>
      <BackgroundCanvas />

      <Hero />
      <InkDivider showSeal={true} />

      <Experience />
      <InkDivider showSeal={false} />

      <section className='relative z-30 py-8'>
        <div className='w-full px-2 sm:px-4 md:px-3 lg:px-4 max-w-none text-center'>
          <p className='text-xs tracking-[0.2em] text-neon/70 font-ocr uppercase mb-2'>RECENT INTEL</p>
          <Link
            href='/codex'
            className='text-neon hover:text-accent transition-colors font-ibm text-lg underline'
          >
            View Codex →
          </Link>
        </div>
      </section>
    </div>
  );
}
