'use client';

import { useState, useEffect } from 'react';

/** @param {{ health: object | null; pollInterval?: number }} props */
export default function HealthPanel({ health: initialHealth, pollInterval = 8000 }) {
  const [health, setHealth] = useState(initialHealth);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchHealth = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/mesh/health');
        if (cancelled) return;
        if (res.ok) {
          const data = await res.json();
          setHealth(data);
        }
      } catch {
        if (!cancelled) setHealth(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    const id = setInterval(fetchHealth, pollInterval);
    fetchHealth();
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [pollInterval]);

  const lastPacket = health?.last_packet_at
    ? new Date(health.last_packet_at).toLocaleString()
    : '—';
  const lastHeartbeat = health?.last_heartbeat_at
    ? new Date(health.last_heartbeat_at).toLocaleString()
    : '—';
  const packetsIngested = health?.packets_ingested ?? '—';
  const ingestorId = health?.ingestor_id ?? '—';

  const isStale =
    health?.last_heartbeat_at &&
    Date.now() - new Date(health.last_heartbeat_at).getTime() > 60 * 1000;

  return (
    <section className="rounded-sm overflow-hidden border border-neon/15 bg-panel/20">
      <header className="bg-panel/50 border-b border-neon/20 px-5 py-2.5 flex items-center justify-between">
        <span className="font-ocr text-[10px] tracking-[0.18em] text-neon/40 uppercase">
          Health
        </span>
        <span className="flex items-center gap-2">
          {loading && (
            <span className="font-ocr text-[10px] text-neon/50 animate-pulse">Syncing</span>
          )}
          <span
            className={`inline-flex h-2 w-2 rounded-full ${
              isStale ? 'bg-warn' : 'bg-neon'
            } ${!health ? 'opacity-50' : ''}`}
            title={isStale ? 'Heartbeat stale' : 'Live'}
          />
          <span className="font-ocr text-[10px] text-text/20">
            {health ? (isStale ? 'Stale' : 'Live') : 'No data'}
          </span>
        </span>
      </header>
      <div className="p-5 font-ocr text-xs space-y-2">
        <div className="flex justify-between gap-4">
          <span className="text-neon/50">Ingestor</span>
          <span className="text-text/90 font-mono">{ingestorId}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-neon/50">Last packet</span>
          <span className="text-text/90">{lastPacket}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-neon/50">Last heartbeat</span>
          <span className="text-text/90">{lastHeartbeat}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-neon/50">Packets ingested</span>
          <span className="text-text/90 font-mono">{packetsIngested}</span>
        </div>
      </div>
    </section>
  );
}
