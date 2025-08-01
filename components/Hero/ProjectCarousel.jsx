'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import ProjectCard from '@/components/ProjectCard/ProjectCard';

// Project data moved to a separate file
const PROJECTS = [
  {
    title: 'Lambda Orthodontics',
    description:
      'A professional healthcare website for Lambda Orthodontics, featuring patient testimonials, treatment options, and team information. Built with modern design principles and optimized for patient engagement.',
    imageUrl: '/images/screencapture-lambda-ortho.png',
    keywords: ['Healthcare', 'Patient Portal', 'Treatment Options'],
    actions: [
      'Browse orthodontic treatment options and services',
      'View patient testimonials and team information',
    ],
    link: 'https://lambda-ortho.up.railway.app/',
    tags: ['Web Development', 'Healthcare', 'React'],
  },
  {
    title: 'Soap Stache E-commerce Site',
    description:
      'A clean, modern e-commerce website for Soap Stache, featuring handcrafted premium soaps. The site showcases product listings, detailed descriptions, and a cohesive brand identity.',
    imageUrl: '/images/screencapture-soap-stache.png',
    keywords: ['Next.js 15', 'Sanity CMS', 'Stripe', 'Tailwind CSS 4'],
    actions: [
      'Product catalog with detailed descriptions',
      'Customer reviews and testimonials',
      'Clean, brand-focused design',
      'Mobile-responsive layout',
    ],
    link: 'https://app-soap-stache.vercel.app/',
    tags: ['E-commerce', 'Web Development', 'React'],
  },
  {
    title: 'Data Pipeline Automation',
    description:
      'Effortlessly connect apps, databases, and APIs to automate reporting and analytics. Slash manual work and surface new business insights with custom, resilient data pipelines-built to handle millions of rows or just a daily spreadsheet.',
    keywords: ['Data Automation', 'API Integration', 'Reporting'],
    actions: [
      'Consolidate sales and ops data in a live dashboard',
      'Automate end-of-day exports and reconciliations',
    ],
    tags: ['Data & Analytics', 'Automation', 'Python'],
  },
  {
    title: 'Growth Analytics Dashboards',
    description:
      'Real-time dashboards and reporting built for speed and clarity. Plug your sources in and get up-to-the-minute KPIs, margin models, and custom alerts-without the agency bloat.',
    keywords: ['Analytics', 'Dashboard', 'BI'],
    actions: [
      'Profitability snapshot at a glance',
      'Alerting for trends, risks, and opportunities',
    ],
    tags: ['Analytics', 'Dashboard', 'Data Visualization'],
  },
  {
    title: 'Web Design',
    description:
      'Modern, lightning-fast websites built for growth. From single-page landers to multi-section sites, every build is custom-crafted for performance, SEO, and clear calls to action-no cookie-cutter templates.',
    keywords: ['Web Development', 'UX/UI', 'SEO'],
    actions: [
      'Design & launch a high-performance marketing site',
      'Integrate forms, analytics, and automated follow-ups',
    ],
    tags: ['Web Development', 'UX/UI', 'SEO'],
  },
  {
    title: 'Brand Strategy',
    description:
      'Clarity and edge, from your logo to your tone of voice. Develop or refresh your visual identity, messaging, and brand assets-giving your business the confidence to stand out (and scale up).',
    keywords: ['Brand Identity', 'Design Direction', 'Messaging'],
    actions: [
      'Create a full logo suite and brand guide',
      'Define tone of voice, color palette, and typography',
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

  // Touch/swipe state with better performance
  const touchState = useRef({
    startX: null,
    startY: null,
    currentX: null,
    currentY: null,
    isDragging: false,
  });

  const carouselRef = useRef(null);
  const animationFrameRef = useRef(null);

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
    setTimeout(() => setIsTransitioning(false), 300);
  }, [totalPages, isTransitioning]);

  const prevCard = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentCardIndex(
      (prevIndex) => (prevIndex - 1 + totalPages) % totalPages
    );
    setTimeout(() => setIsTransitioning(false), 300);
  }, [totalPages, isTransitioning]);

  // Optimized touch event handlers
  const onTouchStart = useCallback((e) => {
    const touch = e.targetTouches[0];
    touchState.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      currentX: touch.clientX,
      currentY: touch.clientY,
      isDragging: false,
    };
  }, []);

  const onTouchMove = useCallback((e) => {
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

  const onTouchEnd = useCallback(() => {
    if (!touchState.current.startX || !touchState.current.currentX) return;

    const distance = touchState.current.startX - touchState.current.currentX;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextCard();
    } else if (isRightSwipe) {
      prevCard();
    }

    // Reset touch state
    touchState.current = {
      startX: null,
      startY: null,
      currentX: null,
      currentY: null,
      isDragging: false,
    };
  }, [nextCard, prevCard]);

  // Optimized mouse drag handlers
  const onMouseDown = useCallback((e) => {
    touchState.current = {
      startX: e.clientX,
      startY: e.clientY,
      currentX: e.clientX,
      currentY: e.clientY,
      isDragging: false,
    };
  }, []);

  const onMouseMove = useCallback((e) => {
    if (touchState.current.startX === null) return;

    touchState.current.currentX = e.clientX;
    touchState.current.currentY = e.clientY;

    const deltaX = Math.abs(e.clientX - touchState.current.startX);
    const deltaY = Math.abs(e.clientY - touchState.current.startY);

    if (deltaX > 10 && deltaX > deltaY) {
      touchState.current.isDragging = true;
    }
  }, []);

  const onMouseUp = useCallback(() => {
    if (!touchState.current.startX || !touchState.current.currentX) return;

    const distance = touchState.current.startX - touchState.current.currentX;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextCard();
    } else if (isRightSwipe) {
      prevCard();
    }

    // Reset touch state
    touchState.current = {
      startX: null,
      startY: null,
      currentX: null,
      currentY: null,
      isDragging: false,
    };
  }, [nextCard, prevCard]);

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
        className='overflow-hidden cursor-grab active:cursor-grabbing [touch-action:pan-y_pinch-zoom] [-webkit-overflow-scrolling:touch]'
        ref={carouselRef}
        role='region'
        aria-label='Project carousel'
      >
        <div
          className='flex [transition:transform_300ms_cubic-bezier(0.25,0.46,0.45,0.94)] [will-change:transform] [transform:translateZ(0)] [backface-visibility:hidden] [perspective:1000px]'
          style={transformStyle}
        >
          {/* Generate pages dynamically based on screen size */}
          {Array.from({ length: totalPages }, (_, pageIndex) => (
            <div
              key={pageIndex}
              className='w-full flex-shrink-0 flex flex-col md:flex-row gap-4 md:gap-6 [transform:translateZ(0)] [backface-visibility:hidden]'
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
