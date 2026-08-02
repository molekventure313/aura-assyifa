'use client';

export default function HeroSection() {
  const scrollToForm = (e) => {
    e.preventDefault();
    const target = document.getElementById('apply-form');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const signs = [
    'sebelum kena penyakit misteri, berlaku kemalangan',
    'kerap sakit yang datang secara mengejut terutama selepas waktu asar',
    'sudah berjumpa pelbagai doktor dan pakar tetapi punca penyakit tetap tidak dijumpai.',
    'keputusan ujian darah, x-ray & ct scan semua normal, tapi badan masih sengsara dan menderita.',
    'makan ubat hospital tetapi tidak memberikan kesan yang sepatutnya'
  ];

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
            ESyifaa · Rawatan Jarak Jauh Islam
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
          Mengalami Sakit Berterusan Tetapi Ujian Hospital &amp; Doktor Sahkan Semua Normal?
        </h1>

        {/* Sub-points card */}
        <div 
          style={{ 
            background: '#064E3B', 
            border: '2px solid #FDE047', 
            borderRadius: '12px', 
            padding: '1.35rem 1.5rem', 
            marginBottom: '1.75rem',
            textAlign: 'left',
            boxShadow: '0 8px 20px rgba(0,0,0,0.3)'
          }}
        >
          <div style={{ fontWeight: 800, fontSize: '1rem', color: '#FDE047', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Tanda-tanda anda mungkin mengalami Penyakit Misteri:
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.975rem', color: '#FFFFFF' }}>
            {signs.map((sign, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                <span style={{ color: '#FDE047', fontWeight: 800 }}>✔</span>
                <span>{sign}</span>
              </li>
            ))}
          </ul>
        </div>

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
          Penyakit misteri selalunya berpunca daripada gangguan halus atau sihir yang menjejaskan fizikal tanpa dapat dikesan oleh perubatan moden. ESyifaa menawarkan ikhtiar rawatan jarak jauh patuh syariah untuk mengenal pasti dan merawat punca sebenar penyakit anda.
        </p>

        {/* Hero Image Showcase */}
        <div style={{ marginBottom: '2.5rem', borderRadius: '12px', overflow: 'hidden', border: '3px solid #FDE047', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
          <img 
            src="/images/penyakit-misteri/penyakit_misteri_hero.jpg" 
            alt="Gambar Hero ESyifaa Rawatan Penyakit Misteri" 
            style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '500px', objectFit: 'cover' }}
          />
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
            Dapatkan Diagnos Percuma Sekarang
          </a>
        </div>

      </div>
    </section>
  );
}
