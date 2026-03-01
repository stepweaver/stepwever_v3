'use client';

/**
 * Map panel - placeholder with data shape.
 * Data shape: Array<{ id, node_id, lat, lon, altitude, received_at, packet_id }>
 *
 * To implement a real map: use Leaflet + react-leaflet + OpenStreetMap tiles,
 * or Mapbox GL, or a simple static map with markers.
 */
export default function MapPanel({ positions = [] }) {
  return (
    <section className="rounded-sm overflow-hidden border border-neon/15 bg-panel/20">
      <header className="bg-panel/50 border-b border-neon/20 px-5 py-2.5 flex items-center justify-between">
        <span className="font-ocr text-[10px] tracking-[0.18em] text-neon/40 uppercase">
          Map
        </span>
        <span className="font-ocr text-[10px] text-text/20">
          {positions.length} position{positions.length !== 1 ? 's' : ''} (24h)
        </span>
      </header>
      <div className="p-6 min-h-[200px] flex items-center justify-center">
        <div className="text-center text-text/50 font-ocr text-sm">
          <p className="mb-2">Map placeholder</p>
          <p className="text-[10px] text-neon/30">
            Data shape: lat, lon, altitude, node_id, received_at
          </p>
          {positions.length > 0 && (
            <p className="mt-3 text-neon/50 text-[10px]">
              {positions.length} position record{positions.length !== 1 ? 's' : ''} ready for map
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
