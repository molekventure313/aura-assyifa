'use client';

import PageViewTracker from '@/components/salespage/PageViewTracker';

// ─── Nombor WhatsApp — tukar kepada nombor sebenar ───
const WA_NUMBER = '60XXXXXXXXXX';
const WA_MESSAGE = encodeURIComponent("Assalamualaikum, saya berminat untuk mendapatkan Tasbih Aura Assyifa. Boleh saya tahu maklumat lanjut?");
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

function WAButton({ label = '👉 Saya Mahu Tasbih Aura Assyifa\'', size = 'large', id = 'cta-wa' }) {
  const isLarge = size === 'large';
  return (
    <a
      id={id}
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => { try { window.fbq('track', 'InitiateCheckout'); } catch (_) {} }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.55rem',
        padding: isLarge ? '1.15rem 2.4rem' : '0.85rem 1.8rem',
        fontSize: isLarge ? '1.1rem' : '0.95rem',
        fontWeight: 800,
        color: '#042E23',
        background: 'linear-gradient(180deg, #FDE047 0%, #EAB308 100%)',
        borderRadius: '50px',
        textDecoration: 'none',
        boxShadow: '0 10px 25px rgba(234,179,8,0.45)',
        border: '2px solid #FEF08A',
        letterSpacing: '-0.01em',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 30px rgba(234,179,8,0.55)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(234,179,8,0.45)'; }}
    >
      {label}
    </a>
  );
}

// ─── Data ──────────────────────────────────────────────────────────────────

const PROBLEMS = [
  {
    icon: '🔄',
    title: 'Jin keluar masa rawatan... tapi datang balik',
    desc: 'Perawat bantu buang jin semasa sesi. Tapi apabila balik rumah, sihir dihantar semula. Jin datang lagi. Kitaran ini tidak pernah selesai.',
  },
  {
    icon: '💸',
    title: 'Kos & tenaga terkuras — ulang alik tak habis',
    desc: 'Setiap kali serangan baru, kena pergi semula berjumpa perawat. Kos tambang, kos rawatan, masa terbuang — dan masalah tetap berulang.',
  },
  {
    icon: '💧',
    title: 'Air penawar habis, perlindungan terputus',
    desc: 'Air yang dibacakan akan habis. Bila habis, tiada perlindungan. Terpaksa tunggu dapatkan bekalan baru — sementara itu anda terdedah.',
  },
  {
    icon: '🎯',
    title: 'Sihir berat dihantar berulang kali',
    desc: 'Ada kes di mana sihir sengaja dihantar berkali-kali. Satu rawatan tidak pernah cukup. Anda memerlukan perlindungan yang sentiasa bersama.',
  },
];

const KEGUNAAN = [
  {
    no: '01',
    icon: '🌿',
    title: 'Rawatan Kendiri Terus',
    desc: 'Genggam & gunakan terus bila rasa diserang atau tidak selesa. Boleh rawat diri sendiri 24/7 tanpa perlu bergantung pada perawat.',
  },
  {
    no: '02',
    icon: '💧',
    title: 'Buat Air Penawar Sendiri',
    desc: 'Boleh gunakan tasbih untuk buat air penawar bagi memusnahkan & membersihkan diri daripada jin.',
  },
  {
    no: '03',
    icon: '🚿',
    title: 'Air Mandian Ruqyah',
    desc: 'Boleh digunakan untuk buat air mandian — membersihkan diri dari jin & perlindungan dari luar.',
  },
  {
    no: '04',
    icon: '🛡️',
    title: 'Perlindungan 24 Jam',
    desc: 'Rawat diri sendiri 24/7 tanpa perlu bergantung pada perawat. Serang malam pun boleh guna terus.',
  },
];

