'use client';

import { memo } from 'react';
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiSupabase,
  SiPostgresql,
  SiZapier,
  SiStripe,
  SiNotion,
  SiSlack,
  SiGithub,
  SiVercel,
  SiCloudflare,
} from 'react-icons/si';
import {
  Calculator,
  Cpu,
  Mail,
  Printer,
  ShoppingCart,
  Workflow,
} from 'lucide-react';

const LOADOUT_GROUPS = [
  {
    id: 'SYS-01',
    title: 'Core Systems',
    subtitle: 'Primary application stack used across recurring projects',
    tools: [
      { code: 'NXT', name: 'Next.js', role: 'App shell / routing / server actions', icon: SiNextdotjs },
      { code: 'RCT', name: 'React', role: 'UI architecture / reusable components', icon: SiReact },
      { code: 'TWD', name: 'Tailwind CSS', role: 'Interface styling / design system velocity', icon: SiTailwindcss },
      { code: 'SBS', name: 'Supabase', role: 'Auth / realtime / database workflows', icon: SiSupabase },
      { code: 'PG', name: 'PostgreSQL', role: 'Structured data / relational storage', icon: SiPostgresql },
    ],
  },
  {
    id: 'SYS-02',
    title: 'AI / Automation Bus',
    subtitle: 'Tools used for model routing, workflow automation, content systems, and notifications',
    tools: [
      { code: 'LLM', name: 'LLM Routing', role: 'AI chat / model abstraction / routing', icon: Cpu },
      { code: 'N8N', name: 'n8n', role: 'Workflow orchestration / automation chains', icon: Workflow },
      { code: 'ZAP', name: 'Zapier', role: 'Connector glue / lightweight automations', icon: SiZapier },
      { code: 'NOT', name: 'Notion API', role: 'CMS / editorial content / publishing', icon: SiNotion },
      { code: 'SLK', name: 'Slack', role: 'Operational notifications / integrations', icon: SiSlack },
    ],
  },
  {
    id: 'SYS-03',
    title: 'Commerce / Ops Integrations',
    subtitle: 'Payments, fulfillment, messaging, reporting, source control, deployment, and edge delivery',
    tools: [
      { code: 'STR', name: 'Stripe', role: 'Payments / checkout / billing flows', icon: SiStripe },
      { code: 'PTY', name: 'Printify', role: 'Print-on-demand fulfillment', icon: Printer },
      { code: 'RSD', name: 'Resend', role: 'Transactional email / notifications', icon: Mail },
      { code: 'OPS', name: 'POS / QuickBooks', role: 'Operational reporting / business integrations', icon: ShoppingCart },
      { code: 'GIT', name: 'GitHub', role: 'Source control / workflows / versioning', icon: SiGithub },
      { code: 'VCL', name: 'Vercel', role: 'Deployment / edge / cron surfaces', icon: SiVercel },
      { code: 'CFL', name: 'Cloudflare', role: 'DNS / performance / edge delivery', icon: SiCloudflare },
    ],
  },
];

const FEATURED_TESTIMONIAL = {
  quote:
    'Stephen has a great tenacity to solve problems in the world of technical development and engineering. We were fortunate enough to work alongside him multiple times, in which he delivered the dependable digital foundations for our Clients. With each project, his work significantly improved and become more operational. For those needing a digital facelift - it\'s not your job to understand how it\'s done. Instead, focus on finding someone you trust to help craft your vision inside your digital landscape. Stephen is one of those someones. God Bless.',
  attribution: 'HERO POINT CONSULTING',
  role: 'Agency Partner (Testimonial from Griffin H.)',
};

function ToolModule({ code, name, role, icon: Icon }) {
  return (
    <article className='group rounded-sm border border-neon/12 bg-panel/35 p-2.5 transition-colors duration-200 hover:border-neon/30 hover:bg-panel/55'>
      <div className='mb-2 flex items-start justify-between gap-2'>
        <div className='min-w-0'>
      <div className='font-ocr text-xs uppercase tracking-[0.18em] text-text-label'>{code}</div>
      <h4 className='mt-0.5 font-ibm text-sm uppercase tracking-[0.05em] text-neon break-words'>{name}</h4>
        </div>

        <div className='flex h-7 w-7 items-center justify-center rounded-sm bg-terminal-dark/35'>
          <Icon
            size={14}
            className='text-neon/80 transition-transform duration-200 group-hover:scale-110'
            aria-hidden='true'
          />
        </div>
      </div>

      <div className='h-px w-full bg-neon/20' />

      <p className='mt-2 font-ibm text-xs leading-relaxed text-text-secondary'>{role}</p>
    </article>
  );
}

