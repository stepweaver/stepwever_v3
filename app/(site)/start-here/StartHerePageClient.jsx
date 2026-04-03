'use client';

import { useState, useRef, useCallback } from 'react';
import StartHereTrackCards from '@/components/start-here/StartHereTrackCards';
import PathwayPanel from '@/components/start-here/PathwayPanel';
import SiteScrollPageBackground from '@/components/layout/SiteScrollPageBackground';
import { START_HERE_TRACKS } from '@/lib/startHereData';

export default function StartHerePageClient() {
  const [activeKey, setActiveKey] = useState(START_HERE_TRACKS[0].key);
  const profileRef = useRef(null);
  const activeTrack = START_HERE_TRACKS.find((t) => t.key === activeKey);

  const handleSelectTrack = useCallback((key) => {
    setActiveKey(key);
    // Wait for paint so PathwayPanel updates, then snap profile into view (esp. mobile)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        profileRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    });
  }, []);

  return (
    <SiteScrollPageBackground>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Header */}
        <section className='relative border border-neon/20 bg-panel/25 p-6 sm:p-8 mb-8'>
          <div className='pointer-events-none absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-neon/60' />
          <div className='pointer-events-none absolute right-0 top-0 h-6 w-6 border-r-2 border-t-2 border-neon/25' />
          <div className='pointer-events-none absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-neon/25' />
          <div className='pointer-events-none absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-neon/60' />

          <p className='font-ocr text-xs uppercase tracking-[0.28em] text-text-label mb-4'>
            λstepweaver // start here
          </p>
          <h1 className='font-ibm text-2xl sm:text-3xl md:text-4xl text-neon leading-tight mb-4'>
            Pick your path.
          </h1>
          <p className='font-ibm text-base sm:text-lg text-text-secondary leading-relaxed max-w-3xl'>
            The site has a lot of entry points. This page gives you the shortest route to what matters based on who you are and what you need.
          </p>
        </section>

        {/* Track selector */}
        <section className='mb-2'>
          <p className='font-ocr text-xs uppercase tracking-[0.28em] text-text-label mb-4'>
            Select your track
          </p>
          <StartHereTrackCards
            tracks={START_HERE_TRACKS}
            activeKey={activeKey}
            onSelect={handleSelectTrack}
          />
        </section>

        {/* Pathway detail — scroll target when a track is selected */}
        <div
          ref={profileRef}
          id='start-here-profile'
          className='scroll-mt-24 md:scroll-mt-28'
        >
          <PathwayPanel track={activeTrack} />
        </div>
      </div>
    </SiteScrollPageBackground>
  );
}
