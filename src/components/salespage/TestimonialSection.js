'use client';

export default function TestimonialSection() {
  return (
    <section 
      style={{
        background: '#FEF3C7',
        color: '#06231C',
        padding: '3.5rem 1rem',
        fontFamily: 'var(--font-inter), -apple-system, sans-serif'
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        
        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#D97706', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          TESTIMONI PESAKIT (BAHAGIAN 1)
        </span>
        
        <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 800, color: '#06231C', marginTop: '0.4rem', marginBottom: '2rem', letterSpacing: '-0.02em' }}>
          Apa Kata Pesakit Yang Pernah Mendapatkan Rawatan ESyifaa
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          
          {/* Card 1: Video Pesakit Berkongsi Pengalaman */}
          <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '1.25rem', border: '1px solid #FCD34D', boxShadow: '0 4px 15px rgba(0,0,0,0.06)', textAlign: 'left' }}>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#B45309', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span>🎥</span> Video Pengalaman Pesakit
            </div>
            <div style={{ position: 'relative', paddingBottom: '75%', height: 0, borderRadius: '8px', overflow: 'hidden', background: '#000', marginBottom: '0.85rem' }}>
              <iframe 
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?controls=1" 
                title="Video Pengalaman Pesakit ESyifaa" 
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                allowFullScreen
              />
            </div>
            <p style={{ fontSize: '0.85rem', color: '#374151', margin: 0, lineHeight: 1.5, fontStyle: 'italic' }}>
              "Alhamdulillah selepas sesi konsultasi dan rawatan, badan berasa sangat ringan dan rasa cemas hilang..."
            </p>
          </div>

          {/* Card 2: Screenshot Komen Facebook */}
          <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '1.25rem', border: '1px solid #FCD34D', boxShadow: '0 4px 15px rgba(0,0,0,0.06)', textAlign: 'left' }}>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1D4ED8', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span>👍</span> Screenshot Komen Facebook
            </div>
            <div style={{ background: '#F3F4F6', borderRadius: '8px', padding: '1rem', border: '1px solid #E5E7EB', marginBottom: '0.85rem' }}>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#1F2937', marginBottom: '0.2rem' }}>Puan Noraini Hashim</div>
              <div style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '0.5rem' }}>Dikomen di Facebook ESyifaa</div>
              <p style={{ fontSize: '0.85rem', color: '#1F2937', margin: 0, lineHeight: 1.45 }}>
                "Terima kasih perawat ESyifaa. Sebelum ni hampir 3 bulan suami susah tidur dan selalu bertengkar. Lepas ikhtiar rawatan jarak jauh ni rumah rasa lebih tenang dan husband lena tidur."
              </p>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>✓ Disahkan dari Facebook</div>
          </div>

          {/* Card 3: Screenshot WhatsApp */}
          <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '1.25rem', border: '1px solid #FCD34D', boxShadow: '0 4px 15px rgba(0,0,0,0.06)', textAlign: 'left' }}>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#047857', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span>💬</span> Screenshot WhatsApp Pesakit
            </div>
            <div style={{ background: '#DCFCE7', borderRadius: '8px', padding: '1rem', border: '1px solid #86EFAC', marginBottom: '0.85rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#166534', marginBottom: '0.3rem' }}>Mesej WhatsApp Asal</div>
              <p style={{ fontSize: '0.85rem', color: '#14532D', margin: 0, lineHeight: 1.45 }}>
                "Salam ustaz, alhamdulillah malam tadi saya tidur xde dah mimpi bukan2. Bangun pagi subuh rasa segar sangat. Syukur sangat dipertemukan dgn ESyifaa..."
              </p>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>✓ Perbualan Rasmi WhatsApp</div>
          </div>

        </div>

      </div>
    </section>
  );
}
