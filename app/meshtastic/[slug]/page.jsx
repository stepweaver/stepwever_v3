import { cache } from 'react';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import {
  getDocBySlug,
  listPublishedDocs,
  groupDocsBySection,
  getFlatDocList,
} from '@/lib/notion/meshtastic-docs.repo';
import { getPageBlocks } from '@/lib/notion-blocks';
import { getHeadingsFromBlocks } from '@/lib/meshtastic-docs-headings';
import NotionBlockBody from '@/components/NotionBlockBody';
import MeshtasticDocsLayout from '@/components/MeshtasticDocs/MeshtasticDocsLayout';
import OnThisPage from '@/components/MeshtasticDocs/OnThisPage';
import MeshtasticDocsDropdown from '@/components/MeshtasticDocs/MeshtasticDocsDropdown';
import DocPrevNext from '@/components/MeshtasticDocs/DocPrevNext';

/** Per-request cache so generateMetadata + page share a single Notion call. */
const getCachedDocBySlug = cache((slug) => getDocBySlug(slug));

const BackgroundCanvas = dynamic(() =>
  import('@/components/BackgroundCanvas/BackgroundCanvas')
);

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  if (!process.env.NOTION_MESHTASTIC_DOCS_DB_ID) return [];
  try {
    const docs = await listPublishedDocs();
    return docs.filter((d) => d.slug).map((d) => ({ slug: d.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const doc = await getCachedDocBySlug(slug);
  if (!doc)
    return { title: 'Not Found', description: 'The page you requested was not found' };
  const title = doc.title || 'Meshtastic Doc';
  const description =
    doc.summary || `${title} – Meshtastic Field Notes | Stephen Weaver`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://stepweaver.dev/meshtastic/${slug}`,
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
}

export default async function MeshtasticDocPage({ params }) {
  const { slug } = await params;

  const doc = await getCachedDocBySlug(slug);
  if (!doc) notFound();

  const [blocks, docs] = await Promise.all([
    getPageBlocks(doc.id, 10),
    listPublishedDocs(),
  ]);
  const grouped = groupDocsBySection(docs);
  const flatList = getFlatDocList(grouped);
  const headings = getHeadingsFromBlocks(blocks);

  const formatUpdated = (lastEditedTime) => {
    if (!lastEditedTime) return '';
    try {
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).format(new Date(lastEditedTime));
    } catch {
      return '';
    }
  };

  return (
    <div className="min-h-screen relative">
      <BackgroundCanvas />
      <div className="relative z-10">
        <MeshtasticDocsLayout
          grouped={grouped}
          currentSlug={doc.slug}
          currentSection={doc.section}
        >
          <div className="flex-1 flex min-h-0 w-full px-4 pt-0 gap-8 xl:flex-row flex-col">
            <div className="min-w-0 flex-1 flex flex-col min-h-0">
              <div className="lg:hidden flex-shrink-0 mb-3">
                <MeshtasticDocsDropdown headings={headings} />
              </div>
              <article className="flex-1 flex flex-col min-h-0 rounded-xl border border-neon/20 bg-panel/50 backdrop-blur overflow-hidden">
                <header className="border-b border-neon/20 px-6 py-5 flex-shrink-0">
                  <div className="max-w-3xl mx-auto">
                    <p className="text-xs tracking-[0.22em] text-neon/60 font-ocr uppercase">{doc.section}</p>
                    <h1 className="text-3xl font-semibold text-neon mt-1">
                      {doc.title}
                    </h1>
                    {doc.summary ? (
                      <p className="mt-2 text-text/80">{doc.summary}</p>
                    ) : null}
                    {doc.lastEditedTime ? (
                      <p className="mt-3 text-xs text-text/60 font-ocr">
                        Updated {formatUpdated(doc.lastEditedTime)}
                      </p>
                    ) : null}
                  </div>
                </header>

                <div className="flex-1 min-h-0 overflow-auto px-6 pb-8 lg:pb-10">
                  <div className="max-w-3xl mx-auto">
                    {blocks.length > 0 ? (
                      <div className="prose prose-invert max-w-none">
                        <NotionBlockBody blocks={blocks} />
                      </div>
                    ) : (
                      <p className="text-text/70">No content yet.</p>
                    )}
                    <DocPrevNext flatList={flatList} currentSlug={doc.slug} />
                  </div>
                </div>
              </article>
            </div>
            <OnThisPage headings={headings} />
          </div>
        </MeshtasticDocsLayout>
      </div>
    </div>
  );
}
