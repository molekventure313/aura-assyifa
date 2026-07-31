-- 004_seed_data.sql

-- Insert default tracking config
INSERT INTO public.tracking_config (is_active) VALUES (false) ON CONFLICT DO NOTHING;

-- Insert default salespage config
INSERT INTO public.salespage_config (sections, theme)
VALUES (
    '[
        {"id": "hero", "type": "Hero", "title": "Rawatan Jarak Jauh", "subtitle": "Penyelesaian masalah anda", "content": "", "visible": true, "order": 1},
        {"id": "problem", "type": "Problem", "title": "Adakah anda mengalami masalah ini?", "subtitle": "", "content": "", "visible": true, "order": 2},
        {"id": "service", "type": "Service", "title": "Perkhidmatan Kami", "subtitle": "", "content": "", "visible": true, "order": 3},
        {"id": "benefits", "type": "Benefits", "title": "Kelebihan Rawatan Kami", "subtitle": "", "content": "", "visible": true, "order": 4},
        {"id": "process", "type": "Process", "title": "Proses Rawatan", "subtitle": "Langkah demi langkah", "content": "", "visible": true, "order": 5},
        {"id": "testimonials", "type": "Testimonials", "title": "Testimoni Pelanggan", "subtitle": "", "content": "", "visible": true, "order": 6},
        {"id": "faq", "type": "FAQ", "title": "Soalan Lazim", "subtitle": "", "content": "", "visible": true, "order": 7},
        {"id": "cta", "type": "CTA", "title": "Dapatkan Rawatan Sekarang", "subtitle": "", "content": "", "visible": true, "order": 8},
        {"id": "form", "type": "Form", "title": "Borang Permohonan", "subtitle": "Sila isikan maklumat di bawah", "content": "", "visible": true, "order": 9}
    ]'::jsonb,
    '{"primary_color": "#6C63FF", "secondary_color": "#00D2FF", "background_color": "#0a0a1a", "text_color": "#ffffff"}'::jsonb
);

-- INSTRUCTIONS FOR SUPER ADMIN:
-- To create the first super_admin user, sign up via Supabase Auth UI or API, then run:
-- UPDATE public.profiles SET role = 'super_admin' WHERE email = 'your_admin_email@example.com';
