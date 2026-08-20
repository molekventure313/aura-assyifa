import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET(req) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    const adminClient = createAdminClient();
    const { data: profile } = await adminClient.from('profiles').select('role').eq('id', user.id).single();
    const isAdmin = ['admin', 'super_admin'].includes(profile?.role);
    if (!isAdmin) return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });

    const { searchParams } = new URL(req.url);
    const paymentStatus = searchParams.get('payment_status') || 'all'; // all | pending | completed | failed
    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 50;
    const offset = (page - 1) * limit;

    // Query submissions with payment_type = fpx_payment, join with cases for perawat info
    let query = adminClient
      .from('submissions')
      .select(`
        id, full_name, phone, problem, source, payment_type, payment_status, chip_bill_id,
        created_at, notes, customer_id, event_id,
        cases:cases!cases_submission_id_fkey (
          id, status, assigned_to, created_at,
          practitioner:profiles!cases_assigned_to_fkey (id, full_name)
        )
      `, { count: 'exact' })
      .eq('payment_type', 'fpx_payment');

    if (paymentStatus !== 'all') {
      query = query.eq('payment_status', paymentStatus);
    }

    if (search) {
      query = query.or(`full_name.ilike.%${search}%,phone.ilike.%${search}%`);
    }

    query = query.order('created_at', { ascending: false }).range(offset, offset + limit - 1);

    const { data: submissions, error, count } = await query;
    if (error) throw error;

    // Stats: total kutipan
    let statsCompleted = 0, statsPending = 0, statsFailed = 0;
    try {
      const { data: statsData } = await adminClient
        .from('submissions')
        .select('payment_status')
        .eq('payment_type', 'fpx_payment');
      (statsData || []).forEach(s => {
        if (s.payment_status === 'completed') statsCompleted++;
        else if (s.payment_status === 'pending') statsPending++;
        else if (s.payment_status === 'failed') statsFailed++;
      });
    } catch (_) {}

    const formatted = (submissions || []).map(s => {
      const caseRecord = Array.isArray(s.cases) ? s.cases[0] : s.cases;
      return {
        id: s.id,
        full_name: s.full_name,
        phone: s.phone,
        problem: s.problem,
        source: s.source,
        payment_status: s.payment_status || 'pending',
        chip_bill_id: s.chip_bill_id,
        created_at: s.created_at,
        // Case info (created after payment confirmed)
        case_id: caseRecord?.id || null,
        case_status: caseRecord?.status || null,
        assigned_to: caseRecord?.assigned_to || null,
        practitioner_name: caseRecord?.practitioner?.full_name || null,
      };
    });

    return NextResponse.json({
      success: true,
      data: formatted,
      stats: {
        total_completed: statsCompleted,
        total_pending: statsPending,
        total_failed: statsFailed,
        total_revenue_rm: statsCompleted * 50,
      },
      meta: { total: count, page, limit, totalPages: Math.ceil((count || 0) / limit) },
    });

  } catch (error) {
    console.error('Payments List API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
