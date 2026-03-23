/**
 * Same-origin and allowlist checks for browser-initiated API requests.
 */

export function isAllowedRequestOrigin(request) {
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');

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
    return false;
  }

  if (!origin) {
    return allowedHosts.length ? allowedHosts.includes(normalizedHost) : true;
  }

  try {
    const originUrl = new URL(origin);
    const originHost = originUrl.host.toLowerCase().split(':')[0];

    if (originHost === normalizedHost) return true;
    if (allowedOrigins.includes(origin)) return true;
    if (allowedHosts.includes(originHost)) return true;

    return false;
  } catch {
    return false;
  }
}
