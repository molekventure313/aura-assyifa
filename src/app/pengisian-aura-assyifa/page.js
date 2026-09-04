'use client';

import PageViewTracker from '@/components/salespage/PageViewTracker';

const WA_NUMBER = '60133892002';
const WA_MESSAGE = encodeURIComponent(
  "Assalamualaikum, saya berminat untuk mendapatkan Pengisian Aura Assyifa' (RM90). Boleh saya tahu langkah seterusnya?"
);
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

/* ─── DESIGN TOKENS ─────────────────────────────────────────── */
const C = {
  dark:    '#021812',
  mid:     '#042E23',
  midAlt:  '#063929',
  panel:   '#0B3D2E',
  gold:    '#C9A84C',
  goldLt:  '#E8C97A',
  cream:   '#F5EDD6',
  green:   '#4DB88A',
  greenLt: '#A7F3D0',
  red:     '#E06060',
  white:   '#FFFFFF',
  grey:    '#94A3B8',
  textSub: '#CBD5E1',
};

const font = "var(--font-inter), 'Segoe UI', -apple-system, sans-serif";

const sec = (bg, extra = {}) => ({
  background: bg,
  padding: '5rem 1.25rem',
  fontFamily: font,
  ...extra,
});

const wrap = (maxW = '900px') => ({
  maxWidth: maxW,
  margin: '0 auto',
});

const sectionLabel = (color = C.gold) => ({
  display: 'block',
  fontSize: '0.7rem',
  fontWeight: 700,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color,
  marginBottom: '0.75rem',
});

const h1Style = {
  fontSize: 'clamp(1.8rem, 4.5vw, 3rem)',
  fontWeight: 900,
  color: C.cream,
  lineHeight: 1.15,
  letterSpacing: '-0.025em',
  margin: '0 0 1.25rem 0',
};

const h2Style = (color = C.gold) => ({
  fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
  fontWeight: 800,
  color,
  lineHeight: 1.2,
  letterSpacing: '-0.02em',
  margin: '0 0 0.75rem 0',
});

const bodyText = (color = C.textSub) => ({
  fontSize: '1rem',
  color,
  lineHeight: 1.75,
  margin: 0,
});

const divider = {
  width: '48px',
  height: '3px',
  background: C.gold,
  borderRadius: '2px',
  margin: '0 auto 1.5rem auto',
};

const dividerLeft = {
  width: '40px',
  height: '3px',
  background: C.gold,
  borderRadius: '2px',
  margin: '0 0 1.25rem 0',
};

const ctaStyle = {
  display: 'inline-block',
  padding: '1rem 2.5rem',
  fontSize: '1rem',
  fontWeight: 700,
  color: C.dark,
  background: `linear-gradient(135deg, ${C.goldLt} 0%, ${C.gold} 100%)`,
  borderRadius: '6px',
  textDecoration: 'none',
  letterSpacing: '0.02em',
  boxShadow: `0 8px 32px rgba(201,168,76,0.35)`,
  cursor: 'pointer',
};

/* ─── DATA ────────────────────────────────────────────────────── */
const PROBLEMS = [
  { num: '01', title: 'Gangguan Berulang Selepas Rawatan', desc: 'Perawat membantu dalam sesi — tetapi apabila balik rumah, sihir dihantar semula. Jin kembali lagi. Kitaran ini tidak selesai tanpa perlindungan berterusan.' },
  { num: '02', title: 'Serangan Sihir Berlaku Berkali-Kali', desc: 'Ada pihak yang menghantar sihir berulang kali. Setiap sesi rawatan selesai, serangan baru datang. Satu sesi tidak pernah cukup untuk kes sebegini.' },
  { num: '03', title: 'Kos dan Masa Terus Terkuras', desc: 'Setiap serangan baru memerlukan perjalanan semula ke perawat. Kos tambang, kos rawatan, masa terbuang — dan masalah berulang tanpa penghujung.' },
  { num: '04', title: 'Air Penawar Habis, Perlindungan Terputus', desc: 'Air yang dibacakan berkesan, tetapi ia habis. Bila habis, tiada perlindungan. Terpaksa menunggu bekalan baru — sementara itu anda terdedah kepada serangan.' },
  { num: '05', title: 'Tiada Perlindungan di Waktu Malam', desc: 'Serangan sering datang tengah malam. Perawat tidak boleh dihubungi ketika itu. Tanpa air penawar, tanpa perlindungan — anda terpaksa tahan seorang diri.' },
  { num: '06', title: 'Kes Berat Memerlukan Rawatan Konsisten', desc: 'Kes sihir berat atau saka lama tidak dapat diselesaikan dengan satu atau dua sesi. Ia memerlukan rawatan yang berterusan — sesuatu yang mahal jika bergantung kepada perawat luar.' },
];

