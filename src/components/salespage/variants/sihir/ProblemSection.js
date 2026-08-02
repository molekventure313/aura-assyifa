'use client';

export default function ProblemSection() {
  const problems = [
    {
      title: 'Hubungan Rumah Tangga Retak & Sering Bergaduh',
      desc: 'Emosi cepat panas dengan pasangan, hilang rasa kasih sayang dan perkara kecil kerap menjadi punca pertengkaran hebat.'
    },
    {
      title: 'Pintu Rezeki & Perniagaan Tersekat',
      desc: 'Berniaga atau bekerja keras tetapi pendapatan sentiasa tidak mencukupi, pelanggan lari atau perniagaan merosot secara pelik.'
    },
    {
      title: 'Sakit Fizikal Berterusan Tanpa Punca Perubatan',
      desc: 'Kesakitan badan yang mencucuk, sengal belikat terutamanya selepas Asar walaupun doktor sahkan semua keputusan ujian normal.'
    },
    {
      title: 'Badan Sentiasa Lesu & Sukar Tidur Malam',
      desc: 'Terjaga tiba-tiba pada waktu malam dalam keadaan cemas, dada berdebar-debar serta kerap mendapat mimpi buruk menakutkan.'
    },
    {
      title: 'Perubahan Perangai & Emosi Tidak Terkawal',
      desc: 'Mudah marah, cemas melampau tanpa sebab, rasa sedih mendalam atau tiba-tiba rasa ingin menyendiri dari keluarga.'
    },
    {
      title: 'Suasana Rumah Terasa Panas & Gangguan Misteri',
      desc: 'Kediaman berasa tidak selesa, ahli keluarga bergantian sakit atau terasa diperhatikan oleh entiti asing di dalam rumah.'
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

        {/* 6 Problem List (Clean Text Cards without images) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', textAlign: 'left' }}>
          {problems.map((p, idx) => (
            <div 
              key={idx}
              style={{
                background: '#FFFFFF',
                border: '2px solid #FDE047',
                borderRadius: '12px',
                padding: '1.25rem 1.4rem',
                boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.85rem'
              }}
            >
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#DC2626', color: '#FFFFFF', fontWeight: 800, fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                ✖
              </div>
              <div>
                <strong style={{ fontWeight: 800, fontSize: '0.975rem', color: '#0F172A', display: 'block', marginBottom: '0.25rem' }}>
                  {p.title}
                </strong>
                <span style={{ fontSize: '0.875rem', color: '#374151', lineHeight: 1.5, display: 'block' }}>
                  {p.desc}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
