import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(req) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    
    const { searchParams } = new URL(req.url);
    const dateFilter = searchParams.get('date');
    const practitionerId = searchParams.get('practitioner_id');

    let query = supabase.from('follow_ups').select(`
      *,
      cases (*, customers (full_name, phone))
    `).eq('is_completed', false);

    if (profile.role === 'practitioner') {
      query = query.eq('practitioner_id', user.id);
    } else if (practitionerId) {
      query = query.eq('practitioner_id', practitionerId);
    }

    if (dateFilter === 'today') {
      const today = new Date().toISOString().split('T')[0];
      query = query.gte('scheduled_at', today + 'T00:00:00.000Z').lte('scheduled_at', today + 'T23:59:59.999Z');
    } else if (dateFilter === 'overdue') {
      query = query.lt('scheduled_at', new Date().toISOString());
    } else if (dateFilter === 'upcoming') {
      query = query.gt('scheduled_at', new Date().toISOString());
    }

    query = query.order('scheduled_at', { ascending: true });

    const { data, error } = await query;
    if (error) throw error;
    
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
