'use client';

export default function ServiceSection() {
  const kelebihanList = [
    "Rawatan secara jarak jauh",
    "Tak perlu datang ke pusat rawatan",
    "Menggunakan bacaan ayat al-Quran",
    "Boleh dilakukan di mana saja",
    "Sesuai untuk lelaki dan wanita",
    "Disediakan panduan amalan selepas rawatan",
    "Konsultasi sebelum rawatan bermula",
    "Fokus membantu anda mendapatkan kembali ketenangan hidup"
  ];

  return (
    <section className="section-aura-assyifa bg-green-blend-aura-assyifa" id="penyelesaian">
      <div className="container" style={{ textAlign: 'center' }}>
        <span className="badge-aura-assyifa">💡 SOLUSI RAWATAN ISLAM</span>

        <h2 className="section-title-aura-assyifa" style={{ textAlign: 'center' }}>
          Rawatan Jarak Jauh Untuk Membantu Anda Kembali Lebih Tenang
        </h2>

        <p className="section-desc-aura-assyifa" style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 2.5rem auto' }}>
          Rawatan dilakukan menggunakan bacaan ayat-ayat al-Quran dan doa yang bersesuaian. Tujuannya adalah untuk membantu anda mendapatkan kembali ketenangan, memperbaiki rutin harian dan memberi sokongan rohani sepanjang proses rawatan.
        </p>

        {/* Kelebihan Checklist Grid Container */}
        <div 
          style={{ 
            maxWidth: '840px', 
            margin: '0 auto', 
            padding: '2.5rem 2rem', 
            background: 'var(--yellow-box-bg)',
            borderRadius: '24px',
            border: '3px solid var(--yellow-box-border)',
            boxShadow: '0 20px 45px rgba(0,0,0,0.3)',
            color: 'var(--font-dark-green)'
          }}
        >
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--font-dark-green)', marginBottom: '1.75rem', textAlign: 'center' }}>
            🌟 KELEBIHAN RAWATAN Aura Assyifa
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', textAlign: 'center' }}>
            {kelebihanList.map((item, idx) => (
              <div 
                key={idx} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  gap: '0.75rem', 
                  padding: '0.9rem 1.1rem', 
                  background: '#FFFFFF', 
                  borderRadius: '14px', 
                  border: '1.5px solid var(--yellow-box-border)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                }}
              >
                <span style={{ fontSize: '1.25rem', color: '#059669', flexShrink: 0, fontWeight: 800 }}>✅</span>
                <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--font-dark-green)', textAlign: 'center' }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

