'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '@/styles/terminal-ui.module.css';
import terminalStyles from '@/styles/terminal.module.css';
import GlitchLambda from '@/components/ui/GlitchLambda';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [animatedItems, setAnimatedItems] = useState([]);
  const pathname = usePathname();

  const navLinks = [
    { name: 'WORK', path: '/#success-stories', scroll: true },
    { name: 'ABOUT', path: '/#about', scroll: true },
    { name: 'BLOG', path: '/blog' },
    { name: 'CONTACT', path: '/contact' },
    {
      name: 'BLUESKY',
      path: 'https://bsky.app/profile/stepweaver.dev',
      external: true,
    },
    { name: 'GITHUB', path: 'https://github.com/stepweaver', external: true },
  ];

  // First effect just tracks open state
  useEffect(() => {
    if (!isOpen) {
      setAnimatedItems([]);
    }
  }, [isOpen]);

  // Second effect handles animations when open
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        const items = [];
        navLinks.forEach((_, index) => {
          setTimeout(() => {
            setAnimatedItems((prev) => [...prev, index]);
          }, index * 100);
        });
        return items;
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

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

  const handleNavClick = (link) => {
    setIsOpen(false);

    if (link.scroll) {
      // If we're on the home page, scroll to section
      if (window.location.pathname === '/') {
        const element = document.getElementById(link.path.split('#')[1]);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // If we're on another page, navigate to home and scroll
        window.location.href = link.path;
      }
    }
  };

  return (
    <div
      className={`md:hidden absolute z-50 ${
        isOpen ? 'right-0 top-0' : 'right-4 top-6'
      }`}
    >
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className='cursor-pointer p-3 text-3xl text-terminal-green hover:text-terminal-yellow transition-colors duration-200'
          aria-expanded={isOpen}
          aria-label='Toggle navigation menu'
        >
          <span className='block'>≡</span>
        </button>
      )}

      {isOpen && (
        <div
          className={`fixed inset-0 ${styles.terminalDark} animate-fadeIn overflow-hidden ${terminalStyles.crtEffect} z-[9999]`}
          style={{
            boxShadow: 'inset 0 0 60px rgba(0, 255, 65, 0.15)',
          }}
        >
          {/* Scanline effect */}
          <div className={terminalStyles.scanlinePattern}></div>

          <div className={styles.terminalHeader}>
            <div className='text-xl font-ibm text-terminal-green flex items-center gap-2'>
              <GlitchLambda autoGlitch={isOpen} />
              ~/menu
            </div>

            <div className='flex gap-2'>
              <div
                className={`${styles.terminalButton} bg-terminal-yellow cursor-pointer`}
                onClick={() => setIsOpen(false)}
              ></div>
              <div
                className={`${styles.terminalButton} bg-terminal-green cursor-pointer`}
                onClick={() => setIsOpen(false)}
              ></div>
              <div
                className={`${styles.terminalButton} bg-terminal-red cursor-pointer`}
                onClick={() => setIsOpen(false)}
              ></div>
            </div>
          </div>

          <div className='p-4 md:p-6 text-lg md:text-xl h-[calc(100vh-56px)] overflow-y-auto'>
            <div className='mb-6 text-terminal-dimmed text-sm border-b border-terminal-dimmed/20 pb-2'>
              # Navigation options |{' '}
              <span className='text-terminal-green'>user@stepweaver.dev</span>
            </div>

            <ul className='py-3 font-ibm space-y-4 md:space-y-6'>
              {navLinks.map((item, index) => (
                <li
                  key={item.path}
                  className={`transition-all duration-300 ${
                    animatedItems.includes(index)
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 translate-x-4'
                  }`}
                >
                  {item.external ? (
                    <Link
                      href={item.path}
                      onClick={() => setIsOpen(false)}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center py-2 px-3 transition-all duration-200 rounded-sm text-terminal-text hover:text-terminal-green hover:bg-terminal/40'
                    >
                      <span className='truncate'>{item.name}</span>
                      <span className='ml-2 text-terminal-dimmed text-sm flex-shrink-0'>
                        [ext]
                      </span>
                    </Link>
                  ) : item.scroll ? (
                    <button
                      onClick={() => handleNavClick(item)}
                      className='flex items-center py-2 px-3 transition-all duration-200 rounded-sm text-terminal-text hover:text-terminal-green hover:bg-terminal/40 w-full text-left bg-transparent border-none'
                    >
                      <span className='truncate'>{item.name}</span>
                    </button>
                  ) : (
                    <Link
                      href={item.path}
                      onClick={() => setIsOpen(false)}
                      className='flex items-center py-2 px-3 transition-all duration-200 rounded-sm text-terminal-text hover:text-terminal-green hover:bg-terminal/40'
                    >
                      <span className='truncate'>{item.name}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <div className='absolute bottom-0 left-0 right-0 border-t border-terminal-dimmed/30 py-4 px-4 md:px-6 text-terminal-dimmed text-sm bg-terminal-dark/80 backdrop-blur-sm'>
              <div className='flex justify-between items-center'>
                <div className='truncate'>stepweaver@v3.0</div>
                <div className='flex items-center flex-shrink-0'>
                  <span className='h-2 w-2 rounded-full bg-terminal-green mr-2 animate-pulse'></span>
                  <span>connected</span>
                </div>
              </div>

              {/* Simulated terminal input */}
              <div className='mt-3 flex items-center'>
                <span className='text-terminal-text'>navigate</span>
                <span className='ml-1 h-4 w-2 bg-terminal-green animate-blink'></span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
