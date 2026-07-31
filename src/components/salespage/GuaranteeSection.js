'use client';

export default function GuaranteeSection() {
  return (
    <section
      style={{
        background: 'linear-gradient(180deg, #042E23 0%, #021812 100%)',
        color: '#FFFFFF',
        padding: '4rem 1rem',
        fontFamily: 'var(--font-inter), -apple-system, sans-serif'
      }}
    >
      <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>

        {/* Label */}
        <span style={{
          fontSize: '0.75rem', fontWeight: 800, color: '#FDE047',
          textTransform: 'uppercase', letterSpacing: '0.12em'
        }}>
          JAMINAN KAMI
        </span>

        {/* Heading */}
        <h2 style={{
          fontSize: 'clamp(1.6rem, 3.5vw, 2.3rem)',
          fontWeight: 800,
          color: '#FEF3C7',
          marginTop: '0.4rem',
          marginBottom: '0.5rem',
          letterSpacing: '-0.02em',
          lineHeight: 1.3
        }}>
          Jaminan Pulang Wang 100%
        </h2>
        <p style={{
          color: '#A7F3D0',
          fontSize: '1rem',
          lineHeight: 1.7,
          marginBottom: '2rem',
          maxWidth: '580px',
          margin: '0 auto 2rem auto'
        }}>
          Kami yakin dengan ikhtiar yang kami lakukan. Jika tiada sebarang perubahan, kami akan kembalikan wang anda — tanpa soal, tanpa syarat rumit.
        </p>

        {/* Main guarantee card */}
        <div style={{
          background: 'linear-gradient(135deg, #1E3A2F 0%, #14532D 100%)',
          border: '2px solid #22C55E',
          borderRadius: '20px',
          padding: '2.5rem 2rem',
          boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(34,197,94,0.2)',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: '1.5rem'
        }}>
          {/* Glow */}
          <div style={{
            position: 'absolute', top: '-80px', left: '50%',
            transform: 'translateX(-50%)',
            width: '300px', height: '200px',
            background: 'radial-gradient(circle, rgba(34,197,94,0.15) 0%, transparent 70%)',
            borderRadius: '50%'
          }} />

          {/* Shield icon */}
          <div style={{
            fontSize: '4rem',
            marginBottom: '1rem',
            lineHeight: 1,
            filter: 'drop-shadow(0 4px 12px rgba(34,197,94,0.4))'
          }}>
            🛡️
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: '#16A34A',
            borderRadius: '999px',
            padding: '0.4rem 1.2rem',
            marginBottom: '1.2rem'
          }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#fff', letterSpacing: '0.05em' }}>
              ✅ REFUND 100% — TANPA BANYAK SOAL
            </span>
          </div>

          <p style={{
            fontSize: '1.05rem',
            color: '#D1FAE5',
            lineHeight: 1.8,
            maxWidth: '580px',
            margin: '0 auto 1.5rem auto',
            fontWeight: 500
          }}>
            Jika selepas rawatan selesai dan anda dapati <strong style={{ color: '#86EFAC' }}>tiada sebarang perubahan</strong> berbanding sebelum rawatan — PM sahaja perawat kami. Kami akan <strong style={{ color: '#FDE047' }}>refund 100% tanpa banyak cakap</strong>.
          </p>

          {/* Steps */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
            marginBottom: '1.5rem'
          }}>
            {[
              { step: '1', text: 'PM perawat' },
              { step: '2', text: 'Maklumkan situasi' },
              { step: '3', text: 'Refund diproses' },
            ].map((s, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(34,197,94,0.3)',
                borderRadius: '999px',
                padding: '0.4rem 1rem'
              }}>
                <span style={{
                  width: '22px', height: '22px',
                  borderRadius: '50%',
                  background: '#22C55E',
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: '0.75rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>{s.step}</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#D1FAE5' }}>{s.text}</span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div style={{ borderTop: '1px dashed rgba(34,197,94,0.3)', margin: '0 auto 1.5rem auto', maxWidth: '400px' }} />

          {/* Warning note */}
          <div style={{
            background: 'rgba(0,0,0,0.25)',
            border: '1px solid rgba(253,224,71,0.2)',
            borderRadius: '12px',
            padding: '1rem 1.2rem',
            maxWidth: '560px',
            margin: '0 auto',
            display: 'flex',
            gap: '0.75rem',
            alignItems: 'flex-start',
            textAlign: 'left'
          }}>
            <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>⚠️</span>
            <p style={{
              margin: 0,
              fontSize: '0.82rem',
              color: '#FEF3C7',
              lineHeight: 1.7,
              fontStyle: 'italic'
            }}>
              Namun jika ada yang cuba menipu atau mengada-adakan alasan — kami serahkan kepada Allah SWT.{' '}
              <strong style={{ color: '#FDE047' }}>Moga Allah membalas dan menghadirkan semula penyakit itu.</strong>{' '}
              Kami hanya mampu berbaik sangka dan berdoa semoga semua yang hadir adalah benar-benar ingin sembuh.
            </p>
          </div>

        </div>

        {/* Bottom trust line */}
        <p style={{
          fontSize: '0.85rem',
          color: '#6EE7B7',
          lineHeight: 1.7,
          fontStyle: 'italic'
        }}>
          Jaminan ini lahir dari keyakinan kami terhadap kekuasaan Allah SWT dan keikhlasan niat dalam setiap rawatan yang dijalankan.
        </p>

      </div>
    </section>
  );
}
