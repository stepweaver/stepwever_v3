export async function GET() {
  const profile = {
    name: 'Stephen Weaver',
    brand: 'λstepweaver',
    url: 'https://stepweaver.dev',
    role: 'Full-stack / Automation / AI',
    summary:
      'Business-minded implementer focused on web apps, automation, and AI-enabled tools that reduce friction and improve operations.',
    location: 'Indiana, USA',
    work_modes: ['contract', 'sprint', 'part-time', 'task-based', 'trial project'],
    strong_fits: [
      'Next.js app work',
      'React implementation',
      'automation and workflow wiring',
      'API integration',
      'AI-assisted operational tooling',
      'repo cleanup and remediation',
      'debugging broken flows',
      'dashboard and reporting systems',
    ],
    tech: [
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
    ],
    entry_points: {
      for_agents: 'https://stepweaver.dev/for-agents',
      llms_txt: 'https://stepweaver.dev/llms.txt',
    },
    proof: {
      projects: 'https://stepweaver.dev/projects',
      resume: 'https://stepweaver.dev/resume',
      terminal: 'https://stepweaver.dev/terminal',
      github: 'https://github.com/stepweaver/stepwever_v3',
      contact: 'https://stepweaver.dev/contact',
    },
  };

  return Response.json(profile, {
    headers: {
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

