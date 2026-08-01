'use client';

export default function ProblemSection() {
  const problems = [
    {
      title: 'Sihir Penghalang Zuriat',
      desc: 'Sihir khusus yang direka untuk menghalang pasangan daripada mendapat cahaya mata.',
      img: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=600&q=80',
      emoji: '🪄'
    },
    {
      title: 'Saka Yang Mempengaruhi Keturunan',
      desc: 'Ikatan saka yang menyekat keberkatan dan memberi kesan kepada kesuburan dalam keluarga.',
      img: 'https://images.unsplash.com/photo-1527489377706-5bf97e608852?auto=format&fit=crop&w=600&q=80',
      emoji: '🔗'
    },
    {
      title: 'Sihir Pemisah Rumah Tangga',
      desc: 'Sihir yang menjejaskan keharmonian rumah tangga dan mengganggu hubungan antara suami isteri.',
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      emoji: '💔'
    },
    {
      title: 'Gangguan Semasa Hamil',
      desc: 'Ada wanita yang mengalami gangguan semasa hamil yang menyebabkan keguguran berulang.',
      img: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80',
      emoji: '👶'
    },
    {
      title: 'Tekanan Emosi Akibat Gangguan',
      desc: 'Gangguan mistik boleh menyebabkan tekanan emosi yang teruk dan memberi kesan kepada kesihatan keseluruhan pasangan.',
      img: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80',
      emoji: '🧠'
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
          KEMUNGKINAN PUNCA GANGGUAN
        </span>
        
        <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 800, color: '#FDE047', marginTop: '0.4rem', marginBottom: '0.8rem', letterSpacing: '-0.02em' }}>
          Adakah Ini Yang Menyekat Zuriat Anda?
        </h2>

        <p style={{ fontSize: '1rem', color: '#FFFFFF', marginBottom: '2.5rem', maxWidth: '750px', margin: '0 auto 2.5rem auto', lineHeight: 1.6 }}>
          Selain faktor perubatan, terdapat beberapa kemungkinan gangguan mistik yang boleh menyekat rezeki zuriat pasangan.
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
                  <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>{p.emoji}</span>
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
