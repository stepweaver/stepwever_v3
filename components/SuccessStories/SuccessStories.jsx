'use client';

import React, {
  memo,
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect,
} from 'react';

/* ---------- 1. data ---------- */

const STORIES = [
  {
    title: 'Notre Dame Reporting Overhaul',
    description:
      'As business analyst, I learned SQL and built custom Tableau dashboards to replace the terrible off‑the‑shelf reporting software, delivering 10× faster ad‑hoc reporting and achieving 100 % adoption across campus ID operations.',
    metrics: [
      '10× faster ad‑hoc reporting',
      '100 % adoption across campus ID operations',
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
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Touch/swipe state with better performance
  const touchState = useRef({
    startX: null,
    startY: null,
    currentX: null,
    currentY: null,
    isDragging: false,
  });

  const carouselRef = useRef(null);
  const minSwipeDistance = 50;

  const nextStory = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % STORIES.length);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning]);

  const prevStory = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + STORIES.length) % STORIES.length
    );
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning]);

  // Optimized touch event handlers
  const handleTouchStart = useCallback((e) => {
    const touch = e.targetTouches[0];
    touchState.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      currentX: touch.clientX,
      currentY: touch.clientY,
      isDragging: false,
    };
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!touchState.current.startX) return;

    const touch = e.targetTouches[0];
    touchState.current.currentX = touch.clientX;
    touchState.current.currentY = touch.clientY;

    // Prevent default only if we're actually dragging
    const deltaX = Math.abs(touch.clientX - touchState.current.startX);
    const deltaY = Math.abs(touch.clientY - touchState.current.startY);

    if (deltaX > 10 && deltaX > deltaY) {
      touchState.current.isDragging = true;
      e.preventDefault();
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchState.current.startX || !touchState.current.currentX) return;

    const distance = touchState.current.startX - touchState.current.currentX;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextStory();
    } else if (isRightSwipe) {
      prevStory();
    }

    // Reset touch state
    touchState.current = {
      startX: null,
      startY: null,
      currentX: null,
      currentY: null,
      isDragging: false,
    };
  }, [nextStory, prevStory]);

  // Optimized mouse drag handlers for desktop
  const handleMouseDown = useCallback((e) => {
    touchState.current = {
      startX: e.clientX,
      startY: e.clientY,
      currentX: e.clientX,
      currentY: e.clientY,
      isDragging: false,
    };
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (touchState.current.startX === null) return;

    touchState.current.currentX = e.clientX;
    touchState.current.currentY = e.clientY;

    const deltaX = Math.abs(e.clientX - touchState.current.startX);
    const deltaY = Math.abs(e.clientY - touchState.current.startY);

    if (deltaX > 10 && deltaX > deltaY) {
      touchState.current.isDragging = true;
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    if (!touchState.current.startX || !touchState.current.currentX) return;

    const distance = touchState.current.startX - touchState.current.currentX;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextStory();
    } else if (isRightSwipe) {
      prevStory();
    }

    // Reset touch state
    touchState.current = {
      startX: null,
      startY: null,
      currentX: null,
      currentY: null,
      isDragging: false,
    };
  }, [nextStory, prevStory]);

  // Add event listeners with non-passive options
  useEffect(() => {
    const carouselElement = carouselRef.current;
    if (!carouselElement) return;

    // Touch event listeners with non-passive options
    carouselElement.addEventListener('touchstart', handleTouchStart, {
      passive: true,
    });
    carouselElement.addEventListener('touchmove', handleTouchMove, {
      passive: false,
    });
    carouselElement.addEventListener('touchend', handleTouchEnd, {
      passive: true,
    });

    // Mouse event listeners
    carouselElement.addEventListener('mousedown', handleMouseDown, {
      passive: true,
    });
    carouselElement.addEventListener('mousemove', handleMouseMove, {
      passive: true,
    });
    carouselElement.addEventListener('mouseup', handleMouseUp, {
      passive: true,
    });

    return () => {
      carouselElement.removeEventListener('touchstart', handleTouchStart);
      carouselElement.removeEventListener('touchmove', handleTouchMove);
      carouselElement.removeEventListener('touchend', handleTouchEnd);
      carouselElement.removeEventListener('mousedown', handleMouseDown);
      carouselElement.removeEventListener('mousemove', handleMouseMove);
      carouselElement.removeEventListener('mouseup', handleMouseUp);
    };
  }, [
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  ]);

  // Memoized transform style with hardware acceleration
  const transformStyle = useMemo(
    () => ({
      transform: `translateX(-${currentIndex * 100}%)`,
    }),
    [currentIndex]
  );

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
          <div className='text-center mb-4'>
            <p className='text-terminal-dimmed text-sm font-ocr'>
              Swipe to navigate
            </p>
          </div>
          <div
            ref={carouselRef}
            className='overflow-hidden cursor-grab active:cursor-grabbing [touch-action:pan-y_pinch-zoom] [-webkit-overflow-scrolling:touch]'
            role='region'
            aria-label='Success stories carousel'
          >
            <div
              className='flex [transition:transform_600ms_cubic-bezier(0.4,0.0,0.2,1)] [will-change:transform] [transform:translateZ(0)] [backface-visibility:hidden] [perspective:1000px]'
              style={transformStyle}
            >
              {STORIES.map((s) => (
                <div
                  key={s.title}
                  className='w-full flex-shrink-0 [transform:translateZ(0)] [backface-visibility:hidden]'
                >
                  <StoryCard story={s} />
                </div>
              ))}
            </div>
          </div>

          {/* pagination indicators */}
          <div
            className='flex justify-center mt-6 space-x-2'
            role='tablist'
            aria-label='Success stories navigation'
          >
            {STORIES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 flex items-center justify-center rounded-full transition-all duration-300 relative ${
                  index === currentIndex
                    ? 'bg-terminal-green'
                    : 'bg-terminal-dimmed hover:bg-terminal-green/50'
                }`}
                aria-label={`Go to story ${index + 1} of ${STORIES.length}: ${
                  STORIES[index].title
                }`}
                aria-selected={index === currentIndex}
                role='tab'
              >
                <div
                  className={`rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-terminal-green'
                      : 'bg-terminal-dimmed hover:bg-terminal-green/50'
                  }`}
                  style={{ width: '8px', height: '8px' }}
                />
              </button>
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
