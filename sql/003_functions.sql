-- 003_functions.sql

-- claim_case
CREATE OR REPLACE FUNCTION public.claim_case(p_case_id UUID, p_practitioner_id UUID, p_current_version INTEGER)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_case RECORD;
    v_active_cases INTEGER;
    v_max_cases INTEGER;
BEGIN
    -- Check case
    SELECT * INTO v_case FROM public.cases WHERE id = p_case_id;
    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'message', 'Case not found');
    END IF;

    -- Check status
    IF v_case.status NOT IN ('Baru', 'Belum Diambil') THEN
        RETURN jsonb_build_object('success', false, 'message', 'Case is not available for claiming');
    END IF;

    -- Check version (optimistic locking)
    IF v_case.version != p_current_version THEN
        RETURN jsonb_build_object('success', false, 'message', 'Case has been modified by someone else');
    END IF;

    -- Check practitioner max active cases
    SELECT count(*) INTO v_active_cases FROM public.cases 
    WHERE assigned_to = p_practitioner_id AND status NOT IN ('Rawatan Selesai', 'Pelanggan Batal', 'Diarkibkan');
    
    SELECT max_active_cases INTO v_max_cases FROM public.profiles WHERE id = p_practitioner_id;

    IF v_active_cases >= v_max_cases THEN
        RETURN jsonb_build_object('success', false, 'message', 'Maximum active cases reached');
    END IF;

    -- Update case
    UPDATE public.cases 
    SET assigned_to = p_practitioner_id,
        status = 'Sedang Diurus',
        assigned_at = now(),
        version = version + 1,
        updated_at = now()
    WHERE id = p_case_id;

    -- Insert history
    INSERT INTO public.case_status_history (case_id, changed_by, old_status, new_status, notes)
    VALUES (p_case_id, p_practitioner_id, v_case.status, 'Sedang Diurus', 'Case claimed by practitioner');

    RETURN jsonb_build_object('success', true, 'message', 'Case claimed successfully');
END;
$$;

