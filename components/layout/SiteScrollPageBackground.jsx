'use client';

import dynamic from 'next/dynamic';

const BackgroundCanvas = dynamic(
  () => import('@/components/BackgroundCanvas/BackgroundCanvas'),
  { ssr: false }
);

/**
 * Matches projects/resume pattern: full-page BackgroundCanvas behind z-10 content.
 * Use for marketing routes that are server components or need a single client boundary.
 */
export default function SiteScrollPageBackground({ children, className = '' }) {
  return (
    <div className={`relative min-h-screen ${className}`.trim()}>
      <BackgroundCanvas />
      <div className='relative z-10'>{children}</div>
    </div>
  );
}
