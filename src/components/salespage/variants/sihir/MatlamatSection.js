'use client';

export default function MatlamatSection() {
  const goals = [
    'Membantu memulihkan tidur supaya kembali lena, tenang dan bebas daripada gangguan terkejut di malam hari.',
    'Melegakan kesakitan badan, bahu dan bahagian belakang terutamanya selepas Asar serta sakit kepala misteri.',
    'Menghilangkan sensasi benda merayap di dalam badan dan menghentikan kehangatan panas badan yang beralih-alih.',
    'Memulihkan keharmonian, ketenangan dan kasih sayang antara suami isteri dalam rumah tangga.',
    'Memecahkan ikatan sihir dari punca asal dan membina benteng perlindungan syariah agar gangguan tidak berulang.'
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
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        
        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FDE047', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          MATLAMAT RAWATAN SIHIR
        </span>

        <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 800, color: '#FDE047', marginTop: '0.4rem', marginBottom: '0.8rem', letterSpacing: '-0.02em' }}>
          Apa Yang Ingin Dicapai Melalui Rawatan Sihir Aura Assyifa?
        </h2>

        <p style={{ fontSize: '0.975rem', color: '#FFFFFF', marginBottom: '2rem', lineHeight: 1.6, opacity: 0.9 }}>
          Rawatan ini dirangka khusus untuk menyelesaikan tanda-tanda gangguan sihir yang anda alami secara tuntas dan patuh syariah.
        </p>

        {/* Goal Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
          {goals.map((g, idx) => (
            <div 
              key={idx}
              style={{
                background: '#FFFFFF',
                border: '2px solid #FDE047',
                borderRadius: '10px',
                padding: '1.1rem 1.35rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
              }}
            >
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#059669', color: '#FFFFFF', fontWeight: 800, fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                ✔
              </div>
              <span style={{ fontWeight: 700, fontSize: '0.975rem', color: '#0F172A', lineHeight: 1.5 }}>
                {g}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