-- check_repeat_customer
CREATE OR REPLACE FUNCTION public.check_repeat_customer(p_phone TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_customer RECORD;
    v_last_case RECORD;
    v_practitioner_name TEXT;
BEGIN
    SELECT * INTO v_customer FROM public.customers WHERE phone = p_phone LIMIT 1;
    
    IF NOT FOUND THEN
        RETURN jsonb_build_object('is_repeat', false);
    END IF;

    -- Get last case
    SELECT c.*, p.full_name as p_name INTO v_last_case 
    FROM public.cases c 
    LEFT JOIN public.profiles p ON c.assigned_to = p.id
    WHERE c.customer_id = v_customer.id 
    ORDER BY c.created_at DESC LIMIT 1;

    RETURN jsonb_build_object(
        'is_repeat', true,
        'customer_id', v_customer.id,
        'submission_count', v_customer.submission_count,
        'last_submission_at', v_last_case.created_at,
        'last_practitioner_name', v_last_case.p_name,
        'previous_notes', v_customer.notes
    );
END;
$$;

-- get_dashboard_stats
CREATE OR REPLACE FUNCTION public.get_dashboard_stats(p_period TEXT DEFAULT 'today')
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_start_date TIMESTAMPTZ;
    v_stats JSONB;
BEGIN
    IF p_period = 'today' THEN
        v_start_date := current_date::timestamptz;
    ELSIF p_period = 'week' THEN
        v_start_date := date_trunc('week', current_date);
    ELSIF p_period = 'month' THEN
        v_start_date := date_trunc('month', current_date);
    ELSE
        v_start_date := '1970-01-01'::timestamptz;
    END IF;

    SELECT jsonb_build_object(
        'total_customers', (SELECT count(*) FROM public.customers WHERE created_at >= v_start_date),
        'new_cases', (SELECT count(*) FROM public.cases WHERE created_at >= v_start_date),
        'in_progress', (SELECT count(*) FROM public.cases WHERE status IN ('Sedang Diurus', 'Perlu Follow-up') AND updated_at >= v_start_date),
        'completed', (SELECT count(*) FROM public.cases WHERE status = 'Rawatan Selesai' AND completed_at >= v_start_date),
        'unreachable', (SELECT count(*) FROM public.cases WHERE status = 'Tidak Dapat Dihubungi' AND updated_at >= v_start_date),
        'repeat_customers', (SELECT count(*) FROM public.customers WHERE is_repeat = true AND updated_at >= v_start_date),
        'unclaimed_cases', (SELECT count(*) FROM public.cases WHERE status IN ('Baru', 'Belum Diambil'))
    ) INTO v_stats;

    RETURN v_stats;
END;
$$;

-- get_practitioner_stats
CREATE OR REPLACE FUNCTION public.get_practitioner_stats(p_practitioner_id UUID, p_period TEXT DEFAULT 'all')
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_start_date TIMESTAMPTZ;
    v_stats JSONB;
BEGIN
    IF p_period = 'today' THEN
        v_start_date := current_date::timestamptz;
    ELSIF p_period = 'week' THEN
        v_start_date := date_trunc('week', current_date);
    ELSIF p_period = 'month' THEN
        v_start_date := date_trunc('month', current_date);
    ELSE
        v_start_date := '1970-01-01'::timestamptz;
    END IF;

    SELECT jsonb_build_object(
        'cases_claimed', (SELECT count(*) FROM public.cases WHERE assigned_to = p_practitioner_id AND assigned_at >= v_start_date),
        'cases_completed', (SELECT count(*) FROM public.cases WHERE assigned_to = p_practitioner_id AND status = 'Rawatan Selesai' AND completed_at >= v_start_date),
        'cases_pending', (SELECT count(*) FROM public.cases WHERE assigned_to = p_practitioner_id AND status IN ('Sedang Diurus', 'Perlu Follow-up')),
        'contacted', (SELECT count(*) FROM public.cases WHERE assigned_to = p_practitioner_id AND status = 'Berjaya Dihubungi' AND updated_at >= v_start_date),
        'unreachable', (SELECT count(*) FROM public.cases WHERE assigned_to = p_practitioner_id AND status = 'Tidak Dapat Dihubungi' AND updated_at >= v_start_date),
        'repeat_cases', (SELECT count(c.*) FROM public.cases c JOIN public.customers cu ON c.customer_id = cu.id WHERE c.assigned_to = p_practitioner_id AND cu.is_repeat = true AND c.assigned_at >= v_start_date),
        'avg_claim_time', (SELECT COALESCE(avg(extract(epoch FROM (assigned_at - created_at))), 0) FROM public.cases WHERE assigned_to = p_practitioner_id AND assigned_at >= v_start_date),
        'avg_completion_time', (SELECT COALESCE(avg(extract(epoch FROM (completed_at - assigned_at))), 0) FROM public.cases WHERE assigned_to = p_practitioner_id AND status = 'Rawatan Selesai' AND completed_at >= v_start_date)
    ) INTO v_stats;

    RETURN v_stats;
END;
$$;

-- transfer_case
CREATE OR REPLACE FUNCTION public.transfer_case(p_case_id UUID, p_new_practitioner_id UUID, p_admin_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_case RECORD;
BEGIN
    SELECT * INTO v_case FROM public.cases WHERE id = p_case_id;
    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'message', 'Case not found');
    END IF;

    UPDATE public.cases 
    SET assigned_to = p_new_practitioner_id,
        assigned_by = p_admin_id,
        version = version + 1,
        updated_at = now()
    WHERE id = p_case_id;

    INSERT INTO public.case_status_history (case_id, changed_by, old_status, new_status, notes)
    VALUES (p_case_id, p_admin_id, v_case.status, v_case.status, 'Case transferred to new practitioner');

    RETURN jsonb_build_object('success', true, 'message', 'Case transferred successfully');
END;
$$;

-- reopen_case
CREATE OR REPLACE FUNCTION public.reopen_case(p_case_id UUID, p_admin_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_case RECORD;
BEGIN
    SELECT * INTO v_case FROM public.cases WHERE id = p_case_id;
    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'message', 'Case not found');
    END IF;

    UPDATE public.cases 
    SET status = 'Sedang Diurus',
        version = version + 1,
        updated_at = now()
    WHERE id = p_case_id;

    INSERT INTO public.case_status_history (case_id, changed_by, old_status, new_status, notes)
    VALUES (p_case_id, p_admin_id, v_case.status, 'Sedang Diurus', 'Case reopened by admin');

    RETURN jsonb_build_object('success', true, 'message', 'Case reopened successfully');
END;
$$;
