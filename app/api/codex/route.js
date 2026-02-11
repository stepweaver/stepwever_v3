import { getInitialBlogEntries } from '@/lib/blog';

function safeParseDate(dateStr) {
  if (!dateStr) return new Date(0);
  try {
    const [year, month, day] = dateStr.split('-').map(Number);
    if (!year || !month || !day) return new Date(0);
    return new Date(Date.UTC(year, month - 1, day));
  } catch (e) {
    return new Date(0);
  }
}

export async function GET() {
  const posts = [];

  if (process.env.NOTION_BLOG_DB_ID) {
    try {
      const blogEntries = await getInitialBlogEntries(200);
      blogEntries.forEach((entry) => {
        posts.push({
          title: entry.title || 'Untitled',
          slug: entry.slug,
          date: entry.date || '',
          updated: entry.updated || null,
          description: entry.description || '',
          hashtags: entry.hashtags || [],
        });
      });
    } catch (err) {
      if (process.env.NODE_ENV === 'development') console.error('[codex] Notion blog:', err);
    }
  }

  posts.sort((a, b) => {
    const dateA = a.updated ? safeParseDate(a.updated) : safeParseDate(a.date);
    const dateB = b.updated ? safeParseDate(b.updated) : safeParseDate(b.date);
    return dateB - dateA;
  });

  return Response.json(posts);
} 