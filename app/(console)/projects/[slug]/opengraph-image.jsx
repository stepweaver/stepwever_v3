import { ImageResponse } from 'next/og';
import { getProjectBySlug } from '@/lib/projectsData';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Project case study preview';

const SITE_URL = 'https://www.stepweaver.dev';
const FALLBACK_IMAGE = `${SITE_URL}/images/lambda_preview.png`;

function toAbsoluteUrl(url = '') {
  if (!url) return FALLBACK_IMAGE;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  const absolute = `${SITE_URL}${url}`;
  if (absolute.toLowerCase().endsWith('.webp')) return FALLBACK_IMAGE;
  return absolute;
}

function truncate(text = '', max = 120) {
  if (!text) return '';
  const clean = text.trim().replace(/\s+/g, ' ');
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trim()}…`;
}

export default async function Image({ params }) {
  const resolvedParams =
    typeof params?.then === 'function' ? await params : params;

  const project = getProjectBySlug(resolvedParams?.slug);

  const title = project?.title || 'Project Case Study';
  const summary = truncate(
    project?.description || project?.overview || 'Case study from Stephen Weaver',
    130
  );
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
          background:
            'linear-gradient(135deg, #05070c 0%, #0b1220 55%, #09131b 100%)',
          color: '#ecf0f8',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(90,255,140,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(90,255,140,0.045) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
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
              width: '52%',
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

              <div
                style={{
                  display: 'flex',
                  fontSize: 24,
                  lineHeight: 1.35,
                  color: '#9fd6ff',
                  maxWidth: 520,
                }}
              >{summary}</div>

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

          <div
            style={{
              width: '48%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <div
              style={{
                width: 520,
                height: 360,
                display: 'flex',
                overflow: 'hidden',
                borderRadius: 20,
                border: '1px solid rgba(90,210,255,0.2)',
                background: '#09111d',
                boxShadow: '0 0 0 1px rgba(90,255,140,0.08) inset',
              }}
            >
              <img
                src={imageSrc}
                alt={title}
                width='520'
                height='360'
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}

