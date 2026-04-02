'use client';

import dynamic from 'next/dynamic';
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

      <InkDivider showSeal={false} />
    </div>
  );
}
