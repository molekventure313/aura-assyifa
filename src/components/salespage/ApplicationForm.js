'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { trackFormSubmit } from '@/lib/tracking/pixel';

export default function ApplicationForm() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    appointment_session: 'Pagi',
    problem: '',
    notes: '',
    honeypot: ''
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!formData.full_name.trim() || !formData.phone.trim()) {
      setErrorMessage('Sila isi nama penuh dan nombor telefon / WhatsApp anda.');
      return;
    }

    setLoading(true);

    try {
      // Trigger Meta Pixel lead tracking
      try {
        trackFormSubmit({
          full_name: formData.full_name,
          phone: formData.phone,
          appointment_session: formData.appointment_session
        });
      } catch (trackErr) {
        console.error('Tracking non-blocking error:', trackErr);
      }

      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: formData.full_name,
          phone: formData.phone,
          appointment_session: formData.appointment_session,
          problem: formData.problem,
          notes: formData.notes,
          honeypot: formData.honeypot,
          source: 'Salespage ESyifaa'
        })
      });

      const json = await res.json();

      if (res.ok && json.success) {
        router.push('/terima-kasih');
      } else {
        throw new Error(json.error || 'Satu ralat telah berlaku. Sila cuba lagi.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Satu ralat telah berlaku semasa menghantar borang. Sila cuba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section 
      id="apply-form"
      style={{
        background: '#FEF3C7',
        color: '#06231C',
        padding: '3.5rem 1rem',
        fontFamily: 'var(--font-inter), -apple-system, sans-serif'
      }}
    >
      <div style={{ maxWidth: '650px', margin: '0 auto' }}>
        
        <div 
          style={{ 
            background: '#FFFFFF', 
            borderRadius: '16px', 
            padding: '2.25rem 1.75rem', 
            border: '2px solid #F59E0B', 
            boxShadow: '0 20px 40px rgba(0,0,0,0.08)'
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#D97706', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              BORANG TEMUJANJI RAWATAN
            </span>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#06231C', marginTop: '0.35rem', marginBottom: '0.35rem', letterSpacing: '-0.02em' }}>
              Isi Maklumat Anda
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#4B5563', margin: 0 }}>
              Pihak ESyifaa akan menghubungi anda mengikut sesi temujanji yang dipilih.
            </p>
          </div>

          {/* Error Alert */}
          {errorMessage && (
            <div 
              style={{
                background: '#FEF2F2',
                border: '1px solid #FCA5A5',
                borderRadius: '8px',
                padding: '0.85rem 1rem',
                color: '#DC2626',
                fontSize: '0.875rem',
                fontWeight: 600,
                marginBottom: '1.5rem',
                lineHeight: 1.4
              }}
            >
              ⚠️ {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            
            {/* Honeypot anti-spam */}
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
            <div style={{ marginBottom: '1.35rem' }}>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 700, fontSize: '0.9rem', color: '#06231C' }}>
                Nama Penuh <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <input
                type="text"
                name="full_name"
                placeholder="Masukkan nama penuh anda"
                value={formData.full_name}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  background: '#F9FAFB',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  color: '#111827',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
              />
            </div>

            {/* Nombor Telefon / WhatsApp */}
            <div style={{ marginBottom: '1.35rem' }}>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 700, fontSize: '0.9rem', color: '#06231C' }}>
                Nombor Telefon / WhatsApp <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="Contoh: 0123456789"
                value={formData.phone}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  background: '#F9FAFB',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  color: '#111827',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
              />
            </div>

            {/* Pilihan Waktu Temujanji */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 700, fontSize: '0.9rem', color: '#06231C' }}>
                Pilihan Waktu Temujanji Rawatan <span style={{ color: '#DC2626' }}>*</span>
              </label>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                {[
                  { id: 'Pagi', label: '○ Pagi', desc: '8am - 12pm' },
                  { id: 'Petang', label: '○ Petang', desc: '2pm - 6pm' },
                  { id: 'Malam', label: '○ Malam', desc: '8pm - 11pm' }
                ].map((item) => {
                  const isSelected = formData.appointment_session === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, appointment_session: item.id }))}
                      style={{
                        padding: '0.85rem 0.5rem',
                        borderRadius: '8px',
                        border: isSelected ? '2px solid #059669' : '1px solid #D1D5DB',
                        background: isSelected ? '#ECFDF5' : '#F9FAFB',
                        color: isSelected ? '#047857' : '#4B5563',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div>{item.label}</div>
                      <div style={{ fontSize: '0.725rem', opacity: 0.8, marginTop: '0.15rem', fontWeight: 500 }}>
                        {item.desc}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Terangkan simptom atau masalah yang anda alami */}
            <div style={{ marginBottom: '1.75rem' }}>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 700, fontSize: '0.9rem', color: '#06231C' }}>
                Terangkan simptom atau masalah yang anda alami
              </label>
              <textarea
                name="problem"
                rows={4}
                placeholder="Contoh: Sukar tidur malam, badan berasa sangat lemah dan kerap mimpi yang mengganggu..."
                value={formData.problem}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  background: '#F9FAFB',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  color: '#111827',
                  fontSize: '0.95rem',
                  outline: 'none',
                  resize: 'vertical'
                }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '1.1rem',
                fontSize: '1.1rem',
                fontWeight: 800,
                color: '#FFFFFF',
                background: 'linear-gradient(180deg, #059669 0%, #047857 100%)',
                border: 'none',
                borderRadius: '8px',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.75 : 1,
                boxShadow: '0 8px 20px rgba(5, 150, 105, 0.3)',
                transition: 'all 0.15s ease'
              }}
            >
              {loading ? 'Menghantar Borang...' : 'Hantar Borang'}
            </button>

          </form>

        </div>

      </div>
    </section>
  );
}
