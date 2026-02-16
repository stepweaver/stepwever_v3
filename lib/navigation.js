/**
 * Shared navigation link definitions used by Navbar and MobileNav.
 */

/** Core site links (appear in both desktop and mobile) */
export const NAV_LINKS = [
  { name: 'About', path: '/#about', scroll: true, ariaLabel: 'About section' },
  { name: 'Resume', path: '/resume', ariaLabel: 'Resume page' },
  { name: 'Codex', path: '/codex', ariaLabel: 'View blog' },
  { name: 'Meshtastic', path: '/meshtastic', ariaLabel: 'Meshtastic field notes' },
  { name: 'Terminal', path: '/terminal', ariaLabel: 'Interactive terminal' },
  { name: 'Contact', path: '/contact', ariaLabel: 'Contact page' },
];

/** External links (mobile only) */
export const EXTERNAL_LINKS = [
  {
    name: 'Bluesky',
    path: 'https://bsky.app/profile/stepweaver.dev',
    external: true,
  },
  {
    name: 'GitHub',
    path: 'https://github.com/stepweaver',
    external: true,
  },
];

/** Mobile nav combines both arrays */
export const MOBILE_NAV_LINKS = [
  ...NAV_LINKS,
  ...EXTERNAL_LINKS,
];
