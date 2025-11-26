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
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        >
          {/* Toggle track */}
          <div
            className={`crt-toggle-track ${
              theme === 'dark' ? 'crt-toggle-dark' : 'crt-toggle-light'
            }`}
          >
            {/* Scanline effect overlay */}
            <div className='crt-scanlines' />

            {/* Toggle slider with lambda */}
            <div
              className={`crt-toggle-slider ${
                theme === 'dark' ? 'crt-slider-dark' : 'crt-slider-light'
              }`}
            >
              {/* Glow effect */}
              <div
                className={`crt-toggle-glow ${
                  theme === 'dark' ? 'crt-glow-green' : 'crt-glow-magenta'
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

            {/* Theme labels */}
            <div className='crt-toggle-labels'>
              <span
                className={`crt-label-dark ${
                  theme === 'dark' ? 'crt-label-active' : 'crt-label-inactive'
                }`}
              >
                λ
              </span>
              <span
                className={`crt-label-light ${
                  theme === 'light' ? 'crt-label-active' : 'crt-label-inactive'
                }`}
              >
                λ
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
