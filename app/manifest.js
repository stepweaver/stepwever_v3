export default function manifest() {
  return {
    name: 'λstepweaver - Practical transformations, powered by code.',
    short_name: 'λstepweaver',
    description:
      'Websites, automations, and dashboards that save you time and grow your business. Practical transformations, powered by code.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0d1211',
    theme_color: '#00ff41',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
} 