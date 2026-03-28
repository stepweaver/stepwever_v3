export async function GET() {
  const profile = {
    name: 'Stephen Weaver',
    brand: 'λstepweaver',
    url: 'https://stepweaver.dev',
    role: 'Full-Stack Developer · Automation & AI Integration',
    summary:
      'Stephen Weaver is a systems builder: a full-stack developer and business-minded operator who designs, integrates, and hardens software, automation, and AI-assisted workflows for real operational use.',
    location: 'Indiana, USA',
    work_modes: ['contract', 'sprint', 'part-time', 'task-based', 'trial project'],
    strong_fits: [
      'end-to-end systems thinking (workflow to production)',
      'Next.js app work',
      'React implementation',
      'automation, integrations, and workflow wiring',
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

