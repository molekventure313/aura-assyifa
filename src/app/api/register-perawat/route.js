import { createClient } from '@supabase/supabase-js';

export async function POST(request) {
  try {
    const { fullName, email, password, phone } = await request.json();

    if (!fullName || !email || !password) {
      return Response.json(
        { error: 'Sila lengkapkan nama penuh, e-mel, dan kata laluan.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return Response.json(
        { error: 'Kata laluan mestilah sekurang-kurangnya 6 aksara.' },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://cvygzimtwhezxulvydrn.supabase.co';
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // Service role client bypassing RLS
    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // 1. Create auth user in Supabase
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName,
        role: 'practitioner'
      }
    });

    if (authError) {
      console.error('Supabase Auth Create User Error:', authError);
      return Response.json(
        { error: authError.message || 'Gagal mendaftar akaun pengguna.' },
        { status: 400 }
      );
    }

    const userId = authData.user.id;

    // 2. Insert profile into profiles table with is_active: false (pending approval)
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .upsert({
        id: userId,
        full_name: fullName,
        email,
        phone: phone || null,
        role: 'practitioner',
        is_active: false,
        is_receiving_cases: true,
        updated_at: new Date().toISOString()
      });

    if (profileError) {
      console.error('Supabase Profile Insert Error:', profileError);
      return Response.json(
        { error: profileError.message || 'Akaun dicipta tetapi profil gagal dikemaskini.' },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      message: 'Pendaftaran perawat berjaya! Akaun anda kini MENUNGGU KELULUSAN oleh Admin sebelum boleh log masuk.'
    });

  } catch (error) {
    console.error('Register Perawat Route Error:', error);
    return Response.json(
      { error: 'Ralat pelayan dalaman semasa mendaftar perawat.' },
      { status: 500 }
    );
  }
}
