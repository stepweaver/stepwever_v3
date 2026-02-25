import { redirect } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Radio } from 'lucide-react';
import { listPublishedDocs } from '@/lib/notion/meshtastic-docs.repo';

const BackgroundCanvas = dynamic(
  () => import('@/components/BackgroundCanvas/BackgroundCanvas')
);

export const revalidate = 60;

const absoluteImageUrl = 'https://stepweaver.dev/images/lambda_preview.png';

export const metadata = {
  title: 'Meshtastic Field Notes',
  description:
    'A beginner-to-operator path for Meshtastic: real hardware, real configs, and real mistakes. T-Beam, Heltec V3, channels, privacy, and range.',
  openGraph: {
    title: 'Meshtastic Field Notes',
    description:
      'A beginner-to-operator path for Meshtastic: real hardware, real configs, and real mistakes.',
    type: 'website',
    url: 'https://stepweaver.dev/meshtastic',
    images: [
      {
        url: absoluteImageUrl,
        width: 1200,
        height: 630,
        alt: 'Meshtastic Field Notes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meshtastic Field Notes',
    description:
      'A beginner-to-operator path for Meshtastic: real hardware, real configs, and real mistakes.',
    images: [absoluteImageUrl],
  },
};

export default async function MeshtasticDocsIndex() {
  const hasDb = !!process.env.NOTION_MESHTASTIC_DOCS_DB_ID;
  let docs = [];
  try {
    docs = await listPublishedDocs();
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[meshtastic] listPublishedDocs:', err);
    }
  }

  if (hasDb && docs.length > 0) {
    redirect(`/meshtastic/${docs[0].slug}`);
  }

  return (
    <div className='relative min-h-screen flex flex-col'>
      <BackgroundCanvas />
      <div className='relative z-10 flex flex-col min-h-screen'>
        {/* System Header */}
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
          <span className='font-ocr text-[10px] text-warn/60 uppercase'>
            Setup required
          </span>
        </header>

        {/* Empty state */}
        <div className='flex-1 flex items-center justify-center px-4'>
          <div className='max-w-lg w-full rounded-sm overflow-hidden border border-neon/15 bg-panel/20'>
            <div className='bg-panel/50 border-b border-neon/20 px-5 py-2.5 flex items-center justify-between'>
              <span className='font-ocr text-[10px] tracking-[0.18em] text-neon/40 uppercase'>
                Status
              </span>
              <span className='font-ocr text-[10px] text-text/20'>
                MESH-00
              </span>
            </div>
            <div className='p-6'>
              <p className='text-neon font-semibold text-lg mb-3 font-ibm'>
                Meshtastic Field Notes
              </p>
              <p className='text-text/60 font-ocr text-sm leading-relaxed'>
                {!hasDb
                  ? 'Configure NOTION_MESHTASTIC_DOCS_DB_ID and share the Meshtastic Docs database with your Notion integration to see published docs here.'
                  : 'No docs published yet. Add pages in Notion with Status = Published.'}
              </p>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <footer className='shrink-0 border-t border-neon/20 bg-panel/60 backdrop-blur-sm px-3 sm:px-5 py-1.5 flex items-center gap-2 sm:gap-3'>
          <span className='font-ocr text-[10px] text-neon/45 whitespace-nowrap'>
            &gt; mesh
          </span>
          <span className='text-neon/15'>│</span>
          <span className='font-ocr text-[10px] text-warn/40 uppercase whitespace-nowrap'>
            Awaiting configuration
          </span>
        </footer>
      </div>
    </div>
  );
}
