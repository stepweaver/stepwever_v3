import { cache } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FileText } from 'lucide-react';
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

const getCachedDocBySlug = cache((slug) => getDocBySlug(slug));

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
    return {
      title: 'Not Found',
      description: 'The page you requested was not found',
    };

  const title = doc.title || 'Meshtastic Doc';
  const description =
    doc.summary || `${title} – Meshtastic Field Notes | Stephen Weaver`;
  const previewImage = doc.coverImage || '/images/lambda_preview.png';
  const absoluteImageUrl = previewImage.startsWith('http')
    ? previewImage
    : `https://stepweaver.dev${previewImage}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://stepweaver.dev/meshtastic/${slug}`,
      images: [
        { url: absoluteImageUrl, width: 1200, height: 630, alt: title },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absoluteImageUrl],
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
    <MeshtasticDocsLayout
      grouped={grouped}
      currentSlug={doc.slug}
      currentSection={doc.section}
      hasFieldNotes={hasFieldNotes}
    >
      <div className='flex flex-col xl:flex-row xl:gap-8 w-full px-4 sm:px-6 lg:px-8 pb-16'>
        {/* Mobile nav controls */}
        <div className='xl:hidden space-y-3 mb-6'>
          <div className='flex gap-3'>
            <MeshtasticDocsMobileNav
              grouped={grouped}
              currentSlug={doc.slug}
              currentSection={doc.section}
              hasFieldNotes={hasFieldNotes}
            />
            {hasFieldNotes && (
              <Link
                href='/meshtastic/field-notes'
                className='inline-flex items-center justify-center px-3 py-2 rounded-sm border border-neon/25 bg-panel/50 text-neon/90 hover:text-neon hover:bg-panel/70 hover:border-neon/40 transition-colors font-ocr text-xs uppercase tracking-[0.2em]'
              >
                Field Notes
              </Link>
            )}
          </div>
          <div>
            <MeshtasticDocsDropdown headings={headings} className='w-full' />
          </div>
        </div>

        {/* Main doc content */}
        <div className='flex-1 min-w-0'>
          <article className='rounded-sm overflow-hidden border border-neon/15 bg-panel/20'>
            {/* Chrome header */}
            <div className='bg-panel/50 border-b border-neon/20 px-5 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <FileText className='w-3 h-3 text-neon/40' />
                <span className='font-ocr text-[10px] tracking-[0.18em] text-neon/40 uppercase'>
                  {doc.section || 'Document'}
                </span>
              </div>
              <span className='font-ocr text-[10px] text-text/20 hidden sm:inline'>
                MESH-DOC
              </span>
            </div>

            {/* Article header */}
            <header className='border-b border-neon/10 px-5 sm:px-6 lg:px-8 py-6'>
              <h1 className='text-2xl sm:text-3xl font-semibold text-text font-ibm'>
                {doc.title}
              </h1>
              {doc.summary && (
                <p className='mt-2 text-text/70 font-ocr text-sm leading-relaxed'>
                  {doc.summary}
                </p>
              )}
              {doc.lastEditedTime && (
                <p className='mt-3 text-[11px] text-neon/40 font-ocr'>
                  Updated {formatUpdated(doc.lastEditedTime)}
                </p>
              )}
            </header>

            {/* Article body */}
            <div className='px-5 sm:px-6 lg:px-8 py-6 lg:py-8'>
              <div className='max-w-3xl'>
                {blocks.length > 0 ? (
                  <div className='prose prose-invert max-w-none'>
                    <NotionBlockBody blocks={blocks} />
                  </div>
                ) : (
                  <p className='text-text/70 font-ocr'>No content yet.</p>
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
  );
}
