import { cache } from 'react';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import {
  getDocBySlug,
  listPublishedDocs,
  groupDocsBySection,
  getFlatDocList,
  listFieldNotes,
} from '@/lib/notion/meshtastic-docs.repo';
import { getPageBlocks } from '@/lib/notion-blocks';
import { getHeadingsFromBlocks } from '@/lib/meshtastic-docs-headings';
import NotionBlockBody from '@/components/NotionBlockBody';
import MeshtasticDocsLayout from '@/components/MeshtasticDocs/MeshtasticDocsLayout';
import OnThisPage from '@/components/MeshtasticDocs/OnThisPage';
import MeshtasticDocsDropdown from '@/components/MeshtasticDocs/MeshtasticDocsDropdown';
import MeshtasticDocsMobileNav from '@/components/MeshtasticDocs/MeshtasticDocsMobileNav';
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

  const [blocks, docs, fieldNotes] = await Promise.all([
    getPageBlocks(doc.id, 10),
    listPublishedDocs(),
    listFieldNotes(),
  ]);
  const grouped = groupDocsBySection(docs);
  const flatList = getFlatDocList(grouped);
  const headings = getHeadingsFromBlocks(blocks);
  const hasFieldNotes = fieldNotes && fieldNotes.length > 0;

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
          hasFieldNotes={hasFieldNotes}
        >
          {/* Traditional docs: content + optional right TOC */}
          <div className="flex flex-col xl:flex-row xl:gap-12 w-full px-4 sm:px-6 lg:px-8 pb-16">
            {/* Mobile: Docs menu and On this page as separate, independent controls */}
            <div className="xl:hidden space-y-3 mb-6">
              <div>
                <MeshtasticDocsMobileNav
                  grouped={grouped}
                  currentSlug={doc.slug}
                  currentSection={doc.section}
                  hasFieldNotes={hasFieldNotes}
                />
              </div>
              <div>
                <MeshtasticDocsDropdown headings={headings} className="w-full" />
              </div>
            </div>

            {/* Main doc content: bordered on desktop only; mobile = less borders */}
            <div className="flex-1 min-w-0">
              <article className="border-0 rounded-md bg-panel/40 backdrop-blur-sm overflow-hidden lg:border lg:border-neon/20">
                <header className="border-b border-neon/10 lg:border-neon/20 px-5 sm:px-6 lg:px-8 py-6">
                  {doc.section && doc.section.toLowerCase() !== doc.title?.toLowerCase() && (
                    <p className="text-xs tracking-[0.2em] text-neon/70 font-ocr uppercase mb-1">
                      {doc.section}
                    </p>
                  )}
                  <h1 className="text-2xl sm:text-3xl font-semibold text-text font-ibm">
                    {doc.title}
                  </h1>
                  {doc.summary ? (
                    <p className="mt-2 text-text/80 font-ocr text-sm leading-relaxed">
                      {doc.summary}
                    </p>
                  ) : null}
                  {doc.lastEditedTime ? (
                    <p className="mt-3 text-xs text-neon/50 font-ocr">
                      Updated {formatUpdated(doc.lastEditedTime)}
                    </p>
                  ) : null}
                </header>

                <div className="px-5 sm:px-6 lg:px-8 py-6 lg:py-8">
                  <div className="max-w-3xl">
                    {blocks.length > 0 ? (
                      <div className="prose prose-invert max-w-none">
                        <NotionBlockBody blocks={blocks} />
                      </div>
                    ) : (
                      <p className="text-text/70 font-ocr">No content yet.</p>
                    )}
                    <DocPrevNext flatList={flatList} currentSlug={doc.slug} />
                  </div>
                </div>
              </article>
            </div>

            {/* Right: On this page (desktop only, sticky) */}
            <OnThisPage headings={headings} />
          </div>
        </MeshtasticDocsLayout>
      </div>
    </div>
  );
}
