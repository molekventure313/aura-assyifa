import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET() {
  const supabase = createAdminClient();

  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, full_name, role, is_active, is_receiving_cases, created_at')
    .order('created_at', { ascending: true });

  const { data: cases } = await supabase
    .from('cases')
    .select('id, assigned_to, status, created_at')
    .order('created_at', { ascending: false })
    .limit(10);

  return NextResponse.json({ profiles, cases });
}
