import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { sendCAPIEvent } from '@/lib/tracking/capi';
import { logActivity } from '@/lib/utils/logger';

export async function POST(req) {
  try {
    const body = await req.json();
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const user_agent = req.headers.get('user-agent') || 'unknown';
    
    await sendCAPIEvent({
      event_name: body.event_name,
      event_id: body.event_id,
      event_source_url: body.url,
      user_data: { client_ip_address: ip, client_user_agent: user_agent, ...body.user_data }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Tracking API Error:', error);
    return NextResponse.json({ success: false, error: 'Tracking failed' }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    
    const adminClient = createAdminClient();
    const { data } = await adminClient.from('tracking_config').select('*').limit(1).single();

    return NextResponse.json({ 
      success: true, 
      data: data || {
        meta_pixel_id: '',
        meta_access_token: '',
        meta_test_code: '',
        is_active: false
      } 
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const body = await req.json();
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    const adminClient = createAdminClient();
    
    // Check if tracking config row exists
    const { data: existing } = await adminClient.from('tracking_config').select('id').limit(1).single();

    if (existing) {
      const { error } = await adminClient.from('tracking_config').update({
        meta_pixel_id: body.meta_pixel_id,
        meta_access_token: body.meta_access_token,
        meta_test_event_code: body.meta_test_code,
        is_active: body.is_active,
        updated_at: new Date().toISOString()
      }).eq('id', existing.id);

      if (error) throw error;
    } else {
      const { error } = await adminClient.from('tracking_config').insert({
        meta_pixel_id: body.meta_pixel_id,
        meta_access_token: body.meta_access_token,
        meta_test_event_code: body.meta_test_code,
        is_active: body.is_active,
      });

      if (error) throw error;
    }
    
    await logActivity(adminClient, { 
      userId: user.id, 
      actionType: 'update_tracking_config', 
      entityType: 'config', 
      entityId: existing?.id || 'tracking_config', 
      description: 'Tetapan Meta Pixel & CAPI dikemaskini' 
    });

    // ✅ Reset in-memory cache in capi.js so next request fetches fresh from DB
    try {
      const { resetTrackingCache } = await import('@/lib/tracking/capi');
      resetTrackingCache();
    } catch (_) {}

    return NextResponse.json({ success: true, message: 'Tetapan berjaya disimpan!' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
