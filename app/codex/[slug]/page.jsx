import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
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

  const typeColor = 'var(--neon)';

  return (
    <div className="min-h-screen relative">
      <BackgroundCanvas />
      <div className="relative z-10 p-4">
        <div className="max-w-4xl mx-auto">
          <a
            href="/codex"
            className="inline-block mb-8 transition-colors text-terminal-green hover:text-terminal-white"
          >
            ← Back to Codex
          </a>

          <article className="mb-12">
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-terminal-green">
                {entry.title || 'Untitled'}
              </h1>

              <div className="text-terminal-text text-lg mb-4 space-y-1">
                <div>Published: {formatDate(entry.date)}</div>
                {entry.updated && entry.updated !== entry.date && (
                  <div className="text-terminal-green">Updated: {formatDate(entry.updated)}</div>
                )}
              </div>

              {entry.description && (
                <p className="text-terminal-text text-xl leading-relaxed mb-6">{entry.description}</p>
              )}

              {entry.hashtags?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {entry.hashtags.map((tag) => (
                    <a
                      key={tag}
                      href={`/codex?hashtag=${encodeURIComponent(tag)}`}
                      className="px-3 py-1 text-sm rounded font-medium transition-colors duration-200 cursor-pointer hashtag-hover"
                      style={{
                        backgroundColor: `color-mix(in srgb, ${typeColor} 10%, transparent)`,
                        color: 'var(--color-terminal-text)',
                        border: `1px solid color-mix(in srgb, ${typeColor} 30%, transparent)`,
                      }}
                    >
                      #{tag}
                    </a>
                  ))}
                </div>
              )}
            </header>

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
