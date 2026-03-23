/**
 * Same-origin and allowlist checks for browser-initiated API requests.
 */

/** Compare hosts allowing apex vs www (e.g. stepweaver.dev vs www.stepweaver.dev). */
function sameSiteHost(a, b) {
  const strip = (h) => h.toLowerCase().replace(/^www\./, '');
  return strip(a) === strip(b);
}

export function isAllowedRequestOrigin(request) {
  const origin = request.headers.get('origin');
  const host =
    request.headers.get('host') ||
    request.headers.get('x-forwarded-host')?.split(',')[0]?.trim();

  if (!host) return false;

  const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);

  const allowedHosts = (process.env.ALLOWED_HOSTS || '')
    .split(',')
    .map((v) => v.trim().toLowerCase())
    .filter(Boolean);

  const normalizedHost = host.toLowerCase().split(':')[0];

  if (allowedHosts.length && !allowedHosts.includes(normalizedHost)) {
    const allowedStripped = allowedHosts.map((h) => h.replace(/^www\./, ''));
    const hostStripped = normalizedHost.replace(/^www\./, '');
    if (!allowedStripped.includes(hostStripped)) {
      return false;
    }
  }

  if (!origin) {
    return allowedHosts.length ? allowedHosts.includes(normalizedHost) : true;
  }

  try {
    const originUrl = new URL(origin);
    const originHost = originUrl.host.toLowerCase().split(':')[0];

    if (sameSiteHost(originHost, normalizedHost)) return true;
    if (allowedOrigins.includes(origin)) return true;
    if (allowedHosts.includes(originHost)) return true;

    return false;
  } catch {
    return false;
  }
}
