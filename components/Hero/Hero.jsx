import ProjectCard from '../ProjectCard/ProjectCard';
import { GlitchButton } from '../ui';

export default function Hero() {
  // Sample project data
  const projects = [
    {
      title: 'Data Pipeline',
      description:
        'Automated data processing system that reduces manual work by 80% and provides real-time insights.',
      image: '/images/lambda_stepweaver.png',
      tags: ['Python', 'AWS', 'Automation'],
    },
    {
      title: 'Web Dashboard',
      description:
        'High-performance analytics dashboard built with modern web technologies for rapid decision making.',
      image: '/images/lambda_stepweaver.png',
      tags: ['React', 'Node.js', 'Analytics'],
    },
    {
      title: 'API Integration',
      description:
        'Seamless third-party integrations that connect your existing tools and workflows automatically.',
      image: '/images/lambda_stepweaver.png',
      tags: ['REST', 'Webhooks', 'Integration'],
    },
  ];

  return (
    <section className='relative z-30 min-h-screen flex items-center justify-end'>
      <div className='text-left px-8 md:px-16 lg:px-24 w-full'>
        <h1 className='text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] mb-10 leading-tight text-right font-ibm'>
          <span className='text-terminal-green'>Automate.</span>{' '}
          <span className='text-terminal-cyan'>Optimize.</span>{' '}
          <span className='text-terminal-magenta'>Scale.</span>
        </h1>

        {/* Project Cards */}
        <div className='mb-10 max-w-6xl ml-auto'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                image={project.image}
                tags={project.tags}
              />
            ))}
          </div>
        </div>

        <p className='text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-terminal-text mb-10 leading-relaxed max-w-4xl ml-auto leading-tight font-ocr'>
          Growth systems for businesses that move fast and scale without
          friction.
        </p>

        <p className='text-xl md:text-2xl lg:text-3xl text-terminal-text mb-10 leading-relaxed max-w-4xl ml-auto leading-tight font-ocr'>
          At λstepweaver, action comes first. We build lean data pipelines,
          automations, and high-impact web experiences that slash waste and
          surface profit opportunities in weeks—not quarters.
        </p>

        <p className='text-xl md:text-2xl lg:text-3xl text-terminal-text mb-10 leading-relaxed max-w-4xl ml-auto leading-tight font-ocr'>
          TODO:// Catchy tagline here
        </p>
      </div>
    </section>
  );
}
