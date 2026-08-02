'use client';

export default function ProblemSection() {
  const problems = [
    {
      title: 'Sakit Badan Tanpa Punca Perubatan',
      desc: 'Keputusan ujian hospital dan doktor mengesahkan sihat, tetapi kesakitan fizikal amat menyiksakan.'
    },
    {
      title: 'Badan Berasa Berat & Sengal Luar Biasa',
      desc: 'Terutamanya di bahagian belikat, tengkuk dan pinggang sebaik sahaja senja atau waktu malam menjelang.'
    },
    {
      title: 'Sakit Kepala Mencucuk Berterusan',
      desc: 'Sakit kepala yang tidak hilang walaupun sudah makan ubat perubatan atau tahan sakit biasa.'
    },
    {
      title: 'Demam & Panas Badan Beralih-Alih',
      desc: 'Sensasi bahang panas bergerak di anggota badan tanpa sebarang bacaan demam klinikal pada termometer.'
    },
    {
      title: 'Keletihan Melampau & Sukar Tidur',
      desc: 'Badan sentiasa lesu, susah hendak tidur malam dan kerap terjaga dalam keadaan cemas atau berdebar.'
    },
    {
      title: 'Doktor & Pakar Tak Boleh Kenal Pasti Jenis Penyakit',
      desc: 'Sudah berjumpa pelbagai doktor dan pusat perubatan tetapi masih tiada diagnosis tepat yang ditemui.'
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
          TANDA-TANDA PENYAKIT MISTERI
        </span>
        
        <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 800, color: '#FDE047', marginTop: '0.4rem', marginBottom: '0.8rem', letterSpacing: '-0.02em' }}>
          Adakah Anda Mengalami Masalah Penyakit Misteri Ini?
        </h2>

        <p style={{ fontSize: '1rem', color: '#FFFFFF', marginBottom: '2.5rem', maxWidth: '750px', margin: '0 auto 2.5rem auto', lineHeight: 1.6 }}>
          Penyakit misteri sering membuatkan pesakit berasa sengsara dan bingung kerana perubatan biasa tidak dapat mengesan punca sebenar.
        </p>

        {/* 6 Problem List (Cards without images) */}
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
