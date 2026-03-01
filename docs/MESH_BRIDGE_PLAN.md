# Meshtastic Mesh Bridge Plan

End-to-end flow for Meshtastic MQTT data from the mesh to the stepweaver.dev dashboard.

## Architecture

```
Meshtastic devices (LoRa)
    → Gateway node (WiFi/cellular)
    → MQTT broker (e.g. mqtt.meshtastic.org)
    → Raspberry Pi subscriber (LAN)
    → Parse JSON, dedupe, insert
    → Supabase Postgres
    → Next.js API routes (Vercel)
    → Dashboard UI (browser)
```

**No direct connection** from Vercel or browser to the Pi. All mesh data flows through Supabase.

## Pi Ingest Responsibilities

The Pi runs an MQTT subscriber that:

1. **Subscribe** to `msh/REGION/2/json/+/+` (e.g. `msh/US/2/json/+/+`) for JSON packets
2. **Parse** each message: `type`, `from`, `sender`, `channel`, `payload`, `timestamp`, etc.
3. **Dedupe** by `packet_id` (or `id`) before insert
4. **Insert** into `mesh_packets` with `source: 'mqtt'` (or `'rf'` if from local radio)
5. **Upsert** `mesh_nodes` when `type === 'nodeinfo'` (from `payload.id`, `shortname`, `longname`, `hardware`)
6. **Insert** into `mesh_positions` when `type === 'position'` (from `payload.latitude_i`, `longitude_i`, etc.)
7. **Write heartbeat** to `mesh_ingest_heartbeat` periodically (e.g. every 30s): `last_packet_at`, `last_heartbeat_at`, `packets_ingested`

**Credentials:** Pi uses `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` only. Never expose these to the browser.

## Site Flow

1. **Next.js API routes** (`/api/mesh/recent`, `/api/mesh/nodes`, `/api/mesh/map`, `/api/mesh/health`) use the server-side Supabase client with `SUPABASE_SERVICE_ROLE_KEY` to read from private tables.
2. **Dashboard page** (`/meshtastic/dashboard`) fetches initial data server-side, then client components poll the API every 5–10 seconds for a live feel.
3. **Caching:** Routes use `revalidate` and `Cache-Control` headers for fast responses.

## Operational Notes

### Monitoring

- **Pi process:** Ensure the ingest service stays running (systemd, Docker, or PM2)
- **Supabase:** Monitor row counts for `mesh_packets`, `mesh_positions`; set retention if needed
- **Heartbeat freshness:** If `last_heartbeat_at` is > 1–2 minutes old, the ingest may be down

### Deploying Updates

- **Pi ingest:** Restart the service after code/config changes. Use `systemctl restart mesh-ingest` or equivalent.
- **Vercel:** Deploys automatically on git push to the main branch. Env vars are set in Vercel dashboard.

### SQL Migrations

Migrations live in `supabase/migrations/`:

- `001_mesh_tables.sql` – tables and indexes
- `002_mesh_views.sql` – optional public views

Run via Supabase SQL Editor or `supabase db push` if using Supabase CLI.

## Security Summary

| Component        | Credentials                          | Access                    |
|-----------------|--------------------------------------|---------------------------|
| Pi ingest       | `SUPABASE_SERVICE_ROLE_KEY`          | Write to all mesh tables  |
| Next.js API     | `SUPABASE_SERVICE_ROLE_KEY`           | Read from mesh tables     |
| Browser         | None (no direct Supabase)            | Reads via API only        |

No secrets are exposed client-side.