const KELEBIHAN = [
  { icon: '♾️', title: 'Rawatan Tanpa Had', desc: 'Tidak ada had bilangan rawatan. Guna setiap hari, setiap minggu — tasbih tidak pernah habis.' },
  { icon: '🏠', title: 'Rawat Di Rumah Sendiri', desc: 'Dalam keselesaan rumah anda. Tiada perlu keluar, tiada perlu buat appointment.' },
  { icon: '💰', title: 'Jimat Kos Jangka Panjang', desc: 'Bayar sekali, guna seumur hidup. Bandingkan dengan kos ulang alik ke perawat.' },
  { icon: '⚡', title: 'Bertindak Balas Segera', desc: 'Diserang malam-malam? Tidak perlu tunggu appointment. Gunakan tasbih terus ketika itu.' },
  { icon: '👨‍👩‍👧', title: 'Untuk Seluruh Keluarga', desc: 'Satu tasbih boleh membantu ahli keluarga yang lain — isteri, suami, anak-anak.' },
  { icon: '📖', title: 'Ruqyah Syar\'iyyah', desc: 'Diisi oleh perawat Aura Assyifa dengan bacaan al-Quran dan doa berlandaskan syarak semata-mata.' },
];

const UNTUK_SIAPA = [
  'Dah berubat banyak kali tapi gangguan masih berulang',
  'Kes sihir atau santau yang dihantar berkali-kali',
  'Nak jimat kos — tidak mahu ulang alik ke perawat',
  'Ingin boleh rawat sendiri bila-bila masa diserang',
  'Ada ahli keluarga yang memerlukan rawatan juga',
  'Kes berat yang memerlukan rawatan berterusan jangka panjang',
];

const FAQS = [
  {
    q: 'Adakah tasbih ini menggantikan rawatan dengan perawat?',
    a: 'Tasbih Aura Assyifa\' adalah pelengkap kepada rawatan, bukan pengganti. Ia memberikan anda keupayaan untuk meneruskan rawatan sendiri di antara sesi, atau untuk kes yang memerlukan rawatan berterusan setiap hari.',
  },
  {
    q: 'Apakah bacaan yang diisikan ke dalam tasbih?',
    a: 'Tasbih diisi dengan bacaan ayat-ayat ruqyah syar\'iyyah daripada al-Quran dan doa-doa yang sabit daripada Sunnah. Semua bacaan berlandaskan syarak, tiada unsur syirik.',
  },
  {
    q: 'Berapa lama masa untuk siapkan satu tasbih?',
    a: 'Setiap tasbih mengambil masa yang lama untuk diisikan kerana proses bacaan ruqyah yang teliti dan menyeluruh. Inilah sebab stok kami adalah terhad pada setiap masa.',
  },
  {
    q: 'Adakah sesuai untuk kanak-kanak?',
    a: 'Ya, boleh digunakan untuk membantu kanak-kanak — terutama yang mengalami gangguan tidur, kerap menangis tanpa sebab, atau menunjukkan simptom gangguan.',
  },
  {
    q: 'Bagaimana cara penghantaran?',
    a: 'Kami menghantar ke seluruh Malaysia melalui pos berdaftar. Maklumat tracking akan dikongsi selepas penghantaran dilakukan.',
  },
  {
    q: 'Panduan cara guna akan diberikan?',
    a: 'Ya. Panduan lengkap cara penggunaan Tasbih Aura Assyifa\' akan diberikan bersama penghantaran. Mudah — cukup berniat, berdoa kepada Allah dan yakin dengan izin-Nya.',
  },
];

// ─── Component ─────────────────────────────────────────────────────────────

