import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt =
  'Stephen Weaver — full-stack web apps, automation, and AI-enabled tools';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const SITE_URL = 'https://www.stepweaver.dev';
  const PROFILE_IMAGE = `${SITE_URL}/images/sigil.png`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          position: 'relative',
          overflow: 'hidden',
          background:
            'linear-gradient(135deg, #05070c 0%, #0b1220 55%, #09131b 100%)',
          color: '#ecf0f8',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        {/* Tron grid lines */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(90,255,140,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(90,255,140,0.05) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Outer frame */}
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
            padding: '56px 64px',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: '58%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              paddingRight: 24,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 16px',
                  borderRadius: 999,
                  border: '1px solid rgba(90,255,140,0.22)',
                  background: 'rgba(7, 14, 24, 0.7)',
                  color: '#7dffad',
                  fontSize: 18,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                <span style={{ fontSize: 28, lineHeight: 1 }}>λ</span>
                <span>stepweaver</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div
                style={{
                  fontSize: 58,
                  fontWeight: 800,
                  lineHeight: 1.05,
                  letterSpacing: '-0.03em',
                }}
              >
                Stephen Weaver
              </div>

              <div
                style={{
                  fontSize: 28,
                  lineHeight: 1.25,
                  color: '#9fd6ff',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <span>Full-stack web apps, automation,</span>
                <span>and AI-enabled tools.</span>
              </div>

              <div
                style={{
                  fontSize: 20,
                  lineHeight: 1.4,
                  color: 'rgba(236,240,248,0.76)',
                  maxWidth: 560,
                }}
              >
                Business-minded builder focused on systems, operations, and
                production-ready implementation.
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                fontSize: 18,
                color: 'rgba(236,240,248,0.68)',
              }}
            >
              <span>stepweaver.dev</span>
              <span style={{ color: 'rgba(90,255,140,0.45)' }}>•</span>
              <span>Portfolio / Case Studies / Terminal</span>
            </div>
          </div>

          <div
            style={{
              width: '42%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <div
              style={{
                width: 360,
                height: 470,
                display: 'flex',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 24,
                border: '1px solid rgba(90,210,255,0.22)',
                background:
                  'linear-gradient(180deg, rgba(8,16,28,0.95), rgba(5,9,16,0.95))',
                boxShadow: '0 0 0 1px rgba(90,255,140,0.08) inset',
              }}
            >
              <img
                src={PROFILE_IMAGE}
                alt='Stephen Weaver'
                width='360'
                height='470'
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
