import { createClient } from '@supabase/supabase-js';

let _serverClient = null;

/**
 * Server-side Supabase client. Uses SUPABASE_SERVICE_ROLE_KEY for full access
 * to mesh tables (bypasses RLS). Safe for API routes and server components.
 * Never use in client components or expose the key to the browser.
 *
 * @returns {import('@supabase/supabase-js').SupabaseClient}
 */
export function getSupabaseServer() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      'Missing Supabase env: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required for mesh data access.'
    );
  }

  if (!_serverClient) {
    _serverClient = createClient(url, key, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  return _serverClient;
}
