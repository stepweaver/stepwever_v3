'use client';

import DiceRoller from '@/components/DiceRoller/DiceRoller';
import BackgroundCanvas from '@/components/BackgroundCanvas/BackgroundCanvas';
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
    <div className='min-h-screen relative'>
      <BackgroundCanvas />
      {/* Full screen centered layout */}
      <div className='relative z-10 p-4 md:p-6 lg:p-8 w-full flex flex-col items-center justify-center min-h-screen'>
        <div className='w-full max-w-7xl'>
          <DiceRoller />
        </div>
      </div>
    </div>
  );
}
