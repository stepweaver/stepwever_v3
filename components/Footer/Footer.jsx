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
    <footer className='relative z-30 border-t border-neon/20 bg-transparent'>
      <div className='max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-12'>
        <div className='flex flex-col gap-6 md:flex-row md:items-end md:justify-between'>
          <div>
            <h2 className='text-3xl sm:text-4xl text-terminal-green font-ibm tracking-tight leading-none flex items-center gap-1'>
              <GlitchLambda
                className='text-3xl sm:text-4xl text-terminal-green font-ibm tracking-tight leading-none'
                size='medium'
              />
              <span>stepweaver</span>
            </h2>
            <p className='mt-3 max-w-xl font-ibm text-sm sm:text-base text-text/80 leading-relaxed'>
              Building web apps, automation, and AI-enabled tools for operational work.
            </p>
          </div>
          <div>
            <Link
              href='/contact'
              className='inline-flex items-center border border-terminal-green/25 bg-terminal-dark/20 px-4 py-2 font-ibm text-base text-terminal-green transition-colors duration-200 hover:border-terminal-green/60 hover:text-terminal-white'
            >
              stephen@stepweaver.dev
            </Link>
          </div>
        </div>

        <div className='mt-8 border-t border-neon/10 pt-5'>
          <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-3 md:space-y-4 lg:space-y-0'>
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
                    className={`inline-flex items-center font-ibm text-sm text-terminal-green hover:text-terminal-white transition-colors ${
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
            <div className='text-terminal-muted font-ibm text-sm md:text-base leading-tight flex items-center min-h-[3rem] md:min-h-0'>
              <span>
                © {currentYear} Stephen Weaver ·{' '}
                <Link
                  href='/privacy'
                  className='text-terminal-green hover:text-terminal-white transition-colors'
                >
                  Privacy Policy
                </Link>
                {' · '}All rights reserved
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
