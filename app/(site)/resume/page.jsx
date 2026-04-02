'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  Download,
  ExternalLink,
  FileText,
  ChevronRight,
  Briefcase,
  GraduationCap,
  Cpu,
  Mail,
  Database,
} from 'lucide-react';
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiTypescript,
  SiJavascript,
  SiPython,
  SiPostgresql,
  SiGit,
  SiDocker,
  SiVercel,
  SiOpenai,
  SiGithub,
  SiMongodb,
  SiSupabase,
  SiAuth0,
  SiN8N,
  SiStripe,
  SiNetlify,
} from 'react-icons/si';

const BackgroundCanvas = dynamic(
  () => import('@/components/BackgroundCanvas/BackgroundCanvas'),
  { ssr: false }
);

const SUMMARY = `Full-stack engineer and business analyst with 9+ years bridging operations, data, and software systems. I build AI-enabled web apps, automation workflows, and practical internal tools that reduce friction and connect business needs to working implementation.`;

const SKILLS = [
  {
    category: 'Languages & Frameworks',
    tag: 'SK-01',
    items: [
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'Python', icon: SiPython, color: '#3776AB' },
      { name: 'SQL', icon: SiPostgresql, color: '#336791' },
      { name: 'React', icon: SiReact, color: '#61DAFB' },
      { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff' },
      { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
    ],
  },
  {
    category: 'Databases & Tools',
    tag: 'SK-02',
    items: [
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791' },
      { name: 'Supabase', icon: SiSupabase, color: '#3ECF8E' },
      { name: 'Neon', icon: Database, color: '#00E599' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
    ],
  },
  {
    category: 'DevOps & Cloud',
    tag: 'SK-03',
    items: [
      { name: 'Vercel', icon: SiVercel, color: '#ffffff' },
      { name: 'AWS', icon: SiGithub, color: '#FF9900' },
      { name: 'Git/GitHub', icon: SiGit, color: '#F05032' },
      { name: 'CI/CD Pipelines', icon: SiGithub, color: '#10B981' },
      { name: 'Docker', icon: SiDocker, color: '#2496ED' },
      { name: 'Netlify', icon: SiNetlify, color: '#00C7B7' },
    ],
  },
  {
    category: 'Automation & AI',
    tag: 'SK-04',
    items: [
      { name: 'OpenAI / ChatGPT', icon: SiOpenai, color: '#412991' },
      { name: 'Groq', icon: SiGithub, color: '#F43F5E' },
      { name: 'Prompt Engineering', icon: SiOpenai, color: '#10B981' },
      { name: 'Resend', icon: SiGithub, color: '#ffffff' },
      { name: 'n8n', icon: SiN8N, color: '#EA4B71' },
      { name: 'Zapier', icon: SiGithub, color: '#FF4F00' },
      { name: 'Auth.js', icon: SiAuth0, color: '#7C3AED' },
      { name: 'Stripe', icon: SiStripe, color: '#635BFF' },
    ],
  },
  {
    category: 'Data & Reporting',
    tag: 'SK-05',
    items: [
      { name: 'Tableau', icon: SiGithub, color: '#E97627' },
      { name: 'SQL Analytics', icon: SiPostgresql, color: '#336791' },
      { name: 'Excel', icon: SiGithub, color: '#217346' },
      { name: 'Data Storytelling', icon: SiGithub, color: '#00FF41' },
    ],
  },
  {
    category: 'Business Analysis',
    tag: 'SK-06',
    items: [
      { name: 'Requirements Gathering', icon: SiGithub, color: '#00FF41' },
      { name: 'Agile / Scrum', icon: SiGithub, color: '#38BDF8' },
      { name: 'UAT', icon: SiGithub, color: '#F59E0B' },
      { name: 'Documentation', icon: SiGithub, color: '#A78BFA' },
      { name: 'Stakeholder Collaboration', icon: SiGithub, color: '#FB7185' },
    ],
  },
];

const EXPERIENCE = [
  {
    title: 'Founder & Developer',
    company: 'λstepweaver – stepweaver.dev',
    period: 'Nov 2024 – Present',
    tag: 'EXP-01',
    description:
      'Build and ship AI-enabled web apps, real-time systems, automation workflows, and operational tools for modern businesses and portfolio-driven product development.',
    highlights: [
      'Designed and launched a real-time silent-auction platform for a school fundraiser using Next.js, Supabase Realtime, and Resend',
      'Delivered guided bidder onboarding, alias bidding, real-time updates, donor portals, admin workflows, and server-side rule enforcement',
      'Built Bill Planner, a cash-flow planning app using Next.js, Neon Postgres, Drizzle ORM, and Auth.js',
      'Implemented paycheck-window UX and a status pipeline (scheduled → pending → paid) with month templates to reduce cash-flow surprises',
      'Developed λlambda, a portfolio-native LLM chat agent integrated into both the website and terminal interface',
      'Built server-only prompts, Groq/OpenAI routing, multimodal message support, prompt-injection filtering, provider fallback, and honeypot bot protection',
      'Delivered automation systems for small-business clients using n8n, Zapier, Python, and Google APIs to reduce manual work and improve visibility',
      'Managed projects from scoping and UX through deployment on Vercel with environment-based workflows and iterative feedback loops',
    ],
  },
  {
    title: 'Business Analyst',
    company: 'University of Notre Dame – Irish1Card Office',
    period: 'Nov 2017 – May 2025',
    tag: 'EXP-02',
    description:
      'Managed reporting, system operations, and cross-functional requirements for high-volume university transaction and meal-plan systems.',
    highlights: [
      'Managed SQL data pipelines and Tableau dashboards supporting campus meal-plan operations for thousands of students',
      'Automated monthly reporting and reduced manual reconciliation time',
      'Administered the CSGold ID transaction system handling thousands of transactions per day',
      'Coordinated third-party integrations and implemented authentication updates',
      'Automated procurement and meal-plan workflows using Python, SQL, and Excel macros',
      'Led cross-functional user-acceptance testing, requirements gathering, stakeholder translation, and rollout support',
    ],
  },
  {
    title: 'Operations Manager',
    company: 'University of Notre Dame – Campus Dining',
    period: 'Aug 2014 – Nov 2017',
    tag: 'EXP-03',
    description:
      'Led logistics, labor, and service operations in high-volume campus dining environments with a metrics-driven approach to performance.',
    highlights: [
      'Oversaw logistics, labor scheduling, and inventory management for high-volume dining operations',
      'Implemented metrics-driven performance management to optimize cost and throughput',
      'Managed daily operations across multiple dining halls',
      'Improved customer service and supported quality assurance programs',
    ],
  },
  {
    title: 'Cryptologic Linguist',
    company: 'U.S. Air Force – Active Duty',
    period: 'Aug 2003 – Aug 2007',
    tag: 'EXP-04',
    description:
      'Produced mission-critical reporting under tight deadlines, with strong emphasis on signal analysis, pattern recognition, and structured communication.',
    highlights: [
      'Translated and analyzed high-stakes foreign signal intelligence',
      'Produced mission-critical reports with high accuracy under tight deadlines',
      'Built early expertise in pattern recognition, structured reporting, and mission-driven analysis that still informs current technical problem solving',
    ],
  },
];

const EDUCATION = [
  {
    tag: 'EDU-01',
    title: 'Bachelor of Arts, Communication Studies',
    institution: 'Grand Valley State University',
    location: 'Allendale, MI',
  },
  {
    tag: 'EDU-02',
    title: 'Associate of Arts, Business Administration',
    institution: 'Ivy Tech Community College',
    location: 'South Bend, IN',
  },
  {
    tag: 'EDU-03',
    title: 'Certificate, Intensive Spanish Language Program',
    institution: 'Defense Language Institute (DLI)',
    location: 'Monterey, CA',
  },
];

const SIDEBAR_NAV = [
  { label: 'Summary', href: '#summary', icon: FileText },
  { label: 'Skills', href: '#skills', icon: Cpu },
  { label: 'Experience', href: '#experience', icon: Briefcase },
  { label: 'Education', href: '#education', icon: GraduationCap },
];

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

function MobileResumeBrief() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className='lg:hidden shrink-0 border-b border-neon/15'>
      <button
        onClick={() => setExpanded(!expanded)}
        className='w-full px-3 py-2 flex items-center justify-between text-left hover:bg-panel/30 transition-colors'
      >
        <div className='flex items-center gap-2'>
          <FileText className='w-3 h-3 text-neon/50' />
          <span className='font-ocr text-xs tracking-[0.2em] text-text-meta uppercase'>
            Dossier info
          </span>
        </div>
        <ChevronRight
          className={`w-3 h-3 text-neon/40 transition-transform duration-200 ${
            expanded ? 'rotate-90' : ''
          }`}
        />
      </button>

      {expanded && (
        <div className='px-3 pb-3 space-y-3 motion-safe:animate-[hudFadeIn_0.15s_ease-out]'>
          <div>
            <p className='font-ibm text-sm text-text'>Stephen Weaver</p>
            <p className='font-ocr text-xs text-text-meta'>
              Full-Stack Engineer | Business Analyst | AI & Automation
            </p>
          </div>

          <div className='flex flex-wrap gap-2'>
            <a
              href='/weaver_resume.pdf'
              download='weaver_resume.pdf'
              className='inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm bg-panel/30 border border-neon/15 font-ocr text-xs text-text-label hover:text-neon hover:border-neon/30 transition-colors'
            >
              <Download className='w-3 h-3' />
              PDF
            </a>

            <Link
              href='/contact'
              className='inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm bg-panel/30 border border-neon/15 font-ocr text-xs text-text-label hover:text-neon hover:border-neon/30 transition-colors'
            >
              <Mail className='w-3 h-3' />
              Contact
            </Link>

            <a
              href='https://github.com/stepweaver'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm bg-panel/30 border border-neon/15 font-ocr text-xs text-text-label hover:text-neon hover:border-neon/30 transition-colors'
            >
              <SiGithub className='w-3 h-3' />
              GitHub
            </a>
          </div>

          <div className='w-full h-px bg-gradient-to-r from-neon/15 via-neon/8 to-transparent' />

          <div className='flex flex-wrap gap-x-3 gap-y-1'>
            {SIDEBAR_NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className='font-ocr text-xs text-text-meta hover:text-text-secondary transition-colors'
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SectionDivider({ label, id, icon: Icon }) {
  return (
    <div id={id} className='flex items-center gap-3 scroll-mt-4'>
      {Icon && <Icon className='w-3.5 h-3.5 text-neon/50 shrink-0' />}
      <span className='font-ocr text-xs tracking-[0.25em] text-neon/45 uppercase'>
        {label}
      </span>
      <div className='flex-1 h-px bg-gradient-to-r from-neon/20 to-transparent' />
    </div>
  );
}

export default function ResumePage() {
  return (
    <div className='relative h-[calc(100vh-6rem)] flex flex-col overflow-hidden'>
      <BackgroundCanvas />

      <div className='relative z-10 flex flex-col h-full'>
        <header className='shrink-0 border-b border-neon/20 bg-panel/60 backdrop-blur-sm px-3 sm:px-5 py-2 flex items-center justify-between gap-4'>
          <div className='flex items-center gap-2.5'>
            <FileText className='w-3.5 h-3.5 text-neon/60' />
            <span className='font-ocr text-xs tracking-[0.3em] text-text-meta uppercase'>Resume</span>
            <span className='text-neon/15 hidden sm:inline'>│</span>
            <span className='font-ibm text-xs text-text-meta hidden sm:inline'>
              λstepweaver dossier
            </span>
          </div>

          <div className='flex items-center gap-2.5'>
            <span className='font-ocr text-xs text-neon/35 hidden sm:inline'>
              2026
            </span>
            <span className='inline-flex items-center gap-1.5'>
              <span className='relative flex h-2 w-2'>
                <span className='absolute inline-flex h-full w-full rounded-full bg-neon opacity-40 motion-safe:animate-ping' />
                <span className='relative inline-flex h-2 w-2 rounded-full bg-neon' />
              </span>
                <span className='font-ocr text-xs tracking-[0.15em] text-text-label uppercase'>Current</span>
            </span>
          </div>
        </header>

        <MobileResumeBrief />

        <div className='flex-1 flex flex-col lg:flex-row min-h-0'>
          <aside className='hidden lg:flex lg:flex-col lg:w-72 2xl:w-80 shrink-0 border-r border-neon/15 overflow-y-auto'>
            <div className='p-3 space-y-3 flex-1'>
              <SidebarPanel label='IDENTITY'>
                <h1 className='font-ibm text-lg text-neon leading-snug'>
                  Stephen Weaver
                </h1>
                <p className='font-ocr text-xs text-text-meta leading-relaxed mt-1'>
                  Full-Stack Engineer
                  <br />
                  Business Analyst
                  <br />
                  AI & Automation
                </p>
                <div className='mt-3 w-full h-px bg-gradient-to-r from-neon/30 via-neon/10 to-transparent' />
                <p className='font-ocr text-xs text-text/35 mt-2'>
                  9+ years bridging business, operations, and software systems.
                </p>
              </SidebarPanel>

              <div>
                <p className='font-ocr text-xs tracking-[0.25em] text-neon/40 uppercase px-1 mb-2'>
                  Sections
                </p>
                <div className='space-y-1'>
                  {SIDEBAR_NAV.map((item) => {
                    const Icon = item.icon;

                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        className='group flex items-center gap-2.5 px-3 py-2 rounded-sm bg-panel/30 border border-neon/8 hover:border-neon/20 hover:bg-panel/50 transition-all duration-200'
                      >
                        <Icon className='w-3.5 h-3.5 text-neon/55 shrink-0 group-hover:text-neon/80 transition-colors' />
                        <span className='font-ibm text-xs text-text-secondary group-hover:text-neon transition-colors'>
                          {item.label}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>

              <SidebarPanel label='ACTIONS'>
                <div className='space-y-1.5'>
                  <a
                    href='/weaver_resume.pdf'
                    download='weaver_resume.pdf'
                    className='group flex items-center gap-2.5 px-2 py-2 rounded-sm bg-panel/30 border border-neon/8 hover:border-neon/20 hover:bg-panel/50 transition-all duration-200'
                  >
                    <Download className='w-3.5 h-3.5 text-neon/55 shrink-0 group-hover:text-neon/80 transition-colors' />
                    <div>
                      <p className='font-ibm text-xs text-text-secondary group-hover:text-neon transition-colors'>
                        Download PDF
                      </p>
                      <p className='font-ocr text-xs text-text/30'>
                        weaver_resume.pdf
                      </p>
                    </div>
                  </a>

                  <Link
                    href='/contact'
                    className='group flex items-center gap-2.5 px-2 py-2 rounded-sm bg-panel/30 border border-neon/8 hover:border-neon/20 hover:bg-panel/50 transition-all duration-200'
                  >
                    <Mail className='w-3.5 h-3.5 text-neon/55 shrink-0 group-hover:text-neon/80 transition-colors' />
                    <p className='font-ibm text-xs text-text-secondary group-hover:text-neon transition-colors'>
                      Get in touch
                    </p>
                  </Link>

                  <a
                    href='https://github.com/stepweaver'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='group flex items-center gap-2.5 px-2 py-2 rounded-sm bg-panel/30 border border-neon/8 hover:border-neon/20 hover:bg-panel/50 transition-all duration-200'
                  >
                    <SiGithub className='w-3.5 h-3.5 text-neon/55 shrink-0 group-hover:text-neon/80 transition-colors' />
                    <div className='flex items-center gap-1.5'>
                      <p className='font-ibm text-xs text-text-secondary group-hover:text-neon transition-colors'>
                        GitHub
                      </p>
                      <ExternalLink className='w-2.5 h-2.5 text-neon/30' />
                    </div>
                  </a>
                </div>
              </SidebarPanel>

              <div className='px-1 space-y-1 mt-auto'>
                <div className='flex items-center gap-2 font-ocr text-xs text-text/20'>
                  <span className='w-1 h-1 rounded-full bg-neon/30' />
                  <span>Last updated: 2026</span>
                </div>
                <div className='flex items-center gap-2 font-ocr text-xs text-text/20'>
                  <span className='w-1 h-1 rounded-full bg-neon/30' />
                  <span>PDF available for download</span>
                </div>
              </div>
            </div>
          </aside>

          <section className='flex-1 min-h-0 flex flex-col'>
            <div className='shrink-0 bg-panel/50 border-b border-neon/20 px-4 py-2 flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <Briefcase className='w-3 h-3 text-neon/40' />
                <span className='font-ocr text-xs tracking-[0.18em] text-neon/40 uppercase'>Overview</span>
              </div>
              <span className='font-ocr text-xs text-text/20 hidden sm:inline'>2026</span>
            </div>

            <div className='flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 md:p-8'>
              <div className='max-w-4xl mx-auto space-y-8'>
                <section>
                  <SectionDivider
                    label='Professional Summary'
                    id='summary'
                    icon={FileText}
                  />
                  <div className='mt-4 max-w-3xl'>
                    <p className='font-ocr text-xs sm:text-sm text-text-secondary leading-relaxed'>
                      {SUMMARY}
                    </p>
                  </div>
                </section>

                <section>
                  <SectionDivider
                    label='Skills & Technologies'
                    id='skills'
                    icon={Cpu}
                  />
                  <div className='mt-4 grid gap-6 md:grid-cols-2'>
                    {SKILLS.map((group) => (
                      <div key={group.tag}>
                        <div className='mb-2.5 flex items-baseline justify-between'>
                          <h3 className='text-sm font-semibold text-text font-ibm'>
                            {group.category}
                          </h3>
                          <span className='font-mono text-xs text-neon/30'>
                            {group.tag}
                          </span>
                        </div>

                        <div className='flex flex-wrap gap-2'>
                          {group.items.map((skill) => {
                            const Icon = skill.icon;

                            return (
                              <div
                                key={skill.name}
                                className='flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm border border-neon/12 bg-panel/25 hover:border-neon/25 hover:bg-panel/40 transition-colors'
                              >
                                <Icon className='w-3.5 h-3.5 shrink-0 text-neon/75' />
                                <span className='font-ibm text-xs text-text/85'>
                                  {skill.name}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <SectionDivider
                    label='Experience'
                    id='experience'
                    icon={Briefcase}
                  />
                  <div className='mt-4 space-y-6'>
                    {EXPERIENCE.map((job) => (
                      <article
                        key={job.tag}
                        className='relative border-l-2 border-neon/15 pl-5 hover:border-neon/30 transition-colors'
                      >
                        <div className='absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-neon/40 border border-panel' />
                        <div className='flex items-start justify-between gap-3 mb-1'>
                          <h3 className='text-base font-semibold text-text font-ibm leading-snug'>
                            {job.title}
                          </h3>
                          <span className='font-mono text-xs text-neon/30 shrink-0 mt-1'>
                            {job.tag}
                          </span>
                        </div>

                        <p className='font-ibm text-sm text-accent/85'>
                          {job.company}
                        </p>
                        <span className='font-ibm text-xs text-text/45 block mb-3'>
                          {job.period}
                        </span>

                        <p className='font-ibm text-sm text-text-secondary leading-relaxed mb-3'>
                          {job.description}
                        </p>

                        <ul className='space-y-1.5'>
                          {job.highlights.map((highlight, i) => (
                            <li
                              key={i}
                              className='flex items-start font-ocr text-xs text-text-secondary leading-snug'
                            >
                              <span className='text-text-meta mr-2 mt-px shrink-0'>
                                →
                              </span>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </article>
                    ))}
                  </div>
                </section>

                <section>
                  <SectionDivider
                    label='Education'
                    id='education'
                    icon={GraduationCap}
                  />
                  <div className='mt-4 grid gap-4 md:grid-cols-3'>
                    {EDUCATION.map((edu) => (
                      <div
                        key={edu.tag}
                        className='border-l-2 border-accent/15 pl-4 hover:border-accent/30 transition-colors'
                      >
                        <h3 className='text-xs font-semibold text-text font-ibm leading-snug'>
                          {edu.title}
                        </h3>
                        <p className='font-ocr text-xs text-text/70 mt-1'>
                          {edu.institution}
                        </p>
                        <p className='font-ocr text-xs text-text-meta mt-0.5'>
                          {edu.location}
                        </p>
                        <span className='font-mono text-xs text-neon/25 mt-1 block'>
                          {edu.tag}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>

            <footer className='shrink-0 border-t border-neon/20 bg-panel/60 backdrop-blur-sm px-3 sm:px-5 py-1.5 flex items-center gap-2 sm:gap-3 overflow-x-auto'>
              <span className='font-ocr text-xs text-neon/45 whitespace-nowrap'>
                &gt; resume
              </span>
              <span className='text-neon/15'>│</span>
              <span className='font-ocr text-xs text-text/25 uppercase whitespace-nowrap'>
                Document ready
              </span>
              <span className='text-neon/15 hidden sm:inline'>│</span>
              <span className='font-ocr text-xs text-text/25 uppercase whitespace-nowrap hidden sm:inline'>
                PDF available
              </span>
              <span className='text-neon/15 hidden md:inline'>│</span>
              <span className='font-ocr text-xs text-text/20 uppercase whitespace-nowrap hidden md:inline'>
                Last updated 2026
              </span>
            </footer>
          </section>
        </div>
      </div>
    </div>
  );
}