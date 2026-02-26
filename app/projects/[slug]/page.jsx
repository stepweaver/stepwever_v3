'use client';

import { use, useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import { getProjectBySlug } from '@/lib/projectsData';
import {
  ArrowLeft,
  ExternalLink,
  CheckCircle,
  Code,
  Zap,
  Shield,
  FolderOpen,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage/OptimizedImage';
import ProjectSection from '@/components/ProjectDetail/ProjectSection';
import SectionList from '@/components/ProjectDetail/SectionList';
import BulletList from '@/components/ProjectDetail/BulletList';
import TechStackGrid from '@/components/ProjectDetail/TechStackGrid';
import TechStackCard from '@/components/ProjectDetail/TechStackCard';
import { Palette } from 'lucide-react';
import ErrorBoundary from '@/components/ErrorBoundary';

// Lazy load heavy components
const BackgroundCanvas = dynamic(
  () => import('@/components/BackgroundCanvas/BackgroundCanvas'),
  { ssr: false }
);
const NeonProfileCard = dynamic(() =>
  import('@/components/NeonProfileCard/NeonProfileCard')
);

function SidebarPanel({ children, label, className = '' }) {
  return (
    <div className={`hud-panel p-3 ${className}`}>
      {label && (
        <p className='font-ocr text-xs tracking-[0.25em] text-neon/45 uppercase mb-2'>
          {label}
        </p>
      )}
      {children}
    </div>
  );
}

function ProjectPageLayout({ project, slug, children }) {
  const [mobileBriefExpanded, setMobileBriefExpanded] = useState(false);
  const projId = `PROJ-${slug.toUpperCase().replace(/-/g, '').slice(0, 8)}`;

  // Hide site footer for full-screen console feel (like dice roller)
  useEffect(() => {
    const footer = document.querySelector('footer');
    if (footer) footer.style.display = 'none';
    return () => {
      if (footer) footer.style.display = '';
    };
  }, []);

  return (
    <ErrorBoundary>
      <div className='relative h-[calc(100vh-6rem)] flex flex-col overflow-hidden'>
        <BackgroundCanvas />

        <div className='relative z-10 flex flex-col h-full'>
          {/* ── System Header ── */}
          <header className='shrink-0 border-b border-neon/20 bg-panel/60 backdrop-blur-sm px-3 sm:px-5 py-2 flex items-center justify-between gap-4'>
            <div className='flex items-center gap-2.5'>
              <Link
                href='/'
                className='inline-flex items-center text-neon/70 hover:text-neon font-ocr text-xs transition-colors'
              >
                <ArrowLeft className='w-3.5 h-3.5 mr-1.5' />
                <span className='hidden sm:inline'>Back</span>
              </Link>
              <span className='text-neon/15 hidden sm:inline'>│</span>
              <FolderOpen className='w-3.5 h-3.5 text-neon/60' />
              <span className='font-ocr text-xs tracking-[0.3em] text-neon/50 uppercase'>
                {projId}
              </span>
              <span className='text-neon/15 hidden sm:inline'>│</span>
              <span className='font-ibm text-xs text-text/50 hidden sm:inline truncate max-w-[200px]'>
                {project.title}
              </span>
            </div>
            <div className='flex items-center gap-2.5'>
              <span className='inline-flex items-center gap-1.5'>
                <span className='relative flex h-2 w-2'>
                  <span className='absolute inline-flex h-full w-full rounded-full bg-neon opacity-40 motion-safe:animate-ping' />
                  <span className='relative inline-flex h-2 w-2 rounded-full bg-neon' />
                </span>
                <span className='font-ocr text-xs tracking-[0.15em] text-neon/60 uppercase'>
                  Loaded
                </span>
              </span>
            </div>
          </header>

          {/* ── Mobile expandable brief ── */}
          <div className='lg:hidden shrink-0 border-b border-neon/15'>
            <button
              onClick={() => setMobileBriefExpanded(!mobileBriefExpanded)}
              className='w-full px-3 py-2 flex items-center justify-between text-left hover:bg-panel/30 transition-colors cursor-pointer'
            >
              <div className='flex items-center gap-2'>
                <FolderOpen className='w-3 h-3 text-neon/50' />
                <span className='font-ocr text-xs tracking-[0.2em] text-neon/50 uppercase'>
                  Project brief
                </span>
              </div>
              <ChevronRight
                className={`w-3 h-3 text-neon/40 transition-transform duration-200 ${
                  mobileBriefExpanded ? 'rotate-90' : ''
                }`}
              />
            </button>

            {mobileBriefExpanded && (
              <div className='px-3 pb-3 space-y-3 motion-safe:animate-[hudFadeIn_0.15s_ease-out]'>
                <p className='font-ocr text-sm text-text/70 leading-relaxed'>
                  {project.description}
                </p>
                {project.tags?.length > 0 && (
                  <div className='flex flex-wrap gap-1.5'>
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className='px-2 py-0.5 font-ocr text-[10px] text-neon/70 border border-neon/20'
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center text-neon font-ocr text-xs hover:text-neon/80'
                  >
                    <ExternalLink className='w-3 h-3 mr-1.5' />
                    View Live
                  </a>
                )}
              </div>
            )}
          </div>

          {/* ── Main Console ── */}
          <div className='flex-1 flex flex-col lg:flex-row min-h-0'>
            {/* ── Sidebar: HUD Panels ── */}
            <aside className='hidden lg:flex lg:flex-col lg:w-72 2xl:w-80 shrink-0 border-r border-neon/15 overflow-y-auto'>
              <div className='p-3 space-y-3 flex-1'>
                <SidebarPanel label='SYS.BRIEF'>
                  <p className='font-ibm text-base text-text leading-snug'>
                    {project.title}
                  </p>
                  <p className='font-ocr text-sm text-text/50 leading-relaxed mt-2'>
                    {project.description}
                  </p>
                  <div className='mt-3 w-full h-px bg-gradient-to-r from-neon/30 via-neon/10 to-transparent' />
                </SidebarPanel>

                {project.link && (
                  <SidebarPanel label='LINK'>
                    <a
                      href={project.link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='inline-flex items-center text-neon font-ocr text-sm hover:text-neon/80 transition-colors'
                    >
                      <ExternalLink className='w-3.5 h-3.5 mr-2' />
                      View Live Project
                    </a>
                  </SidebarPanel>
                )}

                {project.tags?.length > 0 && (
                  <SidebarPanel label='TAGS'>
                    <div className='flex flex-wrap gap-1.5'>
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className='px-2 py-0.5 font-ocr text-[10px] text-neon/70 border border-neon/20'
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </SidebarPanel>
                )}

                {project.techStack && (
                  <SidebarPanel label='TECH'>
                    <div className='space-y-2'>
                      {Object.entries(project.techStack).map(([category, items]) => (
                        <div key={category}>
                          <span className='font-ocr text-[9px] text-neon/40 uppercase block mb-0.5'>
                            {category}
                          </span>
                          <ul className='font-ibm text-[11px] text-text/70 space-y-0.5'>
                            {(Array.isArray(items) ? items : []).map((item, i) => {
                              const name = typeof item === 'string' ? item.split(' - ')[0].trim() : item;
                              return (
                                <li key={i}>{name}</li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </SidebarPanel>
                )}
              </div>
            </aside>

            {/* ── Main Content ── */}
            <section className='flex-1 min-h-0 flex flex-col'>
              <div className='shrink-0 bg-panel/50 border-b border-neon/20 px-4 py-2 flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <FolderOpen className='w-3 h-3 text-neon/40' />
                  <span className='font-ocr text-xs tracking-[0.18em] text-neon/40 uppercase'>
                    Project detail
                  </span>
                </div>
                <span className='font-ocr text-xs text-text/20 hidden sm:inline'>
                  {projId}
                </span>
              </div>

              <div className='flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-4 md:p-6'>
                {children}
              </div>
            </section>
          </div>

          {/* ── Status Bar ── */}
          <footer className='shrink-0 border-t border-neon/20 bg-panel/60 backdrop-blur-sm px-3 sm:px-5 py-1.5 flex items-center gap-2 sm:gap-3 overflow-x-auto'>
            <span className='font-ocr text-xs text-neon/45 whitespace-nowrap'>
              &gt; {project.title}
            </span>
            <span className='text-neon/15'>│</span>
            <span className='font-ocr text-xs text-text/25 uppercase whitespace-nowrap'>
              {project.tags?.[0] || 'Project'}
            </span>
          </footer>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default function ProjectPage({ params }) {
  const { slug } = use(params);
  const project = getProjectBySlug(slug);
  const demoComponents = {
    'neon-profile-card': NeonProfileCard,
  };
  const DemoComponent = demoComponents[slug] || null;

  if (!project) {
    notFound();
  }

  // Merge security + securityFeatures into one array
  const securityItems = [
    ...(project.security || []),
    ...(project.securityFeatures || []),
  ];

  return (
    <ProjectPageLayout project={project} slug={slug}>
      <div className='max-w-4xl'>
        {/* Project Image - Hero */}
        {project.imageUrl && (
          <div className='relative mb-8 border border-neon/20 overflow-hidden aspect-video'>
            <OptimizedImage
              src={project.imageUrl}
              alt={project.title}
              className='object-cover object-top'
              priority
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 900px'
            />
          </div>
        )}

        {project.isAgencySubcontract && (
          <span className='text-sm font-ocr text-neon uppercase tracking-wider block mb-4'>
            Agency Subcontract Project
          </span>
        )}

            {/* The Problem */}
            {project.problem && (
              <ProjectSection title='The Problem'>
                <p className='font-ocr text-text text-base md:text-lg leading-relaxed'>
                  {project.problem}
                </p>
              </ProjectSection>
            )}

            {/* My Role */}
            {project.role && (
              <ProjectSection title='My Role'>
                <p className='font-ocr text-text text-base md:text-lg leading-relaxed'>
                  {project.role}
                </p>
              </ProjectSection>
            )}

            {/* The Solution */}
            {(project.solution || project.features) && (
              <ProjectSection title='The Solution'>
                {project.solution && (
                  <p className='font-ocr text-text text-base md:text-lg leading-relaxed mb-6'>
                    {project.solution}
                  </p>
                )}
                <SectionList items={project.features} icon={CheckCircle} />
              </ProjectSection>
            )}

            {/* The Tech */}
            {project.techStack && (
              <ProjectSection title='The Tech'>
                <div className={project.projectStructure ? 'mb-8' : ''}>
                  <TechStackGrid techStack={project.techStack} />
                </div>
                {project.projectStructure && (
                  <div>
                    <h3 className='font-ocr text-xs tracking-[0.15em] text-neon/50 uppercase mb-3'>
                      Architecture
                    </h3>
                    <div className='bg-panel/50 p-6 border border-neon/20 overflow-hidden'>
                      <pre className='font-mono text-text text-xs sm:text-sm overflow-x-auto whitespace-pre-wrap'>
                        {project.projectStructure}
                      </pre>
                    </div>
                  </div>
                )}
              </ProjectSection>
            )}

            {/* The Outcome */}
            {project.outcome?.length > 0 && (
              <ProjectSection title='The Outcome'>
                <SectionList items={project.outcome} icon={CheckCircle} />
              </ProjectSection>
            )}

            {/* Live Demo */}
            {DemoComponent && (
              <ProjectSection title='Live Neon Profile Card Demo'>
                <div className='grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center'>
                  <div className='flex justify-center'>
                    <DemoComponent />
                  </div>
                  <div className='space-y-6 border border-neon/20 rounded-lg bg-panel/50 p-6 card-glow'>
                    <p className='font-ocr text-text text-base leading-relaxed'>
                      This component brings the NETRUNNER challenge card into
                      our CRT palette. Built as a React component with
                      client-side state management for the automated Matrix Sync
                      terminal sequence. Styling uses Tailwind CSS utilities for
                      glow, glass effects, and responsive stacking.
                    </p>
                    <SectionList
                      items={project.demoHighlights}
                      icon={CheckCircle}
                    />
                    <p className='text-sm font-ocr text-text/70'>
                      Inspired by the Neon Profile Card brief from Codenhack,
                      adapted to reuse our IBM headers, OCR body copy, and
                      BackgroundCanvas lighting.
                    </p>
                  </div>
                </div>
              </ProjectSection>
            )}

            {/* Content Management */}
            {project.contentManagement && (
              <ProjectSection
                title={
                  project.contentManagement.notionIntegration
                    ? 'Content Management with Notion'
                    : 'Content Management with Sanity'
                }
              >
                {project.contentManagement.notionIntegration && (
                  <div className='mb-8'>
                    <h3 className='text-xl font-ibm text-neon mb-4'>
                      Notion Integration
                    </h3>
                    <BulletList
                      items={project.contentManagement.notionIntegration}
                    />
                  </div>
                )}
                {project.contentManagement.productSchema && (
                  <div className='mb-8'>
                    <h3 className='text-xl font-ibm text-neon mb-4'>
                      Product Schema
                    </h3>
                    <p className='font-ocr text-text mb-4'>
                      The project includes a comprehensive product schema with
                      the following fields:
                    </p>
                    <BulletList
                      items={project.contentManagement.productSchema}
                    />
                  </div>
                )}
                {project.contentManagement.contentTypes && (
                  <div className='mb-8'>
                    <h3 className='text-xl font-ibm text-neon mb-4'>
                      Content Types
                    </h3>
                    {project.contentManagement.contentTypes.map(
                      (type, index) => (
                        <div
                          key={index}
                          className='mb-6 bg-panel/50 p-6 rounded-xl border border-neon/20 card-glow'
                        >
                          <h4 className='font-ibm text-neon mb-3'>
                            {type.name}
                          </h4>
                          {type.features ? (
                            <BulletList items={type.features} />
                          ) : (
                            <p className='font-ocr text-text text-sm'>
                              {type.description}
                            </p>
                          )}
                        </div>
                      )
                    )}
                  </div>
                )}
                {project.contentManagement.studioFeatures && (
                  <div>
                    <h3 className='text-xl font-ibm text-neon mb-4'>
                      Sanity Studio Features
                    </h3>
                    <BulletList
                      items={project.contentManagement.studioFeatures}
                    />
                  </div>
                )}
              </ProjectSection>
            )}

            {/* E-commerce Features */}
            {project.ecommerceFeatures && (
              <ProjectSection title='E-commerce Features'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                  {[
                    {
                      key: 'shoppingCart',
                      label: 'Shopping Cart',
                    },
                    {
                      key: 'checkout',
                      label: 'Checkout Process',
                    },
                    {
                      key: 'productManagement',
                      label: 'Product Management',
                    },
                  ]
                    .filter((s) => project.ecommerceFeatures[s.key])
                    .map((s) => (
                      <div
                        key={s.key}
                        className='bg-panel/50 p-6 border border-neon/20 rounded-lg card-glow'
                      >
                        <h3 className='text-lg font-ibm text-neon mb-4'>
                          {s.label}
                        </h3>
                        <BulletList
                          items={project.ecommerceFeatures[s.key]}
                          className='ml-0'
                        />
                      </div>
                    ))}
                </div>
              </ProjectSection>
            )}

            {/* Design System */}
            {project.designSystem && (
              <ProjectSection title='Design System'>
                {project.designSystem.components ? (
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                    <TechStackCard
                      icon={Palette}
                      title='Components'
                      items={project.designSystem.components}
                    />
                    <TechStackCard
                      icon={Palette}
                      title='Styling'
                      items={project.designSystem.styling}
                    />
                  </div>
                ) : (
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                    {['typography', 'colors', 'symbols']
                      .filter((key) => project.designSystem[key])
                      .map((key) => (
                        <TechStackCard
                          key={key}
                          icon={Palette}
                          title={key.charAt(0).toUpperCase() + key.slice(1)}
                          items={project.designSystem[key]}
                        />
                      ))}
                  </div>
                )}
              </ProjectSection>
            )}

            {/* API Routes */}
            {project.apiRoutes?.length > 0 && (
              <ProjectSection title='API Routes'>
                <SectionList items={project.apiRoutes} icon={Code} />
              </ProjectSection>
            )}

            {/* Performance */}
            {project.performance?.length > 0 && (
              <ProjectSection title='Performance'>
                <SectionList items={project.performance} icon={Zap} />
              </ProjectSection>
            )}

            {/* YouTube Integration */}
            {project.youtubeIntegration && (
              <ProjectSection title='YouTube Integration'>
                {project.youtubeIntegration.description && (
                  <p className='font-ocr text-text text-base md:text-lg mb-6 leading-relaxed'>
                    {project.youtubeIntegration.description}
                  </p>
                )}
                {project.youtubeIntegration.features && (
                  <div className='mb-6'>
                    <h3 className='text-xl font-ibm text-neon mb-4'>
                      Features
                    </h3>
                    <BulletList items={project.youtubeIntegration.features} />
                  </div>
                )}
                {project.youtubeIntegration.workflow && (
                  <div className='mb-6'>
                    <h3 className='text-xl font-ibm text-neon mb-4'>
                      Workflow
                    </h3>
                    <BulletList items={project.youtubeIntegration.workflow} />
                  </div>
                )}
              </ProjectSection>
            )}

            {/* Security */}
            {securityItems.length > 0 && (
              <ProjectSection title='Security'>
                <SectionList items={securityItems} icon={Shield} />
              </ProjectSection>
            )}

            {/* Terminal Integration */}
            {project.terminalIntegration && (
              <ProjectSection title='Terminal Integration'>
                <p className='font-ocr text-text text-base md:text-lg mb-6 leading-relaxed'>
                  {project.terminalIntegration.description}
                </p>
                {project.terminalIntegration.usage && (
                  <div className='mb-6'>
                    <h3 className='text-xl font-ibm text-neon mb-4'>Usage</h3>
                    <BulletList items={project.terminalIntegration.usage} />
                  </div>
                )}
                {project.terminalIntegration.example && (
                  <div className='bg-panel/50 p-6 rounded-xl border border-neon/20 card-glow'>
                    <pre className='font-mono text-neon text-sm overflow-x-auto whitespace-pre-wrap'>
                      {project.terminalIntegration.example}
                    </pre>
                  </div>
                )}
              </ProjectSection>
            )}

            {/* Keyboard Shortcuts */}
            {project.keyboardShortcuts?.length > 0 && (
              <ProjectSection title='Keyboard Shortcuts'>
                <SectionList items={project.keyboardShortcuts} icon={Code} />
              </ProjectSection>
            )}

            {/* Dice Notation */}
            {project.diceNotation?.length > 0 && (
              <ProjectSection title='Dice Notation'>
                <p className='font-ocr text-text text-base md:text-lg mb-6 leading-relaxed'>
                  The dice roller uses standard RPG dice notation:
                </p>
                <SectionList
                  items={project.diceNotation}
                  icon={Code}
                  fontClass='font-mono'
                />
              </ProjectSection>
            )}

            {/* Planned Features */}
            {project.plannedFeatures?.length > 0 && (
              <ProjectSection title='Planned Features'>
                <SectionList items={project.plannedFeatures} icon={Zap} />
              </ProjectSection>
            )}

            {/* Demo Forms */}
            {project.demoForms?.length > 0 && (
              <ProjectSection title='Demo Forms'>
                <p className='font-ocr text-text text-base md:text-lg mb-6 leading-relaxed'>
                  The website includes three fully functional demo forms:
                </p>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
                  {project.demoForms.map((form, index) => (
                    <div
                      key={index}
                      className='bg-panel/50 p-6 rounded-xl border border-neon/20 card-glow'
                    >
                      <h3 className='text-lg font-ibm text-neon mb-2'>
                        {form.name}
                      </h3>
                      <p className='font-ocr text-text text-sm'>
                        {form.description}
                      </p>
                    </div>
                  ))}
                </div>
                <SectionList items={project.formFeatures} icon={CheckCircle} />
              </ProjectSection>
            )}

            {/* Benefits (Services) */}
            {project.isService && project.benefits?.length > 0 && (
              <ProjectSection title='Benefits'>
                <SectionList items={project.benefits} icon={CheckCircle} />
              </ProjectSection>
            )}

            {/* Process (Services) */}
            {project.isService && project.process?.length > 0 && (
              <ProjectSection title='Process'>
                <div className='space-y-4'>
                  {project.process.map((step, index) => (
                    <div
                      key={index}
                      className='bg-panel/50 p-6 rounded-xl border border-neon/20 card-glow'
                    >
                      <div className='flex items-start gap-4'>
                        <div className='flex-shrink-0 w-8 h-8 bg-neon text-background font-ibm font-bold rounded-full flex items-center justify-center'>
                          {index + 1}
                        </div>
                        <p className='flex-1 font-ocr text-text text-base leading-relaxed'>
                          {step}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ProjectSection>
            )}

            {/* Common Use Cases (Services) */}
            {project.isService && project.commonUseCases?.length > 0 && (
              <ProjectSection title='Common Use Cases'>
                <SectionList items={project.commonUseCases} icon={Zap} />
              </ProjectSection>
            )}

            {/* Use Cases (Services) */}
            {project.isService && project.useCases?.length > 0 && (
              <ProjectSection title='Use Cases'>
                <SectionList items={project.useCases} icon={Zap} />
              </ProjectSection>
            )}

            {/* Services Included (Services) */}
            {project.isService && project.services?.length > 0 && (
              <ProjectSection title='Services Included'>
                <SectionList items={project.services} icon={CheckCircle} />
              </ProjectSection>
            )}

            {/* CTA Section */}
            <section className='text-center hud-panel p-8 md:p-12'>
              <h2 className='text-xl md:text-2xl font-ibm text-neon mb-4'>
                Like what you see?
              </h2>
              <p className='font-ocr text-text text-sm md:text-base mb-6 max-w-2xl mx-auto'>
                Feel free to reach out if you have questions about this project
                or want to chat about working together.
              </p>
              <Link href='/contact'>
                <button className='px-6 py-2.5 border border-neon text-neon font-ocr text-sm hover:bg-neon/10 transition-colors cursor-pointer'>
                  Get in Touch
                </button>
              </Link>
            </section>
      </div>
    </ProjectPageLayout>
  );
}
