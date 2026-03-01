'use client';

import { useState, useEffect, useMemo } from 'react';
import MeshFilters from './MeshFilters';

/** @param {{ packets: Array<object>; nodes: Array<object>; pollInterval?: number }} props */
export default function RecentPacketLog({
  packets: initialPackets,
  nodes = [],
  pollInterval = 8000,
}) {
  const [packets, setPackets] = useState(initialPackets);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ source: '', channel: '', node: '' });

  const channels = useMemo(() => {
    const set = new Set();
    packets.forEach((p) => {
      if (p.channel != null) set.add(String(p.channel));
    });
    return Array.from(set).sort();
  }, [packets]);

  useEffect(() => {
    let cancelled = false;

    const fetchPackets = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        params.set('limit', '50');
        if (filters.source) params.set('source', filters.source);
        if (filters.channel) params.set('channel', filters.channel);
        if (filters.node) params.set('node', filters.node);
        const res = await fetch(`/api/mesh/recent?${params}`);
        if (cancelled) return;
        if (res.ok) {
          const data = await res.json();
          setPackets(data);
        }
      } catch {
        if (!cancelled) setPackets(initialPackets);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    const id = setInterval(fetchPackets, pollInterval);
    fetchPackets();
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [pollInterval, filters.source, filters.channel, filters.node]);

  const payloadPreview = (p) => {
    if (!p.payload) return '—';
    if (typeof p.payload === 'string') return p.payload.slice(0, 40);
    if (p.payload.text) return String(p.payload.text).slice(0, 40);
    if (p.payload.latitude_i != null)
      return `pos ${(p.payload.latitude_i / 1e7).toFixed(4)}, ${(
        (p.payload.longitude_i ?? 0) / 1e7
      ).toFixed(4)}`;
    return JSON.stringify(p.payload).slice(0, 40);
  };

  return (
    <section className="rounded-sm overflow-hidden border border-neon/15 bg-panel/20">
      <header className="bg-panel/50 border-b border-neon/20 px-5 py-2.5 flex flex-wrap items-center justify-between gap-3">
        <span className="font-ocr text-[10px] tracking-[0.18em] text-neon/40 uppercase">
          Recent Packets
        </span>
        <MeshFilters
          source={filters.source}
          channel={filters.channel}
          node={filters.node}
          channels={channels}
          nodes={nodes}
          onChange={setFilters}
        />
      </header>
      <div className="overflow-x-auto">
        <table className="w-full text-left font-ocr text-xs">
          <thead>
            <tr className="border-b border-neon/15 text-neon/50 uppercase tracking-wider">
              <th className="px-4 py-2 font-medium">Time</th>
              <th className="px-4 py-2 font-medium">Type</th>
              <th className="px-4 py-2 font-medium">From</th>
              <th className="px-4 py-2 font-medium hidden sm:table-cell">Sender</th>
              <th className="px-4 py-2 font-medium">Ch</th>
              <th className="px-4 py-2 font-medium">Src</th>
              <th className="px-4 py-2 font-medium">Payload</th>
            </tr>
          </thead>
          <tbody>
            {packets.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-text/40">
                  {loading ? 'Loading…' : 'No packets yet'}
                </td>
              </tr>
            ) : (
              packets.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-neon/10 hover:bg-panel/30 transition-colors"
                >
                  <td className="px-4 py-2 text-text/60 whitespace-nowrap">
                    {p.received_at
                      ? new Date(p.received_at).toLocaleTimeString()
                      : '—'}
                  </td>
                  <td className="px-4 py-2 text-neon/70">{p.type ?? '—'}</td>
                  <td className="px-4 py-2 font-mono text-text/90">{p.from_node ?? '—'}</td>
                  <td className="px-4 py-2 font-mono text-text/70 hidden sm:table-cell">
                    {p.sender ?? '—'}
                  </td>
                  <td className="px-4 py-2 text-text/60">{p.channel ?? '—'}</td>
                  <td className="px-4 py-2 text-text/60 uppercase">{p.source ?? '—'}</td>
                  <td className="px-4 py-2 text-text/50 truncate max-w-[140px]">
                    {payloadPreview(p)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
