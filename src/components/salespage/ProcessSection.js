'use client';

export default function ProcessSection() {
  const steps = [
    {
      num: '01',
      icon: '📋',
      phase: 'Isi Borang',
      title: 'Mohon Diagnos Percuma',
      desc: 'Isi borang ringkas di bawah. Nyatakan simptom atau masalah yang anda alami supaya perawat kami boleh bersedia.',
      tag: 'PERCUMA',
      tagColor: '#22C55E',
      highlight: false
    },
    {
      num: '02',
      icon: '🩺',
      phase: 'Diagnos',
      title: 'Perawat Hubungi & Diagnos',
      desc: 'Perawat kami akan menghubungi anda melalui WhatsApp untuk sesi diagnos. Kami akan analisa simptom anda secara teliti.',
      tag: 'PERCUMA',
      tagColor: '#22C55E',
      highlight: false
    },
    {
      num: '03',
      icon: '🤝',
      phase: 'Keputusan Anda',
      title: 'Anda Tentukan Sendiri',
      desc: 'Setelah diagnos, anda bebas memilih — teruskan rawatan atau tidak. Tiada paksaan, tiada tekanan. Sepenuhnya keputusan anda.',
      tag: 'TIADA PAKSAAN',
      tagColor: '#3B82F6',
      highlight: true
    },
    {
      num: '04',
      icon: '💳',
      phase: 'Bayaran',
      title: 'Bayar RM50 — Sekali Sahaja',
      desc: 'Jika anda bersetuju untuk rawatan, bayar RM50 sekali sahaja. Tiada bayaran tersembunyi atau caj tambahan selepas itu.',
      tag: 'RM50 SAHAJA',
      tagColor: '#F59E0B',
      highlight: false
    },
    {
      num: '05',
      icon: '🌿',
      phase: 'Rawatan',
      title: 'Rawatan Jarak Jauh Dijalankan',
      desc: 'Rawatan dijalankan secara patuh syariah — berteraskan bacaan Al-Quran dan doa. Boleh dilakukan dari mana-mana sahaja.',
      tag: 'PATUH SYARIAH',
      tagColor: '#059669',
      highlight: false
    },
    {
      num: '06',
      icon: '🔄',
      phase: 'Susulan',
      title: 'Pemantauan & Rawatan Susulan',
      desc: 'Perawat pantau perkembangan anda selama 7 hari. Air tawar, garam mandian & pagar berisian, serta rawatan susulan — semuanya percuma.',
      tag: 'AFTER-SALES PERCUMA',
      tagColor: '#8B5CF6',
      highlight: false
    }
  ];

  return (
    <section
      id="proses"
      style={{
        background: '#FFFFFF',
        color: '#0F172A',
        padding: '4rem 1rem 0 1rem',
        fontFamily: 'var(--font-inter), -apple-system, sans-serif'
      }}
    >
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{
            fontSize: '0.75rem', fontWeight: 800, color: '#059669',
            textTransform: 'uppercase', letterSpacing: '0.12em'
          }}>
            PROSES &amp; KAEDAH RAWATAN
          </span>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
            fontWeight: 800,
            color: '#0F172A',
            marginTop: '0.4rem',
            marginBottom: '0.6rem',
            letterSpacing: '-0.02em'
          }}>
            Bagaimana ESyifaa Berfungsi?
          </h2>
          <p style={{
            fontSize: '1rem',
            color: '#4B5563',
            maxWidth: '560px',
            margin: '0 auto',
            lineHeight: 1.7
          }}>
            Dari diagnos percuma hingga rawatan lengkap — kami reka proses ini supaya
            mudah, telus, dan tanpa sebarang tekanan kepada anda.
          </p>
        </div>

        {/* Steps — vertical timeline style */}
        <div style={{ position: 'relative' }}>

          {/* Vertical line connector */}
          <div style={{
            position: 'absolute',
            left: '28px',
            top: '28px',
            bottom: '28px',
            width: '2px',
            background: 'linear-gradient(180deg, #059669, #FDE047, #8B5CF6)',
            opacity: 0.3,
            borderRadius: '999px'
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {steps.map((s, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  gap: '1.2rem',
                  alignItems: 'flex-start',
                  background: s.highlight ? 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)' : '#F8FAFC',
                  border: s.highlight ? '2px solid #3B82F6' : '1.5px solid #E2E8F0',
                  borderRadius: '14px',
                  padding: '1.25rem 1.25rem 1.25rem 1rem',
                  boxShadow: s.highlight ? '0 4px 20px rgba(59,130,246,0.12)' : '0 2px 8px rgba(0,0,0,0.04)',
                  transition: 'all 0.2s'
                }}
              >
                {/* Step number circle */}
                <div style={{
                  flexShrink: 0,
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: s.highlight ? '#3B82F6' : '#042E23',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  zIndex: 1
                }}>
                  {s.icon}
                </div>

                {/* Content */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.3rem' }}>
                    <span style={{
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      color: '#042E23',
                      background: '#E2E8F0',
                      padding: '0.15rem 0.5rem',
                      borderRadius: '4px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em'
                    }}>
                      {s.num} · {s.phase}
                    </span>
                    <span style={{
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      color: '#fff',
                      background: s.tagColor,
                      padding: '0.15rem 0.6rem',
                      borderRadius: '999px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em'
                    }}>
                      {s.tag}
                    </span>
                  </div>
                  <h3 style={{
                    fontSize: '1rem',
                    fontWeight: 800,
                    color: s.highlight ? '#1D4ED8' : '#0F172A',
                    margin: '0 0 0.3rem 0',
                    lineHeight: 1.35
                  }}>
                    {s.title}
                  </h3>
                  <p style={{
                    fontSize: '0.85rem',
                    color: '#4B5563',
                    margin: 0,
                    lineHeight: 1.6,
                    fontWeight: 500
                  }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bridge to form */}
        <div style={{
          textAlign: 'center',
          marginTop: '2.5rem',
          paddingBottom: '0'
        }}>
          <div style={{
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.4rem'
          }}>
            <p style={{
              margin: 0,
              fontSize: '1rem',
              fontWeight: 700,
              color: '#042E23'
            }}>
              Mulakan dengan Langkah 01 — Isi borang di bawah sekarang 👇
            </p>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#6B7280' }}>
              Percuma. Tiada risiko. Tiada paksaan.
            </p>
          </div>
          {/* Arrow connector */}
          <div style={{
            marginTop: '1.5rem',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <svg width="32" height="48" viewBox="0 0 32 48" fill="none">
              <path d="M16 0 L16 36" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="6 4"/>
              <path d="M6 28 L16 42 L26 28" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </div>
        </div>

      </div>
    </section>
  );
}
