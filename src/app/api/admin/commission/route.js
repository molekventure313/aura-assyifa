import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

// Helper: get date range based on period (Malaysia UTC+8)
function getDateRange(period) {
  const myNow = new Date(new Date().getTime() + 8 * 60 * 60 * 1000);
  const todayStr = myNow.toISOString().split('T')[0];

  if (period === 'today') {
    return { from: `${todayStr}T00:00:00+08:00`, to: `${todayStr}T23:59:59+08:00` };
  }
  if (period === 'yesterday') {
    const yest = new Date(myNow);
    yest.setUTCDate(myNow.getUTCDate() - 1);
    const yStr = yest.toISOString().split('T')[0];
    return { from: `${yStr}T00:00:00+08:00`, to: `${yStr}T23:59:59+08:00` };
  }
  if (period === 'week') {
    const startOfWeek = new Date(myNow);
    startOfWeek.setUTCDate(myNow.getUTCDate() - myNow.getUTCDay());
    return { from: `${startOfWeek.toISOString().split('T')[0]}T00:00:00+08:00`, to: `${todayStr}T23:59:59+08:00` };
  }
  if (period === 'month') {
    const startOfMonth = `${myNow.getUTCFullYear()}-${String(myNow.getUTCMonth() + 1).padStart(2, '0')}-01`;
    return { from: `${startOfMonth}T00:00:00+08:00`, to: `${todayStr}T23:59:59+08:00` };
  }
  // 'all' — no filter
  return { from: null, to: null };
}

export async function GET(req) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    const adminClient = createAdminClient();
    const { data: profile } = await adminClient.from('profiles').select('role').eq('id', user.id).single();
    if (!['admin', 'super_admin'].includes(profile?.role)) {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const period = searchParams.get('period') || 'month';
    const { from, to } = getDateRange(period);

    // Get treatment price from tracking_config
    const { data: config } = await adminClient.from('tracking_config').select('treatment_price').limit(1).maybeSingle();
    const treatmentPrice = parseFloat(config?.treatment_price || 0);

    // Get all practitioners
    const { data: practitioners } = await adminClient
      .from('profiles')
      .select('id, full_name')
      .in('role', ['practitioner', 'perawat']);

    // Get total ads spend for period
    let spendQuery = adminClient.from('ads_spend').select('amount');
    if (from) spendQuery = spendQuery.gte('spend_date', from.split('T')[0]);
    if (to) spendQuery = spendQuery.lte('spend_date', to.split('T')[0]);
    const { data: spendRecords } = await spendQuery;
    const totalSpent = (spendRecords || []).reduce((s, r) => s + parseFloat(r.amount || 0), 0);

    // Get new leads (non-repeat cases) in period — for kos leads calculation
    let leadsQuery = adminClient
      .from('cases')
      .select('id, assigned_to, customers!cases_customer_id_fkey(is_repeat)');
    if (from) leadsQuery = leadsQuery.gte('created_at', from);
    if (to) leadsQuery = leadsQuery.lte('created_at', to);
    const { data: allLeads } = await leadsQuery;
    const newLeads = (allLeads || []).filter(c => !c.customers?.is_repeat);
    const totalLeads = newLeads.length;
    const costPerLead = totalLeads > 0 ? totalSpent / totalLeads : 0;

    // Get completed cases (Rawatan Selesai + Telah Dibayar) in period — for sales calculation
    // Using updated_at as proxy for completion date
    let completedQuery = adminClient
      .from('cases')
      .select('id, assigned_to')
      .in('status', ['Rawatan Selesai', 'Telah Dibayar']);
    if (from) completedQuery = completedQuery.gte('updated_at', from);
    if (to) completedQuery = completedQuery.lte('updated_at', to);
    const { data: completedCases } = await completedQuery;

    // Build per-practitioner commission data
    const practMap = {};
    (practitioners || []).forEach(p => { practMap[p.id] = p.full_name; });

    const commissionMap = {};

    // Init all practitioners with 0
    (practitioners || []).forEach(p => {
      commissionMap[p.id] = {
        practitioner_id: p.id,
        practitioner_name: p.full_name,
        total_leads: 0,
        kos_leads: 0,
        rawatan_selesai: 0,
        sales: 0,
        komisen: 0,
        perawat_dapat: 0,
        esyifaa_dapat: 0,
      };
    });

    // Count leads per practitioner
    newLeads.forEach(c => {
      const pid = c.assigned_to;
      if (pid && commissionMap[pid]) {
        commissionMap[pid].total_leads += 1;
      }
    });

    // Count completed cases per practitioner
    (completedCases || []).forEach(c => {
      const pid = c.assigned_to;
      if (pid && commissionMap[pid]) {
        commissionMap[pid].rawatan_selesai += 1;
      }
    });

    // Calculate commissions
    Object.values(commissionMap).forEach(p => {
      p.kos_leads = totalLeads > 0
        ? parseFloat(((p.total_leads / totalLeads) * totalSpent).toFixed(2))
        : 0;
      p.sales = parseFloat((p.rawatan_selesai * treatmentPrice).toFixed(2));
      p.komisen = parseFloat((p.sales - p.kos_leads).toFixed(2));
      p.perawat_dapat = parseFloat((Math.max(0, p.komisen) * 0.6).toFixed(2));
      p.esyifaa_dapat = parseFloat((Math.max(0, p.komisen) * 0.4).toFixed(2));
    });

    // Summary
    const commissionList = Object.values(commissionMap).sort((a, b) => b.komisen - a.komisen);
    const totalSales = commissionList.reduce((s, p) => s + p.sales, 0);
    const totalKomisen = commissionList.reduce((s, p) => s + p.komisen, 0);
    const totalPerawatDapat = commissionList.reduce((s, p) => s + p.perawat_dapat, 0);
    const totalEsyifaaDapat = commissionList.reduce((s, p) => s + p.esyifaa_dapat, 0);

    return NextResponse.json({
      success: true,
      data: {
        treatment_price: treatmentPrice,
        total_spent: parseFloat(totalSpent.toFixed(2)),
        total_leads: totalLeads,
        cost_per_lead: parseFloat(costPerLead.toFixed(4)),
        practitioners: commissionList,
        summary: {
          total_sales: parseFloat(totalSales.toFixed(2)),
          total_komisen: parseFloat(totalKomisen.toFixed(2)),
          total_perawat_dapat: parseFloat(totalPerawatDapat.toFixed(2)),
          total_esyifaa_dapat: parseFloat(totalEsyifaaDapat.toFixed(2)),
        }
      }
    });

  } catch (error) {
    console.error('GET commission error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
