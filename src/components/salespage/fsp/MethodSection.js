'use client';

export default function FspMethodSection() {
  const elements = [
    {
      icon: '📖',
      name: 'Bacaan Al-Quran',
      function: 'Kalamullah yang menjadi penawar kepada segala penyakit hati dan jasad. Bacaan ayat-ayat tertentu untuk mengusir gangguan jin, sihir dan saka.'
    },
    {
      icon: '🤲',
      name: 'Asmaul Husna Allah',
      function: 'Nama-nama Allah Yang Maha Agung digunakan sebagai medium dalam rawatan. Kuasa penyembuhan datang dari Allah, perawat hanya perantara.'
    },
    {
      icon: '🌊',
      name: 'Air & Garam Berisian',
      function: 'Air tawar dan garam yang dibacakan ayat-ayat Al-Quran. Digunakan untuk minum, mandi dan melindungi rumah daripada gangguan luar.'
    },
    {
      icon: '🌿',
      name: 'Doa-Doa Syariah',
      function: 'Doa-doa yang bersumber dari Sunnah Nabi ﷺ. Semua kaedah bersih dari syirik, bid\'ah atau sebarang amalan yang dilarang syarak.'
    },
  ];

  return (
    <section
      style={{
        background: '#0B382D',
        color: '#FFFFFF',
        padding: '4rem 1rem',
        fontFamily: 'var(--font-inter), -apple-system, sans-serif'
      }}
    >
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{
            fontSize: '0.75rem', fontWeight: 800, color: '#FDE047',
            textTransform: 'uppercase', letterSpacing: '0.12em'
          }}>
            KAEDAH RAWATAN
          </span>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
            fontWeight: 800,
            color: '#FEF3C7',
            marginTop: '0.4rem',
            marginBottom: '0.6rem',
            letterSpacing: '-0.02em',
            lineHeight: 1.3
          }}>
            Bagaimana Rawatan ESyifaa Berfungsi?
          </h2>
          <p style={{
            fontSize: '1rem',
            color: '#A7F3D0',
            maxWidth: '580px',
            margin: '0 auto',
            lineHeight: 1.7
          }}>
            4 elemen utama yang kami gunakan — semuanya bersumber dari Al-Quran dan Sunnah Nabi ﷺ.
            Mudah, telus, dan boleh dilakukan dari mana-mana.
          </p>
        </div>

        {/* Element cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.1rem',
          marginBottom: '2rem'
        }}>
          {elements.map((el, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1.5px solid rgba(253,224,71,0.25)',
              borderRadius: '14px',
              padding: '1.5rem 1.2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.6rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                <span style={{
                  fontSize: '1.7rem', lineHeight: 1, flexShrink: 0,
                  background: 'rgba(253,224,71,0.12)',
                  borderRadius: '10px', padding: '0.4rem', display: 'inline-flex'
                }}>{el.icon}</span>
                <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: '#FDE047', lineHeight: 1.35 }}>
                  {el.name}
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#D1FAE5', lineHeight: 1.65, fontWeight: 500 }}>
                {el.function}
              </p>
            </div>
          ))}
        </div>

        {/* Process strip */}
        <div style={{
          background: 'rgba(253,224,71,0.06)',
          border: '1px solid rgba(253,224,71,0.3)',
          borderLeft: '4px solid #FDE047',
          borderRadius: '12px',
          padding: '1.4rem 1.6rem',
          display: 'flex',
          gap: '1rem',
          alignItems: 'flex-start'
        }}>
          <span style={{ fontSize: '1.5rem', flexShrink: 0, marginTop: '0.1rem' }}>⚡</span>
          <div>
            <p style={{ margin: '0 0 0.3rem 0', fontSize: '0.9rem', color: '#FEF3C7', fontWeight: 800 }}>
              Cara Rawatan Dijalankan:
            </p>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#A7F3D0', lineHeight: 1.75 }}>
              Anda tidak perlu hadir secara fizikal. Selepas bayaran FPX disahkan, perawat akan terus hubungi anda melalui WhatsApp.
              Rawatan dijalankan dari jauh — badan anda akan merespon (sendawa, sengal, pening) sebagai tanda rawatan berkesan.
              Rawatan diteruskan sehingga semua tindakbalas hilang sepenuhnya.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
