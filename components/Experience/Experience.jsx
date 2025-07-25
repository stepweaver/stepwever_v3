'use client';

import { useEffect, useState } from 'react';
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
          color: '#ffffff',
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
          color: '#ffffff',
          isComponent: true,
        },
        { name: 'Vite', icon: '⚡' },
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
          color: '#ffffff',
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
        { name: 'Zapier', icon: SiZapier, color: '#FF4A00', isComponent: true },
        { name: 'Langflow', icon: '🔄' },
        { name: 'MCP Servers', icon: '🔌' },
      ],
    },
    {
      name: 'Commerce & Integrations',
      technologies: [
        { name: 'Stripe', icon: SiStripe, color: '#008CDD', isComponent: true },
        { name: 'QuickBooks', icon: '📊' },
        {
          name: 'POS Systems',
          icon: Calculator,
          color: '#FF6B35',
          isComponent: true,
        },
        { name: 'Notion', icon: SiNotion, color: '#ffffff', isComponent: true },
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
          color: '#ffffff',
          isComponent: true,
        },
        { name: 'Vercel', icon: SiVercel, color: '#ffffff', isComponent: true },
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
        <div className='mb-12 md:mb-16 ml-auto w-full max-w-6xl'>
          <h2 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-6 md:mb-8 leading-tight text-left font-ibm text-terminal-green'>
            EXPERIENCE & TECH ARSENAL
          </h2>

          {/* Experience Message */}
          <div className='mb-8 md:mb-12'>
            <h3 className='text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-4 md:mb-6 leading-tight text-left font-ibm text-terminal-green'>
              Fueled by Obsession, Driven by Passion
            </h3>
            <p className='text-terminal-text font-ocr text-base md:text-lg leading-relaxed'>
              λstepweaver is led by a veteran, business analyst, and rebel
              developer obsessed with helping businesses scale. Every project is
              a hands-on mission to solve real problems with practical tools,
              clear strategy, and relentless curiosity-no fluff, just results.
            </p>
          </div>
        </div>

        {/* Tech Arsenal - Compact Rotating Layout */}
        <div className='ml-auto w-full max-w-6xl'>
          {/* Category Navigation */}
          <div className='flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-8 justify-center'>
            {techCategories.map((category, index) => (
              <button
                key={category.name}
                onClick={() => setCurrentCategory(index)}
                className={`px-2 md:px-3 py-1 font-ibm text-xs md:text-sm border transition-all duration-300 ${
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
          <div className='mb-4 md:mb-6 text-center'>
            <h3 className='text-lg md:text-xl lg:text-2xl font-ibm text-terminal-green mb-3 md:mb-4'>
              {techCategories[currentCategory].name}
            </h3>
          </div>

          {/* Tech Icons - Compact Grid */}
          <div className='flex justify-center'>
            <div className='flex flex-wrap justify-center gap-4 max-w-fit mx-auto'>
              {techCategories[currentCategory].technologies.map(
                (tech, index) => {
                  const IconComponent = tech.isComponent ? tech.icon : null;
                  return (
                    <div
                      key={tech.name}
                      className='group flex flex-col items-center justify-center p-3 border border-terminal-border rounded-lg transition-all duration-500 hover:border-terminal-green hover:bg-terminal-green hover:bg-opacity-5 w-24 h-24 animate-[fadeIn_0.6s_ease-out_both] hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(0,255,65,0.15)]'
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className='mb-1 flex items-center justify-center w-12 h-12'>
                        {tech.isComponent ? (
                          <IconComponent
                            size={24}
                            color={tech.color}
                            className='transition-all duration-300 hover:scale-110'
                          />
                        ) : (
                          <span className='text-2xl'>{tech.icon}</span>
                        )}
                      </div>
                      <span className='font-ocr text-terminal-text group-hover:text-black text-xs text-center leading-tight transition-colors duration-300'>
                        {tech.name}
                      </span>
                    </div>
                  );
                }
              )}
            </div>
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
