'use client';

export default function BenefitsSection() {
  const hasratList = [
    "Nak tidur lena semula",
    "Nak hati rasa lebih tenang",
    "Nak kembali fokus bekerja",
    "Nak hubungan keluarga kembali baik",
    "Nak beribadah dengan lebih khusyuk"
  ];

  return (
    <section className="section-mvsyifaa" id="hasrat">
      <div className="container" style={{ textAlign: 'center' }}>
        <span className="badge-mvsyifaa">
          ❤️ IMPIAN &amp; HARAPAN PESAKIT
        </span>

        <h2 className="section-title-mvsyifaa" style={{ textAlign: 'center' }}>
          Inilah Yang Ramai Harapkan Selepas Mendapatkan Rawatan
        </h2>

        <div style={{ maxWidth: '660px', margin: '2.5rem auto 0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {hasratList.map((h, idx) => (
            <div 
              key={idx}
              className="card-mvsyifaa"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                padding: '1.15rem 1.75rem',
                borderRadius: '18px'
              }}
            >
              <span style={{ fontSize: '1.4rem', color: '#059669', flexShrink: 0, fontWeight: 800 }}>✔</span>
              <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--font-dark-green)', textAlign: 'center' }}>
                {h}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
