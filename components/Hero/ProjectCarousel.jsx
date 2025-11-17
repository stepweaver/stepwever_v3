'use client';

import React, {
  memo,
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import Link from 'next/link';
import ProjectCard from '@/components/ProjectCard/ProjectCard';

/* ---------- 1. data ---------- */

const PROJECTS = [
  {
    title: 'Lambda Orthodontics Website - Demo',
    description: 'Modern responsive website with functional forms.',
    imageUrl: '/images/screencapture-lambda-ortho.png',
    keywords: ['Healthcare', 'Website', 'Form Validation'],
    actions: [
      'Three fully functional forms with validation',
      'Modern responsive design built with vanilla JavaScript',
    ],
    link: 'https://lambdaortho.vercel.app/',
    tags: ['Web Development', 'Healthcare', 'Forms'],
    slug: 'lambda-orthodontics',
  },
  {
    title: 'Soap Stache',
    description: 'E-commerce platform with shopping cart and Stripe payments.',
    imageUrl: '/images/screencapture-soap-stache.png',
    keywords: ['E-commerce', 'Next.js', 'Sanity CMS', 'Stripe'],
    actions: [
      'Complete shopping cart and checkout with Stripe integration',
      'Content management through Sanity CMS',
    ],
    link: 'https://app-soap-stache.vercel.app/',
    tags: ['E-commerce', 'Next.js', 'Sanity CMS', 'Stripe'],
    slug: 'soap-stache',
  },
  {
    title: 'RPG Dice Roller',
    description: 'Interactive dice rolling app for tabletop RPGs.',
    imageUrl: '/images/dice-roller.png',
    keywords: ['Gaming', 'Interactive', 'Web App'],
    actions: [
      'Roll any combination of RPG dice instantly',
      'Track roll history and copy results',
    ],
    link: '/dice-roller',
    tags: ['Web Development', 'Gaming', 'Interactive'],
    slug: 'rpg-dice-roller',
  },
  {
    title: 'Neon Profile Card',
    description:
      'Glassmorphism-inspired ID card with neon CRT glow and animated Matrix Sync terminal sequence.',
    imageUrl: null,
    keywords: ['UI System', 'Tailwind CSS', 'Neon', 'React'],
    actions: [
      'Reusable React component with profile data model and IBM/OCR typography',
      'Animated Matrix Sync terminal sequence with React state and animation hooks',
    ],
    tags: ['UI Design', 'Tailwind CSS', 'Animation', 'React'],
    slug: 'neon-profile-card',
  },
  {
    title: 'IT Consulting',
    description: 'Strategic IT consulting to streamline operations.',
    imageUrl: null,
    keywords: ['IT Consulting', 'Strategic Planning', 'System Integration'],
    actions: [
      'Technology planning and implementation',
      'System optimization and workflow improvement',
    ],
    tags: ['IT Consulting', 'Strategic Planning', 'System Integration'],
    slug: 'it-consulting',
  },
  {
    title: 'Google Analytics',
    description: 'Analytics setup and optimization for tracking.',
    imageUrl: null,
    keywords: ['Analytics', 'Data Tracking', 'Business Intelligence'],
    actions: [
      'Comprehensive tracking setup and configuration',
      'Actionable insights from business data',
    ],
    tags: ['Analytics', 'Data Tracking', 'Business Intelligence'],
    slug: 'google-analytics',
  },
  {
    title: 'n8n Automations',
    description: 'Custom automation workflows to connect apps.',
    imageUrl: null,
    keywords: ['Automation', 'n8n', 'Workflow Integration'],
    actions: [
      'Connect apps and services seamlessly',
      'Automate repetitive tasks and data transfers',
    ],
    tags: ['Automation', 'n8n', 'Workflow Integration'],
    slug: 'n8n-automations',
  },
  {
    title: 'AI Integrations',
    description: 'AI tool integration to enhance workflows.',
    imageUrl: null,
    keywords: ['AI Integration', 'Machine Learning', 'Productivity'],
    actions: [
      'Custom AI solutions for business needs',
      'Enhanced workflows with intelligent automation',
    ],
    tags: ['AI Integration', 'Machine Learning', 'Productivity'],
    slug: 'ai-integrations',
  },
];

/* ---------- 2. carousel + grid ---------- */

function ProjectCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // Default to false to match server
  const [isPaused, setIsPaused] = useState(false);

  // Enhanced touch/swipe state for smooth animations
  const touchState = useRef({
    startX: null,
    startY: null,
    currentX: null,
    currentY: null,
    isDragging: false,
    startTime: null,
    velocity: 0,
    offsetX: 0,
    wasSwipe: false, // Track if the last touch was a swipe
  });

  const mobileCarouselRef = useRef(null);
  const mobileContainerRef = useRef(null);
  const desktopCarouselRef = useRef(null);
  const desktopContainerRef = useRef(null);
  const autoScrollIntervalRef = useRef(null);
  const minSwipeDistance = 50;

  // Pause auto-scroll on user interaction - defined early so it can be used in handlers
  const handleUserInteraction = useCallback(() => {
    setIsPaused(true);
    // Resume after 15 seconds of no interaction
    setTimeout(() => {
      setIsPaused(false);
    }, 15000);
  }, []);

  const nextProject = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % PROJECTS.length);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning]);

  const prevProject = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + PROJECTS.length) % PROJECTS.length
    );
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning]);

  // Enhanced touch event handlers with real-time feedback
  const handleTouchStart = useCallback(
    (e) => {
      const touch = e.targetTouches[0];
      touchState.current = {
        startX: touch.clientX,
        startY: touch.clientY,
        currentX: touch.clientX,
        currentY: touch.clientY,
        isDragging: false,
        startTime: Date.now(),
        velocity: 0,
        offsetX: 0,
      };
      handleUserInteraction();
    },
    [handleUserInteraction]
  );

  const handleTouchMove = useCallback(
    (e) => {
      if (!touchState.current.startX) return;

      const touch = e.targetTouches[0];
      const currentX = touch.clientX;
      const currentY = touch.clientY;

      touchState.current.currentX = currentX;
      touchState.current.currentY = currentY;

      // Calculate drag offset
      const deltaX = currentX - touchState.current.startX;
      const deltaY = Math.abs(currentY - touchState.current.startY);

      // Only handle horizontal swipes
      if (Math.abs(deltaX) > 10 && Math.abs(deltaX) > deltaY) {
        touchState.current.isDragging = true;
        touchState.current.offsetX = deltaX;

        // Calculate velocity
        const elapsed = Date.now() - touchState.current.startTime;
        touchState.current.velocity = deltaX / elapsed;

        // Apply real-time visual feedback (mobile only)
        if (mobileContainerRef.current) {
          const container = mobileContainerRef.current;
          const baseTransform = -currentIndex * 100;
          const dragOffset = (deltaX / window.innerWidth) * 100;
          const transform = baseTransform + dragOffset;

          container.style.transform = `translateX(${transform}%)`;
          container.style.transition = 'none';
        }

        e.preventDefault();
      }
    },
    [currentIndex]
  );

  const handleTouchEnd = useCallback(() => {
    if (!touchState.current.startX || !touchState.current.currentX) return;

    const distance = touchState.current.startX - touchState.current.currentX;
    const velocity = touchState.current.velocity;
    const isLeftSwipe =
      distance > minSwipeDistance ||
      (Math.abs(velocity) > 0.5 && distance > 20);
    const isRightSwipe =
      distance < -minSwipeDistance ||
      (Math.abs(velocity) > 0.5 && distance < -20);

    // Mark if this was a swipe
    const wasSwipe = isLeftSwipe || isRightSwipe;

    // Animate to final position (mobile only)
    if (mobileContainerRef.current) {
      const container = mobileContainerRef.current;
      container.style.transition =
        'transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)';

      if (isLeftSwipe) {
        nextProject();
        container.style.transform = `translateX(-${(currentIndex + 1) * 100}%)`;
      } else if (isRightSwipe) {
        prevProject();
        container.style.transform = `translateX(-${
          ((currentIndex - 1 + PROJECTS.length) % PROJECTS.length) * 100
        }%)`;
      } else {
        // Snap back to current position
        container.style.transform = `translateX(-${currentIndex * 100}%)`;
      }

      // Reset transition after animation
      setTimeout(() => {
        if (container) {
          container.style.transition = '';
        }
      }, 300);
    }

    // Set wasSwipe flag
    touchState.current.wasSwipe = wasSwipe;

    // Clear wasSwipe after a delay to allow click handlers to check it
    setTimeout(() => {
      touchState.current.wasSwipe = false;
    }, 300);

    // Reset touch state
    touchState.current = {
      ...touchState.current,
      startX: null,
      startY: null,
      currentX: null,
      currentY: null,
      isDragging: false,
      startTime: null,
      velocity: 0,
      offsetX: 0,
    };
  }, [nextProject, prevProject, currentIndex]);

  // Enhanced mouse drag handlers for desktop
  const handleMouseDown = useCallback(
    (e) => {
      touchState.current = {
        startX: e.clientX,
        startY: e.clientY,
        currentX: e.clientX,
        currentY: e.clientY,
        isDragging: false,
        startTime: Date.now(),
        velocity: 0,
        offsetX: 0,
      };
      handleUserInteraction();
    },
    [handleUserInteraction]
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (touchState.current.startX === null) return;

      const currentX = e.clientX;
      const currentY = e.clientY;

      touchState.current.currentX = currentX;
      touchState.current.currentY = currentY;

      const deltaX = currentX - touchState.current.startX;
      const deltaY = Math.abs(currentY - touchState.current.startY);

      if (Math.abs(deltaX) > 10 && Math.abs(deltaX) > deltaY) {
        touchState.current.isDragging = true;
        touchState.current.offsetX = deltaX;

        // Calculate velocity
        const elapsed = Date.now() - touchState.current.startTime;
        touchState.current.velocity = deltaX / elapsed;

        // Apply real-time visual feedback
        if (containerRef.current) {
          const container = containerRef.current;
          const baseTransform = -currentIndex * 100;
          const dragOffset = (deltaX / window.innerWidth) * 100;
          const transform = baseTransform + dragOffset;

          container.style.transform = `translateX(${transform}%)`;
          container.style.transition = 'none';
        }
      }
    },
    [currentIndex]
  );

  const handleMouseUp = useCallback(() => {
    if (!touchState.current.startX || !touchState.current.currentX) return;

    const distance = touchState.current.startX - touchState.current.currentX;
    const velocity = touchState.current.velocity;
    const isLeftSwipe =
      distance > minSwipeDistance ||
      (Math.abs(velocity) > 0.5 && distance > 20);
    const isRightSwipe =
      distance < -minSwipeDistance ||
      (Math.abs(velocity) > 0.5 && distance < -20);

    // Animate to final position (mobile only)
    if (mobileContainerRef.current) {
      const container = mobileContainerRef.current;
      container.style.transition =
        'transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)';

      if (isLeftSwipe) {
        nextProject();
        container.style.transform = `translateX(-${(currentIndex + 1) * 100}%)`;
        handleUserInteraction();
      } else if (isRightSwipe) {
        prevProject();
        container.style.transform = `translateX(-${
          ((currentIndex - 1 + PROJECTS.length) % PROJECTS.length) * 100
        }%)`;
        handleUserInteraction();
      } else {
        // Snap back to current position
        container.style.transform = `translateX(-${currentIndex * 100}%)`;
      }

      // Reset transition after animation
      setTimeout(() => {
        if (container) {
          container.style.transition = '';
        }
      }, 300);
    }

    // Reset touch state
    touchState.current = {
      startX: null,
      startY: null,
      currentX: null,
      currentY: null,
      isDragging: false,
      startTime: null,
      velocity: 0,
      offsetX: 0,
    };
  }, [nextProject, prevProject, currentIndex, handleUserInteraction]);

  // Add event listeners with non-passive options (mobile only)
  useEffect(() => {
    const carouselElement = mobileCarouselRef.current;
    if (!carouselElement) return;

    // Only attach listeners on mobile
    if (!isMobile) return;

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
    isMobile,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  ]);

  // Memoized transform style with hardware acceleration and smooth transitions
  const transformStyle = useMemo(
    () => ({
      transform: `translateX(-${currentIndex * 100}%)`,
      transition: 'transform 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    }),
    [currentIndex]
  );

  // Calculate how many cards per page based on screen size
  const getCardsPerPage = useCallback(() => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth < 768) return 1; // Mobile: 1 card
    if (window.innerWidth < 1024) return 2; // Tablet: 2 cards
    return 3; // Desktop: 3 cards
  }, []);

  const [cardsPerPage, setCardsPerPage] = useState(3);
  const [desktopPageIndex, setDesktopPageIndex] = useState(0);

  useEffect(() => {
    // Set mobile state and cards per page after mount to avoid hydration mismatch
    setIsMobile(window.innerWidth < 768);
    setCardsPerPage(getCardsPerPage());

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setCardsPerPage(getCardsPerPage());
      setDesktopPageIndex(0);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getCardsPerPage]);

  // Calculate total pages for desktop
  const totalPages = Math.ceil(PROJECTS.length / cardsPerPage);
  const currentPage = desktopPageIndex;

  // Get cards for a specific page
  const getCardsForPage = useCallback(
    (pageIndex) => {
      const startIndex = pageIndex * cardsPerPage;
      return PROJECTS.slice(startIndex, startIndex + cardsPerPage);
    },
    [cardsPerPage]
  );

  const nextPage = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const nextPageIndex = (currentPage + 1) % totalPages;
    setDesktopPageIndex(nextPageIndex);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [currentPage, totalPages, isTransitioning]);

  const prevPage = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const prevPageIndex = (currentPage - 1 + totalPages) % totalPages;
    setDesktopPageIndex(prevPageIndex);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [currentPage, totalPages, isTransitioning]);

  // Auto-scroll functionality
  useEffect(() => {
    // Clear any existing interval
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
    }

    // Don't auto-scroll if paused or transitioning
    if (isPaused || isTransitioning) return;

    // Auto-scroll interval: 10 seconds (generous reading time)
    const AUTO_SCROLL_DELAY = 10000;

    autoScrollIntervalRef.current = setInterval(() => {
      if (isMobile) {
        // Mobile: advance to next project
        nextProject();
      } else {
        // Desktop: advance to next page
        if (totalPages > 1) {
          nextPage();
        }
      }
    }, AUTO_SCROLL_DELAY);

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, [isMobile, isPaused, isTransitioning, nextProject, nextPage, totalPages]);

  return (
    <div className='w-full relative mt-8 sm:mt-16'>
      {/* Mobile Carousel */}
      <div className='md:hidden'>
        <div className='text-center mb-4'>
          <p className='text-terminal-dimmed text-base sm:text-lg font-ocr'>
            Swipe to navigate
          </p>
        </div>
        <div
          ref={mobileCarouselRef}
          className='overflow-hidden cursor-grab active:cursor-grabbing [touch-action:pan-y_pinch-zoom] [-webkit-overflow-scrolling:touch] carousel-container'
          role='region'
          aria-label='Project carousel'
          onMouseEnter={handleUserInteraction}
          onTouchStart={handleUserInteraction}
        >
          <div
            ref={mobileContainerRef}
            className='flex [will-change:transform] [transform:translateZ(0)] [backface-visibility:hidden] [perspective:1000px]'
            style={transformStyle}
          >
            {PROJECTS.map((project, index) => (
              <div
                key={index}
                className='w-full flex-shrink-0 [transform:translateZ(0)] [backface-visibility:hidden] carousel-slide'
              >
                {project.slug || project.link ? (
                  <Link
                    href={
                      project.slug
                        ? `/projects/${project.slug}`
                        : project.link || '#'
                    }
                    target={
                      project.link && project.link.startsWith('http')
                        ? '_blank'
                        : undefined
                    }
                    rel={
                      project.link && project.link.startsWith('http')
                        ? 'noopener noreferrer'
                        : undefined
                    }
                    className='block h-full'
                    onClick={(e) => {
                      // On mobile, prevent navigation if this was a swipe
                      if (isMobile) {
                        if (
                          touchState.current.wasSwipe ||
                          touchState.current.isDragging
                        ) {
                          e.preventDefault();
                          e.stopPropagation();
                          return false;
                        }
                      }
                      // On desktop, always allow clicks
                    }}
                    style={{
                      touchAction: isMobile ? 'pan-y pinch-zoom' : 'auto',
                      pointerEvents: 'auto',
                      WebkitTapHighlightColor: 'transparent',
                    }}
                  >
                    <ProjectCard
                      title={project.title}
                      description={project.description}
                      link={project.link}
                      imageUrl={project.imageUrl}
                      tags={project.tags}
                      keywords={project.keywords}
                      actions={project.actions}
                      slug={project.slug}
                      isLCP={index === 0}
                    />
                  </Link>
                ) : (
                  <div className='h-full'>
                    <ProjectCard
                      title={project.title}
                      description={project.description}
                      link={project.link}
                      imageUrl={project.imageUrl}
                      tags={project.tags}
                      keywords={project.keywords}
                      actions={project.actions}
                      slug={project.slug}
                      isLCP={index === 0}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile pagination indicators */}
        <div
          className='flex justify-center mt-6 space-x-2'
          role='tablist'
          aria-label='Project carousel navigation'
        >
          {PROJECTS.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                handleUserInteraction();
              }}
              className={`w-3 h-3 flex items-center justify-center rounded-full transition-all duration-300 relative ${
                index === currentIndex
                  ? 'bg-terminal-green'
                  : 'bg-terminal-dimmed hover:bg-terminal-green/50'
              }`}
              aria-label={`Go to project ${index + 1} of ${PROJECTS.length}`}
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

      {/* Desktop Grid/Carousel */}
      <div className='hidden md:block'>
        <div className='text-center mb-4'>
          <p className='text-terminal-dimmed text-base sm:text-lg font-ocr'>
            Swipe to navigate
          </p>
        </div>

        {/* Desktop Carousel Container */}
        <div className='relative'>
          {/* Desktop Navigation Arrows */}
          <button
            onClick={() => {
              prevPage();
              handleUserInteraction();
            }}
            className='absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-terminal-dark/80 hover:bg-terminal-dark border border-terminal-green/30 hover:border-terminal-green text-terminal-green hover:text-terminal-green/80 p-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-terminal-green/20'
            aria-label='Previous page of projects'
            onMouseEnter={handleUserInteraction}
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
              aria-hidden='true'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
          </button>

          <button
            onClick={() => {
              nextPage();
              handleUserInteraction();
            }}
            className='absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-terminal-dark/80 hover:bg-terminal-dark border border-terminal-green/30 hover:border-terminal-green text-terminal-green hover:text-terminal-green/80 p-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-terminal-green/20'
            aria-label='Next page of projects'
            onMouseEnter={handleUserInteraction}
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
              aria-hidden='true'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 5l7 7-7 7'
              />
            </svg>
          </button>

          <div
            ref={desktopCarouselRef}
            className='overflow-hidden carousel-container'
            role='region'
            aria-label='Project carousel'
            onMouseEnter={handleUserInteraction}
          >
            <div
              ref={desktopContainerRef}
              className='flex [will-change:transform] [transform:translateZ(0)] [backface-visibility:hidden] [perspective:1000px]'
              style={{
                transform: `translateX(-${desktopPageIndex * 100}%)`,
                transition:
                  'transform 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
            >
              {Array.from({ length: totalPages }, (_, pageIndex) => (
                <div
                  key={pageIndex}
                  className='w-full flex-shrink-0 flex gap-4 md:gap-6 [transform:translateZ(0)] [backface-visibility:hidden] carousel-slide'
                >
                  {getCardsForPage(pageIndex).map((project, index) => (
                    <div key={index} className='w-full md:w-1/2 lg:w-1/3'>
                      {project.slug || project.link ? (
                        <Link
                          href={
                            project.slug
                              ? `/projects/${project.slug}`
                              : project.link || '#'
                          }
                          target={
                            project.link && project.link.startsWith('http')
                              ? '_blank'
                              : undefined
                          }
                          rel={
                            project.link && project.link.startsWith('http')
                              ? 'noopener noreferrer'
                              : undefined
                          }
                          className='block h-full'
                        >
                          <ProjectCard
                            title={project.title}
                            description={project.description}
                            link={project.link}
                            imageUrl={project.imageUrl}
                            tags={project.tags}
                            keywords={project.keywords}
                            actions={project.actions}
                            slug={project.slug}
                            isLCP={pageIndex === 0 && index === 0}
                          />
                        </Link>
                      ) : (
                        <ProjectCard
                          title={project.title}
                          description={project.description}
                          link={project.link}
                          imageUrl={project.imageUrl}
                          tags={project.tags}
                          keywords={project.keywords}
                          actions={project.actions}
                          slug={project.slug}
                          isLCP={pageIndex === 0 && index === 0}
                        />
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Page Indicators */}
        <div
          className='flex justify-center mt-6 space-x-2'
          role='tablist'
          aria-label='Project carousel navigation'
        >
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => {
                setDesktopPageIndex(index);
                handleUserInteraction();
              }}
              className={`w-3 h-3 flex items-center justify-center rounded-full transition-all duration-300 relative ${
                index === currentPage
                  ? 'bg-terminal-green'
                  : 'bg-terminal-dimmed hover:bg-terminal-green/50'
              }`}
              aria-label={`Go to page ${index + 1} of ${totalPages}`}
              aria-selected={index === currentPage}
              role='tab'
            >
              <div
                className={`rounded-full transition-all duration-300 ${
                  index === currentPage
                    ? 'bg-terminal-green'
                    : 'bg-terminal-dimmed hover:bg-terminal-green/50'
                }`}
                style={{ width: '8px', height: '8px' }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(ProjectCarousel);
