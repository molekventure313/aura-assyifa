'use client';

export default function TestimonialSection() {
  const images = [
    {
      src: '/testimoni/sihir-testimoni-1.jpg',
      alt: 'Testimoni pesakit ESyifaa - WhatsApp 1'
    },
    {
      src: '/testimoni/sihir-testimoni-2.jpg',
      alt: 'Testimoni pesakit ESyifaa - WhatsApp 2'
    },
    {
      src: '/testimoni/sihir-testimoni-3.jpg',
      alt: 'Testimoni pesakit ESyifaa - WhatsApp 3'
    }
  ];

  return (
    <section
      style={{
        background: '#0B382D',
        padding: '3.5rem 1rem',
        fontFamily: 'var(--font-inter), -apple-system, sans-serif'
      }}
    >
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>

        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 800,
            color: '#FDE047',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}>
            TESTIMONI PESAKIT
          </span>
          <h2 style={{
            fontSize: 'clamp(1.4rem, 3.2vw, 2rem)',
            fontWeight: 800,
            color: '#FFFFFF',
            marginTop: '0.4rem',
            marginBottom: 0,
            letterSpacing: '-0.02em'
          }}>
            Apa Kata Pesakit Yang Pernah Mendapatkan Rawatan ESyifaa
          </h2>
        </div>

        {/* 3 Testimoni Images */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5rem',
          justifyItems: 'center'
        }}>
          {images.map((img, idx) => (
            <div
              key={idx}
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                border: '3px solid #FDE047',
                boxShadow: '0 12px 30px rgba(0,0,0,0.4)',
                width: '100%',
                maxWidth: '340px'
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'cover'
                }}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
