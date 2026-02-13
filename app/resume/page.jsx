'use client';

import dynamic from 'next/dynamic';
import { Download, ExternalLink } from 'lucide-react';
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiTypescript,
  SiJavascript,
  SiPython,
  SiPostgresql,
  SiMysql,
  SiGit,
  SiDocker,
  SiVercel,
  SiOpenai,
  SiGithub,
} from 'react-icons/si';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { HUDPanel } from '@/components/ui/HUDPanel';

// Lazy load BackgroundCanvas - heavy canvas operations
const BackgroundCanvas = dynamic(
  () => import('@/components/BackgroundCanvas/BackgroundCanvas'),
  { ssr: false }
);

const SKILLS = [
  {
    category: 'Languages & Frameworks',
    items: [
      { name: 'JavaScript (ES6+)', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'Python', icon: SiPython, color: '#3776AB' },
      { name: 'SQL', icon: SiPostgresql, color: '#336791' },
      { name: 'React', icon: SiReact, color: '#61DAFB' },
      { name: 'Next.js 15', icon: SiNextdotjs, color: '#ffffff' },
      { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
    ],
  },
  {
    category: 'Databases & Cloud',
    items: [
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791' },
      { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
      { name: 'MongoDB', icon: SiPostgresql, color: '#47A248' },
      { name: 'AWS', icon: SiVercel, color: '#FF9900' },
      { name: 'Vercel', icon: SiVercel, color: '#ffffff' },
      { name: 'Git/GitHub', icon: SiGit, color: '#F05032' },
    ],
  },
  {
    category: 'AI & Automation',
    items: [
      { name: 'OpenAI/ChatGPT', icon: SiOpenai, color: '#412991' },
      { name: 'Claude', icon: SiOpenai, color: '#D97706' },
      { name: 'Cursor IDE', icon: SiOpenai, color: '#00FF41' },
      { name: 'Prompt Engineering', icon: SiOpenai, color: '#10B981' },
    ],
  },
  {
    category: 'Business Intelligence',
    items: [
      { name: 'Tableau', icon: SiGithub, color: '#E97627' },
      { name: 'SQL Analytics', icon: SiPostgresql, color: '#336791' },
      { name: 'Excel/Pivot Tables', icon: SiGithub, color: '#217346' },
      { name: 'Data Visualization', icon: SiGithub, color: '#00FF41' },
    ],
  },
];

const EXPERIENCE = [
  {
    title: 'Founder & Principal Consultant',
    company: 'λstepweaver – stepweaver.dev',
    period: 'Nov 2024 – Present',
    description:
      'Founded and operate a solo digital consultancy focused on automation, optimization, and scaling for modern businesses. Launched and branded λstepweaver as an AI-native studio.',
    highlights: [
      'Architected and delivered data-driven web applications, AI-enabled business tools, and automated client dashboards',
      'Built the portfolio-terminal—an interactive React/Next.js interface demonstrating full-stack and AI engineering capabilities',
      'Developed proposal, contract, and payment systems (Stripe, DocuSign, Notion) to streamline client onboarding',
      'Grew λstepweaver into a profitable, incorporated business (2025) with expanding client roster',
    ],
  },
  {
    title: 'Business Analyst',
    company: 'University of Notre Dame – Irish1Card Office',
    period: 'Nov 2017 – May 2025',
    description:
      'Administered and optimized reporting platforms via SQL and Tableau, driving actionable insights for campus operations and revenue processes.',
    highlights: [
      'Designed, built, and maintained SQL-based reports and Tableau dashboards with parameterized and interactive reports',
      'Translated complex business needs into clear, scalable technical requirements for IT and engineering teams',
      'Administered the university\'s ID card transaction system (CSGold), managing system operations and data integrity',
      'Spearheaded initiatives to optimize internal workflows, significantly reducing time-to-insight for campus departments',
    ],
  },
  {
    title: 'Operations Manager',
    company: 'University of Notre Dame – Campus Dining',
    period: 'Aug 2014 – Nov 2017',
    description:
      'Led operational logistics and staff management in a fast-paced, service-driven environment for high-volume dining venues.',
    highlights: [
      'Used data to optimize workflows, improve customer service delivery, and manage daily logistics',
      'Managed dining operations, inventory, and procurement, overseeing labor scheduling and cost controls',
      'Developed internal reports for scheduling, performance, and inventory tracking',
      'Partnered with finance to track overhead, food, and labor cost ratios',
    ],
  },
  {
    title: 'Airborne Cryptologic Linguist',
    company: 'U.S. Air Force – Active Duty',
    period: 'Aug 2003 – Aug 2007',
    description:
      'Analyzed complex data streams and produced actionable intelligence under high-pressure, mission-critical conditions.',
    highlights: [
      'Translated and analyzed high-stakes foreign communications, delivering actionable intelligence',
      'Built advanced skills in data analysis, pattern recognition, and critical thinking under classified protocols',
      'Developed strong analytical and communication skills transferable to business data analysis',
      'Structured reporting under mission-critical conditions',
    ],
  },
];

export default function ResumePage() {
  return (
    <div className='relative min-h-screen'>
      <BackgroundCanvas />

      <div className='relative z-10 w-full'>
        <section className='w-full px-4 sm:px-6 md:px-8 lg:px-8 xl:px-10 2xl:px-12 py-16 md:py-24'>
          <div className='w-full max-w-7xl mx-auto'>
            <header className='mb-12 md:mb-16'>
              <div className='relative rounded-2xl border border-neon/20 bg-panel/70 p-6 md:p-8 shadow-neon-sm backdrop-blur overflow-hidden'>
                <div className='pointer-events-none absolute left-3 top-3 h-2 w-8 border-l border-t border-neon/50' />
                <div className='pointer-events-none absolute bottom-3 right-3 h-2 w-8 border-b border-r border-neon/50' />
                <div className='flex flex-wrap items-center justify-between gap-2 mb-4'>
                  <span className='doc-label-module'>DOCUMENT</span>
                  <span className='doc-label-id'>ID: RESUME-2025</span>
                </div>
                <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6'>
                  <div>
                    <h1 className='font-ibm font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-neon leading-tight mb-4'>
                      Resume
                    </h1>
                    <div className='font-ocr text-base sm:text-lg text-text/80 max-w-3xl leading-relaxed'>
                      <p>Full-Stack Developer | AI-Native Technologist | Business Analyst</p>
                      <p>8+ years of experience bridging business and tech.</p>
                    </div>
                  </div>
                  <a
                    href='/weaver_resume.pdf'
                    download='weaver_resume.pdf'
                    className='inline-flex items-center gap-2 px-6 py-3 border-2 border-neon rounded-lg bg-panel/50 backdrop-blur-xl text-neon font-ibm hover:bg-neon/10 transition-all duration-200 self-start'
                  >
                    <Download className='w-5 h-5' />
                    Download PDF
                  </a>
                </div>
              </div>
            </header>

            <section className='mb-16 md:mb-24' aria-labelledby='section-skills'>
              <div className='mb-6'>
                <ModuleHeader name='Skills & Technologies' />
              </div>

              <div className='grid gap-8 md:grid-cols-2'>
                {SKILLS.map((skillGroup, idx) => (
                  <HUDPanel
                    key={skillGroup.category}
                    title={skillGroup.category}
                    id={`RES-SK-${String(idx + 1).padStart(2, '0')}`}
                    className='p-5'
                  >
                    <div className='flex flex-wrap gap-3'>
                      {skillGroup.items.map((skill) => {
                        const Icon = skill.icon;
                        return (
                          <div
                            key={skill.name}
                            className='flex items-center gap-2 px-3 py-2 rounded-lg border border-neon/20 bg-panel/30'
                          >
                            <Icon
                              className='w-4 h-4 shrink-0'
                              style={{ color: skill.color }}
                            />
                            <span className='font-ocr text-sm text-text'>
                              {skill.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </HUDPanel>
                ))}
              </div>
            </section>

            <section className='mb-16 md:mb-24' aria-labelledby='section-experience'>
              <div className='mb-6'>
                <ModuleHeader name='Experience' id='RES-EXP' />
              </div>

              <div className='space-y-8'>
                {EXPERIENCE.map((job, index) => (
                  <HUDPanel
                    key={index}
                    title={job.title}
                    id={`RES-EXP-${String(index + 1).padStart(2, '0')}`}
                    className='p-6 md:p-8'
                  >
                    <p className='font-ocr text-accent text-base mb-2'>
                      {job.company}
                    </p>
                    <span className='font-ocr text-text/60 text-sm md:text-base block mb-4'>
                      {job.period}
                    </span>
                    <p className='font-ocr text-text text-base leading-relaxed mb-4'>
                      {job.description}
                    </p>
                    <ul className='space-y-2'>
                      {job.highlights.map((highlight, i) => (
                        <li
                          key={i}
                          className='flex items-start font-ocr text-text/80 text-sm'
                        >
                          <span className='text-neon mr-2'>→</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </HUDPanel>
                ))}
              </div>
            </section>

            <section className='mb-16 md:mb-24' aria-labelledby='section-education'>
              <div className='mb-6'>
                <ModuleHeader name='Education' id='RES-EDU' />
              </div>

              <div className='grid gap-6 md:grid-cols-3'>
                {[
                  {
                    id: 'RES-EDU-01',
                    title: 'Bachelor of Arts, Communication Studies',
                    institution: 'Grand Valley State University',
                    location: 'Allendale, MI',
                  },
                  {
                    id: 'RES-EDU-02',
                    title: 'Associate of Arts, Business Administration',
                    institution: 'Ivy Tech Community College',
                    location: 'South Bend, IN',
                  },
                  {
                    id: 'RES-EDU-03',
                    title: 'Certificate, Intensive Spanish Language Program',
                    institution: 'Defense Language Institute (DLI)',
                    location: 'Monterey, CA',
                  },
                ].map((edu) => (
                  <HUDPanel key={edu.id} title={edu.title} id={edu.id} className='p-5'>
                    <p className='font-ocr text-text text-base'>
                      {edu.institution}
                    </p>
                    <p className='font-ocr text-text/60 text-sm mt-2'>
                      {edu.location}
                    </p>
                  </HUDPanel>
                ))}
              </div>
            </section>

            <section className='pt-8 border-t border-neon/20' aria-label='Document actions'>
              <div className='flex flex-col sm:flex-row gap-4 items-start'>
                <a
                  href='/contact'
                  className='inline-flex items-center gap-2 px-6 py-3 border-2 border-neon rounded-lg bg-panel/50 backdrop-blur-xl text-neon font-ibm hover:bg-neon/10 transition-all duration-200'
                >
                  Get in Touch
                </a>
                <a
                  href='https://github.com/stepweaver'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-2 px-6 py-3 border border-neon/30 rounded-lg bg-panel/50 backdrop-blur-xl text-text font-ibm hover:bg-neon/10 hover:text-neon hover:border-neon transition-all duration-200'
                >
                  <SiGithub className='w-5 h-5' />
                  View GitHub
                  <ExternalLink className='w-4 h-4' />
                </a>
              </div>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
}
