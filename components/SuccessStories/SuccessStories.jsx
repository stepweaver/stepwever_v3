'use client';

import React, { memo, useState, useEffect } from 'react';

const SuccessStories = memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextStory = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % stories.length);
  };

  const prevStory = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + stories.length) % stories.length
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
      nextStory();
    } else if (distance < -swipeThreshold) {
      prevStory();
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  const stories = [
    {
      title: 'Notre Dame Reporting Overhaul',
      description:
        'As business analyst, I learned SQL and built custom Tableau dashboards to replace the terrible off-the-shelf reporting software, delivering 10× faster ad-hoc reporting and achieving 100% adoption across campus ID operations.',
      metrics: [
        '10× faster ad-hoc reporting',
        '100% adoption across campus ID operations',
      ],
      category: 'Data & Analytics',
    },
    {
      title: 'Small-Business Sites',
      description:
        'Solo designer-dev shipping modern, mobile-first marketing sites with exceptional performance and rapid delivery times.',
      metrics: [
        'Modern mobile-first design',
        'Rapid delivery',
        'Owner satisfaction',
      ],
      category: 'Web Development',
    },
    {
      title: 'Python Desktop App (Google APIs)',
      description:
        'Built a 0→1 tool using new stacks and AI tooling to automate workflows, replacing manual daily exports with automated solutions.',
      metrics: ['Built a 0→1 tool', 'Automated daily exports'],
      category: 'Automation & AI',
    },
    {
      title: 'Portfolio + Job-Hunt Sprint',
      description:
        'Demonstrated AI-assisted rapid iteration and tangible career benefits through strategic portfolio development and deployment.',
      metrics: [
        'Interview + offer on same day',
        'Recent Software Engineer interview',
      ],
      category: 'Career Development',
    },
  ];

  return (
    <section
      id='success-stories'
      className='relative z-30 flex items-start pt-8'
    >
      <div className='text-left px-8 md:px-16 lg:px-24 w-full'>
        {/* Main heading */}
        <h2 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-12 md:mb-16 leading-tight text-left font-ibm text-terminal-green'>
          SELECTED SUCCESS STORIES
        </h2>

        {/* Mobile Carousel / Desktop Grid */}
        <div className='w-full relative'>
          {/* Mobile Swipe Instructions */}
          <div className='text-center mb-4 md:hidden'>
            <p className='text-terminal-dimmed text-sm font-ocr'>
              Swipe to navigate
            </p>
          </div>

          {/* Desktop Navigation Arrows */}
          <div className='hidden md:block'>
            {/* Previous Arrow */}
            <button
              onClick={prevStory}
              className='absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-terminal-dark/80 hover:bg-terminal-dark border border-terminal-green/30 hover:border-terminal-green text-terminal-green hover:text-terminal-green/80 p-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-terminal-green/20'
              aria-label='Previous story'
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
                  d='M15 19l-7-7 7-7'
                />
              </svg>
            </button>

            {/* Next Arrow */}
            <button
              onClick={nextStory}
              className='absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-terminal-dark/80 hover:bg-terminal-dark border border-terminal-green/30 hover:border-terminal-green text-terminal-green hover:text-terminal-green/80 p-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-terminal-green/20'
              aria-label='Next story'
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

          {/* Mobile Carousel Container */}
          <div
            className='md:hidden overflow-hidden'
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className='flex transition-transform duration-500 ease-in-out'
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {stories.map((story, index) => (
                <div key={index} className='w-full flex-shrink-0'>
                  <div className='bg-terminal-dark border border-terminal-green/15 rounded-lg overflow-hidden transition-all duration-300 group'>
                    {/* Terminal Header */}
                    <div className='bg-terminal-light px-3 py-2 border-b border-terminal-border flex items-center justify-between'>
                      <div className='flex items-center space-x-2'>
                        <div className='w-3 h-3 bg-terminal-red rounded-full'></div>
                        <div className='w-3 h-3 bg-terminal-yellow rounded-full'></div>
                        <div className='w-3 h-3 bg-terminal-green rounded-full'></div>
                      </div>
                      <div className='text-terminal-dimmed text-xs font-ocr'>
                        ~/story-{index + 1}
                      </div>
                    </div>

                    {/* Terminal Content */}
                    <div className='p-4 bg-terminal-dark min-h-[280px] flex flex-col'>
                      {/* Category Tag */}
                      <div className='mb-2'>
                        <span className='inline-block bg-terminal-green/20 text-terminal-green text-xs font-ocr px-2 py-1 rounded border border-terminal-green/30'>
                          {story.category}
                        </span>
                      </div>

                      {/* Story Title */}
                      <h3 className='text-terminal-green font-ibm text-base mb-3 leading-tight'>
                        {story.title}
                      </h3>

                      {/* Story Description */}
                      <p className='text-terminal-text font-ocr text-xs leading-relaxed mb-4 flex-grow'>
                        {story.description}
                      </p>

                      {/* Metrics */}
                      <div className='mb-3'>
                        <h4 className='text-terminal-cyan font-ibm text-xs mb-2'>
                          KEY METRICS:
                        </h4>
                        <ul className='space-y-1'>
                          {story.metrics.map((metric, metricIndex) => (
                            <li
                              key={metricIndex}
                              className='text-terminal-yellow font-ocr text-xs flex items-start'
                            >
                              <span className='text-terminal-green mr-2'>
                                ▶
                              </span>
                              {metric}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Terminal Prompt */}
                      <div className='text-terminal-dimmed font-ocr text-xs mt-auto'>
                        <span className='text-terminal-green'>
                          guest@stepweaver.dev
                        </span>
                        <span className='text-terminal-text'> ~ </span>
                        <span className='text-terminal-cyan'>λ</span>
                        <span className='text-terminal-text'>
                          {' '}
                          success-stories
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Grid */}
          <div className='hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 max-w-full'>
            {stories.map((story, index) => (
              <div
                key={index}
                className='bg-terminal-dark border border-terminal-green/15 rounded-lg overflow-hidden transition-all duration-300 group'
              >
                {/* Terminal Header */}
                <div className='bg-terminal-light px-3 py-2 border-b border-terminal-border flex items-center justify-between'>
                  <div className='flex items-center space-x-2'>
                    <div className='w-3 h-3 bg-terminal-red rounded-full'></div>
                    <div className='w-3 h-3 bg-terminal-yellow rounded-full'></div>
                    <div className='w-3 h-3 bg-terminal-green rounded-full'></div>
                  </div>
                  <div className='text-terminal-dimmed text-xs font-ocr'>
                    ~/story-{index + 1}
                  </div>
                </div>

                {/* Terminal Content */}
                <div className='p-4 bg-terminal-dark min-h-[280px] flex flex-col'>
                  {/* Category Tag */}
                  <div className='mb-2'>
                    <span className='inline-block bg-terminal-green/20 text-terminal-green text-xs font-ocr px-2 py-1 rounded border border-terminal-green/30'>
                      {story.category}
                    </span>
                  </div>

                  {/* Story Title */}
                  <h3 className='text-terminal-green font-ibm text-base mb-3 leading-tight'>
                    {story.title}
                  </h3>

                  {/* Story Description */}
                  <p className='text-terminal-text font-ocr text-xs leading-relaxed mb-4 flex-grow'>
                    {story.description}
                  </p>

                  {/* Metrics */}
                  <div className='mb-3'>
                    <h4 className='text-terminal-cyan font-ibm text-xs mb-2'>
                      KEY METRICS:
                    </h4>
                    <ul className='space-y-1'>
                      {story.metrics.map((metric, metricIndex) => (
                        <li
                          key={metricIndex}
                          className='text-terminal-yellow font-ocr text-xs flex items-start'
                        >
                          <span className='text-terminal-green mr-2'>▶</span>
                          {metric}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Terminal Prompt */}
                  <div className='text-terminal-dimmed font-ocr text-xs mt-auto'>
                    <span className='text-terminal-green'>
                      guest@stepweaver.dev
                    </span>
                    <span className='text-terminal-text'> ~ </span>
                    <span className='text-terminal-cyan'>λ</span>
                    <span className='text-terminal-text'> success-stories</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Page Indicators for Mobile */}
          <div className='flex justify-center mt-6 space-x-2 md:hidden'>
            {stories.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-terminal-green'
                    : 'bg-terminal-dimmed hover:bg-terminal-green/50'
                }`}
                aria-label={`Go to story ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

export default SuccessStories;
