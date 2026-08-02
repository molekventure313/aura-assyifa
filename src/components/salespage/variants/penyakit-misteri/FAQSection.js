'use client';

import { useState } from 'react';

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(null);

  const faqs = [
    {
      q: 'Bagaimana ESyifaa merawat penyakit misteri yang doktor tak boleh kesan?',
      a: 'Melalui sesi konsultasi dan imbasan jarak jauh, perawat akan meneliti sama ada kesakitan berpunca daripada gangguan halus atau sihir, seterusnya dirawat menggunakan bacaan Al-Quran dan doa syarak.'
    },
    {
      q: 'Adakah saya perlu menghentikan rawatan doktor / hospital?',
      a: 'Tidak. Rawatan ESyifaa adalah ikhtiar rohani patuh syariah yang melengkapi rawatan perubatan moden anda. Anda digalakkan meneruskan kedua-dua ikhtiar.'
    },
    {
      q: 'Bolehkah rawatan dijalankan secara jarak jauh?',
      a: 'Ya. Rawatan jarak jauh menggunakan kaedah yang dibenarkan syarak dan boleh dilakukan terus dari rumah anda tanpa perlu hadir secara fizikal.'
    },
    {
      q: 'Berapa lama masa yang diambil untuk merasai kesannya?',
      a: 'Ramai pesakit merasai badan mula berasa ringan dan tenang selepas sesi pertama, namun tempoh pemulihan bergantung kepada tahap penyakit individu.'
    },
    {
      q: 'Adakah diagnos awal percuma?',
      a: 'Ya. Sesi diagnos dan konsultasi awal bersama perawat ESyifaa adalah percuma sepenuhnya.'
    }
  ];

  return (
    <section 
      style={{
        background: '#042E23',
        color: '#FFFFFF',
        padding: '3.5rem 1rem',
        fontFamily: 'var(--font-inter), -apple-system, sans-serif'
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FDE047', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            SOALAN LAZIM (FAQ)
          </span>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 800, color: '#FDE047', marginTop: '0.4rem', letterSpacing: '-0.02em' }}>
            Soalan Yang Kerap Ditanya Mengenai Rawatan Penyakit Misteri
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx}
                style={{
                  background: '#FFFFFF',
                  border: '2px solid #FDE047',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '1.1rem 1.35rem',
                    background: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    fontWeight: 800,
                    fontSize: '0.975rem',
                    color: '#0F172A',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem'
                  }}
                >
                  <span>{faq.q}</span>
                  <span style={{ fontSize: '1.2rem', color: '#059669', fontWeight: 800 }}>
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div style={{ padding: '0 1.35rem 1.1rem 1.35rem', color: '#374151', fontSize: '0.9rem', lineHeight: 1.6, borderTop: '1px solid #F1F5F9' }}>
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
