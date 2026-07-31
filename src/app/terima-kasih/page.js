'use client';

import { useEffect } from 'react';
import Link from 'next/link';
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
            ESYIFAA'
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
          Terima kasih kerana mendaftar. Permohonan anda telah diterima dan dimasukkan ke dalam sistem giliran perawat ESYIFAA'.
        </p>

        {/* Info Box: Langkah Seterusnya */}
        <div 
          style={{ 
            background: '#FFFFFF', 
            border: '2px solid var(--yellow-box-border, #E9C46A)', 
            borderRadius: '16px', 
            padding: '1.5rem', 
            textAlign: 'left',
            marginBottom: '2rem',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)'
          }}
        >
          <h3 style={{ fontSize: '1rem', color: 'var(--font-dark-green, #09201B)', margin: '0 0 1rem 0', fontWeight: 800, borderBottom: '1px solid #F1F5F9', paddingBottom: '0.5rem' }}>
            Langkah Seterusnya Untuk Pesakit:
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.875rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#ECFDF5', color: '#047857', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', flexShrink: 0, marginTop: '2px', border: '1px solid #A7F3D0' }}>
                1
              </div>
              <div>
                <strong style={{ color: 'var(--font-dark-green, #09201B)', display: 'block', marginBottom: '0.15rem' }}>
                  Perawat Bertugas Akan Hubungi Anda via WhatsApp
                </strong>
                <span style={{ color: '#475569', lineHeight: 1.5, display: 'block' }}>
                  Perawat yang diagihkan khas untuk anda akan menghantar mesej WhatsApp untuk pengesahan temujanji rawatan.
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#ECFDF5', color: '#047857', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', flexShrink: 0, marginTop: '2px', border: '1px solid #A7F3D0' }}>
                2
              </div>
              <div>
                <strong style={{ color: 'var(--font-dark-green, #09201B)', display: 'block', marginBottom: '0.15rem' }}>
                  Konsultasi &amp; Imbasan Jarak Jauh Permulaan
                </strong>
                <span style={{ color: '#475569', lineHeight: 1.5, display: 'block' }}>
                  Perawat akan meneliti simptom anda dan memulakan proses imbasan punca gangguan dari jauh.
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#ECFDF5', color: '#047857', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', flexShrink: 0, marginTop: '2px', border: '1px solid #A7F3D0' }}>
                3
              </div>
              <div>
                <strong style={{ color: 'var(--font-dark-green, #09201B)', display: 'block', marginBottom: '0.15rem' }}>
                  Pelaksanaan Sesi Rawatan &amp; Pemantauan
                </strong>
                <span style={{ color: '#475569', lineHeight: 1.5, display: 'block' }}>
                  Sesi rawatan dijalankan mengikut waktu temujanji yang telah anda pilih.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Security / Privacy Note */}
        <p style={{ fontSize: '0.825rem', color: '#475569', fontWeight: 600, marginBottom: '2rem' }}>
          * Semua maklumat permohonan dirahsiakan sepenuhnya dan hanya digunakan untuk tujuan rawatan syarak ESYIFAA'.
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <a 
            href="https://wa.me/601139414214?text=Assalamualaikum%20Team%20ESYIFAA'%2C%20saya%20baru%20sahaja%20mendaftar%20untuk%20konsultasi%20rawatan%20jarak%20jauh." 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-mvsyifaa primary-btn"
            style={{ 
              width: '100%', 
              padding: '1.15rem', 
              fontSize: '1rem', 
              fontWeight: 700,
              textDecoration: 'none',
              borderRadius: '12px'
            }}
          >
            Hubungi WhatsApp Rasmi ESYIFAA'
          </a>

          <Link href="/" style={{ textDecoration: 'none' }}>
            <button 
              type="button"
              style={{ 
                width: '100%', 
                padding: '0.85rem', 
                background: 'transparent',
                border: '2px solid var(--font-dark-green, #09201B)',
                color: 'var(--font-dark-green, #09201B)',
                borderRadius: '12px',
                fontSize: '0.9rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              Kembali ke Laman Utama
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
