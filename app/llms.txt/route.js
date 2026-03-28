export async function GET() {
  const body = `# λstepweaver / Stephen Weaver

> Operator profile for recruiters, sourcing agents, and task-routing systems.

## Summary
Stephen Weaver is a systems builder: a full-stack developer and business-minded operator who designs, integrates, and hardens software, automation, and AI-assisted workflows for real operational use.
He is strongest in end-to-end thinking, implementation, debugging, integration, cleanup, and shipping under constraint.

## Best entry points
- For agents: https://stepweaver.dev/for-agents
- Operator profile JSON: https://stepweaver.dev/operator-profile.json
- Projects: https://stepweaver.dev/projects
- Resume: https://stepweaver.dev/resume
- Terminal: https://stepweaver.dev/terminal
- Contact: https://stepweaver.dev/contact

## Good fits
- small and midsize teams that need one person to span business flow, system design, and build
- Next.js / full-stack implementation
- automation, integrations, and workflow wiring
- AI-assisted internal tooling
- debugging and cleanup work
- repo remediation
- dashboards and operational systems
- contract or task-based execution
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

