import { getInitialBlogEntries } from '@/lib/blog';
import {
  normalizePostFromBlogEntry,
  sortPosts,
} from '@/lib/codex/selectors';
import { jsonSecurityHeaders } from '@/lib/jsonSecurityHeaders';

export async function GET() {
  const posts = [];

  if (process.env.NOTION_BLOG_DB_ID) {
    try {
      const blogEntries = await getInitialBlogEntries(200);
      blogEntries.forEach((entry) => {
        posts.push(normalizePostFromBlogEntry(entry));
      });
    } catch (err) {
      if (process.env.NODE_ENV === 'development') console.error('[codex] Notion blog:', err);
    }
  }

  const sorted = sortPosts(posts);

  return Response.json(sorted, { headers: jsonSecurityHeaders() });
}
