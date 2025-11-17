'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SiBluesky, SiGithub } from 'react-icons/si';
import GlitchLambda from '@/components/ui/GlitchLambda';

const FOOTER_LINKS = [
  {
    label: 'terminal',
    href: '/terminal',
    icon: GlitchLambda,
    external: false,
    iconProps: {
      className: 'text-terminal-green text-lg',
      size: 'small',
      'aria-hidden': true,
    },
  },
  {
    label: 'GitHub',
    href: 'https://github.com/stepweaver',
    icon: SiGithub,
    external: true,
    iconProps: { className: 'w-4 h-4', 'aria-hidden': true },
  },
  {
    label: 'Bluesky',
    href: 'https://bsky.app/profile/stepweaver.dev',
    icon: SiBluesky,
    external: true,
    iconProps: { className: 'w-4 h-4', 'aria-hidden': true },
  },
];

export default function Footer() {
  const [currentYear, setCurrentYear] = useState('');

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className='relative z-30 min-h-screen flex flex-col justify-end bg-transparent'>
      {/* Main Footer Content */}
      <div className='max-w-7xl mx-auto px-4 md:px-6 w-full flex-1 flex flex-col justify-center'>
        {/* Logo Section - Centered */}
        <div className='mb-12 md:mb-16 lg:mb-24 flex justify-center'>
          <h2 className='text-5xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl 2xl:text-[12rem] text-terminal-green font-ibm tracking-tight leading-none flex items-center'>
            <GlitchLambda
              className='text-5xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl 2xl:text-[12rem] text-terminal-green font-ibm tracking-tight leading-none'
              size='xl'
            />
            <span>stepweaver</span>
          </h2>
        </div>

        {/* Tagline and Email Section - Centered */}
        <div className='space-y-6 md:space-y-8 lg:space-y-12'>
          <div className='flex justify-center'>
            <Link
              href='/contact'
              className='text-lg md:text-xl lg:text-4xl text-terminal-green font-ibm hover:text-terminal-white transition-colors duration-200 text-center'
            >
              info@stepweaver.dev
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Section - Social Links and Legal */}
      <div className='mt-auto'>
        <div className='max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8'>
          <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-3 md:space-y-4 lg:space-y-0 min-h-[4rem] lg:min-h-0'>
            {/* Bottom Left - Social Links */}
            <div className='flex flex-wrap gap-4'>
              {FOOTER_LINKS.map((link) => {
                const Icon = link.icon;
                const sharedProps = link.external
                  ? { target: '_blank', rel: 'noreferrer' }
                  : {};
                const isTerminalLink = link.href === '/terminal';

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`inline-flex items-center font-ocr text-sm text-terminal-green hover:text-terminal-white transition-colors ${
                      isTerminalLink ? 'gap-0' : 'gap-2'
                    }`}
                    {...sharedProps}
                    aria-label={isTerminalLink ? 'terminal' : undefined}
                  >
                    {isTerminalLink ? (
                      <span className='inline-flex items-center leading-none'>
                        <Icon
                          {...(link.iconProps ?? { className: 'w-4 h-4' })}
                        />
                        <span className='tracking-tight'>{link.label}</span>
                      </span>
                    ) : (
                      <>
                        <Icon
                          {...(link.iconProps ?? { className: 'w-4 h-4' })}
                        />
                        {link.label}
                      </>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Bottom Right - Legal */}
            <div className='text-terminal-muted font-ocr text-xs md:text-sm leading-tight flex items-center min-h-[3rem] md:min-h-0'>
              <GlitchLambda className='text-terminal-green' />
              <span>
                stepweaver LLC · Veteran-owned · All rights reserved ·{' '}
                {currentYear}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
