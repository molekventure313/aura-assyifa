'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { trackEvent } from '@/lib/tracking/pixel';

export default function ApplicationForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    appointment_session: 'Pagi',
    problem: '',
    honeypot: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.honeypot) return; // Spam prevention

    if (!formData.full_name.trim() || !formData.phone.trim()) {
      setErrorMsg('Sila masukkan Nama Penuh dan Nombor Telefon anda.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      // Track InitiateCheckout event on pixel
      try {
        trackEvent('InitiateCheckout', {
          content_name: 'Borang Permohonan Rawatan E-SYIFAA',
          currency: 'MYR'
        });
      } catch (pxErr) {
        console.log('Pixel error', pxErr);
      }

      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: formData.full_name,
          phone: formData.phone,
          appointment_session: formData.appointment_session,
          problem: formData.problem,
          honeypot: formData.honeypot
        })
      });

      const json = await res.json();

      if (res.ok && json.success) {
        router.push('/terima-kasih');
      } else {
        throw new Error(json.error || 'Satu ralat telah berlaku. Sila cuba lagi.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Satu ralat telah berlaku. Sila cuba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="apply-form" className="section-esyifaa" style={{ padding: '4.5rem 1rem' }}>
      <div className="container" style={{ maxWidth: '660px', margin: '0 auto', textAlign: 'center' }}>
        
        <div 
          className="card-esyifaa" 
          style={{ 
            padding: '2.75rem 2rem', 
            borderRadius: '24px', 
            boxShadow: '0 20px 45px rgba(244, 162, 97, 0.25)',
            border: '3px solid var(--yellow-box-border)',
            background: 'var(--yellow-box-bg)'
          }}
        >
          <h2 style={{ fontSize: '1.95rem', fontWeight: 800, color: 'var(--font-dark-green)', marginBottom: '0.5rem', textAlign: 'center' }}>
            Isi Maklumat Anda
          </h2>

          <p style={{ color: 'var(--font-muted-dark)', fontSize: '0.95rem', marginBottom: '1.75rem', textAlign: 'center', fontWeight: 600 }}>
            Sila isi borang pendaftaran di bawah. Team E-SYIFAA' akan hubungi anda secara terus melalui WhatsApp.
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
              fontWeight: 600
            }}>
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
            {/* Honeypot Spam Filter */}
            <input 
              type="text" 
              name="honeypot" 
              value={formData.honeypot} 
              onChange={handleChange} 
              style={{ display: 'none' }} 
              tabIndex={-1} 
              autoComplete="off" 
            />

            {/* Nama Penuh */}
            <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 700, color: 'var(--font-dark-green)', fontSize: '0.95rem' }}>
                Nama Penuh Pesakit <span style={{ color: '#E74C3C' }}>*</span>
              </label>
              <input
                type="text"
                name="full_name"
                required
                placeholder="Contoh: Ahmad Bin Muhammad"
                value={formData.full_name}
                onChange={handleChange}
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

            {/* Nombor Telefon */}
            <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 700, color: 'var(--font-dark-green)', fontSize: '0.95rem' }}>
                Nombor Telefon (WhatsApp) <span style={{ color: '#E74C3C' }}>*</span>
              </label>
              <input
                type="tel"
                name="phone"
                required
                placeholder="Contoh: 0123456789"
                value={formData.phone}
                onChange={handleChange}
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

            {/* WAKTU TEMUJANJI RAWATAN (Pagi / Petang / Malam) */}
            <div style={{ marginBottom: '1.75rem', textAlign: 'center' }}>
              <label style={{ display: 'block', marginBottom: '0.65rem', fontWeight: 700, color: 'var(--font-dark-green)', fontSize: '0.95rem' }}>
                Waktu Temujanji Rawatan <span style={{ color: '#E74C3C' }}>*</span>
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.65rem' }}>
                {[
                  { id: 'Pagi', label: 'Pagi', time: '8 AM - 12 PM', icon: '☀️' },
                  { id: 'Petang', label: 'Petang', time: '2 PM - 6 PM', icon: '🌤️' },
                  { id: 'Malam', label: 'Malam', time: '8 PM - 11 PM', icon: '🌙' },
                ].map((session) => {
                  const isSelected = formData.appointment_session === session.id;
                  return (
                    <div
                      key={session.id}
                      onClick={() => setFormData({ ...formData, appointment_session: session.id })}
                      style={{
                        padding: '0.85rem 0.5rem',
                        borderRadius: '12px',
                        border: isSelected ? '2.5px solid #064E3B' : '2px solid var(--yellow-box-border)',
                        background: isSelected ? '#ECFDF5' : '#FFFFFF',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        boxShadow: isSelected ? '0 4px 12px rgba(6, 78, 59, 0.15)' : 'none'
                      }}
                    >
                      <div style={{ fontSize: '1.25rem', marginBottom: '0.2rem' }}>{session.icon}</div>
                      <div style={{ fontWeight: 800, fontSize: '0.9rem', color: isSelected ? '#047857' : 'var(--font-dark-green)' }}>
                        {session.label}
                      </div>
                      <div style={{ fontSize: '0.675rem', color: '#64748B', fontWeight: 600, marginTop: '0.1rem' }}>
                        {session.time}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Simptom & Masalah */}
            <div style={{ marginBottom: '1.75rem', textAlign: 'center' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 700, color: 'var(--font-dark-green)', fontSize: '0.95rem' }}>
                Simptom Utama / Masalah Yang Dihadapi
              </label>
              <textarea
                name="problem"
                rows="3"
                placeholder="Contoh: Selalu rasa lenguh di bahu, susah tidur malam, dada berdebar..."
                value={formData.problem}
                onChange={handleChange}
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
              className="btn-esyifaa primary-btn"
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
