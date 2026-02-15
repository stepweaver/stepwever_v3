import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Stephen Weaver - Interactive Terminal';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#070a10',
          fontFamily: 'monospace',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Tron grid lines */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(90,255,140,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(90,255,140,0.06) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Corner accents */}
        <div
          style={{
            position: 'absolute',
            top: 32,
            left: 32,
            width: 60,
            height: 60,
            borderLeft: '2px solid rgba(90,210,255,0.6)',
            borderTop: '2px solid rgba(90,210,255,0.6)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 32,
            right: 32,
            width: 60,
            height: 60,
            borderRight: '2px solid rgba(90,210,255,0.6)',
            borderBottom: '2px solid rgba(90,210,255,0.6)',
          }}
        />

        {/* Lambda symbol */}
        <div
          style={{
            fontSize: 120,
            color: 'rgba(90,255,140,0.9)',
            marginBottom: 16,
            lineHeight: 1,
          }}
        >
          λ
        </div>

        {/* MODULE label */}
        <div
          style={{
            fontSize: 14,
            letterSpacing: '0.3em',
            color: 'rgba(90,255,140,0.6)',
            textTransform: 'uppercase',
            marginBottom: 12,
          }}
        >
          MODULE // INTERACTIVE TERMINAL
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: '#ecf0f8',
            marginBottom: 8,
          }}
        >
          λstepweaver
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 20,
            color: 'rgba(90,210,255,0.8)',
            letterSpacing: '0.15em',
          }}
        >
          COMMAND-LINE PORTFOLIO INTERFACE
        </div>

        {/* Terminal prompt */}
        <div
          style={{
            marginTop: 32,
            fontSize: 16,
            color: 'rgba(90,255,140,0.7)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span>user@stepweaver:~$</span>
          <span style={{ color: '#ecf0f8' }}>help</span>
          <span
            style={{
              width: 10,
              height: 20,
              backgroundColor: 'rgba(90,255,140,0.7)',
              display: 'inline-block',
            }}
          />
        </div>

        {/* ID badge */}
        <div
          style={{
            position: 'absolute',
            top: 40,
            right: 48,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          <div
            style={{
              fontSize: 10,
              letterSpacing: '0.25em',
              color: 'rgba(90,255,140,0.4)',
              textTransform: 'uppercase',
            }}
          >
            ID
          </div>
          <div
            style={{
              fontSize: 14,
              color: 'rgba(90,255,140,0.7)',
            }}
          >
            TERM-00
          </div>
        </div>

        {/* URL */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            fontSize: 14,
            color: 'rgba(150,160,180,0.6)',
            letterSpacing: '0.1em',
          }}
        >
          stepweaver.dev/terminal
        </div>
      </div>
    ),
    { ...size }
  );
}
