'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import Hero from '@/components/Hero/Hero';
import { InkDivider } from '@/components/ui/InkDivider';
import generateStructuredData from './structured-data';

const BackgroundCanvas = dynamic(
  () => import('@/components/BackgroundCanvas/BackgroundCanvas'),
  { ssr: false }
);

const Experience = dynamic(() => import('@/components/Experience/Experience'), {
  loading: () => <div className='min-h-[400px]' />,
});

// Memoize structured data to avoid regenerating on every render
const structuredData = generateStructuredData();

export default function HomePage() {
  return (
    <>
      {/* Enhanced structured data for SEO */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.website),
        }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.person),
        }}
      />

      <div className='relative'>
        <BackgroundCanvas />

        <Hero />
        <InkDivider showSeal={true} />

        <Experience />
        <InkDivider showSeal={false} />

        <section className='relative z-30 py-8'>
          <div className='w-full px-4 sm:px-6 md:px-8 lg:px-6 xl:px-6 2xl:px-6 max-w-none text-center'>
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
    </>
  );
}
