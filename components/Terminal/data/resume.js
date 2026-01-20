// Resume command handler for Terminal
// Displays resume sections in terminal format

let isResumeModeActive = false;

export function startResumeMode(callback) {
  isResumeModeActive = true;
  return getResumeMenu();
}

export function exitResumeMode() {
  isResumeModeActive = false;
}

export function isInResumeMode() {
  return isResumeModeActive;
}

export function getResumeMenu() {
  return [
    `<div class="resume-box-header text-terminal-green" style="border: 1px solid currentColor; padding: 0.25em 0.5em; margin: 0.5em 0; white-space: nowrap;">STEPHEN WEAVER RESUME</div>`,
    ``,
    `<span class="text-terminal-cyan">Available sections:</span>`,
    ``,
    `<span class="text-terminal-text">  summary    - Professional summary & skills</span>`,
    `<span class="text-terminal-text">  experience - Work history</span>`,
    `<span class="text-terminal-text">  projects   - Select projects</span>`,
    `<span class="text-terminal-text">  education  - Degrees & certifications</span>`,
    `<span class="text-terminal-text">  download   - Download PDF resume</span>`,
    ``,
    `<span class="text-terminal-text">  exit       - Exit resume mode</span>`,
    ``,
    `<span class="text-terminal-dimmed">Type a section name to view details.</span>`,
  ];
}

export function handleResumeCommand(command, callback) {
  const cmd = command.trim().toLowerCase();

  switch (cmd) {
    case 'summary':
    case 'skills':
      return getSummary();

    case 'experience':
    case 'work':
      return getExperience();

    case 'projects':
      return getProjects();

    case 'education':
    case 'edu':
      return getEducation();

    case 'download':
    case 'pdf':
      // Trigger download
      if (typeof window !== 'undefined') {
        const link = document.createElement('a');
        link.href = '/weaver_resume.pdf';
        link.download = 'Stephen_Weaver_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      return [
        `<span class="text-terminal-green">✓ Downloading Stephen_Weaver_Resume.pdf...</span>`,
        ``,
        `<span class="text-terminal-dimmed">Type another section or 'exit' to exit.</span>`,
      ];

    case 'exit':
      exitResumeMode();
      return [`<span class="text-terminal-green">Exited resume mode.</span>`];

    case 'help':
    case '?':
      return getResumeMenu();

    default:
      return [
        `<span class="text-terminal-red">Unknown section: ${cmd}</span>`,
        `<span class="text-terminal-text">Available: summary, experience, projects, education, download</span>`,
      ];
  }
}

function getSummary() {
  return [
    `<div class="resume-section-box text-terminal-green" style="border: 1px solid currentColor; padding: 0.25em 0.5em; margin: 0.5em 0;"><span style="white-space: nowrap;">SUMMARY</span></div>`,
    ``,
    `<span class="text-terminal-cyan">Stephen Weaver</span>`,
    `<span class="text-terminal-text">Full-Stack Developer | AI-Native Technologist | Business Analyst</span>`,
    `<span class="text-terminal-dimmed">stephen@stepweaver.dev | stepweaver.dev | Indiana</span>`,
    ``,
    `<span class="text-terminal-text">Technologist with 9 years of experience spanning development, data analysis, and automation. Former Air Force linguist turned full-stack developer focused on building systems that make life and work simpler.</span>`,
    `<span class="text-terminal-text">Specializes in AI-native workflows, rapid prototyping, and clear communication between humans and code.</span>`,
    ``,
    `<span class="text-terminal-cyan">Languages & Frameworks:</span>`,
    `<span class="text-terminal-text">  JavaScript, TypeScript, Python, SQL</span>`,
    `<span class="text-terminal-text">  React, Next.js, Node.js, Tailwind CSS</span>`,
    ``,
    `<span class="text-terminal-cyan">Databases & Tools:</span>`,
    `<span class="text-terminal-text">  PostgreSQL, MongoDB, Git</span>`,
    `<span class="text-terminal-text">  AWS, Vercel, Netlify</span>`,
    ``,
    `<span class="text-terminal-cyan">Automation & AI:</span>`,
    `<span class="text-terminal-text">  ChatGPT, Claude, Gemini</span>`,
    `<span class="text-terminal-text">  Prompt Engineering, Zapier, n8n</span>`,
    ``,
    `<span class="text-terminal-cyan">BI & Reporting:</span>`,
    `<span class="text-terminal-text">  Tableau, SQL, Excel</span>`,
    `<span class="text-terminal-text">  Data Storytelling, Reporting Automation</span>`,
    ``,
    `<span class="text-terminal-cyan">Business Analysis:</span>`,
    `<span class="text-terminal-text">  Requirements Gathering, Agile/Scrum, UAT</span>`,
    `<span class="text-terminal-text">  Documentation, Stakeholder Collaboration</span>`,
    ``,
    `<span class="text-terminal-dimmed">Type another section or 'exit' to exit.</span>`,
  ];
}

