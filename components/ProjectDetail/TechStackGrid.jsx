import {
  Code,
  Server,
  CreditCard,
  Palette,
  Zap,
} from 'lucide-react';
import TechStackCard from './TechStackCard';

/**
 * Configuration mapping techStack keys to display metadata.
 * Order determines render order in the grid.
 */
const TECH_SECTIONS = [
  { key: 'frontend', label: 'Frontend', icon: Code },
  { key: 'backend', label: 'Backend & CMS', icon: Server },
  { key: 'payment', label: 'Payment & E-commerce', icon: CreditCard },
  { key: 'development', label: 'Development Tools', icon: Zap },
  { key: 'consulting', label: 'Consulting Services', icon: Server },
  { key: 'automation', label: 'Automation Tools', icon: Zap },
  { key: 'ai', label: 'AI & Machine Learning', icon: Code },
  { key: 'analytics', label: 'Analytics Tools', icon: Code },
  { key: 'contentManagement', label: 'Content Management', icon: Server },
  { key: 'contentAggregation', label: 'Content Aggregation', icon: Code },
  { key: 'utilities', label: 'Utilities', icon: Code },
  { key: 'design', label: 'Design', icon: Palette },
];

/**
 * Data-driven grid that renders TechStackCards for every
 * populated key in `project.techStack`.
 *
 * @param {Object} techStack - The project's techStack object
 */
export default function TechStackGrid({ techStack = {} }) {
  const populatedSections = TECH_SECTIONS.filter(
    (s) => techStack[s.key] && techStack[s.key].length > 0
  );

  if (populatedSections.length === 0) return null;

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
      {populatedSections.map((section) => (
        <TechStackCard
          key={section.key}
          icon={section.icon}
          title={section.label}
          items={techStack[section.key]}
        />
      ))}
    </div>
  );
}
