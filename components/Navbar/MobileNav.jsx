'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import GlitchLambda from '@/components/ui/GlitchLambda';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';
import { MOBILE_NAV_LINKS } from '@/lib/navigation';

/** Animated hamburger that flips into X */
function HamburgerIcon({ open }) {
  return (
    <span className='relative flex h-5 w-6 flex-col items-center justify-center' aria-hidden='true'>
      <span
        className={`absolute h-0.5 w-5 origin-center rounded-full bg-current transition-all duration-300 ease-out ${
          open ? 'rotate-45 translate-y-1.5' : '-translate-y-1.5 rotate-0'
        }`}
      />
      <span
        className={`h-0.5 w-5 origin-center rounded-full bg-current transition-all duration-300 ease-out ${
          open ? 'scale-x-0 opacity-0' : 'scale-x-100 opacity-100'
        }`}
      />
      <span
        className={`absolute h-0.5 w-5 origin-center rounded-full bg-current transition-all duration-300 ease-out ${
          open ? '-rotate-45 -translate-y-1.5' : 'translate-y-1.5 rotate-0'
        }`}
      />
    </span>
  );
}

const SLIDE_OUT_DURATION = 400;

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, SLIDE_OUT_DURATION);
  };

  // Uppercase names for mobile nav aesthetic
  const navLinks = MOBILE_NAV_LINKS.map((link) => ({
    ...link,
    name: link.name.toUpperCase(),
  }));

  // Prevent body scroll when menu is open or closing
  useEffect(() => {
    if (isOpen || isClosing) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, isClosing]);

  return (
    <div className='md:hidden'>
      {/* Toggle button when closed - in navbar */}
      {!isOpen && (
        <div className='absolute right-4 top-3 z-50'>
          <button
            onClick={() => setIsOpen(true)}
            className='flex cursor-pointer items-center justify-center rounded-sm bg-panel/50 p-3 text-neon backdrop-blur transition-colors duration-200 hover:bg-panel/70 hover:text-accent'
            aria-expanded={false}
            aria-label='Open navigation menu'
            aria-controls='mobile-navigation-menu'
            style={{ minHeight: '44px', minWidth: '44px' }}
          >
            <HamburgerIcon open={false} />
          </button>
        </div>
      )}

      {(isOpen || isClosing) && mounted && createPortal(
        <div
          className={`fixed inset-0 z-[9999] flex flex-col bg-panel/98 backdrop-blur-xl ${
            isClosing ? 'animate-mobile-nav-out' : 'animate-mobile-nav-in'
          }`}
          id='mobile-navigation-menu'
        >
          {/* Tron frame - full bleed */}
          <div className='pointer-events-none absolute inset-0 rounded-none'>
            <div className='absolute left-0 top-0 h-6 w-8 border-l-2 border-t-2 border-neon/40' />
            <div className='absolute bottom-0 right-0 h-6 w-8 border-b-2 border-r-2 border-neon/40' />
          </div>

          {/* One header row: stepweaver · NAV-00 · theme · close (X in portal so always visible) */}
          <header className='flex items-center justify-between gap-3 px-5 py-4 shrink-0'>
            <div className='flex items-baseline gap-2 min-w-0'>
              <span className='font-ibm text-lg font-semibold text-neon truncate flex items-center gap-1.5'>
                <GlitchLambda autoGlitch={true} size='small' />
                stepweaver
              </span>
            </div>
            <div className='flex items-center gap-3 shrink-0'>
              <span className='font-mono text-[10px] text-neon/40 hidden sm:inline'>NAV-00</span>
              <ThemeToggle />
              <button
                type='button'
                onClick={handleClose}
                className='flex items-center justify-center w-11 h-11 rounded-sm text-neon hover:bg-neon/10 transition-colors touch-manipulation font-sans text-4xl'
                aria-label='Close menu'
              >
                »
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
                      onClick={handleClose}
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
                        handleClose();
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
                      onClick={handleClose}
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
            <span>stepweaver@v3.8</span>
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
