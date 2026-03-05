'use client';

import dynamic from 'next/dynamic';
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
    </div>
  );
}
