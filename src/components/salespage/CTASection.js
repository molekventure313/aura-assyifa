'use client';

export default function CTASection() {
  const scrollToProses = (e) => {
    e.preventDefault();
    const target = document.getElementById('proses');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      style={{
        background: 'linear-gradient(180deg, #0B382D 0%, #042E23 100%)',
        color: '#FFFFFF',
        padding: '3.5rem 1rem',
        fontFamily: 'var(--font-inter), -apple-system, sans-serif',
        textAlign: 'center'
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FDE047', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          LANGKAH PERTAMA
        </span>

        <h2 style={{ fontSize: 'clamp(1.6rem, 3.8vw, 2.3rem)', fontWeight: 800, color: '#FDE047', marginTop: '0.4rem', marginBottom: '1.25rem', lineHeight: 1.3, letterSpacing: '-0.02em' }}>
          Jangan Tunggu — Minta Diagnos Percuma Dahulu
        </h2>

        <p style={{ fontSize: '1.05rem', lineHeight: 1.65, color: '#FFFFFF', marginBottom: '0.75rem', maxWidth: '720px', margin: '0 auto 0.75rem auto' }}>
          Sebelum apa-apa keputusan dibuat, biar perawat kami <strong style={{ color: '#FDE047' }}>diagnos dahulu secara percuma</strong>.
          Anda tidak perlu komit apa-apa. Tiada bayaran. Tiada paksaan.
        </p>
        <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#A7F3D0', marginBottom: '2rem', maxWidth: '620px', margin: '0 auto 2rem auto' }}>
          Hanya isi borang ringkas, perawat akan hubungi anda dan terangkan apa yang sedang anda hadapi — kemudian anda yang buat keputusan.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem' }}>
          <a
            href="#proses"
            onClick={scrollToProses}
            style={{
              display: 'inline-block',
              padding: '1.15rem 2.4rem',
              fontSize: '1.1rem',
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
            🩺 Dapatkan Diagnos Percuma Sekarang
          </a>
          <span style={{ fontSize: '0.78rem', color: '#6EE7B7', fontStyle: 'italic' }}>
            Percuma. Tiada obligasi. Tiada paksaan.
          </span>
        </div>

      </div>
    </section>
  );
}
