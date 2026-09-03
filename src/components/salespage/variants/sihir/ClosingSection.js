'use client';

export default function ClosingSection() {
  const scrollToForm = (e) => {
    e.preventDefault();
    const target = document.getElementById('apply-form');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      style={{
        background: 'linear-gradient(180deg, #042E23 0%, #0B382D 100%)',
        color: '#FFFFFF',
        padding: '4rem 1rem',
        fontFamily: 'var(--font-inter), -apple-system, sans-serif',
        textAlign: 'center'
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FDE047', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          AMBIL TINDAKAN SEKARANG
        </span>

        <h2 style={{ fontSize: 'clamp(1.6rem, 3.8vw, 2.4rem)', fontWeight: 800, color: '#FDE047', marginTop: '0.4rem', marginBottom: '1.5rem', lineHeight: 1.25, letterSpacing: '-0.02em' }}>
          Jangan Biarkan Sihir Terus Memusnahkan Kehidupan Anda
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '1.05rem', lineHeight: 1.65, color: '#FFFFFF', marginBottom: '2.5rem', maxWidth: '750px', margin: '0 auto 2.5rem auto' }}>
          <p style={{ margin: 0 }}>
            Sihir adalah nyata dan diakui dalam Al-Quran dan hadis sahih. Membiarkannya tanpa ikhtiar rawatan hanya akan memperburukkan keadaan dari masa ke masa.
          </p>
          <p style={{ margin: 0 }}>
            Ramai yang sudah lama menanggung penderitaan akibat sihir tanpa mengetahui punca sebenar. Aura Assyifa ada untuk membantu anda mengenal pasti dan menangani masalah ini.
          </p>
          <p style={{ margin: 0 }}>
            Hubungi Aura Assyifa hari ini untuk mendapatkan diagnos percuma dan mulakan perjalanan pemulihan anda bersama kami.
          </p>
        </div>

        <div>
          <a
            href="#apply-form"
            onClick={scrollToForm}
            style={{
              display: 'inline-block',
              padding: '1.15rem 2.4rem',
              fontSize: '1.15rem',
              fontWeight: 800,
              color: '#042E23',
              background: 'linear-gradient(180deg, #FDE047 0%, #EAB308 100%)',
              borderRadius: '50px',
              textDecoration: 'none',
              boxShadow: '0 10px 25px rgba(234, 179, 8, 0.45)',
              transition: 'transform 0.15s ease',
              border: '2px solid #FEF08A'
            }}
          >
            Dapatkan Diagnos Percuma Sekarang
          </a>
        </div>

      </div>
    </section>
  );
}
