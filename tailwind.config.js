/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          md: '2rem',
          lg: '1rem',
          xl: '1rem',
          '2xl': '1rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1536px',
        },
      },
      colors: {
        terminal: {
          DEFAULT: 'var(--color-terminal-dark)',
          light: 'var(--color-terminal-light)',
          border: 'var(--color-terminal-border)',
          green: 'var(--color-terminal-green)',
          yellow: 'var(--color-terminal-yellow)',
          red: 'var(--color-terminal-red)',
          blue: 'var(--color-terminal-blue)',
          text: 'var(--color-terminal-text)',
          muted: 'var(--color-terminal-muted)',
          cyan: 'var(--color-terminal-cyan)',
          dimmed: 'var(--color-terminal-dimmed)',
          window: 'var(--color-terminal-dark)',
          header: 'var(--color-terminal-light)',
          magenta: 'var(--color-terminal-magenta)',
          pink: 'var(--color-terminal-pink)',
          purple: 'var(--color-terminal-purple)',
          orange: 'var(--color-terminal-orange)',
          white: 'var(--color-terminal-white)',
        },
        bg: 'rgb(var(--bg) / <alpha-value>)',
        panel: 'rgb(var(--panel) / <alpha-value>)',
        text: 'rgb(var(--text) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        neon: 'rgb(var(--neon) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        warn: 'rgb(var(--warn) / <alpha-value>)',
        danger: 'rgb(var(--danger) / <alpha-value>)',
        ring: 'rgb(var(--ring) / <alpha-value>)',
      },
      boxShadow: {
        'terminal-green': '0 0 6px 0 rgba(0, 255, 65, 0.5)',
        neon: '0 0 22px rgb(var(--neon) / 0.22)',
        accent: '0 0 22px rgb(var(--accent) / 0.22)',
        'neon-sm': '0 0 8px rgb(var(--neon) / 0.15)',
      },
      backdropBlur: {
        xs: '2px',
      },
      fontFamily: {
        ocr: ['var(--font-ocr)'],
        ibm: ['var(--font-ibm)'],
        mono: ['var(--font-mono)'],
        sans: ['var(--font-sans)'],
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        glitch: 'glitch 0.3s linear infinite',
        fadeIn: 'fadeIn 0.3s ease-in-out',
        slideIn: 'slideIn 0.3s ease-out',
        typewriter: 'typewriter 2s steps(40, end)',
      },
      animationDelay: {
        '300': '300ms',
        '600': '600ms',
        '900': '900ms',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        glitch: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-2px)' },
          '40%': { transform: 'translateX(2px)' },
          '60%': { transform: 'skewX(2deg)' },
          '80%': { transform: 'skewX(-2deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'var(--color-terminal-text)',
            p: {
              marginTop: '1.5em',
              marginBottom: '1.5em',
              lineHeight: '1.7',
            },
            'p + p': {
              marginTop: '2em',
            },
            a: {
              color: 'var(--color-terminal-yellow)',
              '&:hover': {
                color: 'var(--color-terminal-green)',
              },
            },
            h1: {
              color: 'var(--color-terminal-green)',
              marginTop: '2em',
              marginBottom: '1em',
            },
            h2: {
              color: 'var(--color-terminal-green)',
              marginTop: '1.75em',
              marginBottom: '0.75em',
            },
            h3: {
              color: 'var(--color-terminal-green)',
              marginTop: '1.5em',
              marginBottom: '0.5em',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}; 