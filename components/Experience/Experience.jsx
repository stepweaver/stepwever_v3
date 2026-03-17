'use client';

import { memo } from 'react';
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

// Category codes for military roster style
const CATEGORY_CODES = {
  'Front-End': 'FE',
  'Back-End / APIs': 'BE',
  'AI & Automation': 'AI',
  'Commerce & Integrations': 'CI',
  'DevOps & Delivery': 'DO',
};

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

const FEATURED_TESTIMONIAL = {
  quote:
    'Stephen has a great tenacity to solve problems in the world of technical development and engineering. We were fortunate enough to work alongside him multiple times, in which he delivered the dependable digital foundations for our Clients. With each project, his work significantly improved and become more operational. For those needing a digital facelift - it\'s not your job to understand how it\'s done. Instead, focus on finding someone you trust to help craft your vision inside your digital landscape. Stephen is one of those someones. God Bless.',
  attribution: 'HERO POINT CONSULTING',
  role: 'Agency Partner (Testimonial from Griffin H.)',
};

function Experience() {
  return (
    <section className='relative z-30 py-20 overflow-x-hidden'>
      {/* Same outer padding as Hero for consistency with BACKGROUND section */}
      <div className='w-full px-1 sm:px-2 md:px-3 lg:px-4 xl:px-6 2xl:px-8'>
        {/* Right column: aligns with Hero right column, same internal padding as About (p-6) */}
        <div className='w-full px-2 sm:px-4 md:p-6 min-w-0 lg:ml-[calc(390px+2.5rem)] xl:ml-[calc(390px+3rem)] lg:w-[calc(100%-390px-2.5rem)] xl:w-[calc(100%-390px-3rem)]'>
        {/* Section ID - military roster style */}
        <div className='mb-6 flex items-start justify-between gap-4'>
          <p className='text-xs tracking-[0.28em] text-neon/70 font-ocr uppercase'>LOADOUT</p>
          <div className='text-right text-xs text-muted font-mono shrink-0'>
            <div className='tracking-[0.22em] text-neon/50 uppercase font-ocr text-[10px]'>ID</div>
            <div className='font-mono text-neon/80 whitespace-nowrap'>KIT-02</div>
          </div>
        </div>

        <div className='mb-8 md:mb-12'>
          <h3 className='text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-4 md:mb-6 leading-tight font-ibm text-neon'>
            Modern tools, battle-tested solutions.
          </h3>
          <p className='text-text/90 font-ocr text-base md:text-lg leading-relaxed'>
            8+ years bridging business and tech. I've learned that the right tools, and
            knowing when to use them, make all the difference.
          </p>
        </div>

        {/* Equipment roster: fixed-height rows, no layout shift */}
        <div className='w-full max-w-6xl min-w-0 border border-neon/30 border-l-4 border-l-neon/70 bg-panel/30'>
          <div className='border-b border-neon/30 px-3 py-2 font-ocr text-[10px] uppercase tracking-[0.2em] text-neon/60'>
            Equipment inventory
          </div>
          <div className='divide-y divide-neon/20' role="list">
            {TECH_CATEGORIES.map((category, rowIndex) => (
              <div
                key={category.name}
                className={`flex min-h-[5.5rem] items-stretch ${rowIndex % 2 === 1 ? 'bg-panel/40' : ''}`}
                role="listitem"
              >
                {/* Category code strip */}
                <div
                  className='flex w-14 shrink-0 flex-col justify-center border-r border-neon/30 px-2 font-ibm text-xs font-bold uppercase tracking-widest text-neon/90'
                  aria-label={category.name}
                >
                  <span className='font-ocr text-[10px] text-neon/50'>Unit</span>
                  <span>{CATEGORY_CODES[category.name] ?? category.name.slice(0, 2)}</span>
                </div>
                {/* Fixed-height tool strip: same row height regardless of item count */}
                <div className='flex flex-1 items-center gap-2 overflow-x-auto py-2 px-3'>
                  {category.technologies.map((tech) => {
                    const IconComponent = tech.isComponent ? tech.icon : null;
                    return (
                      <div
                        key={tech.name}
                        className='group flex shrink-0 flex-col items-center justify-center rounded border border-neon/25 bg-panel/50 px-3 py-2 transition-colors duration-200 hover:border-neon/60 hover:bg-neon/5'
                        style={{ minWidth: '5rem' }}
                      >
                        <div className='mb-0.5 flex h-8 w-8 items-center justify-center'>
                          {tech.isComponent ? (
                            <IconComponent
                              size={20}
                              color={tech.color}
                              className='shrink-0 transition-transform duration-200 group-hover:scale-110'
                            />
                          ) : (
                            <span className='text-lg'>{tech.icon}</span>
                          )}
                        </div>
                        <span className='font-ocr text-[11px] text-text/80 group-hover:text-neon text-center leading-tight'>
                          {tech.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Optional homepage testimonial excerpt */}
        {FEATURED_TESTIMONIAL.quote && (
          <div className='mt-12 md:mt-16'>
            <div className='mb-4 md:mb-6'>
              <p className='text-xs tracking-[0.28em] text-neon/70 font-ocr uppercase mb-2'>Testimonial</p>
              <h3 className='text-lg md:text-xl lg:text-2xl font-ibm text-neon font-bold uppercase tracking-wider'>
                What clients say
              </h3>
            </div>
            <div className='hud-panel p-4 md:p-6 border border-neon/20 bg-panel/60'>
              <p className='font-ocr text-sm md:text-base text-text/90 leading-relaxed mb-3'>
                {FEATURED_TESTIMONIAL.quote}
              </p>
              <p className='font-ocr text-[10px] text-text/50 uppercase tracking-[0.22em]'>
                {FEATURED_TESTIMONIAL.attribution}
                {FEATURED_TESTIMONIAL.role
                  ? ` · ${FEATURED_TESTIMONIAL.role}`
                  : ''}
              </p>
            </div>
          </div>
        )}
        </div>
      </div>
    </section>
  );
}

// memo is optional but inexpensive
export default memo(Experience);
