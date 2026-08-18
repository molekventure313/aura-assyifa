import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

/**
 * GET /api/setup/page-views-table
 * One-time setup — buat table page_views jika belum wujud.
 * Boleh delete route ni selepas berjaya.
 */
export async function GET() {
  try {
    const adminClient = createAdminClient();

    // Test sama ada table dah ada
    const { error: testError } = await adminClient
      .from('page_views')
      .select('id')
      .limit(1);

    if (!testError) {
      return NextResponse.json({ success: true, message: 'Table page_views sudah wujud ✅' });
    }

    // Table tak wujud — cuba create via raw SQL menggunakan rpc
    const { error } = await adminClient.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS page_views (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          salespage_slug TEXT NOT NULL,
          viewed_at TIMESTAMPTZ DEFAULT NOW(),
          ip_address TEXT,
          user_agent TEXT
        );
        CREATE INDEX IF NOT EXISTS idx_page_views_slug ON page_views(salespage_slug);
        CREATE INDEX IF NOT EXISTS idx_page_views_viewed_at ON page_views(viewed_at);
      `
    });

    if (error) {
      // Kalau rpc tak wujud, cuba insert dummy untuk trigger auto-create (tidak berkesan, tapi cek)
      return NextResponse.json({
        success: false,
        error: error.message,
        instruction: 'Sila jalankan SQL ini dalam Supabase SQL Editor:',
        sql: `CREATE TABLE IF NOT EXISTS page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  salespage_slug TEXT NOT NULL,
  viewed_at TIMESTAMPTZ DEFAULT NOW(),
  ip_address TEXT,
  user_agent TEXT
);
CREATE INDEX IF NOT EXISTS idx_page_views_slug ON page_views(salespage_slug);
CREATE INDEX IF NOT EXISTS idx_page_views_viewed_at ON page_views(viewed_at);`
      }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Table page_views berjaya dibuat ✅' });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
