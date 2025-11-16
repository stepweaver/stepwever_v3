import { memo } from 'react';
import Link from 'next/link';

const ProjectCard = memo(function ProjectCard({
  title,
  description,
  link,
  imageUrl,
  tags = [],
  keywords = [],
  actions = [],
  slug,
}) {
  const handleExternalClick = (e) => {
    e.preventDefault();
    if (link && link.startsWith('http')) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  const cardContent = (
    <>
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
      <div className='p-3 sm:p-4 bg-terminal-dark/30 backdrop-blur-xl flex flex-col h-full'>
        {/* Project Image */}
        {imageUrl && (
          <div className='mb-2 sm:mb-3 border border-terminal-border cyber-border-sm overflow-hidden h-36 sm:h-56'>
            <img
              src={imageUrl}
              alt={title}
              className='w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105'
              loading='lazy'
            />
          </div>
        )}
        {!imageUrl && (
          <div className='mb-2 sm:mb-3 border border-terminal-border cyber-border-sm overflow-hidden h-36 sm:h-56'>
            <img
              src='/images/lambda_preview.png'
              alt='Project preview'
              className='w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105'
              loading='lazy'
            />
          </div>
        )}

        {/* Project Title */}
        <h3 className='text-terminal-green font-ibm text-sm sm:text-base mb-2 sm:mb-3 leading-tight'>
          {title}
        </h3>

        {/* Keywords as Category */}
        {keywords.length > 0 && (
          <div className='mb-2 sm:mb-3'>
            <span className='inline-block bg-terminal-green/20 text-terminal-green text-xs font-ocr px-2 py-1 cyber-border-sm cyber-border-green'>
              {keywords[0]}
            </span>
          </div>
        )}

        {/* Sample Actions - simplified */}
        {actions.length > 0 && (
          <div className='mb-2 sm:mb-3'>
            <div className='text-terminal-cyan font-ibm text-xs mb-1'>
              KEY FEATURES:
            </div>
            <ul className='space-y-1'>
              {actions.slice(0, 2).map((action, index) => (
                <li
                  key={index}
                  className='text-terminal-yellow font-ibm text-xs flex'
                >
                  <span className='text-terminal-green mr-2'>▶</span>
                  {action}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Bottom spacing */}
        <div className='mt-auto pt-2 sm:pt-4'></div>
      </div>
    </>
  );

  // Match SuccessStories structure exactly - plain article element (no Link wrapper)
  // Navigation handled by parent carousel
  return (
    <article className='bg-terminal-dark/30 backdrop-blur-xl cyber-border cyber-border-green overflow-hidden transition-all duration-300 group h-full flex flex-col hover:border-terminal-green/50 hover:shadow-lg hover:shadow-terminal-green/20 card-glow-tight'>
      {cardContent}
    </article>
  );
});

export default ProjectCard;
