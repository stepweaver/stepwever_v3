'use client';

import { useEffect, useState } from 'react';
import styles from './Experience.module.css';
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiSupabase,
  SiFirebase,
  SiGraphql,
  SiPostgresql,
  SiMysql,
  SiOpenai,
  SiZapier,
  SiStripe,
  SiNotion,
  SiSlack,
  SiGithub,
  SiVercel,
  SiNetlify,
  SiCloudflare,
  SiDocker,
} from 'react-icons/si';
import {
  Cloud,
  Shield,
  Globe,
  BarChart3,
  Link,
  Wrench,
  Calculator,
  Plane,
  FileText,
  Zap,
  Rocket,
} from 'lucide-react';

export default function Experience() {
  const [currentCategory, setCurrentCategory] = useState(0);

  const techCategories = [
    {
      name: 'Front-End',
      technologies: [
        { name: 'React', icon: SiReact, color: '#61DAFB', isComponent: true },
        {
          name: 'Next.js 15',
          icon: SiNextdotjs,
          color: '#000000',
          isComponent: true,
        },
        {
          name: 'Tailwind CSS v4',
          icon: SiTailwindcss,
          color: '#06B6D4',
          isComponent: true,
        },
        { name: 'shadcn/ui', icon: '🧩' },
        { name: 'MDX', icon: '📝' },
        {
          name: 'Contentlayer',
          icon: FileText,
          color: '#000000',
          isComponent: true,
        },
        { name: 'Vite', icon: '⚡' },
        { name: 'Astro', icon: '🚀' },
      ],
    },
    {
      name: 'Back-End / APIs',
      technologies: [
        {
          name: 'Node.js',
          icon: SiNodedotjs,
          color: '#339933',
          isComponent: true,
        },
        {
          name: 'Express',
          icon: SiExpress,
          color: '#000000',
          isComponent: true,
        },
        {
          name: 'Serverless',
          icon: Cloud,
          color: '#FD5750',
          isComponent: true,
        },
        { name: 'AWS Amplify', icon: '⚡' },
        { name: 'Cognito', icon: Shield, color: '#FF9900', isComponent: true },
        {
          name: 'Supabase',
          icon: SiSupabase,
          color: '#3ECF8E',
          isComponent: true,
        },
        {
          name: 'Firebase',
          icon: SiFirebase,
          color: '#FFCA28',
          isComponent: true,
        },
        { name: 'REST', icon: Globe, color: '#00FF41', isComponent: true },
        {
          name: 'GraphQL',
          icon: SiGraphql,
          color: '#E10098',
          isComponent: true,
        },
      ],
    },
    {
      name: 'Data & Analytics',
      technologies: [
        {
          name: 'PostgreSQL',
          icon: SiPostgresql,
          color: '#336791',
          isComponent: true,
        },
        { name: 'MySQL', icon: SiMysql, color: '#4479A1', isComponent: true },
        { name: 'dbt', icon: '🔄' },
        { name: 'Airbyte', icon: '🛫' },
        { name: 'Tableau', icon: '📊' },
        {
          name: 'Power BI',
          icon: BarChart3,
          color: '#F2C811',
          isComponent: true,
        },
      ],
    },
    {
      name: 'Automation & AI',
      technologies: [
        { name: 'OpenAI', icon: SiOpenai, color: '#412991', isComponent: true },
        { name: 'LangChain', icon: Link, color: '#000000', isComponent: true },
        { name: 'Zapier', icon: SiZapier, color: '#FF4A00', isComponent: true },
        { name: 'Make', icon: Wrench, color: '#000000', isComponent: true },
        {
          name: 'FireCrawl',
          icon: '🕷️',
        },
      ],
    },
    {
      name: 'Commerce & Integrations',
      technologies: [
        { name: 'Stripe', icon: SiStripe, color: '#008CDD', isComponent: true },
        { name: 'QuickBooks', icon: '📊' },
        {
          name: 'Toast POS',
          icon: Calculator,
          color: '#FF6B35',
          isComponent: true,
        },
        { name: 'Notion', icon: SiNotion, color: '#000000', isComponent: true },
        { name: 'Google Sheets', icon: '📑' },
        { name: 'Slack', icon: SiSlack, color: '#4A154B', isComponent: true },
      ],
    },
    {
      name: 'DevOps & Delivery',
      technologies: [
        {
          name: 'GitHub Actions',
          icon: SiGithub,
          color: '#181717',
          isComponent: true,
        },
        { name: 'Vercel', icon: SiVercel, color: '#000000', isComponent: true },
        {
          name: 'Netlify',
          icon: SiNetlify,
          color: '#00C7B7',
          isComponent: true,
        },
        {
          name: 'Cloudflare',
          icon: SiCloudflare,
          color: '#F38020',
          isComponent: true,
        },
        { name: 'Docker', icon: SiDocker, color: '#2496ED', isComponent: true },
        { name: 'Fly.io', icon: Plane, color: '#8B5CF6', isComponent: true },
      ],
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCategory((prev) => (prev + 1) % techCategories.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [techCategories.length]);

  return (
    <section className='relative z-30 py-20'>
      <div className='px-8 md:px-16 lg:px-24 w-full'>
        {/* Section Header */}
        <div className='mb-16 ml-auto w-full max-w-6xl'>
          <h2 className='text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight text-left font-ibm text-terminal-green font-bold'>
            EXPERIENCE & TECH ARSENAL
          </h2>
          <div className='h-0.5 bg-terminal-green mb-8'></div>

          {/* Description */}
          <p className='text-terminal-text font-ocr text-lg leading-relaxed mb-12'>
            Each tool is chosen for speed, composability, and the freedom to
            hand clients a system they can actually run. When the stack isn't
            enough, λstepweaver builds the missing piece.
          </p>
        </div>

        {/* Tech Arsenal - Compact Rotating Layout */}
        <div className='ml-auto w-full max-w-6xl'>
          {/* Category Navigation */}
          <div className='flex flex-wrap gap-3 mb-8'>
            {techCategories.map((category, index) => (
              <button
                key={category.name}
                onClick={() => setCurrentCategory(index)}
                className={`px-3 py-1 font-ibm text-sm border transition-all duration-300 ${
                  currentCategory === index
                    ? 'border-terminal-green text-terminal-green bg-terminal-dark'
                    : 'border-terminal-border text-terminal-muted hover:border-terminal-green hover:text-terminal-green'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Current Category Display */}
          <div className='mb-6'>
            <h3 className='text-xl lg:text-2xl font-ibm text-terminal-green mb-4 font-bold'>
              {techCategories[currentCategory].name}
            </h3>
          </div>

          {/* Tech Icons - Compact Grid */}
          <div className='grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4'>
            {techCategories[currentCategory].technologies.map((tech, index) => {
              const IconComponent = tech.isComponent ? tech.icon : null;
              return (
                <div
                  key={tech.name}
                  className={`${styles.techItem} flex flex-col items-center justify-center p-3 border border-terminal-border rounded-lg transition-all duration-500 hover:border-terminal-green hover:bg-terminal-green hover:bg-opacity-5`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className='text-2xl mb-1 flex items-center justify-center'>
                    {tech.isComponent ? (
                      <IconComponent
                        size={24}
                        color={tech.color}
                        className='transition-all duration-300 hover:scale-110'
                      />
                    ) : (
                      <span>{tech.icon}</span>
                    )}
                  </div>
                  <span className='font-ocr text-terminal-text text-xs text-center leading-tight'>
                    {tech.name}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Category Indicators */}
          <div className='flex justify-center mt-6 gap-2'>
            {techCategories.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentCategory(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentCategory === index
                    ? 'bg-terminal-green'
                    : 'bg-terminal-border hover:bg-terminal-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
