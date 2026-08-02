'use client';

export default function ProblemSection() {
  const problems = [
    {
      title: 'Hubungan Rumah Tangga Retak & Sering Bergaduh',
      desc: 'Emosi cepat panas dengan pasangan, hilang rasa kasih sayang dan perkara kecil kerap menjadi punca pertengkaran hebat.',
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Pintu Rezeki & Perniagaan Tersekat',
      desc: 'Berniaga atau bekerja keras tetapi pendapatan sentiasa tidak mencukupi, pelanggan lari atau perniagaan merosot secara pelik.',
      img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Sakit Fizikal Berterusan Tanpa Punca Perubatan',
      desc: 'Kesakitan badan yang mencucuk, sengal belikat terutamanya selepas Asar walaupun doktor sahkan semua keputusan ujian normal.',
      img: '/images/sihir/sihir_hero.jpg'
    },
    {
      title: 'Badan Sentiasa Lesu & Sukar Tidur Malam',
      desc: 'Terjaga tiba-tiba pada waktu malam dalam keadaan cemas, dada berdebar-debar serta kerap mendapat mimpi buruk menakutkan.',
      img: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Perubahan Perangai & Emosi Tidak Terkawal',
      desc: 'Mudah marah, cemas melampau tanpa sebab, rasa sedih mendalam atau tiba-tiba rasa ingin menyendiri dari keluarga.',
      img: 'https://images.unsplash.com/photo-1604079628040-94301bb21b91?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Suasana Rumah Terasa Panas & Gangguan Misteri',
      desc: 'Kediaman berasa tidak selesa, ahli keluarga bergantian sakit atau terasa diperhatikan oleh entiti asing di dalam rumah.',
      img: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=600&q=80'
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
          TANDA-TANDA TERKENA SIHIR
        </span>
        
        <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 800, color: '#FDE047', marginTop: '0.4rem', marginBottom: '0.8rem', letterSpacing: '-0.02em' }}>
          Adakah Anda Mengalami Masalah Dibawah Ini?
        </h2>

        <p style={{ fontSize: '1rem', color: '#FFFFFF', marginBottom: '2.5rem', maxWidth: '750px', margin: '0 auto 2.5rem auto', lineHeight: 1.6 }}>
          Sihir boleh hadir dalam pelbagai bentuk dan memusnahkan kesihatan fizikal, emosi serta keharmonian rumah tangga dan keluarga anda.
        </p>

        {/* 6 Masalah Utama Grid */}
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
                  <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0F172A', lineHeight: 1.35 }}>
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
