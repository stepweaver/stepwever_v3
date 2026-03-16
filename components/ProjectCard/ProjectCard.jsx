import { memo } from 'react';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage/OptimizedImage';
import { HUDPanel } from '@/components/ui/HUDPanel';

const ProjectCard = memo(function ProjectCard({
  title,
  description,
  link,
  imageUrl,
  tags = [],
  keywords = [],
  actions = [],
  slug,
  isLCP = false,
  isService = false,
  comingSoon = false,
  isDemo = false,
}) {
  const cardContent = (
    <HUDPanel
      title={title}
      className="h-full flex flex-col transition-all duration-200 hover:-translate-y-0.5 min-h-[580px]"
    >
      <div className='flex items-center gap-2 mb-4'>
        <div className='flex gap-1.5'>
          <span className='w-2.5 h-2.5 rounded-full bg-danger' />
          <span className='w-2.5 h-2.5 rounded-full bg-warn' />
          <span className='w-2.5 h-2.5 rounded-full bg-neon' />
        </div>
        <div className='flex items-center gap-1.5 ml-auto'>
          {comingSoon && (
            <span className='text-[10px] text-warn font-ocr uppercase tracking-wider px-2 py-0.5 border border-warn/50 rounded'>
              {slug === 'lcerebro' ? 'Build in Progress' : 'Coming Soon'}
            </span>
          )}
          {isDemo && !comingSoon && (
            <span className='text-[10px] text-accent font-ocr uppercase tracking-wider px-2 py-0.5 border border-accent/60 rounded'>
              Demo
            </span>
          )}
          {keywords.length > 0 && (
            <span className='text-xs text-muted font-ocr uppercase tracking-wider'>
              {keywords[0]}
            </span>
          )}
        </div>
      </div>

      {imageUrl && (
        <div
          className={`relative mb-4 w-full border border-neon/20 overflow-hidden rounded-sm ${
            slug === 'neon-profile-card'
                ? 'h-48 sm:h-56 bg-panel/50'
                : slug === 'lcerebro'
                  ? 'h-48 sm:h-56 bg-black'
                  : 'h-48 sm:h-56'
          }`}
        >
          <OptimizedImage
            src={imageUrl}
            alt={title}
            className={`transition-transform duration-300 hover:scale-105 ${
              slug === 'neon-profile-card' || slug === 'lcerebro'
                ? 'object-contain object-center'
                : slug === 'ai-integrations' ||
                    slug === 'n8n-automations' ||
                    slug === 'it-consulting' ||
                    slug === 'silent-auction' ||
                    slug === 'bill-planner' ||
                    slug === 'orthodontic-tracker' ||
                    slug === 'service-business-demo' ||
                    slug === 'mishawaka-shower-booking'
                  ? 'object-cover object-center scale-105'
                  : slug === 'llambda-llm-agent'
                    ? 'object-cover object-center'
                    : 'object-cover object-top'
            }`}
            priority={isLCP}
            sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px'
          />
        </div>
      )}
      {!imageUrl && (
        <div className='relative mb-4 border border-neon/20 overflow-hidden rounded-sm h-48 sm:h-56'>
          <OptimizedImage
            src='/images/screely-llambda.png'
            alt='Project preview'
            className='object-cover object-center transition-transform duration-300 hover:scale-105'
            sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px'
          />
        </div>
      )}

      {description && (
        <p className='text-sm text-text/80 font-ibm mb-4'>
          {description}
        </p>
      )}

      {actions.length > 0 && (
        <div className='mb-4 flex-1'>
          <div className='text-xs text-neon/70 font-ocr uppercase tracking-wider mb-2'>KEY FEATURES:</div>
          <ul className='space-y-1.5'>
            {actions.slice(0, 2).map((action, index) => (
              <li key={index} className='text-xs text-text/70 font-ibm flex items-start'>
                <span className='text-neon mr-2 flex-shrink-0 mt-0.5'>▶</span>
                <span className='line-clamp-2'>{action}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {tags.length > 0 && (
        <div className='flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-neon/10'>
          {tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className='text-[10px] text-neon/60 font-ocr uppercase tracking-wider px-2 py-0.5 border border-neon/20 rounded'
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </HUDPanel>
  );

  return (
    <article className='h-full flex flex-col'>
      {cardContent}
    </article>
  );
});

export default ProjectCard;
