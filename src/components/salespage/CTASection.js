'use client';

export default function CTASection() {
  const scrollToForm = (e) => {
    e.preventDefault();
    const el = document.getElementById('apply-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* SECTION 7 – TESTIMONI BUKTI */}
      <section className="section-mvsyifaa">
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="badge-mvsyifaa">💬 PENGALAMAN BENAR</span>

          <h2 className="section-title-mvsyifaa" style={{ textAlign: 'center' }}>
            Betul Ke Rawatan Jarak Jauh Ni Membantu?
          </h2>

          <p className="section-desc-mvsyifaa" style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2.5rem auto' }}>
            Jom baca pengalaman mereka yang pernah mendapatkan rawatan.
          </p>

          <div className="grid-2-mvsyifaa" style={{ gap: '1.75rem', maxWidth: '900px', margin: '0 auto' }}>
            
            {/* Testimoni 1 */}
            <div className="card-mvsyifaa" style={{ textAlign: 'center' }}>
              <div style={{ borderRadius: '12px', overflow: 'hidden', height: '160px', marginBottom: '1rem', border: '1px solid var(--yellow-box-border)' }}>
                <img src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=500&q=80" alt="Testimoni 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ fontSize: '0.85rem', color: '#15803D', fontWeight: 800, marginBottom: '0.5rem' }}>📱 Screenshot WhatsApp</div>
              <p style={{ fontStyle: 'italic', fontSize: '0.92rem', color: 'var(--font-dark-green)', margin: 0, textAlign: 'center', fontWeight: 600 }}>
                "Alhamdulillah selepas sesi ruqyah jarak jauh malam tadi, tidur terjaga langsung tak rasa takut lagi. Badan pun ringan."
              </p>
            </div>

            {/* Testimoni 2 */}
            <div className="card-mvsyifaa" style={{ textAlign: 'center' }}>
              <div style={{ borderRadius: '12px', overflow: 'hidden', height: '160px', marginBottom: '1rem', border: '1px solid var(--yellow-box-border)' }}>
                <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=500&q=80" alt="Testimoni 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ fontSize: '0.85rem', color: '#1D4ED8', fontWeight: 800, marginBottom: '0.5rem' }}>👍 Perkongsian Facebook</div>
              <p style={{ fontStyle: 'italic', fontSize: '0.92rem', color: 'var(--font-dark-green)', margin: 0, textAlign: 'center', fontWeight: 600 }}>
                "Terima kasih team MV Syifaa'. Suasana rumah dah tenang, anak-anak tak menangis malam lagi."
              </p>
            </div>

            {/* Testimoni 3 */}
            <div className="card-mvsyifaa" style={{ textAlign: 'center' }}>
              <div style={{ borderRadius: '12px', overflow: 'hidden', height: '160px', marginBottom: '1rem', border: '1px solid var(--yellow-box-border)' }}>
                <img src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=500&q=80" alt="Testimoni 3" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ fontSize: '0.85rem', color: '#B45309', fontWeight: 800, marginBottom: '0.5rem' }}>🎥 Ulasan Pelanggan</div>
              <p style={{ fontStyle: 'italic', fontSize: '0.92rem', color: 'var(--font-dark-green)', margin: 0, textAlign: 'center', fontWeight: 600 }}>
                "Sangat mudah tak perlu travel jauh. Bacaan ayat jelas dan bimbingan amalan sangat membantu."
              </p>
            </div>

            {/* Testimoni 4 */}
            <div className="card-mvsyifaa" style={{ textAlign: 'center' }}>
              <div style={{ borderRadius: '12px', overflow: 'hidden', height: '160px', marginBottom: '1rem', border: '1px solid var(--yellow-box-border)' }}>
                <img src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=500&q=80" alt="Testimoni 4" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ fontSize: '0.85rem', color: '#15803D', fontWeight: 800, marginBottom: '0.5rem' }}>📱 Screenshot WhatsApp</div>
              <p style={{ fontStyle: 'italic', fontSize: '0.92rem', color: 'var(--font-dark-green)', margin: 0, textAlign: 'center', fontWeight: 600 }}>
                "Sakit leher dan sengal badan bertahun hilangkan diri. Syukur ke hadrat Allah SWT."
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 8 – CTA BANNER */}
      <section className="section-mvsyifaa bg-green-blend-mvsyifaa" style={{ padding: '4.5rem 1rem', textAlign: 'center' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto' }}>
          <span className="badge-mvsyifaa">
            ✨ KONSULTASI AWAL
          </span>

          <h2 style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--yellow-font)', marginBottom: '1rem', textAlign: 'center' }}>
            Jangan Biarkan Masalah Ni Terus Ganggu Hidup Anda
          </h2>

          <p style={{ color: 'var(--font-white)', fontSize: '1.05rem', lineHeight: 1.65, marginBottom: '2rem', textAlign: 'center', opacity: 0.95 }}>
            Kalau anda dah lama alami keadaan yang susah nak dijelaskan dan ingin berikhtiar melalui rawatan Islam, isi borang di bawah. Team kami akan hubungi anda untuk konsultasi awal supaya kami dapat faham keadaan yang anda alami.
          </p>

          <a 
            href="#apply-form" 
            onClick={scrollToForm} 
            className="btn-mvsyifaa primary-btn"
            style={{ padding: '1.15rem 2.5rem', fontSize: '1.1rem' }}
          >
            👇 Klik Butang Di Bawah &amp; Isi Borang Sekarang
          </a>
        </div>
      </section>
    </>
  );
}
