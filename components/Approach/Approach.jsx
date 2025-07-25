'use client';

import { useEffect, useRef, useState } from 'react';
import ComparisonSection from './ComparisonSection';

export default function Approach() {
  const [isSticky, setIsSticky] = useState(true);
  const stickyRef = useRef(null);
  const comparisonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      try {
        if (typeof window === 'undefined') return;
        if (!stickyRef.current || !comparisonRef.current) return;
        const stickyRect = stickyRef.current.getBoundingClientRect();
        const comparisonRect = comparisonRef.current.getBoundingClientRect();
        if (!stickyRect || !comparisonRect) return;
        if (stickyRect.bottom >= comparisonRect.top) {
          setIsSticky(false);
        } else {
          setIsSticky(true);
        }
      } catch (error) {
        console.error('Error in scroll handler:', error);
        setIsSticky(false);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <section className='relative z-30 pt-16 pb-16 bg-terminal-bg text-terminal-text min-h-screen w-full'>
      <div className='px-8 md:px-16 lg:px-24 w-full'>
        {/* Section Header */}
        <div className='mb-12'>
          <h2 className='text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight font-ibm text-terminal-green'>
            APPROACH
          </h2>
        </div>

        {/* Two Column Layout */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16'>
          {/* Approach Steps - Sticky on desktop */}
          <div>
            <div
              ref={stickyRef}
              className={`${isSticky ? 'lg:sticky lg:top-8' : ''} max-w-none`}
            >
              {/* Main Headline */}
              <h3 className='text-xl md:text-2xl lg:text-3xl font-ibm text-terminal-text leading-tight mb-6'>
                It's all about moving fast, staying clear, and building the
                right thing-together.
              </h3>

              {/* Main Description */}
              <div className='mb-8'>
                <p className='text-terminal-text font-ocr text-base leading-relaxed'>
                  At λstepweaver, every project is a collaboration-rooted in
                  rapid prototyping, honest feedback, and the discipline of
                  follow-through. Instead of endless meetings and vague
                  milestones, we break complex challenges into focused sprints,
                  each with concrete deliverables and a built-in feedback loop.
                </p>
              </div>

              {/* Our Approach Section */}
              <div className='mb-8'>
                <h4 className='text-lg md:text-xl font-ibm text-terminal-cyan mb-4'>
                  Our approach is simple:
                </h4>

                {/* Approach Steps */}
                <div className='space-y-4'>
                  {[
                    {
                      title: 'Align on the goal.',
                      description:
                        'Every project starts with a shared vision and a clear definition of success.',
                    },
                    {
                      title: 'Map the path.',
                      description:
                        "We outline stages, set priorities, and schedule regular check-ins so you always know what's next.",
                    },
                    {
                      title: 'Build in the open.',
                      description:
                        'You see progress early and often-not just at the finish line.',
                    },
                    {
                      title: 'Iterate together.',
                      description:
                        "Client feedback isn't an afterthought; it's woven into every stage, ensuring your input steers the outcome.",
                    },
                    {
                      title: 'Deliver with pride.',
                      description:
                        'Every deliverable ships with clarity, polish, and a support window to make sure everything lands right.',
                    },
                  ].map((step, index) => (
                    <div
                      key={index}
                      className='border-l-4 border-terminal-green pl-4 transition-all hover:pl-6 hover:border-opacity-100 border-opacity-80'
                    >
                      <h5 className='text-lg font-ibm text-terminal-green mb-1'>
                        {step.title}
                      </h5>
                      <p className='text-terminal-text font-ocr text-sm leading-relaxed'>
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Closing Statement */}
              <div className='border-t border-terminal-border pt-4 mb-6'>
                <p className='text-terminal-text font-ocr text-base leading-relaxed'>
                  No black boxes. No disappearing acts. Just a transparent
                  process and responsive communication-from kickoff to launch
                  (and beyond). That's how λstepweaver turns "someday" projects
                  into shipping realities.
                </p>
              </div>
            </div>
          </div>

          {/* Comparison Section */}
          <div>
            <ComparisonSection ref={comparisonRef} />
          </div>
        </div>
      </div>
    </section>
  );
}
