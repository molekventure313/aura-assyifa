'use client';

export default function HeroSection() {
  const scrollToForm = (e) => {
    e.preventDefault();
    const el = document.getElementById('apply-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="hero-mvsyifaa">
      <div className="container" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Top Navbar Brand */}
        <div className="topbar-mvsyifaa">
          <div className="brandmark-mvsyifaa">
            <span className="logo-icon-mvsyifaa">🌿</span>
            <div className="brand-text-wrapper">
              <span className="brand-title-mvsyifaa">MV SYIFAA'</span>
              <small className="brand-sub-mvsyifaa">Rawatan Jarak Jauh Islam</small>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="hero-inner-mvsyifaa" style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto' }}>
          <span className="badge-mvsyifaa">✨ PERIKHTIARAN RAWATAN ISLAM</span>
          
          <h1 className="hero-headline-mvsyifaa" style={{ textAlign: 'center' }}>
            "Alhamdulillah, Tak Sangka Rawatan Jarak Jauh Bantu Hilangkan Rasa Tak Tenang, Selalu Diganggu dan Susah Tidur Malam"
          </h1>
          
          <p className="hero-desc-mvsyifaa" style={{ textAlign: 'center' }}>
            Bayangkan anda boleh tidur lena semula, bangun dengan badan lebih ringan, hati lebih tenang dan kembali jalani hidup seperti biasa.
          </p>

          <div className="hero-highlights-mvsyifaa">
            <div className="highlight-pill">✓ Rawatan Dilakukan Secara Jarak Jauh (Tak Perlu Datang Pusat Rawatan)</div>
            <div className="highlight-pill">✓ Kaedah Berlandaskan Syarak Menggunakan Ayat Al-Quran &amp; Doa</div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#apply-form" onClick={scrollToForm} className="btn-mvsyifaa primary-btn">
              ✨ Dapatkan Konsultasi &amp; Rawatan
            </a>
          </div>

          {/* Stock Image - Peaceful Praying Person */}
          <div className="hero-image-container" style={{ marginTop: '2.5rem', width: '100%', maxWidth: '720px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 45px rgba(0,0,0,0.3)', border: '4px solid var(--yellow-box-border)' }}>
            <img 
              src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80" 
              alt="Individu berdoa dengan wajah tenang" 
              style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '420px', objectFit: 'cover' }}
            />
            <div style={{ padding: '0.85rem', background: 'var(--yellow-box-bg)', fontSize: '0.9rem', color: 'var(--font-dark-green)', fontWeight: 700 }}>
              🤍 Kembali tenang &amp; khusyuk beribadah dari keselesaan kediaman anda
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
