import { getSupabaseServer } from '@/lib/supabase/server';

/**
 * @typedef {Object} PacketFilters
 * @property {string} [source] - 'rf' | 'mqtt'
 * @property {number} [channel]
 * @property {number} [node] - from_node
 */

/**
 * Get recent packets with optional filters.
 * @param {number} [limit=50]
 * @param {PacketFilters} [filters]
 * @returns {Promise<Array<object>>}
 */
export async function getRecentPackets(limit = 50, filters = {}) {
  const supabase = getSupabaseServer();
  let query = supabase
    .from('mesh_packets')
    .select('id, received_at, packet_id, type, from_node, sender, channel, source, channel_name, payload')
    .order('received_at', { ascending: false })
    .limit(Math.min(limit, 200));

  if (filters.source) {
    query = query.eq('source', filters.source);
  }
  if (filters.channel !== undefined && filters.channel !== null) {
    query = query.eq('channel', filters.channel);
  }
  if (filters.node !== undefined && filters.node !== null) {
    query = query.eq('from_node', filters.node);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

/**
 * Get latest node snapshots (nodes heard).
 * @returns {Promise<Array<object>>}
 */
export async function getLatestNodes() {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from('mesh_nodes')
    .select('node_id, shortname, longname, hardware, last_seen_at, last_packet_id')
    .order('last_seen_at', { ascending: false });

  if (error) throw error;
  return data ?? [];
}

/**
 * Get positions in the last N hours.
 * @param {number} [hours=24]
 * @returns {Promise<Array<object>>}
 */
export async function getPositionsLast24h(hours = 24) {
  const supabase = getSupabaseServer();
  const cutoff = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();

  const { data, error } = await supabase
    .from('mesh_positions')
    .select('id, node_id, lat, lon, altitude, received_at, packet_id')
    .gte('received_at', cutoff)
    .order('received_at', { ascending: false });

  if (error) throw error;
  return data ?? [];
}

/**
 * Get top talkers by packet count (from recent packets).
 * @param {number} [limit=10]
 * @param {number} [sampleSize=500] - number of recent packets to sample
 * @returns {Promise<Array<{ from_node: number | string, count: number }>>}
 */
export async function getTopTalkers(limit = 10, sampleSize = 500) {
  const packets = await getRecentPackets(sampleSize);
  const counts = {};
  for (const p of packets) {
    const n = p.from_node ?? 'unknown';
    counts[n] = (counts[n] ?? 0) + 1;
  }
  return Object.entries(counts)
    .map(([from_node, count]) => ({
      from_node: from_node === 'unknown' ? 'unknown' : Number(from_node),
      count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

/**
 * Get ingest health (heartbeat + last packet time).
 * @returns {Promise<object | null>}
 */
export async function getIngestHealth() {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from('mesh_ingest_heartbeat')
    .select('ingestor_id, last_packet_at, last_heartbeat_at, packets_ingested')
    .order('last_heartbeat_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return data;
}
