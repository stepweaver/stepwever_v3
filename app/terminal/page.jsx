'use client';

import Terminal from '@/components/Terminal/Terminal';
import BackgroundCanvas from '@/components/BackgroundCanvas/BackgroundCanvas';

export default function TerminalPage() {
  return (
    <div className='min-h-screen relative bg-terminal-dark'>
      <BackgroundCanvas />
      <div className='relative z-10 p-4 sm:p-6 md:p-8 w-full max-w-none flex flex-col items-center mt-8 sm:mt-12 md:mt-16'>
        <div className='w-full max-w-7xl'>
          <Terminal />
        </div>
      </div>
    </div>
  );
}
