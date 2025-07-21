import ProjectCard from '@/components/ProjectCard/ProjectCard';

export default function Hero() {
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
      </div>
    </section>
  );
}
