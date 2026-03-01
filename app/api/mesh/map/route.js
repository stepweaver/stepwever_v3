import { NextResponse } from 'next/server';
import { getPositionsLast24h } from '@/lib/mesh/db';

export const revalidate = 10;
export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const hours = Math.min(
      Math.max(1, parseInt(searchParams.get('hours') || '24', 10)),
      168
    );

    const positions = await getPositionsLast24h(hours);

    return NextResponse.json(positions, {
      headers: {
        'Cache-Control': 's-maxage=10, stale-while-revalidate=20',
      },
    });
  } catch (err) {
    console.error('[api/mesh/map]', err);
    return NextResponse.json(
      { error: 'Failed to fetch positions' },
      { status: 500 }
    );
  }
}