function getExperience() {
  return [
    `<div class="resume-section-box text-terminal-green" style="border: 1px solid currentColor; padding: 0.25em 0.5em; margin: 0.5em 0;"><span style="white-space: nowrap;">EXPERIENCE</span></div>`,
    ``,
    `<span class="text-terminal-cyan">λstepweaver – Founder & Developer</span>`,
    `<span class="text-terminal-dimmed">Nov 2024 – Present</span>`,
    `<span class="text-terminal-text">  → Built AI-native apps, dashboards, and automation tools for small business clients</span>`,
    `<span class="text-terminal-text">  → Developed a terminal-style portfolio UI using React/Next.js with MDX and prompt chaining</span>`,
    `<span class="text-terminal-text">  → Led end-to-end delivery: scoping, engineering, deployment, iteration</span>`,
    ``,
    `<span class="text-terminal-cyan">University of Notre Dame – Business Analyst</span>`,
    `<span class="text-terminal-dimmed">Nov 2017 – May 2025</span>`,
    `<span class="text-terminal-text">  → Designed and maintained SQL dashboards and Tableau-based reporting</span>`,
    `<span class="text-terminal-text">  → Administered ID transaction system (CSGold), coordinating third-party integrations</span>`,
    `<span class="text-terminal-text">  → Automated financial and operations workflows across meal plans and procurement</span>`,
    `<span class="text-terminal-text">  → Drove UAT coordination, requirements translation, and stakeholder engagement</span>`,
    ``,
    `<span class="text-terminal-cyan">University of Notre Dame – Operations Manager</span>`,
    `<span class="text-terminal-dimmed">Aug 2014 – Nov 2017</span>`,
    `<span class="text-terminal-text">  → Managed logistics, labor, and inventory for high-volume campus dining</span>`,
    `<span class="text-terminal-text">  → Applied cost and performance metrics to optimize operations</span>`,
    ``,
    `<span class="text-terminal-cyan">U.S. Air Force – Cryptologic Linguist</span>`,
    `<span class="text-terminal-dimmed">Aug 2003 – Aug 2007</span>`,
    `<span class="text-terminal-text">  → Translated and analyzed high-stakes foreign signal intelligence</span>`,
    `<span class="text-terminal-text">  → Built early expertise in pattern recognition, structured reporting, and mission-driven analysis</span>`,
    ``,
    ``,
    `<span class="text-terminal-dimmed">Type another section or 'exit' to exit.</span>`,
  ];
}

function getEducation() {
  return [
    `<div class="resume-section-box text-terminal-green" style="border: 1px solid currentColor; padding: 0.25em 0.5em; margin: 0.5em 0;"><span style="white-space: nowrap;">EDUCATION</span></div>`,
    ``,
    `<span class="text-terminal-cyan">B.A. Communication Studies</span>`,
    `<span class="text-terminal-text">Grand Valley State University</span>`,
    ``,
    `<span class="text-terminal-cyan">A.A. Business Administration</span>`,
    `<span class="text-terminal-text">Ivy Tech Community College</span>`,
    ``,
    `<span class="text-terminal-cyan">Certificate, Intensive Spanish Language Program</span>`,
    `<span class="text-terminal-text">Defense Language Institute Foreign Language Center (DLI)</span>`,
    ``,
    ``,
    `<span class="text-terminal-dimmed">Type another section or 'exit' to exit.</span>`,
  ];
}

function getProjects() {
  return [
    `<div class="resume-section-box text-terminal-green" style="border: 1px solid currentColor; padding: 0.25em 0.5em; margin: 0.5em 0;"><span style="white-space: nowrap;">SELECT PROJECTS</span></div>`,
    ``,
    `<span class="text-terminal-cyan">Portfolio Terminal UI</span>`,
    `<span class="text-terminal-text">React/Next.js portfolio with command-line navigation and MDX</span>`,
    ``,
    `<span class="text-terminal-cyan">Python AI Scheduler</span>`,
    `<span class="text-terminal-text">Desktop app for scheduling via Google APIs</span>`,
    ``,
    `<span class="text-terminal-cyan">Client Automation Systems</span>`,
    `<span class="text-terminal-text">Lead capture tools, operational dashboards, and workflow automations for small businesses</span>`,
    ``,
    ``,
    `<span class="text-terminal-dimmed">Type another section or 'exit' to exit.</span>`,
  ];
}
