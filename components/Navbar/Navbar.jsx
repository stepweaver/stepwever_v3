'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MobileNav from './MobileNav';
import GlitchLambda from '@/components/ui/GlitchLambda';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';
import { NAV_LINKS } from '@/lib/navigation';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`pt-6 pb-4 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-terminal-dark/90 backdrop-blur-md shadow-lg shadow-terminal-green/10'
          : 'bg-transparent'
      }`}
      role='navigation'
      aria-label='Main navigation'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative'>
        <div className='flex justify-between items-center'>
          {/* Logo */}
          <Link
            href='/'
            className='flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity duration-200'
            aria-label='Go to homepage'
            aria-describedby='logo-description'
          >
            <span className='text-terminal-green font-ibm text-4xl sm:text-3xl md:text-4xl lg:text-5xl font-bold whitespace-nowrap'>
              <GlitchLambda
                className='text-neon font-ibm text-4xl sm:text-3xl md:text-4xl lg:text-5xl font-bold'
                size='large'
                aria-hidden='true'
              />
              stepweaver
            </span>
            <span id='logo-description' className='sr-only'>
              Stephen Weaver - Developer Portfolio
            </span>
          </Link>

          {/* Right side: desktop nav + mobile controls */}
          <div className='flex items-center gap-2'>
            {/* Desktop Navigation */}
            <div
              className='hidden md:flex items-center space-x-8 relative z-50'
              role='menubar'
              aria-label='Main menu'
            >
              {NAV_LINKS.map((link) =>
                (() => {
                  const linkPath = link.path.split('#')[0] || '/';
                  const isActive =
                    linkPath === '/'
                      ? pathname === '/'
                      : pathname === linkPath || pathname.startsWith(`${linkPath}/`);
                  const className = [
                    'transition-colors duration-200 font-ibm text-lg font-bold uppercase tracking-wider cursor-pointer px-3 py-2 border-b-2',
                    isActive
                      ? 'text-neon border-neon/70'
                      : 'text-text border-transparent hover:text-neon hover:border-neon/35',
                  ].join(' ');

                  return (
                    <Link
                      key={link.path}
                      href={link.path}
                      className={className}
                      role='menuitem'
                      aria-label={link.ariaLabel}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {link.name}
                    </Link>
                  );
                })()
              )}
            </div>

            {/* Mobile Navigation (includes hamburger + theme toggle) */}
            <MobileNav />
          </div>
        </div>
      </div>

      {/* Theme Toggle - desktop only (top-right corner) */}
      <div className='hidden md:block absolute top-4 right-4 z-50'>
        <ThemeToggle />
      </div>
    </nav>
  );
}
