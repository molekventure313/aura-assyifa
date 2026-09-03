'use client';

export default function FspTestimonialSection() {
  const images = [
    '/images/testimonials/testimoni_1.jpg',
    '/images/testimonials/testimoni_2.jpg',
    '/images/testimonials/testimoni_3.jpg',
    '/images/testimonials/testimoni_part2_1.jpg',
  ];

  return (
    <section
      style={{
        background: '#FFFFFF',
        color: '#0F172A',
        padding: '3.5rem 1rem',
        fontFamily: 'var(--font-inter), -apple-system, sans-serif'
      }}
    >
      <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>

        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          TESTIMONI PESAKIT (BAHAGIAN 1)
        </span>

        <h2 style={{
          fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
          fontWeight: 800,
          color: '#0F172A',
          marginTop: '0.4rem',
          marginBottom: '0.5rem',
          letterSpacing: '-0.02em'
        }}>
          Apa Kata Mereka Yang Dah Cuba Rawatan Aura Assyifa?
        </h2>

        <p style={{ fontSize: '1rem', color: '#4B5563', marginBottom: '2.5rem', lineHeight: 1.6 }}>
          Bukan kami yang cakap — biar pesakit sendiri yang kongsikan pengalaman mereka.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
          alignItems: 'start'
        }}>
          {images.map((imgSrc, idx) => (
            <div
              key={idx}
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                border: '2px solid #059669',
                boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
                background: '#F8FAFC',
              }}
            >
              <img
                src={imgSrc}
                alt={`Testimoni Pesakit Aura Assyifa ${idx + 1}`}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          ))}
        </div>

        {/* Social proof counter */}
        <div style={{
          marginTop: '2rem',
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
          flexWrap: 'wrap'
        }}>
          {[
            { num: '500+', label: 'Pesakit Dirawat' },
            { num: '98%', label: 'Puas Hati' },
            { num: '100%', label: 'Patuh Syariah' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 900, color: '#047857' }}>{s.num}</div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
