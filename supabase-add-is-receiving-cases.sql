-- ============================================================
-- Aura Assyifa: Tambah column is_receiving_cases ke table profiles
-- Jalankan SQL ini dalam Supabase Dashboard > SQL Editor
-- ============================================================

-- Tambah column is_receiving_cases jika belum ada
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS is_receiving_cases BOOLEAN DEFAULT TRUE;

-- Set semua perawat sedia ada kepada aktif (menerima kes) secara default
UPDATE public.profiles
  SET is_receiving_cases = TRUE
  WHERE is_receiving_cases IS NULL;

-- Semak hasilnya
SELECT id, full_name, role, is_active, is_receiving_cases
FROM public.profiles
ORDER BY created_at ASC;
