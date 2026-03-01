import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Radio } from 'lucide-react';

const BackgroundCanvas = dynamic(
  () => import('@/components/BackgroundCanvas/BackgroundCanvas')
);

export default function MeshtasticDashboardLayout({ children }) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <BackgroundCanvas />

      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="shrink-0 border-b border-neon/20 bg-panel/60 backdrop-blur-sm px-3 sm:px-5 py-2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Radio className="w-3.5 h-3.5 text-neon/60" />
            <span className="font-ocr text-[10px] tracking-[0.3em] text-neon/50 uppercase">
              MESH-00
            </span>
            <span className="text-neon/15 hidden sm:inline">│</span>
            <span className="font-ibm text-xs text-text/50 hidden sm:inline">
              Mesh Dashboard
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <Link
              href="/meshtastic"
              className="font-ocr text-[10px] text-neon/60 hover:text-neon uppercase tracking-wider"
            >
              Docs
            </Link>
            <span className="inline-flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-neon opacity-40 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-neon" />
              </span>
              <span className="font-ocr text-[10px] tracking-[0.15em] text-neon/60 uppercase">
                Live
              </span>
            </span>
          </div>
        </header>

        <main className="flex-1 min-w-0 pt-4 sm:pt-6">{children}</main>

        <footer className="shrink-0 border-t border-neon/20 bg-panel/60 backdrop-blur-sm px-3 sm:px-5 py-1.5 flex items-center gap-2 sm:gap-3">
          <span className="font-ocr text-[10px] text-neon/45 whitespace-nowrap">
            &gt; mesh dashboard
          </span>
          <span className="text-neon/15">│</span>
          <span className="font-ocr text-[10px] text-text/25 uppercase whitespace-nowrap">
            Polls every 8s
          </span>
        </footer>
      </div>
    </div>
  );
}
