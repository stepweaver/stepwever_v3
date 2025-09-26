'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import ProjectCard from '@/components/ProjectCard/ProjectCard';

// Project data moved to a separate file
const PROJECTS = [
  {
    title: 'Cut reporting time from hours to minutes',
    description:
      'Built a custom dashboard for a healthcare practice that replaced slow, confusing reports with real-time data that staff actually use. Now they can see patient trends and business performance at a glance.',
    imageUrl: '/images/screencapture-lambda-ortho.png',
    keywords: ['Healthcare', 'Dashboard', 'Time Savings'],
    actions: [
      'See patient trends and business performance instantly',
      'No more waiting for monthly reports',
    ],
    link: 'https://lambdaortho.vercel.app/',
    tags: ['Web Development', 'Healthcare', 'Dashboard'],
  },
  {
    title: 'Turned online store into a sales machine',
    description:
      'Created an e-commerce site for a soap business that makes it easy for customers to find and buy products. The site handles everything from browsing to checkout, so the owner can focus on making soap instead of managing orders.',
    imageUrl: '/images/screencapture-soap-stache.png',
    keywords: ['E-commerce', 'Sales Growth', 'Easy Management'],
    actions: [
      'Customers can easily browse and buy products',
      'Owner spends time making soap, not managing orders',
    ],
    link: 'https://app-soap-stache.vercel.app/',
    tags: ['E-commerce', 'Web Development', 'Sales'],
  },
  {
    title: 'Eliminated daily data entry forever',
    description:
      'Connected all the business apps so data flows automatically between them. No more copying numbers from one system to another - everything updates in real-time, saving hours every week.',
    keywords: ['Automation', 'Time Savings', 'Data Flow'],
    actions: [
      'All your business data in one place automatically',
      'No more manual data entry or duplicate work',
    ],
    tags: ['Automation', 'Data Integration', 'Time Savings'],
  },
  {
    title: 'Made business numbers crystal clear',
    description:
      'Built dashboards that show exactly what matters to the business - profit, customer trends, and growth opportunities. No more guessing or waiting for reports that are already outdated.',
    keywords: ['Business Intelligence', 'Clear Metrics', 'Real-time Data'],
    actions: [
      'See exactly how your business is performing right now',
      'Spot trends and opportunities before your competitors',
    ],
    tags: ['Analytics', 'Dashboard', 'Business Intelligence'],
  },
  {
    title: 'Built websites that bring in customers',
    description:
      'Created professional websites that work on every device and actually convert visitors into customers. Each site is built to grow with the business, not just look pretty.',
    keywords: ['Customer Acquisition', 'Mobile-friendly', 'Conversion'],
    actions: [
      'Professional website that works on phones and computers',
      'Contact forms and features that actually work',
    ],
    tags: ['Web Development', 'Customer Acquisition', 'Mobile'],
  },
  {
    title: 'Created a clear path to growth',
    description:
      'Helped a business figure out exactly what to measure and how to track it. Built the tools to monitor progress and spot opportunities, so they can make decisions based on real data instead of guesswork.',
    keywords: ['Growth Strategy', 'Clear Metrics', 'Data-driven Decisions'],
    actions: [
      'Know exactly what numbers matter to your business',
      'Track progress and spot opportunities automatically',
    ],
    tags: ['Brand Identity', 'Design Direction', 'Messaging'],
  },
  {
    title: 'Marketing Automation',
    description:
      'Automate outreach, follow-ups, and list-building. Connect your email, CRM, and website so leads and updates flow hands-free-making every campaign faster and more efficient.',
    keywords: ['Email Automation', 'CRM Integration', 'Lead Generation'],
    actions: [
      'Automated email sequences for new leads',
      'Sync form submissions to CRM and mailing lists',
    ],
    tags: ['Email Automation', 'CRM Integration', 'Lead Generation'],
  },
];

