import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Helper function to safely parse dates
const safeParseDate = (dateStr) => {
  if (!dateStr) return new Date(0);
  try {
    const [year, month, day] = dateStr.split('-').map(Number);
    if (!year || !month || !day) return new Date(0);
    return new Date(year, month - 1, day);
  } catch (e) {
    console.error(`Invalid date format: ${dateStr}`);
    return new Date(0);
  }
};

// Get all blog posts
const getBlogPosts = () => {
  const blogDir = path.join(process.cwd(), 'content/blog');
  const files = fs.readdirSync(blogDir);

  const posts = files
    .filter(file => file.endsWith('.mdx'))
    .map(file => {
      const filePath = path.join(blogDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data: frontmatter } = matter(fileContent);

      return {
        title: frontmatter.title || 'Untitled',
        slug: file.replace('.mdx', ''),
        date: frontmatter.date || '',
        updated: frontmatter.updated || frontmatter.date || '',
        excerpt: frontmatter.excerpt || '',
        hashtags: frontmatter.hashtags || []
      };
    })
    .sort((a, b) => {
      const dateA = safeParseDate(a.updated || a.date);
      const dateB = safeParseDate(b.updated || b.date);
      return dateB - dateA; // Sort by most recent first
    });

  return posts;
};

// Get a specific blog post by slug
const getBlogPost = (slug) => {
  const blogDir = path.join(process.cwd(), 'content/blog');
  const filePath = path.join(blogDir, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data: frontmatter, content } = matter(fileContent);

  return {
    title: frontmatter.title || 'Untitled',
    slug: slug,
    date: frontmatter.date || '',
    updated: frontmatter.updated || frontmatter.date || '',
    excerpt: frontmatter.excerpt || '',
    hashtags: frontmatter.hashtags || [],
    content: content
  };
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');

  try {
    if (action === 'list') {
      const posts = getBlogPosts();
      return Response.json({ posts });
    } else if (action === 'post') {
      const slug = searchParams.get('slug');
      if (!slug) {
        return Response.json({ error: 'Slug parameter required' }, { status: 400 });
      }

      const post = getBlogPost(slug);
      if (!post) {
        return Response.json({ error: 'Post not found' }, { status: 404 });
      }

      return Response.json({ post });
    } else {
      return Response.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Blog API error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
} 