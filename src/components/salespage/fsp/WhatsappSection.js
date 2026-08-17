'use client';

export default function FspWhatsappSection() {
  const scrollToForm = (e) => {
    e.preventDefault();
    const target = document.getElementById('borang');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      style={{
        background: '#0B382D',
        color: '#FFFFFF',
        padding: '3.5rem 1rem',
        fontFamily: 'var(--font-inter), -apple-system, sans-serif',
        textAlign: 'center'
      }}
    >
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>

        <span style={{
          fontSize: '0.75rem', fontWeight: 800, color: '#FDE047',
          textTransform: 'uppercase', letterSpacing: '0.12em'
        }}>
          HUBUNGI KAMI
        </span>

        <h2 style={{
          fontSize: 'clamp(1.4rem, 3.2vw, 2rem)',
          fontWeight: 800,
          color: '#FEF3C7',
          marginTop: '0.4rem',
          marginBottom: '0.8rem',
          letterSpacing: '-0.02em',
          lineHeight: 1.35
        }}>
          Ada Soalan? Isi Borang & Kami Akan Hubungi Anda Melalui WhatsApp
        </h2>

        <p style={{
          fontSize: '0.95rem', color: '#A7F3D0',
          lineHeight: 1.7, marginBottom: '2rem',
          maxWidth: '520px', margin: '0 auto 2rem auto'
        }}>
          Perawat kami akan respond melalui WhatsApp sebaik sahaja menerima permohonan anda.
          Personal touch masih penting — kami di sini untuk bantu anda.
        </p>

        {/* Icons */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: '1.5rem',
          flexWrap: 'wrap', marginBottom: '2rem'
        }}>
          {[
            { icon: '⚡', text: 'Respon Pantas' },
            { icon: '🤝', text: 'Mesra & Ikhlas' },
            { icon: '🔒', text: 'Maklumat Sulit' },
          ].map((item, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '0.3rem' }}>{item.icon}</div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#A7F3D0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.text}</div>
            </div>
          ))}
        </div>

        {/* CTA scrolls to form */}
        <a
          href="#borang"
          onClick={scrollToForm}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '1.1rem 2.2rem',
            fontSize: '1.05rem',
            fontWeight: 800,
            color: '#042E23',
            background: 'linear-gradient(180deg, #FDE047 0%, #EAB308 100%)',
            borderRadius: '50px',
            textDecoration: 'none',
            boxShadow: '0 10px 25px rgba(234,179,8,0.4)',
            border: '2px solid #FEF08A'
          }}
        >
          <span style={{ fontSize: '1.3rem' }}>📋</span>
          Isi Borang & Kami Akan Hubungi Anda
        </a>

        <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#6EE7B7', fontStyle: 'italic' }}>
          Perawat akan respond melalui WhatsApp dalam masa yang singkat, in shaa Allah.
        </p>

      </div>
    </section>
  );
}
