'use client';

export default function ProcessSection() {
  return (
    <section className="section-mvsyifaa" id="kenapa-tak-boleh-biar">
      <div className="container" style={{ textAlign: 'center' }}>
        <span className="badge-mvsyifaa" style={{ background: '#FEE2E2', color: '#991B1B', border: '1.5px solid #FCA5A5' }}>
          🛑 KESAN KESIHATAN EMOSI &amp; ROHANI
        </span>

        <h2 className="section-title-mvsyifaa" style={{ textAlign: 'center' }}>
          Jangan Ambil Mudah Kalau Anda Alami Masalah-Masalah Ni
        </h2>

        <p className="section-desc-mvsyifaa" style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 2.5rem auto' }}>
          Kalau dibiarkan terlalu lama, keadaan ini boleh jadi semakin teruk. Emosi makin tertekan, kerja mula terganggu, hubungan keluarga jadi renggang dan ibadah pun susah nak fokus. Bukan semua masalah berpunca daripada gangguan. Sebab itu penting untuk buat pemeriksaan dan dapatkan nasihat daripada pihak yang betul.
        </p>

        {/* Newspaper / Info Cards Grid */}
        <div className="grid-3-mvsyifaa" style={{ gap: '1.75rem' }}>
          
          <div className="card-mvsyifaa" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📰</div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--font-dark-green)', marginBottom: '0.5rem', textAlign: 'center' }}>
              Gangguan Mistik Menurut Pandangan Pakar
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--font-muted-dark)', lineHeight: 1.6, textAlign: 'center' }}>
              Kajian perubatan Islam menunjukkan simptom gangguan yang lambat dirawat boleh memberi kesan ketara kepada kestabilan saraf dan jiwa.
            </p>
          </div>

          <div className="card-mvsyifaa" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🧠</div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--font-dark-green)', marginBottom: '0.5rem', textAlign: 'center' }}>
              Tekanan Emosi &amp; Kesihatan Mental
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--font-muted-dark)', lineHeight: 1.6, textAlign: 'center' }}>
              Masalah tidur berpanjangan dan kegelisahan kronik akan menjejaskan kesihatan fizikal serta hubungan sesama insan.
            </p>
          </div>

          <div className="card-mvsyifaa" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📖</div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--font-dark-green)', marginBottom: '0.5rem', textAlign: 'center' }}>
              Ikhtiar Rawatan Islam &amp; Ruqyah Syariyyah
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--font-muted-dark)', lineHeight: 1.6, textAlign: 'center' }}>
              Penggunaan ayat-ayat Al-Quran dan doa yang sahih membantu menenangkan jiwa dan membentengi diri daripada gangguan rohani.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
