'use client';

export default function ProblemSection() {
  const problems = [
    {
      title: 'Tidur Selalu Terganggu / Terkejut',
      desc: 'Sering terjaga tiba-tiba pada waktu malam dengan rasa cemas, dada berdebar atau mimpi yang menakutkan.',
      img: '/images/sihir/sihir_hero.jpg'
    },
    {
      title: 'Sakit Selepas Asar (Bahagian Belakang)',
      desc: 'Badan mula berasa berat, lenguh dan sakit mencucuk terutamanya di bahagian belakang dan bahu sebaik waktu Asar menjelang.',
      img: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Sakit Kepala Bukan Darah Tinggi / Migrain',
      desc: 'Kesakitan dan cengkaman di kepala yang berterusan walaupun sudah makan ubat perubatan biasa.',
      img: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Rasa Ada Sesuatu Merayap Dalam Badan',
      desc: 'Sensasi pelik seolah-olah ada benda atau entiti bergerak di bawah kulit, otot atau bahagian anggota tertentu.',
      img: 'https://images.unsplash.com/photo-1604079628040-94301bb21b91?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Sakit Tanpa Punca Perubatan',
      desc: 'Pemeriksaan doktor dan ujian klinikal di hospital mengesahkan badan sihat, tetapi kesakitan fizikal tetap dirasai.',
      img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Panas Badan Beralih-Alih',
      desc: 'Sensasi bahang panas yang berpindah dari satu bahagian badan ke bahagian lain tanpa sebarang demam fizikal.',
      img: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Kerap Bergaduh Suami Isteri',
      desc: 'Hubungan rumah tangga mula dingin, emosi cepat meluap-luap dan perkara kecil kerap menjadi punca pergaduhan besar.',
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80'
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
          Adakah Anda Mengalami Tanda-Tanda Ini?
        </h2>

        <p style={{ fontSize: '1rem', color: '#FFFFFF', marginBottom: '2.5rem', maxWidth: '750px', margin: '0 auto 2.5rem auto', lineHeight: 1.6 }}>
          Sihir boleh hadir dalam pelbagai bentuk dan menjejaskan fizikal, emosi serta keharmonian rumah tangga anda.
        </p>

        {/* 7 Masalah Utama Grid */}
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
