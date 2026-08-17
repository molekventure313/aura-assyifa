'use client';

export default function FspClosingSection() {
  const scrollToForm = (e) => {
    e.preventDefault();
    const target = document.getElementById('borang');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      style={{
        background: 'linear-gradient(180deg, #042E23 0%, #0B382D 100%)',
        color: '#FFFFFF',
        padding: '4rem 1rem',
        fontFamily: 'var(--font-inter), -apple-system, sans-serif',
        textAlign: 'center'
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FDE047', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          PENUTUP
        </span>

        <h2 style={{
          fontSize: 'clamp(1.6rem, 3.8vw, 2.4rem)',
          fontWeight: 800, color: '#FDE047',
          marginTop: '0.4rem', marginBottom: '1.5rem',
          lineHeight: 1.25, letterSpacing: '-0.02em'
        }}>
          Jangan Hadapi Semua Ini Seorang Diri
        </h2>

        <div style={{
          display: 'flex', flexDirection: 'column', gap: '1rem',
          fontSize: '1.05rem', lineHeight: 1.65, color: '#FFFFFF',
          marginBottom: '2.5rem', maxWidth: '750px', margin: '0 auto 2.5rem auto'
        }}>
          <p style={{ margin: 0 }}>
            Jika anda sudah lama berdepan dengan gangguan yang menjejaskan ketenangan hidup — mimpi ngeri, badan tak keruan, perniagaan tak jalan, rumah tangga bergolak — inilah masanya untuk ambil tindakan.
          </p>
          <p style={{ margin: 0 }}>
            Jangan biarkan gangguan ini terus mengakar dan menjejaskan kehidupan anda, pasangan dan anak-anak. Setiap hari yang berlalu adalah peluang untuk sembuh yang dibiarkan berlalu begitu sahaja.
          </p>
          <p style={{ margin: 0, fontWeight: 800, color: '#FDE047' }}>
            Mulakan dengan diagnos percuma hari ini — tiada risiko, tiada paksaan. Biar kami bantu anda dengan izin Allah.
          </p>
        </div>

        <div>
          <a
            href="#borang"
            onClick={scrollToForm}
            style={{
              display: 'inline-block',
              padding: '1.15rem 2.4rem',
              fontSize: '1.15rem', fontWeight: 800,
              color: '#042E23',
              background: 'linear-gradient(180deg, #FDE047 0%, #EAB308 100%)',
              borderRadius: '50px', textDecoration: 'none',
              boxShadow: '0 10px 25px rgba(234, 179, 8, 0.45)',
              border: '2px solid #FEF08A'
            }}
          >
            🩺 Mohon Diagnos Percuma Sekarang
          </a>
          <p style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: '#6EE7B7', fontStyle: 'italic' }}>
            Percuma. Tiada obligasi. Respon melalui WhatsApp.
          </p>
        </div>

      </div>
    </section>
  );
}
