'use client';

import dynamic from 'next/dynamic';
import Hero from '@/components/Hero/Hero';
import Experience from '@/components/Experience/Experience';
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
      <InkDivider showSeal={false} />
    </div>
  );
}
