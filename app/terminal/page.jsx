'use client';

import Terminal from '@/components/Terminal/Terminal';
import BackgroundCanvas from '@/components/BackgroundCanvas/BackgroundCanvas';
import { useEffect } from 'react';

export default function TerminalPage() {
  // Hide footer for terminal page
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
    <div className='min-h-screen relative bg-terminal-dark'>
      <BackgroundCanvas />
      <div className='relative z-10 p-4 sm:p-6 md:p-8 w-full max-w-none flex flex-col items-center justify-center min-h-screen'>
        <div className='w-full max-w-6xl'>
          <Terminal />
        </div>
      </div>
    </div>
  );
}
