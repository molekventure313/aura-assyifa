'use client';

export default function FspCTASection() {
  const scrollToForm = (e) => {
    e.preventDefault();
    const target = document.getElementById('borang');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      style={{
        background: 'linear-gradient(180deg, #0B382D 0%, #042E23 100%)',
        color: '#FFFFFF',
        padding: '4rem 1rem',
        fontFamily: 'var(--font-inter), -apple-system, sans-serif',
        textAlign: 'center'
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FDE047', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          JANGAN TUNGGU LAGI
        </span>

        <h2 style={{
          fontSize: 'clamp(1.6rem, 3.8vw, 2.4rem)',
          fontWeight: 800,
          color: '#FDE047',
          marginTop: '0.4rem',
          marginBottom: '1.25rem',
          lineHeight: 1.3,
          letterSpacing: '-0.02em'
        }}>
          Selesaikan Gangguan Jin, Sihir & Saka Sekarang — Mulakan Dengan Diagnos Percuma
        </h2>

        <p style={{ fontSize: '1.05rem', lineHeight: 1.65, color: '#FFFFFF', marginBottom: '0.75rem', maxWidth: '720px', margin: '0 auto 0.75rem auto' }}>
          Pilih pakej sesuai, isi borang di bawah & perawat kami akan hubungi anda secepat mungkin untuk sesi diagnos.
        </p>
        <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#A7F3D0', marginBottom: '2rem', maxWidth: '620px', margin: '0 auto 2rem auto' }}>
          Sebelum apa-apa keputusan dibuat, biar perawat kami <strong style={{ color: '#FDE047' }}>diagnos dahulu secara percuma</strong>.
          Anda tidak perlu komit apa-apa. Tiada bayaran. Tiada paksaan.
        </p>

        {/* Package highlight */}
        <div style={{
          background: 'linear-gradient(135deg, #065F46 0%, #047857 100%)',
          border: '2px solid #FDE047',
          borderRadius: '20px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <div style={{ fontSize: '0.75rem', color: '#A7F3D0', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Pakej Rawatan Penuh
          </div>
          <div style={{ fontSize: 'clamp(2.5rem, 7vw, 3.5rem)', fontWeight: 900, color: '#FDE047', lineHeight: 1 }}>RM50</div>
          <div style={{ fontSize: '0.9rem', color: '#D1FAE5' }}>Sekali bayar — rawatan + monitoring + air & garam berisian percuma</div>
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '0.5rem',
            justifyContent: 'center', marginTop: '0.5rem'
          }}>
            {['Sihir', 'Saka', 'Gangguan Jin', 'Asyik', 'Badi', 'Penyakit Misteri', 'Perniagaan Tersekat'].map((item, i) => (
              <span key={i} style={{
                background: 'rgba(253,224,71,0.15)',
                border: '1px solid rgba(253,224,71,0.4)',
                color: '#FEF3C7', fontSize: '0.78rem',
                fontWeight: 600, padding: '0.25rem 0.75rem', borderRadius: '999px'
              }}>{item}</span>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem' }}>
          <a
            href="#borang"
            onClick={scrollToForm}
            style={{
              display: 'inline-block',
              padding: '1.15rem 2.4rem',
              fontSize: '1.15rem',
              fontWeight: 800,
              color: '#042E23',
              background: 'linear-gradient(180deg, #FDE047 0%, #EAB308 100%)',
              borderRadius: '50px',
              textDecoration: 'none',
              boxShadow: '0 10px 25px rgba(234,179,8,0.45)',
              border: '2px solid #FEF08A'
            }}
          >
            🩺 Isi Borang Diagnos Percuma Sekarang
          </a>
          <span style={{ fontSize: '0.78rem', color: '#6EE7B7', fontStyle: 'italic' }}>
            Percuma. Tiada obligasi. Tiada paksaan.
          </span>
        </div>

      </div>
    </section>
  );
}
