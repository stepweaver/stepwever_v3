'use client';

import Terminal from '@/components/Terminal';

export default function TerminalPage() {
  return (
    <div className='min-h-screen bg-terminal-dark p-4'>
      <div className='max-w-4xl mx-auto'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-terminal-green mb-4'>
            Interactive Terminal
          </h1>
          <p className='text-terminal-text'>
            Welcome to the interactive terminal. Type{' '}
            <span className='text-terminal-cyan'>help</span> to see available
            commands.
          </p>
        </div>

        <div className='w-full'>
          <Terminal />
        </div>
      </div>
    </div>
  );
}
