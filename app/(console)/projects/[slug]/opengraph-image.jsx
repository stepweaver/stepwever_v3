import { headers } from 'next/headers';
import { ImageResponse } from 'next/og';
import { getProjectBySlug } from '@/lib/projectsData';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Project case study preview';

const FALLBACK_IMAGE_PATH = '/images/lambda_preview.png';
const KNOWN_WEBP_PNG_SIBLINGS = new Set([
  '/images/screely-dice.png',
  '/images/screely-lambda.png',
  '/images/screely-profilcard.png',
  '/images/screely-resist.png',
  '/images/screely-stache.png',
]);

function choosePath(url = '') {
  if (!url) return FALLBACK_IMAGE_PATH;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.toLowerCase().endsWith('.webp')) {
    const pngSibling = url.replace(/\.webp$/i, '.png');
    if (KNOWN_WEBP_PNG_SIBLINGS.has(pngSibling)) return pngSibling;
    return FALLBACK_IMAGE_PATH;
  }
  return url;
}

export default async function Image({ params }) {
  const h = await headers();
  const host = h.get('x-forwarded-host') ?? h.get('host') ?? 'stepweaver.dev';
  const proto = h.get('x-forwarded-proto') ?? 'https';
  const baseUrl = `${proto}://${host}`;

  const resolvedParams =
    typeof params?.then === 'function' ? await params : params;

  const project = getProjectBySlug(resolvedParams?.slug);

  const title = project?.title || 'Project Case Study';
  const chosen = choosePath(project?.socialImage || project?.imageUrl);
  const imageSrc =
    chosen.startsWith('http://') || chosen.startsWith('https://')
      ? chosen
      : `${baseUrl}${chosen}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          background: '#05070c',
          color: '#ecf0f8',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        {/* Full-image background */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex' }}>
          <img
            src={imageSrc}
            alt={title}
            width='1200'
            height='630'
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* No text, full image only */}
      </div>
    ),
    size
  );
}

