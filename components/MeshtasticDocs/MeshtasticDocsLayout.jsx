import dynamic from 'next/dynamic';
import { Radio } from 'lucide-react';
import MeshtasticDocsSidebar from './MeshtasticDocsSidebar';

const BackgroundCanvas = dynamic(
  () => import('@/components/BackgroundCanvas/BackgroundCanvas')
);

export default function MeshtasticDocsLayout({
  grouped,
  currentSlug,
  currentSection,
  children,
  hasFieldNotes = false,
}) {
  return (
    <div className='relative min-h-screen flex flex-col'>
      <BackgroundCanvas />

      <div className='relative z-10 flex flex-col min-h-screen'>
        {/* ── System Header ── */}
        <header className='shrink-0 border-b border-neon/20 bg-panel/60 backdrop-blur-sm px-3 sm:px-5 py-2 flex items-center justify-between gap-4'>
          <div className='flex items-center gap-2.5'>
            <Radio className='w-3.5 h-3.5 text-neon/60' />
            <span className='font-ocr text-[10px] tracking-[0.3em] text-neon/50 uppercase'>
              MESH-00
            </span>
            <span className='text-neon/15 hidden sm:inline'>│</span>
            <span className='font-ibm text-xs text-text/50 hidden sm:inline'>
              λstepweaver mesh docs
            </span>
          </div>
          <div className='flex items-center gap-2.5'>
            <span className='inline-flex items-center gap-1.5'>
              <span className='relative flex h-2 w-2'>
                <span className='absolute inline-flex h-full w-full rounded-full bg-neon opacity-40 motion-safe:animate-ping' />
                <span className='relative inline-flex h-2 w-2 rounded-full bg-neon' />
              </span>
              <span className='font-ocr text-[10px] tracking-[0.15em] text-neon/60 uppercase'>
                Active
              </span>
            </span>
          </div>
        </header>

        {/* ── Main area: sidebar + content ── */}
        <div className='flex-1 flex flex-col lg:flex-row'>
          <div className='hidden lg:block lg:w-64 xl:w-72 lg:flex-shrink-0 lg:sticky lg:top-16 lg:self-start lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto lg:border-r lg:border-neon/15'>
            <MeshtasticDocsSidebar
              grouped={grouped}
              currentSlug={currentSlug}
              currentSection={currentSection}
              hasFieldNotes={hasFieldNotes}
            />
          </div>

          <main className='flex-1 min-w-0 pt-4 sm:pt-6'>{children}</main>
        </div>

        {/* ── Status Bar ── */}
        <footer className='shrink-0 border-t border-neon/20 bg-panel/60 backdrop-blur-sm px-3 sm:px-5 py-1.5 flex items-center gap-2 sm:gap-3'>
          <span className='font-ocr text-[10px] text-neon/45 whitespace-nowrap'>
            &gt; mesh
          </span>
          <span className='text-neon/15'>│</span>
          <span className='font-ocr text-[10px] text-text/25 uppercase whitespace-nowrap'>
            Documentation
          </span>
          <span className='text-neon/15 hidden sm:inline'>│</span>
          <span className='font-ocr text-[10px] text-text/25 uppercase whitespace-nowrap hidden sm:inline'>
            Off-grid comms
          </span>
          <span className='text-neon/15 hidden md:inline'>│</span>
          <span className='font-ocr text-[10px] text-text/20 uppercase whitespace-nowrap hidden md:inline'>
            Revalidates every 60s
          </span>
        </footer>
      </div>
    </div>
  );
}
