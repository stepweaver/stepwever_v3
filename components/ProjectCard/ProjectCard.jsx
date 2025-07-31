import { memo } from 'react';
import GlitchLambda from '@/components/ui/GlitchLambda';

const ProjectCard = memo(function ProjectCard({
  title,
  description,
  link,
  imageUrl,
  tags = [],
  keywords = [],
  actions = [],
}) {
  const handleClick = () => {
    if (link) {
      if (link.startsWith('http')) {
        // External link - open in new window
        window.open(link, '_blank', 'noopener,noreferrer');
      } else {
        // Internal link - navigate
        window.location.href = link;
      }
    }
  };

  return (
    <div
      className={`bg-terminal-dark border border-terminal-green/15 rounded-lg overflow-hidden transition-all duration-300 group h-full ${
        link
          ? 'cursor-pointer hover:border-terminal-green/50 hover:shadow-lg hover:shadow-terminal-green/20'
          : ''
      }`}
      onClick={link ? handleClick : undefined}
    >
      {/* Terminal Header */}
      <div className='bg-terminal-light px-3 py-2 border-b border-terminal-border flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <div className='w-3 h-3 bg-terminal-red rounded-full'></div>
          <div className='w-3 h-3 bg-terminal-yellow rounded-full'></div>
          <div className='w-3 h-3 bg-terminal-green rounded-full'></div>
        </div>
        <div className='text-terminal-dimmed text-xs sm:text-sm font-ocr truncate max-w-[60%]'>
          {title}
        </div>
      </div>

      {/* Terminal Content */}
      <div className='p-3 sm:p-4 bg-terminal-dark flex flex-col h-full'>
        {/* Project Image */}
        {imageUrl && (
          <div className='mb-2 sm:mb-3 border border-terminal-border rounded overflow-hidden h-32 sm:h-48'>
            <img
              src={imageUrl}
              alt={title}
              className='w-full h-full object-cover object-top'
              loading='lazy'
            />
          </div>
        )}
        {!imageUrl && (
          <div className='mb-2 sm:mb-3 border border-terminal-border rounded overflow-hidden h-32 sm:h-48'>
            <img
              src='/images/lambda_preview.png'
              alt='Project preview'
              className='w-full h-full object-cover object-center'
              loading='lazy'
            />
          </div>
        )}
        {/* Project Title */}
        <h3 className='text-terminal-green font-ibm text-sm sm:text-base mb-1 sm:mb-2 leading-tight'>
          {title}
        </h3>

        {/* Project Description */}
        <p
          className='text-terminal-text font-ocr text-xs leading-relaxed mb-2 sm:mb-3 flex-grow overflow-hidden'
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {description}
        </p>

        {/* Keywords */}
        {keywords.length > 0 && (
          <div className='mb-2 sm:mb-3'>
            <div className='text-terminal-cyan font-ocr text-xs mb-1'>
              Keywords:
            </div>
            <div className='flex flex-wrap gap-1'>
              {keywords.map((keyword, index) => (
                <span
                  key={index}
                  className='px-1 py-0.5 bg-terminal-light/20 text-terminal-cyan font-ocr text-xs rounded border border-terminal-border'
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Sample Actions */}
        {actions.length > 0 && (
          <div className='mb-2 sm:mb-3'>
            <div className='text-terminal-yellow font-ocr text-xs mb-1'>
              Sample Actions:
            </div>
            <ul className='space-y-0.5'>
              {actions.slice(0, 2).map((action, index) => (
                <li
                  key={index}
                  className='text-terminal-text font-ocr text-xs leading-relaxed flex items-start'
                >
                  <span className='text-terminal-green mr-1 flex-shrink-0'>
                    •
                  </span>
                  <span
                    className='text-xs overflow-hidden'
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {action}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Bottom spacing to prevent cutoff */}
        <div className='mt-auto pt-2'></div>
      </div>
    </div>
  );
});

export default ProjectCard;
