/**
 * Shared navigation link definitions used by Navbar and MobileNav.
 */

/** Core site links (desktop nav) */
export const NAV_LINKS = [
  { name: 'About', path: '/#about', scroll: true, ariaLabel: 'About section' },
  { name: 'Resume', path: '/resume', ariaLabel: 'Resume page' },
  { name: 'Codex', path: '/codex', ariaLabel: 'View blog' },
  { name: 'Meshtastic', path: '/meshtastic', ariaLabel: 'Meshtastic field notes' },
  { name: 'Mesh Dashboard', path: '/meshtastic/dashboard', ariaLabel: 'Live mesh dashboard' },
  { name: 'Terminal', path: '/terminal', ariaLabel: 'Interactive terminal' },
  { name: 'Contact', path: '/contact', ariaLabel: 'Contact page' },
];

/** Mobile-only links (not in desktop nav) */
export const MOBILE_ONLY_LINKS = [
  { name: 'Dice Roller', path: '/dice-roller', ariaLabel: 'Dice roller' },
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

/** Mobile nav combines all arrays, with Home up top */
export const MOBILE_NAV_LINKS = [
  { name: 'Home', path: '/', ariaLabel: 'Home page' },
  ...NAV_LINKS,
  ...MOBILE_ONLY_LINKS,
  ...EXTERNAL_LINKS,
];
