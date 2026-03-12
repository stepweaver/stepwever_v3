function fmt(label, value) {
  return `${label.padEnd(32, '.')} ${value}`;
}

export function runDiagnostics() {
  const nav = typeof navigator !== 'undefined' ? navigator : {};
  const connection =
    nav.connection || nav.mozConnection || nav.webkitConnection || {};
  const timeZone =
    typeof Intl !== 'undefined'
      ? Intl.DateTimeFormat().resolvedOptions().timeZone || 'UNKNOWN'
      : 'UNKNOWN';

  const viewport =
    typeof window !== 'undefined'
      ? `${window.innerWidth}x${window.innerHeight}`
      : 'UNKNOWN';

  const online =
    typeof nav.onLine === 'boolean'
      ? nav.onLine
        ? 'ONLINE'
        : 'OFFLINE'
      : 'UNKNOWN';

  const cores = nav.hardwareConcurrency || 'UNKNOWN';
  const memory = nav.deviceMemory ? `${nav.deviceMemory} GB` : 'UNKNOWN';
  const touch = nav.maxTouchPoints > 0 ? 'PRESENT' : 'ABSENT';
  const language = nav.language || 'UNKNOWN';
  const platform = nav.userAgentData?.platform || nav.platform || 'UNKNOWN';
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'REDUCED'
      : 'FULL';

  return [
    '=== SYSTEM DIAGNOSTICS ===',
    fmt('RUNTIME', 'BROWSER'),
    fmt('PLATFORM', platform),
    fmt('ONLINE STATUS', online),
    fmt('VIEWPORT', viewport),
    fmt('CPU CORES', String(cores)),
    fmt('DEVICE MEMORY', memory),
    fmt('TOUCH INTERFACE', touch),
    fmt('LANGUAGE', language),
    fmt('TIME ZONE', timeZone),
    fmt('ANIMATION PROFILE', reducedMotion),
    fmt('NETWORK PROFILE', connection.effectiveType || 'UNKNOWN'),
    fmt(
      'DOWNLINK',
      connection.downlink ? `${connection.downlink} Mb/s` : 'UNKNOWN'
    ),
    '',
    'STATUS :: NOMINAL',
  ];
}

