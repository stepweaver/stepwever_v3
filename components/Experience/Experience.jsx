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
    subtitle: 'Primary build stack used across flagship projects',
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
    subtitle: 'Systems that reduce friction and extend capability',
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
    subtitle: 'Revenue, messaging, deployment, and production surfaces',
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
    <article className='group relative border border-neon/20 bg-panel/35 p-4 transition-colors duration-200 hover:border-neon/50 hover:bg-panel/55'>
      <div className='pointer-events-none absolute left-0 top-0 h-4 w-4 border-l border-t border-neon/60' />
      <div className='pointer-events-none absolute right-0 top-0 h-4 w-4 border-r border-t border-neon/25' />
      <div className='pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b border-l border-neon/25' />
      <div className='pointer-events-none absolute bottom-0 right-0 top-0 h-4 w-4 border-r border-t border-neon/25' />

      <div className='mb-4 flex items-start justify-between gap-3'>
        <div className='min-w-0'>
          <div className='font-ocr text-[10px] uppercase tracking-[0.28em] text-neon/50'>{code}</div>
          <h4 className='mt-1 font-ibm text-base uppercase tracking-[0.06em] text-neon break-words'>{name}</h4>
        </div>

        <div className='flex h-10 w-10 items-center justify-center border border-neon/20 bg-terminal-dark/40'>
          <Icon
            size={18}
            className='text-neon/80 transition-transform duration-200 group-hover:scale-110'
            aria-hidden='true'
          />
        </div>
      </div>

      <div className='h-px w-full bg-gradient-to-r from-neon/35 to-transparent' />

      <p className='mt-3 font-ocr text-[11px] leading-relaxed text-text/75'>{role}</p>
    </article>
  );
}

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

        {/* SYSTEM LOADOUT */}
        <div className='w-full max-w-6xl min-w-0 border border-neon/20 bg-panel/20 p-4 md:p-5'>
          <div className='pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_12px] opacity-10' />
          <div className='mb-4 flex items-start justify-between gap-4 border-b border-neon/15 pb-4'>
            <div className='min-w-0'>
              <div className='font-ocr text-[10px] uppercase tracking-[0.28em] text-neon/50'>Manifest</div>
              <h4 className='mt-1 font-ibm text-lg uppercase tracking-[0.05em] text-neon'>
                Active systems, not just logos.
              </h4>
              <p className='mt-2 font-ocr text-xs leading-relaxed text-text/70 max-w-[72ch]'>
                The modules below reflect the stack that shows up repeatedly across λstepweaver: app architecture,
                automation, commerce, publishing, and delivery.
              </p>
            </div>
            <div className='shrink-0 border border-neon/20 bg-panel/25 px-3 py-2 text-right'>
              <div className='font-ocr text-[10px] uppercase tracking-[0.22em] text-neon/50'>Mode</div>
              <div className='font-mono text-sm text-neon/80 whitespace-nowrap'>ACTIVE</div>
            </div>
          </div>

          <div className='space-y-6'>
            {LOADOUT_GROUPS.map((group) => (
              <section key={group.id} className='relative border border-neon/20 bg-panel/20 p-4 md:p-5'>
                <div className='pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_12px] opacity-10' />

                <div className='relative mb-5 flex flex-col gap-3 border-b border-neon/15 pb-4 md:flex-row md:items-end md:justify-between'>
                  <div className='min-w-0'>
                    <div className='font-ocr text-[10px] uppercase tracking-[0.28em] text-neon/50'>{group.id}</div>
                    <h4 className='mt-1 font-ibm text-xl uppercase tracking-[0.05em] text-neon break-words'>
                      {group.title}
                    </h4>
                  </div>
                  <p className='max-w-xl font-ocr text-[11px] uppercase tracking-[0.18em] text-text/55'>
                    {group.subtitle}
                  </p>
                </div>

                <div className='relative grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
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
          <div className='mt-12 md:mt-16'>
            <div className='mb-4 md:mb-6'>
              <p className='text-xs tracking-[0.28em] text-neon/70 font-ocr uppercase mb-2'>COMMS / FIELD REPORT</p>
              <h3 className='text-lg md:text-xl lg:text-2xl font-ibm text-neon font-bold uppercase tracking-wider'>
                External validation
              </h3>
            </div>
            <div className='relative border border-neon/20 bg-panel/25 p-4 md:p-6'>
              <div className='pointer-events-none absolute left-0 top-0 h-5 w-5 border-l border-t border-neon/60' />
              <div className='pointer-events-none absolute right-0 top-0 h-5 w-5 border-r border-t border-neon/25' />
              <div className='pointer-events-none absolute bottom-0 left-0 h-5 w-5 border-b border-l border-neon/25' />
              <div className='pointer-events-none absolute bottom-0 right-0 h-5 w-5 border-b border-r border-neon/60' />
              <div className='pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_12px] opacity-10' />

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
