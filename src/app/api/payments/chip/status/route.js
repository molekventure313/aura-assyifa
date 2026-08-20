import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const submissionId = searchParams.get('submission_id');

    if (!submissionId) {
      return NextResponse.json({ error: 'Missing submission_id' }, { status: 400 });
    }

    const supabase = createAdminClient();

    const { data: submission, error } = await supabase
      .from('submissions')
      .select('id, full_name, phone, notes, created_at')
      .eq('id', submissionId)
      .single();

    if (error || !submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }

    const notes = submission.notes || '';
    const isPaid = notes.includes('[STATUS: paid]') || searchParams.get('mock') === 'true';
    const isFailed = notes.includes('[STATUS: failed]');

    return NextResponse.json({
      success: true,
      submission_id: submission.id,
      full_name: submission.full_name,
      phone: submission.phone,
      payment_status: isPaid ? 'completed' : isFailed ? 'failed' : 'pending',
    });

  } catch (error) {
    console.error('Payment Status API error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
