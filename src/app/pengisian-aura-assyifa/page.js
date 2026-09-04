'use client';

import { useState } from 'react';
import PageViewTracker from '@/components/salespage/PageViewTracker';

const WA_NUMBER = '60133892002';
const WA_MESSAGE = encodeURIComponent(
  'Assalamualaikum, saya berminat untuk mendapatkan Pengisian Aura Assyifa\' (RM90). Boleh saya tahu langkah seterusnya?'
);
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

const S = {
  page: {
    minHeight: '100vh',
    background: '#042E23',
    fontFamily: 'var(--font-inter), -apple-system, sans-serif',
    color: '#FFFFFF',
  },
  wrap: { maxWidth: '920px', margin: '0 auto' },
  badge: (color = '#FDE047') => ({
    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
    background: 'rgba(253,224,71,0.12)', border: `1px solid ${color}`,
    padding: '0.4rem 1.2rem', borderRadius: '50px',
    fontSize: '0.78rem', fontWeight: 800, color,
    letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.25rem',
  }),
  h1: {
    fontSize: 'clamp(1.7rem, 4.5vw, 2.8rem)', fontWeight: 900,
    color: '#FEF3C7', lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: '1.25rem',
  },
  h2gold: {
    fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 800,
    color: '#FDE047', marginTop: '0.4rem', marginBottom: '0.75rem',
    letterSpacing: '-0.02em', lineHeight: 1.25,
  },
  h2dark: {
    fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 800,
    color: '#0F172A', marginTop: '0.4rem', marginBottom: '0.75rem',
    letterSpacing: '-0.02em', lineHeight: 1.25,
  },
  sub: (color = '#D1FAE5') => ({
    fontSize: '1rem', color, lineHeight: 1.65,
    maxWidth: '720px', margin: '0 auto 2.5rem auto',
  }),
  ctaBtn: {
    display: 'inline-block', padding: '1.15rem 2.6rem',
    fontSize: '1.1rem', fontWeight: 800, color: '#042E23',
    background: 'linear-gradient(180deg, #FDE047 0%, #EAB308 100%)',
    borderRadius: '50px', textDecoration: 'none',
    boxShadow: '0 10px 30px rgba(234,179,8,0.45)',
    border: '2px solid #FEF08A', letterSpacing: '-0.01em', cursor: 'pointer',
  },
  section: (bg) => ({
    background: bg, color: '#FFFFFF',
    padding: '4rem 1rem',
  }),
};

function WAButton({ label = '💎 Saya Mahu Pengisian Aura Assyifa\'', size = 'large', id = 'cta' }) {
  const style = size === 'large' ? S.ctaBtn : {
    ...S.ctaBtn, padding: '0.85rem 1.8rem', fontSize: '0.95rem',
  };
  return (
    <a href={WA_LINK} target="_blank" rel="noopener noreferrer" id={id} style={style}>
      {label}
    </a>
  );
}

const PROBLEMS = [
  { icon: '🔄', title: 'Jin Keluar Masa Rawatan... Tapi Datang Balik', desc: 'Perawat bantu buang jin semasa sesi. Tapi apabila balik rumah, sihir dihantar semula. Jin datang lagi. Kitaran ini tidak pernah selesai tanpa perlindungan berterusan.' },
  { icon: '📬', title: 'Sihir Dihantar Berkali-Kali', desc: 'Ada pihak yang sengaja menghantar sihir berulang kali. Setiap kali rawatan selesai, serangan baru datang. Satu sesi rawatan tidak pernah cukup untuk kes sebegini.' },
  { icon: '💸', title: 'Kos & Tenaga Terkuras — Ulang Alik Tak Habis', desc: 'Setiap kali serangan baru, kena pergi semula berjumpa perawat. Kos tambang, kos rawatan, masa terbuang — dan masalah tetap berulang tanpa penghujung.' },
  { icon: '💧', title: 'Air Penawar Habis, Perlindungan Terputus', desc: 'Air yang dibacakan berkesan, tapi ia habis. Bila habis, tiada perlindungan. Terpaksa tunggu dapatkan bekalan baru — sementara itu anda terdedah kepada serangan.' },
  { icon: '🌙', title: 'Diserang Waktu Malam — Tiada Apa Nak Buat', desc: 'Serangan datang tengah malam. Perawat tidak boleh dihubungi waktu itu. Tiada air penawar. Tiada perlindungan. Anda terpaksa tahan seorang diri hingga pagi.' },
  { icon: '😰', title: 'Kes Berat Perlukan Rawatan Berterusan', desc: 'Kes sihir berat atau saka lama tidak boleh selesai dengan satu atau dua sesi rawatan. Ia memerlukan rawatan yang konsisten, berterusan — sesuatu yang mahal jika bergantung pada perawat.' },
];

