'use client';

import Link from 'next/link';
import MobileNav from './MobileNav';
import GlitchLambda from '@/components/ui/GlitchLambda';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';

export default function Navbar() {
  return (
    <nav
      className='pt-6 pb-4 relative z-50 bg-transparent'
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
                className='text-terminal-green font-ibm text-4xl sm:text-3xl md:text-4xl lg:text-5xl font-bold'
                size='large'
                aria-hidden='true'
              />
              stepweaver
            </span>
            <span id='logo-description' className='sr-only'>
              λstepweaver - Practical transformations, powered by code
            </span>
          </button>

          {/* Desktop Navigation */}
          <div
            className='hidden md:flex items-center space-x-8 relative z-50'
            role='menubar'
            aria-label='Main menu'
          >
            <button
              type='button'
              className='text-terminal-text hover:text-terminal-green transition-colors duration-200 font-ibm text-lg font-bold uppercase tracking-wider cursor-pointer px-4 py-2 border border-transparent hover:border-terminal-green bg-transparent'
              onClick={() => {
                // If we're on the home page, scroll to section
                if (window.location.pathname === '/') {
                  const element = document.getElementById('about');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                } else {
                  // If we're on another page, navigate to home and scroll
                  window.location.href = '/#about';
                }
              }}
              role='menuitem'
              aria-label='About section'
            >
              About
            </button>
            <Link
              href='/codex'
              className='text-terminal-text hover:text-terminal-green transition-colors duration-200 font-ibm text-lg font-bold uppercase tracking-wider cursor-pointer px-4 py-2 border border-transparent hover:border-terminal-green bg-transparent'
              role='menuitem'
              aria-label='View blog posts and projects'
            >
              Codex
            </Link>
            <Link
              href='/terminal'
              className='text-terminal-text hover:text-terminal-green transition-colors duration-200 font-ibm text-lg font-bold uppercase tracking-wider cursor-pointer px-4 py-2 border border-transparent hover:border-terminal-green bg-transparent'
              role='menuitem'
              aria-label='Interactive terminal interface'
            >
              Terminal
            </Link>
            <Link
              href='/services'
              className='text-terminal-text hover:text-terminal-green transition-colors duration-200 font-ibm text-lg font-bold uppercase tracking-wider cursor-pointer px-4 py-2 border border-transparent hover:border-terminal-green bg-transparent'
              role='menuitem'
              aria-label='View our services and pricing'
            >
              Services
            </Link>
            <Link
              href='/contact'
              className='text-terminal-text hover:text-terminal-green transition-colors duration-200 font-ibm text-lg font-bold uppercase tracking-wider cursor-pointer px-4 py-2 border border-transparent hover:border-terminal-green bg-transparent'
              role='menuitem'
              aria-label='Contact us about your project'
            >
              Contact
            </Link>
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
