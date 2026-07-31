'use client';

export default function SolutionSection() {
  const benefits = [
    'Lebih tenang.',
    'Tidur lebih lena.',
    'Lebih mudah beribadah.',
    'Emosi lebih stabil.',
    'Kehidupan harian menjadi lebih baik.'
  ];

  return (
    <section 
      style={{
        background: '#042E23',
        color: '#FFFFFF',
        padding: '3.5rem 1rem',
        fontFamily: 'var(--font-inter), -apple-system, sans-serif'
      }}
    >
      <div style={{ maxWidth: '850px', margin: '0 auto', textAlign: 'center' }}>
        
        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#34D399', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          SOLUSI RAWATAN ISLAM
        </span>

        <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 800, color: '#FFFFFF', marginTop: '0.4rem', marginBottom: '1.25rem', letterSpacing: '-0.02em', lineHeight: 1.3 }}>
          ESyifaa Membantu Anda Menghadapi Gangguan Mistik Dengan Kaedah Rawatan Patuh Syariah
        </h2>

        <p style={{ fontSize: '1.05rem', lineHeight: 1.65, color: '#D1D5DB', marginBottom: '2rem', maxWidth: '780px', margin: '0 auto 2rem auto' }}>
          ESyifaa menawarkan sesi rawatan dan konsultasi bagi membantu pesakit yang mengalami simptom gangguan mistik. Rawatan dijalankan menggunakan kaedah yang selaras dengan syariat Islam sebagai satu bentuk ikhtiar.
        </p>

        {/* Perubahan Pesakit Box */}
        <div 
          style={{ 
            background: 'rgba(254, 243, 199, 0.08)', 
            border: '1px solid rgba(254, 243, 199, 0.25)', 
            borderRadius: '12px', 
            padding: '1.5rem', 
            marginBottom: '2rem',
            textAlign: 'left'
          }}
        >
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#FEF3C7', marginBottom: '1rem', textAlign: 'center' }}>
            Ramai pesakit berkongsi bahawa mereka mula merasai perubahan seperti:
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem' }}>
            {benefits.map((b, idx) => (
              <div 
                key={idx}
                style={{
                  background: '#064E3B',
                  border: '1px solid #10B981',
                  borderRadius: '8px',
                  padding: '0.75rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  color: '#ECFDF5',
                  fontWeight: 700,
                  fontSize: '0.925rem'
                }}
              >
                <span style={{ color: '#34D399', fontSize: '1.1rem' }}>✨</span>
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Gambar Servis ESyifaa */}
        <div style={{ borderRadius: '12px', overflow: 'hidden', border: '2px solid rgba(52, 211, 153, 0.3)', boxShadow: '0 15px 35px rgba(0,0,0,0.4)' }}>
          <img 
            src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1000&q=80" 
            alt="Gambar Servis Rawatan ESyifaa" 
            style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '380px', objectFit: 'cover' }}
          />
        </div>

      </div>
    </section>
  );
}
