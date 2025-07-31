'use client';

import { memo, useState, useEffect, useRef } from 'react';
import ProjectCard from '@/components/ProjectCard/ProjectCard';
import GlitchLambda from '@/components/ui/GlitchLambda';

// 1) Data lives outside the component
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
    link: '/services/data-pipeline',
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
    link: '/services/analytics',
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
    link: '/services/web-design',
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
    link: '/services/brand-strategy',
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
    link: '/services/marketing-automation',
    tags: ['Email Automation', 'CRM Integration', 'Lead Generation'],
  },
];

function Hero() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(2); // Default for SSR
  const [isClient, setIsClient] = useState(false);

  // Touch/swipe state
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const carouselRef = useRef(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Touch event handlers for swipe functionality
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextCard();
    } else if (isRightSwipe) {
      prevCard();
    }
  };

  // Swipe handlers for mouse drag
  const onMouseDown = (e) => {
    setTouchEnd(null);
    setTouchStart(e.clientX);
  };

  const onMouseMove = (e) => {
    if (touchStart !== null) {
      setTouchEnd(e.clientX);
    }
  };

  const onMouseUp = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextCard();
    } else if (isRightSwipe) {
      prevCard();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  // Calculate total pages based on screen size - only after client mounts
  useEffect(() => {
    if (!isClient) return;

    const getTotalPages = () => {
      const totalProjects = PROJECTS.length;
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
    };

    setTotalPages(getTotalPages());

    const handleResize = () => {
      setTotalPages(getTotalPages());
      // Reset to first page when resizing
      setCurrentCardIndex(0);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isClient]);

  const nextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % totalPages);
  };

  const prevCard = () => {
    setCurrentCardIndex(
      (prevIndex) => (prevIndex - 1 + totalPages) % totalPages
    );
  };

  const getCardsForPage = (pageIndex) => {
    if (!isClient) {
      // Default for SSR: 3 cards per page
      const startIndex = pageIndex * 3;
      return PROJECTS.slice(startIndex, startIndex + 3);
    }

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
  };

  return (
    <section className='relative z-30 pt-0 pb-4 sm:pb-8 md:pb-12'>
      <div className='mx-auto px-4 sm:px-6 md:px-8 lg:px-6 xl:px-6 2xl:px-6 max-w-none'>
        {/* Hero Headline */}
        <header className='mb-6 sm:mb-10'>
          <h1 className='text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl mb-4 sm:mb-6 leading-tight text-right font-ibm w-full min-h-[6rem] sm:min-h-[10rem] md:min-h-[12rem] lg:min-h-[14rem] xl:min-h-[16rem] 2xl:min-h-[18rem] flex flex-col sm:flex-row items-end justify-end relative overflow-hidden'>
            <div className='relative max-w-[99vw] sm:max-w-[98vw] md:max-w-[95vw] lg:max-w-[90vw] xl:max-w-[85vw] 2xl:max-w-[80vw] break-words'>
              <div className='text-terminal-green font-bold mb-1 sm:mb-2 md:mb-3 whitespace-nowrap'>
                Real systems.
              </div>
              <div className='text-terminal-cyan font-bold mb-1 sm:mb-2 md:mb-3 whitespace-nowrap'>
                Real impact.
              </div>
              <div className='text-terminal-magenta font-bold whitespace-nowrap'>
                No nonsense.
              </div>
            </div>
          </h1>
        </header>

        {/* Hero Description */}
        <div className='mb-6 sm:mb-10 max-w-6xl ml-auto'>
          <p className='text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-terminal-text leading-tight font-ocr'>
            Practical transformation, powered by code. I wire up automations,
            dashboards, and clean sites that transform your business through
            efficient, scalable solutions. From concept to deployment in record
            time.
          </p>
        </div>

        {/* Terminal Link */}
        <div className='max-w-6xl ml-auto mb-6 sm:mb-10'>
          <a
            href='/terminal'
            className='inline-flex items-center gap-2 sm:gap-3 text-terminal-cyan hover:text-terminal-green transition-all duration-300 font-ibm text-base sm:text-xl md:text-2xl hover:scale-105'
          >
            <GlitchLambda className='text-terminal-green text-lg sm:text-2xl md:text-3xl' />
            <span className='font-bold whitespace-nowrap'>
              Try our interactive terminal
            </span>
            <span className='text-terminal-green text-lg sm:text-2xl md:text-3xl animate-pulse'>
              →
            </span>
          </a>
        </div>

        {/* Project Cards with Side Scrolling */}
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
              aria-label='Next page'
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
            className='overflow-hidden cursor-grab active:cursor-grabbing'
            ref={carouselRef}
          >
            <div
              className='flex transition-transform duration-500 ease-in-out'
              style={{ transform: `translateX(-${currentCardIndex * 100}%)` }}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
            >
              {/* Generate pages dynamically based on screen size */}
              {Array.from({ length: totalPages }, (_, pageIndex) => (
                <div
                  key={pageIndex}
                  className='w-full flex-shrink-0 flex flex-col md:flex-row gap-4 md:gap-6'
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
          <div className='flex justify-center mt-4 space-x-2'>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentCardIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentCardIndex
                    ? 'bg-terminal-green'
                    : 'bg-terminal-dimmed hover:bg-terminal-green/50'
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// memo is optional but inexpensive
export default memo(Hero);
