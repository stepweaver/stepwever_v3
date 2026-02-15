import { redirect } from 'next/navigation';
import dynamic from 'next/dynamic';
import { listPublishedDocs } from '@/lib/notion/meshtastic-docs.repo';

const BackgroundCanvas = dynamic(() =>
  import('@/components/BackgroundCanvas/BackgroundCanvas')
);

export const revalidate = 60;

export const metadata = {
  title: 'Meshtastic Field Notes',
  description:
    'A beginner-to-operator path for Meshtastic: real hardware, real configs, and real mistakes. T-Beam, Heltec V3, channels, privacy, and range.',
};

/**
 * /meshtastic redirects to the first doc (Introduction) so we open straight
 * into the intro, like the official Meshtastic docs.
 * Falls back to a setup/empty-state message when there are no published docs.
 */
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
    <div className="min-h-screen relative">
      <BackgroundCanvas />
      <div className="relative z-10 flex items-center justify-center min-h-[60vh] px-4">
        <div className="max-w-2xl rounded-sm bg-panel/50 backdrop-blur p-8 shadow-neon-sm">
          <div className="flex items-start justify-between gap-4 mb-3">
            <p className="text-xs tracking-[0.28em] text-neon/70 font-ocr uppercase">STATUS</p>
            <div className="text-right text-xs text-muted font-mono shrink-0">
              <div className="tracking-[0.22em] text-neon/50 uppercase font-ocr text-[10px]">ID</div>
              <div className="font-mono text-neon/80 whitespace-nowrap">MESH-00</div>
            </div>
          </div>
          <p className="text-neon font-semibold text-lg mb-3 font-ibm [text-shadow:var(--terminal-title-glow)]">
            Meshtastic Field Notes
          </p>
          <p className="text-text/80 font-ocr text-sm leading-relaxed">
            {!hasDb
              ? 'Configure NOTION_MESHTASTIC_DOCS_DB_ID and share the Meshtastic Docs database with your Notion integration to see published docs here.'
              : 'No docs published yet. Add pages in Notion with Status = Published.'}
          </p>
        </div>
      </div>
    </div>
  );
}
