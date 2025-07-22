import { memo } from 'react';

const ProjectCard = memo(function ProjectCard({
  title,
  description,
  link,
  tags = [],
  keywords = [],
  actions = [],
}) {
  return (
    <div className='bg-terminal-dark border border-terminal-green/15 rounded-lg overflow-hidden transition-all duration-300 group md:h-full'>
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
      <div className='p-3 sm:p-4 bg-terminal-dark flex flex-col md:h-full'>
        {/* Project Title */}
        <h3 className='text-terminal-green font-ibm text-base sm:text-lg mb-2 sm:mb-3 leading-tight'>
          {title}
        </h3>

        {/* Project Description */}
        <p className='text-terminal-text font-ocr text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 md:flex-grow'>
          {description}
        </p>

        {/* Keywords */}
        {keywords.length > 0 && (
          <div className='mb-3 sm:mb-4'>
            <div className='text-terminal-cyan font-ocr text-xs mb-1 sm:mb-2'>
              Keywords:
            </div>
            <div className='flex flex-wrap gap-1'>
              {keywords.map((keyword, index) => (
                <span
                  key={index}
                  className='px-1.5 sm:px-2 py-0.5 sm:py-1 bg-terminal-light/20 text-terminal-cyan font-ocr text-xs rounded border border-terminal-border'
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Sample Actions */}
        {actions.length > 0 && (
          <div className='mb-3 sm:mb-4'>
            <div className='text-terminal-yellow font-ocr text-xs mb-1 sm:mb-2'>
              Sample Actions:
            </div>
            <ul className='space-y-0.5 sm:space-y-1'>
              {actions.map((action, index) => (
                <li
                  key={index}
                  className='text-terminal-text font-ocr text-xs leading-relaxed flex items-start'
                >
                  <span className='text-terminal-green mr-1.5 sm:mr-2 flex-shrink-0'>
                    •
                  </span>
                  <span className='text-xs'>{action}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Terminal Prompt - Always at bottom */}
        <div className='text-terminal-dimmed font-ocr text-xs md:mt-auto pt-2 border-t border-terminal-border/30'>
          <span className='text-terminal-green'>guest@stepweaver.dev</span>
          <span className='text-terminal-text'> ~ </span>
          <span className='text-terminal-cyan'>λ</span>
          <span className='text-terminal-text'>
            {' '}
            open {title.toLowerCase().replace(/\s+/g, '-')}
          </span>
        </div>
      </div>
    </div>
  );
});

export default ProjectCard;
