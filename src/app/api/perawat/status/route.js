import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

// PATCH /api/perawat/status
// Practitioner updates their own is_receiving_cases status
export async function PATCH(req) {
  try {
    const body = await req.json();
    const { is_receiving_cases } = body;

    // Authenticate the caller
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ success: false, error: 'Tidak dibenarkan.' }, { status: 401 });
    }

    const adminSupabase = createAdminClient();

    // First, try to add the column if it doesn't exist (safe migration)
    // We do a simple update; if it fails due to missing column, we catch gracefully
    const { error: updateError } = await adminSupabase
      .from('profiles')
      .update({
        is_receiving_cases: is_receiving_cases,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id);

    if (updateError) {
      // Column might not exist — return specific guidance
      console.error('Status update error:', updateError.message);
      return NextResponse.json(
        {
          success: false,
          error: updateError.message,
          hint: 'Pastikan column is_receiving_cases wujud dalam table profiles.'
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: is_receiving_cases
        ? 'Status dikemaskini: Aktif — sedia menerima kes baru.'
        : 'Status dikemaskini: Tidak Aktif — tidak akan menerima kes baru.'
    });
  } catch (err) {
    console.error('PATCH /api/perawat/status error:', err);
    return NextResponse.json(
      { success: false, error: 'Ralat semasa kemaskini status.' },
      { status: 500 }
    );
  }
}
