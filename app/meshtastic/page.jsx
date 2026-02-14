import dynamic from 'next/dynamic';
import { listPublishedDocs, groupDocsBySection, getFlatDocList } from '@/lib/notion/meshtastic-docs.repo';
import MeshtasticDocsLayout from '@/components/MeshtasticDocs/MeshtasticDocsLayout';
import MeshtasticDocsDropdown from '@/components/MeshtasticDocs/MeshtasticDocsDropdown';
import DocPrevNext from '@/components/MeshtasticDocs/DocPrevNext';

const BackgroundCanvas = dynamic(() =>
  import('@/components/BackgroundCanvas/BackgroundCanvas')
);

export const revalidate = 60;

export const metadata = {
  title: 'Meshtastic Field Notes',
  description:
    'A beginner-to-operator path for Meshtastic: real hardware, real configs, and real mistakes. T-Beam, Heltec V3, channels, privacy, and range.',
};

export default async function MeshtasticDocsIndex() {
  let docs = [];
  let hasDb = !!process.env.NOTION_MESHTASTIC_DOCS_DB_ID;
  try {
    docs = await listPublishedDocs();
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[meshtastic] listPublishedDocs:', err);
    }
  }
  const grouped = groupDocsBySection(docs);
  const flatList = getFlatDocList(docs);

  return (
    <div className="min-h-screen relative">
      <BackgroundCanvas />
      <div className="relative z-10">
        <MeshtasticDocsLayout
          grouped={grouped}
          currentSlug={null}
          currentSection={null}
        >
          <div className="flex-1 flex flex-col min-h-0 w-full px-4 pt-0">
            <div className="lg:hidden flex-shrink-0 mb-3 lg:mb-0">
              <MeshtasticDocsDropdown grouped={grouped} currentSlug={null} currentSection={null} />
            </div>
            <div className="flex-1 flex flex-col min-h-0 rounded-xl border border-neon/20 bg-panel/50 backdrop-blur">
              <div className="flex-1 flex flex-col min-h-0 overflow-auto">
                <header className="border-b border-neon/20 px-6 py-5 flex-shrink-0">
                  <div className="max-w-2xl mx-auto">
                    <p className="text-xs tracking-[0.28em] text-neon/70 font-ocr uppercase">Introduction</p>
                    <h1 className="text-3xl font-semibold text-neon mt-1">
                      Meshtastic Field Notes
                    </h1>
                    <p className="mt-2 text-text/80">
                      A beginner-to-operator path, written from real mistakes, real
                      configs, and real hardware.
                    </p>
                  </div>
                </header>

                <div className="p-6 pb-8 lg:pb-10 flex-1">
                  <div className="max-w-2xl mx-auto">
                    {!hasDb || docs.length === 0 ? (
                      <div className="rounded-lg border border-neon/10 bg-black/20 p-6 text-text/80 font-ocr text-sm">
                        {!hasDb
                          ? 'Configure NOTION_MESHTASTIC_DOCS_DB_ID and share the Meshtastic Docs database with your Notion integration to see published docs here.'
                          : 'No docs published yet. Add pages in Notion with Status = Published.'}
                      </div>
                    ) : (
                      <p className="text-text/90 leading-relaxed">
                        Meshtastic® is a project that enables you to use inexpensive LoRa radios as a long-range
                        off-grid communication platform in areas without existing or reliable communications
                        infrastructure. This project is 100% community driven and open source. These field notes
                        are a beginner-to-operator path: real hardware, real configs, and real mistakes.
                      </p>
                    )}

                    <DocPrevNext flatList={flatList} currentSlug={null} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MeshtasticDocsLayout>
      </div>
    </div>
  );
}
