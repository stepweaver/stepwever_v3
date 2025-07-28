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
    <div className='min-h-screen md:min-h-screen relative bg-terminal-dark'>
      <BackgroundCanvas />
      {/* Mobile: Full screen with prompt at bottom */}
      <div className='relative z-10 h-screen md:h-auto p-0 md:p-4 md:sm:p-6 md:md:p-8 w-full flex flex-col md:items-center md:justify-center md:min-h-screen'>
        <div className='w-full h-full md:h-auto md:max-w-6xl'>
          <Terminal />
        </div>
      </div>
    </div>
  );
}
