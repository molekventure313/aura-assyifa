import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password, fullName } = body;

    if (!email || !password || !fullName) {
      return NextResponse.json({ success: false, error: 'All fields are required.' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ success: false, error: 'Password must be at least 6 characters.' }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Check if any profiles exist — only allow setup if no users yet
    const { count } = await supabase
      .from('profiles')
      .select('id', { count: 'exact', head: true });

    if (count && count > 0) {
      return NextResponse.json(
        { success: false, error: 'Setup already completed. Use the admin dashboard to add new users.' },
        { status: 403 }
      );
    }

    // Create auth user via admin API
    const { data: authData, error: signUpError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email
      user_metadata: { full_name: fullName },
    });

    if (signUpError) throw signUpError;

    // Create profile with super_admin role
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: authData.user.id,
        email,
        full_name: fullName,
        role: 'super_admin',
        is_active: true,
        max_active_cases: 999,
      });

    if (profileError) throw profileError;

    return NextResponse.json({
      success: true,
      data: { userId: authData.user.id },
    });

  } catch (error) {
    console.error('Setup API Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create account.' },
      { status: 500 }
    );
  }
}
