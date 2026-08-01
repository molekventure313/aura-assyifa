'use client';

export default function MatlamatSection() {
  const goals = [
    'Mengenal pasti punca sebenar gangguan yang menyebabkan ia terus berulang.',
    'Menangani punca asal secara menyeluruh bukan sekadar simptom permukaan.',
    'Memutuskan sebarang ikatan atau serangan yang berterusan dari luar.',
    'Memperkukuhkan perlindungan diri agar gangguan tidak mudah kembali.',
    'Memberikan panduan amalan harian untuk kekal dilindungi selepas rawatan.'
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
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        
        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FDE047', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          MATLAMAT RAWATAN MENYELURUH
        </span>

        <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 800, color: '#FDE047', marginTop: '0.4rem', marginBottom: '2rem', letterSpacing: '-0.02em' }}>
          Apa Yang Ingin Dicapai Melalui Rawatan Menyeluruh ESyifaa?
        </h2>

        {/* Goal Cards (White Cards + Hitam Text + Forest Green Check) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
          {goals.map((g, idx) => (
            <div 
              key={idx}
              style={{
                background: '#FFFFFF',
                border: '2px solid #FDE047',
                borderRadius: '10px',
                padding: '1.1rem 1.35rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
              }}
            >
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#059669', color: '#FFFFFF', fontWeight: 800, fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                ✔
              </div>
              <span style={{ fontWeight: 800, fontSize: '1.025rem', color: '#0F172A' }}>
                {g}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
