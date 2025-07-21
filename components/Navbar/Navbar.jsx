'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className='py-8 relative z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center'>
          {/* Logo */}
          <button
            type='button'
            className='flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity duration-200 bg-transparent border-none'
            onClick={() => {
              window.location.href = '/';
            }}
          >
            <span className='text-terminal-green font-ibm text-5xl font-bold'>
              λstepweaver
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-12 relative z-50'>
            <button
              type='button'
              className='text-terminal-text hover:text-terminal-green transition-colors duration-200 font-ibm text-lg font-bold uppercase tracking-wider cursor-pointer px-4 py-2 border border-transparent hover:border-terminal-green bg-transparent'
              onClick={() => {
                // If we're on the home page, scroll to section
                if (window.location.pathname === '/') {
                  const element = document.getElementById('success-stories');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                } else {
                  // If we're on another page, navigate to home and scroll
                  window.location.href = '/#success-stories';
                }
              }}
            >
              Work
            </button>
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
            >
              About
            </button>
            <Link
              href='/contact'
              className='text-terminal-text hover:text-terminal-green transition-colors duration-200 font-ibm text-lg font-bold uppercase tracking-wider cursor-pointer px-4 py-2 border border-transparent hover:border-terminal-green bg-transparent'
            >
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden'>
            <button
              onClick={toggleMenu}
              className='text-terminal-text hover:text-terminal-green transition-colors duration-200'
              aria-label='Toggle menu'
            >
              <svg
                className='h-6 w-6'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                {isMenuOpen ? (
                  <path d='M6 18L18 6M6 6l12 12' />
                ) : (
                  <path d='M4 6h16M4 12h16M4 18h16' />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className='md:hidden'>
            <div className='px-2 pt-4 space-y-3'>
              <button
                type='button'
                className='block w-full text-left px-3 py-2 text-terminal-text hover:text-terminal-green transition-colors duration-200 font-ibm text-lg font-bold uppercase tracking-wider cursor-pointer bg-transparent border-none'
                onClick={() => {
                  setIsMenuOpen(false);
                  // If we're on the home page, scroll to section
                  if (window.location.pathname === '/') {
                    const element = document.getElementById('success-stories');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  } else {
                    // If we're on another page, navigate to home and scroll
                    window.location.href = '/#success-stories';
                  }
                }}
              >
                Work
              </button>
              <button
                type='button'
                className='block w-full text-left px-3 py-2 text-terminal-text hover:text-terminal-green transition-colors duration-200 font-ibm text-lg font-bold uppercase tracking-wider cursor-pointer bg-transparent border-none'
                onClick={() => {
                  setIsMenuOpen(false);
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
              >
                About
              </button>
              <Link
                href='/contact'
                className='block w-full text-left px-3 py-2 text-terminal-text hover:text-terminal-green transition-colors duration-200 font-ibm text-lg font-bold uppercase tracking-wider cursor-pointer bg-transparent border-none'
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
