'use client';

export default function ProblemSection() {
  const problems = [
    {
      num: 1,
      title: "Selalu mimpi buruk atau terkejut waktu tidur",
      img: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80",
      desc: "Sering bermimpi dikejar makhluk, jatuh tempat tinggi, atau terjaga dalam keadaan lemas & terkejut."
    },
    {
      num: 2,
      title: "Susah tidur atau selalu terjaga tengah malam",
      img: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
      desc: "Mata segar di waktu malam, selalu terbangun sekitar jam 2 hingga 4 pagi tanpa punca yang jelas."
    },
    {
      num: 3,
      title: "Rasa takut tanpa sebab walaupun berada di rumah",
      img: "https://images.unsplash.com/photo-1508672019048-805479767c21?auto=format&fit=crop&w=600&q=80",
      desc: "Perasaan diekori, diperhatikan, atau meremang bulu roma di kawasan rumah sendiri."
    },
    {
      num: 4,
      title: "Badan selalu berat, lesu atau sakit, tapi doktor kata tiada masalah serius",
      img: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=600&q=80",
      desc: "Bahu dan tengkuk rasa lenguh serta ditekan berat, pemeriksaan hospital keputusan normal."
    },
    {
      num: 5,
      title: "Cepat marah, selalu sedih atau menangis tanpa sebab",
      img: "https://images.unsplash.com/photo-1499209974431-9dac3cea0047?auto=format&fit=crop&w=600&q=80",
      desc: "Emosi tidak stabil secara tiba-tiba, dada rasa sebak, sedih berpanjangan tanpa sebarang punca."
    },
    {
      num: 6,
      title: "Selalu bergaduh dalam keluarga tanpa sebab yang jelas",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
      desc: "Rumah tangga tegang, perkara kecil menjadi perbalahan besar, panas bila berada di rumah."
    }
  ];

  return (
    <section className="section-esyifaa bg-green-blend-esyifaa">
      <div className="container" style={{ textAlign: 'center' }}>
        <span className="badge-esyifaa">
          ⚠️ KENAL PASTI SIMPTOM GANGGUAN
        </span>
        
        <h2 className="section-title-esyifaa" style={{ textAlign: 'center' }}>
          Anda Ada Alami Masalah-Masalah Ni?
        </h2>
        
        <p className="section-desc-esyifaa" style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 2.5rem auto' }}>
          Ramai ingat semua ni cuma sebab stres atau penat bekerja. Tapi kalau dah lama berlaku dan tak tahu puncanya, ia boleh ganggu emosi, kerja, keluarga dan ibadah.
        </p>

        <div className="grid-3-esyifaa" style={{ gap: '1.75rem' }}>
          {problems.map((p) => (
            <div key={p.num} className="card-esyifaa" style={{ textAlign: 'center', padding: '1.35rem' }}>
              <div style={{ position: 'relative', borderRadius: '14px', overflow: 'hidden', height: '180px', marginBottom: '1.25rem', border: '1px solid var(--yellow-box-border)' }}>
                <img 
                  src={p.img} 
                  alt={p.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '10px', left: '10px', width: '34px', height: '34px', borderRadius: '50%', background: 'var(--green-forest-dark)', color: 'var(--yellow-font)', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.95rem' }}>
                  {p.num}
                </div>
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--font-dark-green)', marginBottom: '0.5rem', lineHeight: 1.4, textAlign: 'center' }}>
                {p.title}
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--font-muted-dark)', lineHeight: 1.55, textAlign: 'center', margin: 0 }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