export default function ProjectCarousel() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(2);
  const [isClient, setIsClient] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

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
  });

  const carouselRef = useRef(null);
  const animationFrameRef = useRef(null);
  const containerRef = useRef(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Memoized functions to prevent unnecessary re-renders
  const getTotalPages = useCallback(() => {
    const totalProjects = PROJECTS.length;
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) {
        // Mobile: 1 card per page
        return totalProjects;
      } else if (window.innerWidth < 1024) {
        // Tablet: 2 cards per page
        return Math.ceil(totalProjects / 2);
      } else {
        // Desktop: 3 cards per page
        return Math.ceil(totalProjects / 3);
      }
    }
    // Default for SSR
    return Math.ceil(totalProjects / 3);
  }, []);

  // Calculate total pages based on screen size - only after client mounts
  useEffect(() => {
    if (!isClient) return;

    setTotalPages(getTotalPages());

    const handleResize = () => {
      setTotalPages(getTotalPages());
      // Reset to first page when resizing
      setCurrentCardIndex(0);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [isClient, getTotalPages]);

  const nextCard = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % totalPages);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [totalPages, isTransitioning]);

  const prevCard = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentCardIndex(
      (prevIndex) => (prevIndex - 1 + totalPages) % totalPages
    );
    setTimeout(() => setIsTransitioning(false), 600);
  }, [totalPages, isTransitioning]);

  // Enhanced touch event handlers with real-time feedback
  const onTouchStart = useCallback((e) => {
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

    // Cancel any ongoing animations
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    // Add active state for better visual feedback
    if (carouselRef.current) {
      carouselRef.current.classList.add('carousel-active');
    }
  }, []);

  const onTouchMove = useCallback(
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

        // Apply real-time visual feedback - simplified for smoother performance
        if (containerRef.current) {
          const container = containerRef.current;
          const baseTransform = -currentCardIndex * 100;
          const dragOffset = (deltaX / window.innerWidth) * 100;
          const transform = baseTransform + dragOffset;

          // Direct transform update for smoother real-time feedback
          container.style.transform = `translateX(${transform}%)`;
          container.style.transition = 'none';
        }

        e.preventDefault();
      }
    },
    [currentCardIndex]
  );

  const onTouchEnd = useCallback(() => {
    if (!touchState.current.startX || !touchState.current.currentX) return;

    const distance = touchState.current.startX - touchState.current.currentX;
    const velocity = touchState.current.velocity;
    const isLeftSwipe =
      distance > minSwipeDistance ||
      (Math.abs(velocity) > 0.5 && distance > 20);
    const isRightSwipe =
      distance < -minSwipeDistance ||
      (Math.abs(velocity) > 0.5 && distance < -20);

    // Animate to final position with improved easing
    if (containerRef.current) {
      const container = containerRef.current;

      if (isLeftSwipe) {
        // Calculate the target index first
        const targetIndex = (currentCardIndex + 1) % totalPages;
        container.style.transition =
          'transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        container.style.transform = `translateX(-${targetIndex * 100}%)`;

        // Update state after setting transform
        setTimeout(() => {
          nextCard();
        }, 50);
      } else if (isRightSwipe) {
        // Calculate the target index first
        const targetIndex = (currentCardIndex - 1 + totalPages) % totalPages;
        container.style.transition =
          'transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        container.style.transform = `translateX(-${targetIndex * 100}%)`;

        // Update state after setting transform
        setTimeout(() => {
          prevCard();
        }, 50);
      } else {
        // Snap back to current position with bounce effect
        container.style.transition =
          'transform 300ms cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        container.style.transform = `translateX(-${currentCardIndex * 100}%)`;
      }

      // Reset transition after animation
      setTimeout(() => {
        if (container) {
          container.style.transition = '';
        }
      }, 300);
    }

    // Remove active state
    if (carouselRef.current) {
      carouselRef.current.classList.remove('carousel-active');
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
  }, [nextCard, prevCard, currentCardIndex, totalPages]);

  // Enhanced mouse drag handlers for desktop
  const onMouseDown = useCallback((e) => {
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

    // Cancel any ongoing animations
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  }, []);

  const onMouseMove = useCallback(
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

        // Apply real-time visual feedback - simplified for smoother performance
        if (containerRef.current) {
          const container = containerRef.current;
          const baseTransform = -currentCardIndex * 100;
          const dragOffset = (deltaX / window.innerWidth) * 100;
          const transform = baseTransform + dragOffset;

          // Direct transform update for smoother real-time feedback
          container.style.transform = `translateX(${transform}%)`;
          container.style.transition = 'none';
        }
      }
    },
    [currentCardIndex]
  );

  const onMouseUp = useCallback(() => {
    if (!touchState.current.startX || !touchState.current.currentX) return;

    const distance = touchState.current.startX - touchState.current.currentX;
    const velocity = touchState.current.velocity;
    const isLeftSwipe =
      distance > minSwipeDistance ||
      (Math.abs(velocity) > 0.5 && distance > 20);
    const isRightSwipe =
      distance < -minSwipeDistance ||
      (Math.abs(velocity) > 0.5 && distance < -20);

    // Animate to final position
    if (containerRef.current) {
      const container = containerRef.current;

      if (isLeftSwipe) {
        // Calculate the target index first
        const targetIndex = (currentCardIndex + 1) % totalPages;
        container.style.transition =
          'transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        container.style.transform = `translateX(-${targetIndex * 100}%)`;

        // Update state after setting transform
        setTimeout(() => {
          nextCard();
        }, 50);
      } else if (isRightSwipe) {
        // Calculate the target index first
        const targetIndex = (currentCardIndex - 1 + totalPages) % totalPages;
        container.style.transition =
          'transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        container.style.transform = `translateX(-${targetIndex * 100}%)`;

        // Update state after setting transform
        setTimeout(() => {
          prevCard();
        }, 50);
      } else {
        // Snap back to current position with bounce effect
        container.style.transition =
          'transform 300ms cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        container.style.transform = `translateX(-${currentCardIndex * 100}%)`;
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
  }, [nextCard, prevCard, currentCardIndex, totalPages]);

  // Add event listeners with non-passive options
  useEffect(() => {
    const carouselElement = carouselRef.current;
    if (!carouselElement) return;

    // Touch event listeners with non-passive options
    carouselElement.addEventListener('touchstart', onTouchStart, {
      passive: true,
    });
    carouselElement.addEventListener('touchmove', onTouchMove, {
      passive: false,
    });
    carouselElement.addEventListener('touchend', onTouchEnd, { passive: true });

    // Mouse event listeners
    carouselElement.addEventListener('mousedown', onMouseDown, {
      passive: true,
    });
    carouselElement.addEventListener('mousemove', onMouseMove, {
      passive: true,
    });
    carouselElement.addEventListener('mouseup', onMouseUp, { passive: true });

    return () => {
      carouselElement.removeEventListener('touchstart', onTouchStart);
      carouselElement.removeEventListener('touchmove', onTouchMove);
      carouselElement.removeEventListener('touchend', onTouchEnd);
      carouselElement.removeEventListener('mousedown', onMouseDown);
      carouselElement.removeEventListener('mousemove', onMouseMove);
      carouselElement.removeEventListener('mouseup', onMouseUp);
    };
  }, [
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onMouseDown,
    onMouseMove,
    onMouseUp,
  ]);

  // Memoized card rendering function
  const getCardsForPage = useCallback(
    (pageIndex) => {
      if (!isClient) {
        // Default for SSR: 3 cards per page (desktop layout)
        const startIndex = pageIndex * 3;
        return PROJECTS.slice(startIndex, startIndex + 3);
      }

      if (typeof window !== 'undefined') {
        if (window.innerWidth < 768) {
          // Mobile: 1 card per page
          return [PROJECTS[pageIndex]];
        } else if (window.innerWidth < 1024) {
          // Tablet: 2 cards per page
          const startIndex = pageIndex * 2;
          return PROJECTS.slice(startIndex, startIndex + 2);
        } else {
          // Desktop: 3 cards per page
          const startIndex = pageIndex * 3;
          return PROJECTS.slice(startIndex, startIndex + 3);
        }
      }

      // Fallback for SSR
      const startIndex = pageIndex * 3;
      return PROJECTS.slice(startIndex, startIndex + 3);
    },
    [isClient]
  );

  // Memoized transform style with hardware acceleration
  const transformStyle = useMemo(
    () => ({
      transform: `translateX(-${currentCardIndex * 100}%)`,
    }),
    [currentCardIndex]
  );

  return (
    <div className='w-full relative mt-8 sm:mt-16'>
      <div className='text-center mb-4'>
        <p className='text-terminal-dimmed text-sm font-ocr'>
          Swipe to navigate
        </p>
      </div>

      {/* Desktop Navigation Arrows */}
      <div className='hidden md:block'>
        {/* Next Arrow */}
        <button
          onClick={nextCard}
          className='absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-terminal-dark/80 hover:bg-terminal-dark border border-terminal-green/30 hover:border-terminal-green text-terminal-green hover:text-terminal-green/80 p-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-terminal-green/20'
          aria-label='Next page of projects'
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
      </div>

      {/* Carousel Container */}
      <div
        className='overflow-hidden cursor-grab active:cursor-grabbing [touch-action:pan-y_pinch-zoom] [-webkit-overflow-scrolling:touch] carousel-container'
        ref={carouselRef}
        role='region'
        aria-label='Project carousel'
      >
        <div
          ref={containerRef}
          className='flex [will-change:transform] [transform:translateZ(0)] [backface-visibility:hidden] [perspective:1000px]'
          style={transformStyle}
        >
          {/* Generate pages dynamically based on screen size */}
          {Array.from({ length: totalPages }, (_, pageIndex) => (
            <div
              key={pageIndex}
              className='w-full flex-shrink-0 flex flex-col md:flex-row gap-4 md:gap-6 [transform:translateZ(0)] [backface-visibility:hidden] carousel-slide'
            >
              {getCardsForPage(pageIndex).map((project, index) => (
                <div key={index} className='w-full md:w-1/2 lg:w-1/3'>
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    link={project.link}
                    imageUrl={project.imageUrl}
                    tags={project.tags}
                    keywords={project.keywords}
                    actions={project.actions}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Page Indicators */}
      <div
        className='flex justify-center mt-4 space-x-2'
        role='tablist'
        aria-label='Project carousel navigation'
      >
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentCardIndex(index)}
            className={`rounded-full transition-all duration-300 relative ${
              index === currentCardIndex
                ? 'bg-terminal-green'
                : 'bg-terminal-dimmed hover:bg-terminal-green/50'
            }`}
            aria-label={`Go to page ${index + 1} of ${totalPages}`}
            aria-selected={index === currentCardIndex}
            role='tab'
          >
            <div
              className={`rounded-full transition-all duration-300 ${
                index === currentCardIndex
                  ? 'bg-terminal-green'
                  : 'bg-terminal-dimmed hover:bg-terminal-green/50'
              }`}
              style={{ width: '8px', height: '8px' }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
