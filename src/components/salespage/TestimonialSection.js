'use client';

export default function TestimonialSection() {
  const testimonialImages = [
    '/testimonials/testimoni-1.jpg',
    '/testimonials/testimoni-2.jpg',
    '/testimonials/testimoni-3.jpg'
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
      <div style={{ maxWidth: '950px', margin: '0 auto', textAlign: 'center' }}>
        
        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          TESTIMONI PESAKIT (BAHAGIAN 1)
        </span>
        
        <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 800, color: '#0F172A', marginTop: '0.4rem', marginBottom: '2.25rem', letterSpacing: '-0.02em' }}>
          Apa Kata Pesakit Yang Pernah Mendapatkan Rawatan ESyifaa
        </h2>

        {/* 3 Screenshot Images Grid without text */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1.5rem', alignItems: 'flex-start' }}>
          {testimonialImages.map((imgUrl, idx) => (
            <div 
              key={idx}
              style={{
                background: '#F8FAFC',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '2px solid #059669',
                boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
                transition: 'transform 0.2s ease, boxShadow 0.2s ease'
              }}
            >
              <img 
                src={imgUrl} 
                alt={`Testimoni Pesakit ESyifaa ${idx + 1}`}
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  display: 'block',
                  maxHeight: '650px',
                  objectFit: 'contain',
                  background: '#FFFFFF'
                }}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
