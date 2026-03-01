-- Public views for mesh data (optional RLS path; site uses service role on private tables)
-- These views expose non-sensitive columns if you later want anon-key reads or Realtime.

CREATE OR REPLACE VIEW mesh_packets_public AS
SELECT
  id,
  received_at,
  packet_id,
  type,
  from_node,
  sender,
  channel,
  source,
  channel_name,
  payload
FROM mesh_packets;

CREATE OR REPLACE VIEW mesh_nodes_public AS
SELECT
  node_id,
  shortname,
  longname,
  hardware,
  last_seen_at,
  last_packet_id
FROM mesh_nodes;

CREATE OR REPLACE VIEW mesh_positions_public AS
SELECT
  id,
  node_id,
  lat,
  lon,
  altitude,
  received_at,
  packet_id
FROM mesh_positions;

CREATE OR REPLACE VIEW mesh_health_public AS
SELECT
  ingestor_id,
  last_packet_at,
  last_heartbeat_at,
  packets_ingested
FROM mesh_ingest_heartbeat
ORDER BY last_heartbeat_at DESC
LIMIT 1;
