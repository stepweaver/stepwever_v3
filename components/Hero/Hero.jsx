import ProjectCard from '@/components/ProjectCard/ProjectCard';

export default function Hero() {
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
        <h1 className='text-4xl sm:text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] mb-10 leading-tight text-right font-ibm'>
          <span className='text-terminal-green'>Automate.</span>{' '}
          <span className='text-terminal-cyan'>Optimize.</span>{' '}
          <span className='text-terminal-magenta'>Scale.</span>
        </h1>

        <p className='text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-terminal-text mb-10 leading-relaxed max-w-4xl ml-auto leading-tight font-ocr'>
          Growth systems for businesses that move fast and scale without
          friction.
        </p>

        <p className='text-xl md:text-2xl lg:text-3xl text-terminal-text mb-10 leading-relaxed max-w-4xl ml-auto leading-tight font-ocr'>
          At λstepweaver, action comes first. We build lean data pipelines,
          automations, and high-impact web experiences that slash waste and
          surface profit opportunities in weeks—not quarters.
        </p>

        <p className='text-xl md:text-2xl lg:text-3xl text-terminal-text mb-10 leading-relaxed max-w-4xl ml-auto leading-tight font-ocr'>
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
