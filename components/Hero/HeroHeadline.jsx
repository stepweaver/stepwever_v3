import Link from 'next/link';

export default function HeroHeadline() {
  return (
    <header className='mb-6 sm:mb-10'>
      <h1 className='text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl mb-4 sm:mb-6 leading-tight text-right font-ibm w-full min-h-[6rem] sm:min-h-[10rem] md:min-h-[12rem] lg:min-h-[14rem] xl:min-h-[16rem] 2xl:min-h-[18rem] flex flex-col sm:flex-row items-end justify-end relative overflow-hidden'>
        <div className='relative max-w-[99vw] sm:max-w-[98vw] md:max-w-[95vw] lg:max-w-[90vw] xl:max-w-[85vw] 2xl:max-w-[80vw] break-words'>
          <div className='text-terminal-green font-bold mb-1 sm:mb-2 md:mb-3 whitespace-nowrap'>
            Developer.
          </div>
          <div className='text-terminal-cyan font-bold mb-1 sm:mb-2 md:mb-3 whitespace-nowrap'>
            Problem Solver.
          </div>
          <div className='text-terminal-magenta font-bold whitespace-nowrap'>
            <Link
              href='/yankee-samurai'
              className='border-b-2 border-terminal-magenta/40 hover:border-terminal-magenta hover:shadow-[0_0_16px_rgba(255,85,255,0.35)] transition-all duration-300'
            >
              Yankee Samurai.
            </Link>
          </div>
        </div>
      </h1>
    </header>
  );
}
