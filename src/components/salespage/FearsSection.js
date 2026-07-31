'use client';

export default function FearsSection() {
  return (
    <section 
      style={{
        background: '#0B382D',
        color: '#FFFFFF',
        padding: '3.5rem 1rem',
        fontFamily: 'var(--font-inter), -apple-system, sans-serif',
        textAlign: 'center'
      }}
    >
      <div style={{ maxWidth: '850px', margin: '0 auto' }}>
        
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(254, 224, 71, 0.15)', border: '1px solid #FDE047', padding: '0.35rem 1rem', borderRadius: '50px', marginBottom: '1.25rem' }}>
          <span style={{ fontSize: '1rem' }}>⚠️</span>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FDE047', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            PERINGATAN PENTING
          </span>
        </div>

        <h2 style={{ fontSize: 'clamp(1.4rem, 3.2vw, 2.1rem)', fontWeight: 800, color: '#FDE047', marginBottom: '1.25rem', lineHeight: 1.3, letterSpacing: '-0.02em' }}>
          Sila Beri Perhatian Jika Anda Mengalami Masalah Di Atas Kerana Ia Boleh Menjadi Semakin Mengganggu Kehidupan
        </h2>

        <p style={{ fontSize: '1.05rem', lineHeight: 1.65, color: '#FFFFFF', marginBottom: '2rem', maxWidth: '750px', margin: '0 auto 2rem auto' }}>
          Jika dibiarkan tanpa mendapatkan pemeriksaan dan ikhtiar rawatan yang sesuai, gangguan yang dialami mungkin terus memberi kesan kepada emosi, hubungan kekeluargaan, pekerjaan serta ibadah harian.
        </p>

        {/* Keratan Akhbar / Rujukan Berkaitan Showcase */}
        <div 
          style={{ 
            background: '#042E23', 
            border: '2px solid #FDE047', 
            borderRadius: '12px', 
            padding: '1.5rem', 
            boxShadow: '0 15px 30px rgba(0,0,0,0.3)',
            textAlign: 'left'
          }}
        >
          <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#FDE047', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>📰</span> Keratan Akhbar &amp; Laporan Berkaitan Gangguan Mistik &amp; Emosi
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            
            <div style={{ background: '#064E3B', padding: '1.1rem', borderRadius: '8px', border: '1px solid #10B981' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FDE047', marginBottom: '0.3rem' }}>Laporan Berita &amp; Akhbar</div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#FFFFFF', margin: '0 0 0.5rem 0', lineHeight: 1.35 }}>
                "Gangguan Emosi &amp; Misteri Boleh Menjejaskan Kesejahteraan Rumah Tangga Jika Tidak Dirawat Awal"
              </h3>
              <p style={{ fontSize: '0.825rem', color: '#F3F4F6', margin: 0, lineHeight: 1.5 }}>
                Pakar mengesahkan masalah tidur berpanjangan dan tekanan emosi akibat gangguan mistik memerlukan pemeriksaan serta ikhtiar kerohanian berlandaskan syarak secara teratur.
              </p>
            </div>

            <div style={{ background: '#064E3B', padding: '1.1rem', borderRadius: '8px', border: '1px solid #10B981' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FDE047', marginBottom: '0.3rem' }}>Rujukan Kesihatan &amp; Syarak</div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#FFFFFF', margin: '0 0 0.5rem 0', lineHeight: 1.35 }}>
                "Ikhtiar Rawatan Islam Membantu Mengembalikan Ketenangan Minda &amp; Ibadah"
              </h3>
              <p style={{ fontSize: '0.825rem', color: '#F3F4F6', margin: 0, lineHeight: 1.5 }}>
                Penggunaan ayat Al-Quran dan doa-doa ma'thur menjadi benteng utama pesakit untuk kembali mendapatkan ketenangan jiwa dan kehidupan harian yang tenteram.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
