import GlitchLambda from '@/components/ui/GlitchLambda';

export default function TerminalLink() {
  return (
    <div className='max-w-6xl ml-auto mb-6 sm:mb-10'>
      <a
        href='/terminal'
        className='inline-flex items-center gap-2 sm:gap-3 text-terminal-cyan hover:text-terminal-green transition-all duration-300 font-ibm text-base sm:text-xl md:text-2xl hover:scale-105'
      >
        <GlitchLambda className='text-terminal-green text-lg sm:text-2xl md:text-3xl' />
        <span className='font-bold whitespace-nowrap'>
          Explore my terminal
        </span>
        <span className='text-terminal-green text-lg sm:text-2xl md:text-3xl animate-pulse'>
          →
        </span>
      </a>
    </div>
  );
}
