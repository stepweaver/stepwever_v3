'use client';

import { useState, useEffect } from 'react';
import ProjectCard from '@/components/ProjectCard/ProjectCard';

export default function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const words = [
    { text: 'Automate', color: 'text-terminal-green' },
    { text: 'Optimize', color: 'text-terminal-cyan' },
    { text: 'Scale', color: 'text-terminal-magenta' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setIsVisible(true);
      }, 150); // Half of the fade transition time
    }, 2750); // 2.75 seconds per word

    return () => clearInterval(interval);
  }, [words.length]);

  const projects = [
    {
      title: 'Data Pipeline Automation',
      description:
        'Effortlessly connect apps, databases, and APIs to automate reporting and analytics. Slash manual work and surface new business insights with custom, resilient data pipelines—built to handle millions of rows or just a daily spreadsheet.',
      keywords: ['Data Automation', 'API Integration', 'Reporting'],
      actions: [
        'Consolidate sales and ops data in a live dashboard',
        'Automate end-of-day exports and reconciliations',
      ],
      link: '/services/data-pipeline',
      tags: ['Data & Analytics', 'Automation', 'Python'],
    },
    {
      title: 'E-commerce & Workflow Optimization',
      description:
        'Build smarter shops and smoother workflows. Integrate e-commerce, automate inventory, streamline invoicing, or connect online orders with backend processes—no more spreadsheet gymnastics.',
      keywords: ['Web Automation', 'Commerce', 'Operations'],
      actions: [
        'Inventory synced across sales channels',
        'Custom automations (orders, fulfillment, reminders)',
      ],
      link: '/services/ecommerce',
      tags: ['Web Development', 'E-commerce', 'React'],
    },
    {
      title: 'Growth Analytics Dashboards',
      description:
        'Real-time dashboards and reporting built for speed and clarity. Plug your sources in and get up-to-the-minute KPIs, margin models, and custom alerts—without the agency bloat.',
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
        'Modern, lightning-fast websites built for growth. From single-page landers to multi-section sites, every build is custom-crafted for performance, SEO, and clear calls to action—no cookie-cutter templates.',
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
        'Clarity and edge, from your logo to your tone of voice. Develop or refresh your visual identity, messaging, and brand assets—giving your business the confidence to stand out (and scale up).',
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
        'Automate outreach, follow-ups, and list-building. Connect your email, CRM, and website so leads and updates flow hands-free—making every campaign faster and more efficient.',
      keywords: ['Email Automation', 'CRM Integration', 'Lead Generation'],
      actions: [
        'Automated email sequences for new leads',
        'Sync form submissions to CRM and mailing lists',
      ],
      link: '/services/marketing-automation',
      tags: ['Email Automation', 'CRM Integration', 'Lead Generation'],
    },
  ];

  const nextCard = () => {
    if (currentCardIndex < 1) {
      // Only 2 pages (0 and 1)
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  return (
    <section className='relative z-30 min-h-screen flex items-center justify-end'>
      <div className='text-left px-8 md:px-16 lg:px-24 w-full'>
        <h1 className='text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[12rem] mb-10 leading-tight text-right font-ibm w-full h-[8rem] sm:h-[10rem] md:h-[12rem] lg:h-[14rem] xl:h-[16rem] flex flex-col sm:flex-row items-end justify-end'>
          <span
            className={`${
              words[currentWordIndex].color
            } transition-opacity duration-300 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {words[currentWordIndex].text}
          </span>
          <span className='text-terminal-text italic sm:ml-2'>fast.</span>
        </h1>

        <p className='text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-terminal-text mb-10 max-w-4xl ml-auto leading-tight font-ocr'>
          Growth systems for businesses that move fast and scale without
          friction.
        </p>

        <p className='text-xl md:text-2xl lg:text-3xl text-terminal-text mb-10 max-w-4xl ml-auto leading-tight font-ocr'>
          At λstepweaver, action comes first. We build lean data pipelines,
          automations, and high-impact web experiences that slash waste and
          surface profit opportunities in weeks—not quarters.
        </p>

        <p className='text-xl md:text-2xl lg:text-3xl text-terminal-text mb-10 max-w-4xl ml-auto leading-tight font-ocr'>
          From concept to deployment in record time.
        </p>

        {/* Project Cards with Side Scrolling */}
        <div className='w-full relative mt-16'>
          {/* Navigation Arrows */}
          {currentCardIndex > 0 && (
            <button
              onClick={prevCard}
              className='absolute left-2 md:left-0 top-1/2 -translate-y-1/2 md:-translate-x-12 z-10 bg-terminal-dark border border-terminal-green/30 text-terminal-green w-8 h-8 md:w-12 md:h-12 rounded-full hover:bg-terminal-green hover:text-terminal-dark transition-all duration-300 font-ibm flex items-center justify-center shadow-[0_0_10px_rgba(0,255,65,0.3)] cursor-pointer text-sm md:text-base'
              aria-label='Previous cards'
            >
              ←
            </button>
          )}

          {currentCardIndex < 1 && (
            <button
              onClick={nextCard}
              className='absolute right-2 md:right-0 top-1/2 -translate-y-1/2 md:translate-x-12 z-10 bg-terminal-dark border border-terminal-green/30 text-terminal-green w-8 h-8 md:w-12 md:h-12 rounded-full hover:bg-terminal-green hover:text-terminal-dark transition-all duration-300 font-ibm flex items-center justify-center shadow-[0_0_10px_rgba(0,255,65,0.3)] cursor-pointer text-sm md:text-base'
              aria-label='Next cards'
            >
              →
            </button>
          )}

          {/* Carousel Container */}
          <div className='overflow-hidden'>
            <div
              className='flex transition-transform duration-500 ease-in-out'
              style={{ transform: `translateX(-${currentCardIndex * 100}%)` }}
            >
              {/* Page 1: First 3 cards */}
              <div className='w-full flex-shrink-0 flex gap-6'>
                {projects.slice(0, 3).map((project, index) => (
                  <div key={index} className='w-1/3'>
                    <ProjectCard
                      title={project.title}
                      description={project.description}
                      link={project.link}
                      tags={project.tags}
                      keywords={project.keywords}
                      actions={project.actions}
                    />
                  </div>
                ))}
              </div>

              {/* Page 2: Last 3 cards */}
              <div className='w-full flex-shrink-0 flex gap-6'>
                {projects.slice(3, 6).map((project, index) => (
                  <div key={index + 3} className='w-1/3'>
                    <ProjectCard
                      title={project.title}
                      description={project.description}
                      link={project.link}
                      tags={project.tags}
                      keywords={project.keywords}
                      actions={project.actions}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
