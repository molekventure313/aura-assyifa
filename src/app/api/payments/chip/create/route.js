import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { validateMalaysianPhone } from '@/lib/utils/phone';
import { logActivity } from '@/lib/utils/logger';

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      full_name,
      phone,
      problem,
      source,
      honeypot,
      event_id,
      amount_in_myr = 50.00,
      // UTM params
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_term,
      // Tracking
      landing_page_url,
      referrer_url,
      fbclid,
      fbp,
      fbc,
    } = body;

    // Check honeypot (spam protection)
    if (honeypot) {
      return NextResponse.json({
        success: true,
        checkout_url: '/payment-success?mock=true',
      });
    }

    // Validate required fields
    if (!full_name || !full_name.trim() || !phone || !phone.trim()) {
      return NextResponse.json(
        { success: false, error: 'Sila isi nama penuh dan nombor telefon.' },
        { status: 400 }
      );
    }

    // Validate phone
    const phoneResult = validateMalaysianPhone(phone);
    if (!phoneResult.valid) {
      return NextResponse.json(
        { success: false, error: phoneResult.error || 'Sila masukkan nombor telefon yang sah.' },
        { status: 400 }
      );
    }

    const formattedPhone = phoneResult.formatted; // e.g. 60139556403
    const cleanName = full_name.trim();

    // Extract request metadata
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || req.headers.get('x-real-ip')
      || 'unknown';
    const user_agent = req.headers.get('user-agent') || 'unknown';

    const supabase = createAdminClient();
    const initialProblemNotes = `[Bayaran FPX: RM${amount_in_myr.toFixed(2)}] ${problem ? `Simptom: ${problem}` : ''}`;

    // ─── Try Check/Create Customer (robust if RLS policy active without service key) ───
    let customerId = null;
    try {
      const { data: existingCustomer } = await supabase
        .from('customers')
        .select('id, submission_count')
        .eq('phone', formattedPhone)
        .maybeSingle();

      if (existingCustomer) {
        customerId = existingCustomer.id;
      } else {
        const { data: newCustomer } = await supabase
          .from('customers')
          .insert({
            full_name: cleanName,
            phone: formattedPhone,
            problem: initialProblemNotes,
            submission_count: 1,
            is_repeat: false,
            first_submission_at: new Date().toISOString(),
          })
          .select('id')
          .single();

        if (newCustomer) customerId = newCustomer.id;
      }
    } catch (custErr) {
      console.warn('Customer DB insert skipped (RLS/Service key):', custErr.message);
    }

    // ─── Create initial Submission record ───
    let submissionId = `sub_${Date.now()}`;
    const submissionData = {
      full_name: cleanName,
      phone: formattedPhone,
      problem: initialProblemNotes,
      notes: `[STATUS: pending_payment] [AMOUNT: MYR ${amount_in_myr.toFixed(2)}]`,
      source: source || 'fsp-checkout',
      utm_source: utm_source || null,
      utm_medium: utm_medium || null,
      utm_campaign: utm_campaign || null,
      utm_content: utm_content || null,
      utm_term: utm_term || null,
      landing_page_url: landing_page_url || null,
      referrer_url: referrer_url || null,
      fbclid: fbclid || null,
      fbp: fbp || null,
      fbc: fbc || null,
      ip_address: ip,
      user_agent,
      event_id: event_id || null,
      consent_contact: true,
    };

    if (customerId) submissionData.customer_id = customerId;

    try {
      const { data: submission, error: subErr } = await supabase
        .from('submissions')
        .insert(submissionData)
        .select()
        .single();

      if (!subErr && submission) {
        submissionId = submission.id;
      }
    } catch (subErr) {
      console.warn('Submission DB insert skipped (RLS/Service key):', subErr.message);
    }

    // ─── Call Chip Payment Gateway API ───
    const CHIP_API_KEY = process.env.CHIP_API_KEY;
    const CHIP_BRAND_ID = process.env.CHIP_BRAND_ID;
    const APP_URL = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || 'http://localhost:3000';

    let checkout_url = '';
    let bill_id = '';

    if (CHIP_API_KEY && CHIP_BRAND_ID) {
      const chipPhone = formattedPhone;
      const chipEmail = `${chipPhone}@esyifaa.com`;
      const amountInSen = Math.round(amount_in_myr * 100); // RM50.00 -> 5000 sen

      let callbackUrl = `${APP_URL}/api/payments/chip/webhook`;
      // Chip API rejects callback URLs with custom ports (e.g. :3000). Use production domain as fallback.
      if (callbackUrl.includes('localhost') || callbackUrl.includes(':3000')) {
        callbackUrl = 'https://e-syifa.com/api/payments/chip/webhook';
      }

      const chipPayload = {
        brand_id: CHIP_BRAND_ID,
        client: {
          email: chipEmail,
          phone: chipPhone,
          full_name: cleanName,
        },
        purchase: {
          currency: 'MYR',
          products: [
            {
              name: "Pakej Rawatan Jarak Jauh ESyifaa'",
              price: amountInSen,
              quantity: 1,
            },
          ],
          return_url: `${APP_URL}/payment-success?submission_id=${submissionId}`,
        },
        // IMPORTANT: success_callback MUST be at top level with standard port (http/https)
        success_callback: callbackUrl,
        success_redirect: `${APP_URL}/payment-success?submission_id=${submissionId}`,
        failure_redirect: `${APP_URL}/fsp-checkout?status=failed`,
      };

      const chipRes = await fetch('https://gate.chip-in.asia/api/v1/purchases/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${CHIP_API_KEY}`,
        },
        body: JSON.stringify(chipPayload),
      });

      if (!chipRes.ok) {
        const errText = await chipRes.text();
        console.error('Chip Purchase API error:', chipRes.status, errText);
        throw new Error(`Ralat Chip Payment Gateway (${chipRes.status}). Sila semak credentials Chip.`);
      }

      const chipData = await chipRes.json();
      bill_id = chipData.id;
      checkout_url = chipData.checkout_url || chipData.payment_url;

      // Update submission notes with Chip Bill ID if submission ID is UUID
      try {
        await supabase
          .from('submissions')
          .update({
            notes: `[CHIP_BILL_ID:${bill_id}] [STATUS: pending_payment] [AMOUNT: MYR ${amount_in_myr.toFixed(2)}]`,
          })
          .eq('id', submissionId);
      } catch (_) {}

    } else {
      // Chip credentials not set in Netlify environment variables
      // This should never happen in production — add CHIP_API_KEY and CHIP_BRAND_ID in Netlify dashboard
      const isDev = process.env.NODE_ENV === 'development';
      if (!isDev) {
        console.error('CHIP_API_KEY or CHIP_BRAND_ID missing in production environment variables!');
        return NextResponse.json(
          { success: false, error: 'Sistem pembayaran belum dikonfigurasi. Sila hubungi admin.' },
          { status: 503 }
        );
      }
      // Development fallback mock mode only
      console.warn('[DEV MODE] CHIP credentials not set. Using mock mode fallback.');
      bill_id = `MOCK_CHIP_${Date.now()}`;
      checkout_url = `/payment-success?submission_id=${submissionId}&mock=true`;
    }

    // Log Activity (safely)
    try {
      await logActivity(supabase, {
        userId: null,
        actionType: 'chip_payment_create',
        entityType: 'submission',
        entityId: submissionId,
        newValues: {
          customer_id: customerId,
          bill_id,
          amount: amount_in_myr,
          source: source || 'fsp-checkout',
        },
        description: `Inisiasi bayaran Chip FPX (RM${amount_in_myr.toFixed(2)}) oleh ${cleanName} (${formattedPhone})`,
        ipAddress: ip,
      });
    } catch (_) {}

    return NextResponse.json({
      success: true,
      checkout_url,
      submission_id: submissionId,
      bill_id,
    });

  } catch (error) {
    console.error('Chip Create Payment API Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Satu ralat telah berlaku. Sila cuba lagi.' },
      { status: 500 }
    );
  }
}
