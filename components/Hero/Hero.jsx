'use client';

import { memo } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import HeroOperatorCard from './HeroOperatorCard';
import TerminalLink from './TerminalLink';
import WhyStephen from '@/components/WhyStephen/WhyStephen';
import { HOMEPAGE_CAROUSEL_PROJECTS } from '@/lib/carouselProjects';
import About from '@/components/About/About';

const ProjectCarousel = dynamic(() => import('./ProjectCarousel'), {
  ssr: false,
  loading: () => (
    <div className='min-h-[400px] flex items-center justify-center'>
      <div className='hud-panel p-6 w-full max-w-md motion-safe:animate-pulse'>
        <div className='text-xs tracking-[0.2em] text-neon/50 font-ocr uppercase'>SCANNING MODULES...</div>
        <div className='mt-4 space-y-3'>
          <div className='h-4 bg-neon/10 w-3/4' />
          <div className='h-4 bg-neon/10 w-1/2' />
          <div className='h-4 bg-neon/10 w-2/3' />
        </div>
      </div>
    </div>
  ),
});

function Hero() {
  const featuredProjects = HOMEPAGE_CAROUSEL_PROJECTS.slice(0, 3);

  return (
    <section className='relative z-30 pt-0 pb-8 sm:pb-10 md:pb-12 w-full'>
      <div className='w-full px-1 sm:px-2 md:px-3 lg:px-4 xl:px-6 2xl:px-8'>
        <div className='grid grid-cols-1 lg:grid-cols-[390px_1fr] gap-8 lg:gap-10 xl:gap-12 lg:items-start'>
          <div className='min-w-0 flex flex-col lg:self-start w-full'>
            <HeroOperatorCard />
          </div>

          <div className='min-w-0 flex flex-col border border-neon/20 bg-panel/25 p-5'>
            <div className='text-[10px] sm:text-xs tracking-[0.28em] text-neon/60 font-ocr uppercase'>
              What I do
            </div>
            <h1 className='mt-3 text-2xl sm:text-3xl md:text-4xl font-ibm text-terminal-green leading-tight'>
              Full-stack developer focused on operations-first software.
            </h1>
            <p className='mt-4 max-w-3xl text-base sm:text-lg font-ibm text-text/90 leading-relaxed'>
              I build web apps, automation, and AI-enabled tools that reduce workflow friction and ship cleanly into real teams.
            </p>
            <div className='mt-6 flex flex-wrap gap-3'>
              <Link
                href='/projects'
                className='inline-flex items-center border border-terminal-green/30 bg-terminal-dark/20 px-4 py-2 font-ibm text-sm uppercase tracking-[0.06em] text-terminal-green transition-colors hover:border-terminal-green/65 hover:bg-terminal-green/10'
              >
                View projects
              </Link>
              <Link
                href='/resume'
                className='inline-flex items-center border border-neon/30 bg-terminal-dark/20 px-4 py-2 font-ibm text-sm uppercase tracking-[0.06em] text-neon/85 transition-colors hover:border-neon/60 hover:bg-neon/10 hover:text-neon'
              >
                View resume
              </Link>
            </div>
          </div>
        </div>

        <div className='mt-12 sm:mt-16 w-full px-2 sm:px-4 md:px-0' id='projects'>
          <div className='mb-6 sm:mb-8 flex items-end justify-between gap-4'>
            <div className='min-w-0'>
              <div className='text-[10px] sm:text-xs tracking-[0.28em] text-neon/60 font-ocr uppercase'>
                Featured projects
              </div>
              <h2 className='mt-2 text-xl sm:text-2xl md:text-3xl font-ibm text-terminal-green leading-tight'>
                Selected Work
              </h2>
              <p className='mt-3 max-w-3xl text-sm sm:text-base font-ibm text-text/85 leading-relaxed'>
                Real builds across web apps, automation, and AI tooling with clear outcomes and production-minded architecture.
              </p>
            </div>
            <Link
              href='/projects'
              className='hidden sm:inline-flex items-center border border-neon/30 px-3 py-2 font-ibm text-sm text-neon/80 transition-colors hover:border-neon/60 hover:text-neon'
            >
              View all projects
            </Link>
          </div>

          <ul className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5'>
            {featuredProjects.map((project) => (
              <li key={project.slug}>
                <article className='h-full border border-neon/20 bg-terminal-dark/20 p-4 sm:p-5'>
                  <h3 className='font-ibm text-lg text-terminal-green leading-snug'>
                    {project.title}
                  </h3>
                  <p className='mt-3 font-ibm text-sm leading-relaxed text-text/85 line-clamp-5'>
                    {project.description}
                  </p>
                  <Link
                    href={`/projects/${project.slug}`}
                    className='mt-4 inline-flex items-center font-ibm text-sm text-neon/80 underline decoration-neon/30 underline-offset-4 transition-colors hover:text-neon'
                  >
                    View case study
                  </Link>
                </article>
              </li>
            ))}
          </ul>

          <div className='mt-5 sm:hidden'>
            <Link
              href='/projects'
              className='inline-flex items-center border border-neon/30 px-3 py-2 font-ibm text-sm text-neon/80 transition-colors hover:border-neon/60 hover:text-neon'
            >
              View all projects
            </Link>
          </div>

          <div className='mt-8 mb-4 text-[10px] sm:text-xs tracking-[0.28em] text-neon/50 font-ocr uppercase'>
            Interactive project dossier
          </div>
          <ProjectCarousel />
        </div>

        <div className='mt-10 lg:mt-12 lg:ml-[calc(390px+2.5rem)] xl:ml-[calc(390px+3rem)] px-2 sm:px-4 md:px-0'>
          <WhyStephen />
        </div>

        <div className='mt-10 lg:mt-12 lg:ml-[calc(390px+2.5rem)] xl:ml-[calc(390px+3rem)] px-2 sm:px-4 md:px-0'>
          <About />
        </div>

        {/* Keep terminal accent after core narrative so first-time scans stay focused. */}
        <div className='mt-8 lg:ml-[calc(390px+2.5rem)] xl:ml-[calc(390px+3rem)] px-2 sm:px-4 md:px-0'>
          <TerminalLink />
        </div>
      </div>
    </section>
  );
}

export default memo(Hero);
