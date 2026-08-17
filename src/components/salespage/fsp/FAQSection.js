'use client';

import { useState } from 'react';

export default function FspFAQSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'Adakah rawatan ini patuh syariah?',
      a: 'Ya, 100%. Rawatan dijalankan menggunakan bacaan Al-Quran, Asmaul Husna dan doa-doa yang bersumber dari Sunnah Nabi ﷺ. Tiada unsur syirik, bid\'ah atau kaedah lagha dalam setiap rawatan kami.'
    },
    {
      q: 'Berapa lama saya perlu tunggu selepas isi borang?',
      a: 'Perawat kami akan menghubungi anda melalui WhatsApp secepat mungkin — biasanya dalam masa beberapa jam sahaja. Respon lebih cepat semasa waktu pagi hingga petang.'
    },
    {
      q: 'Adakah perlu hadir secara fizikal untuk rawatan?',
      a: 'Tidak perlu. Rawatan dijalankan sepenuhnya dari jauh (jarak jauh). Anda hanya perlu berada di rumah dalam keadaan tenang semasa rawatan dijalankan. Tiada video call diperlukan.'
    },
    {
      q: 'Apa yang akan berlaku semasa rawatan?',
      a: 'Badan anda mungkin akan merespon semasa rawatan dijalankan — contohnya sendawa, rasa sengal, pening, loya atau rasa ringan. Ini adalah tanda rawatan sedang berkesan. Perawat akan teruskan rawatan sehingga semua tindakbalas hilang sepenuhnya.'
    },
    {
      q: 'Adakah gangguan akan hilang selepas satu sesi rawatan?',
      a: 'Bergantung kepada tahap gangguan. Ada yang sembuh selepas satu sesi, ada yang memerlukan beberapa sesi. Itulah sebabnya kami sediakan rawatan susulan percuma sehingga anda benar-benar pulih, in shaa Allah.'
    },
    {
      q: 'Adakah diagnos benar-benar percuma?',
      a: 'Ya, 100% percuma. Selepas mengisi borang, perawat kami akan hubungi anda dan jalankan sesi diagnos tanpa sebarang bayaran. Anda boleh putuskan sendiri sama ada nak teruskan rawatan atau tidak selepas diagnos.'
    },
    {
      q: 'Bagaimana jika tiada perubahan selepas rawatan?',
      a: 'Kami menawarkan jaminan pulang wang 100%. Jika tiada sebarang perubahan selepas rawatan selesai, PM sahaja perawat kami dan kami akan refund penuh tanpa banyak soal.'
    },
    {
      q: 'Rawatan ini sesuai untuk siapa?',
      a: 'Rawatan terbuka kepada sesiapa yang mengalami simptom gangguan spiritual (jin, sihir, saka), penyakit misteri yang tidak dijumpai punca, atau masalah berkaitan rezeki dan rumahtangga yang dipercayai ada campur tangan unsur ghaib.'
    },
  ];

  return (
    <section
      style={{
        background: '#FFFFFF',
        color: '#0F172A',
        padding: '4rem 1rem',
        fontFamily: 'var(--font-inter), -apple-system, sans-serif'
      }}
    >
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            SOALAN LAZIM
          </span>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
            fontWeight: 800, color: '#0F172A',
            marginTop: '0.4rem', marginBottom: '0.5rem', letterSpacing: '-0.02em'
          }}>
            Soalan Yang Sering Ditanya
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#4B5563', lineHeight: 1.6 }}>
            Masih ada soalan? Semua jawapan ada di sini.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                style={{
                  background: '#F8FAFC',
                  border: isOpen ? '2px solid #059669' : '1px solid #E2E8F0',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'all 0.15s ease'
                }}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  style={{
                    width: '100%', padding: '1.1rem 1.25rem',
                    background: 'transparent', border: 'none', textAlign: 'left',
                    fontWeight: 800, fontSize: '0.95rem',
                    color: isOpen ? '#047857' : '#0F172A',
                    cursor: 'pointer',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem'
                  }}
                >
                  <span>{faq.q}</span>
                  <span style={{ fontSize: '1.25rem', color: '#059669', fontWeight: 800, flexShrink: 0 }}>
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <div style={{
                    padding: '0 1.25rem 1.1rem 1.25rem',
                    fontSize: '0.9rem', color: '#374151', lineHeight: 1.65,
                    borderTop: '1px solid #E2E8F0', fontWeight: 500
                  }}>
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
