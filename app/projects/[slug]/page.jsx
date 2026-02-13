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
  Server,
  CreditCard,
  Palette,
  Zap,
  Shield,
} from 'lucide-react';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage/OptimizedImage';

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

  return (
    <>
      <div className='relative'>
        <BackgroundCanvas />

        <main className='relative z-30 min-h-screen pt-20 pb-12'>
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
                {project.isAgencySubcontract ? (
                  <div className='mb-4'>
                    <span className='text-sm md:text-base font-ocr text-neon uppercase tracking-wider'>
                      Agency Subcontract Project
                    </span>
                    <h1 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-4 leading-tight font-ibm text-neon'>
                      {project.title}
                    </h1>
                  </div>
                ) : (
                  <h1 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-4 leading-tight font-ibm text-neon'>
                    {project.title}
                  </h1>
                )}
              </div>

              <p className='text-lg md:text-xl font-ocr text-text max-w-4xl leading-relaxed mb-8'>
                {project.description}
              </p>

              {/* Project Image - 16:9 aspect ratio */}
              {project.imageUrl && (
                <div className='mb-8 border border-neon/20 rounded-lg overflow-hidden aspect-video card-glow'>
                  <OptimizedImage
                    src={project.imageUrl}
                    alt={project.title}
                    className='w-full h-full object-cover object-top'
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
              {project.tags && project.tags.length > 0 && (
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

            {/* The Problem Section */}
            {project.problem && (
              <section className='mb-16'>
                <h2 className='text-2xl md:text-3xl lg:text-4xl font-ibm text-neon mb-6'>
                  The Problem
                </h2>
                <div className='h-0.5 bg-neon mb-8'></div>
                <p className='font-ocr text-text text-base md:text-lg leading-relaxed'>
                  {project.problem}
                </p>
              </section>
            )}

            {/* My Role Section */}
            {project.role && (
              <section className='mb-16'>
                <h2 className='text-2xl md:text-3xl lg:text-4xl font-ibm text-neon mb-6'>
                  My Role
                </h2>
                <div className='h-0.5 bg-neon mb-8'></div>
                <p className='font-ocr text-text text-base md:text-lg leading-relaxed'>
                  {project.role}
                </p>
              </section>
            )}

            {/* The Solution Section */}
            {(project.solution || project.features) && (
              <section className='mb-16'>
                <h2 className='text-2xl md:text-3xl lg:text-4xl font-ibm text-neon mb-6'>
                  The Solution
                </h2>
                <div className='h-0.5 bg-neon mb-8'></div>
                {project.solution && (
                  <p className='font-ocr text-text text-base md:text-lg leading-relaxed mb-6'>
                    {project.solution}
                  </p>
                )}
                {project.features && project.features.length > 0 && (
                  <ul className='space-y-4'>
                    {project.features.map((feature, index) => (
                      <li key={index} className='flex items-start'>
                        <CheckCircle className='w-5 h-5 text-neon shrink-0 mt-0.5 mr-3' />
                        <span className='font-ocr text-text text-base md:text-lg leading-relaxed'>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            )}

            {/* The Tech Section */}
            {project.techStack && (
              <section className='mb-16'>
                <h2 className='text-2xl md:text-3xl lg:text-4xl font-ibm text-neon mb-6'>
                  The Tech
                </h2>
                <div className='h-0.5 bg-neon mb-8'></div>
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
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                  {project.techStack.frontend && (
                    <div className='bg-panel/50 p-6 border border-neon/20 rounded-lg card-glow'>
                      <div className='flex items-center mb-4'>
                        <Code className='w-6 h-6 text-neon mr-3' />
                        <h3 className='text-xl font-ibm text-neon'>
                          Frontend
                        </h3>
                      </div>
                      <ul className='space-y-2'>
                        {project.techStack.frontend.map((tech, index) => (
                          <li
                            key={index}
                            className='font-ocr text-text text-sm'
                          >
                            • {tech}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {project.techStack.backend && (
                    <div className='bg-panel/50 p-6 border border-neon/20 rounded-lg card-glow'>
                      <div className='flex items-center mb-4'>
                        <Server className='w-6 h-6 text-neon mr-3' />
                        <h3 className='text-xl font-ibm text-neon'>
                          Backend & CMS
                        </h3>
                      </div>
                      <ul className='space-y-2'>
                        {project.techStack.backend.map((tech, index) => (
                          <li
                            key={index}
                            className='font-ocr text-text text-sm'
                          >
                            • {tech}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {project.techStack.payment && (
                    <div className='bg-panel/50 p-6 border border-neon/20 rounded-lg card-glow'>
                      <div className='flex items-center mb-4'>
                        <CreditCard className='w-6 h-6 text-neon mr-3' />
                        <h3 className='text-xl font-ibm text-neon'>
                          Payment & E-commerce
                        </h3>
                      </div>
                      <ul className='space-y-2'>
                        {project.techStack.payment.map((tech, index) => (
                          <li
                            key={index}
                            className='font-ocr text-text text-sm'
                          >
                            • {tech}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {project.techStack.development && (
                    <div className='bg-panel/50 p-6 border border-neon/20 rounded-lg card-glow'>
                      <div className='flex items-center mb-4'>
                        <Zap className='w-6 h-6 text-neon mr-3' />
                        <h3 className='text-xl font-ibm text-neon'>
                          Development Tools
                        </h3>
                      </div>
                      <ul className='space-y-2'>
                        {project.techStack.development.map((tech, index) => (
                          <li
                            key={index}
                            className='font-ocr text-text text-sm'
                          >
                            • {tech}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {project.techStack.consulting && (
                    <div className='bg-panel/50 p-6 border border-neon/20 rounded-lg card-glow'>
                      <div className='flex items-center mb-4'>
                        <Server className='w-6 h-6 text-neon mr-3' />
                        <h3 className='text-xl font-ibm text-neon'>
                          Consulting Services
                        </h3>
                      </div>
                      <ul className='space-y-2'>
                        {project.techStack.consulting.map((tech, index) => (
                          <li
                            key={index}
                            className='font-ocr text-text text-sm'
                          >
                            • {tech}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {project.techStack.automation && (
                    <div className='bg-panel/50 p-6 border border-neon/20 rounded-lg card-glow'>
                      <div className='flex items-center mb-4'>
                        <Zap className='w-6 h-6 text-neon mr-3' />
                        <h3 className='text-xl font-ibm text-neon'>
                          Automation Tools
                        </h3>
                      </div>
                      <ul className='space-y-2'>
                        {project.techStack.automation.map((tech, index) => (
                          <li
                            key={index}
                            className='font-ocr text-text text-sm'
                          >
                            • {tech}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {project.techStack.ai && (
                    <div className='bg-panel/50 p-6 border border-neon/20 rounded-lg card-glow'>
                      <div className='flex items-center mb-4'>
                        <Code className='w-6 h-6 text-neon mr-3' />
                        <h3 className='text-xl font-ibm text-neon'>
                          AI & Machine Learning
                        </h3>
                      </div>
                      <ul className='space-y-2'>
                        {project.techStack.ai.map((tech, index) => (
                          <li
                            key={index}
                            className='font-ocr text-text text-sm'
                          >
                            • {tech}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {project.techStack.analytics && (
                    <div className='bg-panel/50 p-6 border border-neon/20 rounded-lg card-glow'>
                      <div className='flex items-center mb-4'>
                        <Code className='w-6 h-6 text-neon mr-3' />
                        <h3 className='text-xl font-ibm text-neon'>
                          Analytics Tools
                        </h3>
                      </div>
                      <ul className='space-y-2'>
                        {project.techStack.analytics.map((tech, index) => (
                          <li
                            key={index}
                            className='font-ocr text-text text-sm'
                          >
                            • {tech}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {project.techStack.contentManagement && (
                    <div className='bg-panel/50 p-6 border border-neon/20 rounded-lg card-glow'>
                      <div className='flex items-center mb-4'>
                        <Server className='w-6 h-6 text-neon mr-3' />
                        <h3 className='text-xl font-ibm text-neon'>
                          Content Management
                        </h3>
                      </div>
                      <ul className='space-y-2'>
                        {project.techStack.contentManagement.map(
                          (tech, index) => (
                            <li
                              key={index}
                              className='font-ocr text-text text-sm'
                            >
                              • {tech}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                  {project.techStack.contentAggregation && (
                    <div className='bg-panel/50 p-6 border border-neon/20 rounded-lg card-glow'>
                      <div className='flex items-center mb-4'>
                        <Code className='w-6 h-6 text-neon mr-3' />
                        <h3 className='text-xl font-ibm text-neon'>
                          Content Aggregation
                        </h3>
                      </div>
                      <ul className='space-y-2'>
                        {project.techStack.contentAggregation.map(
                          (tech, index) => (
                            <li
                              key={index}
                              className='font-ocr text-text text-sm'
                            >
                              • {tech}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                  {project.techStack.utilities && (
                    <div className='bg-panel/50 p-6 border border-neon/20 rounded-lg card-glow'>
                      <div className='flex items-center mb-4'>
                        <Code className='w-6 h-6 text-neon mr-3' />
                        <h3 className='text-xl font-ibm text-neon'>
                          Utilities
                        </h3>
                      </div>
                      <ul className='space-y-2'>
                        {project.techStack.utilities.map((tech, index) => (
                          <li
                            key={index}
                            className='font-ocr text-text text-sm'
                          >
                            • {tech}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {project.techStack.design && (
                    <div className='bg-panel/50 p-6 border border-neon/20 rounded-lg card-glow'>
                      <div className='flex items-center mb-4'>
                        <Palette className='w-6 h-6 text-neon mr-3' />
                        <h3 className='text-xl font-ibm text-neon'>
                          Design
                        </h3>
                      </div>
                      <ul className='space-y-2'>
                        {project.techStack.design.map((tech, index) => (
                          <li
                            key={index}
                            className='font-ocr text-text text-sm'
                          >
                            • {tech}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* The Outcome Section */}
            {project.outcome && project.outcome.length > 0 && (
              <section className='mb-16'>
                <h2 className='text-2xl md:text-3xl lg:text-4xl font-ibm text-neon mb-6'>
                  The Outcome
                </h2>
                <div className='h-0.5 bg-neon mb-8'></div>
                <ul className='space-y-3'>
                  {project.outcome.map((item, index) => (
                    <li key={index} className='flex items-start'>
                      <CheckCircle className='w-5 h-5 text-neon shrink-0 mt-0.5 mr-3' />
                      <span className='font-ocr text-text text-base leading-relaxed'>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {DemoComponent && (
              <section className='mb-16'>
                <h2 className='text-2xl md:text-3xl lg:text-4xl font-ibm text-neon mb-6'>
                  Live Neon Profile Card Demo
                </h2>
                <div className='h-0.5 bg-neon mb-8'></div>
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
                    {project.demoHighlights && (
                      <ul className='space-y-3'>
                        {project.demoHighlights.map((highlight, index) => (
                          <li key={index} className='flex items-start'>
                            <CheckCircle className='mr-3 mt-0.5 h-5 w-5 text-neon' />
                            <span className='font-ocr text-text text-sm leading-relaxed'>
                              {highlight}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <p className='text-sm font-ocr text-text/70'>
                      Inspired by the Neon Profile Card brief from Codenhack,
                      adapted to reuse our IBM headers, OCR body copy, and
                      BackgroundCanvas lighting.
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* Content Management */}
            {project.contentManagement && (
              <section className='mb-16'>
                <h2 className='text-2xl md:text-3xl lg:text-4xl font-ibm text-neon mb-6'>
                  {project.contentManagement.notionIntegration
                    ? 'Content Management with Notion'
                    : 'Content Management with Sanity'}
                </h2>
                <div className='h-0.5 bg-neon mb-8'></div>
                {project.contentManagement.notionIntegration && (
                  <div className='mb-8'>
                    <h3 className='text-xl font-ibm text-neon mb-4'>
                      Notion Integration
                    </h3>
                    <ul className='space-y-2 ml-6'>
                      {project.contentManagement.notionIntegration.map(
                        (feature, index) => (
                          <li
                            key={index}
                            className='font-ocr text-text text-sm'
                          >
                            • {feature}
                          </li>
                        )
                      )}
                    </ul>
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
                    <ul className='space-y-2 ml-6'>
                      {project.contentManagement.productSchema.map(
                        (field, index) => (
                          <li
                            key={index}
                            className='font-ocr text-text text-sm'
                          >
                            • {field}
                          </li>
                        )
                      )}
                    </ul>
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
                            <ul className='space-y-2 ml-6'>
                              {type.features.map((feature, featIndex) => (
                                <li
                                  key={featIndex}
                                  className='font-ocr text-text text-sm'
                                >
                                  • {feature}
                                </li>
                              ))}
                            </ul>
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
                    <ul className='space-y-2 ml-6'>
                      {project.contentManagement.studioFeatures.map(
                        (feature, index) => (
                          <li
                            key={index}
                            className='font-ocr text-text text-sm'
                          >
                            • {feature}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
              </section>
            )}

            {/* E-commerce Features */}
            {project.ecommerceFeatures && (
              <section className='mb-16'>
                <h2 className='text-2xl md:text-3xl lg:text-4xl font-ibm text-neon mb-6'>
                  E-commerce Features
                </h2>
                <div className='h-0.5 bg-neon mb-8'></div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                  {project.ecommerceFeatures.shoppingCart && (
                    <div className='bg-panel/50 p-6 border border-neon/20 rounded-lg card-glow'>
                      <h3 className='text-lg font-ibm text-neon mb-4'>
                        Shopping Cart
                      </h3>
                      <ul className='space-y-2'>
                        {project.ecommerceFeatures.shoppingCart.map(
                          (feature, index) => (
                            <li
                              key={index}
                              className='font-ocr text-text text-sm'
                            >
                              • {feature}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                  {project.ecommerceFeatures.checkout && (
                    <div className='bg-panel/50 p-6 border border-neon/20 rounded-lg card-glow'>
                      <h3 className='text-lg font-ibm text-neon mb-4'>
                        Checkout Process
                      </h3>
                      <ul className='space-y-2'>
                        {project.ecommerceFeatures.checkout.map(
                          (feature, index) => (
                            <li
                              key={index}
                              className='font-ocr text-text text-sm'
                            >
                              • {feature}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                  {project.ecommerceFeatures.productManagement && (
                    <div className='bg-panel/50 p-6 border border-neon/20 rounded-lg card-glow'>
                      <h3 className='text-lg font-ibm text-neon mb-4'>
                        Product Management
                      </h3>
                      <ul className='space-y-2'>
                        {project.ecommerceFeatures.productManagement.map(
                          (feature, index) => (
                            <li
                              key={index}
                              className='font-ocr text-text text-sm'
                            >
                              • {feature}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Design System */}
            {project.designSystem && (
              <section className='mb-16'>
                <h2 className='text-2xl md:text-3xl lg:text-4xl font-ibm text-neon mb-6'>
                  Design System
                </h2>
                <div className='h-0.5 bg-neon mb-8'></div>
                {project.designSystem.components ? (
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                    <div className='bg-panel/50 p-6 rounded-xl border border-neon/20 card-glow'>
                      <div className='flex items-center mb-4'>
                        <Palette className='w-6 h-6 text-neon mr-3' />
                        <h3 className='text-xl font-ibm text-neon'>
                          Components
                        </h3>
                      </div>
                      <ul className='space-y-2'>
                        {project.designSystem.components.map(
                          (component, index) => (
                            <li
                              key={index}
                              className='font-ocr text-text text-sm'
                            >
                              • {component}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                    <div className='bg-panel/50 p-6 rounded-xl border border-neon/20 card-glow'>
                      <div className='flex items-center mb-4'>
                        <Palette className='w-6 h-6 text-neon mr-3' />
                        <h3 className='text-xl font-ibm text-neon'>
                          Styling
                        </h3>
                      </div>
                      <ul className='space-y-2'>
                        {project.designSystem.styling.map((style, index) => (
                          <li
                            key={index}
                            className='font-ocr text-text text-sm'
                          >
                            • {style}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                    {project.designSystem.typography && (
                      <div className='bg-panel/50 p-6 rounded-xl border border-neon/20 card-glow'>
                        <div className='flex items-center mb-4'>
                          <Palette className='w-6 h-6 text-neon mr-3' />
                          <h3 className='text-xl font-ibm text-neon'>
                            Typography
                          </h3>
                        </div>
                        <ul className='space-y-2'>
                          {project.designSystem.typography.map(
                            (item, index) => (
                              <li
                                key={index}
                                className='font-ocr text-text text-sm'
                              >
                                • {item}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                    {project.designSystem.colors && (
                      <div className='bg-panel/50 p-6 rounded-xl border border-neon/20 card-glow'>
                        <div className='flex items-center mb-4'>
                          <Palette className='w-6 h-6 text-neon mr-3' />
                          <h3 className='text-xl font-ibm text-neon'>
                            Colors
                          </h3>
                        </div>
                        <ul className='space-y-2'>
                          {project.designSystem.colors.map((item, index) => (
                            <li
                              key={index}
                              className='font-ocr text-text text-sm'
                            >
                              • {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {project.designSystem.symbols && (
                      <div className='bg-panel/50 p-6 rounded-xl border border-neon/20 card-glow'>
                        <div className='flex items-center mb-4'>
                          <Palette className='w-6 h-6 text-neon mr-3' />
                          <h3 className='text-xl font-ibm text-neon'>
                            Symbols
                          </h3>
                        </div>
                        <ul className='space-y-2'>
                          {project.designSystem.symbols.map((item, index) => (
                            <li
                              key={index}
                              className='font-ocr text-text text-sm'
                            >
                              • {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </section>
            )}

            {/* API Routes */}
            {project.apiRoutes && project.apiRoutes.length > 0 && (
              <section className='mb-16'>
                <h2 className='text-2xl md:text-3xl lg:text-4xl font-ibm text-neon mb-6'>
                  API Routes
                </h2>
                <div className='h-0.5 bg-neon mb-8'></div>
                <ul className='space-y-3'>
                  {project.apiRoutes.map((route, index) => (
                    <li key={index} className='flex items-start'>
                      <Code className='w-5 h-5 text-neon shrink-0 mt-0.5 mr-3' />
                      <span className='font-ocr text-text text-base leading-relaxed'>
                        {route}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Performance */}
            {project.performance && project.performance.length > 0 && (
              <section className='mb-16'>
                <h2 className='text-2xl md:text-3xl lg:text-4xl font-ibm text-neon mb-6'>
                  Performance
                </h2>
                <div className='h-0.5 bg-neon mb-8'></div>
                <ul className='space-y-3'>
                  {project.performance.map((item, index) => (
                    <li key={index} className='flex items-start'>
                      <Zap className='w-5 h-5 text-neon shrink-0 mt-0.5 mr-3' />
                      <span className='font-ocr text-text text-base leading-relaxed'>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* YouTube Integration */}
            {project.youtubeIntegration && (
              <section className='mb-16'>
                <h2 className='text-2xl md:text-3xl lg:text-4xl font-ibm text-neon mb-6'>
                  YouTube Integration
                </h2>
                <div className='h-0.5 bg-neon mb-8'></div>
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
                    <ul className='space-y-2 ml-6'>
                      {project.youtubeIntegration.features.map(
                        (feature, index) => (
                          <li
                            key={index}
                            className='font-ocr text-text text-sm'
                          >
                            • {feature}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
                {project.youtubeIntegration.workflow && (
                  <div className='mb-6'>
                    <h3 className='text-xl font-ibm text-neon mb-4'>
                      Workflow
                    </h3>
                    <ul className='space-y-2 ml-6'>
                      {project.youtubeIntegration.workflow.map(
                        (step, index) => (
                          <li
                            key={index}
                            className='font-ocr text-text text-sm'
                          >
                            {step}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
              </section>
            )}

            {/* Security */}
            {(project.security && project.security.length > 0) ||
            (project.securityFeatures &&
              project.securityFeatures.length > 0) ? (
              <section className='mb-16'>
                <h2 className='text-2xl md:text-3xl lg:text-4xl font-ibm text-neon mb-6'>
                  Security
                </h2>
                <div className='h-0.5 bg-neon mb-8'></div>
                <ul className='space-y-3'>
                  {project.security &&
                    project.security.map((item, index) => (
                      <li key={index} className='flex items-start'>
                        <Shield className='w-5 h-5 text-neon shrink-0 mt-0.5 mr-3' />
                        <span className='font-ocr text-text text-base leading-relaxed'>
                          {item}
                        </span>
                      </li>
                    ))}
                  {project.securityFeatures &&
                    project.securityFeatures.map((item, index) => (
                      <li
                        key={`security-${index}`}
                        className='flex items-start'
                      >
                        <Shield className='w-5 h-5 text-neon shrink-0 mt-0.5 mr-3' />
                        <span className='font-ocr text-text text-base leading-relaxed'>
                          {item}
                        </span>
                      </li>
                    ))}
                </ul>
              </section>
            ) : null}

            {/* Terminal Integration */}
            {project.terminalIntegration && (
              <section className='mb-16'>
                <h2 className='text-2xl md:text-3xl lg:text-4xl font-ibm text-neon mb-6'>
                  Terminal Integration
                </h2>
                <div className='h-0.5 bg-neon mb-8'></div>
                <p className='font-ocr text-text text-base md:text-lg mb-6 leading-relaxed'>
                  {project.terminalIntegration.description}
                </p>
                {project.terminalIntegration.usage && (
                  <div className='mb-6'>
                    <h3 className='text-xl font-ibm text-neon mb-4'>
                      Usage
                    </h3>
                    <ul className='space-y-2 ml-6'>
                      {project.terminalIntegration.usage.map((usage, index) => (
                        <li
                          key={index}
                          className='font-ocr text-text text-sm'
                        >
                          • {usage}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {project.terminalIntegration.example && (
                  <div className='bg-panel/50 p-6 rounded-xl border border-neon/20 card-glow'>
                    <pre className='font-mono text-neon text-sm overflow-x-auto whitespace-pre-wrap'>
                      {project.terminalIntegration.example}
                    </pre>
                  </div>
                )}
              </section>
            )}

            {/* Keyboard Shortcuts */}
            {project.keyboardShortcuts &&
              project.keyboardShortcuts.length > 0 && (
                <section className='mb-16'>
                  <h2 className='text-2xl md:text-3xl lg:text-4xl font-ibm text-neon mb-6'>
                    Keyboard Shortcuts
                  </h2>
                  <div className='h-0.5 bg-neon mb-8'></div>
                  <ul className='space-y-3'>
                    {project.keyboardShortcuts.map((shortcut, index) => (
                      <li key={index} className='flex items-start'>
                        <Code className='w-5 h-5 text-neon shrink-0 mt-0.5 mr-3' />
                        <span className='font-ocr text-text text-base leading-relaxed'>
                          {shortcut}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

            {/* Dice Notation */}
            {project.diceNotation && project.diceNotation.length > 0 && (
              <section className='mb-16'>
                <h2 className='text-2xl md:text-3xl lg:text-4xl font-ibm text-neon mb-6'>
                  Dice Notation
                </h2>
                <div className='h-0.5 bg-neon mb-8'></div>
                <p className='font-ocr text-text text-base md:text-lg mb-6 leading-relaxed'>
                  The dice roller uses standard RPG dice notation:
                </p>
                <ul className='space-y-3'>
                  {project.diceNotation.map((notation, index) => (
                    <li key={index} className='flex items-start'>
                      <Code className='w-5 h-5 text-neon shrink-0 mt-0.5 mr-3' />
                      <span className='font-mono text-text text-base leading-relaxed'>
                        {notation}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Planned Features */}
            {project.plannedFeatures && project.plannedFeatures.length > 0 && (
              <section className='mb-16'>
                <h2 className='text-2xl md:text-3xl lg:text-4xl font-ibm text-neon mb-6'>
                  Planned Features
                </h2>
                <div className='h-0.5 bg-neon mb-8'></div>
                <ul className='space-y-3'>
                  {project.plannedFeatures.map((feature, index) => (
                    <li key={index} className='flex items-start'>
                      <Zap className='w-5 h-5 text-neon shrink-0 mt-0.5 mr-3' />
                      <span className='font-ocr text-text text-base leading-relaxed'>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Demo Forms */}
            {project.demoForms && project.demoForms.length > 0 && (
              <section className='mb-16'>
                <h2 className='text-2xl md:text-3xl lg:text-4xl font-ibm text-neon mb-6'>
                  Demo Forms
                </h2>
                <div className='h-0.5 bg-neon mb-8'></div>
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
                {project.formFeatures && project.formFeatures.length > 0 && (
                  <div>
                    <h3 className='text-xl font-ibm text-neon mb-4'>
                      Each form:
                    </h3>
                    <ul className='space-y-2 ml-6'>
                      {project.formFeatures.map((feature, index) => (
                        <li key={index} className='flex items-start'>
                          <CheckCircle className='w-5 h-5 text-neon shrink-0 mt-0.5 mr-3' />
                          <span className='font-ocr text-text text-base leading-relaxed'>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            )}

            {/* Benefits Section - Services Only */}
            {project.isService &&
              project.benefits &&
              project.benefits.length > 0 && (
                <section className='mb-16'>
                  <h2 className='text-2xl md:text-3xl lg:text-4xl font-ibm text-neon mb-6'>
                    Benefits
                  </h2>
                  <div className='h-0.5 bg-neon mb-8'></div>
                  <ul className='space-y-3'>
                    {project.benefits.map((benefit, index) => (
                      <li key={index} className='flex items-start'>
                        <CheckCircle className='w-5 h-5 text-neon shrink-0 mt-0.5 mr-3' />
                        <span className='font-ocr text-text text-base leading-relaxed'>
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

            {/* Process Section - Services Only */}
            {project.isService &&
              project.process &&
              project.process.length > 0 && (
                <section className='mb-16'>
                  <h2 className='text-2xl md:text-3xl lg:text-4xl font-ibm text-neon mb-6'>
                    Process
                  </h2>
                  <div className='h-0.5 bg-neon mb-8'></div>
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
                          <div className='flex-1'>
                            <p className='font-ocr text-text text-base leading-relaxed'>
                              {step}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

            {/* Common Use Cases - Services Only */}
            {project.isService &&
              project.commonUseCases &&
              project.commonUseCases.length > 0 && (
                <section className='mb-16'>
                  <h2 className='text-2xl md:text-3xl lg:text-4xl font-ibm text-neon mb-6'>
                    Common Use Cases
                  </h2>
                  <div className='h-0.5 bg-neon mb-8'></div>
                  <ul className='space-y-3'>
                    {project.commonUseCases.map((useCase, index) => (
                      <li key={index} className='flex items-start'>
                        <Zap className='w-5 h-5 text-neon shrink-0 mt-0.5 mr-3' />
                        <span className='font-ocr text-text text-base leading-relaxed'>
                          {useCase}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

            {/* Use Cases - Services Only */}
            {project.isService &&
              project.useCases &&
              project.useCases.length > 0 && (
                <section className='mb-16'>
                  <h2 className='text-2xl md:text-3xl lg:text-4xl font-ibm text-neon mb-6'>
                    Use Cases
                  </h2>
                  <div className='h-0.5 bg-neon mb-8'></div>
                  <ul className='space-y-3'>
                    {project.useCases.map((useCase, index) => (
                      <li key={index} className='flex items-start'>
                        <Zap className='w-5 h-5 text-neon shrink-0 mt-0.5 mr-3' />
                        <span className='font-ocr text-text text-base leading-relaxed'>
                          {useCase}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

            {/* Services List - Services Only */}
            {project.isService &&
              project.services &&
              project.services.length > 0 && (
                <section className='mb-16'>
                  <h2 className='text-2xl md:text-3xl lg:text-4xl font-ibm text-neon mb-6'>
                    Services Included
                  </h2>
                  <div className='h-0.5 bg-neon mb-8'></div>
                  <ul className='space-y-3'>
                    {project.services.map((service, index) => (
                      <li key={index} className='flex items-start'>
                        <CheckCircle className='w-5 h-5 text-neon shrink-0 mt-0.5 mr-3' />
                        <span className='font-ocr text-text text-base leading-relaxed'>
                          {service}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
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
        </main>
      </div>
    </>
  );
}
