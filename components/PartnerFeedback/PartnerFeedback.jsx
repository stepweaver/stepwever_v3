'use client';

import React, { useState, useRef } from 'react';

const testimonials = [
  {
    id: 1,
    quote:
      "Stephen has a great tenacity to solve problems in the world of technical development and engineering. We were fortunate enough to work alongside him multiple times, in which he delivered the dependable digital foundations for our Clients. With each project, his work significantly improved and become more operational. For those needing a digital facelift - it's not your job to understand how it's done. Instead, focus on finding someone you trust to help craft your vision inside your digital landscape. Stephen is one of those someones. God Bless.",
    name: 'Griffin H.',
    title: 'HERO POINT CONSULTING',
  },
  {
    id: 2,
    quote:
      "When we needed to pivot our entire digital strategy in under a month, λstepweaver didn't just deliver-they exceeded every expectation. The combination of technical expertise and strategic thinking is rare. Our conversion rates jumped 400% within the first quarter.",
    name: 'Ellen Ripley*',
    title: 'CEO, WEYLAND-YUTANI DIGITAL',
  },
  {
    id: 3,
    quote:
      "Stephen's background in cryptologic linguistics shows in how he approaches every problem. He doesn't just write code-he deciphers the underlying patterns and builds systems that speak the language of business. Our automation workflows now handle 90% of our routine tasks.",
    name: 'Dr. Ian Malcolm*',
    title: 'CTO, INGEN SYSTEMS',
  },
  {
    id: 4,
    quote:
      "We were drowning in technical debt and outdated systems. λstepweaver didn't just fix our problems-they reimagined our entire digital infrastructure. The transformation was so dramatic that our competitors started asking who our secret weapon was. Spoiler alert: it's Stephen.",
    name: 'Sarah Connor*',
    title: 'VP OF TECHNOLOGY, SKYNET SOLUTIONS',
  },
  {
    id: 5,
    quote:
      "Stephen's iterative approach meant we could see progress every week, not just at the end. His communication is so clear that even our non-technical stakeholders understood what was happening. We've built a partnership that continues to deliver value long after the initial project.",
    name: 'John McClane*',
    title: 'FOUNDER, NAKATOMI CONSULTING',
  },
  {
    id: 6,
    quote:
      "The combination of business analysis experience and technical skills is what sets λstepweaver apart. Stephen doesn't just build what you ask for-he builds what you actually need. Our data-driven marketing campaigns now generate 3x the ROI we had before.",
    name: 'Clarice Starling*',
    title: 'DIRECTOR OF MARKETING, BEHAVIORAL SCIENCE CORP',
  },
  {
    id: 7,
    quote:
      'Working with Stephen was like having a team of specialists in one person. His ability to translate complex technical concepts into business value is extraordinary. We went from concept to deployed product in record time, and it actually works better than we imagined.',
    name: 'Forrest Gump*',
    title: 'PRESIDENT, BUBBA GUMP TECH',
  },
];

export default function PartnerFeedback() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.changedTouches[0].screenX);
  };

  const handleTouchEnd = (e) => {
    setTouchEndX(e.changedTouches[0].screenX);
    handleSwipe();
  };

  const handleSwipe = () => {
    if (touchStartX === null || touchEndX === null) return;

    const swipeThreshold = 50; // Minimum distance for a swipe
    const distance = touchStartX - touchEndX;

    if (distance > swipeThreshold) {
      nextTestimonial();
    } else if (distance < -swipeThreshold) {
      prevTestimonial();
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <section className='relative z-30 flex items-start pt-8'>
      <div className='text-left px-8 md:px-16 lg:px-24 w-full'>
        {/* Main heading */}
        <h2 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-12 md:mb-16 leading-tight text-left font-ibm text-terminal-green'>
          PARTNER FEEDBACK
        </h2>

        {/* Testimonials Container */}
        <div className='w-full relative'>
          <div className='text-center mb-4'>
            <p className='text-terminal-dimmed text-sm font-ocr'>
              Swipe to navigate
            </p>
          </div>

          {/* Desktop Navigation Arrows */}
          <div className='hidden md:block'>
            {/* Next Arrow */}
            <button
              onClick={nextTestimonial}
              className='absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-terminal-dark/80 hover:bg-terminal-dark border border-terminal-green/30 hover:border-terminal-green text-terminal-green hover:text-terminal-green/80 p-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-terminal-green/20'
              aria-label='Next testimonial'
            >
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5l7 7-7 7'
                />
              </svg>
            </button>
          </div>

          {/* Carousel Container */}
          <div
            className='overflow-hidden'
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className='flex transition-transform duration-500 ease-in-out'
              style={{
                transform: `translateX(-${
                  currentIndex * (isMobile ? 100 : 90)
                }%)`,
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className='w-full md:w-[90%] flex-shrink-0 md:pr-16'
                >
                  <div className='p-4 md:p-8'>
                    <blockquote className='text-terminal-text font-ocr text-base md:text-lg lg:text-xl leading-relaxed mb-4 md:mb-6 lg:mb-8'>
                      "{testimonial.quote}"
                    </blockquote>

                    <div className='border-t border-terminal-border pt-3 md:pt-4 lg:pt-6'>
                      <div className='text-terminal-cyan font-ibm text-base md:text-lg lg:text-xl mb-1 md:mb-2'>
                        {testimonial.name.includes('*') ? (
                          <>
                            {testimonial.name.replace('*', '')}
                            <span className='text-terminal-yellow'>*</span>
                          </>
                        ) : (
                          testimonial.name
                        )}
                      </div>
                      <div className='text-terminal-muted font-ocr text-xs md:text-sm lg:text-base uppercase tracking-wider'>
                        {testimonial.title}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Page Indicators */}
          <div className='flex justify-center mt-6 space-x-2'>
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-terminal-green'
                    : 'bg-terminal-dimmed hover:bg-terminal-green/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Small Disclaimer */}
        <span className='block text-terminal-yellow text-xs mt-6 text-center'>
          * Placeholder testimonials for demonstration.
          <br className='block md:hidden' />
          <span className='text-terminal-green'> Want to be featured?</span>
        </span>
      </div>
    </section>
  );
}
