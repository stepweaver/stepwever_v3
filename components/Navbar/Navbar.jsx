'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import MobileNav from './MobileNav';
import GlitchLambda from '@/components/ui/GlitchLambda';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';
import { NAV_LINKS } from '@/lib/navigation';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine if scrolled past threshold
      setScrolled(currentScrollY > 20);

      // Show/hide navbar based on scroll direction
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        // Scrolling up or near top - show navbar
        setVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past threshold - hide navbar
        setVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`pt-6 pb-4 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      } ${
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
          <button
            type='button'
            className='flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity duration-200 bg-transparent border-none'
            onClick={() => {
              window.location.href = '/';
            }}
            aria-label='Go to homepage'
            aria-describedby='logo-description'
          >
            <span className='text-terminal-green font-ibm text-4xl sm:text-3xl md:text-4xl lg:text-5xl font-bold'>
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
          </button>

          {/* Desktop Navigation */}
          <div
            className='hidden md:flex items-center space-x-8 relative z-50'
            role='menubar'
            aria-label='Main menu'
          >
            {NAV_LINKS.map((link) =>
              link.scroll ? (
                <button
                  key={link.path}
                  onClick={() => {
                    if (window.location.pathname === '/') {
                      document
                        .getElementById(link.path.split('#')[1])
                        ?.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      window.location.href = link.path;
                    }
                  }}
                  className='text-text hover:text-neon transition-colors duration-200 font-ibm text-lg font-bold uppercase tracking-wider cursor-pointer px-4 py-2 bg-transparent'
                  role='menuitem'
                  aria-label={link.ariaLabel}
                >
                  {link.name}
                </button>
              ) : (
                <Link
                  key={link.path}
                  href={link.path}
                  className='text-text hover:text-neon transition-colors duration-200 font-ibm text-lg font-bold uppercase tracking-wider cursor-pointer px-4 py-2 bg-transparent'
                  role='menuitem'
                  aria-label={link.ariaLabel}
                >
                  {link.name}
                </Link>
              )
            )}
          </div>
        </div>
      </div>

      {/* Theme Toggle - Corner Position */}
      <div className='hidden md:block absolute top-4 right-4 z-50'>
        <ThemeToggle />
      </div>

      {/* Mobile Navigation */}
      <MobileNav />
    </nav>
  );
}