export default function TasbihEsyifaPage() {

  const S = {
    section: {
      background: '#042E23',
      color: '#FFFFFF',
      padding: '4rem 1rem',
      fontFamily: 'var(--font-inter), -apple-system, sans-serif',
    },
    sectionAlt: {
      background: '#031E17',
      color: '#FFFFFF',
      padding: '4rem 1rem',
      fontFamily: 'var(--font-inter), -apple-system, sans-serif',
    },
    container: { maxWidth: '900px', margin: '0 auto' },
    badge: {
      display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
      background: 'rgba(254,224,71,0.15)', border: '1px solid #FDE047',
      padding: '0.4rem 1.1rem', borderRadius: '50px', marginBottom: '1.25rem',
      fontSize: '0.78rem', fontWeight: 800, color: '#FDE047',
      letterSpacing: '0.08em', textTransform: 'uppercase',
    },
    h2: {
      fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
      fontWeight: 800, color: '#FDE047',
      marginTop: '0.4rem', marginBottom: '0.75rem',
      letterSpacing: '-0.02em', lineHeight: 1.25,
    },
    subtext: {
      fontSize: '1rem', color: '#D1FAE5',
      lineHeight: 1.65, maxWidth: '720px',
      margin: '0 auto', marginBottom: '2.5rem',
    },
  };

  return (
    <main style={{ background: '#042E23', minHeight: '100vh' }}>
      <PageViewTracker slug="tasbih-esyifa" />

      {/* ═══════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════ */}
      <section style={{ ...S.section, padding: '4rem 1rem 3rem', textAlign: 'center' }}>
        <div style={S.container}>
          <div style={S.badge}>🌿 Aura Assyifa · Tasbih Ruqyah Syar&apos;iyyah</div>

          <h1 style={{
            fontSize: 'clamp(1.8rem, 4.5vw, 2.8rem)',
            fontWeight: 800, lineHeight: 1.2,
            color: '#FDE047', marginBottom: '1.25rem',
            letterSpacing: '-0.02em',
          }}>
            Kes Gangguan Berulang?{' '}
            <span style={{ color: '#4ADE80' }}>Kini Rawat Sendiri</span>{' '}
            Tanpa Perlu Bergantung Pada Perawat
          </h1>

          <p style={{ ...S.subtext, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
            <strong style={{ color: '#FDE047' }}>Tasbih Aura Assyifa&apos;</strong> — diisi dengan bacaan ayat-ayat ruqyah syar&apos;iyyah.
            Satu pelaburan, rawatan tanpa had, boleh guna seumur hidup.
          </p>

          {/* Stok Terhad Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(239,68,68,0.15)', border: '1px solid #EF4444',
            padding: '0.45rem 1.1rem', borderRadius: '50px',
            marginBottom: '2rem',
            fontSize: '0.82rem', fontWeight: 700, color: '#FCA5A5',
          }}>
            ⚠️ STOK TERHAD — Setiap tasbih mengambil masa lama untuk diisikan
          </div>

          {/* Placeholder Tasbih Image */}
          <div style={{
            width: '220px', height: '220px', borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, #1A5C42, #042E23)',
            border: '4px solid #FDE047',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 2.5rem auto',
            boxShadow: '0 0 60px rgba(74,222,128,0.25), 0 20px 40px rgba(0,0,0,0.4)',
          }}>
            <span style={{ fontSize: '4rem', marginBottom: '0.25rem' }}>📿</span>
            <span style={{ fontSize: '0.75rem', color: '#FDE047', fontWeight: 700, letterSpacing: '0.05em' }}>TASBIH Aura Assyifa&apos;</span>
          </div>

          <WAButton id="cta-hero" />

          <p style={{ marginTop: '1rem', fontSize: '0.82rem', color: '#6EE7B7', opacity: 0.8 }}>
            Hubungi kami melalui WhatsApp untuk maklumat lanjut &amp; cara pembelian
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PERBANDINGAN — Air vs Tasbih
      ═══════════════════════════════════════════ */}
      <section style={{ ...S.sectionAlt, textAlign: 'center' }}>
        <div style={S.container}>
          <div style={S.badge}>💡 Kenapa Tasbih?</div>
          <h2 style={S.h2}>Ibarat Air Penawar — Tapi Tidak Pernah Habis</h2>
          <p style={S.subtext}>
            Air penawar berkesan, tetapi ia habis. Bila habis, perlindungan anda terputus.
            Tasbih Aura Assyifa&apos; membawa bacaan ruqyah yang kekal — boleh digunakan berulang kali tanpa had.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            gap: '1rem',
            alignItems: 'stretch',
            maxWidth: '700px', margin: '0 auto',
          }}>
            {/* Air Penawar */}
            <div style={{
              background: 'rgba(239,68,68,0.08)', border: '2px solid rgba(239,68,68,0.3)',
              borderRadius: '16px', padding: '1.75rem 1.25rem', textAlign: 'left',
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem', textAlign: 'center' }}>💧</div>
              <div style={{ fontWeight: 800, color: '#FCA5A5', marginBottom: '1rem', textAlign: 'center', fontSize: '1rem' }}>Air Penawar</div>
              {['Berkesan', 'Habis digunakan', 'Perlu isi semula', 'Terhad untuk minum', 'Bergantung pada bekalan'].map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem', fontSize: '0.88rem', color: i === 0 ? '#6EE7B7' : '#FCA5A5' }}>
                  <span>{i === 0 ? '✅' : '❌'}</span> {t}
                </div>
              ))}
            </div>

            {/* VS */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{
                background: '#FDE047', color: '#042E23',
                fontWeight: 900, fontSize: '0.85rem',
                padding: '0.5rem 0.75rem', borderRadius: '50px',
                boxShadow: '0 4px 12px rgba(234,179,8,0.4)',
              }}>VS</div>
            </div>

            {/* Tasbih */}
            <div style={{
              background: 'rgba(74,222,128,0.08)', border: '2px solid rgba(74,222,128,0.35)',
              borderRadius: '16px', padding: '1.75rem 1.25rem', textAlign: 'left',
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem', textAlign: 'center' }}>📿</div>
              <div style={{ fontWeight: 800, color: '#4ADE80', marginBottom: '1rem', textAlign: 'center', fontSize: '1rem' }}>Tasbih Aura Assyifa&apos;</div>
              {['Berkesan', 'Tidak pernah habis', 'Guna berulang kali', 'Pelbagai kegunaan', 'Rawat sendiri 24/7'].map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem', fontSize: '0.88rem', color: '#6EE7B7' }}>
                  <span>✅</span> {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PROBLEM
      ═══════════════════════════════════════════ */}
      <section style={{ ...S.section, textAlign: 'center' }}>
        <div style={S.container}>
          <div style={S.badge}>⚠️ Kenali Masalah Anda</div>
          <h2 style={S.h2}>Kenapa Rawatan Luar Sahaja Tidak Cukup Untuk Kes Berat?</h2>
          <p style={S.subtext}>
            Ramai pesakit rasa lega selepas rawatan — tapi gangguan datang balik. Ini bukan salah perawat.
            Ini realiti kes sihir &amp; gangguan berat yang memerlukan perlindungan berterusan.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem', textAlign: 'left' }}>
            {PROBLEMS.map((p, i) => (
              <div key={i} style={{
                background: '#064E3B', border: '1px solid rgba(254,224,71,0.2)',
                borderRadius: '14px', padding: '1.5rem',
                boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{p.icon}</div>
                <div style={{ fontWeight: 800, color: '#FDE047', marginBottom: '0.5rem', fontSize: '0.95rem', lineHeight: 1.3 }}>{p.title}</div>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#D1FAE5', lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          KEGUNAAN
      ═══════════════════════════════════════════ */}
      <section style={{ ...S.sectionAlt, textAlign: 'center' }}>
        <div style={S.container}>
          <div style={S.badge}>📿 Cara Guna</div>
          <h2 style={S.h2}>4 Cara Guna Tasbih Aura Assyifa&apos;</h2>
          <p style={S.subtext}>
            Cara penggunaan yang mudah — cukup berniat, berdoa kepada Allah &amp; yakin dengan izin-Nya.
            Panduan lengkap akan diberikan selepas pembelian.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', textAlign: 'left' }}>
            {KEGUNAAN.map((k, i) => (
              <div key={i} style={{
                background: '#042E23', border: '2px solid rgba(74,222,128,0.25)',
                borderRadius: '16px', padding: '1.5rem',
                boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', top: '1rem', right: '1rem',
                  fontSize: '2rem', fontWeight: 900, color: 'rgba(74,222,128,0.1)',
                  lineHeight: 1, fontFamily: 'monospace',
                }}>{k.no}</div>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{k.icon}</div>
                <div style={{ fontWeight: 800, color: '#4ADE80', marginBottom: '0.5rem', fontSize: '0.95rem' }}>{k.title}</div>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#D1FAE5', lineHeight: 1.6 }}>{k.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          KELEBIHAN
      ═══════════════════════════════════════════ */}
      <section style={{ ...S.section, textAlign: 'center' }}>
        <div style={S.container}>
          <div style={S.badge}>⭐ Kelebihan Utama</div>
          <h2 style={S.h2}>Kelebihan Yang Tidak Ada Pada Rawatan Luar Biasa</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', textAlign: 'left' }}>
            {KELEBIHAN.map((k, i) => (
              <div key={i} style={{
                background: '#064E3B', border: '1px solid rgba(254,224,71,0.15)',
                borderRadius: '14px', padding: '1.5rem',
                display: 'flex', gap: '1rem', alignItems: 'flex-start',
              }}>
                <span style={{ fontSize: '1.75rem', lineHeight: 1, flexShrink: 0 }}>{k.icon}</span>
                <div>
                  <div style={{ fontWeight: 800, color: '#FDE047', marginBottom: '0.35rem', fontSize: '0.92rem' }}>{k.title}</div>
                  <p style={{ margin: 0, fontSize: '0.83rem', color: '#D1FAE5', lineHeight: 1.55 }}>{k.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          UNTUK SIAPA
      ═══════════════════════════════════════════ */}
      <section style={{ ...S.sectionAlt, textAlign: 'center' }}>
        <div style={S.container}>
          <div style={S.badge}>👤 Untuk Siapa</div>
          <h2 style={S.h2}>Tasbih Aura Assyifa&apos; Sesuai Untuk Anda Jika...</h2>

          <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'left' }}>
            {UNTUK_SIAPA.map((s, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                padding: '0.85rem 0', borderBottom: i < UNTUK_SIAPA.length - 1 ? '1px solid rgba(74,222,128,0.12)' : 'none',
              }}>
                <span style={{ color: '#4ADE80', fontWeight: 800, fontSize: '1.1rem', flexShrink: 0, marginTop: '0.05rem' }}>✔</span>
                <span style={{ fontSize: '0.97rem', color: '#D1FAE5', lineHeight: 1.5 }}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PRICING & ORDER
      ═══════════════════════════════════════════ */}
      <section style={{ ...S.section, textAlign: 'center' }}>
        <div style={S.container}>
          <div style={S.badge}>🛒 Dapatkan Sekarang</div>
          <h2 style={S.h2}>Dapatkan Tasbih Aura Assyifa&apos; Anda</h2>

          {/* Urgency */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.4)',
            padding: '0.5rem 1.25rem', borderRadius: '50px',
            marginBottom: '2rem',
            fontSize: '0.85rem', fontWeight: 700, color: '#FCA5A5',
          }}>
            🔴 STOK TERHAD — Setiap tasbih mengambil masa lama untuk diisikan
          </div>

          {/* Pricing Card */}
          <div style={{
            maxWidth: '420px', margin: '0 auto 2rem auto',
            background: 'linear-gradient(135deg, #064E3B 0%, #042E23 100%)',
            border: '3px solid #FDE047',
            borderRadius: '24px', padding: '2.5rem 2rem',
            boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
          }}>
            {/* Product name */}
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📿</div>
            <div style={{ fontWeight: 900, fontSize: '1.2rem', color: '#FFFFFF', marginBottom: '0.25rem' }}>
              Tasbih Aura Assyifa&apos;
            </div>
            <div style={{ fontSize: '0.82rem', color: '#6EE7B7', marginBottom: '1.5rem' }}>
              Diisi bacaan ruqyah syar&apos;iyyah · Pos seluruh Malaysia
            </div>

            {/* Price */}
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.9rem', color: '#D1FAE5' }}>Harga: </span>
              <span style={{ fontSize: '2.5rem', fontWeight: 900, color: '#FDE047' }}>RM250</span>
            </div>

            {/* Features */}
            {[
              'Rawatan tanpa had — tidak pernah habis',
              'Boleh buat air penawar & air mandian ruqyah',
              'Panduan lengkap cara guna disertakan',
              'Pos berdaftar seluruh Malaysia',
              'Bacaan ruqyah syar\'iyyah berlandaskan al-Quran',
            ].map((f, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: '0.6rem',
                marginBottom: '0.6rem', fontSize: '0.875rem',
                color: '#D1FAE5', textAlign: 'left',
              }}>
                <span style={{ color: '#4ADE80', flexShrink: 0 }}>✔</span> {f}
              </div>
            ))}

            <div style={{ marginTop: '1.75rem' }}>
              <WAButton id="cta-pricing" label="👉 Order Via WhatsApp" />
            </div>

            <p style={{ margin: '1rem 0 0', fontSize: '0.78rem', color: '#6EE7B7', opacity: 0.8 }}>
              Hubungi kami melalui WhatsApp untuk proses pembelian
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FAQ
      ═══════════════════════════════════════════ */}
      <section style={{ ...S.sectionAlt }}>
        <div style={{ ...S.container, maxWidth: '720px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div style={S.badge}>❓ Soalan Lazim</div>
            <h2 style={S.h2}>Soalan Yang Sering Ditanya</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {FAQS.map((f, i) => (
              <div key={i} style={{
                background: '#042E23', border: '1px solid rgba(254,224,71,0.2)',
                borderRadius: '12px', padding: '1.25rem 1.5rem',
              }}>
                <div style={{ fontWeight: 800, color: '#FDE047', marginBottom: '0.5rem', fontSize: '0.95rem', lineHeight: 1.4 }}>
                  {f.q}
                </div>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#D1FAE5', lineHeight: 1.65 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CLOSING CTA
      ═══════════════════════════════════════════ */}
      <section style={{
        background: 'linear-gradient(180deg, #031E17 0%, #042E23 100%)',
        padding: '5rem 1rem',
        textAlign: 'center',
        fontFamily: 'var(--font-inter), -apple-system, sans-serif',
      }}>
        <div style={S.container}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📿</div>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3.5vw, 2.3rem)',
            fontWeight: 900, color: '#FDE047',
            marginBottom: '1rem', letterSpacing: '-0.02em', lineHeight: 1.25,
          }}>
            Hentikan Kitaran Diserang Berulang.{' '}
            <span style={{ color: '#4ADE80' }}>Mulakan Rawatan Kendiri Hari Ini.</span>
          </h2>
          <p style={{ fontSize: '1rem', color: '#D1FAE5', marginBottom: '2.5rem', lineHeight: 1.65, maxWidth: '600px', margin: '0 auto 2.5rem auto' }}>
            Tasbih Aura Assyifa&apos; hadir untuk mereka yang mahu bangkit — tanpa menunggu,
            tanpa bergantung, tanpa had. Stok terhad, jangan tangguh.
          </p>
          <WAButton id="cta-closing" label="👉 Saya Mahu Tasbih Aura Assyifa" />
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#021812', color: '#FFFFFF', padding: '2rem 1rem', textAlign: 'center', fontSize: '0.82rem', borderTop: '1px solid rgba(254,243,199,0.1)' }}>
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <p style={{ margin: '0 0 0.5rem', fontWeight: 800, fontSize: '1rem', color: '#FEF3C7' }}>
            Aura Assyifa · Tasbih Ruqyah Syar&apos;iyyah
          </p>
          <p style={{ margin: 0, opacity: 0.7, fontSize: '0.78rem', color: '#D1D5DB' }}>
            © {new Date().getFullYear()} Aura Assyifa. Hak cipta terpelihara. Rawatan berasaskan bacaan Al-Quran dan doa berlandaskan syarak.
          </p>
        </div>
      </footer>

    </main>
  );
}
