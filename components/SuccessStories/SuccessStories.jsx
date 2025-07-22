'use client';

import { memo } from 'react';

const SuccessStories = memo(() => {
  const stories = [
    {
      title: 'Notre Dame Reporting Overhaul',
        description:
          'As business analyst, I learned SQL and built custom Tableau dashboards to replace the terrible off-the-shelf reporting software, delivering 10× faster ad-hoc reporting and achieving 100% adoption across campus ID operations.',
      metrics: [
        '10× faster ad-hoc reporting',
        '100% adoption across campus ID operations',
      ],
      category: 'Data & Analytics',
    },
    {
      title: 'Small-Business Sites',
      description:
        'Solo designer-dev shipping modern, mobile-first marketing sites with exceptional performance and rapid delivery times.',
      metrics: [
        'Modern mobile-first design',
        'Rapid delivery',
        'Owner satisfaction',
      ],
      category: 'Web Development',
    },
    {
      title: 'Python Desktop App (Google APIs)',
      description:
        'Built a 0→1 tool using new stacks and AI tooling to automate workflows, replacing manual daily exports with automated solutions.',
      metrics: ['Built a 0→1 tool', 'Automated daily exports'],
      category: 'Automation & AI',
    },
    {
      title: 'Portfolio + Job-Hunt Sprint',
      description:
        'Demonstrated AI-assisted rapid iteration and tangible career benefits through strategic portfolio development and deployment.',
      metrics: [
        'Interview + offer on same day',
        'Recent Software Engineer interview',
      ],
      category: 'Career Development',
    },
  ];

  return (
    <section
      id='success-stories'
      className='relative z-30 flex items-start pt-8'
    >
      <div className='text-left px-8 md:px-16 lg:px-24 w-full'>
        {/* Main heading */}
        <h2 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-12 md:mb-16 leading-tight text-left font-ibm text-terminal-green'>
          SELECTED SUCCESS STORIES
        </h2>

        {/* Four columns grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 max-w-full'>
          {stories.map((story, index) => (
            <div
              key={index}
              className='bg-terminal-dark border border-terminal-green/15 rounded-lg overflow-hidden shadow-[0_15px_30px_-5px_rgba(0,0,0,0.6),0_10px_10px_-5px_rgba(0,0,0,0.5),0_0_10px_rgba(0,255,65,0.3),0_0_1px_rgba(0,255,65,0.7),0_0_20px_rgba(0,255,65,0.3)] hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.7),0_15px_15px_-5px_rgba(0,0,0,0.6),0_0_15px_rgba(0,255,65,0.4),0_0_2px_rgba(0,255,65,0.8),0_0_25px_rgba(0,255,65,0.4)] transition-all duration-300 group cursor-pointer'
            >
              {/* Terminal Header */}
              <div className='bg-terminal-light px-3 py-2 border-b border-terminal-border flex items-center justify-between'>
                <div className='flex items-center space-x-2'>
                  <div className='w-3 h-3 bg-terminal-red rounded-full'></div>
                  <div className='w-3 h-3 bg-terminal-yellow rounded-full'></div>
                  <div className='w-3 h-3 bg-terminal-green rounded-full'></div>
                </div>
                <div className='text-terminal-dimmed text-xs font-ocr'>
                  ~/story-{index + 1}
                </div>
              </div>

              {/* Terminal Content */}
              <div className='p-4 bg-terminal-dark min-h-[280px] flex flex-col'>
                {/* Category Tag */}
                <div className='mb-2'>
                  <span className='inline-block bg-terminal-green/20 text-terminal-green text-xs font-ocr px-2 py-1 rounded border border-terminal-green/30'>
                    {story.category}
                  </span>
                </div>

                {/* Story Title */}
                <h3 className='text-terminal-green font-ibm text-base mb-3 leading-tight'>
                  {story.title}
                </h3>

                {/* Story Description */}
                <p className='text-terminal-text font-ocr text-xs leading-relaxed mb-4 flex-grow'>
                  {story.description}
                </p>

                {/* Metrics */}
                <div className='mb-3'>
                  <h4 className='text-terminal-cyan font-ibm text-xs mb-2'>
                    KEY METRICS:
                  </h4>
                  <ul className='space-y-1'>
                    {story.metrics.map((metric, metricIndex) => (
                      <li
                        key={metricIndex}
                        className='text-terminal-yellow font-ocr text-xs flex items-start'
                      >
                        <span className='text-terminal-green mr-2'>▶</span>
                        {metric}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Terminal Prompt */}
                <div className='text-terminal-dimmed font-ocr text-xs mt-auto'>
                  <span className='text-terminal-green'>
                    guest@stepweaver.dev
                  </span>
                  <span className='text-terminal-text'> ~ </span>
                  <span className='text-terminal-cyan'>λ</span>
                  <span className='text-terminal-text'> success-stories</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default SuccessStories;
