import dynamic from 'next/dynamic';
import MeshtasticDashboardLayout from '@/components/mesh/MeshtasticDashboardLayout';
import RecentPacketLog from '@/components/mesh/RecentPacketLog';
import NodesHeard from '@/components/mesh/NodesHeard';
import HealthPanel from '@/components/mesh/HealthPanel';
import MapPanel from '@/components/mesh/MapPanel';
import {
  getRecentPackets,
  getLatestNodes,
  getPositionsLast24h,
  getIngestHealth,
} from '@/lib/mesh/db';

const POLL_INTERVAL = 8000;

export const revalidate = 5;
export const metadata = {
  title: 'Mesh Dashboard',
  description: 'Live Meshtastic mesh data: packets, nodes, positions, and ingest health.',
};

async function getDashboardData() {
  const hasSupabase =
    process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!hasSupabase) {
    return {
      packets: [],
      nodes: [],
      positions: [],
      health: null,
    };
  }

  try {
    const [packets, nodes, positions, health] = await Promise.all([
      getRecentPackets(50),
      getLatestNodes(),
      getPositionsLast24h(24),
      getIngestHealth(),
    ]);
    return { packets, nodes, positions, health };
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[meshtastic/dashboard]', err);
    }
    return {
      packets: [],
      nodes: [],
      positions: [],
      health: null,
    };
  }
}

export default async function MeshtasticDashboardPage() {
  const { packets, nodes, positions, health } = await getDashboardData();

  return (
    <MeshtasticDashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 pb-16 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentPacketLog
              packets={packets}
              nodes={nodes}
              pollInterval={POLL_INTERVAL}
            />
          </div>
          <div className="space-y-6">
            <HealthPanel health={health} pollInterval={POLL_INTERVAL} />
            <NodesHeard nodes={nodes} pollInterval={POLL_INTERVAL} />
          </div>
        </div>

        <MapPanel positions={positions} />
      </div>
    </MeshtasticDashboardLayout>
  );
}
