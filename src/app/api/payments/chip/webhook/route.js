import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createAdminClient } from '@/lib/supabase/admin';
import { logActivity } from '@/lib/utils/logger';
import { sendCAPIEvent } from '@/lib/tracking/capi';
import { sendGroupNotification, buildLeadMessage } from '@/lib/notifications/wasapbot';

function verifySignature(rawBody, signatureHeader, publicKeyPem) {
  if (!signatureHeader || !publicKeyPem) return false;
  try {
    const formattedKey = publicKeyPem.replace(/\\n/g, '\n');
    const verifier = crypto.createVerify('SHA256');
    verifier.update(rawBody);

    // Normalize signature header
    const normalized = signatureHeader.replace(/^sha256=/i, '').trim();
    let sigBuffer;
    if (/^[0-9a-f]+$/i.test(normalized) && normalized.length % 2 === 0) {
      sigBuffer = Buffer.from(normalized, 'hex');
    } else {
      sigBuffer = Buffer.from(normalized, 'base64');
    }

    return verifier.verify(formattedKey, sigBuffer);
  } catch (err) {
    console.error('Chip RSA Signature verification failed:', err);
    return false;
  }
}

export async function POST(req) {
  try {
    const rawBody = await req.text();
    let payload;
    try {
      payload = JSON.parse(rawBody);
    } catch (_) {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }

    const signatureHeader = req.headers.get('x-signature');
    const CHIP_PUBLIC_KEY = process.env.CHIP_PUBLIC_KEY;

    // Optional audit mode / local bypass if key is not configured in env yet
    if (CHIP_PUBLIC_KEY && signatureHeader) {
      const isValid = verifySignature(rawBody, signatureHeader, CHIP_PUBLIC_KEY);
      if (!isValid) {
        console.warn('Invalid Chip Webhook Signature header:', signatureHeader);
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
    }

    // Extract ID & status from TOP-LEVEL JSON
    const billId = String(payload?.id || payload?.payment_id || '').trim();
    const chipStatus = String(payload?.status || '').toLowerCase().trim();

    if (!billId) {
      return NextResponse.json({ error: 'Missing bill id' }, { status: 400 });
    }

    const isPaid = ['paid', 'success', 'completed', 'executed'].includes(chipStatus);
    const isFailed = ['failed', 'cancelled', 'canceled', 'refunded', 'expired'].includes(chipStatus);

    const supabase = createAdminClient();

    // ─── Find Submission by Chip Bill ID ───
    const { data: submissions, error: searchErr } = await supabase
      .from('submissions')
      .select('*')
      .ilike('notes', `%[CHIP_BILL_ID:${billId}]%`)
      .limit(1);

    if (searchErr || !submissions || submissions.length === 0) {
      console.warn(`Submission not found for Chip Bill ID: ${billId}`);
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }

    const submission = submissions[0];

    // Idempotency check: if already processed, return 200 OK
    const isAlreadyPaid = (submission.notes || '').includes('[STATUS: paid]');
    if (isAlreadyPaid) {
      return NextResponse.json({ success: true, message: 'Already processed' });
    }

    if (isPaid) {
      // 1. Update submission status to paid
      const updatedNotes = `${submission.notes || ''} [STATUS: paid] [CHIP_STATUS: ${chipStatus}] [PAID_AT: ${new Date().toISOString()}]`;
      await supabase
        .from('submissions')
        .update({ notes: updatedNotes })
        .eq('id', submission.id);

      // 2. Strict Round-Robin Rotation among Active Practitioners
      const { data: allProfiles } = await supabase
        .from('profiles')
        .select('id, full_name, email, role, is_active, is_receiving_cases, created_at')
        .order('created_at', { ascending: true });

      const activePractitioners = (allProfiles || []).filter(p => {
        const isNotSuperAdmin = p.role !== 'super_admin';
        const isAccountActive = p.is_active !== false;
        const isReceiving = p.is_receiving_cases !== false;
        return isNotSuperAdmin && isAccountActive && isReceiving;
      });

      let assignedPractitioner = null;
      if (activePractitioners.length > 0) {
        const { data: lastCase } = await supabase
          .from('cases')
          .select('assigned_to, created_at')
          .not('assigned_to', 'is', null)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (lastCase && lastCase.assigned_to) {
          const lastIdx = activePractitioners.findIndex(p => p.id === lastCase.assigned_to);
          const nextIdx = lastIdx !== -1 ? (lastIdx + 1) % activePractitioners.length : 0;
          assignedPractitioner = activePractitioners[nextIdx];
        } else {
          assignedPractitioner = activePractitioners[0];
        }
      }

      const initialCaseStatus = assignedPractitioner ? 'Sedang Diurus' : 'Baru';

      // 3. Create Case
      const { data: newCase, error: caseErr } = await supabase
        .from('cases')
        .insert({
          customer_id: submission.customer_id,
          submission_id: submission.id,
          status: initialCaseStatus,
          assigned_to: assignedPractitioner ? assignedPractitioner.id : null,
        })
        .select()
        .single();

      if (!caseErr && newCase) {
        await supabase.from('case_status_history').insert({
          case_id: newCase.id,
          old_status: null,
          new_status: initialCaseStatus,
          notes: `Bayaran FPX RM50 BERJAYA via Chip Gateway. Diagih kepada perawat ${assignedPractitioner ? assignedPractitioner.full_name : 'Belum diagih'}`,
        });
      }

      // 4. Fire Meta CAPI "Purchase" event
      try {
        await sendCAPIEvent({
          eventName: 'Purchase',
          eventId: submission.event_id || submission.id,
          sourceUrl: submission.landing_page_url || null,
          userData: {
            phone: submission.phone,
            client_ip_address: submission.ip_address,
            client_user_agent: submission.user_agent,
          },
          customData: {
            currency: 'MYR',
            value: 50.00,
          },
          clientIpAddress: submission.ip_address,
          clientUserAgent: submission.user_agent,
          fbp: submission.fbp || null,
          fbc: submission.fbc || null,
        });
      } catch (capiErr) {
        console.error('CAPI Purchase Error (non-blocking):', capiErr);
      }

      // 5. Send WasapBot Notification
      try {
        const msg = buildLeadMessage({
          name: submission.full_name,
          phone: submission.phone,
          session: 'FPX Paid (RM50)',
          source: submission.source || 'fsp-checkout',
          problem: submission.problem || '',
          assignedTo: assignedPractitioner ? assignedPractitioner.full_name : null,
          isRepeat: false,
        });
        await sendGroupNotification(`💳 [BAYARAN FPX SUKSES]\n${msg}`);
      } catch (waErr) {
        console.error('WasapBot Error (non-blocking):', waErr);
      }

      // Log activity
      await logActivity(supabase, {
        userId: null,
        actionType: 'chip_payment_success',
        entityType: 'submission',
        entityId: submission.id,
        newValues: {
          bill_id: billId,
          status: 'paid',
          case_id: newCase?.id || null,
        },
        description: `Bayaran FPX RM50 disahkan untuk ${submission.full_name} (${submission.phone})`,
        ipAddress: submission.ip_address || 'webhook',
      });
    } else if (isFailed) {
      await supabase
        .from('submissions')
        .update({
          notes: `${submission.notes || ''} [STATUS: failed] [CHIP_STATUS: ${chipStatus}]`,
        })
        .eq('id', submission.id);
    }

    return NextResponse.json({ success: true, status: chipStatus });

  } catch (error) {
    console.error('Chip Webhook API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
