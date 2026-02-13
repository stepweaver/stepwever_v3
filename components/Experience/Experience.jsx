'use client';

import { memo, useState, useEffect } from 'react';
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiSupabase,
  SiFirebase,
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
} from 'react-icons/si';
import {
  BarChart3,
  Calculator,
  FileText,
  Zap,
  Brain,
  ShoppingCart,
  Palette,
  Server,
} from 'lucide-react';

// 1) Data lives outside the component
const TECH_CATEGORIES = [
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
        name: 'Tailwind CSS',
        icon: SiTailwindcss,
        color: '#06B6D4',
        isComponent: true,
      },
      { name: 'shadcn/ui', icon: Palette, color: '#ffffff', isComponent: true },
      { name: 'MDX', icon: FileText, color: '#ffffff', isComponent: true },
      {
        name: 'Contentlayer',
        icon: FileText,
        color: '#ffffff',
        isComponent: true,
      },
      { name: 'Vite', icon: Zap, color: '#646CFF', isComponent: true },
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
        name: 'Express.js',
        icon: SiExpress,
        color: '#ffffff',
        isComponent: true,
      },
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
      {
        name: 'PostgreSQL',
        icon: SiPostgresql,
        color: '#336791',
        isComponent: true,
      },
      { name: 'MySQL', icon: SiMysql, color: '#4479A1', isComponent: true },
      { name: 'REST APIs', icon: Server, color: '#ffffff', isComponent: true },
      { name: 'GraphQL', icon: Server, color: '#E10098', isComponent: true },
    ],
  },
  {
    name: 'AI & Automation',
    technologies: [
      {
        name: 'OpenAI API',
        icon: SiOpenai,
        color: '#412991',
        isComponent: true,
      },
      { name: 'Zapier', icon: SiZapier, color: '#FF4A00', isComponent: true },
      { name: 'Custom Bots', icon: Brain, color: '#00FF41', isComponent: true },
      {
        name: 'Workflow Auto',
        icon: Zap,
        color: '#00FF41',
        isComponent: true,
      },
      {
        name: 'Data Process',
        icon: BarChart3,
        color: '#00FF41',
        isComponent: true,
      },
      {
        name: 'Email Auto',
        icon: FileText,
        color: '#00FF41',
        isComponent: true,
      },
    ],
  },
  {
    name: 'Commerce & Integrations',
    technologies: [
      { name: 'Stripe', icon: SiStripe, color: '#008CDD', isComponent: true },
      {
        name: 'QuickBooks',
        icon: Calculator,
        color: '#2CA01C',
        isComponent: true,
      },
      {
        name: 'POS Systems',
        icon: ShoppingCart,
        color: '#FF6B35',
        isComponent: true,
      },
      { name: 'Notion', icon: SiNotion, color: '#ffffff', isComponent: true },
      {
        name: 'Sheets',
        icon: FileText,
        color: '#34A853',
        isComponent: true,
      },
      { name: 'Slack', icon: SiSlack, color: '#4A154B', isComponent: true },
    ],
  },
  {
    name: 'DevOps & Delivery',
    technologies: [
      {
        name: 'GitHub',
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

function Experience() {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);

  const handleTabClick = (index) => {
    setCurrentCategory(index);
    setUserInteracted(true);
  };

  useEffect(() => {
    if (!userInteracted) {
      const interval = setInterval(() => {
        setCurrentCategory((prev) => (prev + 1) % TECH_CATEGORIES.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [userInteracted]);

  return (
    <section className='relative z-30 py-20'>
      <div className='w-full px-4 sm:px-6 md:px-8 lg:px-6 xl:px-6 2xl:px-6 max-w-none lg:ml-[calc(390px+2.5rem)] xl:ml-[calc(390px+3rem)]'>
        <header className='mb-12 md:mb-16 w-full max-w-6xl text-center md:text-right md:ml-auto'>
          <h2 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-6 md:mb-8 leading-tight font-ibm text-terminal-green'>
            TECH I WORK WITH
          </h2>

          <div className='mb-8 md:mb-12'>
            <h3 className='text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-4 md:mb-6 leading-tight font-ibm text-terminal-green'>
              Modern tools, battle-tested solutions.
            </h3>
            <p className='text-terminal-text font-ocr text-base md:text-lg leading-relaxed'>
              8+ years bridging business and tech. From Air Force intelligence
              to AI-native development, I've learned that the right tools, and
              knowing when to use them, make all the difference.
            </p>
          </div>
        </header>

        <div className='w-full max-w-6xl md:ml-auto'>
          <nav className='flex flex-wrap gap-1 md:gap-2 mb-6 md:mb-8 justify-center md:justify-end' aria-label="Tech categories">
            {TECH_CATEGORIES.map((category, index) => (
              <button
                key={category.name}
                onClick={() => handleTabClick(index)}
                className={`px-2 md:px-3 py-1 md:py-2 font-ibm text-sm md:text-base font-bold uppercase tracking-wider border-2 transition-all duration-300 cursor-pointer rounded-lg shadow-lg hover:shadow-xl ${
                  currentCategory === index
                    ? 'border-neon text-neon bg-neon/10 shadow-neon/20 hover:shadow-neon/30 transform scale-105'
                    : 'border-neon/30 text-text/80 hover:border-neon hover:text-neon hover:bg-neon/5'
                }`}
                style={{
                  textShadow:
                    currentCategory === index
                      ? '0 0 8px rgba(0, 255, 65, 0.8), 0 0 16px rgba(0, 255, 65, 0.4)'
                      : 'none',
                }}
              >
                {category.name}
              </button>
            ))}
          </nav>

          {/* Current category header */}
          <div className='mb-6 md:mb-8 text-center md:text-left'>
            <h3 className='text-xl md:text-2xl lg:text-3xl font-ibm text-neon font-bold uppercase tracking-wider'>
              {TECH_CATEGORIES[currentCategory].name}
            </h3>
          </div>

          {/* Tech cards — single row for current category */}
          <div className='flex flex-wrap justify-center md:justify-end gap-4'>
            {TECH_CATEGORIES[currentCategory].technologies.map((tech, index) => {
              const IconComponent = tech.isComponent ? tech.icon : null;
              return (
                <div
                  key={tech.name}
                  className='group flex flex-col items-center justify-center p-3 border border-neon/30 rounded-lg bg-panel/50 backdrop-blur-xl transition-all duration-500 hover:border-neon hover:bg-neon/10 min-w-24 w-auto h-auto min-h-24 hover:-translate-y-0.5 hover:shadow-neon-sm card-glow-tight'
                  style={{ animationDelay: `${index * 50}ms` }}
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
                  <span className='font-ocr text-terminal-text group-hover:text-terminal-green text-sm sm:text-base text-center leading-tight transition-all duration-300'>
                    {tech.name}
                  </span>
                </div>
              );
            })}
          </div>

          <div className='flex justify-center md:justify-end mt-8 gap-3' role="tablist" aria-label="Category indicators">
            {TECH_CATEGORIES.map((_, index) => (
              <button
                key={index}
                onClick={() => handleTabClick(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                  currentCategory === index
                    ? 'bg-neon shadow-lg shadow-neon/50 scale-125'
                    : 'bg-neon/30 hover:bg-neon/50 hover:scale-110'
                }`}
                aria-label={`Show ${TECH_CATEGORIES[index].name}`}
                aria-selected={currentCategory === index}
                role="tab"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// memo is optional but inexpensive
export default memo(Experience);
