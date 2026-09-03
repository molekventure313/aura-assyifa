'use client';

export default function FearsSection() {
  const points = [
    {
      icon: '🌐',
      title: 'Rawatan Sepenuhnya Online',
      desc: 'Tanpa video call. Tanpa perlu hadir diri. Cukup anda berada di kediaman sendiri dan fokus sewaktu rawatan dijalankan.'
    },
    {
      icon: '⚡',
      title: 'Badan Anda Akan Merespon',
      desc: 'Jika ada gangguan, badan anda akan terus merespon semasa rawatan — sendawa, sengal, muntah-muntah, pening atau loya. Kami akan rawat sehingga semua tindakbalas itu hilang sepenuhnya.'
    },
    {
      icon: '💧',
      title: 'Air & Garam Berisian Percuma',
      desc: 'Air tawar, air mandian dan garam mandian berisian akan diberikan secara percuma selepas rawatan selesai — untuk digunakan sebagai penerusan ikhtiar di rumah.'
    },
    {
      icon: '📋',
      title: 'Pemantauan 3 Hari Selepas Rawatan',
      desc: 'Perawat kami akan monitor perkembangan anda selama 3 hari selepas rawatan untuk memastikan anda benar-benar sembuh dan tiada gangguan berulang.'
    },
    {
      icon: '📿',
      title: 'Menggunakan Asmaul Husna Allah',
      desc: 'Rawatan dijalankan sepenuhnya menggunakan Asmaul Husna Allah Yang Maha Agung — bersih, patuh syariah, dan berlandaskan keyakinan penuh kepada kekuasaan Allah SWT.'
    }
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
            Bagaimana Proses Rawatan Aura Assyifa Dijalankan?
          </h2>
          <p style={{
            fontSize: '1rem',
            color: '#A7F3D0',
            maxWidth: '580px',
            margin: '0 auto',
            lineHeight: 1.7
          }}>
            Mudah, telus, dan boleh dilakukan dari mana-mana — dengan izin Allah.
          </p>
        </div>

        {/* Points grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.1rem',
          marginBottom: '2rem'
        }}>
          {points.map((p, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1.5px solid rgba(253,224,71,0.25)',
              borderRadius: '14px',
              padding: '1.4rem 1.2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                <span style={{
                  fontSize: '1.6rem',
                  lineHeight: 1,
                  flexShrink: 0,
                  background: 'rgba(253,224,71,0.12)',
                  borderRadius: '10px',
                  padding: '0.4rem',
                  display: 'inline-flex'
                }}>{p.icon}</span>
                <h3 style={{
                  margin: 0,
                  fontSize: '0.95rem',
                  fontWeight: 800,
                  color: '#FDE047',
                  lineHeight: 1.35
                }}>{p.title}</h3>
              </div>
              <p style={{
                margin: 0,
                fontSize: '0.85rem',
                color: '#D1FAE5',
                lineHeight: 1.65,
                fontWeight: 500
              }}>{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Footnote / Keyakinan box */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(253,224,71,0.08) 0%, rgba(253,224,71,0.03) 100%)',
          border: '1px solid rgba(253,224,71,0.35)',
          borderLeft: '4px solid #FDE047',
          borderRadius: '12px',
          padding: '1.4rem 1.6rem',
          display: 'flex',
          gap: '1rem',
          alignItems: 'flex-start'
        }}>
          <span style={{ fontSize: '1.5rem', flexShrink: 0, marginTop: '0.1rem' }}>🕌</span>
          <div>
            <p style={{
              margin: '0 0 0.4rem 0',
              fontSize: '0.92rem',
              color: '#FEF3C7',
              lineHeight: 1.75,
              fontWeight: 500,
              fontStyle: 'italic'
            }}>
              "Jika sihir boleh dihantar jarak jauh, begitu juga rawatan. Maka jangan remehkan kuasa Allah.
              Allah lebih berkuasa dari segalanya. Yakin, Allah Maha Menyembuhkan."
            </p>
            <p style={{
              margin: 0,
              fontSize: '0.8rem',
              color: '#6EE7B7',
              fontWeight: 600
            }}>
              — Perawat hanya ikhtiar menggunakan Asma' Allah. Kesembuhan hanya dari Allah SWT.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
