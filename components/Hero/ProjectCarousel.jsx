'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import ProjectCard from '@/components/ProjectCard/ProjectCard';

// Project data moved to a separate file
const PROJECTS = [
  {
    title: 'Lambda Orthodontics Website - Demo',
    description:
      'Modern responsive website with functional forms and clean design.',
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
    description:
      'E-commerce platform with shopping cart, CMS, and Stripe payments.',
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
    description:
      'Interactive dice rolling app for tabletop RPGs with terminal aesthetic.',
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isClient, setIsClient] = useState(false);

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
  const containerRef = useRef(null);
  const minSwipeDistance = 50;

  useEffect(() => {
    setIsClient(true);
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
  const handleTouchStart = useCallback((e) => {
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
  }, []);

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

        // Apply real-time visual feedback
        if (containerRef.current) {
          const container = containerRef.current;
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

    // Animate to final position
    if (containerRef.current) {
      const container = containerRef.current;
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
  }, [nextProject, prevProject, currentIndex]);

  // Enhanced mouse drag handlers for desktop
  const handleMouseDown = useCallback((e) => {
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
  }, []);

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

    // Animate to final position
    if (containerRef.current) {
      const container = containerRef.current;
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
  }, [nextProject, prevProject, currentIndex]);

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

  // Calculate how many cards per page based on screen size
  const getCardsPerPage = useCallback(() => {
    if (!isClient || typeof window === 'undefined') return 3;
    if (window.innerWidth < 768) return 1; // Mobile: 1 card
    if (window.innerWidth < 1024) return 2; // Tablet: 2 cards
    return 3; // Desktop: 3 cards
  }, [isClient]);

  const [cardsPerPage, setCardsPerPage] = useState(3);

  useEffect(() => {
    if (!isClient) return;
    setCardsPerPage(getCardsPerPage());

    const handleResize = () => {
      setCardsPerPage(getCardsPerPage());
      setCurrentIndex(0);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isClient, getCardsPerPage]);

  // Calculate total pages
  const totalPages = Math.ceil(PROJECTS.length / cardsPerPage);
  const currentPage = Math.floor(currentIndex / cardsPerPage);

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
    setCurrentIndex(nextPageIndex * cardsPerPage);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [currentPage, totalPages, cardsPerPage, isTransitioning]);

  const prevPage = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const prevPageIndex = (currentPage - 1 + totalPages) % totalPages;
    setCurrentIndex(prevPageIndex * cardsPerPage);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [currentPage, totalPages, cardsPerPage, isTransitioning]);

  return (
    <div className='w-full relative mt-8 sm:mt-16'>
      {/* Mobile Carousel */}
      <div className='md:hidden'>
        <div className='text-center mb-4'>
          <p className='text-terminal-dimmed text-sm font-ocr'>
            Swipe to navigate
          </p>
        </div>
        <div
          ref={carouselRef}
          className='overflow-hidden cursor-grab active:cursor-grabbing [touch-action:pan-y_pinch-zoom] [-webkit-overflow-scrolling:touch] carousel-container'
          role='region'
          aria-label='Project carousel'
        >
          <div
            ref={containerRef}
            className='flex [will-change:transform] [transform:translateZ(0)] [backface-visibility:hidden] [perspective:1000px]'
            style={transformStyle}
          >
            {PROJECTS.map((project, index) => (
              <div
                key={index}
                className='w-full flex-shrink-0 [transform:translateZ(0)] [backface-visibility:hidden] carousel-slide'
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
                />
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
              onClick={() => setCurrentIndex(index)}
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
          <p className='text-terminal-dimmed text-sm font-ocr'>
            Swipe to navigate
          </p>
        </div>

        {/* Desktop Navigation Arrows */}
        <div className='relative'>
          <button
            onClick={prevPage}
            className='absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-terminal-dark/80 hover:bg-terminal-dark border border-terminal-green/30 hover:border-terminal-green text-terminal-green hover:text-terminal-green/80 p-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-terminal-green/20'
            aria-label='Previous page of projects'
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
            onClick={nextPage}
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

        {/* Desktop Carousel Container */}
        <div
          ref={carouselRef}
          className='overflow-hidden cursor-grab active:cursor-grabbing carousel-container'
          role='region'
          aria-label='Project carousel'
        >
          <div
            ref={containerRef}
            className='flex [will-change:transform] [transform:translateZ(0)] [backface-visibility:hidden] [perspective:1000px]'
            style={{
              transform: `translateX(-${currentPage * 100}%)`,
            }}
          >
            {Array.from({ length: totalPages }, (_, pageIndex) => (
              <div
                key={pageIndex}
                className='w-full flex-shrink-0 flex gap-4 md:gap-6 [transform:translateZ(0)] [backface-visibility:hidden] carousel-slide'
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
                      slug={project.slug}
                    />
                  </div>
                ))}
              </div>
            ))}
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
                setCurrentIndex(index * cardsPerPage);
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
