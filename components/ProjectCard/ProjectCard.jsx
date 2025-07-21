import { memo } from 'react';

const ProjectCard = memo(function ProjectCard({
  title,
  description,
  link,
  tags = [],
}) {
  return (
    <div className='bg-terminal-dark border border-terminal-green/15 rounded-lg overflow-hidden shadow-[0_15px_30px_-5px_rgba(0,0,0,0.6),0_10px_10px_-5px_rgba(0,0,0,0.5),0_0_10px_rgba(0,255,65,0.3),0_0_1px_rgba(0,255,65,0.7),0_0_20px_rgba(0,255,65,0.3)] hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.7),0_15px_15px_-5px_rgba(0,0,0,0.6),0_0_15px_rgba(0,255,65,0.4),0_0_2px_rgba(0,255,65,0.8),0_0_25px_rgba(0,255,65,0.4)] transition-all duration-300 group'>
      {/* Terminal Header */}
      <div className='bg-terminal-light px-3 py-2 border-b border-terminal-border flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <div className='w-3 h-3 bg-terminal-red rounded-full'></div>
          <div className='w-3 h-3 bg-terminal-yellow rounded-full'></div>
          <div className='w-3 h-3 bg-terminal-green rounded-full'></div>
        </div>
        <div className='text-terminal-dimmed text-sm font-ocr'>{title}</div>
      </div>

      {/* Terminal Content */}
      <div className='p-4 bg-terminal-dark flex flex-col'>
        {/* Project Title */}
        <h3 className='text-terminal-green font-ibm text-lg mb-3'>{title}</h3>

        {/* Project Description */}
        <p className='text-terminal-text font-ocr text-sm leading-relaxed mb-4 flex-grow'>
          {description}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className='flex flex-wrap gap-1 mb-4'>
            {tags.map((tag, index) => (
              <span
                key={index}
                className='px-2 py-1 bg-terminal-light/20 text-terminal-cyan font-ocr text-xs rounded border border-terminal-border'
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Terminal Prompt */}
        <div className='text-terminal-dimmed font-ocr text-xs'>
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
