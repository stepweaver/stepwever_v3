import { NextResponse } from 'next/server';
import { getRecentPackets } from '@/lib/mesh/db';

export const revalidate = 5;
export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '50', 10), 200);
    const source = searchParams.get('source') || undefined;
    const channel = searchParams.get('channel');
    const node = searchParams.get('node');

    const filters = {};
    if (source && (source === 'rf' || source === 'mqtt')) filters.source = source;
    if (channel !== null && channel !== undefined && channel !== '') {
      const ch = parseInt(channel, 10);
      if (!Number.isNaN(ch)) filters.channel = ch;
    }
    if (node !== null && node !== undefined && node !== '') {
      const n = parseInt(node, 10);
      if (!Number.isNaN(n)) filters.node = n;
    }

    const packets = await getRecentPackets(limit, filters);

    return NextResponse.json(packets, {
      headers: {
        'Cache-Control': 's-maxage=5, stale-while-revalidate=10',
      },
    });
  } catch (err) {
    console.error('[api/mesh/recent]', err);
    return NextResponse.json(
      { error: 'Failed to fetch packets' },
      { status: 500 }
    );
  }
}
