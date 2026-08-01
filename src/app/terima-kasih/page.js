'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/tracking/pixel';

export default function ThankYouPage() {
  useEffect(() => {
    try {
      trackEvent('CompleteRegistration');
    } catch(err) {
      console.log('Pixel tracking issue', err);
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
          background: 'var(--yellow-box-bg, #FFFDF7)',
          border: '3px solid var(--yellow-box-border, #E9C46A)',
          borderRadius: '24px',
          padding: '2.75rem 2rem',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4)',
          textAlign: 'center',
          color: 'var(--font-dark-green, #09201B)'
        }}
      >
        {/* Brand Header (Only Emoji Allowed: 🌿) */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.75rem' }}>
          <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>🌿</span>
          <span style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--font-dark-green, #09201B)', letterSpacing: '-0.02em' }}>
            ESyifaa
          </span>
        </div>

        {/* Clean SVG Checkmark Circle Icon */}
        <div 
          style={{ 
            width: '68px', 
            height: '68px', 
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

        {/* Title & Description */}
        <h1 
          style={{ 
            fontSize: '1.85rem', 
            fontWeight: 800, 
            color: 'var(--font-dark-green, #09201B)', 
            marginBottom: '0.65rem',
            lineHeight: 1.25
          }}
        >
          Permohonan Rawatan Berjaya Dihantar
        </h1>
        
        <p style={{ color: 'var(--font-muted-dark, #334155)', fontSize: '0.975rem', marginBottom: '2rem', lineHeight: 1.6, fontWeight: 500 }}>
          Terima kasih kerana mendaftar. Permohonan anda telah diterima dan dimasukkan ke dalam sistem giliran perawat ESyifaa.
        </p>

        {/* WhatsApp Support Box */}
        <a
          href="https://wa.me/601139414214?text=Assalamualaikum%20Team%20ESyifaa%2C%20saya%20baru%20sahaja%20mendaftar%20untuk%20konsultasi%20rawatan%20jarak%20jauh."
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.85rem',
            background: '#25D366',
            border: 'none',
            borderRadius: '14px',
            padding: '1.35rem 1.5rem',
            marginBottom: '2rem',
            textDecoration: 'none',
            boxShadow: '0 8px 25px rgba(37, 211, 102, 0.35)',
            transition: 'transform 0.15s ease'
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#FFFFFF">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.557 4.126 1.528 5.865L0 24l6.335-1.508A11.952 11.952 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.273-1.535l-.379-.225-3.927.935.998-3.835-.246-.394A9.818 9.818 0 1 1 12 21.818z"/>
          </svg>
          <span style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '1.05rem', letterSpacing: '-0.01em' }}>
            Hubungi WhatsApp Support ESyifaa
          </span>
        </a>

        {/* Security / Privacy Note */}
        <p style={{ fontSize: '0.825rem', color: '#475569', fontWeight: 600, marginBottom: '2rem' }}>
          * Semua maklumat permohonan dirahsiakan sepenuhnya dan hanya digunakan untuk tujuan rawatan syarak ESyifaa.
        </p>


      </div>
    </main>
  );
}
