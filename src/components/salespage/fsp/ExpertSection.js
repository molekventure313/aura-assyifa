'use client';

export default function FspExpertSection() {
  const dalils = [
    {
      arabic: 'وَنُنَزِّلُ مِنَ ٱلْقُرْءَانِ مَا هُوَ شِفَآءٌ وَرَحْمَةٌ لِّلْمُؤْمِنِينَ',
      translation: '"Dan Kami turunkan dari Al-Quran sesuatu yang menjadi penawar dan rahmat bagi orang-orang yang beriman."',
      source: 'Surah Al-Isra\' (17:82)'
    },
    {
      arabic: 'وَإِذَا مَرِضْتُ فَهُوَ يَشْفِينِ',
      translation: '"Dan apabila aku sakit, Dialah (Allah) yang menyembuhkanku."',
      source: 'Surah Ash-Shu\'ara (26:80)'
    },
  ];

  const hadith = {
    text: '"Gunakanlah ruqyah (bacaan doa perlindungan) selama ia tidak mengandungi syirik."',
    source: 'Hadith Riwayat Muslim'
  };

  return (
    <section
      style={{
        background: '#042E23',
        color: '#FFFFFF',
        padding: '4rem 1rem',
        fontFamily: 'var(--font-inter), -apple-system, sans-serif'
      }}
    >
      <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>

        <span style={{
          fontSize: '0.75rem', fontWeight: 800, color: '#FDE047',
          textTransform: 'uppercase', letterSpacing: '0.12em'
        }}>
          DALIL & ASAS RAWATAN
        </span>

        <h2 style={{
          fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
          fontWeight: 800,
          color: '#FEF3C7',
          marginTop: '0.4rem',
          marginBottom: '0.6rem',
          letterSpacing: '-0.02em',
          lineHeight: 1.3
        }}>
          Rawatan Berasaskan Al-Quran & Sunnah Nabi ﷺ
        </h2>
        <p style={{
          fontSize: '1rem',
          color: '#A7F3D0',
          maxWidth: '600px',
          margin: '0 auto 2.5rem auto',
          lineHeight: 1.7
        }}>
          Aura Assyifa tidak menggunakan kaedah lagha atau syubhah. Setiap rawatan berlandaskan
          dalil yang sahih dari Al-Quran dan Hadith Nabi ﷺ.
        </p>

        {/* Ayat Al-Quran cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.25rem',
          marginBottom: '1.5rem'
        }}>
          {dalils.map((d, i) => (
            <div key={i} style={{
              background: 'linear-gradient(135deg, rgba(253,224,71,0.07) 0%, rgba(253,224,71,0.03) 100%)',
              border: '1.5px solid rgba(253,224,71,0.35)',
              borderRadius: '16px',
              padding: '1.8rem 1.5rem',
              textAlign: 'right'
            }}>
              <div style={{ fontSize: '1.15rem', fontFamily: 'serif', color: '#FDE047', lineHeight: 2, marginBottom: '1rem', direction: 'rtl' }}>
                {d.arabic}
              </div>
              <div style={{ borderTop: '1px solid rgba(253,224,71,0.2)', paddingTop: '1rem', textAlign: 'left' }}>
                <p style={{ margin: '0 0 0.4rem 0', fontSize: '0.88rem', color: '#FEF3C7', lineHeight: 1.7, fontStyle: 'italic', fontWeight: 500 }}>
                  {d.translation}
                </p>
                <span style={{ fontSize: '0.75rem', color: '#6EE7B7', fontWeight: 700 }}>{d.source}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Hadith */}
        <div style={{
          background: 'rgba(74, 222, 128, 0.08)',
          border: '1.5px solid rgba(74, 222, 128, 0.3)',
          borderRadius: '14px',
          padding: '1.5rem 1.8rem',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <span style={{ fontSize: '1.5rem' }}>📖</span>
          <p style={{ margin: '0.6rem 0 0.4rem 0', fontSize: '1rem', color: '#FEF3C7', fontStyle: 'italic', lineHeight: 1.75, fontWeight: 500 }}>
            {hadith.text}
          </p>
          <span style={{ fontSize: '0.8rem', color: '#6EE7B7', fontWeight: 700 }}>{hadith.source}</span>
        </div>

        {/* Placeholder pakar — boleh replace dengan video ustaz */}
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px dashed rgba(253,224,71,0.3)',
          borderRadius: '14px',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%',
            background: 'rgba(253,224,71,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2.5rem'
          }}>
            🎓
          </div>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#A7F3D0', lineHeight: 1.6, maxWidth: '500px' }}>
            <strong style={{ color: '#FDE047' }}>Video pengesahan pakar industri</strong> — akan ditambah tidak lama lagi.
            Rawatan Aura Assyifa telah disaksikan dan disahkan oleh individu-individu yang berkelayakan dalam bidang ruqyah syariyyah.
          </p>
        </div>

      </div>
    </section>
  );
}
