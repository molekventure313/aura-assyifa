'use client';

export default function ProblemSection() {
  const problems = [
    {
      title: 'Gangguan Jin',
      desc: 'Diganggu makhluk halus, terasa dirasuk atau ada entiti asing yang mengikut ke mana sahaja anda pergi.',
      img: 'https://images.unsplash.com/photo-1604079628040-94301bb21b91?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Sihir',
      desc: 'Terkena sihir pemisah, penghalang rezeki atau sihir yang menjejaskan kesihatan fizikal dan mental.',
      img: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Saka Turun-Temurun',
      desc: 'Warisan gangguan dari nenek moyang yang masih mempengaruhi kehidupan anda dan keluarga.',
      img: 'https://images.unsplash.com/photo-1527489377706-5bf97e608852?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Gangguan Rumah',
      desc: 'Rumah terasa tidak selesa, penghuni selalu tidak sihat atau berlaku kejadian pelik berulang kali.',
      img: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Santau',
      desc: 'Terkena bisa atau racun mistik yang menyebabkan kesakitan fizikal yang tidak dapat dijelaskan secara perubatan.',
      img: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80',
    }
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
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        
        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FDE047', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          JENIS GANGGUAN MISTIK
        </span>
        
        <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 800, color: '#FDE047', marginTop: '0.4rem', marginBottom: '0.8rem', letterSpacing: '-0.02em' }}>
          Apakah Jenis Gangguan Mistik Yang Mungkin Anda Alami?
        </h2>

        <p style={{ fontSize: '1rem', color: '#FFFFFF', marginBottom: '2.5rem', maxWidth: '750px', margin: '0 auto 2.5rem auto', lineHeight: 1.6 }}>
          Gangguan mistik hadir dalam pelbagai bentuk. Mengenal pasti jenis gangguan adalah langkah pertama untuk mendapatkan rawatan yang tepat.
        </p>

        {/* 5 Masalah Utama Grid (White Cards + Black Text) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {problems.map((p, idx) => (
            <div 
              key={idx}
              style={{
                background: '#FFFFFF',
                border: '2px solid #FDE047',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'left'
              }}
            >
              <img 
                src={p.img} 
                alt={p.title}
                style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block' }}
              />
              <div style={{ padding: '1.1rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 800, fontSize: '1rem', color: '#0F172A', lineHeight: 1.3 }}>
                    {p.title}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#374151', lineHeight: 1.5 }}>
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
