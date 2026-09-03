'use client';

import { useEffect } from 'react';

export default function ThankYouPage() {
  useEffect(() => {
    // Direct fbq call — ikut FB official standard events spec
    // fbq dah init dalam layout.js <head>, confirm available di sini
    try {
      var eid = new URLSearchParams(window.location.search).get('eid');
      window.fbq('track', 'Lead', {}, eid ? { eventID: eid } : {});
    } catch (e) {
      console.error('[Pixel] Lead event error:', e);
    }
  }, []);

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #06231C 0%, #0B382D 50%, #041813 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2.5rem 1rem',
        fontFamily: 'var(--font-inter), sans-serif'
      }}
    >
      <div
        style={{
          maxWidth: '620px',
          width: '100%',
          background: '#FFFDF7',
          border: '3px solid #E9C46A',
          borderRadius: '24px',
          padding: '2.75rem 2rem',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4)',
          textAlign: 'center',
          color: '#09201B'
        }}
      >
        {/* Brand Header */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.75rem' }}>
          <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>🌿</span>
          <span style={{ fontWeight: 800, fontSize: '1.25rem', color: '#09201B', letterSpacing: '-0.02em' }}>
            Aura Assyifa
          </span>
        </div>

        {/* Checkmark Icon */}
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #064E3B 0%, #047857 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto',
            boxShadow: '0 10px 25px rgba(6, 78, 59, 0.3)'
          }}
        >
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: '1.85rem',
            fontWeight: 800,
            color: '#09201B',
            marginBottom: '0.65rem',
            lineHeight: 1.25
          }}
        >
          Permohonan Berjaya Dihantar! 🎉
        </h1>

        <p style={{ color: '#334155', fontSize: '0.975rem', marginBottom: '1.75rem', lineHeight: 1.7, fontWeight: 500 }}>
          Terima kasih kerana mendaftar. Permohonan anda telah diterima dan dimasukkan ke dalam sistem giliran perawat Aura Assyifa.
        </p>

        {/* Main highlight — perawat akan hubungi */}
        <div
          style={{
            background: 'linear-gradient(135deg, #042E23 0%, #065F46 100%)',
            border: '2px solid #FDE047',
            borderRadius: '16px',
            padding: '1.5rem 1.5rem',
            marginBottom: '1.5rem',
            textAlign: 'left'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
            <span style={{ fontSize: '1.8rem', lineHeight: 1, flexShrink: 0 }}>📞</span>
            <div>
              <p style={{
                margin: '0 0 0.4rem 0',
                fontWeight: 800,
                fontSize: '1rem',
                color: '#FDE047',
                lineHeight: 1.35
              }}>
                Perawat kami akan hubungi anda
              </p>
              <p style={{
                margin: 0,
                fontSize: '0.9rem',
                color: '#D1FAE5',
                lineHeight: 1.7,
                fontWeight: 500
              }}>
                berdasarkan <strong style={{ color: '#FEF3C7' }}>tempoh waktu yang anda pilih</strong> semasa mengisi borang.
                Sila bersabar dan tunggu — perawat akan menghubungi anda melalui <strong style={{ color: '#FEF3C7' }}>WhatsApp</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Free scan highlight */}
        <div
          style={{
            background: '#F0FDF4',
            border: '1.5px solid #86EFAC',
            borderRadius: '14px',
            padding: '1.2rem 1.4rem',
            marginBottom: '1.75rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem',
            textAlign: 'left'
          }}
        >
          <span style={{
            fontSize: '1.1rem',
            flexShrink: 0,
            background: '#22C55E',
            color: '#fff',
            fontWeight: 800,
            borderRadius: '999px',
            padding: '0.15rem 0.6rem',
            marginTop: '0.1rem',
            letterSpacing: '0.02em',
            fontSize: '0.72rem'
          }}>
            PERCUMA
          </span>
          <p style={{
            margin: 0,
            fontSize: '0.88rem',
            color: '#166534',
            lineHeight: 1.7,
            fontWeight: 600
          }}>
            Ingat — <strong>sesi scan/diagnos adalah percuma sahaja.</strong>{' '}
            Perawat akan diagnos terlebih dahulu sebelum apa-apa keputusan dibuat.
            Tiada paksaan untuk teruskan rawatan.
          </p>
        </div>

        {/* Privacy note */}
        <p style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 500, lineHeight: 1.6, margin: 0 }}>
          🔒 Semua maklumat permohonan dirahsiakan sepenuhnya dan hanya digunakan untuk tujuan rawatan syarak Aura Assyifa.
        </p>

      </div>
    </main>
  );
}
