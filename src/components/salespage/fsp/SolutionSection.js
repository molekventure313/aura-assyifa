'use client';

export default function FspSolutionSection() {
  const scrollToForm = (e) => {
    e.preventDefault();
    const target = document.getElementById('borang');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  const benefits = [
    { icon: '🌿', title: 'Rawatan 100% Patuh Syariah', desc: 'Menggunakan bacaan Al-Quran, Asmaul Husna dan doa-doa sahih. Tiada kaedah syubhah atau lagha.' },
    { icon: '🌐', title: 'Jarak Jauh — Tanpa Perlu Hadir', desc: 'Rawatan dijalankan sepenuhnya secara online. Anda berada di mana-mana pun boleh.' },
    { icon: '⚡', title: 'Respon Badan Menunjukkan Gangguan Nyata', desc: 'Badan akan merespon semasa rawatan — sendawa, sengal, pening. Bukti nyata gangguan ada.' },
    { icon: '💧', title: 'Air & Garam Berisian Percuma', desc: 'Air tawar, air mandian dan garam mandian berisian diberikan percuma selepas rawatan.' },
    { icon: '📋', title: 'Pemantauan 7 Hari Selepas Rawatan', desc: 'Perawat pantau perkembangan anda selama 7 hari untuk pastikan tiada gangguan berulang.' },
    { icon: '🔄', title: 'Rawatan Susulan Percuma', desc: 'Jika masih diperlukan, rawatan susulan diberikan tanpa kos tambahan.' },
    { icon: '📿', title: 'Menggunakan Asmaul Husna Allah', desc: 'Setiap rawatan menggunakan nama-nama Allah Yang Maha Agung — bersih dan berkuasa.' },
    { icon: '🛡️', title: 'Jaminan Pulang Wang 100%', desc: 'Tiada perubahan langsung selepas rawatan? Kami refund penuh tanpa soal.' },
    { icon: '🤝', title: 'Bayar Terus, Rawatan Terus', desc: 'Bayar RM50 sahaja — perawat terus dihubungkan. Tiada proses panjang, tiada tunggu lama.' },
    { icon: '🔒', title: 'Privasi Sepenuhnya Terjaga', desc: 'Semua maklumat pesakit adalah sulit. Kami amanah dengan kepercayaan anda.' },
  ];

  return (
    <section
      style={{
        background: '#FFFFFF',
        color: '#0F172A',
        padding: '4rem 1rem',
        fontFamily: 'var(--font-inter), -apple-system, sans-serif'
      }}
    >
      <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>

        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
          PENYELESAIAN
        </span>

        {/* Part 1: Introduce Aura Assyifa */}
        <h2 style={{
          fontSize: 'clamp(1.5rem, 3.5vw, 2.3rem)',
          fontWeight: 800,
          color: '#042E23',
          marginTop: '0.4rem',
          marginBottom: '0.8rem',
          letterSpacing: '-0.02em',
          lineHeight: 1.3
        }}>
          Aura Assyifa — Ikhtiar Terbaik Untuk Selesaikan Gangguan Jin, Sihir, Saka & Penyakit Misteri
        </h2>

        <p style={{
          fontSize: '1.05rem',
          color: '#4B5563',
          maxWidth: '720px',
          margin: '0 auto 1.5rem auto',
          lineHeight: 1.75
        }}>
          Selepas rawatan Aura Assyifa, ramai pesakit melaporkan perasaan ringan, tidur lebih lena,
          ibadah lebih khusyuk, rumahtangga lebih harmoni dan perniagaan mula bergerak semula.
          <strong style={{ color: '#047857' }}> Ini bukan janji — ini pengalaman nyata pesakit kami.</strong>
        </p>

        {/* Aura Assyifa brand badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.75rem',
          background: 'linear-gradient(135deg, #042E23 0%, #065F46 100%)',
          border: '2px solid #FDE047',
          borderRadius: '16px',
          padding: '1rem 2rem',
          marginBottom: '3rem',
          boxShadow: '0 8px 24px rgba(4,46,35,0.25)'
        }}>
          <span style={{ fontSize: '2rem' }}>🌿</span>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#FDE047' }}>Aura Assyifa</div>
            <div style={{ fontSize: '0.78rem', color: '#A7F3D0', fontWeight: 600 }}>Rawatan Jarak Jauh Islam · Patuh Syariah</div>
          </div>
        </div>

        {/* Part 2: 10 Benefits */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            MANFAAT RAWATAN
          </span>
          <h3 style={{
            fontSize: 'clamp(1.3rem, 3vw, 1.9rem)',
            fontWeight: 800,
            color: '#042E23',
            marginTop: '0.4rem',
            marginBottom: '0.5rem'
          }}>
            10 Manfaat Rawatan Aura Assyifa Untuk Bantu Anda Pulih
          </h3>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
          gap: '1rem',
          textAlign: 'left',
          marginBottom: '2.5rem'
        }}>
          {benefits.map((b, i) => (
            <div key={i} style={{
              background: '#F8FAFC',
              border: '1.5px solid #E2E8F0',
              borderRadius: '12px',
              padding: '1.2rem',
              display: 'flex',
              gap: '0.85rem',
              alignItems: 'flex-start'
            }}>
              <span style={{
                fontSize: '1.5rem', flexShrink: 0,
                background: '#ECFDF5', borderRadius: '10px',
                padding: '0.4rem', display: 'inline-flex', lineHeight: 1
              }}>{b.icon}</span>
              <div>
                <p style={{ margin: '0 0 0.2rem 0', fontWeight: 800, fontSize: '0.9rem', color: '#042E23' }}>{b.title}</p>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#4B5563', lineHeight: 1.55 }}>{b.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#borang"
          onClick={scrollToForm}
          style={{
            display: 'inline-block',
            padding: '1.1rem 2.4rem',
            fontSize: '1.1rem',
            fontWeight: 800,
            color: '#042E23',
            background: 'linear-gradient(180deg, #FDE047 0%, #EAB308 100%)',
            borderRadius: '50px',
            textDecoration: 'none',
            boxShadow: '0 10px 25px rgba(234,179,8,0.4)',
            border: '2px solid #FEF08A'
          }}
        >
          💳 Bayar RM50 & Mulakan Rawatan Sekarang
        </a>

      </div>
    </section>
  );
}
