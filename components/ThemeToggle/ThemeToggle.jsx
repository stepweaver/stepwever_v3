'use client';

import { useTheme } from '../ThemeProvider/ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <button className='theme-toggle-skeleton w-10 h-10 rounded-lg bg-terminal-border animate-pulse' />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className='theme-toggle relative w-10 h-10 rounded-lg border border-terminal-green bg-terminal-dark hover:bg-terminal-light transition-all duration-300 group overflow-hidden cursor-pointer'
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
    >
      {/* Background glow effect */}
      <div className='absolute inset-0 bg-gradient-to-br from-terminal-green/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

      {/* Icon container */}
      <div className='relative z-10 flex items-center justify-center w-full h-full'>
        {theme === 'dark' ? (
          // Sun icon for light mode
          <svg
            className='w-5 h-5 text-terminal-yellow transition-all duration-300 group-hover:scale-110 group-hover:text-terminal-green'
            fill='currentColor'
            viewBox='0 0 24 24'
          >
            <path d='M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z' />
          </svg>
        ) : (
          // Moon icon for dark mode
          <svg
            className='w-5 h-5 text-terminal-blue transition-all duration-300 group-hover:scale-110 group-hover:text-terminal-green'
            fill='currentColor'
            viewBox='0 0 24 24'
          >
            <path d='M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z' />
          </svg>
        )}
      </div>

      {/* Glow effect on hover */}
      <div className='absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'>
        <div className='absolute inset-0 rounded-lg bg-terminal-green/20 blur-sm' />
        <div className='absolute inset-0 rounded-lg border border-terminal-green/50' />
      </div>
    </button>
  );
}
