import Link from 'next/link';
import GlitchLambda from '@/components/ui/GlitchLambda';

const linkClass =
  'inline-flex items-center gap-2 sm:gap-3 text-terminal-cyan hover:text-terminal-green transition-all duration-300 font-ibm text-base sm:text-xl md:text-2xl hover:scale-105';

export default function TerminalLink() {
  return (
    <div className='mb-6 sm:mb-10 flex flex-wrap gap-4 sm:gap-6'>
      <Link href='/terminal' className={linkClass}>
        <GlitchLambda className='text-terminal-green text-lg sm:text-2xl md:text-3xl' />
        <span className='font-bold whitespace-nowrap'>Explore my terminal</span>
        <span className='text-terminal-green text-lg sm:text-2xl md:text-3xl motion-safe:animate-pulse'>
          →
        </span>
      </Link>
      <Link href='/meshtastic' className={linkClass}>
        <span className='font-bold whitespace-nowrap'>//\ Meshtastic</span>
        <span className='text-terminal-green text-lg sm:text-2xl md:text-3xl motion-safe:animate-pulse'>
          →
        </span>
      </Link>
      <Link href='/dice-roller' className={linkClass}>
        <span className='font-bold whitespace-nowrap'>Dice Roller</span>
        <span className='text-terminal-green text-lg sm:text-2xl md:text-3xl motion-safe:animate-pulse'>
          →
        </span>
      </Link>
    </div>
  );
}
