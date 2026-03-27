import { ImageResponse } from 'next/og';
import { getProjectBySlug } from '@/lib/projectsData';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Project case study preview';

const SITE_URL = 'https://www.stepweaver.dev';
const FALLBACK_IMAGE = `${SITE_URL}/images/lambda_preview.png`;
const KNOWN_WEBP_PNG_SIBLINGS = new Set([
  '/images/screely-dice.png',
  '/images/screely-lambda.png',
  '/images/screely-profilcard.png',
  '/images/screely-resist.png',
  '/images/screely-stache.png',
]);

function toAbsoluteUrl(url = '') {
  if (!url) return FALLBACK_IMAGE;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  const absolute = `${SITE_URL}${url}`;
  if (absolute.toLowerCase().endsWith('.webp')) {
    const pngSibling = url.replace(/\.webp$/i, '.png');
    if (KNOWN_WEBP_PNG_SIBLINGS.has(pngSibling)) return `${SITE_URL}${pngSibling}`;
    return FALLBACK_IMAGE;
  }
  return absolute;
}

export default async function Image({ params }) {
  const resolvedParams =
    typeof params?.then === 'function' ? await params : params;

  const project = getProjectBySlug(resolvedParams?.slug);

  const title = project?.title || 'Project Case Study';
  const imageSrc = toAbsoluteUrl(project?.socialImage || project?.imageUrl);
  const tags = Array.isArray(project?.tags) ? project.tags.slice(0, 3) : [];

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

        {/* Dark overlay for readable text */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, rgba(5,7,12,0.92) 0%, rgba(5,7,12,0.82) 46%, rgba(5,7,12,0.40) 75%, rgba(5,7,12,0.18) 100%)',
            display: 'flex',
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            backgroundImage:
              'linear-gradient(rgba(90,255,140,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(90,255,140,0.045) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            opacity: 0.55,
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 24,
            border: '1px solid rgba(90,210,255,0.18)',
            borderRadius: 24,
          }}
        />

        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            padding: '48px 56px',
            gap: 32,
            position: 'relative',
          }}
        >
          <div
            style={{
              width: '46%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                color: '#7dffad',
                fontSize: 18,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              <span style={{ fontSize: 28, lineHeight: 1 }}>λ</span>
              <span>stepweaver // case study</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div
                style={{
                  display: 'flex',
                  fontSize: 52,
                  fontWeight: 800,
                  lineHeight: 1.05,
                  letterSpacing: '-0.03em',
                }}
              >{title}</div>

              {tags.length > 0 ? (
                <div
                  style={{
                    display: 'flex',
                    gap: 10,
                    flexWrap: 'wrap',
                    marginTop: 8,
                  }}
                >
                  {tags.map((tag) => (
                    <div
                      key={tag}
                      style={{
                        display: 'flex',
                        padding: '9px 14px',
                        borderRadius: 999,
                        border: '1px solid rgba(90,210,255,0.18)',
                        background: 'rgba(8, 16, 28, 0.72)',
                        color: 'rgba(236,240,248,0.88)',
                        fontSize: 16,
                      }}
                    >{tag}</div>
                  ))}
                </div>
              ) : null}
            </div>

            <div
              style={{
                display: 'flex',
                fontSize: 18,
                color: 'rgba(236,240,248,0.68)',
              }}
            >
              {`stepweaver.dev/projects/${resolvedParams?.slug || ''}`}
            </div>
          </div>

          <div style={{ width: '54%', display: 'flex' }} />
        </div>
      </div>
    ),
    size
  );
}

