import { NextResponse } from 'next/server';
import { getIngestHealth } from '@/lib/mesh/db';

export const revalidate = 5;
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const health = await getIngestHealth();

    return NextResponse.json(health ?? {}, {
      headers: {
        'Cache-Control': 's-maxage=5, stale-while-revalidate=10',
      },
    });
  } catch (err) {
    console.error('[api/mesh/health]', err);
    return NextResponse.json(
      { error: 'Failed to fetch health' },
      { status: 500 }
    );
  }
}