function Experience() {
  return (
    <section className='relative z-30 pt-1 pb-12 sm:pt-2 md:pt-4 overflow-x-hidden'>
      {/* Same outer padding as Hero for consistency with BACKGROUND section */}
      <div className='w-full px-1 sm:px-2 md:px-3 lg:px-4 xl:px-6 2xl:px-8'>
        {/* Right column: aligns with Hero right column, same internal padding as About (p-6) */}
        <div className='w-full px-2 sm:px-4 md:p-6 min-w-0 lg:ml-[calc(390px+2.5rem)] xl:ml-[calc(390px+3rem)] lg:w-[calc(100%-390px-2.5rem)] xl:w-[calc(100%-390px-3rem)]'>
          <div className='mb-3'>
            <p className='text-xs tracking-[0.18em] text-text-label font-ocr uppercase sm:text-sm'>Loadout</p>
          </div>

          <div className='mb-4 md:mb-5'>
            <h3 className='text-lg md:text-xl lg:text-2xl xl:text-3xl mb-2.5 md:mb-3 leading-tight font-ibm text-neon'>
              Tools that support the system.
            </h3>
            <p className='text-text/90 font-ibm text-sm md:text-base leading-relaxed'>
              After 8+ years across operations and software, the stack below is what shows up in real builds.
            </p>
          </div>

          <div className='w-full max-w-6xl min-w-0'>

            <div className='space-y-2'>
              {LOADOUT_GROUPS.map((group) => (
                <section key={group.id} className='rounded-sm bg-panel/20 p-2.5 md:p-3'>
                  <div className='mb-3 flex flex-col gap-1.5 border-b border-neon/15 pb-2 md:flex-row md:items-end md:justify-between'>
                    <div className='min-w-0'>
                      <div className='font-ocr text-xs uppercase tracking-[0.18em] text-text-label'>{group.id}</div>
                      <h4 className='mt-0.5 font-ibm text-lg uppercase tracking-[0.04em] text-neon break-words'>
                        {group.title}
                      </h4>
                    </div>
                    <p className='max-w-xl font-ibm text-xs text-text-meta'>
                      {group.subtitle}
                    </p>
                  </div>

                  <div className='grid gap-2 md:grid-cols-2 xl:grid-cols-3'>
                    {group.tools.map((tool) => (
                      <ToolModule key={tool.code} {...tool} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>

          {/* Optional homepage testimonial excerpt */}
          {FEATURED_TESTIMONIAL.quote && (
            <div className='mt-6 md:mt-8'>
              <div className='mb-2.5 md:mb-3'>
                <p className='text-xs tracking-[0.18em] text-text-label font-ocr uppercase mb-2 sm:text-sm'>Field report</p>
                <h3 className='text-base md:text-lg lg:text-xl font-ibm text-neon font-bold uppercase tracking-wider'>
                  External validation
                </h3>
              </div>
              <div className='relative border border-neon/20 bg-panel/25 p-2.5 md:p-3'>
                <div className='pointer-events-none absolute left-0 top-0 h-5 w-5 border-l border-t border-neon/60' />
                <div className='pointer-events-none absolute right-0 top-0 h-5 w-5 border-r border-t border-neon/25' />
                <div className='pointer-events-none absolute bottom-0 left-0 h-5 w-5 border-b border-l border-neon/25' />
                <div className='pointer-events-none absolute bottom-0 right-0 h-5 w-5 border-b border-r border-neon/60' />
                <div className='pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_12px] opacity-10' />

                <p className='font-ibm text-xs md:text-sm text-text-secondary leading-relaxed mb-2.5'>
                  {FEATURED_TESTIMONIAL.quote}
                </p>
                <p className='font-ibm text-xs text-text-meta uppercase tracking-[0.1em]'>
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
