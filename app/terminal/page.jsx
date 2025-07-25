'use client';

import Terminal from '@/components/Terminal/Terminal';
import BackgroundCanvas from '@/components/BackgroundCanvas/BackgroundCanvas';

export default function TerminalPage() {
  return (
    <div className='min-h-screen relative bg-terminal-dark flex items-center justify-center'>
      <BackgroundCanvas />
      <div className='relative z-10 p-2 sm:p-4 w-full max-w-4xl'>
        <div className='mb-4 sm:mb-8'>
          <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-ibm text-terminal-green mb-2 sm:mb-4'>
            λterminal
          </h1>
        </div>

        <div className='w-full'>
          <Terminal />
        </div>
      </div>
    </div>
  );
}
