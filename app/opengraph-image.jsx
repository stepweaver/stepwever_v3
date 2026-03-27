import { headers } from 'next/headers';
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt =
  'Stephen Weaver — full-stack web apps, automation, and AI-enabled tools';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const h = await headers();
  const host = h.get('x-forwarded-host') ?? h.get('host') ?? 'stepweaver.dev';
  const isLocalhost = host.includes('localhost') || host.startsWith('127.');
  const baseUrl = isLocalhost ? `http://${host}` : 'https://stepweaver.dev';

  const PROFILE_IMAGE = `${baseUrl}/images/stepweaver-dev.png`;

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
        {/* Full-image background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
          }}
        >
          <img
            src={PROFILE_IMAGE}
            alt='Stephen Weaver'
            width='1200'
            height='630'
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* No text — just the image */}
        <div
          style={{
            display: 'none',
          }}
        />

        {/* Subtle grid on top */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(90,255,140,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(90,255,140,0.05) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            opacity: 0.0,
          }}
        />

        {/* Outer frame */}
        <div
          style={{
            position: 'absolute',
            inset: 24,
            border: '1px solid rgba(90,210,255,0.18)',
            borderRadius: 24,
            opacity: 0.0,
          }}
        />

        <div
          style={{
            display: 'none',
          }}
        >
          <div
            style={{
              display: 'none',
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
        </div>
      </div>
    ),
    { ...size }
  );
}
