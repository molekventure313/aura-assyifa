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
        background: '#FFFFFF',
        color: '#0F172A',
        padding: '3.5rem 1rem',
        fontFamily: 'var(--font-inter), -apple-system, sans-serif'
      }}
    >
      <div style={{ maxWidth: '850px', margin: '0 auto', textAlign: 'center' }}>
        
        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          SOLUSI RAWATAN ISLAM
        </span>

        <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 800, color: '#0F172A', marginTop: '0.4rem', marginBottom: '1.25rem', letterSpacing: '-0.02em', lineHeight: 1.3 }}>
          ESyifaa Membantu Anda Menghadapi Gangguan Mistik Dengan Kaedah Rawatan Patuh Syariah
        </h2>

        <p style={{ fontSize: '1.05rem', lineHeight: 1.65, color: '#374151', marginBottom: '2rem', maxWidth: '780px', margin: '0 auto 2rem auto', fontWeight: 500 }}>
          ESyifaa menawarkan sesi rawatan dan konsultasi bagi membantu pesakit yang mengalami simptom gangguan mistik. Rawatan dijalankan menggunakan kaedah yang selaras dengan syariat Islam sebagai satu bentuk ikhtiar.
        </p>

        {/* Perubahan Pesakit Box (Deep Emerald Background + Kuning Title + Putih Text) */}
        <div 
          style={{ 
            background: '#042E23', 
            border: '2px solid #059669', 
            borderRadius: '12px', 
            padding: '1.5rem', 
            marginBottom: '2rem',
            textAlign: 'left',
            boxShadow: '0 10px 25px rgba(0,0,0,0.12)'
          }}
        >
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FDE047', marginBottom: '1.25rem', textAlign: 'center' }}>
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
                  padding: '0.85rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '0.95rem'
                }}
              >
                <span style={{ color: '#FDE047', fontSize: '1.1rem' }}>✨</span>
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Gambar Servis ESyifaa */}
        <div style={{ borderRadius: '12px', overflow: 'hidden', border: '3px solid #059669', boxShadow: '0 15px 35px rgba(0,0,0,0.12)' }}>
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
