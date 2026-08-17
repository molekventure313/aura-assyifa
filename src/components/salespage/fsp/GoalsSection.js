'use client';

export default function FspGoalsSection() {
  const goals = [
    { icon: '😌', title: 'Tidur Lebih Lena & Mimpi Buruk Hilang', desc: 'Pesakit melaporkan kualiti tidur bertambah baik dan mimpi ngeri berhenti selepas rawatan.' },
    { icon: '🙏', title: 'Ibadah Lebih Khusyuk & Fokus', desc: 'Rasa dekat dengan Allah, solat terasa lebih bermakna, dan semangat untuk beribadah kembali.' },
    { icon: '💑', title: 'Hubungan Rumahtangga Kembali Harmoni', desc: 'Pasangan kembali mesra, perbalahan berkurangan, dan rumah terasa lebih tenang dan bahagia.' },
    { icon: '💼', title: 'Perniagaan & Rezeki Mula Bergerak', desc: 'Selepas rawatan, ramai pesakit melaporkan pintu rezeki mula terbuka dan pelanggan mula datang semula.' },
    { icon: '💪', title: 'Badan Terasa Ringan & Sihat Semula', desc: 'Kesakitan kronik tanpa punca berkurangan, tenaga bertambah, dan badan terasa lebih segar.' },
  ];

  return (
    <section
      style={{
        background: '#042E23',
        color: '#FFFFFF',
        padding: '4rem 1rem',
        fontFamily: 'var(--font-inter), -apple-system, sans-serif'
      }}
    >
      <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>

        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FDE047', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          HASIL YANG DIJANGKAKAN
        </span>

        <h2 style={{
          fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
          fontWeight: 800,
          color: '#FDE047',
          marginTop: '0.4rem',
          marginBottom: '0.5rem',
          letterSpacing: '-0.02em'
        }}>
          5 Perubahan Yang Pesakit Kami Rasai Selepas Rawatan ESyifaa
        </h2>
        <p style={{
          fontSize: '1rem', color: '#A7F3D0', marginBottom: '2.5rem',
          maxWidth: '620px', margin: '0 auto 2.5rem auto', lineHeight: 1.7
        }}>
          Ini bukan janji kosong. Ini pengalaman sebenar yang dikongsi oleh pesakit-pesakit kami — dengan izin Allah.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
          {goals.map((g, idx) => (
            <div
              key={idx}
              style={{
                background: '#FFFFFF',
                border: '2px solid #FDE047',
                borderRadius: '12px',
                padding: '1.2rem 1.4rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
              }}
            >
              <div style={{
                width: '48px', height: '48px', borderRadius: '12px',
                background: '#ECFDF5', color: '#047857',
                fontWeight: 800, fontSize: '1.5rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0
              }}>
                {g.icon}
              </div>
              <div>
                <p style={{ margin: '0 0 0.2rem 0', fontWeight: 800, fontSize: '1rem', color: '#042E23' }}>{g.title}</p>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#374151', lineHeight: 1.55 }}>{g.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