const DANGERS = [
  { icon: '📉', title: 'Gangguan Makin Parah Bila Dibiarkan', desc: 'Setiap hari tanpa rawatan, gangguan mengakar lebih dalam. Apa yang boleh diselesaikan awal, menjadi semakin sukar apabila ditangguh.' },
  { icon: '🔗', title: 'Sihir Penghalang Rezeki Terus Mengikat', desc: 'Selagi sihir tidak dinyahkan sepenuhnya, pintu rezeki kekal terkunci. Perniagaan terus sunyi. Peluang datang tapi hilang begitu sahaja.' },
  { icon: '👨‍👩‍👧', title: 'Keluarga & Anak-Anak Turut Terdedah', desc: 'Gangguan di dalam rumah boleh merebak kepada ahli keluarga lain — terutama anak-anak yang lebih sensitif dan mudah terdedah kepada gangguan ghaib.' },
  { icon: '🧠', title: 'Mental & Emosi Terhakis Perlahan-Lahan', desc: 'Serangan berulang tanpa perlindungan menyebabkan tekanan, anxiety, dan kemurungan. Lama-kelamaan, kekuatan diri semakin lemah dan tidak terasa.' },
  { icon: '💔', title: 'Rumahtangga Retak Kerana Campur Tangan Sihir', desc: 'Sihir pemisah yang tidak dirawat boleh membuatkan pasangan berubah hati secara perlahan. Perbalahan tanpa sebab. Perasaan dingin. Rumah tangga perlahan-lahan hancur.' },
  { icon: '💰', title: 'Kos Rawatan Berulang Terus Membebankan', desc: 'Tanpa cara rawatan sendiri, anda terpaksa terus bergantung pada perawat luar. Kos bertimbun. Jika ada perlindungan sendiri, semua ini boleh dielakkan.' },
];

const BENEFITS = [
  { icon: '♾️', title: 'Rawatan Tanpa Had — Seumur Hidup', desc: 'Tidak ada had bilangan rawatan. Guna setiap hari, setiap minggu — kekuatan barang berisian tidak pernah habis atau perlu diisi semula.' },
  { icon: '⚡', title: 'Bertindak Balas Bila-Bila Masa Diserang', desc: 'Diserang malam-malam? Tidak perlu tunggu appointment. Tidak perlu tunggu perawat. Guna barang berisian anda terus ketika itu juga.' },
  { icon: '🏠', title: 'Rawat Di Rumah Sendiri — Tiada Perlu Keluar', desc: 'Dalam keselesaan rumah anda sendiri. Tiada perlu keluar, tiada perlu buat appointment, tiada perlu tunggu giliran.' },
  { icon: '💧', title: 'Buat Air Penawar Sendiri Bila Perlu', desc: 'Gunakan barang berisian untuk buat air penawar sendiri — tidak perlu bergantung pada orang lain untuk dapatkan air berisian.' },
  { icon: '🚿', title: 'Buat Air Mandian Ruqyah Sendiri', desc: 'Boleh digunakan untuk buat air mandian — membersihkan badan dan melindungi diri dari gangguan luar.' },
  { icon: '🛡️', title: 'Perlindungan 24 Jam Setiap Hari', desc: 'Ibarat ada perawat private di rumah. Perlindungan berterusan tanpa henti — siang atau malam.' },
  { icon: '👨‍👩‍👧', title: 'Boleh Bantu Seluruh Keluarga', desc: 'Satu barang berisian boleh membantu semua ahli keluarga — isteri, suami, anak-anak. Jimat kos berbanding rawatan berasingan.' },
  { icon: '💰', title: 'Jimat Kos Jangka Panjang', desc: 'Bayar sekali sahaja, guna seumur hidup. Bandingkan dengan kos berulang kali ke perawat — penjimatan yang luar biasa.' },
  { icon: '📖', title: "100% Ruqyah Syar'iyyah", desc: "Diisi oleh perawat Aura Assyifa dengan bacaan Al-Quran dan doa berlandaskan syarak semata-mata. Tiada unsur syirik." },
  { icon: '🔄', title: 'Kekuatan Sentiasa Penuh — Pelarasan Mingguan', desc: 'Perawat Aura Assyifa buat pelarasan setiap minggu secara automatik. Berbeza dengan air penawar — kekuatan tidak pernah berkurang.' },
];

const LAYERS = [
  { icon: '🔥', border: 'rgba(239,68,68,0.3)', title: 'Ayat Ruqyah Pembakar & Pemusnah Jin', desc: 'Ayat-ayat yang membakar dan memusnahkan jin yang menetap atau menyerang. Bertindak balas secara aktif apabila ada gangguan jin yang cuba mendekat.' },
  { icon: '✂️', border: 'rgba(245,158,11,0.3)', title: 'Ayat Pembatal Sihir', desc: 'Memutuskan dan membatalkan ikatan sihir yang pernah dihantar atau sedang aktif. Ayat ini melemahkan setiap serangan sihir dari punca asalnya.' },
  { icon: '🛡️', border: 'rgba(74,222,128,0.3)', title: 'Ayat Benteng Sihir & Gangguan Jin', desc: 'Membina dinding perlindungan di sekeliling barang dan pemiliknya. Jin dan sihir yang cuba mendekat akan dihalang dan dipukul balik.' },
  { icon: '💚', border: 'rgba(52,211,153,0.3)', title: 'Ayat-Ayat Kesembuhan', desc: 'Memulihkan kesan-kesan gangguan yang masih tinggal dalam badan. Membantu proses penyembuhan spiritual dan fizikal secara berterusan.' },
];

