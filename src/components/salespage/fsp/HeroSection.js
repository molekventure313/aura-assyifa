'use client';

export default function FspHeroSection() {
  const scrollToForm = (e) => {
    e.preventDefault();
    const target = document.getElementById('borang');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      style={{
        background: 'linear-gradient(180deg, #042E23 0%, #0B382D 100%)',
        color: '#FFFFFF',
        padding: '3.5rem 1rem 4rem 1rem',
        fontFamily: 'var(--font-inter), -apple-system, sans-serif',
        textAlign: 'center'
      }}
    >
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>

        {/* Social proof badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          background: 'rgba(254, 224, 71, 0.15)', border: '1px solid #FDE047',
          padding: '0.4rem 1.1rem', borderRadius: '50px', marginBottom: '1.5rem'
        }}>
          <span style={{ fontSize: '1rem' }}>⭐</span>
          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#FDE047', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            500+ Pesakit Telah Dirawat — Alhamdulillah
          </span>
        </div>

        {/* Main Headline */}
        <h1 style={{
          fontSize: 'clamp(1.8rem, 4.2vw, 2.8rem)',
          fontWeight: 800,
          lineHeight: 1.25,
          color: '#FDE047',
          marginBottom: '1.2rem',
          letterSpacing: '-0.02em'
        }}>
          Masalah{' '}
          <span style={{ color: '#4ADE80' }}>Gangguan Jin, Sihir & Saka</span>{' '}
          Masih Berulang Walaupun Dah Cuba Pelbagai Cara?
        </h1>

        {/* Description */}
        <p style={{
          fontSize: '1.1rem',
          lineHeight: 1.7,
          color: '#FFFFFF',
          marginBottom: '2rem',
          maxWidth: '760px',
          margin: '0 auto 2rem auto'
        }}>
          Selepas rawatan Aura Assyifa — mimpi menakutkan reda, badan terasa ringan,
          ibadah lebih khusyuk, rumahtangga kembali harmoni & perniagaan lancar semula. <strong style={{ color: '#FDE047' }}>Dengan izin Allah.</strong>
        </p>

        {/* Video testimoni */}
        <div style={{
          marginBottom: '2.5rem',
          background: '#042E23',
          border: '2px solid #FDE047',
          borderRadius: '12px',
          padding: '1.25rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
        }}>
          <div style={{ maxWidth: '340px', margin: '0 auto', borderRadius: '12px', overflow: 'hidden', background: '#000' }}>
            <div style={{ position: 'relative', paddingBottom: '177.78%', height: 0 }}>
              <iframe
                src="https://www.youtube-nocookie.com/embed/HBg1N_floAo?controls=1&modestbranding=1&rel=0&playsinline=1"
                title="Testimoni Pesakit Aura Assyifa"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0, borderRadius: '12px' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
          <p style={{ margin: '0.75rem 0 0 0', fontSize: '0.8rem', color: '#A7F3D0', fontStyle: 'italic' }}>
            🎥 Lihat sendiri pengalaman pesakit yang telah dirawat
          </p>
        </div>

        {/* Primary CTA */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem' }}>
          <a
            href="#borang"
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
              border: '2px solid #FEF08A'
            }}
          >
            💳 Bayar RM50 & Mulakan Rawatan Sekarang
          </a>
          <span style={{ fontSize: '0.78rem', color: '#6EE7B7', fontStyle: 'italic' }}>
            Selamat · Rawatan Jarak Jauh · Patuh Syariah
          </span>
        </div>

      </div>
    </section>
  );
}
