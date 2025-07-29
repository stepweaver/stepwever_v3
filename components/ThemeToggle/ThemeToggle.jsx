'use client';

import { useTheme } from '../ThemeProvider/ThemeProvider';
import Image from 'next/image';

export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className='w-8 h-8 animate-pulse bg-terminal-border rounded-full' />
    );
  }

  return (
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
      <Image
        src='/images/lambda_stepweaver.png'
        alt='Lambda symbol'
        width={32}
        height={32}
        className={`w-8 h-8 object-contain transition-all duration-300 ${
          theme === 'dark'
            ? 'filter brightness-100 drop-shadow-[0_0_4px_rgba(0,255,0,0.4)]'
            : 'filter brightness-75 drop-shadow-[0_0_4px_rgba(255,0,255,0.4)]'
        } hover:scale-110`}
      />

      {/* Theme indicator text */}
      <div
        className={`text-xs font-ocr font-bold transition-all duration-300 ${
          theme === 'dark' ? 'text-terminal-green' : 'text-terminal-magenta'
        }`}
      >
        {theme === 'dark' ? 'DARK' : 'LIGHT'}
      </div>
    </div>
  );
}
