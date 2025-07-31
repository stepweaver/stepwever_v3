import fs from 'fs/promises';
import path from 'path';
import { MDXRemote } from 'next-mdx-remote/rsc';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import BackgroundCanvas from '@/components/BackgroundCanvas/BackgroundCanvas';
import Update from '@/components/mdx/Update';

// Helper function to get type color
const getTypeColor = (type) => {
  switch (type) {
    case 'blog':
      return 'text-terminal-green';
    case 'projects':
      return 'text-terminal-magenta';
    case 'articles':
      return 'text-terminal-yellow';
    case 'tools':
      return 'text-terminal-cyan';
    case 'community':
      return 'text-terminal-blue';
    case 'podcasts':
      return 'text-terminal-purple';
    default:
      return 'text-terminal-text';
  }
};

// Helper function to get type color value for styling
const getTypeColorValue = (type) => {
  const colorMap = {
    blog: 'var(--color-terminal-green)', // terminal-green
    projects: 'var(--color-terminal-magenta)', // terminal-magenta
    articles: 'var(--color-terminal-yellow)', // terminal-yellow
    tools: 'var(--color-terminal-cyan)', // terminal-cyan
    community: 'var(--color-terminal-blue)', // terminal-blue
    podcasts: 'var(--color-terminal-purple)', // terminal-purple
  };
  return colorMap[type] || 'var(--color-terminal-text)'; // default to terminal-text
};

// Helper function to format date
const formatDate = (dateStr) => {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `[${year}-${month}-${day}]`;
  } catch (e) {
    return dateStr;
  }
};

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { type, slug } = resolvedParams;

  // Read the file to get frontmatter
  const filePath = path.join(process.cwd(), 'content', type, `${slug}.mdx`);

  let frontmatter = {};
  try {
    const source = await fs.readFile(filePath, 'utf8');
    frontmatter = matter(source).data;
  } catch (err) {
    return {
      title: 'Not Found',
      description: 'The page you requested was not found',
    };
  }

  // Use custom image from frontmatter or fallback to default
  const previewImage = frontmatter.image || '/images/lambda-preview.png';
  const absoluteImageUrl = previewImage.startsWith('http')
    ? previewImage
    : `https://stepweaver.dev${previewImage}`;

  return {
    title: frontmatter.title,
    description:
      frontmatter.description || `${frontmatter.title} - Stephen Weaver's Blog`,
    openGraph: {
      title: frontmatter.title,
      description:
        frontmatter.description ||
        `${frontmatter.title} - Stephen Weaver's Blog`,
      type: 'article',
      url: `https://stepweaver.dev/codex/${type}/${slug}`,
      images: [
        {
          url: absoluteImageUrl,
          width: 1200,
          height: 630,
          alt: frontmatter.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description:
        frontmatter.description ||
        `${frontmatter.title} - Stephen Weaver's Blog`,
      images: [absoluteImageUrl],
    },
  };
}

export default async function CodexDetailPage({ params }) {
  const resolvedParams = await params;
  const { type, slug } = resolvedParams;

  // Read the file
  const filePath = path.join(process.cwd(), 'content', type, `${slug}.mdx`);

  let frontmatter = {};
  let content = '';

  try {
    const source = await fs.readFile(filePath, 'utf8');
    const { data, content: fileContent } = matter(source);
    frontmatter = data;
    content = fileContent;
  } catch (err) {
    notFound();
  }

  return (
    <div className='min-h-screen relative'>
      <BackgroundCanvas />
      <div className='relative z-10 p-4'>
        <div className='max-w-4xl mx-auto mt-16'>
          {/* Back to Codex */}
          <a
            href='/codex'
            className={`inline-block mb-8 transition-colors ${getTypeColor(
              type
            )} hover:text-terminal-white`}
          >
            ← Back to Codex
          </a>

          {/* Post Header */}
          <article className='mb-12'>
            <header className='mb-8'>
              <h1
                className={`text-4xl md:text-5xl font-bold mb-4 ${getTypeColor(
                  type
                )}`}
              >
                {frontmatter.title}
              </h1>

              <div className='text-terminal-text text-lg mb-4'>
                {frontmatter.updated
                  ? `Updated: ${formatDate(frontmatter.updated)}`
                  : formatDate(frontmatter.date)}
              </div>

              {frontmatter.description && (
                <p className='text-terminal-text text-xl leading-relaxed mb-6'>
                  {frontmatter.description}
                </p>
              )}

              {/* Hashtags */}
              {frontmatter.hashtags && frontmatter.hashtags.length > 0 && (
                <div className='flex flex-wrap gap-2'>
                  {frontmatter.hashtags.map((tag) => {
                    const typeColor = getTypeColorValue(type);
                    return (
                      <a
                        key={tag}
                        href={`/codex?hashtag=${encodeURIComponent(tag)}`}
                        className='px-3 py-1 text-sm rounded font-medium transition-colors duration-200 cursor-pointer hashtag-hover'
                        data-type={type}
                        style={{
                          backgroundColor: `color-mix(in srgb, ${typeColor} 10%, transparent)`,
                          color: 'var(--color-terminal-text)', // Use CSS variable for theme adaptation
                          border: `1px solid color-mix(in srgb, ${typeColor} 30%, transparent)`,
                        }}
                      >
                        #{tag}
                      </a>
                    );
                  })}
                </div>
              )}
            </header>

            {/* Post Content */}
            <div className='prose prose-invert prose-lg max-w-none'>
              <div className='text-terminal-text leading-relaxed'>
                <MDXRemote
                  source={content}
                  components={{
                    Update: (props) => (
                      <Update {...props} frontmatter={frontmatter} />
                    ),
                  }}
                />
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
