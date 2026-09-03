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
        background: 'linear-gradient(180deg, #0B382D 0%, #042E23 100%)',
        color: '#FFFFFF',
        padding: '4rem 1rem',
        fontFamily: 'var(--font-inter), -apple-system, sans-serif',
        textAlign: 'center'
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FDE047', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          IKHTIAR PEMULIHAN KESIHATAN ANDA
        </span>

        <h2 style={{ fontSize: 'clamp(1.6rem, 3.8vw, 2.4rem)', fontWeight: 800, color: '#FDE047', marginTop: '0.5rem', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
          Jangan Biarkan Penyakit Misteri Terus Memusnahkan Kesihatan Anda
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '1rem', lineHeight: 1.65, color: '#FFFFFF', marginBottom: '2.5rem', opacity: 0.95 }}>
          <p style={{ margin: 0 }}>
            Membiarkan kesakitan berterusan tanpa mengenal pasti punca rohani hanya akan membuatkan anda semakin derita dan penat emosi.
          </p>
          <p style={{ margin: 0 }}>
            Ramai pesakit yang pernah berada di tempat anda kini kembali sihat, bertenaga dan boleh menjalani kehidupan harian dengan tenang selepas mendapat diagnos dan rawatan dari Aura Assyifa.
          </p>
          <p style={{ margin: 0, fontWeight: 700, color: '#FEF3C7' }}>
            Ambil langkah pertama hari ini. Hubungi kami untuk sesi diagnos awal secara percuma.
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
