import Image from 'next/image';
import { memo } from 'react';

const About = memo(function About() {
  return (
    <section className='relative z-30 min-h-screen py-20'>
      <div className='px-8 md:px-16 lg:px-24 w-full'>
        {/* Two Column Layout - Bio Card and Content Side by Side */}
        <div className='flex flex-col lg:flex-row gap-12 lg:gap-16'>
          {/* Bio Card - Sticky on desktop */}
          <div className='lg:w-1/3 lg:flex-shrink-0'>
            <div className='lg:sticky lg:top-8 max-w-sm mx-auto lg:mx-0'>
              <div className='bg-terminal-dark border border-terminal-green/15 rounded-lg overflow-hidden shadow-[0_15px_30px_-5px_rgba(0,0,0,0.6),0_10px_10px_-5px_rgba(0,0,0,0.5),0_0_10px_rgba(0,255,65,0.3),0_0_1px_rgba(0,255,65,0.7),0_0_20px_rgba(0,255,65,0.3)]'>
                {/* Terminal Header */}
                <div className='bg-terminal-light px-3 py-2 border-b border-terminal-border flex items-center justify-between'>
                  <div className='flex items-center space-x-2'>
                    <div className='w-3 h-3 bg-terminal-red rounded-full'></div>
                    <div className='w-3 h-3 bg-terminal-yellow rounded-full'></div>
                    <div className='w-3 h-3 bg-terminal-green rounded-full'></div>
                  </div>
                  <div className='text-terminal-dimmed text-xs font-ocr'>
                    ~/bio
                  </div>
                </div>

                {/* Terminal Content */}
                <div className='p-4 bg-terminal-dark'>
                  {/* Profile Image */}
                  <div className='mb-3 rounded overflow-hidden bg-terminal-light/10 flex items-center justify-center h-32 w-full'>
                    <Image
                      src='/images/pixarMe.png'
                      alt='Stephen Weaver, Founder of λstepweaver'
                      width={128}
                      height={128}
                      className='max-w-full max-h-full object-cover rounded'
                      priority={true}
                    />
                  </div>

                  {/* Name and Title */}
                  <h3 className='text-terminal-text font-ibm text-xl mb-1 text-center'>
                    Stephen Weaver
                  </h3>
                  <p className='text-terminal-green font-ocr text-lg mb-3 text-center'>
                    FOUNDER
                  </p>
                  <p className='text-terminal-text font-ocr text-sm leading-relaxed mb-3 text-center'>
                    Rebel builder & data strategist
                  </p>

                  {/* Terminal Prompt */}
                  <div className='text-terminal-dimmed font-ocr text-xs text-center'>
                    <span className='text-terminal-green'>
                      guest@stepweaver.dev
                    </span>
                    <span className='text-terminal-text'> ~ </span>
                    <span className='text-terminal-cyan'>λ</span>
                    <span className='text-terminal-text'> whoami</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className='lg:w-2/3'>
            {/* Section Header */}
            <div className='mb-16'>
              <h2 className='text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight text-left font-ibm text-terminal-green font-bold whitespace-nowrap'>
                ABOUT
              </h2>
            </div>
            {/* Headline */}
            <h3 className='text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-ibm text-terminal-text leading-tight mb-12'>
              Digital leverage: more clarity, fewer keystrokes, faster wins.
            </h3>

            {/* Bio Content */}
            <div className='space-y-6 text-terminal-text font-ocr text-lg md:text-xl leading-relaxed'>
              <p>
                I'm the founder of λstepweaver, a one-man skunkworks where code,
                data, and story collide to drag "someday" ideas into
                shipping-today reality. My career began 30,000 ft up as an
                Airborne Cryptologic Linguist, tuning my ear for patterns most
                people never hear. Degrees in Communication and Business
                followed, then a decade as a business analyst wrestling chaotic
                hospitality and university data into dashboards that cut costs
                and clarified decisions.
              </p>

              <p>
                Those years taught me one thing: every problem is an unfinished
                conversation between systems—and I build the dialogue. Whether
                I'm piping real-time numbers into margin models, spinning up a
                Next.js site before lunch, or automating AI-driven marketing
                videos, my north star is digital leverage: more clarity, fewer
                keystrokes, faster wins.
              </p>

              <p>
                I'm a builder, rebel, dad, and perpetual student. I don't drink
                coffee, but I'll happily nerd-out about fonts, Tailwind, or why
                your business is bleeding margin. Off the clock you'll catch me
                sketching side projects, hacking AI tools, or chasing kids
                around the backyard.
              </p>
            </div>

            {/* Call to Action */}
            <div className='mt-12'>
              <p className='text-2xl md:text-3xl lg:text-4xl font-ibm text-terminal-cyan mb-6'>
                Need a partner who can translate vision into shipped product—and
                isn't afraid to rip out walls to do it?
              </p>
              <p className='text-3xl md:text-4xl lg:text-5xl font-ibm text-terminal-green'>
                Let's build what's next.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default About;
