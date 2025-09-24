'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import GlitchLambda from '@/components/ui/GlitchLambda';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState('');

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className='relative z-30 min-h-screen flex flex-col justify-end bg-transparent'>
      {/* Main Footer Content */}
      <div className='max-w-7xl mx-auto px-4 md:px-6 w-full flex-1 flex flex-col justify-center'>
        {/* Logo Section - Centered */}
        <div className='mb-12 md:mb-16 lg:mb-24 flex justify-center'>
          <h2 className='text-5xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl 2xl:text-[12rem] text-terminal-green font-ibm tracking-tight leading-none flex items-center'>
            <GlitchLambda
              className='text-5xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl 2xl:text-[12rem] text-terminal-green font-ibm tracking-tight leading-none'
              size='xl'
            />
            <span>stepweaver</span>
          </h2>
        </div>

        {/* Tagline and Email Section - Centered */}
        <div className='space-y-6 md:space-y-8 lg:space-y-12'>
          <div className='flex justify-center'>
            <Link
              href='/contact'
              className='text-lg md:text-xl lg:text-4xl text-terminal-green font-ibm hover:text-terminal-white transition-colors duration-200 text-center'
            >
              inquiries@stepweaver.dev
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Section - Social Links and Legal */}
      <div className='mt-auto'>
        <div className='max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8'>
          <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-3 md:space-y-4 lg:space-y-0'>
            {/* Bottom Left - Social Links */}
            <div className='flex space-x-4 md:space-x-6'>
              <a
                href='/terminal'
                className='text-terminal-muted hover:text-terminal-green transition-colors duration-200 font-ocr text-sm md:text-base uppercase tracking-wider flex items-center'
              >
                <GlitchLambda className='text-terminal-green lowercase' />
                <span>Terminal</span>
              </a>
              <a
                href='https://github.com/stepweaver'
                target='_blank'
                rel='noopener noreferrer'
                className='text-terminal-muted hover:text-terminal-green transition-colors duration-200 font-ocr text-sm md:text-base uppercase tracking-wider'
              >
                GitHub
              </a>
              <a
                href='https://bsky.app/profile/stepweaver.dev'
                target='_blank'
                rel='noopener noreferrer'
                className='text-terminal-muted hover:text-terminal-green transition-colors duration-200 font-ocr text-sm md:text-base uppercase tracking-wider'
              >
                Bluesky
              </a>
            </div>

            {/* Bottom Right - Legal */}
            <div className='text-terminal-muted font-ocr text-xs md:text-sm leading-tight flex items-center'>
              <GlitchLambda className='text-terminal-green' />
              <span>
                stepweaver LLC · Veteran-owned · All rights reserved ·{' '}
                {currentYear}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
