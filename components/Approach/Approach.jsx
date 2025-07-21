'use client';

import { useEffect, useRef, useState } from 'react';
import ComparisonSection from './ComparisonSection';

export default function Approach() {
  const [isSticky, setIsSticky] = useState(true);
  const stickyRef = useRef(null);
  const comparisonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!stickyRef.current || !comparisonRef.current) return;

      const stickyRect = stickyRef.current.getBoundingClientRect();
      const comparisonRect = comparisonRef.current.getBoundingClientRect();

      // If the sticky element would overlap with the comparison section, stop being sticky
      if (stickyRect.bottom >= comparisonRect.top) {
        setIsSticky(false);
      } else {
        setIsSticky(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className='relative z-30 pt-20 pb-4'>
      <div className='px-8 md:px-16 lg:px-24 w-full'>
        {/* Two Column Layout - Advantage Statement and Content Side by Side */}
        <div className='flex flex-col lg:flex-row gap-12 lg:gap-16'>
          {/* Advantage Statement - Sticky on desktop */}
          <div className='lg:w-1/3 lg:flex-shrink-0'>
            <div
              ref={stickyRef}
              className={`${
                isSticky ? 'lg:sticky lg:top-8' : ''
              } max-w-md mx-auto lg:mx-0 mb-6`}
            >
              <div className='bg-terminal-bg p-8'>
                <p className='text-terminal-text font-ibm text-4xl text-left leading-tight'>
                  The λstepweaver advantage: sharper, faster, more personal.
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className='lg:w-2/3'>
            {/* Section Header */}
            <div className='mb-16'>
              <h2 className='text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight text-left font-ibm text-terminal-green whitespace-nowrap'>
                APPROACH
              </h2>
            </div>

            {/* Main Headline */}
            <h3 className='text-3xl md:text-4xl lg:text-5xl font-ibm text-terminal-text leading-tight mb-8'>
              It's all about moving fast, staying clear, and building the right
              thing-together.
            </h3>

            {/* Main Description */}
            <div className='mb-8'>
              <p className='text-terminal-text font-ocr text-lg leading-relaxed'>
                At λstepweaver, every project is a collaboration—rooted in rapid
                prototyping, honest feedback, and the discipline of
                follow-through. Instead of endless meetings and vague
                milestones, we break complex challenges into focused sprints,
                each with concrete deliverables and a built-in feedback loop.
              </p>
            </div>

            {/* Our Approach Section */}
            <div className='mb-8'>
              <h4 className='text-2xl md:text-3xl font-ibm text-terminal-cyan mb-6'>
                Our approach is simple:
              </h4>

              {/* Approach Steps */}
              <div className='space-y-6'>
                <div className='border-l-4 border-terminal-green pl-4'>
                  <h5 className='text-xl font-ibm text-terminal-green mb-1'>
                    Align on the goal.
                  </h5>
                  <p className='text-terminal-text font-ocr text-base leading-relaxed'>
                    Every project starts with a shared vision and a clear
                    definition of success.
                  </p>
                </div>

                <div className='border-l-4 border-terminal-green pl-4'>
                  <h5 className='text-xl font-ibm text-terminal-green mb-1'>
                    Map the path.
                  </h5>
                  <p className='text-terminal-text font-ocr text-base leading-relaxed'>
                    We outline stages, set priorities, and schedule regular
                    check-ins so you always know what's next.
                  </p>
                </div>

                <div className='border-l-4 border-terminal-green pl-4'>
                  <h5 className='text-xl font-ibm text-terminal-green mb-1'>
                    Build in the open.
                  </h5>
                  <p className='text-terminal-text font-ocr text-base leading-relaxed'>
                    You see progress early and often—not just at the finish
                    line.
                  </p>
                </div>

                <div className='border-l-4 border-terminal-green pl-4'>
                  <h5 className='text-xl font-ibm text-terminal-green mb-1'>
                    Iterate together.
                  </h5>
                  <p className='text-terminal-text font-ocr text-base leading-relaxed'>
                    Client feedback isn't an afterthought; it's woven into every
                    stage, ensuring your input steers the outcome.
                  </p>
                </div>

                <div className='border-l-4 border-terminal-green pl-4'>
                  <h5 className='text-xl font-ibm text-terminal-green mb-1'>
                    Deliver with pride.
                  </h5>
                  <p className='text-terminal-text font-ocr text-base leading-relaxed'>
                    Every deliverable ships with clarity, polish, and a support
                    window to make sure everything lands right.
                  </p>
                </div>
              </div>
            </div>

            {/* Closing Statement */}
            <div className='border-t border-terminal-border pt-6 mb-8'>
              <p className='text-terminal-text font-ocr text-lg leading-relaxed'>
                No black boxes. No disappearing acts. Just a transparent process
                and responsive communication—from kickoff to launch (and
                beyond). That's how λstepweaver turns "someday" projects into
                shipping realities.
              </p>
            </div>
          </div>
        </div>

        {/* Comparison Section - Full Width (Outside two-column layout) */}
        <div className='mt-2'>
          <ComparisonSection ref={comparisonRef} />
        </div>
      </div>
    </section>
  );
}