const DANGERS = [
  { title: 'Gangguan Semakin Parah Bila Ditangguhkan', desc: 'Setiap hari tanpa rawatan, gangguan mengakar lebih dalam. Apa yang mudah diselesaikan awal menjadi semakin sukar apabila ditangguh.' },
  { title: 'Pintu Rezeki Kekal Tertutup', desc: 'Selagi sihir tidak dinyahkan sepenuhnya, rezeki kekal tersekat. Perniagaan sepi. Peluang datang tetapi hilang begitu sahaja.' },
  { title: 'Keluarga Turut Terdedah', desc: 'Gangguan dalam rumah boleh merebak kepada ahli keluarga — terutama anak-anak yang lebih sensitif dan mudah terpengaruh oleh gangguan ghaib.' },
  { title: 'Tekanan Mental dan Emosi Terhakis', desc: 'Serangan berulang tanpa perlindungan menyebabkan tekanan, kebimbangan, dan kemurungan. Lama-kelamaan, kekuatan diri semakin lemah.' },
  { title: 'Hubungan Rumahtangga Terjejas', desc: 'Sihir pemisah yang tidak dirawat boleh membuatkan pasangan berubah hati secara perlahan. Perbalahan tanpa sebab. Perasaan dingin semakin membesar.' },
  { title: 'Kebergantungan Kos Rawatan Luar', desc: 'Tanpa kaedah rawatan sendiri, anda terpaksa terus bergantung kepada perawat luar. Kos bertimbun dari masa ke masa.' },
];

const BENEFITS = [
  { title: 'Rawatan Tanpa Had Seumur Hidup', desc: 'Tiada had bilangan rawatan. Gunakan setiap hari, setiap minggu — kekuatan barang tidak pernah habis atau perlu diisi semula.' },
  { title: 'Boleh Bertindak Balas Segera Bila Diserang', desc: 'Tanpa perlu menunggu appointment atau menghubungi perawat. Gunakan barang berisian anda terus apabila berasa diserang.' },
  { title: 'Rawatan Di Rumah Sendiri', desc: 'Dalam keselesaan rumah anda. Tiada perlu keluar, tiada perlu buat appointment, tiada perlu tunggu giliran.' },
  { title: 'Hasilkan Air Penawar Sendiri', desc: 'Gunakan barang berisian untuk menghasilkan air penawar sendiri — tanpa bergantung kepada sesiapa.' },
  { title: 'Air Mandian Ruqyah Boleh Dibuat Sendiri', desc: 'Boleh digunakan untuk menghasilkan air mandian bagi membersihkan badan dan melindungi diri daripada gangguan.' },
  { title: 'Perlindungan Berterusan 24 Jam', desc: 'Perlindungan aktif tanpa henti — siang dan malam, tanpa memerlukan sebarang tindakan tambahan.' },
  { title: 'Melindungi Seluruh Ahli Keluarga', desc: 'Satu barang berisian boleh membantu semua ahli keluarga — isteri, suami, anak-anak. Penjimatan kos berbanding rawatan berasingan.' },
  { title: 'Pelaburan Sekali, Guna Seumur Hidup', desc: 'Bayar sekali sahaja. Berbanding dengan kos berulang kali ke perawat — penjimatan jangka panjang yang sangat signifikan.' },
  { title: '100% Ruqyah Syariyyah', desc: "Diisi oleh perawat Aura Assyifa dengan bacaan Al-Quran dan doa berlandaskan syarak semata-mata. Tiada unsur syirik." },
  { title: 'Kekuatan Sentiasa Dikekalkan — Pelarasan Mingguan', desc: 'Perawat Aura Assyifa buat pelarasan automatik setiap minggu. Berbeza dengan air penawar — kekuatan tidak pernah berkurangan.' },
];

const LAYERS = [
  { num: 'I',  accent: '#E06060', title: 'Ayat Ruqyah Pembakar & Pemusnah Jin', desc: 'Ayat-ayat yang membakar dan memusnahkan jin yang menetap atau menyerang. Bertindak balas secara aktif apabila ada gangguan yang mendekat.' },
  { num: 'II', accent: '#C9A84C', title: 'Ayat Pembatal Sihir', desc: 'Memutuskan dan membatalkan ikatan sihir yang pernah dihantar atau sedang aktif. Melemahkan setiap serangan sihir dari punca asalnya.' },
  { num: 'III',accent: '#4DB88A', title: 'Ayat Benteng & Perlindungan', desc: 'Membina lapisan perlindungan menyeluruh di sekeliling barang dan pemiliknya. Gangguan yang cuba mendekat akan dihalang dan dipukul balik.' },
  { num: 'IV', accent: '#60A5FA', title: 'Ayat-Ayat Kesembuhan', desc: 'Memulihkan kesan-kesan gangguan yang masih tinggal dalam badan. Membantu proses penyembuhan spiritual dan fizikal secara berterusan.' },
];

