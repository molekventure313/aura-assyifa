-- 002_rls_policies.sql

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follow_ups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.salespage_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tracking_config ENABLE ROW LEVEL SECURITY;

-- Helper function to check roles
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid()
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- ═══════════════════════════════════════
-- PROFILES
-- ═══════════════════════════════════════
CREATE POLICY "Users can read own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can read all profiles" ON public.profiles
    FOR SELECT USING (public.get_user_role() IN ('admin', 'super_admin'));

CREATE POLICY "Super admins can insert profiles" ON public.profiles
    FOR INSERT WITH CHECK (public.get_user_role() = 'super_admin');

CREATE POLICY "Super admins can update profiles" ON public.profiles
    FOR UPDATE USING (public.get_user_role() = 'super_admin');

-- ═══════════════════════════════════════
-- CUSTOMERS
-- ═══════════════════════════════════════
CREATE POLICY "Authenticated users can read customers" ON public.customers
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Anon and authenticated can insert customers" ON public.customers
    FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Admins can update customers" ON public.customers
    FOR UPDATE TO authenticated USING (public.get_user_role() IN ('admin', 'super_admin'));

CREATE POLICY "Admins can delete customers" ON public.customers
    FOR DELETE TO authenticated USING (public.get_user_role() IN ('admin', 'super_admin'));

-- ═══════════════════════════════════════
-- SUBMISSIONS
-- ═══════════════════════════════════════
CREATE POLICY "Authenticated users can read submissions" ON public.submissions
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Anyone can insert submissions" ON public.submissions
    FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Admins can delete submissions" ON public.submissions
    FOR DELETE TO authenticated USING (public.get_user_role() IN ('admin', 'super_admin'));

-- ═══════════════════════════════════════
-- CASES
-- ═══════════════════════════════════════
CREATE POLICY "Practitioners read assigned or unassigned cases" ON public.cases
    FOR SELECT TO authenticated USING (
        assigned_to = auth.uid() OR 
        assigned_to IS NULL OR 
        public.get_user_role() IN ('admin', 'super_admin')
    );

CREATE POLICY "Practitioners update assigned cases" ON public.cases
    FOR UPDATE TO authenticated USING (
        assigned_to = auth.uid() OR 
        public.get_user_role() IN ('admin', 'super_admin')
    );

CREATE POLICY "Anon and authenticated can insert cases" ON public.cases
    FOR INSERT TO anon, authenticated WITH CHECK (true);

-- ═══════════════════════════════════════
-- CASE NOTES
-- ═══════════════════════════════════════
CREATE POLICY "Users read case notes" ON public.case_notes
    FOR SELECT TO authenticated USING (
        EXISTS (SELECT 1 FROM public.cases c WHERE c.id = case_id AND (c.assigned_to = auth.uid() OR public.get_user_role() IN ('admin', 'super_admin')))
    );

CREATE POLICY "Users insert case notes" ON public.case_notes
    FOR INSERT TO authenticated WITH CHECK (created_by = auth.uid());

CREATE POLICY "Admins delete case notes" ON public.case_notes
    FOR DELETE TO authenticated USING (public.get_user_role() IN ('admin', 'super_admin'));

-- ═══════════════════════════════════════
-- FOLLOW-UPS
-- ═══════════════════════════════════════
CREATE POLICY "Practitioners manage own follow_ups" ON public.follow_ups
    FOR SELECT TO authenticated USING (
        practitioner_id = auth.uid() OR 
        public.get_user_role() IN ('admin', 'super_admin')
    );

CREATE POLICY "Practitioners insert follow_ups" ON public.follow_ups
    FOR INSERT TO authenticated WITH CHECK (practitioner_id = auth.uid());

CREATE POLICY "Practitioners update own follow_ups" ON public.follow_ups
    FOR UPDATE TO authenticated USING (
        practitioner_id = auth.uid() OR 
        public.get_user_role() IN ('admin', 'super_admin')
    );

CREATE POLICY "Practitioners delete own follow_ups" ON public.follow_ups
    FOR DELETE TO authenticated USING (
        practitioner_id = auth.uid() OR 
        public.get_user_role() IN ('admin', 'super_admin')
    );

-- ═══════════════════════════════════════
-- CASE STATUS HISTORY
-- ═══════════════════════════════════════
CREATE POLICY "Authenticated read status history" ON public.case_status_history
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Anon and authenticated insert status history" ON public.case_status_history
    FOR INSERT TO anon, authenticated WITH CHECK (true);

-- ═══════════════════════════════════════
-- ACTIVITY LOGS
-- ═══════════════════════════════════════
CREATE POLICY "Authenticated read activity logs" ON public.activity_logs
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Anon and authenticated insert activity logs" ON public.activity_logs
    FOR INSERT TO anon, authenticated WITH CHECK (true);

-- ═══════════════════════════════════════
-- SALESPAGE CONFIG
-- ═══════════════════════════════════════
CREATE POLICY "Anyone can read salespage config" ON public.salespage_config
    FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Super admin can update salespage config" ON public.salespage_config
    FOR UPDATE TO authenticated USING (public.get_user_role() = 'super_admin');

CREATE POLICY "Super admin can insert salespage config" ON public.salespage_config
    FOR INSERT TO authenticated WITH CHECK (public.get_user_role() = 'super_admin');

-- ═══════════════════════════════════════
-- TRACKING CONFIG
-- ═══════════════════════════════════════
CREATE POLICY "Anyone can read tracking config" ON public.tracking_config
    FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Super admin can update tracking config" ON public.tracking_config
    FOR UPDATE TO authenticated USING (public.get_user_role() = 'super_admin');

CREATE POLICY "Super admin can insert tracking config" ON public.tracking_config
    FOR INSERT TO authenticated WITH CHECK (public.get_user_role() = 'super_admin');
