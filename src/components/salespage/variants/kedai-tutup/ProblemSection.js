'use client';

export default function ProblemSection() {
  const problems = [
    {
      title: 'Pelanggan Tiba-Tiba Lari',
      desc: 'Pelanggan setia yang sering datang tiba-tiba berhenti tanpa memberi sebarang alasan yang munasabah.',
      img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
      emoji: '🏃'
    },
    {
      title: 'Rezeki Tidak Maju',
      desc: 'Perniagaan berjalan tetapi pendapatan tidak pernah mencukupi, selalu ada sahaja perbelanjaan luar jangka.',
      img: 'https://images.unsplash.com/photo-1604079628040-94301bb21b91?auto=format&fit=crop&w=600&q=80',
      emoji: '📉'
    },
    {
      title: 'Persekitaran Premis Tidak Selesa',
      desc: 'Pekerja atau anda sendiri sering rasa tidak selesa, mudah sakit atau ada perasaan tidak kena di premis perniagaan.',
      img: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=600&q=80',
      emoji: '🏚️'
    },
    {
      title: 'Rakan Kongsi Bermasalah',
      desc: 'Perselisihan faham dengan rakan kongsi yang tidak dapat diselesaikan atau pengkhianatan yang berlaku secara tiba-tiba.',
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      emoji: '🤝'
    },
    {
      title: 'Stok Selalu Rosak atau Hilang',
      desc: 'Barangan atau stok perniagaan sering rosak, hilang atau mengalami kerosakan yang pelik tanpa penjelasan yang logik.',
      img: 'https://images.unsplash.com/photo-1499209974431-9dac3ada00d7?auto=format&fit=crop&w=600&q=80',
      emoji: '📦'
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
          TANDA-TANDA GANGGUAN PERNIAGAAN
        </span>
        
        <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 800, color: '#FDE047', marginTop: '0.4rem', marginBottom: '0.8rem', letterSpacing: '-0.02em' }}>
          Adakah Perniagaan Anda Mengalami Tanda-Tanda Ini?
        </h2>

        <p style={{ fontSize: '1rem', color: '#FFFFFF', marginBottom: '2.5rem', maxWidth: '750px', margin: '0 auto 2.5rem auto', lineHeight: 1.6 }}>
          Gangguan mistik pada perniagaan boleh berlaku dalam pelbagai cara dan sering kali sukar dikesan tanpa penilaian yang teliti.
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
