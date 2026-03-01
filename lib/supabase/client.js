'use client';

import { createClient } from '@supabase/supabase-js';

let _browserClient = null;

/**
 * Browser-side Supabase client. Uses NEXT_PUBLIC_* env vars (safe to expose).
 * Use for optional Supabase Realtime subscriptions on public views.
 * For mesh dashboard, polling via API routes is the primary approach;
 * this client is available if you add Realtime later.
 *
 * @returns {import('@supabase/supabase-js').SupabaseClient | null}
 */
export function getSupabaseBrowser() {
  if (typeof window === 'undefined') return null;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return null;

  if (!_browserClient) {
    _browserClient = createClient(url, key);
  }

  return _browserClient;
}
