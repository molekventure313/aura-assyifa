import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { logActivity } from '@/lib/utils/logger';

export async function POST(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { new_password } = body;
    
    if (!new_password) {
      return NextResponse.json({ success: false, error: 'New password required' }, { status: 400 });
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    if (profile.role !== 'super_admin') return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });

    const adminSupabase = createAdminClient();
    const { error } = await adminSupabase.auth.admin.updateUserById(id, { password: new_password });

    if (error) throw error;
    
    await logActivity({ action_type: 'reset_password', entity_type: 'user', entity_id: id, user_id: user.id });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
