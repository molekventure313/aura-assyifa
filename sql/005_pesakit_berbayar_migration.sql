-- ============================================================
-- Migration: Pesakit Berbayar — FPX Payment Tracking
-- Jalankan dalam Supabase SQL Editor
-- ============================================================

-- 1. Tambah payment_type (appointment vs fpx_payment)
ALTER TABLE public.submissions
  ADD COLUMN IF NOT EXISTS payment_type TEXT DEFAULT 'appointment'
    CHECK (payment_type IN ('appointment', 'fpx_payment'));

-- 2. Tambah payment_status untuk track status bayaran FPX
ALTER TABLE public.submissions
  ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT NULL
    CHECK (payment_status IN ('pending', 'completed', 'failed') OR payment_status IS NULL);

-- 3. Tambah chip_bill_id untuk rujukan Chip purchase ID
ALTER TABLE public.submissions
  ADD COLUMN IF NOT EXISTS chip_bill_id TEXT DEFAULT NULL;

-- 4. Indexes untuk query performance
CREATE INDEX IF NOT EXISTS idx_submissions_payment_type ON public.submissions(payment_type);
CREATE INDEX IF NOT EXISTS idx_submissions_chip_bill_id ON public.submissions(chip_bill_id);
CREATE INDEX IF NOT EXISTS idx_submissions_payment_status ON public.submissions(payment_status);

-- 5. Backfill: tandakan submission sedia ada dari fsp-checkout sebagai fpx_payment
UPDATE public.submissions
  SET payment_type = 'fpx_payment',
      payment_status = CASE
        WHEN notes ILIKE '%[STATUS: paid]%' THEN 'completed'
        WHEN notes ILIKE '%[STATUS: failed]%' THEN 'failed'
        ELSE 'pending'
      END,
      chip_bill_id = (
        SELECT (regexp_match(notes, '\[CHIP_BILL_ID:([^\]]+)\]'))[1]
        WHERE notes IS NOT NULL
      )
  WHERE source ILIKE '%checkout%';

-- ✅ Done. Verify:
-- SELECT payment_type, payment_status, count(*) FROM submissions GROUP BY 1, 2;
