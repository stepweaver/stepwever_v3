'use client';

import React, { memo, useState } from 'react';

/* ---------- 1. data ---------- */

const STORIES = [
  {
    title: 'Notre Dame Reporting Overhaul',
    description:
      'As business analyst, I learned SQL and built custom Tableau dashboards to replace the terrible off‑the‑shelf reporting software, delivering 10× faster ad‑hoc reporting and achieving 100 % adoption across campus ID operations.',
    metrics: [
      '10× faster ad‑hoc reporting',
      '100 % adoption across campus ID operations',
    ],
    category: 'Data & Analytics',
  },
  {
    title: 'Small‑Business Sites',
    description:
      'Solo designer‑dev shipping modern, mobile‑first marketing sites with exceptional performance and rapid delivery times.',
    metrics: [
      'Modern mobile‑first design',
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
    title: 'Portfolio + Job‑Hunt Sprint',
    description:
      'Demonstrated AI‑assisted rapid iteration and tangible career benefits through strategic portfolio development and deployment.',
    metrics: [
      'Interview + offer on same day',
      'Recent Software Engineer interview',
    ],
    category: 'Career Development',
  },
];

/* ---------- 2. card ---------- */

const StoryCard = ({ story }) => (
  <article
    className={`
      bg-terminal-dark border border-terminal-green/15 rounded-lg
      shadow-lg hover:shadow-terminal-green/20 transition-shadow
      flex flex-col h-full
    `}
  >
    {/* terminal header */}
    <header className='bg-terminal-light px-3 py-2 border-b border-terminal-border flex items-center justify-between'>
      <div className='flex items-center space-x-2'>
        <span className='w-3 h-3 bg-terminal-red rounded-full' />
        <span className='w-3 h-3 bg-terminal-yellow rounded-full' />
        <span className='w-3 h-3 bg-terminal-green rounded-full' />
      </div>
      <span className='text-terminal-dimmed text-xs font-ocr'>~/story</span>
    </header>

    {/* body */}
    <div className='p-4 flex flex-col grow'>
      <span className='mb-2 inline-block bg-terminal-green/20 text-terminal-green text-xs font-ocr px-2 py-1 rounded border border-terminal-green/30'>
        {story.category}
      </span>

      <h3 className='text-terminal-green font-ibm text-base mb-3 leading-tight'>
        {story.title}
      </h3>

      <p className='text-terminal-text font-ocr text-xs leading-relaxed mb-4 grow'>
        {story.description}
      </p>

      <div>
        <h4 className='text-terminal-cyan font-ibm text-xs mb-2'>
          KEY METRICS:
        </h4>
        <ul className='space-y-1'>
          {story.metrics.map((m) => (
            <li key={m} className='text-terminal-yellow font-ocr text-xs flex'>
              <span className='text-terminal-green mr-2'>▶</span>
              {m}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </article>
);

/* ---------- 3. carousel + grid ---------- */

function SuccessStories() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);

  const nextStory = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % STORIES.length);
  };

  const prevStory = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + STORIES.length) % STORIES.length
    );
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.changedTouches[0].screenX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStartX) return;

    const endX = e.changedTouches[0].screenX;
    const distance = touchStartX - endX;
    const swipeThreshold = 50;

    if (distance > swipeThreshold) {
      nextStory();
    } else if (distance < -swipeThreshold) {
      prevStory();
    }

    setTouchStartX(null);
  };

  return (
    <section
      id='success-stories'
      className='relative z-30 pt-10 pb-24 md:pt-16'
    >
      <div className='mx-auto px-4 sm:px-6 md:px-8 lg:px-6 xl:px-6 2xl:px-6 max-w-none'>
        {/* heading */}
        <header className='mb-12 md:mb-16'>
          <h2 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight text-left font-ibm text-terminal-green'>
            SELECTED SUCCESS STORIES
          </h2>
        </header>

        {/* mobile carousel */}
        <div className='md:hidden'>
          <div
            className='overflow-hidden'
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className='flex transition-transform duration-300 ease-out'
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {STORIES.map((s) => (
                <div key={s.title} className='w-full flex-shrink-0'>
                  <StoryCard story={s} />
                </div>
              ))}
            </div>
          </div>

          {/* pagination indicators */}
          <div className='flex justify-center mt-6 space-x-2'>
            {STORIES.map((_, index) => (
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

        {/* desktop auto-fit grid */}
        <div
          className='hidden md:grid gap-6 lg:gap-8 mt-8 w-full'
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(16rem, 1fr))',
          }}
        >
          {STORIES.map((s) => (
            <StoryCard key={s.title} story={s} />
          ))}
        </div>
      </div>
    </section>
  );
}

// memo is optional but inexpensive
export default memo(SuccessStories);
