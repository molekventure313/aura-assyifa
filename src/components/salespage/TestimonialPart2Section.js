'use client';

export default function TestimonialPart2Section() {
  const images = [
    '/images/testimonials/testimoni_part2_1.jpg',
    '/images/testimonials/testimoni_part2_2.jpg',
    '/images/testimonials/testimoni_part2_3.jpg'
  ];

  return (
    <section 
      style={{
        background: '#0B382D',
        color: '#FFFFFF',
        padding: '3.5rem 1rem',
        fontFamily: 'var(--font-inter), -apple-system, sans-serif'
      }}
    >
      <div style={{ maxWidth: '950px', margin: '0 auto', textAlign: 'center' }}>
        
        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FDE047', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          TESTIMONI PESAKIT (BAHAGIAN 2)
        </span>

        <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 800, color: '#FDE047', marginTop: '0.4rem', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
          Betulkah Aura Assyifa Membantu Pesakit Sembuh?
        </h2>

        <p style={{ fontSize: '1rem', color: '#FFFFFF', marginBottom: '2.5rem', opacity: 0.9 }}>
          Lihat sendiri pengalaman mereka yang telah mendapatkan rawatan Aura Assyifa.
        </p>

        {/* 3 Image Testimonial Grid */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '1.5rem',
            alignItems: 'start'
          }}
        >
          {images.map((imgSrc, idx) => (
            <div 
              key={idx} 
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                border: '2px solid #FDE047',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
                background: '#042E23',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
            >
              <img 
                src={imgSrc} 
                alt={`Testimoni Pesakit Aura Assyifa Bahagian 2 - ${idx + 1}`}
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  display: 'block',
                  borderRadius: '14px'
                }}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
