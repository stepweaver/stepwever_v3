import { getInitialBlogEntries, getBlogEntryBySlug } from '@/lib/blog';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');

  try {
    if (action === 'list') {
      const blogEntries = await getInitialBlogEntries(200);
      const posts = blogEntries.map((entry) => ({
        title: entry.title || 'Untitled',
        slug: entry.slug,
        date: entry.date || '',
        updated: entry.updated || entry.date || '',
        excerpt: entry.description || '',
        hashtags: entry.hashtags || [],
      }));
      return Response.json({ posts });
    } else if (action === 'post') {
      const slug = searchParams.get('slug');
      if (!slug) {
        return Response.json({ error: 'Slug parameter required' }, { status: 400 });
      }

      const entry = await getBlogEntryBySlug(slug);
      if (!entry) {
        return Response.json({ error: 'Post not found' }, { status: 404 });
      }

      const post = {
        title: entry.title || 'Untitled',
        slug: entry.slug,
        date: entry.date || '',
        updated: entry.updated || entry.date || '',
        excerpt: entry.description || '',
        hashtags: entry.hashtags || [],
        content: '', // Body is Notion blocks; terminal uses metadata only
      };
      return Response.json({ post });
    } else {
      return Response.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Blog API error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
} 