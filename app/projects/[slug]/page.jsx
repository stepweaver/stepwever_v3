'use client';

import { use } from 'react';
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
} from 'lucide-react';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage/OptimizedImage';
import ProjectSection from '@/components/ProjectDetail/ProjectSection';
import SectionList from '@/components/ProjectDetail/SectionList';
import BulletList from '@/components/ProjectDetail/BulletList';
import TechStackGrid from '@/components/ProjectDetail/TechStackGrid';
import TechStackCard from '@/components/ProjectDetail/TechStackCard';
import { Palette } from 'lucide-react';

// Lazy load heavy components
const BackgroundCanvas = dynamic(
  () => import('@/components/BackgroundCanvas/BackgroundCanvas'),
  { ssr: false }
);
const NeonProfileCard = dynamic(() =>
  import('@/components/NeonProfileCard/NeonProfileCard')
);

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
    <>
      <div className='relative'>
        <BackgroundCanvas />

        <div className='relative z-30 min-h-screen pb-12'>
          <div className='mx-auto px-4 sm:px-6 md:px-8 lg:px-8 xl:px-10 2xl:px-12 max-w-6xl'>
            {/* Back Navigation */}
            <div className='mb-8'>
              <Link
                href='/'
                className='inline-flex items-center text-neon font-ocr text-sm hover:text-accent transition-colors duration-200'
              >
                <ArrowLeft className='w-4 h-4 mr-2' />
                Back to Home
              </Link>
            </div>

            {/* Header */}
            <header className='mb-12 md:mb-16'>
              <div className='mb-6'>
                {project.isAgencySubcontract && (
                  <span className='text-sm md:text-base font-ocr text-neon uppercase tracking-wider block mb-4'>
                    Agency Subcontract Project
                  </span>
                )}
                <h1 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-4 leading-tight font-ibm text-neon'>
                  {project.title}
                </h1>
              </div>

              <p className='text-lg md:text-xl font-ocr text-text max-w-4xl leading-relaxed mb-8'>
                {project.description}
              </p>

              {/* Project Image */}
              {project.imageUrl && (
                <div className='mb-8 border border-neon/20 rounded-lg overflow-hidden card-glow'>
                  <OptimizedImage
                    src={project.imageUrl}
                    alt={project.title}
                    className='w-full h-auto'
                    loading='eager'
                    fetchPriority='high'
                  />
                </div>
              )}

              {/* External Link */}
              {project.link && (
                <div className='mb-8'>
                  <a
                    href={project.link}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center px-6 py-3 bg-neon/20 hover:bg-neon/30 border-2 border-neon rounded-lg text-neon font-ocr transition-colors duration-200'
                  >
                    <ExternalLink className='w-5 h-5 mr-2' />
                    View Live Project
                  </a>
                </div>
              )}

              {/* Tags */}
              {project.tags?.length > 0 && (
                <div className='flex flex-wrap gap-2 mb-8'>
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className='px-3 py-1 bg-panel/50 text-neon font-ocr text-sm border border-neon/20 rounded-lg'
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

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
                {project.projectStructure && (
                  <div className='mb-8'>
                    <h3 className='text-xl font-ibm text-neon mb-4'>
                      Architecture
                    </h3>
                    <div className='bg-panel/50 p-6 rounded-xl border border-neon/20 card-glow'>
                      <pre className='font-mono text-text text-xs sm:text-sm overflow-x-auto whitespace-pre-wrap'>
                        {project.projectStructure}
                      </pre>
                    </div>
                  </div>
                )}
                <TechStackGrid techStack={project.techStack} />
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
            <section className='text-center bg-panel/30 p-8 md:p-12 rounded-xl'>
              <h2 className='text-2xl md:text-3xl font-ibm text-neon mb-4'>
                Like what you see?
              </h2>
              <p className='font-ocr text-text text-base md:text-lg mb-8 max-w-2xl mx-auto'>
                Feel free to reach out if you have questions about this project
                or want to chat about working together.
              </p>
              <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
                <Link href='/contact'>
                  <button className='px-8 py-3 bg-neon/20 hover:bg-neon/30 border-2 border-neon rounded-lg text-neon font-ocr transition-colors duration-200 cursor-pointer'>
                    Get in Touch
                  </button>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
