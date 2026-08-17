'use client';

export default function FspFearsSection() {
  const fears = [
    {
      icon: '💔',
      title: 'Rumahtangga Boleh Hancur',
      desc: 'Sihir pemisah boleh membuatkan pasangan berubah hati tanpa sebab. Pertengkaran tak berkesudahan. Jika tidak dirawat, ikatan perkahwinan boleh terputus.'
    },
    {
      icon: '📉',
      title: 'Perniagaan Terus Merudum',
      desc: 'Rezeki yang diikat boleh menjadikan perniagaan semakin sunyi walaupun dah buat seribu cara. Peluang demi peluang berlalu begitu sahaja.'
    },
    {
      icon: '😰',
      title: 'Kesihatan Semakin Merosot',
      desc: 'Penyakit misteri yang tidak dirawat dari akar umbi boleh bertambah teruk. Doktor pun tak jumpa punca. Badan makin lemah, hidup makin susah.'
    },
    {
      icon: '🙏',
      title: 'Ibadah Terganggu & Terputus',
      desc: 'Gangguan jin boleh menyebabkan malas solat, sukar khusyuk, rasa jauh dari Allah. Lama-kelamaan, iman semakin tipis tanpa anda sedar.'
    },
    {
      icon: '😔',
      title: 'Mental & Emosi Terhakis',
      desc: 'Tekanan berterusan, anxiety, susah tidur, mimpi ngeri — semua ini boleh menyebabkan kemurungan yang serius jika dibiarkan tanpa rawatan.'
    },
    {
      icon: '👨‍👩‍👧',
      title: 'Kesan Pada Anak & Keluarga',
      desc: 'Saka warisan dan gangguan jin boleh merebak kepada ahli keluarga lain terutama anak-anak yang lebih mudah terdedah kepada gangguan.'
    },
  ];

  return (
    <section
      style={{
        background: 'linear-gradient(180deg, #0B382D 0%, #1A0A0A 100%)',
        color: '#FFFFFF',
        padding: '4rem 1rem',
        fontFamily: 'var(--font-inter), -apple-system, sans-serif'
      }}
    >
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{
            fontSize: '0.75rem', fontWeight: 800, color: '#F87171',
            textTransform: 'uppercase', letterSpacing: '0.12em'
          }}>
            ⚠️ AMARAN PENTING
          </span>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3.5vw, 2.3rem)',
            fontWeight: 800,
            color: '#FEF3C7',
            marginTop: '0.4rem',
            marginBottom: '0.8rem',
            letterSpacing: '-0.02em',
            lineHeight: 1.3
          }}>
            Jika Tidak Dirawat Segera, Perkara Ini Boleh Jadi Semakin Teruk...
          </h2>
          <p style={{
            fontSize: '1rem',
            color: '#FCA5A5',
            maxWidth: '680px',
            margin: '0 auto',
            lineHeight: 1.7
          }}>
            Ramai yang tangguh-tangguhkan kerana fikir ia akan baik sendiri.
            Tapi pengalaman pesakit kami membuktikan — <strong style={{ color: '#FDE047' }}>semakin lama ditangguh, semakin teruk akibatnya.</strong>
          </p>
        </div>

        {/* Fear Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.2rem',
          marginBottom: '2.5rem'
        }}>
          {fears.map((f, i) => (
            <div key={i} style={{
              background: 'rgba(248, 113, 113, 0.08)',
              border: '1.5px solid rgba(248, 113, 113, 0.3)',
              borderRadius: '14px',
              padding: '1.4rem 1.2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                <span style={{
                  fontSize: '1.6rem', lineHeight: 1, flexShrink: 0,
                  background: 'rgba(248,113,113,0.15)',
                  borderRadius: '10px', padding: '0.4rem', display: 'inline-flex'
                }}>{f.icon}</span>
                <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: '#FCA5A5', lineHeight: 1.35 }}>
                  {f.title}
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#FEF3C7', lineHeight: 1.65, fontWeight: 500 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Urgency callout */}
        <div style={{
          background: 'rgba(253,224,71,0.08)',
          border: '1px solid rgba(253,224,71,0.4)',
          borderLeft: '4px solid #FDE047',
          borderRadius: '12px',
          padding: '1.4rem 1.6rem',
          display: 'flex',
          gap: '1rem',
          alignItems: 'flex-start'
        }}>
          <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>🕌</span>
          <div>
            <p style={{
              margin: '0 0 0.4rem 0',
              fontSize: '0.95rem',
              color: '#FEF3C7',
              lineHeight: 1.75,
              fontWeight: 600
            }}>
              Jangan tunggu sehingga keadaan bertambah parah. Setiap hari yang berlalu tanpa rawatan adalah peluang gangguan itu mengakar lebih dalam.
            </p>
            <p style={{ margin: 0, fontSize: '0.82rem', color: '#FDE047', fontWeight: 700 }}>
              Ambil langkah pertama hari ini — diagnos percuma, tiada komitmen.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
