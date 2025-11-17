'use client';

import dynamic from 'next/dynamic';

// Client component wrapper for Analytics to allow ssr: false
const Analytics = dynamic(
  () => import('@vercel/analytics/next').then((mod) => ({ default: mod.Analytics })),
  {
    ssr: false, // Analytics doesn't need SSR
  }
);

export default Analytics;

