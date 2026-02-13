'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import GlitchLambda from '@/components/ui/GlitchLambda';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  const navLinks = [
    { name: 'ABOUT', path: '/#about', scroll: true },
    { name: 'RESUME', path: '/resume' },
    { name: 'CODEX', path: '/codex' },
    { name: 'TERMINAL', path: '/terminal' },
    { name: 'CONTACT', path: '/contact' },
    {
      name: 'BLUESKY',
      path: 'https://bsky.app/profile/stepweaver.dev',
      external: true,
    },
    { name: 'GITHUB', path: 'https://github.com/stepweaver', external: true },
  ];

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div
      className={`md:hidden absolute z-50 ${
        isOpen ? 'right-0 top-0' : 'right-4 top-3'
      }`}
    >
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className='cursor-pointer p-3 text-2xl text-neon hover:text-accent transition-colors duration-200 rounded-xl bg-panel/50 backdrop-blur hover:bg-panel/70'
          aria-expanded={isOpen}
          aria-label='Open navigation menu'
          aria-controls='mobile-navigation-menu'
          style={{ minHeight: '44px', minWidth: '44px' }}
        >
          <span className='block font-ocr tracking-wider' aria-hidden='true'>
            ≡
          </span>
        </button>
      )}

      {isOpen && mounted && createPortal(
        <div
          className='fixed inset-0 z-[9999] flex flex-col bg-panel/98 backdrop-blur-xl'
          id='mobile-navigation-menu'
        >
          {/* Tron frame - full bleed */}
          <div className='pointer-events-none absolute inset-0 rounded-none'>
            <div className='absolute left-0 top-0 h-6 w-8 border-l-2 border-t-2 border-neon/40' />
            <div className='absolute bottom-0 right-0 h-6 w-8 border-b-2 border-r-2 border-neon/40' />
          </div>

          {/* One header row: MODULE // menu · NAV-00 · theme · close */}
          <header className='flex items-center justify-between gap-3 px-5 py-4 shrink-0'>
            <div className='flex items-baseline gap-2 min-w-0'>
              <span className='font-ocr text-[10px] tracking-[0.3em] text-neon/60 uppercase'>
                MODULE
              </span>
              <span className='font-ocr text-neon/40 text-xs' aria-hidden>//</span>
              <span className='font-ibm text-lg font-semibold text-neon truncate flex items-center gap-1.5'>
                <GlitchLambda autoGlitch={true} size='small' />
                menu
              </span>
            </div>
            <div className='flex items-center gap-3 shrink-0'>
              <span className='font-mono text-[10px] text-neon/40 hidden sm:inline'>NAV-00</span>
              <ThemeToggle />
              <button
                type='button'
                onClick={() => setIsOpen(false)}
                className='flex items-center justify-center w-11 h-11 rounded-lg text-neon hover:bg-neon/10 transition-colors touch-manipulation'
                aria-label='Close menu'
              >
                <span className='text-xl font-light'>×</span>
              </button>
            </div>
          </header>

          {/* Main nav - lots of space, simple list */}
          <nav className='flex-1 min-h-0 overflow-y-auto px-5 pb-6 pt-2' aria-label='Site navigation'>
            <ul className='font-ibm space-y-1'>
              {navLinks.map((item) => (
                <li key={item.path}>
                  {item.external ? (
                    <Link
                      href={item.path}
                      onClick={() => setIsOpen(false)}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='block py-4 text-text hover:text-neon transition-colors text-base tracking-wide border-b border-white/5 last:border-b-0'
                    >
                      <span>{item.name}</span>
                      <span className='ml-2 text-text/40 text-xs'>[ext]</span>
                    </Link>
                  ) : item.scroll ? (
                    <button
                      type='button'
                      onClick={() => {
                        setIsOpen(false);
                        if (window.location.pathname === '/') {
                          const el = document.getElementById(item.path.split('#')[1]);
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        } else window.location.href = item.path;
                      }}
                      className='block py-4 text-text hover:text-neon transition-colors w-full text-left text-base tracking-wide border-b border-white/5 last:border-b-0 bg-transparent'
                    >
                      {item.name}
                    </button>
                  ) : (
                    <Link
                      href={item.path}
                      onClick={() => setIsOpen(false)}
                      className='block py-4 text-text hover:text-neon transition-colors text-base tracking-wide border-b border-white/5 last:border-b-0'
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Minimal footer */}
          <footer className='shrink-0 px-5 py-3 border-t border-neon/10 flex items-center justify-between text-[11px] font-mono text-text/50'>
            <span>stepweaver@v3.7</span>
            <span className='flex items-center gap-1.5'>
              <span className='h-1.5 w-1.5 rounded-full bg-neon/80' />
              connected
            </span>
          </footer>
        </div>,
        document.body
      )}
    </div>
  );
}
