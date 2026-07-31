import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { logActivity } from '@/lib/utils/logger';

export async function GET(req) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    
    const { searchParams } = new URL(req.url);
    const roleParam = searchParams.get('role');

    // Use service role client if RLS restricts normal profile reads across users
    const adminSupabase = createAdminClient();

    let query = adminSupabase.from('profiles').select('*').order('created_at', { ascending: false });
    if (roleParam === 'perawat' || roleParam === 'practitioner') {
      query = query.in('role', ['practitioner', 'perawat']);
    } else if (roleParam) {
      query = query.eq('role', roleParam);
    }

    const { data: users, error } = await query;
    if (error) throw error;
    
    // Fetch cases to compute live active & completed metrics for each practitioner
    const { data: cases } = await adminSupabase.from('cases').select('assigned_to, status');
    
    const formattedUsers = (users || []).map(u => {
      const uCases = (cases || []).filter(c => c.assigned_to === u.id);
      const activeCount = uCases.filter(c => ['Sedang Diurus', 'Perlu Follow-up', 'Baru', 'Belum Diambil'].includes(c.status)).length;
      const completedCount = uCases.filter(c => c.status === 'Rawatan Selesai').length;
      return {
        ...u,
        name: u.full_name || u.name || 'Perawat',
        active_cases: activeCount,
        completed_cases: completedCount
      };
    });

    return NextResponse.json({ success: true, data: formattedUsers });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password, full_name, role, max_active_cases, phone } = body;
    
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    const adminSupabase = createAdminClient();
    const { data: authData, error: authError } = await adminSupabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name, role: role || 'practitioner' }
    });
    
    if (authError) throw authError;

    const { error: profileError } = await adminSupabase.from('profiles').upsert({
      id: authData.user.id,
      full_name,
      email,
      role: role || 'practitioner',
      phone: phone || null,
      max_active_cases: max_active_cases || 10,
      is_active: true,
      updated_at: new Date().toISOString()
    });

    if (profileError) throw profileError;

    await logActivity(adminSupabase, { 
      userId: user.id, 
      actionType: 'create_user', 
      entityType: 'user', 
      entityId: authData.user.id,
      description: `Admin cipta perawat baharu: ${full_name}`
    });

    return NextResponse.json({ success: true, data: authData.user });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const body = await req.json();
    const { id, full_name, role, is_active, max_active_cases } = body;
    
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    const adminSupabase = createAdminClient();
    
    const updatePayload = { updated_at: new Date().toISOString() };
    if (full_name !== undefined) updatePayload.full_name = full_name;
    if (role !== undefined) updatePayload.role = role;
    if (is_active !== undefined) updatePayload.is_active = is_active;
    if (max_active_cases !== undefined) updatePayload.max_active_cases = max_active_cases;

    const { error } = await adminSupabase
      .from('profiles')
      .update(updatePayload)
      .eq('id', id);

    if (error) throw error;
    
    await logActivity(adminSupabase, { 
      userId: user.id, 
      actionType: 'update_user', 
      entityType: 'user', 
      entityId: id, 
      description: `Status perawat dikemaskini: is_active=${is_active}` 
    });

    return NextResponse.json({ success: true, message: 'Status perawat berjaya dikemaskini!' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
