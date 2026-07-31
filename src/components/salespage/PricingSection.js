'use client';

export default function PricingSection() {
  const afterSales = [
    {
      icon: '💧',
      title: 'Isian Air Tawar Percuma',
      desc: 'Unlimited refill — boleh minta bila-bila masa diperlukan.'
    },
    {
      icon: '🧂',
      title: 'Isian Garam Mandian Percuma',
      desc: 'Garam mandian berisian disediakan untuk membantu proses pembersihan.'
    },
    {
      icon: '🏠',
      title: 'Isian Garam Pagar Percuma',
      desc: 'Perlindungan rumah dengan garam pagar berisian tanpa bayaran tambahan.'
    },
    {
      icon: '📋',
      title: 'Monitoring 7 Hari',
      desc: 'Perawat kami akan pantau perkembangan pesakit selama 7 hari selepas rawatan.'
    },
    {
      icon: '🔄',
      title: 'Rawatan Susulan Percuma',
      desc: 'Jika masih diperlukan, rawatan susulan akan diberikan tanpa kos tambahan.'
    }
  ];

  const covered = [
    'Sihir', 'Saka', 'Gangguan Jin', 'Asyik',
    'Badi', 'Sumpahan', 'Penyakit Misteri', 'Perniagaan Tersekat'
  ];

  return (
    <section
      id="harga"
      style={{
        background: 'linear-gradient(180deg, #021812 0%, #042E23 100%)',
        color: '#FFFFFF',
        padding: '4rem 1rem',
        fontFamily: 'var(--font-inter), -apple-system, sans-serif'
      }}
    >
      <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>

        {/* Label */}
        <span style={{
          fontSize: '0.75rem', fontWeight: 800, color: '#FDE047',
          textTransform: 'uppercase', letterSpacing: '0.12em'
        }}>
          PAKEJ RAWATAN
        </span>

        {/* Heading */}
        <h2 style={{
          fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
          fontWeight: 800,
          color: '#FEF3C7',
          marginTop: '0.4rem',
          marginBottom: '0.5rem',
          letterSpacing: '-0.02em'
        }}>
          Satu Harga. Satu Ikhtiar. In Shaa Allah Sembuh.
        </h2>

        <p style={{
          color: '#A7F3D0', fontSize: '1rem',
          marginBottom: '2.5rem', lineHeight: 1.7
        }}>
          Kami percaya rawatan yang ikhlas tidak perlu membebankan. Bayar sekali sahaja,
          kami akan berusaha bersama anda sehingga pulih — dengan izin Allah.
        </p>

        {/* Price Card */}
        <div style={{
          background: 'linear-gradient(135deg, #065F46 0%, #047857 50%, #059669 100%)',
          border: '2px solid #FDE047',
          borderRadius: '20px',
          padding: '2.5rem 2rem',
          boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(253,224,71,0.2)',
          marginBottom: '1.5rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Glow decoration */}
          <div style={{
            position: 'absolute', top: '-60px', right: '-60px',
            width: '200px', height: '200px',
            background: 'radial-gradient(circle, rgba(253,224,71,0.15) 0%, transparent 70%)',
            borderRadius: '50%'
          }} />

          {/* Badge */}
          <div style={{
            display: 'inline-block',
            background: '#FDE047',
            color: '#042E23',
            fontWeight: 800,
            fontSize: '0.75rem',
            padding: '0.3rem 1rem',
            borderRadius: '999px',
            marginBottom: '1.2rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em'
          }}>
            ✨ Pakej Lengkap — Semua Dalam Satu
          </div>

          {/* Price */}
          <div style={{ marginBottom: '1rem' }}>
            <span style={{
              fontSize: 'clamp(3rem, 8vw, 4.5rem)',
              fontWeight: 900,
              color: '#FDE047',
              lineHeight: 1,
              display: 'block'
            }}>
              RM50
            </span>
            <span style={{
              fontSize: '1rem', color: '#D1FAE5',
              fontWeight: 500, display: 'block', marginTop: '0.3rem'
            }}>
              Sekali bayar — ikhtiar sampai sembuh, in shaa Allah
            </span>
          </div>

          {/* Divider */}
          <div style={{
            borderTop: '1px solid rgba(253,224,71,0.3)',
            margin: '1.5rem 0'
          }} />

          {/* Covered problems */}
          <p style={{
            fontSize: '0.8rem', color: '#A7F3D0', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.8rem'
          }}>
            Merangkumi Semua Kes:
          </p>
          <div style={{
            display: 'flex', flexWrap: 'wrap',
            gap: '0.5rem', justifyContent: 'center', marginBottom: '1.5rem'
          }}>
            {covered.map((item, i) => (
              <span key={i} style={{
                background: 'rgba(253,224,71,0.15)',
                border: '1px solid rgba(253,224,71,0.4)',
                color: '#FEF3C7',
                fontSize: '0.82rem',
                fontWeight: 600,
                padding: '0.3rem 0.85rem',
                borderRadius: '999px'
              }}>
                {item}
              </span>
            ))}
          </div>

          {/* CTA Button */}
          <a
            href="#borang"
            style={{
              display: 'inline-block',
              background: '#FDE047',
              color: '#042E23',
              fontWeight: 800,
              fontSize: '1.05rem',
              padding: '0.9rem 2.5rem',
              borderRadius: '12px',
              textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(253,224,71,0.4)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              letterSpacing: '0.01em'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(253,224,71,0.5)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(253,224,71,0.4)';
            }}
          >
            Daftar Rawatan Sekarang →
          </a>
        </div>

        {/* After-sales services */}
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(253,224,71,0.2)',
          borderRadius: '16px',
          padding: '2rem 1.5rem',
          marginTop: '2rem',
          textAlign: 'left'
        }}>
          <p style={{
            textAlign: 'center',
            fontWeight: 800,
            fontSize: '1rem',
            color: '#FDE047',
            marginBottom: '1.5rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em'
          }}>
            🎁 After-Sales Service Yang Anda Terima — Percuma
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1rem'
          }}>
            {afterSales.map((s, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.8rem',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(167,243,208,0.15)',
                borderRadius: '10px',
                padding: '1rem'
              }}>
                <span style={{ fontSize: '1.6rem', lineHeight: 1, flexShrink: 0 }}>{s.icon}</span>
                <div>
                  <p style={{
                    margin: '0 0 0.25rem 0',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    color: '#FEF3C7'
                  }}>
                    {s.title}
                  </p>
                  <p style={{
                    margin: 0,
                    fontSize: '0.8rem',
                    color: '#A7F3D0',
                    lineHeight: 1.5
                  }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust line */}
        <p style={{
          marginTop: '1.8rem',
          fontSize: '0.9rem',
          color: '#6EE7B7',
          lineHeight: 1.7,
          fontStyle: 'italic'
        }}>
          "Sekali bayar, kami akan terus berikhtiar bersama anda sehingga sembuh — dengan izin dan rahmat Allah SWT."
        </p>

      </div>
    </section>
  );
}
