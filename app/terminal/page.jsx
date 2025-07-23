'use client';

import Terminal from '@/components/Terminal';
import BackgroundCanvas from '@/components/BackgroundCanvas/BackgroundCanvas';

export default function TerminalPage() {
  return (
    <div className='min-h-screen relative bg-terminal-dark'>
      <BackgroundCanvas />
      <div className='relative z-10 p-2 sm:p-4'>
        <div className='max-w-4xl mx-auto'>
          <div className='mb-4 sm:mb-8'>
            <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-ibm text-terminal-green mb-2 sm:mb-4'>
              λstepweaver Terminal
            </h1>
          </div>

          <div className='w-full'>
            <Terminal />
          </div>
        </div>
      </div>
    </div>
  );
}
