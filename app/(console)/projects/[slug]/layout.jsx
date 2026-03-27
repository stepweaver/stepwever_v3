import { getProjectBySlug } from '@/lib/projectsData';

const SITE_NAME = 'Stephen Weaver';
const SITE_URL = 'https://www.stepweaver.dev';
const MAX_DESCRIPTION_LENGTH = 200;

function truncateForMeta(text) {
  if (!text || typeof text !== 'string') return '';
  const trimmed = text.trim();
  if (trimmed.length <= MAX_DESCRIPTION_LENGTH) return trimmed;
  return trimmed.slice(0, MAX_DESCRIPTION_LENGTH - 3).trim() + '...';
}

export async function generateMetadata({ params }) {
  const resolvedParams = typeof params?.then === 'function' ? await params : params;
  const slug = resolvedParams?.slug;
  const project = slug ? getProjectBySlug(slug) : null;

  if (!project) {
    return {
      title: 'Project Not Found',
      robots: { index: false, follow: true },
    };
  }

  const title = project.title;
  const description = truncateForMeta(project.description || project.overview || '');
  const canonical = `${SITE_URL}/projects/${slug}`;
  const keywords = project.tags?.length
    ? [...(project.tags || []), 'case study', 'portfolio', SITE_NAME]
    : undefined;

  return {
    title,
    description: description || undefined,
    keywords: keywords?.slice(0, 10),
    authors: [{ name: SITE_NAME }],
    openGraph: {
      type: 'article',
      locale: 'en_US',
      url: canonical,
      siteName: SITE_NAME,
      title,
      description: description || undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: description || undefined,
      creator: '@stepweaver',
      site: '@stepweaver',
    },
    alternates: {
      canonical,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default function ProjectCaseStudyLayout({ children }) {
  return children;
}
