-- Meshtastic mesh data tables (Pi ingest writes; Next.js reads via service role)
-- Run in Supabase SQL Editor or via Supabase CLI

-- Packets: raw Meshtastic MQTT JSON
CREATE TABLE IF NOT EXISTS mesh_packets (
  id BIGSERIAL PRIMARY KEY,
  received_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  packet_id BIGINT NOT NULL,
  type TEXT,
  from_node BIGINT,
  sender TEXT,
  channel INTEGER,
  source TEXT CHECK (source IN ('rf', 'mqtt')),
  channel_name TEXT,
  payload JSONB,
  raw JSONB,
  UNIQUE (packet_id)
);

CREATE INDEX IF NOT EXISTS idx_mesh_packets_received_at ON mesh_packets (received_at DESC);
CREATE INDEX IF NOT EXISTS idx_mesh_packets_from_node ON mesh_packets (from_node);
CREATE INDEX IF NOT EXISTS idx_mesh_packets_type ON mesh_packets (type);
CREATE INDEX IF NOT EXISTS idx_mesh_packets_source ON mesh_packets (source);
CREATE INDEX IF NOT EXISTS idx_mesh_packets_channel ON mesh_packets (channel);

-- Nodes: derived from nodeinfo packets (latest snapshot per node)
CREATE TABLE IF NOT EXISTS mesh_nodes (
  node_id BIGINT PRIMARY KEY,
  shortname TEXT,
  longname TEXT,
  hardware INTEGER,
  last_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_packet_id BIGINT,
  payload JSONB
);

CREATE INDEX IF NOT EXISTS idx_mesh_nodes_last_seen ON mesh_nodes (last_seen_at DESC);

-- Positions: from position packets
CREATE TABLE IF NOT EXISTS mesh_positions (
  id BIGSERIAL PRIMARY KEY,
  node_id BIGINT NOT NULL,
  lat DOUBLE PRECISION,
  lon DOUBLE PRECISION,
  altitude DOUBLE PRECISION,
  received_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  packet_id BIGINT
);

CREATE INDEX IF NOT EXISTS idx_mesh_positions_node_id ON mesh_positions (node_id);
CREATE INDEX IF NOT EXISTS idx_mesh_positions_received_at ON mesh_positions (received_at DESC);

-- Ingest heartbeat: Pi writes periodically
CREATE TABLE IF NOT EXISTS mesh_ingest_heartbeat (
  id BIGSERIAL PRIMARY KEY,
  ingestor_id TEXT NOT NULL,
  last_packet_at TIMESTAMPTZ,
  last_heartbeat_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  packets_ingested BIGINT DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_mesh_ingest_heartbeat_last ON mesh_ingest_heartbeat (last_heartbeat_at DESC);
