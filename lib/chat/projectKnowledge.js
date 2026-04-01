import { PROJECTS_DATA } from '@/lib/projectsData';
import { CAROUSEL_PROJECTS } from '@/lib/carouselProjects';

const FIELD_ORDER = [
  'slug',
  'title',
  'description',
  'cardDescription',
  'status',
  'builtFor',
  'solved',
  'delivered',
  'overview',
  'context',
  'problem',
  'role',
  'solution',
  'architecture',
  'projectStructure',
  'features',
  'keyFeatures',
  'engineering',
  'techStack',
  'contentManagement',
  'ecommerceFeatures',
  'designSystem',
  'apiRoutes',
  'performance',
  'security',
  'terminalIntegration',
  'keyboardShortcuts',
  'diceNotation',
  'demoForms',
  'contentSections',
  'mission',
  'exampleUseCases',
  'outcome',
  'tradeoffs',
  'improveNext',
  'whyItMatters',
  'actions',
  'keywords',
  'tags',
  'link',
  'githubRepo',
  'isService',
  'isDemo',
  'comingSoon',
  'showComponentAsHero',
];

const FIELD_LABELS = {
  slug: 'Slug',
  title: 'Title',
  description: 'Canonical Description',
  cardDescription: 'Card Description',
  status: 'Status',
  builtFor: 'Built For',
  solved: 'Solved',
  delivered: 'Delivered',
  overview: 'Overview',
  context: 'Context / users',
  problem: 'Problem',
  role: 'Role',
  solution: 'Solution',
  architecture: 'Architecture',
  projectStructure: 'Project Structure',
  features: 'Features',
  keyFeatures: 'Key Features',
  engineering: 'Engineering',
  techStack: 'Tech Stack',
  contentManagement: 'Content Management',
  ecommerceFeatures: 'E-commerce Features',
  designSystem: 'Design System',
  apiRoutes: 'API Routes',
  performance: 'Performance',
  security: 'Security',
  terminalIntegration: 'Terminal Integration',
  keyboardShortcuts: 'Keyboard Shortcuts',
  diceNotation: 'Dice Notation',
  demoForms: 'Demo Forms',
  contentSections: 'Content Sections',
  mission: 'Mission',
  exampleUseCases: 'Example Use Cases',
  outcome: 'Outcome',
  tradeoffs: 'Tradeoffs',
  improveNext: 'Improve Next',
  whyItMatters: 'Why It Matters',
  actions: 'Card Actions',
  keywords: 'Card Keywords',
  tags: 'Tags',
  link: 'Live Link',
  githubRepo: 'GitHub Repo',
  isService: 'Service Entry',
  isDemo: 'Demo Entry',
  comingSoon: 'In Progress',
  showComponentAsHero: 'Live Component Hero',
};

function isPlainObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

