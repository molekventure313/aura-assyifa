'use client';

export default function ProcessSection() {
  const steps = [
    {
      step: 'Langkah 1',
      title: 'Isi borang temujanji.',
      desc: 'Lengkapkan butiran asas dan pilihan sesi waktu temujanji rawatan anda.'
    },
    {
      step: 'Langkah 2',
      title: 'Konsultasi bagi memahami simptom dan keadaan pesakit.',
      desc: 'Perawat bertugas akan berhubung secara langsung untuk analisa simptom.'
    },
    {
      step: 'Langkah 3',
      title: 'Sesi rawatan dijalankan mengikut kaedah patuh syariah.',
      desc: 'Sesi ikhtiar perubatan Islam secara beradab dan berlandaskan Al-Quran & doa.'
    },
    {
      step: 'Langkah 4',
      title: 'Pesakit diberikan panduan dan susulan selepas rawatan jika diperlukan.',
      desc: 'Panduan amalan benteng diri serta bimbingan berterusan dari perawat.'
    }
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
          PROSES &amp; KAEDAH RAWATAN
        </span>

        <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 800, color: '#0F172A', marginTop: '0.4rem', marginBottom: '2.5rem', letterSpacing: '-0.02em' }}>
          Bagaimana Rawatan ESyifaa Dilaksanakan?
        </h2>

        {/* 4 Langkah Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
          {steps.map((s, idx) => (
            <div 
              key={idx}
              style={{
                background: '#F8FAFC',
                border: '2px solid #059669',
                borderRadius: '12px',
                padding: '1.35rem 1.1rem',
                textAlign: 'left',
                boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ display: 'inline-block', background: '#042E23', color: '#FDE047', fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '4px', width: 'fit-content', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                {s.step}
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.4rem 0', lineHeight: 1.35 }}>
                {s.title}
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#4B5563', margin: 0, lineHeight: 1.5, fontWeight: 500 }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Poster 4 Langkah + Gambar Servis */}
        <div 
          style={{ 
            background: '#042E23', 
            borderRadius: '12px', 
            padding: '1.5rem', 
            border: '3px solid #059669', 
            boxShadow: '0 15px 30px rgba(0,0,0,0.15)',
            textAlign: 'center'
          }}
        >
          <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#FDE047', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
            📌 Poster 4 Langkah Kaedah Rawatan Patuh Syariah ESyifaa
          </div>
          <img 
            src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1000&q=80" 
            alt="Poster 4 Langkah Gambar Servis ESyifaa" 
            style={{ width: '100%', height: 'auto', borderRadius: '8px', maxHeight: '350px', objectFit: 'cover' }}
          />
        </div>

      </div>
    </section>
  );
}