const CHANGES = [
  { title: 'Boleh Merawat Diri Sendiri Tanpa Kebergantungan', desc: 'Sebaik sahaja berasa tidak selesa atau diserang, anda boleh bertindak terus tanpa perlu menghubungi perawat atau menunggu appointment.' },
  { title: 'Perlindungan Aktif di Waktu Malam', desc: 'Serangan paling kerap berlaku di waktu malam. Dengan barang berisian, anda sentiasa bersedia — pada bila-bila masa.' },
  { title: 'Penjimatan Kos Rawatan Jangka Panjang', desc: 'Kos perjalanan, kos rawatan, masa yang terbuang — semua ini berkurangan apabila anda mampu merawat sendiri di rumah.' },
  { title: 'Boleh Menghasilkan Air Penawar Bila Diperlukan', desc: 'Tidak perlu bergantung kepada sesiapa untuk mendapatkan air berisian. Hasilkan sendiri, pada bila-bila masa.' },
  { title: 'Ketenangan dan Rasa Selamat Di Rumah', desc: 'Mengetahui anda mempunyai perlindungan yang sentiasa aktif memberikan ketenangan jiwa. Rumah terasa lebih selamat dan tenteram.' },
];

const COMPARE_ROWS = [
  { label: 'Boleh digunakan berulang kali', air: false, rawatan: false, pengisian: true },
  { label: 'Tidak pernah habis atau tamat', air: false, rawatan: false, pengisian: true },
  { label: 'Rawatan sendiri tanpa perawat', air: false, rawatan: false, pengisian: true },
  { label: 'Boleh digunakan waktu malam', air: true, rawatan: false, pengisian: true },
  { label: 'Tiada had bilangan rawatan', air: false, rawatan: false, pengisian: true },
  { label: 'Penjimatan kos jangka panjang', air: false, rawatan: false, pengisian: true },
  { label: 'Pelarasan mingguan automatik', air: false, rawatan: false, pengisian: true },
  { label: 'Membantu seluruh ahli keluarga', air: false, rawatan: false, pengisian: true },
];

const TESTI1 = [
  '/images/testimonials/testimoni_pengisian_1.png',
  '/images/testimonials/testimoni_pengisian_2.png',
  '/images/testimonials/testimoni_pengisian_3.png',
  '/images/testimonials/testimoni_pengisian_4.png',
];

const TESTI2 = [
  '/images/testimonials/testimoni_pengisian_5.png',
  '/images/testimonials/testimoni_pengisian_6.png',
  '/images/testimonials/testimoni_pengisian_7.png',
];

