-- 006_dual_pixel_tracking.sql
-- Dual tracking pixel system: FPX pixel + tracking_type per salespage

-- ─── Add FPX Pixel columns to tracking_config ───
ALTER TABLE public.tracking_config
  ADD COLUMN IF NOT EXISTS fpx_pixel_id TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS fpx_access_token TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS fpx_test_event_code TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS fpx_is_active BOOLEAN DEFAULT false;

-- ─── Add tracking_type to salespages table ───
-- 'lead'     = Pixel Utama (Lead event) — appointment salespages
-- 'purchase' = Pixel FPX (Purchase event) — checkout salespages
ALTER TABLE public.salespages
  ADD COLUMN IF NOT EXISTS tracking_type TEXT DEFAULT 'lead'
  CHECK (tracking_type IN ('lead', 'purchase'));

-- ─── Default all existing salespages to 'lead' ───
UPDATE public.salespages SET tracking_type = 'lead' WHERE tracking_type IS NULL;
