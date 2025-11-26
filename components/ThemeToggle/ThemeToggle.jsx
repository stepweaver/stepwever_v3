'use client';

import { useTheme } from '../ThemeProvider/ThemeProvider';
import Image from 'next/image';
import './ThemeToggle.css';

export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  // Always render the same structure to prevent hydration mismatch
  return (
    <div className='flex items-center gap-3'>
      {!mounted ? (
        // Skeleton state - matches the structure of the actual component
        <div className='w-20 h-10 animate-pulse bg-terminal-border rounded-lg' />
      ) : (
        // CRT-style toggle switch
        <div
          onClick={toggleTheme}
          className='crt-toggle-container'
          role='button'
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggleTheme();
            }
          }}
          aria-label={`Switch theme (current: ${theme})`}
        >
          {/* Toggle track - now wider for 4 states */}
          <div
            className={`crt-toggle-track-four ${
              theme === 'dark' ? 'crt-toggle-dark' : 
              theme === 'light' ? 'crt-toggle-light' : 
              theme === 'monochrome' ? 'crt-toggle-monochrome' : 'crt-toggle-monochrome-inverted'
            }`}
          >
            {/* Scanline effect overlay */}
            <div className='crt-scanlines' />

            {/* Toggle slider with lambda */}
            <div
              className={`crt-toggle-slider-four ${
                theme === 'dark' ? 'crt-slider-dark' : 
                theme === 'light' ? 'crt-slider-light' : 
                theme === 'monochrome' ? 'crt-slider-monochrome' : 'crt-slider-monochrome-inverted'
              }`}
            >
              {/* Glow effect */}
              <div
                className={`crt-toggle-glow ${
                  theme === 'dark' ? 'crt-glow-green' : 
                  theme === 'light' ? 'crt-glow-magenta' : 
                  theme === 'monochrome' ? 'crt-glow-white' : 'crt-glow-black'
                }`}
              />

              {/* Lambda symbol */}
              <Image
                src='/images/lambda_stepweaver.png'
                alt='Lambda'
                width={20}
                height={20}
                className='crt-lambda-icon'
              />
            </div>

            {/* Theme labels with lambda images */}
            <div className='crt-toggle-labels-four'>
              <Image
                src='/images/lambda_stepweaver.png'
                alt='Dark theme'
                width={12}
                height={12}
                className={`crt-lambda-label crt-lambda-green ${
                  theme === 'dark' ? 'crt-label-active' : 'crt-label-inactive'
                }`}
              />
              <Image
                src='/images/lambda_stepweaver.png'
                alt='Light theme'
                width={12}
                height={12}
                className={`crt-lambda-label crt-lambda-pink ${
                  theme === 'light' ? 'crt-label-active' : 'crt-label-inactive'
                }`}
              />
              <Image
                src='/images/lambda_stepweaver.png'
                alt='Monochrome theme'
                width={12}
                height={12}
                className={`crt-lambda-label crt-lambda-white ${
                  theme === 'monochrome' ? 'crt-label-active' : 'crt-label-inactive'
                }`}
              />
              <Image
                src='/images/lambda_stepweaver.png'
                alt='Monochrome inverted theme'
                width={12}
                height={12}
                className={`crt-lambda-label crt-lambda-black ${
                  theme === 'monochrome-inverted' ? 'crt-label-active' : 'crt-label-inactive'
                }`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
