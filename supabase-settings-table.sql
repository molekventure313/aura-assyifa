-- ============================================================
-- ESyifaa: Buat Table Settings untuk Salespage Management
-- Jalankan SQL ini dalam Supabase Dashboard > SQL Editor
-- ============================================================

-- Buat table settings
CREATE TABLE IF NOT EXISTS public.settings (
  key TEXT PRIMARY KEY,
  value TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Policy: Semua boleh baca (untuk homepage check)
CREATE POLICY "Allow public read" ON public.settings
  FOR SELECT USING (true);

-- Policy: Hanya service role boleh tulis (admin dashboard guna service role)
CREATE POLICY "Allow service role write" ON public.settings
  FOR ALL USING (auth.role() = 'service_role');

-- Insert default value (null = guna salespage utama)
INSERT INTO public.settings (key, value)
VALUES ('active_homepage_slug', NULL)
ON CONFLICT (key) DO NOTHING;

-- Semak hasilnya
SELECT * FROM public.settings;
