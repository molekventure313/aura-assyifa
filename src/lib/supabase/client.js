import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://cvygzimtwhezxulvydrn.supabase.co';
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_3PZP6cp7K4VpTTMEGM2UlQ_u8ldC3dz';

  return createBrowserClient(url, key);
}
