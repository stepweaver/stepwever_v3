// Resume functionality
const displayResume = () => {
  return [
    `<span class="text-terminal-green">Stephen Weaver - λstepweaver</span>`,
    `<span class="text-terminal-text">Founder & Principal Consultant</span>`,
    `<span class="text-terminal-text">Veteran • Data Strategist • Rebel</span>`,
    ``,
    `<span class="text-terminal-cyan">Experience:</span>`,
    ``,
    `<span class="text-terminal-green">Founder & Principal Consultant - λstepweaver</span>`,
    `<span class="text-terminal-text">stepweaver.dev | 2024-Present</span>`,
    `<span class="text-terminal-text">• Launched λstepweaver, an AI-native digital studio, delivering web, AI, and automation solutions for modern businesses.</span>`,
    `<span class="text-terminal-text">• Built full-stack apps, custom dashboards, proposal/contract systems, and managed all client delivery end-to-end.</span>`,
    `<span class="text-terminal-text">• Incorporated the business in 2025 and established a recognized brand for technical execution and rapid iteration.</span>`,
    ``,
    `<span class="text-terminal-green">Business Analyst - University of Notre Dame, Irish1Card Office</span>`,
    `<span class="text-terminal-text">2017-2025</span>`,
    `<span class="text-terminal-text">• Led data analysis and reporting for campus-wide card system serving 12,000+ users</span>`,
    `<span class="text-terminal-text">• Developed automated dashboards and KPI tracking systems</span>`,
    `<span class="text-terminal-text">• Managed vendor relationships and system integrations</span>`,
    ``,
    `<span class="text-terminal-green">Operations Manager - University of Notre Dame, Campus Dining</span>`,
    `<span class="text-terminal-text">Aug 2014 - Nov 2019</span>`,
    `<span class="text-terminal-text">• Managed daily operations for 15+ dining locations</span>`,
    `<span class="text-terminal-text">• Coordinated with vendors, staff, and university departments</span>`,
    ``,
    `<span class="text-terminal-cyan">Background:</span>`,
    `<span class="text-terminal-text">Airborne Cryptologic Linguist (30,000 ft up)</span>`,
    `<span class="text-terminal-text">Degrees in Communication & Business</span>`,
    `<span class="text-terminal-text">10+ years as business analyst</span>`,
    `<span class="text-terminal-text">Hospitality & university data systems</span>`,
    ``,
    `<span class="text-terminal-cyan">Core Services:</span>`,
    `<span class="text-terminal-text">Data pipelines & real-time dashboards</span>`,
    `<span class="text-terminal-text">Web development (React/Next.js)</span>`,
    `<span class="text-terminal-text">Business automation & API integration</span>`,
    `<span class="text-terminal-text">Growth analytics & KPI systems</span>`,
    ``,
    `<span class="text-terminal-cyan">Tech Stack:</span>`,
    `<span class="text-terminal-text">Frontend: React, Next.js 15, Tailwind CSS</span>`,
    `<span class="text-terminal-text">Backend: Node.js, Express, Serverless</span>`,
    `<span class="text-terminal-text">Data: PostgreSQL, Supabase, AWS</span>`,
    `<span class="text-terminal-text">Tools: Docker, CI/CD, API integration</span>`,
    ``,
    `<span class="text-terminal-cyan">Philosophy:</span>`,
    `<span class="text-terminal-text">"Digital leverage: more clarity, fewer keystrokes, faster wins"</span>`,
    ``,
    `<span class="text-terminal-yellow cursor-pointer" onclick="window.open('/Stephen-Weaver-Resume-stepweaver.pdf', '_blank')">Download Full Resume (PDF) →</span>`
  ];
};

// Contact form functionality
const displayContactForm = () => {
  return [
    `<span class="text-terminal-green">Contact Form - λstepweaver</span>`,
    `<span class="text-terminal-text">Let's get in touch! I'll ask you a few questions:</span>`,
    ``,
    `<span class="text-terminal-cyan">What's your name?</span>`,
    `<span class="text-terminal-text">(Type your name and press Enter)</span>`
  ];
};

export { displayResume, displayContactForm }; 