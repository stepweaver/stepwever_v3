'use client';

import React from 'react';
import GlitchButton from '@/components/ui/GlitchButton';

const realTestimonial = {
  id: 1,
  quote:
    "Stephen has a great tenacity to solve problems in the world of technical development and engineering. We were fortunate enough to work alongside him multiple times, in which he delivered the dependable digital foundations for our Clients. With each project, his work significantly improved and become more operational. For those needing a digital facelift - it's not your job to understand how it's done. Instead, focus on finding someone you trust to help craft your vision inside your digital landscape. Stephen is one of those someones. God Bless.",
  name: 'Griffin H.',
  title: 'HERO POINT CONSULTING',
};

export default function PartnerFeedback() {
  return (
    <section className='relative z-30 flex items-start pt-8'>
      <div className='text-left px-8 md:px-16 lg:px-24 w-full'>
        {/* Main heading */}
        <h2 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-12 md:mb-16 leading-tight text-left font-ibm text-terminal-green'>
          PARTNER FEEDBACK
        </h2>

        {/* Real Testimonial */}
        <div className='mb-12'>
          <div className='p-4 md:p-8 border border-terminal-border/30 bg-terminal-dark/20 rounded-lg'>
            <blockquote className='text-terminal-text font-ocr text-base md:text-lg lg:text-xl leading-relaxed mb-4 md:mb-6 lg:mb-8'>
              "{realTestimonial.quote}"
            </blockquote>

            <div className='border-t border-terminal-border pt-3 md:pt-4 lg:pt-6'>
              <div className='text-terminal-cyan font-ibm text-base md:text-lg lg:text-xl mb-1 md:mb-2'>
                {realTestimonial.name}
              </div>
              <div className='text-terminal-muted font-ocr text-xs md:text-sm lg:text-base uppercase tracking-wider'>
                {realTestimonial.title}
              </div>
            </div>
          </div>
        </div>

        {/* Early Access Callout */}
        <div className='mb-8'>
          <div className='p-6 md:p-8 border border-terminal-green/30 bg-terminal-dark/10 rounded-lg'>
            <h3 className='text-xl md:text-2xl lg:text-3xl mb-4 font-ibm text-terminal-green'>
              BE ONE OF MY FIRST PARTNERS
            </h3>
            <p className='text-terminal-text font-ocr text-base md:text-lg leading-relaxed mb-6'>
              I'm looking for ambitious businesses ready to move fast. If you
              want custom systems, hands-on help, and founder-level support,
              let's talk.
            </p>

            {/* Personal Guarantee */}
            <div className='border-t border-terminal-border/30 pt-6'>
              <h4 className='text-lg md:text-xl font-ibm text-terminal-cyan mb-4'>
                MY COMMITMENT
              </h4>
              <ul className='space-y-3 text-terminal-text font-ocr text-sm md:text-base'>
                <li className='flex items-start'>
                  <span className='text-terminal-green mr-2'>→</span>I don't
                  promise big numbers-I promise real work.
                </li>
                <li className='flex items-start'>
                  <span className='text-terminal-green mr-2'>→</span>
                  You'll always see what I'm building, how it works, and why it
                  matters.
                </li>
                <li className='flex items-start'>
                  <span className='text-terminal-green mr-2'>→</span>
                  You get my full focus, and honest progress updates, every
                  step.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className='text-center'>
          <p className='text-terminal-text font-ocr text-sm md:text-base mb-4'>
            Ready to build something real together?
          </p>
          <div className='flex justify-center'>
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
