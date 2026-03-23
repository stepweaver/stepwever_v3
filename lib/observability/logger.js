/**
 * Central logging hook. Extend with Sentry / OpenTelemetry when keys are present.
 */

export function logError(event, context = {}) {
  if (process.env.NODE_ENV === 'development') {
    console.error(`[${event}]`, context);
    return;
  }
  console.error(JSON.stringify({ level: 'error', event, ...context }));
}

export function logSecurityEvent(event, context = {}) {
  if (process.env.NODE_ENV === 'development') {
    console.warn(`[security:${event}]`, context);
    return;
  }
  console.warn(JSON.stringify({ level: 'warn', event, security: true, ...context }));
}
