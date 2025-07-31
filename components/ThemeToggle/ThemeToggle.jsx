'use client';

import { useTheme } from '../ThemeProvider/ThemeProvider';
import Image from 'next/image';

export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  // Always render the same structure to prevent hydration mismatch
  return (
    <div className='flex items-center space-x-2'>
      {!mounted ? (
        // Skeleton state - matches the structure of the actual component
        <>
          <div className='w-8 h-8 animate-pulse bg-terminal-border rounded-full' />
          <div className='w-8 h-4 animate-pulse bg-terminal-border rounded' />
        </>
      ) : (
        // Actual component
        <div
          onClick={toggleTheme}
          className='flex items-center space-x-2 cursor-pointer select-none'
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
          <div className='relative p-2'>
            {theme === 'dark' ? (
              <div
                className='absolute inset-0 w-12 h-12 rounded-full opacity-60 blur-md'
                style={{
                  background:
                    'radial-gradient(circle, rgba(0,255,0,1) 0%, rgba(0,255,0,0.6) 30%, rgba(0,255,0,0.2) 60%, transparent 100%)',
                  transform: 'translate(-2px, -2px)',
                }}
              />
            ) : null}
            <Image
              src='/images/lambda_stepweaver.png'
              alt='Lambda symbol'
              width={32}
              height={32}
              className={`w-8 h-8 object-contain transition-all duration-300 ${
                theme === 'dark'
                  ? 'filter brightness-125 relative z-10'
                  : 'filter brightness-75'
              } hover:scale-110`}
              style={{
                filter:
                  theme === 'dark'
                    ? 'brightness(1.25)'
                    : 'brightness(0.75) drop-shadow(0 0 4px rgba(255,0,255,0.4))',
              }}
            />
          </div>

          {/* Theme indicator text */}
          <div
            className={`text-xs font-ocr font-bold transition-all duration-300 ${
              theme === 'dark' ? 'text-terminal-green' : 'text-terminal-magenta'
            }`}
          >
            {theme === 'dark' ? 'DARK' : 'LIGHT'}
          </div>
        </div>
      )}
    </div>
  );
}
