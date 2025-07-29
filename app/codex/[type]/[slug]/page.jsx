import fs from 'fs/promises';
import path from 'path';
import { MDXRemote } from 'next-mdx-remote/rsc';
import matter from 'gray-matter';
import BackgroundCanvas from '@/components/BackgroundCanvas/BackgroundCanvas';
import Update from '@/components/mdx/Update';

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

export default function CodexDetailPage({ params }) {
  return (
    <div className='min-h-screen relative'>
      <BackgroundCanvas />
      <div className='relative z-10 p-4'>
        <div className='max-w-4xl mx-auto mt-16'>
          {/* Back to Blog */}
          <a
            href='/codex'
            className='inline-block mb-8 text-terminal-green hover:text-terminal-white transition-colors'
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
                  {frontmatter.hashtags.map((tag) => (
                    <span
                      key={tag}
                      className='px-3 py-1 text-sm bg-terminal-text/10 text-white border border-terminal-text/20 rounded font-medium'
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {/* Post Content */}
            <div className='prose prose-invert prose-lg max-w-none'>
              <div className='text-terminal-text leading-relaxed'>
                <MDXRemote source={content} components={mdxComponents} />
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
