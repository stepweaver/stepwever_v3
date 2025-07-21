'use client';

import { useState } from 'react';

const testimonials = [
  {
    id: 1,
    quote:
      'Stephen transformed our chaotic data pipeline into a streamlined system that actually makes sense. His ability to see patterns in the noise and build solutions that scale is unmatched. We went from spending hours on manual reports to real-time dashboards that drive decisions.',
    name: 'Marty McFly',
    title: 'DIRECTOR OF OPERATIONS, HILL VALLEY TECHNOLOGIES',
  },
  {
    id: 2,
    quote:
      "When we needed to pivot our entire digital strategy in under a month, λstepweaver didn't just deliver—they exceeded every expectation. The combination of technical expertise and strategic thinking is rare. Our conversion rates jumped 400% within the first quarter.",
    name: 'Ellen Ripley',
    title: 'CEO, WEYLAND-YUTANI DIGITAL',
  },
  {
    id: 3,
    quote:
      "Stephen's background in cryptologic linguistics shows in how he approaches every problem. He doesn't just write code—he deciphers the underlying patterns and builds systems that speak the language of business. Our automation workflows now handle 90% of our routine tasks.",
    name: 'Dr. Ian Malcolm',
    title: 'CTO, INGEN SYSTEMS',
  },
  {
    id: 4,
    quote:
      "We were drowning in technical debt and outdated systems. λstepweaver didn't just fix our problems—they reimagined our entire digital infrastructure. The transformation was so dramatic that our competitors started asking who our secret weapon was. Spoiler alert: it's Stephen.",
    name: 'Sarah Connor',
    title: 'VP OF TECHNOLOGY, SKYNET SOLUTIONS',
  },
  {
    id: 5,
    quote:
      "Stephen's iterative approach meant we could see progress every week, not just at the end. His communication is so clear that even our non-technical stakeholders understood what was happening. We've built a partnership that continues to deliver value long after the initial project.",
    name: 'John McClane',
    title: 'FOUNDER, NAKATOMI CONSULTING',
  },
  {
    id: 6,
    quote:
      "The combination of business analysis experience and technical skills is what sets λstepweaver apart. Stephen doesn't just build what you ask for—he builds what you actually need. Our data-driven marketing campaigns now generate 3x the ROI we had before.",
    name: 'Clarice Starling',
    title: 'DIRECTOR OF MARKETING, BEHAVIORAL SCIENCE CORP',
  },
  {
    id: 7,
    quote:
      'Working with Stephen was like having a team of specialists in one person. His ability to translate complex technical concepts into business value is extraordinary. We went from concept to deployed product in record time, and it actually works better than we imagined.',
    name: 'Forrest Gump',
    title: 'PRESIDENT, BUBBA GUMP TECH',
  },
];

export default function PartnerFeedback() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    if (currentIndex < testimonials.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevTestimonial = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
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
          {/* Navigation Arrows */}
          {currentIndex > 0 && (
            <button
              onClick={prevTestimonial}
              className='absolute left-2 md:left-0 top-1/2 -translate-y-1/2 md:-translate-x-12 z-10 bg-terminal-dark border border-terminal-green/30 text-terminal-green w-8 h-8 md:w-12 md:h-12 rounded-full hover:bg-terminal-green hover:text-terminal-dark transition-all duration-300 font-ibm flex items-center justify-center shadow-[0_0_10px_rgba(0,255,65,0.3)] cursor-pointer text-sm md:text-base'
              aria-label='Previous testimonial'
            >
              ←
            </button>
          )}

          {currentIndex < testimonials.length - 1 && (
            <button
              onClick={nextTestimonial}
              className='absolute right-2 md:right-0 top-1/2 -translate-y-1/2 md:translate-x-12 z-10 bg-terminal-dark border border-terminal-green/30 text-terminal-green w-8 h-8 md:w-12 md:h-12 rounded-full hover:bg-terminal-green hover:text-terminal-dark transition-all duration-300 font-ibm flex items-center justify-center shadow-[0_0_10px_rgba(0,255,65,0.3)] cursor-pointer text-sm md:text-base'
              aria-label='Next testimonial'
            >
              →
            </button>
          )}

          {/* Carousel Container */}
          <div className='overflow-hidden'>
            <div
              className='flex transition-transform duration-500 ease-in-out'
              style={{ transform: `translateX(-${currentIndex * 90}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className='w-[90%] flex-shrink-0 pr-4 md:pr-16'
                >
                  <div className='p-4 md:p-8'>
                    <blockquote className='text-terminal-text font-ocr text-base md:text-lg lg:text-xl leading-relaxed mb-4 md:mb-6 lg:mb-8'>
                      "{testimonial.quote}"
                    </blockquote>

                    <div className='border-t border-terminal-border pt-3 md:pt-4 lg:pt-6'>
                      <div className='text-terminal-cyan font-ibm text-base md:text-lg lg:text-xl mb-1 md:mb-2'>
                        {testimonial.name}
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
        </div>
      </div>
    </section>
  );
}
