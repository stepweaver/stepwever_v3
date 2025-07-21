'use client';

import { useState, useEffect } from 'react';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState('');

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className='relative z-30 min-h-screen flex flex-col justify-end'>
      {/* Main Footer Content */}
      <div className='max-w-7xl mx-auto px-6 w-full flex-1 flex flex-col justify-center'>
        {/* Logo Section - Centered */}
        <div className='mb-16 lg:mb-24'>
          <h2 className='text-6xl lg:text-8xl xl:text-9xl 2xl:text-[12rem] text-terminal-green font-ibm tracking-tight leading-none'>
            λstepweaver
          </h2>
        </div>

        {/* Tagline and Email Section - Left aligned */}
        <div className='space-y-8 lg:space-y-12'>
          <div className='flex flex-col lg:flex-row lg:items-center lg:gap-8 space-y-4 lg:space-y-0'>
            <p className='text-lg lg:text-5xl text-terminal-text font-light'>
              Growth systems for rebels who ship.
            </p>

            <a
              href='mailto:inquiries@stepweaver.dev'
              className='text-xl lg:text-4xl text-terminal-green font-ibm hover:text-terminal-white transition-colors duration-200'
            >
              inquiries@stepweaver.dev
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section - Social Links and Legal */}
      <div className='mt-auto'>
        <div className='max-w-7xl mx-auto px-6 py-8'>
          <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0'>
            {/* Bottom Left - Social Links */}
            <div className='flex space-x-6'>
              <a
                href='https://github.com/stepweaver'
                target='_blank'
                rel='noopener noreferrer'
                className='text-terminal-muted hover:text-terminal-green transition-colors duration-200 font-ocr text-base uppercase tracking-wider'
              >
                GitHub
              </a>
              <a
                href='https://bsky.app/profile/stepweaver.bsky.social'
                target='_blank'
                rel='noopener noreferrer'
                className='text-terminal-muted hover:text-terminal-green transition-colors duration-200 font-ocr text-base uppercase tracking-wider'
              >
                Bluesky
              </a>
            </div>

            {/* Bottom Right - Legal */}
            <div className='text-terminal-muted font-ocr text-sm'>
              λstepweaver LLC · Veteran-owned · All rights reserved ·{' '}
              {currentYear}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
