import { NextResponse } from 'next/server';

/**
 * Personal bookmark URL — not linked anywhere on the site.
 * Rename this folder if you want a different path (e.g. app/w7k2/route.js → /w7k2).
 * Target URL: NEXT_PUBLIC_OPERATOR_CONSOLE_URL or fallback below.
 */
const TARGET =
  process.env.NEXT_PUBLIC_OPERATOR_CONSOLE_URL ||
  'https://console-taupe-pi.vercel.app';

export function GET() {
  if (!TARGET?.startsWith('http')) {
    return new NextResponse('Not configured', { status: 404 });
  }
  return NextResponse.redirect(TARGET, 302);
}
