'use client';

export default function FspProcessSection() {
  const steps = [
    {
      num: '01', icon: '💳', phase: 'Bayaran',
      title: 'Bayar RM50 Secara Online — Selamat & Pantas',
      desc: 'Isi borang ringkas di bawah dan bayar RM50 terus melalui FPX (internet banking). Proses selamat, segera, dan tiada bayaran tersembunyi.',
      tag: 'FPX ONLINE', tagColor: '#2563EB', highlight: true
    },
    {
      num: '02', icon: '📲', phase: 'Notifikasi',
      title: 'Perawat Terima & Sahkan Pesanan Anda',
      desc: 'Sebaik sahaja bayaran berjaya, perawat kami akan terima notifikasi segera dan menghubungi anda melalui WhatsApp dalam masa singkat.',
      tag: 'SEGERA', tagColor: '#059669', highlight: false
    },
    {
      num: '03', icon: '🌿', phase: 'Rawatan',
      title: 'Rawatan Jarak Jauh Dijalankan',
      desc: 'Rawatan dijalankan secara patuh syariah — menggunakan Al-Quran, Asmaul Husna dan doa-doa sahih. Boleh dari mana-mana sahaja dalam Malaysia.',
      tag: 'PATUH SYARIAH', tagColor: '#059669', highlight: false
    },
    {
      num: '04', icon: '🔄', phase: 'Susulan',
      title: 'Pemantauan 7 Hari & Rawatan Susulan Percuma',
      desc: 'Perawat pantau perkembangan anda selama 7 hari. Air tawar, garam mandian & pagar berisian, serta rawatan susulan — semuanya percuma.',
      tag: 'AFTER-CARE PERCUMA', tagColor: '#8B5CF6', highlight: false
    }
  ];

  return (
    <section
      id="proses-fsp"
      style={{
        background: '#FFFFFF',
        color: '#0F172A',
        padding: '4rem 1rem 0 1rem',
        fontFamily: 'var(--font-inter), -apple-system, sans-serif'
      }}
    >
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            CARA RAWATAN
          </span>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
            fontWeight: 800, color: '#0F172A',
            marginTop: '0.4rem', marginBottom: '0.6rem', letterSpacing: '-0.02em'
          }}>
            Cara Dapatkan Rawatan ESyifaa — 4 Langkah Mudah
          </h2>
          <p style={{
            fontSize: '1rem', color: '#4B5563',
            maxWidth: '560px', margin: '0 auto', lineHeight: 1.7
          }}>
            Bayar terus online, perawat hubungi anda, rawatan dijalankan — mudah, telus, dan pantas.
          </p>
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute', left: '28px', top: '28px', bottom: '28px',
            width: '2px',
            background: 'linear-gradient(180deg, #2563EB, #059669, #8B5CF6)',
            opacity: 0.3, borderRadius: '999px'
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {steps.map((s, idx) => (
              <div key={idx} style={{
                display: 'flex', gap: '1.2rem', alignItems: 'flex-start',
                background: s.highlight ? 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)' : '#F8FAFC',
                border: s.highlight ? '2px solid #2563EB' : '1.5px solid #E2E8F0',
                borderRadius: '14px',
                padding: '1.25rem 1.25rem 1.25rem 1rem',
                boxShadow: s.highlight ? '0 4px 20px rgba(37,99,235,0.12)' : '0 2px 8px rgba(0,0,0,0.04)'
              }}>
                <div style={{
                  flexShrink: 0, width: '52px', height: '52px', borderRadius: '50%',
                  background: s.highlight ? '#2563EB' : '#042E23',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.2rem', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 1
                }}>
                  {s.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.3rem' }}>
                    <span style={{
                      fontSize: '0.65rem', fontWeight: 800, color: '#042E23',
                      background: '#E2E8F0', padding: '0.15rem 0.5rem',
                      borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.06em'
                    }}>{s.num} · {s.phase}</span>
                    <span style={{
                      fontSize: '0.65rem', fontWeight: 800, color: '#fff',
                      background: s.tagColor, padding: '0.15rem 0.6rem',
                      borderRadius: '999px', textTransform: 'uppercase', letterSpacing: '0.06em'
                    }}>{s.tag}</span>
                  </div>
                  <h3 style={{
                    fontSize: '1rem', fontWeight: 800,
                    color: s.highlight ? '#1D4ED8' : '#0F172A',
                    margin: '0 0 0.3rem 0', lineHeight: 1.35
                  }}>{s.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: '#4B5563', margin: 0, lineHeight: 1.6, fontWeight: 500 }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bridge to form */}
        <div style={{ textAlign: 'center', marginTop: '2.5rem', paddingBottom: '0' }}>
          <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
            <p style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#042E23' }}>
              Mulakan Rawatan — Bayar RM50 Sekarang 👇
            </p>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#6B7280' }}>Selamat · FPX · Patuh Syariah</p>
          </div>
          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center' }}>
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
