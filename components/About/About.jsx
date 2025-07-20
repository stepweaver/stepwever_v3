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
            <div className='lg:sticky lg:top-8 max-w-sm mx-auto lg:mx-auto'>
              <div className='bg-terminal-dark border border-terminal-border rounded-lg overflow-hidden shadow-[0_0_1px_rgba(0,255,65,0.7),0_0_20px_rgba(0,255,65,0.3)]'>
                {/* Profile Image */}
                <div className='relative h-48 w-full overflow-hidden bg-gradient-to-br from-terminal-light/15 to-terminal-dark/15 flex items-center justify-center p-6'>
                  <div className='relative w-40 h-40 rounded-xl overflow-hidden border border-terminal-border/30'>
                    <Image
                      src='/images/pixarMe.png'
                      alt='Stephen Weaver, Founder of λstepweaver'
                      fill
                      className='object-cover'
                      priority={true}
                    />
                  </div>
                </div>

                {/* Profile Content */}
                <div className='p-6 bg-terminal-dark'>
                  <h3 className='text-terminal-text font-ibm text-2xl mb-2 text-center font-bold'>
                    Stephen Weaver
                  </h3>
                  <p className='text-terminal-green font-ocr text-lg mb-3 text-center tracking-wider uppercase'>
                    FOUNDER
                  </p>
                  <p className='text-terminal-text font-ocr text-sm leading-relaxed mb-2 text-center'>
                    Developer | Data Strategist | Veteran
                  </p>
                  <p className='text-terminal-text font-ocr text-xs leading-relaxed mb-4 text-center italic'>
                    (Rebel at heart)
                  </p>

                  {/* Contact Info */}
                  <div className='text-center'>
                    <p className='text-terminal-dimmed font-ocr text-xs'>
                      <span className='text-terminal-green'>
                        guest@stepweaver.dev
                      </span>
                    </p>
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
                λstepweaver is a one‑man skunkworks where code, data, and story
                collide to drag “someday” ideas into shipping‑today reality. The
                journey begins 30,000 ft up with an Airborne Cryptologic
                Linguist tuned to patterns most people never hear. Degrees in
                Communication and Business followed, then a decade as a business
                analyst wrestling chaotic hospitality and university data into
                dashboards that cut costs and clarified decisions.
              </p>

              <p>
                Those years forged one conviction: every problem is an
                unfinished conversation between systems - λstepweaver builds the
                dialogue. Whether piping real‑time numbers into margin models,
                spinning up a new site before lunch, or automating AI‑driven
                marketing videos, our north star remains digital leverage: more
                clarity, fewer keystrokes, faster wins.
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
