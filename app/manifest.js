export default function manifest() {
  return {
    name: 'λstepweaver - Growth Systems for Fast-Moving Businesses',
    short_name: 'λstepweaver',
    description:
      'We build lean data pipelines, automations, and high-impact web experiences that slash waste and surface profit opportunities in weeks-not quarters.',
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