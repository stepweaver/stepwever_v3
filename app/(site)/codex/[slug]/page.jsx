import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBlogEntryBySlug, getAllBlogEntries } from '@/lib/blog';
import { getPageBlocks } from '@/lib/notion-blocks';
import NotionBlockBody from '@/components/NotionBlockBody';

const BackgroundCanvas = dynamic(() =>
  import('@/components/BackgroundCanvas/BackgroundCanvas')
);

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  try {
    const [year, month, day] = dateStr.split('-').map((part) => part.replace(/[^0-9]/g, ''));
    if (!year || !month || !day) return dateStr;
    const date = new Date(Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(day)));
    const y = date.getUTCFullYear();
    const m = String(date.getUTCMonth() + 1).padStart(2, '0');
    const d = String(date.getUTCDate()).padStart(2, '0');
    return `[${y}-${m}-${d}]`;
  } catch (e) {
    return dateStr;
  }
};

export const revalidate = 60; // Revalidate every 60s so Notion updates appear
export const dynamicParams = true;

export async function generateStaticParams() {
  if (!process.env.NOTION_BLOG_DB_ID) return [];
  try {
    const entries = await getAllBlogEntries();
    return entries
      .filter((e) => e.slug)
      .slice(0, 20)
      .map((entry) => ({ slug: entry.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const entry = await getBlogEntryBySlug(slug);
  if (!entry) return { title: 'Not Found', description: 'The page you requested was not found' };
  const title = entry.title || 'Blog Post';
  const description = entry.description || `${title} - Stephen Weaver's Blog`;
  const previewImage = '/images/lambda_preview.png';
  const absoluteImageUrl = `https://stepweaver.dev${previewImage}`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://stepweaver.dev/codex/${slug}`,
      images: [{ url: absoluteImageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absoluteImageUrl],
    },
  };
}

export default async function CodexPostPage({ params }) {
  const { slug } = await params;
  let entry;
  let blocks = [];
  try {
    entry = await getBlogEntryBySlug(slug);
    if (!entry) notFound();
    blocks = await getPageBlocks(entry.id);
  } catch (err) {
    if (process.env.NODE_ENV === 'development') console.error('[codex]', err);
    notFound();
  }

  return (
    <div className="min-h-screen relative">
      <BackgroundCanvas />
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Back nav */}
          <Link
            href="/codex"
            className="inline-flex items-center gap-2 mb-10 font-ocr text-xs tracking-[0.15em] uppercase text-neon/60 hover:text-neon transition-colors"
          >
            <span className="text-neon/40">&larr;</span> Back to Codex
          </Link>

          <article>
            {/* Article header */}
            <header className="mb-10">
              {/* Meta row */}
              <div className="flex flex-nowrap items-center justify-between overflow-x-auto mb-4">
                <span className="font-mono text-[10px] tracking-[0.25em] text-neon/40 uppercase whitespace-nowrap shrink-0">
                  CODEX // ENTRY
                </span>
                <span className="font-ocr text-xs text-text/40 tracking-wide whitespace-nowrap shrink-0">
                  {entry.updated && entry.updated !== entry.date
                    ? `Updated: ${formatDate(entry.updated)}`
                    : formatDate(entry.date)}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-ibm text-3xl sm:text-4xl md:text-5xl font-bold text-text uppercase tracking-wide leading-tight mb-4">
                {entry.title || 'Untitled'}
              </h1>

              {/* Description */}
              {entry.description && (
                <p className="font-ocr text-sm text-text/60 leading-relaxed mb-5 max-w-2xl">
                  {entry.description}
                </p>
              )}

              {/* Hashtags */}
              {entry.hashtags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {entry.hashtags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/codex?hashtag=${encodeURIComponent(tag)}`}
                      className="px-3 py-1 text-xs font-ocr tracking-wider uppercase border border-neon/30 text-text/70 rounded-sm hover:border-neon/70 hover:text-neon hover:bg-neon/10 transition-all duration-200"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}

              {/* Divider before content */}
              <div className="h-px bg-neon/10" />
            </header>

            {/* Article content */}
            {blocks.length > 0 && (
              <div className="prose prose-invert prose-lg max-w-none">
                <NotionBlockBody blocks={blocks} />
              </div>
            )}
          </article>
        </div>
      </div>
    </div>
  );
}
