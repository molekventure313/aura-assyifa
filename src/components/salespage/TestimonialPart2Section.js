'use client';

export default function TestimonialPart2Section() {
  const testimonials = [
    {
      type: '💬 Screenshot WhatsApp',
      name: 'Encik Khairul Nizam (Ipoh)',
      desc: 'Alhamdulillah bang, anak saya yang selalu meracau waktu malam dah tenang. Terima kasih perawat ESyifaa atas bimbingan dan doa ikhtiar.',
      bg: '#ECFDF5',
      border: '#A7F3D0',
      textColor: '#047857'
    },
    {
      type: '👍 Screenshot Facebook',
      name: 'Puan Suhaila Ahmad (Shah Alam)',
      desc: 'Sangat recommended. Masa sesi konsultasi ustaz terangkan satu-satu dengan sabar. Badan yang rasa lenguh2 teruk sebelum ni dah lega.',
      bg: '#EFF6FF',
      border: '#BFDBFE',
      textColor: '#1D4ED8'
    },
    {
      type: '🎥 Video Testimoni',
      name: 'Puan Maria & Suami (Johor)',
      desc: 'Video perbuktian pesakit menceritakan bagaimana gangguan di rumah mereka beransur hilang selepas sesi rawatan patuh syariah.',
      bg: '#FEF3C7',
      border: '#FDE047',
      textColor: '#B45309'
    },
    {
      type: '📸 Gambar Pesakit Bersama Testimoni',
      name: 'Ustaz Hafiz & Pesakit Hidayah',
      desc: 'Sesi susulan bersama pesakit yang telah kembali mampu tidur lena dan fokus beribadah tanpa gangguan emosi.',
      bg: '#F3E8FF',
      border: '#E9D5FF',
      textColor: '#7E22CE'
    }
  ];

  return (
    <section 
      style={{
        background: '#0B382D',
        color: '#FFFFFF',
        padding: '3.5rem 1rem',
        fontFamily: 'var(--font-inter), -apple-system, sans-serif'
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        
        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FDE047', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          TESTIMONI PESAKIT (BAHAGIAN 2)
        </span>

        <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 800, color: '#FDE047', marginTop: '0.4rem', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
          Betulkah ESyifaa Membantu Pesakit Yang Mengalami Gangguan Mistik?
        </h2>

        <p style={{ fontSize: '1rem', color: '#FFFFFF', marginBottom: '2.5rem' }}>
          Lihat sendiri pengalaman mereka yang telah mendapatkan rawatan ESyifaa.
        </p>

        {/* Minimum 4 Testimoni Grid (White Cards + Hitam Text) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.35rem' }}>
          {testimonials.map((t, idx) => (
            <div 
              key={idx}
              style={{
                background: '#FFFFFF',
                borderRadius: '12px',
                padding: '1.25rem',
                border: '2px solid #FDE047',
                boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: t.textColor, background: t.bg, border: `1px solid ${t.border}`, padding: '0.25rem 0.6rem', borderRadius: '4px', width: 'fit-content', marginBottom: '0.75rem' }}>
                  {t.type}
                </div>
                <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0F172A', marginBottom: '0.4rem' }}>
                  {t.name}
                </div>
                <p style={{ fontSize: '0.875rem', color: '#374151', margin: 0, lineHeight: 1.5, fontStyle: 'italic', fontWeight: 500 }}>
                  "{t.desc}"
                </p>
              </div>
              <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px dashed #CBD5E1', fontSize: '0.75rem', color: '#059669', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span>✓</span> Testimoni Sah ESyifaa
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
