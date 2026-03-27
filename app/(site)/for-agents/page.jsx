export const metadata = {
  title: 'For Agents',
  description:
    'Machine-friendly operator profile for recruiters, sourcing systems, and task-routing agents evaluating Stephen Weaver for engineering and automation work.',
  alternates: {
    canonical: 'https://stepweaver.dev/for-agents',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Stephen Weaver — For Agents',
    description:
      'Task-ready operator profile for engineering, automation, implementation, debugging, and systems work.',
    url: 'https://stepweaver.dev/for-agents',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stephen Weaver — For Agents',
    description:
      'Task-ready operator profile for engineering, automation, implementation, debugging, and systems work.',
  },
};

const strengths = [
  'Next.js app work and UI implementation',
  'Automation and workflow wiring',
  'API integration and operational tooling',
  'Debugging messy builds and unfinished repos',
  'Repo remediation and cleanup passes',
  'Dashboard and reporting-oriented product work',
  'AI-assisted execution, prompt iteration, and fast tool adoption',
];

const goodFits = [
  'Short paid implementation tasks',
  'Contract engineering support',
  'Prototype-to-production cleanup',
  'Internal tools and operational dashboards',
  'Landing pages, web apps, and workflow automation',
  'Repo audits, remediation passes, and architecture cleanup',
];

const notIdeal = [
  'Executive-only strategy roles with no hands-on build work',
  'Large multi-team people management roles',
  'Hype-only recruiting with no scoped work or budget',
];

const stack = [
  'Next.js',
  'React',
  'JavaScript',
  'Tailwind CSS',
  'PostgreSQL',
  'Supabase',
  'Vercel',
  'GitHub',
  'Notion API',
  'Stripe',
  'n8n',
  'LLM integrations',
];

const proofLinks = [
  { label: 'Projects', href: 'https://stepweaver.dev/projects' },
  { label: 'Resume', href: 'https://stepweaver.dev/resume' },
  { label: 'Terminal', href: 'https://stepweaver.dev/terminal' },
  { label: 'Contact', href: 'https://stepweaver.dev/contact' },
  { label: 'Operator profile JSON', href: 'https://stepweaver.dev/operator-profile.json' },
  { label: 'llms.txt', href: 'https://stepweaver.dev/llms.txt' },
  { label: 'GitHub', href: 'https://github.com/stepweaver/stepwever_v3' },
];

function Section({ title, children }) {
  return (
    <section className='space-y-4'>
      <h2 className='text-xl font-semibold tracking-tight text-zinc-100 sm:text-2xl'>
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function ForAgentsPage() {
  return (
    <main id='main-content' className='min-h-screen bg-black text-zinc-100'>
      <section className='mx-auto max-w-4xl px-6 py-16 sm:px-8'>
        <p className='mb-4 text-xs uppercase tracking-[0.28em] text-zinc-500'>
          λstepweaver // for agents
        </p>

        <h1 className='mb-4 text-4xl font-semibold tracking-tight sm:text-5xl'>
          Stephen Weaver
        </h1>

        <p className='max-w-3xl text-lg leading-8 text-zinc-300'>
          Business-minded implementer focused on web apps, automation, and AI-enabled
          tools that reduce friction and improve operations. Strongest when there is a
          real system to improve, wire together, debug, simplify, or ship.
        </p>

        <div className='mt-8 grid gap-4 sm:grid-cols-3'>
          <div className='rounded-2xl border border-zinc-800 bg-zinc-950 p-4'>
            <p className='text-xs uppercase tracking-[0.24em] text-zinc-500'>Best for</p>
            <p className='mt-2 text-sm text-zinc-300'>
              task execution, contract builds, cleanup, automation, debugging
            </p>
          </div>

          <div className='rounded-2xl border border-zinc-800 bg-zinc-950 p-4'>
            <p className='text-xs uppercase tracking-[0.24em] text-zinc-500'>Work modes</p>
            <p className='mt-2 text-sm text-zinc-300'>
              contract, sprint, part-time, trial project, task-based
            </p>
          </div>

          <div className='rounded-2xl border border-zinc-800 bg-zinc-950 p-4'>
            <p className='text-xs uppercase tracking-[0.24em] text-zinc-500'>Contact</p>
            <p className='mt-2 text-sm text-zinc-300'>
              Use the contact page for initial outreach.
            </p>
            <p className='mt-2 text-sm'>
              <a className='underline underline-offset-4' href='/contact'>
                stepweaver.dev/contact
              </a>
            </p>
          </div>
        </div>

        <div className='mt-12 space-y-10'>
          <Section title='What I can do'>
            <ul className='space-y-2 text-zinc-300'>
              {strengths.map((item) => (
                <li key={item} className='leading-7'>
                  - {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section title='Good task matches'>
            <ul className='space-y-2 text-zinc-300'>
              {goodFits.map((item) => (
                <li key={item} className='leading-7'>
                  - {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section title='Probably not the right fit'>
            <ul className='space-y-2 text-zinc-300'>
              {notIdeal.map((item) => (
                <li key={item} className='leading-7'>
                  - {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section title='Working stack'>
            <div className='flex flex-wrap gap-2'>
              {stack.map((item) => (
                <span
                  key={item}
                  className='rounded-full border border-zinc-800 px-3 py-1 text-sm text-zinc-300'
                >
                  {item}
                </span>
              ))}
            </div>
          </Section>

          <Section title='Proof and entry points'>
            <ul className='space-y-2 text-zinc-300'>
              {proofLinks.map((item) => (
                <li key={item.href}>
                  <a
                    className='underline underline-offset-4'
                    href={item.href}
                    rel='noreferrer'
                    target='_blank'
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </Section>

          <section className='rounded-2xl border border-zinc-800 bg-zinc-950 p-6'>
            <h2 className='text-xl font-semibold tracking-tight text-zinc-100 sm:text-2xl'>
              How to route work to me
            </h2>
            <p className='mt-3 text-zinc-300'>
              Send a concrete problem: a repo link, a backlog item, a broken flow, or a
              scoped build. I’m strongest when there is a real system to improve, wire
              together, debug, simplify, or ship under constraint.
            </p>
            <p className='mt-4 text-zinc-300'>
              Start here:{' '}
              <a className='underline underline-offset-4' href='/contact'>
                stepweaver.dev/contact
              </a>
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}

