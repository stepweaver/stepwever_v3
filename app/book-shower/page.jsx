'use client';

import dynamic from 'next/dynamic';

// Lazy load BackgroundCanvas
const BackgroundCanvas = dynamic(
  () => import('@/components/BackgroundCanvas/BackgroundCanvas'),
  { ssr: false }
);

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwR1AWdInKRg4yaKE4NRxTX_99yqJ3RyxyCrsWSgVe6flYgIO6ZLzHZX8AsOyNGy0Ks/exec';

export default function BookShowerPage() {
  return (
    <div className='relative min-h-screen'>
      <BackgroundCanvas />
      
      <div className='relative z-10 w-full'>
        <section className='w-full px-4 sm:px-6 lg:px-8 py-16 md:py-24'>
          <div className='w-full max-w-7xl mx-auto'>
            <header className='mb-8'>
              <h1 className='font-ibm font-bold text-4xl sm:text-5xl md:text-6xl text-terminal-green leading-tight mb-4'>
                Book Shower
              </h1>
            </header>
            
            <div className='w-full h-[calc(100vh-12rem)] min-h-[600px] border border-terminal-green/50 bg-terminal-dark/20 backdrop-blur-xl'>
              <iframe
                src={GOOGLE_SCRIPT_URL}
                width='100%'
                height='100%'
                frameBorder='0'
                title='Book Shower'
                className='w-full h-full'
                allow='fullscreen'
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

