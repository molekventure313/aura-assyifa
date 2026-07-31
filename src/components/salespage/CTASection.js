'use client';

export default function CTASection() {
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
        padding: '3.5rem 1rem',
        fontFamily: 'var(--font-inter), -apple-system, sans-serif',
        textAlign: 'center'
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#F59E0B', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          TINDAKAN SEGERA
        </span>

        <h2 style={{ fontSize: 'clamp(1.6rem, 3.8vw, 2.3rem)', fontWeight: 800, color: '#FFFFFF', marginTop: '0.4rem', marginBottom: '1.25rem', lineHeight: 1.3, letterSpacing: '-0.02em' }}>
          Jangan Tunggu Sehingga Gangguan Terus Mengganggu Kehidupan Anda
        </h2>

        <p style={{ fontSize: '1.05rem', lineHeight: 1.65, color: '#FEF3C7', marginBottom: '2rem', maxWidth: '720px', margin: '0 auto 2rem auto' }}>
          Ambil langkah pertama dengan mendapatkan konsultasi dan rawatan bersama ESyifaa. Pilih waktu temujanji anda di bawah.
        </p>

        <div>
          <a
            href="#apply-form"
            onClick={scrollToForm}
            style={{
              display: 'inline-block',
              padding: '1.1rem 2.2rem',
              fontSize: '1.15rem',
              fontWeight: 800,
              color: '#042E23',
              background: 'linear-gradient(180deg, #FDE047 0%, #EAB308 100%)',
              borderRadius: '50px',
              textDecoration: 'none',
              boxShadow: '0 10px 25px rgba(234, 179, 8, 0.4)',
              transition: 'transform 0.15s ease',
              border: '2px solid #FEF08A'
            }}
          >
            👉 Tempah Temujanji Sekarang
          </a>
        </div>

      </div>
    </section>
  );
}
