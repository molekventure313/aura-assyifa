'use client';

export default function ProblemSection() {
  const problems = [
    {
      title: 'Gangguan Jin',
      desc: 'Diganggu makhluk halus, terasa dirasuk, ada kehadiran asing atau mimpi buruk berulang.',
      img: '/images/Homepage/Gemini_Generated_Image_l71qqbl71qqbl71q.jfif',
      emoji: '👁️'
    },
    {
      title: 'Sihir',
      desc: 'Terkena sihir penghalang, pemisah rumah tangga, atau sihir yang menyebabkan kesakitan kronik.',
      img: '/images/Homepage/Gemini_Generated_Image_rfk0wirfk0wirfk0.jfif',
      emoji: '🪄'
    },
    {
      title: 'Saka',
      desc: 'Warisan gangguan turun-temurun yang memberi kesan kepada kesihatan, rezeki dan perhubungan.',
      img: '/images/Homepage/Gemini_Generated_Image_ys0b2bys0b2bys0b.jfif',
      emoji: '🔗'
    },
    {
      title: 'Penyakit Misteri',
      desc: 'Sakit badan yang tidak ditemui punca oleh doktor, terus berulang atau semakin teruk.',
      img: '/images/Homepage/Gemini_Generated_Image_zeydo8zeydo8zeyd.jfif',
      emoji: '🩺'
    },
    {
      title: 'Perniagaan Tersekat',
      desc: 'Rezeki terhalang, pelanggan lari, usaha perniagaan tidak maju walaupun sudah berusaha keras.',
      img: '/images/Homepage/Gemini_Generated_Image_qz37oqqz37oqqz37.jfif',
      emoji: '🚧'
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
          KENAL PASTI SIMPTOM
        </span>
        
        <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 800, color: '#FDE047', marginTop: '0.4rem', marginBottom: '0.8rem', letterSpacing: '-0.02em' }}>
          Adakah Anda Sedang Mengalami Salah Satu Daripada Masalah Ini?
        </h2>

        <p style={{ fontSize: '1rem', color: '#FFFFFF', marginBottom: '2.5rem', maxWidth: '750px', margin: '0 auto 2.5rem auto', lineHeight: 1.6 }}>
          Ramai pesakit datang mendapatkan rawatan selepas mengalami gangguan yang berlarutan sehingga mengganggu emosi, ibadah dan kehidupan seharian.
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
                style={{ width: '100%', height: '200px', objectFit: 'cover', objectPosition: 'center 20%', display: 'block' }}
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
