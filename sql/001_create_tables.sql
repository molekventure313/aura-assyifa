-- 001_create_tables.sql

-- Enable pgcrypto for gen_random_uuid() if not enabled
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Updated at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Profiles
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('super_admin', 'admin', 'practitioner')) DEFAULT 'practitioner',
    is_active BOOLEAN DEFAULT true,
    max_active_cases INTEGER DEFAULT 10,
    phone TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Customers
CREATE TABLE IF NOT EXISTS public.customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT,
    state TEXT,
    problem TEXT,
    notes TEXT,
    is_repeat BOOLEAN DEFAULT false,
    submission_count INTEGER DEFAULT 1,
    first_submission_at TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_customers_phone ON public.customers(phone);
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON public.customers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Submissions
CREATE TABLE IF NOT EXISTS public.submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT,
    state TEXT,
    problem TEXT,
    notes TEXT,
    source TEXT DEFAULT 'Direct',
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    utm_content TEXT,
    utm_term TEXT,
    landing_page_url TEXT,
    referrer_url TEXT,
    fbclid TEXT,
    fbp TEXT,
    fbc TEXT,
    ip_address TEXT,
    user_agent TEXT,
    event_id TEXT,
    consent_contact BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Cases
CREATE TABLE IF NOT EXISTS public.cases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
    submission_id UUID REFERENCES public.submissions(id),
    assigned_to UUID REFERENCES public.profiles(id),
    assigned_by UUID REFERENCES public.profiles(id),
    status TEXT NOT NULL DEFAULT 'Baru' CHECK (status IN ('Baru', 'Belum Diambil', 'Sedang Diurus', 'Berjaya Dihubungi', 'Tidak Dapat Dihubungi', 'Perlu Follow-up', 'Rawatan Selesai', 'Pelanggan Batal', 'Kes Berulang', 'Diarkibkan')),
    assigned_at TIMESTAMPTZ,
    contacted_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    version INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_cases_status ON public.cases(status);
CREATE INDEX IF NOT EXISTS idx_cases_assigned_to ON public.cases(assigned_to);
CREATE INDEX IF NOT EXISTS idx_cases_customer_id ON public.cases(customer_id);
CREATE TRIGGER update_cases_updated_at BEFORE UPDATE ON public.cases FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Case Notes
CREATE TABLE IF NOT EXISTS public.case_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
    created_by UUID NOT NULL REFERENCES public.profiles(id),
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Follow-ups
CREATE TABLE IF NOT EXISTS public.follow_ups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
    practitioner_id UUID NOT NULL REFERENCES public.profiles(id),
    follow_up_date DATE NOT NULL,
    follow_up_time TIME,
    notes TEXT,
    is_completed BOOLEAN DEFAULT false,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_follow_ups_date_completed ON public.follow_ups(follow_up_date, is_completed);

-- Case Status History
CREATE TABLE IF NOT EXISTS public.case_status_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
    changed_by UUID REFERENCES public.profiles(id),
    old_status TEXT,
    new_status TEXT NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Activity Logs
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id),
    action_type TEXT NOT NULL,
    entity_type TEXT,
    entity_id UUID,
    old_values JSONB,
    new_values JSONB,
    description TEXT,
    ip_address TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON public.activity_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_logs_user_id ON public.activity_logs(user_id);

-- Salespage Config
CREATE TABLE IF NOT EXISTS public.salespage_config (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sections JSONB NOT NULL DEFAULT '[]',
    theme JSONB NOT NULL DEFAULT '{}',
    tracking JSONB NOT NULL DEFAULT '{}',
    is_published BOOLEAN DEFAULT true,
    published_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ DEFAULT now(),
    updated_by UUID REFERENCES public.profiles(id)
);
CREATE TRIGGER update_salespage_config_updated_at BEFORE UPDATE ON public.salespage_config FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Tracking Config
CREATE TABLE IF NOT EXISTS public.tracking_config (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    meta_pixel_id TEXT,
    meta_access_token TEXT,
    meta_test_event_code TEXT,
    tiktok_pixel_id TEXT,
    google_analytics_id TEXT,
    is_active BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);
CREATE TRIGGER update_tracking_config_updated_at BEFORE UPDATE ON public.tracking_config FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
