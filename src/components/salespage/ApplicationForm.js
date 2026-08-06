'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { generateEventId, getPixelCookies, trackEvent } from '@/lib/tracking/pixel';

// Read UTM params from URL
function getUTMParams() {
  if (typeof window === 'undefined') return {};
  const p = new URLSearchParams(window.location.search);
  return {
    utm_source:   p.get('utm_source')   || null,
    utm_medium:   p.get('utm_medium')   || null,
    utm_campaign: p.get('utm_campaign') || null,
    utm_content:  p.get('utm_content')  || null,
    utm_term:     p.get('utm_term')     || null,
    fbclid:       p.get('fbclid')       || null,
  };
}

// Map salespage paths to source slugs (must match stats API SALESPAGE_LABELS keys)
const PATH_TO_SOURCE = {
  '/sihir': 'sihir',
  '/saka': 'saka',
  '/penyakit-misteri': 'penyakit-misteri',
  '/gangguan-berulang': 'gangguan-berulang',
  '/belum-zuriat': 'belum-zuriat',
  '/kedai-tutup': 'kedai-tutup',
};

export default function ApplicationForm({ source }) {
  const router = useRouter();
  const [detectedSource, setDetectedSource] = useState(source || 'direct');

  // Auto-detect salespage from URL pathname if source prop not provided
  useEffect(() => {
    if (!source) {
      const path = window.location.pathname;
      const mapped = PATH_TO_SOURCE[path];
      if (mapped) setDetectedSource(mapped);
    }
  }, [source]);

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
      // ── Generate shared event_id for browser pixel + CAPI deduplication ──
      const eventId = generateEventId();

      // ── Read fbp / fbc cookies for CAPI matching ──
      const { fbp, fbc } = getPixelCookies();

      // ── Read UTM + fbclid from URL ──
      const utmParams = getUTMParams();

      // ── Build fbc from fbclid if no cookie ──
      const fbcValue = fbc || (utmParams.fbclid ? `fb.1.${Date.now()}.${utmParams.fbclid}` : null);

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
          source: detectedSource,
          event_id: eventId,
          landing_page_url: typeof window !== 'undefined' ? window.location.href : null,
          referrer_url: typeof window !== 'undefined' ? document.referrer : null,
          fbp: fbp || null,
          fbc: fbcValue,
          fbclid: utmParams.fbclid || null,
          utm_source:   utmParams.utm_source,
          utm_medium:   utmParams.utm_medium,
          utm_campaign: utmParams.utm_campaign,
          utm_content:  utmParams.utm_content,
          utm_term:     utmParams.utm_term,
        })
      });

      const json = await res.json();

      if (res.ok && json.success) {
        // Redirect ke TQ page — Lead event akan fire di sana
        // Pass event_id supaya TQ page boleh dedup dengan CAPI
        router.push(`/terima-kasih?eid=${eventId}`);
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
      id="borang"
      style={{
        background: 'linear-gradient(180deg, #042E23 0%, #0B382D 100%)',
        color: '#0F172A',
        padding: '4rem 1rem',
        fontFamily: 'var(--font-inter), -apple-system, sans-serif'
      }}
    >
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>

        {/* Section label above card */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <span style={{
            fontSize: '0.75rem', fontWeight: 800, color: '#FDE047',
            textTransform: 'uppercase', letterSpacing: '0.12em'
          }}>
            LANGKAH PERTAMA
          </span>
          <h2 style={{
            fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
            fontWeight: 800,
            color: '#FEF3C7',
            marginTop: '0.4rem',
            marginBottom: '0.6rem',
            letterSpacing: '-0.02em'
          }}>
            Dapatkan Diagnos Percuma Dahulu
          </h2>
          <p style={{
            color: '#A7F3D0',
            fontSize: '1rem',
            lineHeight: 1.7,
            maxWidth: '520px',
            margin: '0 auto'
          }}>
            Sebelum apa-apa, perawat kami akan <strong style={{ color: '#FDE047' }}>diagnos dahulu secara percuma</strong>.
            Anda boleh tentukan sendiri sama ada nak teruskan rawatan atau tidak.
            Tiada paksaan. Tiada tekanan.
          </p>
        </div>

        {/* Trust badges */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '0.6rem',
          marginBottom: '1.8rem'
        }}>
          {[
            { icon: '✅', text: 'Diagnos 100% Percuma' },
            { icon: '🤝', text: 'Tiada Paksaan' },
            { icon: '🔒', text: 'Maklumat Sulit & Selamat' },
            { icon: '⚡', text: 'Respon Pantas' },
          ].map((b, i) => (
            <span key={i} style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              background: 'rgba(253,224,71,0.1)',
              border: '1px solid rgba(253,224,71,0.3)',
              color: '#FEF3C7',
              fontSize: '0.78rem',
              fontWeight: 700,
              padding: '0.3rem 0.75rem',
              borderRadius: '999px'
            }}>
              {b.icon} {b.text}
            </span>
          ))}
        </div>

        {/* Form Card */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          padding: '2.5rem 2rem',
          border: '3px solid #FDE047',
          boxShadow: '0 24px 60px rgba(0,0,0,0.35)'
        }}>

          {/* Form header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#ECFDF5',
              border: '1.5px solid #059669',
              borderRadius: '999px',
              padding: '0.4rem 1.1rem',
              marginBottom: '0.9rem'
            }}>
              <span style={{ fontSize: '1rem' }}>🩺</span>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#047857', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Borang Permohonan Diagnos
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', color: '#4B5563', margin: 0, lineHeight: 1.6 }}>
              Isi maklumat di bawah. Perawat kami akan hubungi anda untuk sesi diagnos.
              <br />
              <strong style={{ color: '#047857' }}>Percuma. Tanpa obligasi.</strong>
            </p>
          </div>

          {/* Error Alert */}
          {errorMessage && (
            <div style={{
              background: '#FEF2F2',
              border: '1px solid #FCA5A5',
              borderRadius: '8px',
              padding: '0.85rem 1rem',
              color: '#DC2626',
              fontSize: '0.875rem',
              fontWeight: 600,
              marginBottom: '1.5rem',
              lineHeight: 1.4
            }}>
              ⚠️ {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>

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
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 800, fontSize: '0.9rem', color: '#06231C' }}>
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
                  border: '1.5px solid #CBD5E1',
                  borderRadius: '10px',
                  color: '#0F172A',
                  fontSize: '0.95rem',
                  outline: 'none',
                  fontWeight: 500,
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Nombor WhatsApp */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 800, fontSize: '0.9rem', color: '#06231C' }}>
                Nombor WhatsApp <span style={{ color: '#DC2626' }}>*</span>
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
                  border: '1.5px solid #CBD5E1',
                  borderRadius: '10px',
                  color: '#0F172A',
                  fontSize: '0.95rem',
                  outline: 'none',
                  fontWeight: 500,
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Waktu Sesuai Dihubungi */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 800, fontSize: '0.9rem', color: '#06231C' }}>
                Waktu Sesuai Untuk Dihubungi <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                {[
                  { id: 'Pagi', label: '🌅 Pagi', desc: '8am – 12pm' },
                  { id: 'Petang', label: '☀️ Petang', desc: '2pm – 6pm' },
                  { id: 'Malam', label: '🌙 Malam', desc: '8pm – 11pm' }
                ].map((item) => {
                  const isSelected = formData.appointment_session === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, appointment_session: item.id }))}
                      style={{
                        padding: '0.85rem 0.5rem',
                        borderRadius: '10px',
                        border: isSelected ? '2px solid #047857' : '1.5px solid #CBD5E1',
                        background: isSelected ? '#ECFDF5' : '#F9FAFB',
                        color: isSelected ? '#047857' : '#4B5563',
                        fontWeight: 800,
                        fontSize: '0.88rem',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div>{item.label}</div>
                      <div style={{ fontSize: '0.72rem', opacity: 0.8, marginTop: '0.15rem', fontWeight: 600 }}>
                        {item.desc}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Simptom / Masalah */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 800, fontSize: '0.9rem', color: '#06231C' }}>
                Ceritakan Simptom atau Masalah Anda
                <span style={{ fontWeight: 500, color: '#6B7280', marginLeft: '0.3rem', fontSize: '0.8rem' }}>(tidak wajib, tapi membantu diagnos)</span>
              </label>
              <textarea
                name="problem"
                rows={4}
                placeholder="Contoh: Kerap mimpi menakutkan, badan terasa berat tanpa sebab, perniagaan tiba-tiba sunyi..."
                value={formData.problem}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  background: '#F9FAFB',
                  border: '1.5px solid #CBD5E1',
                  borderRadius: '10px',
                  color: '#0F172A',
                  fontSize: '0.95rem',
                  outline: 'none',
                  resize: 'vertical',
                  fontWeight: 500,
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* No pressure note */}
            <div style={{
              background: '#F0FDF4',
              border: '1px solid #BBF7D0',
              borderRadius: '10px',
              padding: '0.9rem 1rem',
              marginBottom: '1.5rem',
              display: 'flex',
              gap: '0.6rem',
              alignItems: 'flex-start'
            }}>
              <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>💚</span>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#166534', lineHeight: 1.6, fontWeight: 500 }}>
                <strong>Tiada sebarang paksaan.</strong> Setelah diagnos selesai, anda boleh putuskan sendiri
                sama ada nak teruskan rawatan (RM50) atau sekadar diagnos sahaja. Keputusan sepenuhnya di tangan anda.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '1.15rem',
                fontSize: '1.1rem',
                fontWeight: 800,
                color: '#042E23',
                background: loading
                  ? '#A7F3D0'
                  : 'linear-gradient(135deg, #FDE047 0%, #FACC15 100%)',
                border: 'none',
                borderRadius: '12px',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.8 : 1,
                boxShadow: loading ? 'none' : '0 8px 24px rgba(253,224,71,0.4)',
                transition: 'all 0.2s ease',
                letterSpacing: '0.01em'
              }}
            >
              {loading ? '⏳ Menghantar...' : '🩺 Mohon Diagnos Percuma Sekarang'}
            </button>

            <p style={{ textAlign: 'center', marginTop: '0.9rem', fontSize: '0.78rem', color: '#6B7280', margin: '0.9rem 0 0 0' }}>
              🔒 Maklumat anda adalah sulit dan hanya digunakan untuk tujuan diagnos sahaja.
            </p>

          </form>
        </div>

      </div>
    </section>
  );
}
