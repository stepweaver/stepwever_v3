'use client';

import { useEffect, useState } from 'react';
import styles from './Experience.module.css';

export default function Experience() {
  const [currentCategory, setCurrentCategory] = useState(0);

  const techCategories = [
    {
      name: 'Front-End',
      technologies: [
        { name: 'React', icon: '⚛️' },
        { name: 'Next.js 15', icon: '▲' },
        { name: 'Tailwind CSS v4', icon: '🎨' },
        { name: 'shadcn/ui', icon: '🧩' },
        { name: 'MDX', icon: '📝' },
        { name: 'Contentlayer', icon: '📚' },
        { name: 'Vite', icon: '⚡' },
        { name: 'Astro', icon: '🚀' },
      ],
    },
    {
      name: 'Back-End / APIs',
      technologies: [
        { name: 'Node.js', icon: '🟢' },
        { name: 'Express', icon: '🚂' },
        { name: 'Serverless', icon: '☁️' },
        { name: 'AWS Amplify', icon: '⚡' },
        { name: 'Cognito', icon: '🔐' },
        { name: 'Supabase', icon: '🔥' },
        { name: 'Firebase', icon: '🔥' },
        { name: 'REST', icon: '🌐' },
        { name: 'GraphQL', icon: '🔷' },
      ],
    },
    {
      name: 'Data & Analytics',
      technologies: [
        { name: 'PostgreSQL', icon: '🐘' },
        { name: 'MySQL', icon: '🐬' },
        { name: 'dbt', icon: '🔄' },
        { name: 'Airbyte', icon: '🛫' },
        { name: 'Tableau', icon: '📊' },
        { name: 'Power BI', icon: '📈' },
      ],
    },
    {
      name: 'Automation & AI',
      technologies: [
        { name: 'OpenAI', icon: '🤖' },
        { name: 'LangChain', icon: '🔗' },
        { name: 'Zapier', icon: '⚡' },
        { name: 'Make', icon: '🔧' },
        { name: 'FireCrawl', icon: '🕷️' },
      ],
    },
    {
      name: 'Commerce & Integrations',
      technologies: [
        { name: 'Stripe', icon: '💳' },
        { name: 'QuickBooks', icon: '📊' },
        { name: 'Toast POS', icon: '🍞' },
        { name: 'Notion', icon: '📋' },
        { name: 'Google Sheets', icon: '📑' },
        { name: 'Slack', icon: '💬' },
      ],
    },
    {
      name: 'DevOps & Delivery',
      technologies: [
        { name: 'GitHub Actions', icon: '⚙️' },
        { name: 'Vercel', icon: '▲' },
        { name: 'Netlify', icon: '🌐' },
        { name: 'Cloudflare', icon: '☁️' },
        { name: 'Docker', icon: '🐳' },
        { name: 'Fly.io', icon: '✈️' },
      ],
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCategory((prev) => (prev + 1) % techCategories.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [techCategories.length]);

  return (
    <section className='relative z-30 py-20'>
      <div className='px-8 md:px-16 lg:px-24 w-full'>
        {/* Section Header */}
        <div className='mb-16 ml-auto w-full max-w-6xl'>
          <h2 className='text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight text-left font-ibm text-terminal-green font-bold'>
            EXPERIENCE & TECH ARSENAL
          </h2>
          <div className='h-0.5 bg-terminal-green mb-8'></div>

          {/* Description */}
          <p className='text-terminal-text font-ocr text-lg leading-relaxed mb-12'>
            Each tool is chosen for speed, composability, and the freedom to
            hand clients a system they can actually run. When the stack isn't
            enough, λstepweaver builds the missing piece.
          </p>
        </div>

        {/* Tech Arsenal - Compact Rotating Layout */}
        <div className='ml-auto w-full max-w-6xl'>
          {/* Category Navigation */}
          <div className='flex flex-wrap gap-3 mb-8'>
            {techCategories.map((category, index) => (
              <button
                key={category.name}
                onClick={() => setCurrentCategory(index)}
                className={`px-3 py-1 font-ibm text-sm border transition-all duration-300 ${
                  currentCategory === index
                    ? 'border-terminal-green text-terminal-green bg-terminal-dark'
                    : 'border-terminal-border text-terminal-muted hover:border-terminal-green hover:text-terminal-green'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Current Category Display */}
          <div className='mb-6'>
            <h3 className='text-xl lg:text-2xl font-ibm text-terminal-green mb-4 font-bold'>
              {techCategories[currentCategory].name}
            </h3>
          </div>

          {/* Tech Icons - Compact Grid */}
          <div className='grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4'>
            {techCategories[currentCategory].technologies.map((tech, index) => (
              <div
                key={tech.name}
                className={`${styles.techItem} flex flex-col items-center justify-center p-3 border border-terminal-border rounded-lg transition-all duration-500 hover:border-terminal-green hover:bg-terminal-green hover:bg-opacity-5`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className='text-2xl mb-1'>{tech.icon}</div>
                <span className='font-ocr text-terminal-text text-xs text-center leading-tight'>
                  {tech.name}
                </span>
              </div>
            ))}
          </div>

          {/* Category Indicators */}
          <div className='flex justify-center mt-6 gap-2'>
            {techCategories.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentCategory(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentCategory === index
                    ? 'bg-terminal-green'
                    : 'bg-terminal-border hover:bg-terminal-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
