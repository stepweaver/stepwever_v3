'use client';

import { useState, useEffect } from 'react';
import ProjectCard from '@/components/ProjectCard/ProjectCard';

export default function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const words = [
    { text: 'Automate', color: 'text-terminal-green' },
    { text: 'Optimize', color: 'text-terminal-cyan' },
    { text: 'Scale', color: 'text-terminal-magenta' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setIsVisible(true);
      }, 150); // Half of the fade transition time
    }, 2750); // 2.75 seconds per word

    return () => clearInterval(interval);
  }, [words.length]);

  const projects = [
    {
      title: 'Data Pipeline Automation',
      description:
        'Built a comprehensive data pipeline that processes 10M+ records daily, reducing manual work by 95% and providing real-time insights.',
      image: '/images/lambda_stepweaver.png',
      link: '/projects/data-pipeline',
      tags: ['Data & Analytics', 'Automation', 'Python'],
    },
    {
      title: 'E-commerce Optimization',
      description:
        'Developed a high-performance e-commerce platform with automated inventory management and personalized recommendations.',
      image: '/images/lambda_stepweaver.png',
      link: '/projects/ecommerce',
      tags: ['Web Development', 'E-commerce', 'React'],
    },
    {
      title: 'Growth Analytics Dashboard',
      description:
        'Created a real-time analytics dashboard that tracks key metrics and provides actionable insights for business growth.',
      image: '/images/lambda_stepweaver.png',
      link: '/projects/analytics',
      tags: ['Analytics', 'Dashboard', 'Data Visualization'],
    },
  ];

  return (
    <section className='relative z-30 min-h-screen flex items-center justify-end'>
      <div className='text-left px-8 md:px-16 lg:px-24 w-full'>
        <h1 className='text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[12rem] mb-10 leading-tight text-right font-ibm w-full h-[8rem] sm:h-[10rem] md:h-[12rem] lg:h-[14rem] xl:h-[16rem] flex flex-col sm:flex-row items-end justify-end'>
          <span
            className={`${
              words[currentWordIndex].color
            } transition-opacity duration-300 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {words[currentWordIndex].text}
          </span>
          <span className='text-terminal-text italic sm:ml-2'>fast.</span>
        </h1>

        <p className='text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-terminal-text mb-10 max-w-4xl ml-auto leading-tight font-ocr'>
          Growth systems for businesses that move fast and scale without
          friction.
        </p>

        <p className='text-xl md:text-2xl lg:text-3xl text-terminal-text mb-10 max-w-4xl ml-auto leading-tight font-ocr'>
          At λstepweaver, action comes first. We build lean data pipelines,
          automations, and high-impact web experiences that slash waste and
          surface profit opportunities in weeks—not quarters.
        </p>

        <p className='text-xl md:text-2xl lg:text-3xl text-terminal-text mb-10 max-w-4xl ml-auto leading-tight font-ocr'>
          From concept to deployment in record time.
        </p>

        {/* Project Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16'>
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              link={project.link}
              tags={project.tags}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