const CHANGES = [
  { icon: '⚡', title: 'Boleh Rawat Diri Sendiri Bila Diserang — Tanpa Tunggu', desc: 'Sebaik sahaja berasa diserang atau tidak selesa, anda boleh terus bertindak. Tidak perlu hubungi perawat, tidak perlu tunggu appointment.' },
  { icon: '🌙', title: 'Perlindungan 24/7 — Malam Pun Selamat', desc: 'Serangan paling kerap berlaku waktu malam. Dengan barang berisian di tangan, anda bersedia setiap masa — siang atau malam.' },
  { icon: '💰', title: 'Jimat Kos — Tidak Perlu Ulang Alik Ke Perawat', desc: 'Kos perjalanan, kos rawatan, masa terbuang — semua ini berkurangan drastik apabila anda mampu rawat sendiri di rumah.' },
  { icon: '💧', title: 'Buat Air Penawar Sendiri Bila Perlu', desc: 'Tidak perlu bergantung pada orang lain untuk dapatkan air berisian. Buat sendiri, bila-bila masa, menggunakan barang yang telah diisikan.' },
  { icon: '🏡', title: 'Rasa Lebih Tenang & Selamat Di Rumah', desc: 'Mengetahui anda ada perlindungan yang sentiasa bersama memberikan ketenangan jiwa. Rumah terasa lebih selamat dan terlindung.' },
];

const COMPARE_ROWS = [
  { label: 'Boleh digunakan berulang kali', air: false, rawatan: false, pengisian: true },
  { label: 'Tidak pernah habis / tamat', air: false, rawatan: false, pengisian: true },
  { label: 'Rawat sendiri tanpa perawat', air: false, rawatan: false, pengisian: true },
  { label: 'Bertindak balas waktu malam', air: true, rawatan: false, pengisian: true },
  { label: 'Tiada had bilangan rawatan', air: false, rawatan: false, pengisian: true },
  { label: 'Jimat kos jangka panjang', air: false, rawatan: false, pengisian: true },
  { label: 'Pelarasan mingguan automatik', air: false, rawatan: false, pengisian: true },
  { label: 'Bantu seluruh keluarga', air: false, rawatan: false, pengisian: true },
];

const TESTI1 = [
  '/images/testimonials/testimoni_pengisian_1.png',
  '/images/testimonials/testimoni_pengisian_2.png',
  '/images/testimonials/testimoni_pengisian_3.png',
  '/images/testimonials/testimoni_pengisian_4.png',
];

const TESTI2 = [
  '/images/testimonials/testimoni_part2_1.jpg',
  '/images/testimonials/testimoni_part2_2.jpg',
  '/images/testimonials/testimoni_part2_3.jpg',
];

