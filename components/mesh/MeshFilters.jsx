'use client';

import { useCallback } from 'react';

/**
 * @typedef {Object} MeshFiltersProps
 * @property {string} [source] - 'rf' | 'mqtt' | ''
 * @property {string} [channel]
 * @property {string} [node]
 * @property {string[]} [channels] - unique channel values for dropdown
 * @property {Array<{node_id: number}>} [nodes] - for node dropdown
 * @property {(filters: { source?: string; channel?: string; node?: string }) => void} onChange
 */

/** @param {MeshFiltersProps} props */
export default function MeshFilters({
  source = '',
  channel = '',
  node = '',
  channels = [],
  nodes = [],
  onChange,
}) {
  const handleSourceChange = useCallback(
    (e) => {
      const v = e.target.value;
      onChange({ source: v || undefined, channel, node });
    },
    [channel, node, onChange]
  );

  const handleChannelChange = useCallback(
    (e) => {
      const v = e.target.value;
      onChange({ source, channel: v || undefined, node });
    },
    [source, node, onChange]
  );

  const handleNodeChange = useCallback(
    (e) => {
      const v = e.target.value;
      onChange({ source, channel, node: v || undefined });
    },
    [source, channel, onChange]
  );

  return (
    <div className="flex flex-wrap items-center gap-3 font-ocr text-xs">
      <label className="flex items-center gap-2">
        <span className="text-neon/50 uppercase tracking-wider">Source</span>
        <select
          value={source}
          onChange={handleSourceChange}
          className="bg-panel/60 border border-neon/20 rounded px-2 py-1 text-text focus:outline-none focus:border-neon/50"
        >
          <option value="">All</option>
          <option value="rf">RF</option>
          <option value="mqtt">MQTT</option>
        </select>
      </label>
      <label className="flex items-center gap-2">
        <span className="text-neon/50 uppercase tracking-wider">Channel</span>
        <select
          value={channel}
          onChange={handleChannelChange}
          className="bg-panel/60 border border-neon/20 rounded px-2 py-1 text-text focus:outline-none focus:border-neon/50"
        >
          <option value="">All</option>
          {channels.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>
      <label className="flex items-center gap-2">
        <span className="text-neon/50 uppercase tracking-wider">Node</span>
        <select
          value={node}
          onChange={handleNodeChange}
          className="bg-panel/60 border border-neon/20 rounded px-2 py-1 text-text focus:outline-none focus:border-neon/50"
        >
          <option value="">All</option>
          {nodes.map((n) => (
            <option key={n.node_id} value={String(n.node_id)}>
              {n.shortname || n.longname || n.node_id}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
