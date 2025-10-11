'use client';

import DiceRoller from '@/components/DiceRoller/DiceRoller';
import BackgroundCanvas from '@/components/BackgroundCanvas/BackgroundCanvas';
import ErrorBoundary from '@/components/ErrorBoundary';
import { useEffect } from 'react';

export default function DiceRollerPage() {
  // Hide footer for dice roller page (full-screen experience)
  useEffect(() => {
    const footer = document.querySelector('footer');
    if (footer) {
      footer.style.display = 'none';
    }

    // Cleanup function to restore footer when component unmounts
    return () => {
      if (footer) {
        footer.style.display = '';
      }
    };
  }, []);

  return (
    <ErrorBoundary>
      <div className='min-h-screen relative overflow-x-hidden max-w-full'>
        <BackgroundCanvas />
        {/* Full width layout */}
        <div className='relative z-10 p-1 sm:p-2 md:p-4 lg:p-8 w-full min-h-screen overflow-x-hidden max-w-full box-border'>
          <DiceRoller />
        </div>
      </div>
    </ErrorBoundary>
  );
}