export default function PengisianAuraAssyifaPage() {
  return (
    <main style={S.page}>
      <PageViewTracker slug="pengisian-aura-assyifa" />

      {/* ═══════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════ */}
      <section style={{ background: 'linear-gradient(180deg, #021812 0%, #042E23 100%)', color: '#FFFFFF', padding: '4.5rem 1rem 3.5rem', textAlign: 'center' }}>
        <div style={S.wrap}>
          <div style={S.badge()}>🌿 Aura Assyifa · Pengisian Ayat Ruqyah Jarak Jauh</div>
          <h1 style={S.h1}>
            Dah Berulang Kali Dirawat Tapi{' '}
            <span style={{ color: '#FDE047' }}>Gangguan Masih Datang Balik?</span>{' '}
            Ini Sebabnya...
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#A7F3D0', lineHeight: 1.75, maxWidth: '660px', margin: '0 auto 1.5rem auto' }}>
            Perawat boleh buang jin — tapi bila balik rumah, jin datang balik. Sihir berat dihantar berkali-kali.{' '}
            <strong style={{ color: '#FEF3C7' }}>Satu rawatan tidak pernah cukup untuk kes serius.</strong>
          </p>

          <div style={{ background: 'rgba(253,224,71,0.08)', border: '2px solid rgba(253,224,71,0.4)', borderRadius: '16px', padding: '1.25rem 1.75rem', maxWidth: '620px', margin: '0 auto 2rem auto', textAlign: 'left' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#FDE047', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>✨ Penyelesaian</div>
            <p style={{ margin: 0, fontSize: '1rem', color: '#FEF3C7', lineHeight: 1.65, fontWeight: 600 }}>
              <strong style={{ color: '#FDE047' }}>Pengisian Aura Assyifa Pada Item Anda</strong> — diisi bacaan ayat-ayat ruqyah syar&apos;iyyah. Ibarat ada perawat private di rumah.
              <span style={{ color: '#4ADE80' }}> Rawat sendiri, tanpa had, seumur hidup.</span>
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.6rem', marginBottom: '2.5rem' }}>
            {['✅ Jarak Jauh — Tanpa Pos', '📖 100% Patuh Syariah', '🔄 Pelarasan Setiap Minggu', '⏱️ Siap Dalam 7 Hari'].map(t => (
              <span key={t} style={{ background: 'rgba(167,243,208,0.1)', border: '1px solid rgba(167,243,208,0.25)', color: '#A7F3D0', fontSize: '0.82rem', fontWeight: 600, padding: '0.3rem 0.9rem', borderRadius: '999px' }}>{t}</span>
            ))}
          </div>

          <div style={{ width: '150px', height: '150px', borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%, #065F46, #021812)', border: '3px solid #FDE047', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2.5rem auto', boxShadow: '0 0 60px rgba(253,224,71,0.12), 0 20px 40px rgba(0,0,0,0.5)' }}>
            <span style={{ fontSize: '3rem' }}>💎</span>
            <span style={{ fontSize: '0.62rem', color: '#FDE047', fontWeight: 800, letterSpacing: '0.05em', marginTop: '0.2rem', textAlign: 'center' }}>PENGISIAN<br />AURA ASSYIFA</span>
          </div>

          <WAButton id="cta-hero" />
          <p style={{ marginTop: '0.85rem', fontSize: '0.82rem', color: '#6EE7B7', fontStyle: 'italic' }}>Hubungi via WhatsApp · 100% Patuh Syariah</p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TESTIMONIALS 1
      ═══════════════════════════════════════════ */}
      <section style={{ ...S.section('#FFFFFF'), color: '#0F172A', textAlign: 'center' }}>
        <div style={{ ...S.wrap, maxWidth: '960px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.1em' }}>TESTIMONI PESAKIT (BAHAGIAN 1)</span>
          <h2 style={S.h2dark}>Apa Kata Mereka Yang Dah Cuba Rawatan Aura Assyifa?</h2>
          <p style={{ fontSize: '1rem', color: '#4B5563', marginBottom: '2.5rem', lineHeight: 1.6 }}>Bukan kami yang cakap — biar pesakit sendiri yang kongsikan pengalaman mereka.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', alignItems: 'start' }}>
            {TESTI1.map((src, i) => (
              <div key={i} style={{ borderRadius: '16px', overflow: 'hidden', border: '2px solid #059669', boxShadow: '0 8px 25px rgba(0,0,0,0.08)', background: '#F8FAFC' }}>
                <img src={src} alt={`Testimoni Pesakit Aura Assyifa ${i + 1}`} style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
            ))}
          </div>
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            {[['500+', 'Pesakit Dirawat'], ['98%', 'Puas Hati'], ['100%', 'Patuh Syariah']].map(([num, label]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 900, color: '#047857' }}>{num}</div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          WHY REPEATING RAWATAN NOT ENOUGH
      ═══════════════════════════════════════════ */}
      <section style={{ ...S.section('#0B382D'), textAlign: 'center' }}>
        <div style={{ ...S.wrap, maxWidth: '920px' }}>
          <div style={S.badge()}>⚠️ Kenali Masalah Anda</div>
          <h2 style={S.h2gold}>Kenapa Rawatan Luar Sahaja Tidak Cukup Untuk Kes Berat & Berulang?</h2>
          <p style={S.sub()}>
            Ramai pesakit rasa lega selepas rawatan — tapi gangguan datang balik. Ini bukan salah perawat. Ini realiti kes sihir & gangguan berat yang memerlukan{' '}
            <strong style={{ color: '#FDE047' }}>perlindungan berterusan.</strong>
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', textAlign: 'left' }}>
            {PROBLEMS.map((p) => (
              <div key={p.title} style={{ background: '#064E3B', border: '1px solid rgba(253,224,71,0.2)', borderRadius: '14px', padding: '1.5rem', boxShadow: '0 8px 20px rgba(0,0,0,0.25)' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{p.icon}</div>
                <div style={{ fontWeight: 800, color: '#FDE047', marginBottom: '0.5rem', fontSize: '0.95rem', lineHeight: 1.3 }}>{p.title}</div>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#D1FAE5', lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          DANGER / WARNING
      ═══════════════════════════════════════════ */}
      <section style={{ ...S.section('linear-gradient(180deg, #0B382D 0%, #1A0A0A 100%)'), textAlign: 'center' }}>
        <div style={{ ...S.wrap, maxWidth: '920px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#F87171', textTransform: 'uppercase', letterSpacing: '0.12em' }}>⚠️ Amaran Penting</span>
          <h2 style={{ ...S.h2gold, color: '#FEF3C7' }}>Jika Gangguan Berulang Ini Tidak Diselesaikan Segera...</h2>
          <p style={{ ...S.sub('#FCA5A5') }}>
            Ramai yang buat-buat tak kisah. Tapi pengalaman pesakit kami menunjukkan —{' '}
            <strong style={{ color: '#FDE047' }}>semakin lama dibiarkan, semakin teruk akibatnya.</strong>
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1.2rem', textAlign: 'left', marginBottom: '2rem' }}>
            {DANGERS.map((d) => (
              <div key={d.title} style={{ background: 'rgba(248,113,113,0.07)', border: '1.5px solid rgba(248,113,113,0.25)', borderRadius: '14px', padding: '1.4rem 1.2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '1.6rem', lineHeight: 1, flexShrink: 0, background: 'rgba(248,113,113,0.12)', borderRadius: '10px', padding: '0.35rem', display: 'inline-flex' }}>{d.icon}</span>
                  <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: '#FCA5A5', lineHeight: 1.35 }}>{d.title}</h3>
                </div>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#FEF3C7', lineHeight: 1.65 }}>{d.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ background: 'rgba(253,224,71,0.07)', border: '1px solid rgba(253,224,71,0.35)', borderLeft: '4px solid #FDE047', borderRadius: '12px', padding: '1.4rem 1.6rem', display: 'flex', gap: '1rem', alignItems: 'flex-start', textAlign: 'left' }}>
            <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>💎</span>
            <div>
              <p style={{ margin: '0 0 0.3rem 0', fontSize: '0.95rem', color: '#FEF3C7', fontWeight: 800 }}>Penyelesaian: Perlindungan Yang Sentiasa Bersama</p>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#A7F3D0', lineHeight: 1.75 }}>
                Dengan Pengisian Aura Assyifa pada barang anda, anda tidak perlu bergantung pada perawat untuk setiap serangan. Rawat sendiri, bila-bila masa, di mana sahaja — tanpa had.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          DALIL ISLAM
      ═══════════════════════════════════════════ */}
      <section style={{ ...S.section('#042E23'), textAlign: 'center' }}>
        <div style={{ ...S.wrap, maxWidth: '920px' }}>
          <div style={S.badge()}>📖 Dalil & Asas</div>
          <h2 style={S.h2gold}>Bacaan Pada Barang — Amalan Yang Disokong Al-Quran & Sunnah</h2>
          <p style={S.sub()}>
            Konsep &quot;pengisian&quot; atau membaca pada sesuatu objek untuk dijadikan penawar adalah amalan yang diiktiraf dalam tradisi Islam. Qias kepada bacaan pada air, minyak dan kain yang disebutkan dalam kitab-kitab ulama silam.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
            <div style={{ background: 'rgba(253,224,71,0.06)', border: '1.5px solid rgba(253,224,71,0.3)', borderRadius: '16px', padding: '1.75rem 1.5rem', textAlign: 'right' }}>
              <div style={{ fontSize: '1.1rem', fontFamily: 'serif', color: '#FDE047', lineHeight: 2.2, marginBottom: '1rem', direction: 'rtl' }}>وَنُنَزِّلُ مِنَ ٱلْقُرْءَانِ مَا هُوَ شِفَآءٌ وَرَحْمَةٌ لِّلْمُؤْمِنِينَ</div>
              <div style={{ borderTop: '1px solid rgba(253,224,71,0.2)', paddingTop: '1rem', textAlign: 'left' }}>
                <p style={{ margin: '0 0 0.4rem 0', fontSize: '0.875rem', color: '#FEF3C7', lineHeight: 1.7, fontStyle: 'italic' }}>&quot;Dan Kami turunkan dari Al-Quran sesuatu yang menjadi penawar dan rahmat bagi orang-orang yang beriman.&quot;</p>
                <span style={{ fontSize: '0.75rem', color: '#6EE7B7', fontWeight: 700 }}>Surah Al-Isra&apos; (17:82)</span>
              </div>
            </div>
            <div style={{ background: 'rgba(253,224,71,0.06)', border: '1.5px solid rgba(253,224,71,0.3)', borderRadius: '16px', padding: '1.75rem 1.5rem', textAlign: 'right' }}>
              <div style={{ fontSize: '1.1rem', fontFamily: 'serif', color: '#FDE047', lineHeight: 2.2, marginBottom: '1rem', direction: 'rtl' }}>وَإِذَا مَرِضْتُ فَهُوَ يَشْفِينِ</div>
              <div style={{ borderTop: '1px solid rgba(253,224,71,0.2)', paddingTop: '1rem', textAlign: 'left' }}>
                <p style={{ margin: '0 0 0.4rem 0', fontSize: '0.875rem', color: '#FEF3C7', lineHeight: 1.7, fontStyle: 'italic' }}>&quot;Dan apabila aku sakit, Dialah (Allah) yang menyembuhkanku.&quot;</p>
                <span style={{ fontSize: '0.75rem', color: '#6EE7B7', fontWeight: 700 }}>Surah Ash-Shu&apos;ara (26:80)</span>
              </div>
            </div>
          </div>
          <div style={{ background: 'rgba(74,222,128,0.07)', border: '1.5px solid rgba(74,222,128,0.28)', borderRadius: '14px', padding: '1.5rem 1.8rem', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '1.5rem' }}>📖</span>
            <p style={{ margin: '0.6rem 0 0.4rem 0', fontSize: '1rem', color: '#FEF3C7', fontStyle: 'italic', lineHeight: 1.75 }}>"Gunakanlah ruqyah (bacaan doa perlindungan) selama ia tidak mengandungi syirik."</p>
            <span style={{ fontSize: '0.8rem', color: '#6EE7B7', fontWeight: 700 }}>Hadith Riwayat Muslim</span>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(253,224,71,0.2)', borderRadius: '14px', padding: '1.4rem 1.6rem', textAlign: 'left', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>💡</span>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#D1FAE5', lineHeight: 1.7 }}>
              <strong style={{ color: '#FDE047' }}>Konsep Pengisian Aura Assyifa</strong> adalah qias kepada amalan membaca bacaan ruqyah pada air penawar. Bezanya — air habis, barang yang diisikan <em>tidak pernah habis</em>. Bacaan yang dipasakkan kekal selagi barang dijaga dengan baik, dan perawat Aura Assyifa buat pelarasan setiap minggu secara automatik.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          10 BENEFITS
      ═══════════════════════════════════════════ */}
      <section style={{ ...S.section('#FFFFFF'), color: '#0F172A', textAlign: 'center' }}>
        <div style={{ ...S.wrap, maxWidth: '920px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Penyelesaian</span>
          <h2 style={S.h2dark}>Pengisian Aura Assyifa — Perawat Private Anda Yang Sentiasa Bersama</h2>
          <p style={{ fontSize: '1rem', color: '#4B5563', lineHeight: 1.65, maxWidth: '720px', margin: '0 auto 2rem auto' }}>
            Satu pelaburan. Rawatan tanpa had. Boleh guna seumur hidup. Tidak perlu tunggu appointment. Tidak perlu ulang alik. Tidak perlu bergantung pada orang lain —{' '}
            <strong style={{ color: '#047857' }}>setiap kali diserang, rawat terus.</strong>
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', background: 'linear-gradient(135deg, #042E23 0%, #065F46 100%)', border: '2px solid #FDE047', borderRadius: '16px', padding: '1rem 2rem', marginBottom: '3rem', boxShadow: '0 8px 24px rgba(4,46,35,0.2)' }}>
            <span style={{ fontSize: '2rem' }}>💎</span>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#FDE047' }}>Pengisian Aura Assyifa</div>
              <div style={{ fontSize: '0.78rem', color: '#A7F3D0', fontWeight: 600 }}>Ruqyah Syar&apos;iyyah · 4 Lapisan Ayat · Pelarasan Mingguan</div>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.1em' }}>10 Kelebihan Utama</span>
            <h3 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.8rem)', fontWeight: 800, color: '#042E23', marginTop: '0.4rem', marginBottom: '0.5rem' }}>Kenapa Pengisian Aura Assyifa Berbeza Dari Yang Lain?</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', textAlign: 'left' }}>
            {BENEFITS.map((b) => (
              <div key={b.title} style={{ background: '#F8FAFC', border: '1.5px solid #E2E8F0', borderRadius: '12px', padding: '1.2rem', display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.5rem', flexShrink: 0, background: '#ECFDF5', borderRadius: '10px', padding: '0.35rem', display: 'inline-flex', lineHeight: 1 }}>{b.icon}</span>
                <div>
                  <p style={{ margin: '0 0 0.2rem 0', fontWeight: 800, fontSize: '0.88rem', color: '#042E23' }}>{b.title}</p>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#4B5563', lineHeight: 1.55 }}>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          4 LAYERS
      ═══════════════════════════════════════════ */}
      <section style={{ ...S.section('#031E17'), textAlign: 'center' }}>
        <div style={{ ...S.wrap, maxWidth: '900px' }}>
          <span style={{ display: 'inline-block', background: 'rgba(253,224,71,0.1)', border: '1px solid rgba(253,224,71,0.4)', color: '#FDE047', padding: '0.4rem 1.1rem', borderRadius: '50px', fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>📖 Apa Yang Diisikan</span>
          <h2 style={S.h2gold}>4 Lapisan Ayat Ruqyah — Perlindungan Menyeluruh</h2>
          <p style={{ fontSize: '1rem', color: '#D1FAE5', lineHeight: 1.7, maxWidth: '680px', margin: '0 auto 2.5rem auto' }}>
            Setiap barang diisi dengan 4 lapisan ayat ruqyah syar&apos;iyyah yang berbeza fungsi. Bukan sekadar bacaan biasa — ini gabungan yang direka untuk merawat, membakar, membatal dan membentengi secara serentak.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
            {LAYERS.map((l) => (
              <div key={l.title} style={{ background: '#042E23', border: `2px solid ${l.border}`, borderRadius: '16px', padding: '1.5rem', boxShadow: '0 8px 20px rgba(0,0,0,0.3)' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{l.icon}</div>
                <div style={{ fontWeight: 800, color: '#FDE047', marginBottom: '0.5rem', fontSize: '0.95rem', lineHeight: 1.3 }}>{l.title}</div>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#D1FAE5', lineHeight: 1.65 }}>{l.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ background: 'linear-gradient(135deg, #065F46 0%, #047857 100%)', border: '2px solid rgba(16,185,129,0.5)', borderRadius: '16px', padding: '1.75rem', boxShadow: '0 0 30px rgba(16,185,129,0.15)', display: 'flex', alignItems: 'flex-start', gap: '1.25rem', textAlign: 'left' }}>
            <span style={{ fontSize: '2.5rem', lineHeight: 1, flexShrink: 0 }}>🔄</span>
            <div>
              <div style={{ fontWeight: 800, color: '#FEF3C7', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Kekuatan Tidak Berkurang — Pelarasan Setiap Minggu</div>
              <p style={{ margin: 0, color: '#D1FAE5', fontSize: '0.925rem', lineHeight: 1.7 }}>
                Berbeza dengan air penawar atau barang bacaan biasa yang kekuatannya berkurang dengan masa, perawat Aura Assyifa akan buat{' '}
                <strong style={{ color: '#FDE047' }}>pelarasan dan pengisian semula setiap minggu secara automatik</strong>. Barang anda sentiasa pada kapasiti penuh.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          5 CHANGES
      ═══════════════════════════════════════════ */}
      <section style={{ ...S.section('#042E23'), textAlign: 'center' }}>
        <div style={{ ...S.wrap, maxWidth: '800px' }}>
          <div style={S.badge()}>🎯 Perubahan Yang Anda Akan Rasa</div>
          <h2 style={S.h2gold}>5 Perubahan Yang Anda Akan Alami Bila Ada Barang Berisian</h2>
          <p style={S.sub()}>Bukan janji kosong — ini berdasarkan pengalaman pesakit yang dah ada Pengisian Aura Assyifa.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
            {CHANGES.map((c) => (
              <div key={c.title} style={{ background: '#FFFFFF', border: '2px solid #FDE047', borderRadius: '12px', padding: '1.2rem 1.4rem', display: 'flex', alignItems: 'flex-start', gap: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>{c.icon}</div>
                <div>
                  <p style={{ margin: '0 0 0.25rem 0', fontWeight: 800, fontSize: '1rem', color: '#042E23' }}>{c.title}</p>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#374151', lineHeight: 1.6 }}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TESTIMONIALS 2
      ═══════════════════════════════════════════ */}
      <section style={{ ...S.section('#0B382D'), textAlign: 'center' }}>
        <div style={{ ...S.wrap, maxWidth: '960px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FDE047', textTransform: 'uppercase', letterSpacing: '0.1em' }}>TESTIMONI PESAKIT (BAHAGIAN 2)</span>
          <h2 style={S.h2gold}>Betulkah Aura Assyifa Berkesan Untuk Selesaikan Gangguan?</h2>
          <p style={{ fontSize: '1rem', color: '#FFFFFF', marginBottom: '2.5rem', opacity: 0.9, lineHeight: 1.6 }}>Jom baca apa kata mereka yang dah cuba rawatan Aura Assyifa 👇</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', alignItems: 'start' }}>
            {TESTI2.map((src, i) => (
              <div key={i} style={{ borderRadius: '16px', overflow: 'hidden', border: '2px solid #FDE047', boxShadow: '0 8px 25px rgba(0,0,0,0.3)', background: '#042E23' }}>
                <img src={src} alt={`Testimoni Pesakit Aura Assyifa ${i + 4}`} style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
            ))}
          </div>
          <p style={{ marginTop: '1.8rem', fontSize: '0.88rem', color: '#A7F3D0', fontStyle: 'italic', lineHeight: 1.6 }}>
            Semua testimoni di atas adalah daripada pesakit sebenar yang telah mendapatkan rawatan Aura Assyifa. Alhamdulillah — semoga Allah terus permudahkan urusan mereka.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          COMPARISON TABLE
      ═══════════════════════════════════════════ */}
      <section style={{ ...S.section('#031E17'), textAlign: 'center' }}>
        <div style={{ ...S.wrap, maxWidth: '920px' }}>
          <div style={S.badge()}>💡 Perbandingan</div>
          <h2 style={S.h2gold}>Pengisian Aura Assyifa vs Air Penawar vs Rawatan Luar Biasa</h2>
          <p style={S.sub()}>
            Tiga pilihan — tapi hanya satu yang memberikan perlindungan <strong style={{ color: '#FDE047' }}>berterusan tanpa had</strong> untuk kes berulang & berat.
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, minWidth: '480px' }}>
              <thead>
                <tr>
                  <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.8rem', color: '#6EE7B7', fontWeight: 700, borderBottom: '2px solid rgba(255,255,255,0.1)' }}>Ciri-Ciri</th>
                  <th style={{ padding: '1rem 0.5rem', textAlign: 'center', fontSize: '0.82rem', fontWeight: 800, color: '#94A3B8', borderBottom: '2px solid rgba(255,255,255,0.1)' }}>💧 Air Penawar</th>
                  <th style={{ padding: '1rem 0.5rem', textAlign: 'center', fontSize: '0.82rem', fontWeight: 800, color: '#94A3B8', borderBottom: '2px solid rgba(255,255,255,0.1)' }}>🏥 Rawatan Luar</th>
                  <th style={{ padding: '1rem 0.5rem', textAlign: 'center', fontSize: '0.82rem', fontWeight: 800, color: '#FDE047', borderBottom: '2px solid rgba(255,255,255,0.1)', background: 'rgba(253,224,71,0.06)', borderRadius: '12px 12px 0 0' }}>💎 Pengisian Aura Assyifa</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row, i) => (
                  <tr key={row.label} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'transparent' }}>
                    <td style={{ padding: '0.85rem 1rem', fontSize: '0.85rem', color: '#FEF3C7', fontWeight: 600, textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>{row.label}</td>
                    <td style={{ padding: '0.85rem 0.5rem', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}><span style={{ color: row.air ? '#4ADE80' : '#F87171', fontSize: '1.1rem' }}>{row.air ? '✅' : '❌'}</span></td>
                    <td style={{ padding: '0.85rem 0.5rem', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}><span style={{ color: row.rawatan ? '#4ADE80' : '#F87171', fontSize: '1.1rem' }}>{row.rawatan ? '✅' : '❌'}</span></td>
                    <td style={{ padding: '0.85rem 0.5rem', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(253,224,71,0.04)' }}><span style={{ color: '#4ADE80', fontSize: '1.1rem' }}>✅</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PRICING / CTA / BORANG
      ═══════════════════════════════════════════ */}
      <section id="borang" style={{ ...S.section('#042E23'), textAlign: 'center' }}>
        <div style={{ ...S.wrap, maxWidth: '680px' }}>
          <div style={S.badge()}>💎 Tempahan</div>
          <h2 style={S.h2gold}>Dapatkan Pengisian Aura Assyifa Anda</h2>
          <p style={S.sub()}>
            Satu pelaburan untuk perlindungan seumur hidup. Pelarasan mingguan percuma selama-lamanya.
          </p>

          {/* Price Card */}
          <div style={{ background: 'linear-gradient(135deg, #031E17 0%, #042E23 100%)', border: '2px solid #FDE047', borderRadius: '24px', padding: '2.5rem 2rem', marginBottom: '2rem', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FDE047', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>💎 Pengisian Aura Assyifa</div>
            <div style={{ fontSize: 'clamp(3rem, 8vw, 4.5rem)', fontWeight: 900, color: '#FDE047', lineHeight: 1, marginBottom: '0.25rem' }}>RM90</div>
            <div style={{ fontSize: '0.9rem', color: '#A7F3D0', marginBottom: '2rem' }}>Bayar Sekali · Guna Seumur Hidup</div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', textAlign: 'left', marginBottom: '2rem' }}>
              {[
                '✅ Pengisian pada barang anda (cincin, tasbih, dll)',
                '✅ 4 lapisan ayat ruqyah syar\'iyyah',
                '✅ Proses jarak jauh — tanpa perlu pos barang',
                '✅ Siap dalam 7 hari bekerja',
                '✅ Pelarasan setiap minggu automatik (percuma)',
                '✅ Panduan penggunaan lengkap disertakan',
                '✅ 100% Patuh Syariah — tiada unsur syirik',
              ].map(item => (
                <div key={item} style={{ fontSize: '0.875rem', color: '#D1FAE5', lineHeight: 1.5 }}>{item}</div>
              ))}
            </div>

            <WAButton id="cta-borang" label="💎 Tempah Pengisian RM90 Sekarang" />
            <p style={{ marginTop: '0.85rem', fontSize: '0.8rem', color: '#6EE7B7', fontStyle: 'italic' }}>
              Hubungi via WhatsApp · Selamat · 100% Patuh Syariah
            </p>
          </div>

          {/* FAQ */}
          <div style={{ textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FDE047', marginBottom: '1.25rem', textAlign: 'center' }}>Soalan Lazim</h3>
            {[
              { q: 'Barang apa yang boleh diisi?', a: 'Cincin, tasbih, gelang, rantai, atau mana-mana barang peribadi yang sentiasa dibawa bersama. Barang tidak perlu dihantar — proses dilakukan jarak jauh.' },
              { q: 'Berapa lama proses pengisian?', a: 'Pengisian penuh mengambil masa 7 hari bekerja. Selepas itu, pelarasan mingguan dilakukan secara automatik.' },
              { q: "Adakah ini patuh syariah?", a: "Ya, 100%. Pengisian hanya menggunakan ayat-ayat Al-Quran dan doa-doa yang bersandarkan Sunnah. Tiada unsur syirik, jampi atau azimat haram." },
              { q: 'Macam mana nak guna barang berisian?', a: 'Panduan penggunaan lengkap akan diberikan selepas tempahan. Cara penggunaan mudah dan boleh dilakukan sendiri di rumah.' },
              { q: 'Adakah pengisian ini perlu diisi semula?', a: 'Tidak. Perawat Aura Assyifa buat pelarasan setiap minggu secara automatik. Kekuatan barang sentiasa dikekalkan pada tahap penuh.' },
            ].map((faq) => (
              <div key={faq.q} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(253,224,71,0.15)', borderRadius: '12px', padding: '1.1rem 1.25rem', marginBottom: '0.75rem' }}>
                <p style={{ margin: '0 0 0.4rem 0', fontWeight: 800, color: '#FDE047', fontSize: '0.88rem' }}>❓ {faq.q}</p>
                <p style={{ margin: 0, color: '#D1FAE5', fontSize: '0.85rem', lineHeight: 1.65 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CLOSING CTA
      ═══════════════════════════════════════════ */}
      <section style={{ ...S.section('#021812'), textAlign: 'center' }}>
        <div style={{ ...S.wrap, maxWidth: '680px' }}>
          <h2 style={S.h2gold}>Aura Assyifa hadir untuk mereka yang mahu bangkit — tanpa menunggu, tanpa bergantung, tanpa had.</h2>
          <p style={{ fontSize: '1rem', color: '#A7F3D0', lineHeight: 1.7, marginBottom: '2rem' }}>
            Dengan Pengisian Aura Assyifa, setiap kali diserang — anda bersedia. Setiap malam — anda terlindung. Setiap hari — anda lebih kuat.
          </p>
          <WAButton id="cta-closing" label="💎 Saya Mahu Pengisian Aura Assyifa'" />
          <p style={{ marginTop: '1rem', fontSize: '0.82rem', color: '#6EE7B7' }}>Hubungi via WhatsApp · RM90 sekali bayar · Seumur Hidup</p>
        </div>
      </section>
    </main>
  );
}
