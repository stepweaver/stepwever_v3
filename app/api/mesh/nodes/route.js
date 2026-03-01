import { NextResponse } from 'next/server';
import { getLatestNodes } from '@/lib/mesh/db';

export const revalidate = 10;
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const nodes = await getLatestNodes();

    return NextResponse.json(nodes, {
      headers: {
        'Cache-Control': 's-maxage=10, stale-while-revalidate=20',
      },
    });
  } catch (err) {
    console.error('[api/mesh/nodes]', err);
    return NextResponse.json(
      { error: 'Failed to fetch nodes' },
      { status: 500 }
    );
  }
}
