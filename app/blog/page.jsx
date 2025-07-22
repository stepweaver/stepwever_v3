'use client';

import BackgroundCanvas from '@/components/BackgroundCanvas/BackgroundCanvas';

export default function BlogPage() {
  return (
    <div className='min-h-screen relative bg-terminal-dark'>
      <BackgroundCanvas />
      <div className='relative z-10 flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold text-terminal-green mb-4 font-ibm'>
            Blog
          </h1>
          <p className='text-terminal-text text-xl mb-8 font-ocr'>
            Coming Soon
          </p>
          <p className='text-terminal-dimmed max-w-md mx-auto'>
            We're working on some great content. Check back soon for insights on
            automation, business optimization, and growth strategies.
          </p>
          <a
            href='/'
            className='inline-block mt-8 text-terminal-cyan hover:text-terminal-green transition-colors duration-300 font-ibm'
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
