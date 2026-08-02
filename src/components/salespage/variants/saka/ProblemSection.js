'use client';

export default function ProblemSection() {
  const problems = [
    'perawat sebelum ni cakap saka susah buang',
    'banyak kali berubat tapi saka tak hilang',
    'rasa ada sesuatu yang mengikut tapi bukan manusia',
    'anak dara yang ada saka akan jadi anak dara tua (sekat jodoh)',
    'kalau berjaya kahwin sekalipun, saka akan sekat zuriat (banyak gugur)',
    'kebiasaannya keluarga yang ada saka akan selalu berlaku pergaduhan'
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
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        
        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FDE047', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          TANDA-TANDA GANGGUAN SAKA
        </span>
        
        <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 800, color: '#FDE047', marginTop: '0.4rem', marginBottom: '0.8rem', letterSpacing: '-0.02em' }}>
          Adakah Anda Mengalami Masalah Dibawah Ini?
        </h2>

        <p style={{ fontSize: '1rem', color: '#FFFFFF', marginBottom: '2.5rem', maxWidth: '750px', margin: '0 auto 2.5rem auto', lineHeight: 1.6 }}>
          Gangguan saka sering tidak disedari kerana ia berlaku secara turun-temurun dan memberi kesan berpanjangan kepada kehidupan serta keluarga.
        </p>

        {/* 6 Problem List (Cards without images) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', textAlign: 'left' }}>
          {problems.map((p, idx) => (
            <div 
              key={idx}
              style={{
                background: '#FFFFFF',
                border: '2px solid #FDE047',
                borderRadius: '12px',
                padding: '1.25rem 1.4rem',
                boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.85rem'
              }}
            >
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#DC2626', color: '#FFFFFF', fontWeight: 800, fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                ✖
              </div>
              <span style={{ fontWeight: 700, fontSize: '0.975rem', color: '#0F172A', lineHeight: 1.5 }}>
                {p}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
