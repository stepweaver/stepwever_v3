'use client';

import React, { memo } from 'react';
import GlitchButton from '@/components/ui/GlitchButton';

// 1) Data lives outside the component
const TESTIMONIAL = {
  id: 1,
  quote:
    "Stephen has a great tenacity to solve problems in the world of technical development and engineering. We were fortunate enough to work alongside him multiple times, in which he delivered the dependable digital foundations for our Clients. With each project, his work significantly improved and become more operational. For those needing a digital facelift - it's not your job to understand how it's done. Instead, focus on finding someone you trust to help craft your vision inside your digital landscape. Stephen is one of those someones. God Bless.",
  name: 'Griffin H.',
  title: 'HERO POINT CONSULTING',
};

const COMMITMENTS = [
  'No hype - just working solutions that solve real problems.',
  "You'll see exactly what I'm building and why it matters to your business.",
  'Clear updates and honest communication throughout the project.',
];

function PartnerFeedback() {
  return (
    <section className='relative z-30 flex items-start pt-8'>
      <div className='mx-auto px-4 sm:px-6 md:px-8 lg:px-6 xl:px-6 2xl:px-6 max-w-none'>
        {/* Main heading */}
        <header className='mb-12 md:mb-16'>
          <h2 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight text-left font-ibm text-terminal-green'>
            PARTNER FEEDBACK
          </h2>
        </header>

        {/* Real Testimonial */}
        <div className='mb-12'>
          <blockquote className='p-4 md:p-8 border border-terminal-border/30 bg-terminal-dark/20 rounded-lg'>
            <p className='text-terminal-text font-ocr text-base md:text-lg lg:text-xl leading-relaxed mb-4 md:mb-6 lg:mb-8'>
              "{TESTIMONIAL.quote}"
            </p>

            <footer className='border-t border-terminal-border pt-3 md:pt-4 lg:pt-6'>
              <div className='text-terminal-cyan font-ibm text-base md:text-lg lg:text-xl mb-1 md:mb-2'>
                {TESTIMONIAL.name}
              </div>
              <div className='text-terminal-muted font-ocr text-xs md:text-sm lg:text-base uppercase tracking-wider'>
                {TESTIMONIAL.title}
              </div>
            </footer>
          </blockquote>
        </div>

        {/* Early Access Callout */}
        <div className='mb-8'>
          <article className='p-6 md:p-8 border border-terminal-green/30 bg-terminal-dark/10 rounded-lg'>
            <h3 className='text-xl md:text-2xl lg:text-3xl mb-4 font-ibm text-terminal-green'>
              READY TO WORK TOGETHER?
            </h3>
            <p className='text-terminal-text font-ocr text-base md:text-lg leading-relaxed mb-6'>
              If you're ready to stop doing busywork and start growing smarter,
              let's build the systems that will get you there.
            </p>

            {/* Personal Guarantee */}
            <div className='border-t border-terminal-border/30 pt-6'>
              <h4 className='text-lg md:text-xl font-ibm text-terminal-cyan mb-4'>
                MY COMMITMENT
              </h4>
              <ul className='space-y-3 text-terminal-text font-ocr text-sm md:text-base'>
                {COMMITMENTS.map((commitment, index) => (
                  <li key={index} className='flex items-start'>
                    <span className='text-terminal-green mr-2'>→</span>
                    {commitment}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>

        {/* Call to Action */}
        <div>
          <p className='text-terminal-text font-ocr text-sm md:text-base mb-4'>
            Let's build something!
          </p>
          <div>
            <GlitchButton
              href='/contact'
              className='inline-block max-w-xs px-6 py-3 text-sm md:text-base'
            >
              START YOUR PROJECT
            </GlitchButton>
          </div>
        </div>
      </div>
    </section>
  );
}

// memo is optional but inexpensive
export default memo(PartnerFeedback);
