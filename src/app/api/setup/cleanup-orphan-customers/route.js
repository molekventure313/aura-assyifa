import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

/**
 * GET /api/setup/cleanup-orphan-customers
 * One-time cleanup — delete customers yang tiada kes langsung.
 * Selamat dijalankan, hanya affect customers tanpa kes.
 */
export async function GET() {
  try {
    const adminClient = createAdminClient();

    // Cari semua customers
    const { data: allCustomers, error: custErr } = await adminClient
      .from('customers')
      .select('id, full_name');

    if (custErr) throw custErr;

    // Cari customers yang ada cases
    const { data: customersWithCases, error: caseErr } = await adminClient
      .from('cases')
      .select('customer_id');

    if (caseErr) throw caseErr;

    const withCasesSet = new Set((customersWithCases || []).map(c => c.customer_id));

    // Filter: customers tanpa sebarang kes
    const orphans = (allCustomers || []).filter(c => !withCasesSet.has(c.id));

    if (orphans.length === 0) {
      return NextResponse.json({
        success: true,
        message: '✅ Tiada orphan customers — semua customers ada kes.',
        deleted: 0,
      });
    }

    const orphanIds = orphans.map(o => o.id);

    // Delete submissions dulu, lepas tu customers
    await adminClient.from('submissions').delete().in('customer_id', orphanIds);
    const { error: deleteErr } = await adminClient
      .from('customers')
      .delete()
      .in('id', orphanIds);

    if (deleteErr) throw deleteErr;

    return NextResponse.json({
      success: true,
      message: `✅ Berjaya padam ${orphans.length} orphan customer(s).`,
      deleted: orphans.length,
      names: orphans.map(o => o.full_name),
    });

  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
