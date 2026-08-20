'use client';

export default function FspPaymentSection() {
  const scrollToForm = (e) => {
    e.preventDefault();
    const target = document.getElementById('borang');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      style={{
        background: '#042E23',
        color: '#FFFFFF',
        padding: '4rem 1rem',
        fontFamily: 'var(--font-inter), -apple-system, sans-serif'
      }}
    >
      <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>

        <span style={{
          fontSize: '0.75rem', fontWeight: 800, color: '#FDE047',
          textTransform: 'uppercase', letterSpacing: '0.12em'
        }}>
          CARA BAYAR & PROSES
        </span>

        <h2 style={{
          fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
          fontWeight: 800,
          color: '#FEF3C7',
          marginTop: '0.4rem',
          marginBottom: '0.5rem',
          letterSpacing: '-0.02em',
          lineHeight: 1.3
        }}>
          Mudah. Selamat. Bayar Terus Melalui FPX Online.
        </h2>

        <p style={{
          color: '#A7F3D0', fontSize: '1rem',
          marginBottom: '2.5rem', lineHeight: 1.7,
          maxWidth: '560px', margin: '0 auto 2.5rem auto'
        }}>
          Isi borang ringkas, bayar RM50 melalui FPX — perawat kami akan terus hubungi anda dan mulakan rawatan segera.
        </p>

        {/* Payment methods */}
        <div style={{
          background: 'linear-gradient(135deg, #065F46 0%, #047857 100%)',
          border: '2px solid #FDE047',
          borderRadius: '20px',
          padding: '2rem',
          marginBottom: '1.5rem',
          boxShadow: '0 12px 40px rgba(0,0,0,0.3)'
        }}>

          {/* Price */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.8rem', color: '#A7F3D0', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>
              Yuran Rawatan
            </div>
            <div style={{ fontSize: 'clamp(2.5rem, 7vw, 3.5rem)', fontWeight: 900, color: '#FDE047', lineHeight: 1 }}>
              RM50
            </div>
            <div style={{ fontSize: '0.9rem', color: '#D1FAE5', marginTop: '0.3rem' }}>
              Sekali bayar — rawatan sehingga sembuh, in shaa Allah
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(253,224,71,0.3)', paddingTop: '1.5rem', marginBottom: '1.5rem' }}>
            <p style={{ fontSize: '0.8rem', color: '#A7F3D0', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
              Kaedah Pembayaran Yang Diterima:
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
              {[
                { icon: '🏦', label: 'FPX Online Banking' },
                { icon: '💳', label: 'Bank Transfer' },
                { icon: '📱', label: 'Maybank / CIMB / RHB' },
                { icon: '💚', label: 'Touch \'n Go eWallet' },
              ].map((m, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                  background: 'rgba(253,224,71,0.12)',
                  border: '1px solid rgba(253,224,71,0.3)',
                  borderRadius: '999px',
                  padding: '0.4rem 1rem',
                  fontSize: '0.82rem', fontWeight: 600, color: '#FEF3C7'
                }}>
                  <span>{m.icon}</span> {m.label}
                </div>
              ))}
            </div>
          </div>

          {/* Process flow */}
          <div style={{
            background: 'rgba(0,0,0,0.2)',
            borderRadius: '12px',
            padding: '1.2rem'
          }}>
            <p style={{ fontSize: '0.8rem', color: '#A7F3D0', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.8rem' }}>
              Proses Ringkas:
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              {[
                { step: '1', text: 'Isi Borang' },
                { step: '2', text: 'Bayar RM50 FPX' },
                { step: '3', text: 'Perawat Hubungi' },
                { step: '4', text: 'Rawatan Dijalankan' },
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                    background: 'rgba(253,224,71,0.15)',
                    borderRadius: '999px', padding: '0.3rem 0.8rem'
                  }}>
                    <span style={{
                      width: '20px', height: '20px', borderRadius: '50%',
                      background: '#FDE047', color: '#042E23',
                      fontWeight: 900, fontSize: '0.7rem',
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                    }}>{s.step}</span>
                    <span style={{ fontSize: '0.78rem', color: '#FEF3C7', fontWeight: 700 }}>{s.text}</span>
                  </div>
                  {i < 3 && <span style={{ color: '#FDE047', fontWeight: 700 }}>→</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* After-sales */}
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(253,224,71,0.2)',
          borderRadius: '16px',
          padding: '1.5rem',
          textAlign: 'left',
          marginBottom: '1.5rem'
        }}>
          <p style={{ textAlign: 'center', fontWeight: 800, fontSize: '0.9rem', color: '#FDE047', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            🎁 Percuma Bersama Rawatan (Bernilai RM250+)
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
            {[
              { icon: '💧', text: 'Isian Air Tawar Unlimited' },
              { icon: '🧂', text: 'Garam Mandian Berisian' },
              { icon: '🏠', text: 'Garam Pagar Rumah Berisian' },
              { icon: '📋', text: 'Monitoring 7 Hari' },
              { icon: '🔄', text: 'Rawatan Susulan Percuma' },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '0.6rem',
                fontSize: '0.85rem', color: '#A7F3D0', fontWeight: 600
              }}>
                <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
                <span>{item.text}</span>
                <span style={{
                  marginLeft: 'auto', fontSize: '0.65rem',
                  background: '#22C55E', color: '#fff',
                  fontWeight: 800, padding: '1px 6px', borderRadius: '999px'
                }}>PERCUMA</span>
              </div>
            ))}
          </div>
        </div>

        <a
          href="#borang"
          onClick={scrollToForm}
          style={{
            display: 'inline-block',
            padding: '1.1rem 2.4rem',
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
          💳 Bayar RM50 & Mulakan Rawatan Sekarang
        </a>

      </div>
    </section>
  );
}
