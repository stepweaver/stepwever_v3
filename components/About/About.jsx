import Image from 'next/image';
import { memo } from 'react';

const About = memo(function About() {
  return (
    <section id='about' className='relative z-30 py-20'>
      <div className='px-8 md:px-16 lg:px-24 w-full'>
        {/* Two Column Layout - Bio Card and Content Side by Side */}
        <div className='flex flex-col lg:flex-row gap-12 lg:gap-16'>
          {/* Bio Card */}
          <div className='lg:w-1/3 lg:flex-shrink-0 flex justify-center lg:justify-start'>
            <div className='max-w-md w-full'>
              <div className='p-6 lg:p-8 text-center'>
                {/* Profile Image */}
                <div className='mb-6 flex justify-center'>
                  <div className='relative w-48 h-48 rounded-xl overflow-hidden'>
                    <Image
                      src='/images/pixarMe.png'
                      alt='Stephen Weaver, Founder of λstepweaver'
                      fill
                      className='object-cover'
                      priority={true}
                      sizes='(max-width: 1024px) 192px, 192px'
                    />
                  </div>
                </div>

                {/* Profile Content */}
                <div>
                  <h3 className='text-terminal-text font-ibm text-3xl mb-4'>
                    Stephen Weaver
                  </h3>
                  <p className='text-terminal-green font-ocr text-xl mb-6 tracking-wider uppercase'>
                    FOUNDER
                  </p>
                  <ul className='text-terminal-text font-ocr text-lg leading-relaxed mb-4 space-y-2'>
                    <li>Developer</li>
                    <li>Data Strategist</li>
                    <li>Veteran</li>
                    <li><span className='text-terminal-text font-ocr text-base leading-relaxed mb-6 italic'>Rebel</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className='lg:w-2/3'>
            {/* Section Header */}
            <div className='mb-12 md:mb-16'>
              <h2 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-6 md:mb-8 leading-tight text-left font-ibm text-terminal-green'>
                ABOUT US
              </h2>
            </div>
            {/* Headline */}
            <h3 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-ibm text-terminal-text leading-tight mb-8 md:mb-12'>
              Digital leverage: more clarity, fewer keystrokes, faster wins.
            </h3>

            {/* Bio Content */}
            <div className='space-y-4 md:space-y-6 text-terminal-text font-ocr text-base md:text-lg lg:text-xl leading-relaxed'>
              <p>
                λstepweaver is a one‑man skunkworks where code, data, and story
                collide to drag "someday" ideas into shipping‑today reality. The
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
            <div className='mt-8 md:mt-12'>
              <p className='text-xl md:text-2xl lg:text-3xl xl:text-4xl font-ibm text-terminal-cyan mb-4 md:mb-6'>
                Need a partner who can translate vision into shipped product-and
                isn't afraid to rip out walls to do it?
              </p>
              <p className='text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-ibm text-terminal-green'>
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
