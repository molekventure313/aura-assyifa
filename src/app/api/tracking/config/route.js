import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

// Public endpoint — returns only pixel_id and is_active (no secrets)
export async function GET() {
  try {
    const adminClient = createAdminClient();
    const { data } = await adminClient
      .from('tracking_config')
      .select('meta_pixel_id, is_active')
      .limit(1)
      .single();

    return NextResponse.json({
      success: true,
      pixel_id: (data?.is_active && data?.meta_pixel_id) ? data.meta_pixel_id : null,
      is_active: !!data?.is_active,
    });
  } catch (error) {
    return NextResponse.json({ success: false, pixel_id: null, is_active: false });
  }
}
