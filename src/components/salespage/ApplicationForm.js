'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { validateMalaysianPhone } from '@/lib/utils/phone';
import { trackLead, generateEventId } from '@/lib/tracking/pixel';

export default function ApplicationForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    appointment_session: 'Pagi', // Default 1 pilihan
    problem: '',
    honeypot: ''
  });
  
  const [trackingData, setTrackingData] = useState({});

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const getCookie = (name) => {
      const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      return match ? match[2] : null;
    };

    setTrackingData({
      utm_source: searchParams.get('utm_source') || '',
      utm_medium: searchParams.get('utm_medium') || '',
      utm_campaign: searchParams.get('utm_campaign') || '',
      utm_content: searchParams.get('utm_content') || '',
      utm_term: searchParams.get('utm_term') || '',
      fbclid: searchParams.get('fbclid') || '',
      _fbp: getCookie('_fbp') || '',
      _fbc: getCookie('_fbc') || '',
      landing_page_url: window.location.href,
      referrer_url: document.referrer
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSessionSelect = (session) => {
    setFormData(prev => ({ ...prev, appointment_session: session }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    
    if (formData.honeypot) return;
    
    if (!formData.full_name.trim() || !formData.phone.trim()) {
      setErrorMsg('Sila isi nama penuh dan nombor telefon / WhatsApp anda.');
      return;
    }

    if (!formData.appointment_session) {
      setErrorMsg('Sila pilih waktu temujanji rawatan anda.');
      return;
    }
    
    const phoneResult = validateMalaysianPhone(formData.phone);
    if (!phoneResult.valid) {
      setErrorMsg(phoneResult.error || 'Sila masukkan nombor telefon Malaysia yang sah bermula dengan 01.');
      return;
    }

    setIsSubmitting(true);
    const eventId = generateEventId();

    try {
      const submitData = {
        full_name: formData.full_name.trim(),
        phone: formData.phone.trim(),
        appointment_session: formData.appointment_session,
        problem: formData.problem.trim() || null,
        source: 'Direct',
        consent_contact: true,
        honeypot: formData.honeypot,
        event_id: eventId,
        ...trackingData,
      };

      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Gagal menghantar permohonan. Sila cuba lagi.');
      
      try {
        trackLead({}, eventId);
      } catch (err) {
        console.error('Pixel event failed', err);
      }

      router.push('/terima-kasih');
    } catch (err) {
      setErrorMsg(err.message || 'Ralat berlaku semasa menghantar borang. Sila cuba sebentar lagi.');
      setIsSubmitting(false);
    }
  };

  return (
    <section id="apply-form" className="section-mvsyifaa" style={{ padding: '4.5rem 1rem' }}>
      <div className="container" style={{ maxWidth: '660px', margin: '0 auto', textAlign: 'center' }}>
        
        <div 
          className="card-mvsyifaa" 
          style={{ 
            padding: '2.75rem 2rem', 
            borderRadius: '24px', 
            boxShadow: '0 20px 45px rgba(244, 162, 97, 0.25)',
            border: '3px solid var(--yellow-box-border)',
            background: 'var(--yellow-box-bg)'
          }}
        >
          {/* Section 9 tag removed as requested */}

          <h2 style={{ fontSize: '1.95rem', fontWeight: 800, color: 'var(--font-dark-green)', marginBottom: '0.5rem', textAlign: 'center' }}>
            Isi Maklumat Anda
          </h2>

          <p style={{ color: 'var(--font-muted-dark)', fontSize: '0.95rem', marginBottom: '1.75rem', textAlign: 'center', fontWeight: 600 }}>
            Sila isi borang pendaftaran di bawah. Team MV SYIFAA' akan hubungi anda secara terus melalui WhatsApp.
          </p>

          {errorMsg && (
            <div style={{
              background: '#FEE2E2',
              border: '1.5px solid #FCA5A5',
              borderRadius: '12px',
              padding: '0.85rem 1rem',
              color: '#991B1B',
              fontSize: '0.875rem',
              marginBottom: '1.5rem',
              textAlign: 'center',
              fontWeight: 700
            }}>
              ⚠️ {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
            {/* Honeypot field */}
            <input type="text" name="honeypot" value={formData.honeypot} onChange={handleChange} style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />

            {/* Nama Penuh */}
            <div style={{ marginBottom: '1.25rem', textAlign: 'center' }}>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 800, fontSize: '0.925rem', color: 'var(--font-dark-green)', textAlign: 'center' }}>
                Nama Penuh <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Masukkan nama penuh anda"
                required
                style={{
                  width: '100%',
                  padding: '0.95rem 1rem',
                  background: '#FFFFFF',
                  border: '2px solid var(--yellow-box-border)',
                  borderRadius: '12px',
                  color: 'var(--font-dark-green)',
                  fontSize: '1rem',
                  outline: 'none',
                  textAlign: 'center',
                  fontWeight: 600
                }}
              />
            </div>

            {/* Nombor Telefon / WhatsApp */}
            <div style={{ marginBottom: '1.25rem', textAlign: 'center' }}>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 800, fontSize: '0.925rem', color: 'var(--font-dark-green)', textAlign: 'center' }}>
                Nombor Telefon / WhatsApp <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="01XXXXXXXX"
                required
                style={{
                  width: '100%',
                  padding: '0.95rem 1rem',
                  background: '#FFFFFF',
                  border: '2px solid var(--yellow-box-border)',
                  borderRadius: '12px',
                  color: 'var(--font-dark-green)',
                  fontSize: '1rem',
                  outline: 'none',
                  textAlign: 'center',
                  fontWeight: 600
                }}
              />
            </div>

            {/* Waktu Temujanji Rawatan (Pilih 1 sahaja) */}
            <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 800, fontSize: '0.925rem', color: 'var(--font-dark-green)', textAlign: 'center' }}>
                Waktu Temujanji Rawatan <span style={{ color: 'red' }}>*</span>
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.65rem' }}>
                {[
                  { id: 'Pagi', label: '☀️ Pagi', sub: '8:00 AM - 12:00 PM' },
                  { id: 'Petang', label: '🌤️ Petang', sub: '2:00 PM - 6:00 PM' },
                  { id: 'Malam', label: '🌙 Malam', sub: '8:00 PM - 11:00 PM' }
                ].map((s) => {
                  const isSelected = formData.appointment_session === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => handleSessionSelect(s.id)}
                      style={{
                        padding: '0.85rem 0.5rem',
                        borderRadius: '12px',
                        border: isSelected ? '2px solid var(--font-dark-green)' : '2px solid var(--yellow-box-border)',
                        background: isSelected ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)',
                        color: 'var(--font-dark-green)',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        boxShadow: isSelected ? '0 4px 12px rgba(9, 32, 27, 0.15)' : 'none',
                        transform: isSelected ? 'translateY(-2px)' : 'none'
                      }}
                    >
                      <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>{s.label}</div>
                      <div style={{ fontSize: '0.675rem', fontWeight: 600, opacity: 0.8, marginTop: '0.15rem' }}>{s.sub}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Simptom / Masalah */}
            <div style={{ marginBottom: '1.75rem', textAlign: 'center' }}>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 800, fontSize: '0.925rem', color: 'var(--font-dark-green)', textAlign: 'center' }}>
                Terangkan masalah atau simptom yang anda alami
              </label>
              <textarea
                name="problem"
                value={formData.problem}
                onChange={handleChange}
                placeholder="Terangkan ringkas mengenai simptom (cth: susah tidur malam, gelisah, badan lenguh...)"
                rows="3"
                style={{
                  width: '100%',
                  padding: '0.95rem 1rem',
                  background: '#FFFFFF',
                  border: '2px solid var(--yellow-box-border)',
                  borderRadius: '12px',
                  color: 'var(--font-dark-green)',
                  fontSize: '1rem',
                  resize: 'vertical',
                  outline: 'none',
                  textAlign: 'center',
                  fontWeight: 600
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-mvsyifaa primary-btn"
              style={{ width: '100%', padding: '1.15rem', fontSize: '1.05rem' }}
            >
              {isSubmitting ? '⏳ Menghantar Permohonan...' : '✨ Hantar Borang & Dapatkan Nombor Giliran'}
            </button>
          </form>

          <p style={{ textAlign: 'center', color: 'var(--font-muted-dark)', marginTop: '1.35rem', fontSize: '0.825rem', lineHeight: 1.5, margin: '1.35rem 0 0 0', fontWeight: 600 }}>
            🔒 Semua maklumat pelanggan dirahsiakan dan hanya digunakan untuk tujuan konsultasi serta rawatan.
          </p>

        </div>

      </div>
    </section>
  );
}
