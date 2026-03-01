'use client';

import { useState, useEffect } from 'react';

/** @param {{ nodes: Array<object>; pollInterval?: number }} props */
export default function NodesHeard({ nodes: initialNodes, pollInterval = 8000 }) {
  const [nodes, setNodes] = useState(initialNodes);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchNodes = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/mesh/nodes');
        if (cancelled) return;
        if (res.ok) {
          const data = await res.json();
          setNodes(data);
        }
      } catch {
        if (!cancelled) setNodes(initialNodes);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    const id = setInterval(fetchNodes, pollInterval);
    fetchNodes();
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [pollInterval]);

  return (
    <section className="rounded-sm overflow-hidden border border-neon/15 bg-panel/20">
      <header className="bg-panel/50 border-b border-neon/20 px-5 py-2.5 flex items-center justify-between">
        <span className="font-ocr text-[10px] tracking-[0.18em] text-neon/40 uppercase">
          Nodes Heard
        </span>
        <span className="font-ocr text-[10px] text-text/20">
          {loading ? '…' : nodes.length}
        </span>
      </header>
      <div className="overflow-x-auto">
        <table className="w-full text-left font-ocr text-xs">
          <thead>
            <tr className="border-b border-neon/15 text-neon/50 uppercase tracking-wider">
              <th className="px-4 py-2 font-medium">Node ID</th>
              <th className="px-4 py-2 font-medium">Short</th>
              <th className="px-4 py-2 font-medium hidden sm:table-cell">Long</th>
              <th className="px-4 py-2 font-medium">Last seen</th>
              <th className="px-4 py-2 font-medium hidden md:table-cell">HW</th>
            </tr>
          </thead>
          <tbody>
            {nodes.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-text/40">
                  No nodes heard yet
                </td>
              </tr>
            ) : (
              nodes.map((n) => (
                <tr
                  key={n.node_id}
                  className="border-b border-neon/10 hover:bg-panel/30 transition-colors"
                >
                  <td className="px-4 py-2 font-mono text-neon/80">{n.node_id}</td>
                  <td className="px-4 py-2 text-text/90">{n.shortname ?? '—'}</td>
                  <td className="px-4 py-2 text-text/70 hidden sm:table-cell truncate max-w-[120px]">
                    {n.longname ?? '—'}
                  </td>
                  <td className="px-4 py-2 text-text/60">
                    {n.last_seen_at
                      ? new Date(n.last_seen_at).toLocaleTimeString()
                      : '—'}
                  </td>
                  <td className="px-4 py-2 text-text/50 hidden md:table-cell">
                    {n.hardware ?? '—'}
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
