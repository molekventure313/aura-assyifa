'use client';

export default function ProblemSection() {
  const problems = [
    {
      title: 'Penyakit Berturun-Temurun',
      desc: 'Penyakit misteri yang sama dialami oleh ibu bapa, datuk nenek dan kini anda pula.',
      img: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Ahli Keluarga Kerap Dirasuk',
      desc: 'Ada dalam kalangan ahli keluarga yang mudah dirasuk atau mengalami perubahan perangai yang ketara.',
      img: 'https://images.unsplash.com/photo-1604079628040-94301bb21b91?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Rezeki Keluarga Tersekat',
      desc: 'Sudah bertahun-tahun berusaha keras tetapi kehidupan keluarga tidak pernah benar-benar maju.',
      img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Perselisihan Dalam Keluarga',
      desc: 'Ahli keluarga sering bergaduh sesama sendiri, hubungan adik-beradik renggang tanpa sebab yang jelas.',
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Mimpi Pelik Berulang',
      desc: 'Mimpi dikunjungi oleh rupa orang yang sudah meninggal atau entiti asing yang datang berulang kali.',
      img: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80'
    }
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
          Adakah Keluarga Anda Mengalami Tanda-Tanda Ini?
        </h2>

        <p style={{ fontSize: '1rem', color: '#FFFFFF', marginBottom: '2.5rem', maxWidth: '750px', margin: '0 auto 2.5rem auto', lineHeight: 1.6 }}>
          Gangguan saka sering tidak disedari kerana ia berlaku secara turun-temurun dan dianggap perkara biasa dalam keluarga.
        </p>

        {/* 5 Masalah Utama Grid (White Cards + Black Text) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {problems.map((p, idx) => (
            <div 
              key={idx}
              style={{
                background: '#FFFFFF',
                border: '2px solid #FDE047',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'left'
              }}
            >
              <img 
                src={p.img} 
                alt={p.title}
                style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block' }}
              />
              <div style={{ padding: '1.1rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 800, fontSize: '1rem', color: '#0F172A', lineHeight: 1.3 }}>
                    {p.title}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#374151', lineHeight: 1.5 }}>
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