function cleanText(value) {
  return String(value ?? '')
    .replace(/\r/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function startCase(value) {
  return String(value)
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function indent(text, spaces = 2) {
  const pad = ' '.repeat(spaces);
  return cleanText(text)
    .split('\n')
    .map((line) => (line ? `${pad}${line}` : ''))
    .join('\n');
}

function compactArray(values = []) {
  return [...new Set(values.filter(Boolean))];
}

function deriveStatus(project, card) {
  if (card?.comingSoon || project?.comingSoon) return 'in-progress';
  if (card?.isDemo || project?.isDemo) return 'demo';
  if (card?.isService || project?.isService) return 'service';
  return 'project';
}

function formatPrimitive(value) {
  if (typeof value === 'string') return cleanText(value);
  return String(value);
}

function formatArray(items) {
  const lines = [];

  for (const item of items) {
    if (item == null || item === '') continue;

    if (
      typeof item === 'string' ||
      typeof item === 'number' ||
      typeof item === 'boolean'
    ) {
      lines.push(`- ${formatPrimitive(item)}`);
      continue;
    }

    if (Array.isArray(item)) {
      const nested = formatArray(item);
      if (nested) lines.push(`- List\n${indent(nested, 2)}`);
      continue;
    }

    if (isPlainObject(item)) {
      const heading =
        item.title || item.name || item.label || item.section || item.slug || null;

      const remaining = Object.fromEntries(
        Object.entries(item).filter(
          ([key]) => !['title', 'name', 'label', 'section', 'slug'].includes(key)
        )
      );

      const nested = formatObject(remaining);

      if (heading && nested) {
        lines.push(`- ${formatPrimitive(heading)}\n${indent(nested, 2)}`);
      } else if (heading) {
        lines.push(`- ${formatPrimitive(heading)}`);
      } else if (nested) {
        lines.push(`- Item\n${indent(nested, 2)}`);
      }
    }
  }

  return lines.join('\n');
}

function formatObject(obj) {
  const entries = Object.entries(obj).filter(([_, value]) => {
    if (value == null || value === '') return false;
    if (Array.isArray(value) && value.length === 0) return false;
    if (isPlainObject(value) && Object.keys(value).length === 0) return false;
    return true;
  });

  const knownKeys = FIELD_ORDER.filter((key) =>
    entries.some(([entryKey]) => entryKey === key)
  );

  const extraKeys = entries
    .map(([key]) => key)
    .filter((key) => !knownKeys.includes(key))
    .sort();

  const orderedKeys = [...knownKeys, ...extraKeys];
  const lines = [];

  for (const key of orderedKeys) {
    const value = obj[key];
    if (value == null || value === '') continue;

    const label = FIELD_LABELS[key] || startCase(key);

    if (
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean'
    ) {
      lines.push(`${label}: ${formatPrimitive(value)}`);
      continue;
    }

    if (Array.isArray(value)) {
      const formatted = formatArray(value);
      if (formatted) lines.push(`${label}:\n${indent(formatted, 2)}`);
      continue;
    }

    if (isPlainObject(value)) {
      const formatted = formatObject(value);
      if (formatted) lines.push(`${label}:\n${indent(formatted, 2)}`);
    }
  }

  return lines.join('\n');
}

export function getUnifiedProjectRecords() {
  const cardMap = Object.fromEntries(
    CAROUSEL_PROJECTS.map((card) => [card.slug, card])
  );

  return Object.entries(PROJECTS_DATA).map(([slug, project]) => {
    const card = cardMap[slug] || null;

    return {
      slug,
      title: project.title,
      description: project.description,
      cardDescription:
        card?.description && card.description !== project.description
          ? card.description
          : null,
      status: deriveStatus(project, card),
      builtFor: card?.builtFor ?? project.builtFor ?? null,
      solved: card?.solved ?? project.solved ?? null,
      delivered: card?.delivered ?? project.delivered ?? null,
      overview: project.overview ?? null,
      context: project.context ?? null,
      problem: project.problem ?? null,
      role: project.role ?? null,
      solution: project.solution ?? null,
      architecture: project.architecture ?? null,
      projectStructure: project.projectStructure ?? null,
      features: project.features ?? null,
      keyFeatures: project.keyFeatures ?? null,
      engineering: project.engineering ?? null,
      techStack: project.techStack ?? null,
      contentManagement: project.contentManagement ?? null,
      ecommerceFeatures: project.ecommerceFeatures ?? null,
      designSystem: project.designSystem ?? null,
      apiRoutes: project.apiRoutes ?? null,
      performance: project.performance ?? null,
      security:
        compactArray([
          ...(Array.isArray(project.security) ? project.security : []),
          ...(Array.isArray(project.securityFeatures)
            ? project.securityFeatures
            : []),
        ]) || null,
      terminalIntegration: project.terminalIntegration ?? null,
      keyboardShortcuts: project.keyboardShortcuts ?? null,
      diceNotation: project.diceNotation ?? null,
      demoForms: project.demoForms ?? null,
      contentSections: project.contentSections ?? null,
      mission: project.mission ?? null,
      exampleUseCases: project.exampleUseCases ?? null,
      outcome: project.outcome ?? null,
      tradeoffs:
        project.tradeoffs ??
        project.limitations ??
        project.constraints ??
        null,
      improveNext:
        project.improveNext ??
        project.plannedFeatures ??
        project.userExperienceFindings?.areasForImprovement ??
        null,
      whyItMatters: project.whyItMatters ?? project.conclusion ?? null,
      actions: card?.actions ?? null,
      keywords: compactArray([...(card?.keywords ?? []), ...(project.tags ?? [])]),
      tags: project.tags ?? null,
      link: card?.link ?? project.link ?? null,
      githubRepo: card?.githubRepo ?? project.githubRepo ?? null,
      isService: card?.isService ?? project.isService ?? false,
      isDemo: card?.isDemo ?? project.isDemo ?? false,
      comingSoon: card?.comingSoon ?? project.comingSoon ?? false,
      showComponentAsHero: project.showComponentAsHero ?? false,
    };
  });
}

export function buildProjectIndexBlock() {
  return getUnifiedProjectRecords()
    .map(
      (project) =>
        `- ${project.title} [${project.slug}] (${project.status}) - ${cleanText(
          project.cardDescription || project.description
        )}`
    )
    .join('\n');
}

export function buildProjectKnowledgeBlock() {
  return getUnifiedProjectRecords()
    .map((project) => {
      const body = formatObject(project);
      return [`=== ${project.title} ===`, body].filter(Boolean).join('\n');
    })
    .join('\n\n');
}