'use client';

import { useState } from 'react';

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'Apakah saka dan bagaimana ia boleh mempengaruhi keluarga?',
      a: 'Saka adalah ikatan atau perjanjian dengan makhluk halus yang dibuat oleh nenek moyang dan diwarisi oleh keturunan. Ia boleh mempengaruhi kesihatan, rezeki dan keharmonian keluarga.'
    },
    {
      q: 'Bolehkah saka dirawat tanpa pengetahuan ahli keluarga yang lain?',
      a: 'Ya, rawatan boleh dimulakan oleh mana-mana ahli keluarga. Namun penglibatan ahli keluarga yang lain boleh membantu proses pemulihan menjadi lebih berkesan.'
    },
    {
      q: 'Adakah rawatan saka Aura Assyifa boleh dilakukan dari jarak jauh?',
      a: 'Ya. Rawatan jarak jauh menggunakan kaedah yang dibenarkan syarak boleh dijalankan tanpa anda perlu hadir secara fizikal.'
    },
    {
      q: 'Berapa lama proses rawatan saka?',
      a: 'Bergantung kepada tahap dan tempoh gangguan saka dalam keluarga. Perawat akan menerangkan jangkaan tempoh rawatan semasa konsultasi.'
    },
    {
      q: 'Adakah ada jaminan rawatan ini berkesan?',
      a: 'Aura Assyifa menawarkan jaminan pulang wang sekiranya anda tidak berpuas hati. Namun setiap kes berbeza dan hasil bergantung kepada keadaan individu.'
    }
  ];

  return (
    <section 
      style={{
        background: '#FFFFFF',
        color: '#0F172A',
        padding: '3.5rem 1rem',
        fontFamily: 'var(--font-inter), -apple-system, sans-serif'
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2.25rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            SOALAN LAZIM
          </span>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 800, color: '#0F172A', marginTop: '0.4rem', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
            Soalan Lazim (FAQ)
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx}
                style={{
                  background: '#F8FAFC',
                  border: isOpen ? '2px solid #059669' : '1px solid #E2E8F0',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  transition: 'all 0.15s ease'
                }}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '1.1rem 1.25rem',
                    background: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    fontWeight: 800,
                    fontSize: '1rem',
                    color: isOpen ? '#047857' : '#0F172A',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem'
                  }}
                >
                  <span>{faq.q}</span>
                  <span style={{ fontSize: '1.25rem', color: '#059669', fontWeight: 800 }}>
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div style={{ padding: '0 1.25rem 1.1rem 1.25rem', fontSize: '0.925rem', color: '#374151', lineHeight: 1.6, borderTop: '1px solid #E2E8F0', fontWeight: 500 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
