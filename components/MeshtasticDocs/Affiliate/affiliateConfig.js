/**
 * Meshtastic affiliate URL configuration (Atlavox products).
 * Each entry: { envKey, label }
 */
export const AFFILIATE_SOURCES = [
  {
    envKey: 'NEXT_PUBLIC_ATLAVOX_M1_URL',
    label: 'Atlavox M1 Meshtastic Radio',
  },
  {
    envKey: 'NEXT_PUBLIC_ATLAVOX_BEACON_URL',
    label: 'Atlavox Beacon Solar Meshtastic Node',
  },
  {
    envKey: 'NEXT_PUBLIC_ATLAVOX_BEACON_OUTPOST_URL',
    label: 'Atlavox Beacon Solar – Preconfigured (Outpost)',
  },
  {
    envKey: 'NEXT_PUBLIC_ATLAVOX_M1_CASE_URL',
    label: 'Atlavox M1 DIY Case',
  },
];

export function getConfiguredAffiliateLinks() {
  return AFFILIATE_SOURCES.filter(
    (s) => typeof process.env[s.envKey] === 'string' && process.env[s.envKey].trim()
  ).map((s) => ({ url: process.env[s.envKey].trim(), label: s.label }));
}

export function getPrimaryAffiliateUrl(overrideUrl) {
  if (overrideUrl) return overrideUrl;
  return (
    process.env.NEXT_PUBLIC_ATLAVOX_AFFILIATE_URL ||
    process.env.NEXT_PUBLIC_ATLAVOX_M1_URL ||
    ''
  );
}

export function hasAnyAffiliateConfigured() {
  return getConfiguredAffiliateLinks().length > 0;
}
