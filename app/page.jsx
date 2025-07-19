'use client';

import BackgroundCanvas from '../components/BackgroundCanvas';

export default function HomePage() {
  return (
    <div className='min-h-screen relative bg-terminal-dark'>
      <BackgroundCanvas />

      {/* Minimal content to enable scrolling */}
      <div className='relative z-20'>
        <div className='h-screen'></div>
        <div className='h-screen'></div>
        <div className='h-screen'></div>
        <div className='h-screen'></div>
        <div className='h-screen'></div>
      </div>
    </div>
  );
}
