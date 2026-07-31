'use client';

export default function MatlamatSection() {
  const goals = [
    'Membantu mendapatkan ketenangan diri.',
    'Membantu mengurangkan gangguan yang dialami.',
    'Membantu meningkatkan fokus dalam ibadah.',
    'Membantu memulihkan keyakinan diri untuk menjalani kehidupan.',
    'Memberikan panduan dan ikhtiar rawatan secara patuh syariah.'
  ];

  return (
    <section 
      style={{
        background: '#FEF3C7',
        color: '#06231C',
        padding: '3.5rem 1rem',
        fontFamily: 'var(--font-inter), -apple-system, sans-serif'
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        
        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#D97706', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          MATLAMAT UTAMA
        </span>

        <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 800, color: '#06231C', marginTop: '0.4rem', marginBottom: '2rem', letterSpacing: '-0.02em' }}>
          Apa Yang Ingin Dicapai Melalui Rawatan ESyifaa?
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
          {goals.map((g, idx) => (
            <div 
              key={idx}
              style={{
                background: '#FFFFFF',
                border: '1px solid #FCD34D',
                borderRadius: '10px',
                padding: '1.1rem 1.35rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
              }}
            >
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#059669', color: '#FFFFFF', fontWeight: 800, fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                ✔
              </div>
              <span style={{ fontWeight: 700, fontSize: '1rem', color: '#06231C' }}>
                {g}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
