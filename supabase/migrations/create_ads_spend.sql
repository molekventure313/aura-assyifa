-- ============================================================
-- JALANKAN SQL INI dalam Supabase SQL Editor
-- Dashboard > SQL Editor > New Query > Paste > Run
-- ============================================================

CREATE TABLE IF NOT EXISTS ads_spend (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  spend_date date NOT NULL UNIQUE,
  amount numeric(10,2) NOT NULL DEFAULT 0,
  notes text,
  created_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE ads_spend ENABLE ROW LEVEL SECURITY;

-- Allow service role (admin operations) full access
CREATE POLICY "Service role full access" ON ads_spend
  USING (true)
  WITH CHECK (true);

-- Index for faster date queries
CREATE INDEX IF NOT EXISTS idx_ads_spend_date ON ads_spend(spend_date DESC);
