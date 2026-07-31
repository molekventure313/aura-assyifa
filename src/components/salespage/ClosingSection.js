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
        background: 'linear-gradient(180deg, #042E23 0%, #021812 100%)',
        color: '#FFFFFF',
        padding: '4rem 1rem',
        fontFamily: 'var(--font-inter), -apple-system, sans-serif',
        textAlign: 'center'
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#34D399', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          HASRAT &amp; HARAPAN
        </span>

        <h2 style={{ fontSize: 'clamp(1.6rem, 3.8vw, 2.4rem)', fontWeight: 800, color: '#FFFFFF', marginTop: '0.4rem', marginBottom: '1.5rem', lineHeight: 1.25, letterSpacing: '-0.02em' }}>
          Jangan Hadapi Semua Ini Seorang Diri
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '1.05rem', lineHeight: 1.65, color: '#E5E7EB', marginBottom: '2.5rem', maxWidth: '750px', margin: '0 auto 2.5rem auto' }}>
          <p style={{ margin: 0 }}>
            Jika anda sudah lama berdepan dengan gangguan yang menjejaskan ketenangan hidup, inilah masanya untuk mendapatkan konsultasi dan ikhtiar rawatan bersama ESyifaa.
          </p>
          <p style={{ margin: 0 }}>
            Pasukan ESyifaa akan membantu menilai keadaan anda dan mencadangkan kaedah rawatan yang bersesuaian mengikut syariat Islam.
          </p>
          <p style={{ margin: 0, fontWeight: 700, color: '#FEF3C7' }}>
            Tempah temujanji hari ini dan mulakan langkah pertama ke arah kehidupan yang lebih tenang.
          </p>
        </div>

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
