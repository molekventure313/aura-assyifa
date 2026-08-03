// Debug endpoint — check if tracking_config is readable
// Access: /api/pixel-debug (remove or secure this after debugging)
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'NOT_SET';
  const hasServiceKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY;
  const hasAnonKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  let dbResult = null;
  let dbError = null;

  try {
    const adminClient = createAdminClient();
    const { data, error } = await adminClient
      .from('tracking_config')
      .select('meta_pixel_id, is_active, updated_at')
      .limit(1)
      .maybeSingle();
    dbResult = data;
    dbError = error?.message || null;
  } catch (e) {
    dbError = e?.message;
  }

  return Response.json({
    env: {
      supabase_url: url,
      has_service_role_key: hasServiceKey,
      has_anon_key: hasAnonKey,
    },
    tracking_config: dbResult,
    db_error: dbError,
  });
}
