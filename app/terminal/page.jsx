'use client';

import Terminal from '@/components/Terminal/Terminal';
import BackgroundCanvas from '@/components/BackgroundCanvas/BackgroundCanvas';

export default function TerminalPage() {
  return (
    <div className='min-h-screen relative bg-terminal-dark'>
      <BackgroundCanvas />
      <div className='relative z-10 p-4 sm:p-6 md:p-8 w-full max-w-none flex flex-col items-center'>
        <div className='mb-6 sm:mb-8 md:mb-10 text-center'>
          <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-ibm text-terminal-green mb-2 sm:mb-4'>
            λterminal
          </h1>
        </div>

        <div className='w-full max-w-6xl'>
          <Terminal />
        </div>
      </div>
    </div>
  );
}
