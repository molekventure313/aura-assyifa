'use client';

export default function FspProblemSection() {
  const problems = [
    {
      emoji: '👁️',
      title: 'Gangguan Jin',
      desc: 'Terasa ada kehadiran asing, diganggu ketika tidur, mimpi buruk berulang-ulang, atau rasa dirasuk.',
      img: '/images/Homepage/Gemini_Generated_Image_l71qqbl71qqbl71q.jpg',
    },
    {
      emoji: '🪄',
      title: 'Sihir & Santau',
      desc: 'Terkena sihir penghalang rezeki, pemisah rumah tangga, atau santau yang menyebabkan sakit kronik.',
      img: '/images/Homepage/Gemini_Generated_Image_rfk0wirfk0wirfk0.jpg',
    },
    {
      emoji: '🔗',
      title: 'Saka Warisan',
      desc: 'Gangguan turun-temurun dari nenek moyang yang memberi kesan kepada kesihatan, rezeki dan hubungan.',
      img: '/images/Homepage/Gemini_Generated_Image_ys0b2bys0b2bys0b.jpg',
    },
    {
      emoji: '🩺',
      title: 'Penyakit Misteri',
      desc: 'Sakit badan yang tidak ditemui punca oleh doktor, berulang-ulang atau semakin teruk walaupun dah berubat.',
      img: '/images/Homepage/Gemini_Generated_Image_zeydo8zeydo8zeyd.jpg',
    },
    {
      emoji: '🚧',
      title: 'Perniagaan Tersekat',
      desc: 'Rezeki terhalang, pelanggan lari tiba-tiba, usaha perniagaan tidak maju walaupun dah berusaha keras.',
      img: '/images/Homepage/Gemini_Generated_Image_qz37oqqz37oqqz37.jpg',
    },
    {
      emoji: '💔',
      title: 'Hubungan Terjejas',
      desc: 'Rumahtangga sentiasa bergaduh tanpa sebab, pasangan berubah sikap secara tiba-tiba, atau hubungan dikhianati.',
      img: '/images/Homepage/Gemini_Generated_Image_l71qqbl71qqbl71q.jpg',
    },
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
      <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>

        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FDE047', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          KENAL PASTI SIMPTOM ANDA
        </span>

        <h2 style={{
          fontSize: 'clamp(1.5rem, 3.5vw, 2.3rem)',
          fontWeight: 800,
          color: '#FDE047',
          marginTop: '0.4rem',
          marginBottom: '0.8rem',
          letterSpacing: '-0.02em'
        }}>
          Sila Beri Perhatian Jika Anda Sedang Alami Salah Satu Daripada Ini...
        </h2>

        <p style={{
          fontSize: '1rem',
          color: '#FFFFFF',
          marginBottom: '2.5rem',
          maxWidth: '760px',
          margin: '0 auto 2.5rem auto',
          lineHeight: 1.7,
          opacity: 0.9
        }}>
          Ramai yang cuba buat-buat tak kisah atau anggap ini semua perasaan semata-mata.
          Tapi perkara ini nyata, dan ianya <strong style={{ color: '#FDE047' }}>boleh selesai dengan izin Allah.</strong>
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
          gap: '1.5rem'
        }}>
          {problems.map((p, idx) => (
            <div
              key={idx}
              style={{
                background: '#FFFFFF',
                border: '2px solid #FDE047',
                borderRadius: '14px',
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
                style={{ width: '100%', height: '180px', objectFit: 'cover', objectPosition: 'center 20%', display: 'block' }}
              />
              <div style={{ padding: '1.1rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>{p.emoji}</span>
                  <span style={{ fontWeight: 800, fontSize: '1rem', color: '#0F172A', lineHeight: 1.3 }}>{p.title}</span>
                </div>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#374151', lineHeight: 1.55 }}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
