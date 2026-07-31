'use client';

export default function FAQSection() {
  const faqs = [
    {
      q: "Perlu datang ke pusat rawatan?",
      a: "Tak perlu. Semua rawatan dilakukan secara jarak jauh."
    },
    {
      q: "Macam mana rawatan dijalankan?",
      a: "Selepas konsultasi, rawatan akan dijalankan pada waktu yang dipersetujui menggunakan bacaan al-Quran dan doa."
    },
    {
      q: "Berapa lama tempoh rawatan?",
      a: "Bergantung pada keadaan setiap individu. Ada yang memerlukan satu sesi, ada juga yang perlukan sesi susulan."
    },
    {
      q: "Rawatan ni sesuai untuk siapa?",
      a: "Sesuai untuk mereka yang ingin berikhtiar melalui rawatan Islam. Kalau anda ada masalah kesihatan fizikal atau mental, teruskan juga mendapatkan rawatan daripada doktor atau pakar."
    },
    {
      q: "Macam mana nak tahu saya betul-betul kena gangguan?",
      a: "Sebelum rawatan bermula, kami akan buat konsultasi terlebih dahulu. Bukan semua simptom berpunca daripada gangguan. Sebab itu penilaian awal sangat penting."
    },
    {
      q: "Adakah maklumat saya dirahsiakan?",
      a: "Ya. Semua maklumat pelanggan dirahsiakan dan hanya digunakan untuk tujuan konsultasi serta rawatan."
    }
  ];

  const scrollToForm = (e) => {
    e.preventDefault();
    const el = document.getElementById('apply-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* SECTION 10 – SOALAN LAZIM */}
      <section className="section-mvsyifaa" id="faq">
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="badge-mvsyifaa">❓ SECTION 10 – SOALAN LAZIM</span>

          <h2 className="section-title-mvsyifaa" style={{ textAlign: 'center' }}>
            Soalan Lazim (FAQ)
          </h2>

          <div style={{ maxWidth: '800px', margin: '2rem auto 0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'center' }}>
            {faqs.map((f, idx) => (
              <details 
                key={idx} 
                className="card-mvsyifaa" 
                style={{ 
                  padding: '1.35rem 1.75rem', 
                  borderRadius: '18px', 
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                <summary style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--font-dark-green)', outline: 'none', textAlign: 'center' }}>
                  {f.q}
                </summary>
                <p style={{ marginTop: '0.9rem', color: 'var(--font-muted-dark)', fontSize: '0.95rem', lineHeight: 1.65, textAlign: 'center', margin: '0.9rem 0 0 0', fontWeight: 600 }}>
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* PENUTUP */}
      <section className="section-mvsyifaa bg-green-blend-mvsyifaa" style={{ padding: '4.5rem 1rem' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto' }}>
          <div 
            style={{ 
              padding: '2.75rem 2.25rem', 
              borderRadius: '24px', 
              background: 'var(--yellow-box-bg)',
              color: 'var(--font-dark-green)',
              textAlign: 'center',
              border: '3px solid var(--yellow-box-border)',
              boxShadow: '0 20px 45px rgba(0,0,0,0.3)'
            }}
          >
            <span className="badge-mvsyifaa" style={{ background: 'var(--green-forest-dark)', color: 'var(--yellow-font)', border: 'none' }}>
              🌟 PENUTUP &amp; KONSULTASI
            </span>

            <p style={{ fontSize: '1.15rem', lineHeight: 1.8, color: 'var(--font-dark-green)', fontWeight: 800, marginBottom: '2rem', textAlign: 'center' }}>
              Ramai yang dah memilih untuk berikhtiar mendapatkan ketenangan melalui rawatan Islam secara jarak jauh. Kalau anda rasa keadaan yang dialami semakin mengganggu kehidupan harian, jangan pendam seorang diri. Isi borang sekarang untuk dapatkan konsultasi awal dan ketahui langkah yang sesuai untuk anda.
            </p>

            <a 
              href="#apply-form" 
              onClick={scrollToForm} 
              className="btn-mvsyifaa primary-btn"
              style={{ fontSize: '1.1rem', padding: '1.1rem 2.5rem' }}
            >
              ✨ Isi Borang Konsultasi Sekarang
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
