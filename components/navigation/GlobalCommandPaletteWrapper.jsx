'use client';

import dynamic from 'next/dynamic';

const GlobalCommandPalette = dynamic(() => import('./GlobalCommandPalette'), {
  ssr: false,
});

export default function GlobalCommandPaletteWrapper() {
  return <GlobalCommandPalette />;
}
