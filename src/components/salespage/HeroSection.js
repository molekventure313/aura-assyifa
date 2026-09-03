'use client';

export default function HeroSection() {
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
        padding: '3.5rem 1rem 4rem 1rem',
        fontFamily: 'var(--font-inter), -apple-system, sans-serif',
        textAlign: 'center'
      }}
    >
      <div style={{ maxWidth: '850px', margin: '0 auto' }}>
        
        {/* Brand Badge Header */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(254, 224, 71, 0.15)', border: '1px solid #FDE047', padding: '0.4rem 1.1rem', borderRadius: '50px', marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '1.1rem' }}>🌿</span>
          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#FDE047', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Aura Assyifa · Rawatan Jarak Jauh Islam
          </span>
        </div>

        {/* Main Headline (Kuning) */}
        <h1 
          style={{ 
            fontSize: 'clamp(1.8rem, 4.2vw, 2.7rem)', 
            fontWeight: 800, 
            lineHeight: 1.25, 
            color: '#FDE047', 
            marginBottom: '1.5rem',
            letterSpacing: '-0.02em'
          }}
        >
          Masalah{' '}
          <span style={{ color: '#4ADE80' }}>Gangguan Jin, Sihir, Saka</span>{' '}
          Selesai Selepas Dapatkan Rawatan Di Aura Assyifa
        </h1>



        {/* Description (Putih) */}
        <p 
          style={{ 
            fontSize: '1.05rem', 
            lineHeight: 1.65, 
            color: '#FFFFFF', 
            marginBottom: '2rem',
            maxWidth: '780px',
            margin: '0 auto 2rem auto'
          }}
        >
          Sakit misteri makin reda, mimpi menakutkan semakin berkurang, perniagaan kembali lancar dan hubungan rumah tangga jadi lebih harmoni.
        </p>

        {/* Video Testimoni — YouTube Shorts (portrait 9:16, max width 360px) */}
        <div style={{ marginBottom: '2.5rem', background: '#042E23', border: '2px solid #FDE047', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
          {/* Shorts: 9:16 portrait, constrained width supaya nampak betul kat desktop & mobile */}
          <div style={{ maxWidth: '340px', margin: '0 auto', borderRadius: '12px', overflow: 'hidden', background: '#000' }}>
            <div style={{ position: 'relative', paddingBottom: '177.78%', height: 0 }}>
              <iframe
                src="https://www.youtube-nocookie.com/embed/HBg1N_floAo?controls=1&modestbranding=1&rel=0&playsinline=1"
                title="Video Testimoni Aura Assyifa Shorts"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0, borderRadius: '12px' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        {/* Primary CTA Button (Kuning + Font Hitam) */}
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
            👉 Tempah Temujanji Sekarang
          </a>
        </div>

      </div>
    </section>
  );
}
