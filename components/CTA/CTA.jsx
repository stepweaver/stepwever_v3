'use client';

import { useState, useEffect, useRef } from 'react';
import GlitchButton from '@/components/ui/GlitchButton';
import CalendlyModal from '@/components/ui/CalendlyModal';
import GlitchLambda from '@/components/ui/GlitchLambda';

const WORDS = [
  { text: 'AUTOMATE?', color: 'text-terminal-green' },
  { text: 'OPTIMIZE?', color: 'text-terminal-cyan' },
  { text: 'SCALE?', color: 'text-terminal-magenta' },
];

export default function CTA() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const sectionRef = useRef(null);

  /** Only tick the headline animation while the CTA is in view */
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    let loop = null;

    const startLoop = () => {
      if (loop) return;
      loop = setInterval(() => {
        setVisible(false);
        setTimeout(() => {
          setIndex((i) => (i + 1) % WORDS.length);
          setVisible(true);
        }, 150);
      }, 2750);
    };

    const stopLoop = () => {
      if (loop) clearInterval(loop);
      loop = null;
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) startLoop();
        else stopLoop();
      },
      { threshold: 0.2 }
    );

    io.observe(node);
    return () => {
      io.disconnect();
      stopLoop();
    };
  }, []);

  return (
    <section
      id='contact'
      ref={sectionRef}
      className='relative z-30 py-16 md:py-24 bg-terminal-bg text-terminal-text'
    >
      <div className='px-4 sm:px-6 md:px-8 lg:px-6 xl:px-6 2xl:px-6 grid gap-y-12 lg:grid-cols-2 lg:gap-x-24 items-start'>
        {/* ---- Headline column ------------------------------------------------ */}
        <header className='space-y-0 leading-none'>
          <h2 className='sr-only'>Ready to automate, optimize, or scale?</h2>
          {/* We visually split the headline for style, but keep semantics sane */}
          <p className='font-ibm text-[clamp(3rem,10vw,10rem)]'>READY</p>
          <p className='font-ibm text-[clamp(3rem,10vw,10rem)]'>TO</p>
          <p className='font-ibm text-[clamp(3rem,10vw,10rem)]'>
            <span
              className={`${
                WORDS[index].color
              } transition-opacity duration-300 ${
                visible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {WORDS[index].text}
            </span>
          </p>
        </header>

        {/* ---- Copy & actions column ---------------------------------------- */}
        <div className='space-y-10 pt-2 md:pt-4'>
          <p className='font-ocr text-base md:text-lg lg:text-xl leading-tight'>
            You're here because you want action, not talk.{' '}
            <GlitchLambda className='text-terminal-text' />
            stepweaver turns ideas into working systems—fast.
          </p>

          <p className='font-ibm text-terminal-green text-xl md:text-2xl lg:text-3xl'>
            Let&apos;s create something amazing.
          </p>

          {/* Buttons */}
          <div className='flex flex-col sm:flex-row flex-wrap gap-4'>
            <GlitchButton
              onClick={() => setIsCalendlyOpen(true)}
              className='px-8 md:px-12 py-4 md:py-5 text-lg md:text-xl font-bold sm:flex-1'
            >
              SCHEDULE A CALL
            </GlitchButton>

            <GlitchButton
              href='/services'
              className='px-8 md:px-12 py-4 md:py-5 text-lg md:text-xl font-bold sm:flex-1'
            >
              VIEW SERVICES
            </GlitchButton>

            <GlitchButton
              href='/contact'
              className='px-8 md:px-12 py-4 md:py-5 text-lg md:text-xl font-bold sm:flex-1'
            >
              CONTACT
            </GlitchButton>
          </div>

          {/* Tiny text */}
          <p className='text-xs md:text-sm text-terminal-dimmed'>
            Prefer a real conversation? Email&nbsp;
            <a
              href='mailto:inquiries@stepweaver.dev'
              className='text-terminal-green underline hover:text-terminal-green/80'
            >
              inquiries@stepweaver.dev
            </a>
          </p>
        </div>
      </div>

      <CalendlyModal
        isOpen={isCalendlyOpen}
        onClose={() => setIsCalendlyOpen(false)}
      />
    </section>
  );
}
