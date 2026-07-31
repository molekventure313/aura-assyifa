'use client';

export default function TestimonialSection() {
  return (
    <section className="section-mvsyifaa">
      <div className="container" style={{ textAlign: 'center' }}>
        <span className="badge-mvsyifaa">💬 PERKONGSIAN PENERIMA RAWATAN</span>
        
        <h2 className="section-title-mvsyifaa" style={{ textAlign: 'center' }}>
          Alhamdulillah... Ramai Yang Kongsi Perubahan Positif Selepas Mendapatkan Rawatan
        </h2>
        
        <p className="section-desc-mvsyifaa" style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2.5rem auto' }}>
          Setiap orang alami keadaan yang berbeza. Tapi ramai yang berkongsi mereka mula rasa lebih tenang selepas mendapatkan rawatan.
        </p>

        <div className="grid-3-mvsyifaa" style={{ gap: '2rem' }}>
          
          {/* Testimoni A */}
          <div className="card-mvsyifaa" style={{ textAlign: 'center' }}>
            <div style={{ borderRadius: '16px', overflow: 'hidden', marginBottom: '1.25rem', height: '200px', border: '1px solid var(--yellow-box-border)' }}>
              <img 
                src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=600&q=80" 
                alt="Pelanggan bersama keluarga" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ fontSize: '1.25rem', color: '#D97706', marginBottom: '0.5rem' }}>⭐⭐⭐⭐⭐</div>
            <p style={{ fontStyle: 'italic', color: 'var(--font-dark-green)', fontSize: '0.95rem', lineHeight: 1.6, textAlign: 'center', fontWeight: 600 }}>
              "Saya dah boleh tidur lena semula. Sebelum ni hampir setiap malam mimpi buruk."
            </p>
            <span style={{ display: 'block', marginTop: '0.75rem', fontSize: '0.825rem', fontWeight: 800, color: 'var(--green-emerald-mid)' }}>
              - Puan Hajah N. (Keluarga Bahagia)
            </span>
          </div>

          {/* Testimoni B - FB Review Style */}
          <div className="card-mvsyifaa" style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '1.5rem', color: '#1877F2' }}>👍</span>
              <span style={{ fontWeight: 800, fontSize: '0.9rem', color: '#1877F2' }}>Perkongsian Facebook</span>
            </div>
            <div style={{ fontSize: '1.25rem', color: '#D97706', marginBottom: '0.5rem' }}>⭐⭐⭐⭐⭐</div>
            <p style={{ fontStyle: 'italic', color: 'var(--font-dark-green)', fontSize: '0.95rem', lineHeight: 1.6, textAlign: 'center', fontWeight: 600 }}>
              "Alhamdulillah... beberapa hari lepas rawatan, badan dah rasa lebih ringan."
            </p>
            <span style={{ display: 'block', marginTop: '0.75rem', fontSize: '0.825rem', fontWeight: 800, color: 'var(--green-emerald-mid)' }}>
              - Encik R. (Review Facebook)
            </span>
          </div>

          {/* Testimoni C - WhatsApp Style */}
          <div className="card-mvsyifaa" style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '1.5rem', color: '#25D366' }}>💬</span>
              <span style={{ fontWeight: 800, fontSize: '0.9rem', color: '#2E7D32' }}>Mesej WhatsApp</span>
            </div>
            <div style={{ fontSize: '1.25rem', color: '#D97706', marginBottom: '0.5rem' }}>⭐⭐⭐⭐⭐</div>
            <p style={{ fontStyle: 'italic', color: 'var(--font-dark-green)', fontSize: '0.95rem', lineHeight: 1.6, textAlign: 'center', fontWeight: 600 }}>
              "Terima kasih ustaz. Sekarang saya dah kurang rasa takut dan hati lebih tenang."
            </p>
            <span style={{ display: 'block', marginTop: '0.75rem', fontSize: '0.825rem', fontWeight: 800, color: '#2E7D32' }}>
              - Cik S. (Pengguna WhatsApp)
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