/* ─── COMPONENT ───────────────────────────────────────────────── */
export default function PengisianAuraAssyifaPage() {
  return (
    <main style={{ minHeight: '100vh', background: C.mid, fontFamily: font, color: C.white }}>
      <PageViewTracker slug="pengisian-aura-assyifa" />

      {/* ══════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════ */}
      <section style={sec(`linear-gradient(160deg, ${C.dark} 0%, ${C.mid} 100%)`, { textAlign: 'center', paddingTop: '6rem', paddingBottom: '5rem' })}>
        <div style={wrap('780px')}>
          <span style={sectionLabel(C.gold)}>Aura Assyifa · Pengisian Ayat Ruqyah Jarak Jauh</span>
          <div style={divider} />
          <h1 style={h1Style}>
            Dah Berulang Kali Dirawat,{' '}
            <span style={{ color: C.goldLt }}>Tapi Gangguan Masih Datang Balik?</span>
          </h1>
          <p style={{ ...bodyText(C.greenLt), maxWidth: '600px', margin: '0 auto 1.5rem auto', fontSize: '1.05rem' }}>
            Perawat boleh membantu semasa sesi rawatan — tetapi apabila balik ke rumah, gangguan kembali lagi.
            Sihir berat dihantar berkali-kali. <strong style={{ color: C.cream }}>Satu rawatan tidak pernah cukup untuk kes yang serius.</strong>
          </p>

          <div style={{ background: 'rgba(201,168,76,0.08)', border: `1px solid rgba(201,168,76,0.3)`, borderLeft: `4px solid ${C.gold}`, borderRadius: '8px', padding: '1.5rem 1.75rem', maxWidth: '580px', margin: '0 auto 2.5rem auto', textAlign: 'left' }}>
            <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.72rem', fontWeight: 700, color: C.gold, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Penyelesaian</p>
            <p style={{ margin: 0, fontSize: '1rem', color: C.cream, lineHeight: 1.7, fontWeight: 600 }}>
              Pengisian Aura Assyifa pada item anda — diisi dengan ayat-ayat ruqyah syar&apos;iyyah.
              <span style={{ color: C.green }}> Rawatan sendiri, tanpa had, seumur hidup.</span>
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.65rem', marginBottom: '3rem' }}>
            {['Jarak Jauh — Tanpa Pos', '100% Patuh Syariah', 'Pelarasan Setiap Minggu', 'Siap Dalam 7 Hari'].map(t => (
              <span key={t} style={{ background: 'rgba(77,184,138,0.1)', border: `1px solid rgba(77,184,138,0.3)`, color: C.greenLt, fontSize: '0.8rem', fontWeight: 600, padding: '0.35rem 1rem', borderRadius: '4px', letterSpacing: '0.02em' }}>{t}</span>
            ))}
          </div>

          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" id="cta-hero" style={ctaStyle}>
            Hubungi Kami — Tempah Pengisian RM90
          </a>
          <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: C.grey, fontStyle: 'italic' }}>Hubungi via WhatsApp · 100% Patuh Syariah</p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          STATS + TESTI 1
      ══════════════════════════════════════════════ */}
      <section style={{ ...sec('#FFFFFF'), color: '#0F172A', textAlign: 'center' }}>
        <div style={wrap('960px')}>
          <span style={{ ...sectionLabel('#059669'), textAlign: 'center' }}>Testimoni Pesakit — Bahagian 1</span>
          <h2 style={h2Style('#042E23')}>Apa Kata Mereka Yang Telah Mendapatkan Pengisian Aura Assyifa?</h2>
          <div style={{ ...divider, background: '#047857' }} />
          <p style={{ ...bodyText('#4B5563'), maxWidth: '600px', margin: '0 auto 3rem auto', textAlign: 'center' }}>
            Bukan kami yang bercakap — biar pesakit sendiri yang kongsikan pengalaman mereka.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', alignItems: 'start', marginBottom: '3rem' }}>
            {TESTI1.map((src, i) => (
              <div key={i} style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid #D1FAE5', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                <img src={src} alt={`Testimoni Pesakit Aura Assyifa ${i + 1}`} style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap', padding: '2rem 0', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
            {[['500+', 'Pesakit Dirawat'], ['98%', 'Puas Hati'], ['100%', 'Patuh Syariah']].map(([num, label]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, color: '#047857', letterSpacing: '-0.02em' }}>{num}</div>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '0.25rem' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          MASALAH — WHY RAWATAN LUAR TAK CUKUP
      ══════════════════════════════════════════════ */}
      <section style={sec(C.panel, { textAlign: 'center' })}>
        <div style={wrap('940px')}>
          <span style={sectionLabel(C.gold)}>Memahami Masalah Anda</span>
          <h2 style={h2Style()}>Kenapa Rawatan Luar Sahaja Tidak Cukup untuk Kes Berat dan Berulang?</h2>
          <div style={divider} />
          <p style={{ ...bodyText(), maxWidth: '680px', margin: '0 auto 3rem auto', textAlign: 'center' }}>
            Ramai pesakit berasa lega selepas rawatan — tetapi gangguan datang semula. Ini bukan kesalahan perawat.
            Ini adalah realiti kes sihir dan gangguan berat yang memerlukan <strong style={{ color: C.goldLt }}>perlindungan berterusan.</strong>
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1.25rem', textAlign: 'left' }}>
            {PROBLEMS.map((p) => (
              <div key={p.num} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '1.5rem' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 700, color: C.gold, letterSpacing: '0.15em', marginBottom: '0.6rem' }}>— {p.num}</div>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '0.92rem', fontWeight: 700, color: C.cream, lineHeight: 1.35 }}>{p.title}</h3>
                <p style={{ margin: 0, fontSize: '0.83rem', color: C.textSub, lineHeight: 1.65 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          AMARAN
      ══════════════════════════════════════════════ */}
      <section style={sec(`linear-gradient(160deg, #1A0505 0%, #2D0A0A 100%)`, { textAlign: 'center' })}>
        <div style={wrap('940px')}>
          <span style={sectionLabel('#E06060')}>Amaran</span>
          <h2 style={{ ...h2Style(C.cream) }}>Jika Gangguan Ini Tidak Diselesaikan Segera...</h2>
          <div style={{ ...divider, background: '#E06060' }} />
          <p style={{ ...bodyText('#FCA5A5'), maxWidth: '680px', margin: '0 auto 3rem auto', textAlign: 'center' }}>
            Ramai yang menangguhkannya. Tetapi pengalaman pesakit kami membuktikan —{' '}
            <strong style={{ color: C.goldLt }}>semakin lama dibiarkan, semakin teruk akibatnya.</strong>
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1.25rem', textAlign: 'left', marginBottom: '2.5rem' }}>
            {DANGERS.map((d) => (
              <div key={d.title} style={{ background: 'rgba(224,96,96,0.07)', border: '1px solid rgba(224,96,96,0.2)', borderRadius: '8px', padding: '1.4rem 1.5rem' }}>
                <div style={{ width: '28px', height: '2px', background: '#E06060', borderRadius: '1px', marginBottom: '0.8rem' }} />
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '0.92rem', fontWeight: 700, color: '#FCA5A5', lineHeight: 1.35 }}>{d.title}</h3>
                <p style={{ margin: 0, fontSize: '0.83rem', color: C.cream, lineHeight: 1.65 }}>{d.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ background: 'rgba(201,168,76,0.06)', border: `1px solid rgba(201,168,76,0.25)`, borderLeft: `4px solid ${C.gold}`, borderRadius: '8px', padding: '1.5rem 1.75rem', textAlign: 'left', maxWidth: '700px', margin: '0 auto' }}>
            <p style={{ margin: '0 0 0.4rem 0', fontSize: '0.85rem', fontWeight: 700, color: C.goldLt }}>Penyelesaian</p>
            <p style={{ margin: 0, fontSize: '0.9rem', color: C.greenLt, lineHeight: 1.75 }}>
              Dengan Pengisian Aura Assyifa pada barang anda, anda tidak perlu bergantung kepada perawat untuk setiap serangan.
              Rawatan sendiri, pada bila-bila masa, di mana sahaja — tanpa had.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          DALIL ISLAM
      ══════════════════════════════════════════════ */}
      <section style={sec(C.mid, { textAlign: 'center' })}>
        <div style={wrap('880px')}>
          <span style={sectionLabel()}>Dalil dan Asas Syariah</span>
          <h2 style={h2Style()}>Bacaan Pada Barang — Amalan yang Disokong Al-Quran dan Sunnah</h2>
          <div style={divider} />
          <p style={{ ...bodyText(), maxWidth: '680px', margin: '0 auto 3rem auto', textAlign: 'center' }}>
            Konsep pengisian atau membaca pada objek untuk dijadikan penawar adalah amalan yang diiktiraf dalam tradisi Islam.
            Ia diqiaskan kepada bacaan ruqyah pada air, minyak dan kain yang disebutkan dalam kitab-kitab ulama silam.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
            {[
              { arabic: 'وَنُنَزِّلُ مِنَ ٱلْقُرْءَانِ مَا هُوَ شِفَآءٌ وَرَحْمَةٌ لِّلْمُؤْمِنِينَ', trans: '"Dan Kami turunkan dari Al-Quran sesuatu yang menjadi penawar dan rahmat bagi orang-orang yang beriman."', ref: 'Surah Al-Isra\' (17:82)' },
              { arabic: 'وَإِذَا مَرِضْتُ فَهُوَ يَشْفِينِ', trans: '"Dan apabila aku sakit, Dialah (Allah) yang menyembuhkanku."', ref: 'Surah Ash-Shu\'ara (26:80)' },
            ].map((item) => (
              <div key={item.ref} style={{ background: 'rgba(201,168,76,0.05)', border: `1px solid rgba(201,168,76,0.2)`, borderRadius: '8px', padding: '1.75rem 1.5rem' }}>
                <p style={{ fontFamily: 'serif', fontSize: '1.15rem', color: C.goldLt, lineHeight: 2.2, direction: 'rtl', textAlign: 'right', margin: '0 0 1rem 0' }}>{item.arabic}</p>
                <div style={{ borderTop: `1px solid rgba(201,168,76,0.15)`, paddingTop: '1rem', textAlign: 'left' }}>
                  <p style={{ margin: '0 0 0.4rem 0', fontSize: '0.875rem', color: C.cream, lineHeight: 1.7, fontStyle: 'italic' }}>{item.trans}</p>
                  <span style={{ fontSize: '0.72rem', color: C.green, fontWeight: 600, letterSpacing: '0.05em' }}>{item.ref}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: 'rgba(77,184,138,0.07)', border: `1px solid rgba(77,184,138,0.2)`, borderRadius: '8px', padding: '1.5rem 1.75rem', marginBottom: '1.25rem' }}>
            <p style={{ margin: '0 0 0.4rem 0', fontSize: '1rem', color: C.cream, fontStyle: 'italic', lineHeight: 1.75 }}>
              "Gunakanlah ruqyah selama ia tidak mengandungi syirik."
            </p>
            <span style={{ fontSize: '0.75rem', color: C.green, fontWeight: 600, letterSpacing: '0.05em' }}>Hadith Riwayat Muslim</span>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid rgba(255,255,255,0.07)`, borderRadius: '8px', padding: '1.4rem 1.75rem', textAlign: 'left' }}>
            <p style={{ margin: 0, fontSize: '0.9rem', color: C.greenLt, lineHeight: 1.75 }}>
              <strong style={{ color: C.goldLt }}>Konsep Pengisian Aura Assyifa</strong> adalah diqiaskan kepada amalan membaca ruqyah pada air penawar.
              Bezanya — air habis, barang yang diisikan <em>tidak pernah habis</em>. Bacaan yang dipasakkan kekal selagi barang dijaga dengan baik,
              dan perawat Aura Assyifa membuat pelarasan automatik setiap minggu.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          10 KELEBIHAN
      ══════════════════════════════════════════════ */}
      <section style={{ ...sec('#FFFFFF'), color: '#0F172A', textAlign: 'center' }}>
        <div style={wrap('940px')}>
          <span style={{ ...sectionLabel('#059669'), textAlign: 'center' }}>Penyelesaian</span>
          <h2 style={h2Style('#042E23')}>Pengisian Aura Assyifa — Perlindungan Peribadi yang Sentiasa Bersama Anda</h2>
          <div style={{ ...divider, background: '#047857' }} />
          <p style={{ ...bodyText('#4B5563'), maxWidth: '680px', margin: '0 auto 1.5rem auto', textAlign: 'center' }}>
            Satu pelaburan. Rawatan tanpa had. Boleh digunakan seumur hidup. Tanpa perlu appointment atau kebergantungan pada perawat —{' '}
            <strong style={{ color: '#047857' }}>rawatan terus apabila diperlukan.</strong>
          </p>

          <div style={{ display: 'inline-block', border: '1px solid #D1FAE5', borderRadius: '6px', padding: '0.9rem 2rem', marginBottom: '3rem', background: '#F0FDF4' }}>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: '#042E23' }}>Pengisian Aura Assyifa</div>
            <div style={{ fontSize: '0.75rem', color: '#047857', fontWeight: 600, letterSpacing: '0.05em', marginTop: '0.2rem' }}>Ruqyah Syar&apos;iyyah · 4 Lapisan Ayat · Pelarasan Mingguan</div>
          </div>

          <h3 style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', fontWeight: 700, color: '#042E23', marginBottom: '1.75rem' }}>10 Kelebihan Utama</h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', textAlign: 'left' }}>
            {BENEFITS.map((b, i) => (
              <div key={b.title} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, width: '28px', height: '28px', borderRadius: '50%', background: '#ECFDF5', border: '1px solid #D1FAE5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 800, color: '#047857' }}>{String(i + 1).padStart(2, '0')}</div>
                <div>
                  <p style={{ margin: '0 0 0.3rem 0', fontWeight: 700, fontSize: '0.875rem', color: '#042E23' }}>{b.title}</p>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#4B5563', lineHeight: 1.6 }}>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          4 LAPISAN AYAT
      ══════════════════════════════════════════════ */}
      <section style={sec(C.dark, { textAlign: 'center' })}>
        <div style={wrap('880px')}>
          <span style={sectionLabel()}>Kandungan Pengisian</span>
          <h2 style={h2Style()}>4 Lapisan Ayat Ruqyah — Perlindungan Menyeluruh</h2>
          <div style={divider} />
          <p style={{ ...bodyText(), maxWidth: '660px', margin: '0 auto 3rem auto', textAlign: 'center' }}>
            Setiap barang diisi dengan 4 lapisan ayat ruqyah syar&apos;iyyah yang berbeza fungsi — gabungan yang direka untuk merawat,
            membakar, membatal dan membentengi secara serentak.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
            {LAYERS.map((l) => (
              <div key={l.num} style={{ background: C.mid, border: `1px solid rgba(255,255,255,0.07)`, borderTop: `3px solid ${l.accent}`, borderRadius: '8px', padding: '1.75rem 1.5rem', textAlign: 'left' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', color: l.accent, marginBottom: '0.75rem' }}>LAPISAN {l.num}</div>
                <h3 style={{ margin: '0 0 0.6rem 0', fontWeight: 700, color: C.cream, fontSize: '0.95rem', lineHeight: 1.35 }}>{l.title}</h3>
                <p style={{ margin: 0, fontSize: '0.83rem', color: C.textSub, lineHeight: 1.65 }}>{l.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ background: `linear-gradient(135deg, ${C.panel} 0%, #065F46 100%)`, border: `1px solid rgba(77,184,138,0.3)`, borderRadius: '8px', padding: '1.75rem 2rem', textAlign: 'left' }}>
            <div style={dividerLeft} />
            <div style={{ fontWeight: 700, color: C.cream, fontSize: '1rem', marginBottom: '0.5rem' }}>Kekuatan Sentiasa Dikekalkan — Pelarasan Automatik Setiap Minggu</div>
            <p style={{ margin: 0, color: C.greenLt, fontSize: '0.9rem', lineHeight: 1.75 }}>
              Berbeza dengan air penawar atau barang bacaan biasa yang berkurangan kekuatannya dengan masa, perawat Aura Assyifa
              akan membuat <strong style={{ color: C.goldLt }}>pelarasan dan pengisian semula setiap minggu secara automatik</strong>.
              Barang anda sentiasa berada pada kapasiti penuh.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          5 PERUBAHAN
      ══════════════════════════════════════════════ */}
      <section style={sec(C.panel, { textAlign: 'center' })}>
        <div style={wrap('780px')}>
          <span style={sectionLabel()}>Manfaat Selepas Pengisian</span>
          <h2 style={h2Style()}>5 Perubahan yang Akan Anda Rasai Setelah Mempunyai Barang Berisian</h2>
          <div style={divider} />
          <p style={{ ...bodyText(), maxWidth: '600px', margin: '0 auto 3rem auto', textAlign: 'center' }}>
            Berdasarkan pengalaman sebenar pesakit yang telah mendapatkan Pengisian Aura Assyifa.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
            {CHANGES.map((c, i) => (
              <div key={c.title} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
                <div style={{ flexShrink: 0, width: '36px', height: '36px', borderRadius: '50%', border: `1px solid ${C.gold}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 700, color: C.gold }}>{String(i + 1).padStart(2, '0')}</div>
                <div>
                  <p style={{ margin: '0 0 0.3rem 0', fontWeight: 700, fontSize: '0.95rem', color: C.cream }}>{c.title}</p>
                  <p style={{ margin: 0, fontSize: '0.83rem', color: C.textSub, lineHeight: 1.65 }}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          TESTI 2
      ══════════════════════════════════════════════ */}
      <section style={sec(C.mid, { textAlign: 'center' })}>
        <div style={wrap('960px')}>
          <span style={sectionLabel()}>Testimoni Pesakit — Bahagian 2</span>
          <h2 style={h2Style()}>Adakah Pengisian Aura Assyifa Berkesan untuk Menyelesaikan Gangguan?</h2>
          <div style={divider} />
          <p style={{ ...bodyText(), maxWidth: '580px', margin: '0 auto 2.5rem auto', textAlign: 'center' }}>
            Baca sendiri pengalaman mereka yang telah mendapatkan pengisian.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', alignItems: 'start' }}>
            {TESTI2.map((src, i) => (
              <div key={i} style={{ borderRadius: '8px', overflow: 'hidden', border: `1px solid rgba(201,168,76,0.25)`, boxShadow: '0 8px 30px rgba(0,0,0,0.25)' }}>
                <img src={src} alt={`Testimoni Pesakit Aura Assyifa ${i + 5}`} style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
            ))}
          </div>
          <p style={{ marginTop: '2rem', fontSize: '0.82rem', color: C.grey, fontStyle: 'italic', lineHeight: 1.6 }}>
            Semua testimoni di atas adalah daripada pesakit sebenar yang telah mendapatkan Pengisian Aura Assyifa.
            Alhamdulillah — semoga Allah terus permudahkan urusan mereka.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          COMPARISON TABLE
      ══════════════════════════════════════════════ */}
      <section style={sec(C.dark, { textAlign: 'center' })}>
        <div style={wrap('880px')}>
          <span style={sectionLabel()}>Perbandingan</span>
          <h2 style={h2Style()}>Pengisian Aura Assyifa vs Air Penawar vs Rawatan Luar</h2>
          <div style={divider} />
          <p style={{ ...bodyText(), maxWidth: '660px', margin: '0 auto 3rem auto', textAlign: 'center' }}>
            Tiga pilihan — tetapi hanya satu yang memberikan perlindungan <strong style={{ color: C.goldLt }}>berterusan tanpa had</strong> untuk kes berulang dan berat.
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '520px' }}>
              <thead>
                <tr style={{ borderBottom: `2px solid rgba(255,255,255,0.1)` }}>
                  <th style={{ padding: '0.9rem 1rem', textAlign: 'left', fontSize: '0.75rem', color: C.grey, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Ciri-Ciri</th>
                  <th style={{ padding: '0.9rem 0.75rem', textAlign: 'center', fontSize: '0.78rem', fontWeight: 700, color: C.grey }}>Air Penawar</th>
                  <th style={{ padding: '0.9rem 0.75rem', textAlign: 'center', fontSize: '0.78rem', fontWeight: 700, color: C.grey }}>Rawatan Luar</th>
                  <th style={{ padding: '0.9rem 0.75rem', textAlign: 'center', fontSize: '0.78rem', fontWeight: 700, color: C.goldLt, background: 'rgba(201,168,76,0.06)' }}>Pengisian Aura Assyifa</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row, i) => (
                  <tr key={row.label} style={{ borderBottom: `1px solid rgba(255,255,255,0.05)`, background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                    <td style={{ padding: '0.85rem 1rem', fontSize: '0.85rem', color: C.cream, textAlign: 'left' }}>{row.label}</td>
                    <td style={{ padding: '0.85rem 0.75rem', textAlign: 'center' }}><span style={{ color: row.air ? '#4DB88A' : '#666', fontSize: '1rem', fontWeight: 700 }}>{row.air ? '✓' : '✗'}</span></td>
                    <td style={{ padding: '0.85rem 0.75rem', textAlign: 'center' }}><span style={{ color: row.rawatan ? '#4DB88A' : '#666', fontSize: '1rem', fontWeight: 700 }}>{row.rawatan ? '✓' : '✗'}</span></td>
                    <td style={{ padding: '0.85rem 0.75rem', textAlign: 'center', background: 'rgba(201,168,76,0.04)' }}><span style={{ color: '#4DB88A', fontSize: '1rem', fontWeight: 700 }}>✓</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          HARGA + FAQ
      ══════════════════════════════════════════════ */}
      <section id="borang" style={sec(C.panel, { textAlign: 'center' })}>
        <div style={wrap('660px')}>
          <span style={sectionLabel()}>Tempahan</span>
          <h2 style={h2Style()}>Dapatkan Pengisian Aura Assyifa Anda</h2>
          <div style={divider} />
          <p style={{ ...bodyText(), maxWidth: '540px', margin: '0 auto 3rem auto', textAlign: 'center' }}>
            Satu pelaburan untuk perlindungan seumur hidup. Pelarasan mingguan percuma selama-lamanya.
          </p>

          {/* Price Card */}
          <div style={{ background: C.dark, border: `1px solid rgba(201,168,76,0.3)`, borderRadius: '10px', padding: '2.5rem 2rem', marginBottom: '2rem' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: C.gold, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Pengisian Aura Assyifa</div>
            <div style={{ fontSize: 'clamp(3rem, 8vw, 4.5rem)', fontWeight: 900, color: C.goldLt, lineHeight: 1, marginBottom: '0.25rem', letterSpacing: '-0.03em' }}>RM90</div>
            <div style={{ fontSize: '0.85rem', color: C.grey, marginBottom: '2.5rem' }}>Bayar Sekali · Guna Seumur Hidup</div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', textAlign: 'left', marginBottom: '2.5rem' }}>
              {[
                'Pengisian pada barang anda (cincin, tasbih, gelang, dll)',
                '4 lapisan ayat ruqyah syariyyah',
                'Proses jarak jauh — barang tidak perlu dihantar',
                'Siap dalam 7 hari bekerja',
                'Pelarasan automatik setiap minggu (percuma)',
                'Panduan penggunaan lengkap disertakan',
                '100% Patuh Syariah — tiada unsur syirik',
              ].map(item => (
                <div key={item} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <span style={{ color: C.green, fontWeight: 700, flexShrink: 0, marginTop: '0.1rem' }}>✓</span>
                  <span style={{ fontSize: '0.875rem', color: C.textSub, lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>

            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" id="cta-borang" style={{ ...ctaStyle, display: 'block', textAlign: 'center' }}>
              Tempah Pengisian RM90 Sekarang
            </a>
            <p style={{ marginTop: '0.85rem', fontSize: '0.78rem', color: C.grey, fontStyle: 'italic' }}>
              Hubungi via WhatsApp · 100% Patuh Syariah
            </p>
          </div>

          {/* FAQ */}
          <div style={{ textAlign: 'left' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: C.goldLt, marginBottom: '1.25rem', letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.8rem' }}>Soalan Lazim</h3>
            {[
              { q: 'Barang apa yang boleh diisi?', a: 'Cincin, tasbih, gelang, rantai, atau mana-mana barang peribadi yang sentiasa dibawa bersama. Barang tidak perlu dihantar — proses dilakukan secara jarak jauh.' },
              { q: 'Berapa lama proses pengisian?', a: 'Pengisian penuh mengambil masa 7 hari bekerja. Selepas itu, pelarasan mingguan dilakukan secara automatik.' },
              { q: 'Adakah ini patuh syariah?', a: 'Ya, 100%. Pengisian hanya menggunakan ayat-ayat Al-Quran dan doa-doa bersandarkan Sunnah. Tiada unsur syirik, jampi atau azimat haram.' },
              { q: 'Bagaimana cara menggunakan barang berisian?', a: 'Panduan penggunaan lengkap akan diberikan selepas tempahan. Cara penggunaan mudah dan boleh dilakukan sendiri di rumah.' },
              { q: 'Adakah pengisian perlu diperbaharui?', a: 'Tidak. Perawat Aura Assyifa membuat pelarasan setiap minggu secara automatik. Kekuatan barang sentiasa dikekalkan pada tahap penuh.' },
            ].map((faq) => (
              <div key={faq.q} style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid rgba(255,255,255,0.07)`, borderRadius: '6px', padding: '1.1rem 1.25rem', marginBottom: '0.75rem' }}>
                <p style={{ margin: '0 0 0.4rem 0', fontWeight: 700, color: C.goldLt, fontSize: '0.875rem' }}>{faq.q}</p>
                <p style={{ margin: 0, color: C.textSub, fontSize: '0.83rem', lineHeight: 1.65 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CLOSING CTA
      ══════════════════════════════════════════════ */}
      <section style={sec(C.dark, { textAlign: 'center' })}>
        <div style={wrap('660px')}>
          <h2 style={{ ...h2Style(), marginBottom: '1rem' }}>
            Aura Assyifa hadir untuk mereka yang mahu bangkit — tanpa menunggu, tanpa bergantung, tanpa had.
          </h2>
          <div style={divider} />
          <p style={{ ...bodyText(C.greenLt), maxWidth: '540px', margin: '0 auto 2.5rem auto' }}>
            Dengan Pengisian Aura Assyifa, setiap kali diserang — anda bersedia. Setiap malam — anda terlindung.
            Setiap hari — anda lebih kuat.
          </p>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" id="cta-closing" style={ctaStyle}>
            Hubungi Kami — Tempah Pengisian Aura Assyifa
          </a>
          <p style={{ marginTop: '1.25rem', fontSize: '0.8rem', color: C.grey }}>RM90 sekali bayar · Seumur Hidup · 100% Patuh Syariah</p>
        </div>
      </section>
    </main>
  );
}
