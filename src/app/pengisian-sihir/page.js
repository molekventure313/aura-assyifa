'use client';

import { useEffect, useRef, useState } from 'react';
import PageViewTracker from '@/components/salespage/PageViewTracker';

const WA_NUMBER = '60133892002';
const WA_MESSAGE = encodeURIComponent(
  "Assalamualaikum, saya berminat untuk mendapatkan Pengisian Pemusnah Sihir dari Aura Assyifa (RM90). Boleh saya tahu langkah seterusnya?"
);
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
  @keyframes fadeInUp { from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)} }
  @keyframes shimmer { 0%{background-position:-200% center}100%{background-position:200% center} }
  @keyframes pulseGlow {
    0%,100%{box-shadow:0 0 20px rgba(253,224,71,0.3),0 10px 40px rgba(0,0,0,0.4)}
    50%{box-shadow:0 0 45px rgba(253,224,71,0.6),0 10px 40px rgba(0,0,0,0.4)}
  }
  .anim-card{opacity:0;transform:translateY(24px);transition:opacity .55s ease,transform .55s ease,box-shadow .25s ease}
  .anim-card.visible{opacity:1;transform:translateY(0)}
  .anim-card:hover{transform:translateY(-4px) !important;box-shadow:0 20px 40px rgba(0,0,0,.35) !important}
  .anim-section{opacity:0;transform:translateY(20px);transition:opacity .6s ease,transform .6s ease}
  .anim-section.visible{opacity:1;transform:translateY(0)}
  .cta-btn{position:relative;overflow:hidden;transition:transform .2s ease,box-shadow .2s ease}
  .cta-btn::after{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.25),transparent);animation:shimmer 2.5s infinite}
  .cta-btn:hover{transform:translateY(-2px) scale(1.02);box-shadow:0 16px 40px rgba(234,179,8,.55) !important}
  .testi-img{transition:transform .3s ease,box-shadow .3s ease}
  .testi-img:hover{transform:scale(1.02);box-shadow:0 16px 40px rgba(0,0,0,.3) !important}
  .check-row{display:flex;align-items:flex-start;gap:.75rem;margin-bottom:.65rem}
  .check-row::before{content:'';width:20px;height:20px;min-width:20px;background:#4ADE80;border-radius:50%;margin-top:1px;mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='white'%3E%3Cpath fill-rule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clip-rule='evenodd'/%3E%3C/svg%3E");-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='white'%3E%3Cpath fill-rule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clip-rule='evenodd'/%3E%3C/svg%3E");mask-size:cover;-webkit-mask-size:cover}
  .orb{position:absolute;border-radius:50%;filter:blur(70px);pointer-events:none}
  @media(max-width:640px){.hero-h1{font-size:1.8rem !important}}
`;

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.anim-card, .anim-section');
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function StatNum({ target, suffix = '' }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        obs.disconnect();
        let start = 0;
        const step = target / 40;
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setVal(target); clearInterval(timer); }
          else setVal(Math.floor(start));
        }, 35);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

function WAButton({ label = 'Hubungi Kami Sekarang', size = 'large', id = 'cta' }) {
  const large = size === 'large';
  return (
    <a href={WA_LINK} target="_blank" rel="noopener noreferrer" id={id} className="cta-btn"
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
        padding: large ? '1.15rem 2.6rem' : '0.85rem 1.8rem',
        fontSize: large ? '1.08rem' : '0.95rem',
        fontWeight: 800, color: '#042E23',
        background: 'linear-gradient(135deg, #FDE047 0%, #F59E0B 100%)',
        borderRadius: '50px', textDecoration: 'none',
        boxShadow: '0 10px 30px rgba(234,179,8,0.4)',
        border: '2px solid rgba(255,255,255,0.3)',
        letterSpacing: '-0.01em',
      }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      {label}
    </a>
  );
}

const DIVIDER = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', padding: '0.5rem 1rem' }}>
    <div style={{ height: '1px', flex: 1, background: 'linear-gradient(90deg, transparent, rgba(253,224,71,0.3))' }} />
    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FDE047', opacity: 0.6 }} />
    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FDE047' }} />
    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FDE047', opacity: 0.6 }} />
    <div style={{ height: '1px', flex: 1, background: 'linear-gradient(90deg, rgba(253,224,71,0.3), transparent)' }} />
  </div>
);

/* ─── DATA ─── */
const SIGNS_CHECKLIST = [
  'Tidur selalu terganggu, terkejut atau dihantui mimpi buruk',
  'Selalu sakit selepas Asar terutama di bahagian belakang badan',
  'Sakit kepala yang bukan dari darah tinggi atau migrain',
  'Rasa seperti ada sesuatu yang merayap di dalam badan',
  'Sakit yang tidak dapat dijelaskan walaupun dah jumpa doktor',
  'Panas badan yang selalu beralih-alih tanpa sebab jelas',
  'Selalu bergaduh antara suami isteri tanpa punca yang jelas',
];

const SYMPTOMS = [
  { num: '01', title: 'Hubungan Rumah Tangga Retak & Sering Bergaduh', desc: 'Emosi cepat panas dengan pasangan, hilang rasa kasih sayang dan perkara kecil menjadi punca pertengkaran hebat tanpa sebab yang munasabah.' },
  { num: '02', title: 'Pintu Rezeki & Perniagaan Tersekat', desc: 'Berniaga atau bekerja keras tetapi pendapatan sentiasa tidak mencukupi, pelanggan lari atau perniagaan merosot secara pelik tanpa penjelasan logik.' },
  { num: '03', title: 'Sakit Fizikal Berterusan Tanpa Punca Perubatan', desc: 'Kesakitan badan yang mencucuk, sengal belikat terutama selepas Asar walaupun doktor sahkan semua keputusan ujian normal.' },
  { num: '04', title: 'Badan Sentiasa Lesu & Sukar Tidur Malam', desc: 'Terjaga tiba-tiba waktu malam dalam keadaan cemas, dada berdebar-debar serta kerap mendapat mimpi buruk menakutkan.' },
  { num: '05', title: 'Perubahan Perangai & Emosi Tidak Terkawal', desc: 'Mudah marah, cemas melampau tanpa sebab, rasa sedih mendalam atau tiba-tiba rasa ingin menyendiri dari keluarga.' },
  { num: '06', title: 'Suasana Rumah Terasa Panas & Penuh Gangguan', desc: 'Kediaman berasa tidak selesa, ahli keluarga bergantian sakit atau terasa diperhatikan oleh entiti asing di dalam rumah.' },
];

const WHY_PENGISIAN = [
  { num: '01', title: 'Sihir Dihantar Berkali-Kali — Rawatan Biasa Tidak Cukup', desc: 'Ada pihak yang sengaja menghantar sihir berulang kali. Setiap kali rawatan selesai, serangan baru datang semula. Perlu perlindungan yang sentiasa aktif.' },
  { num: '02', title: 'Sihir Aktif 24 Jam — Perawat Tidak Boleh Pantau 24 Jam', desc: 'Sihir tidak tidur. Ia aktif siang dan malam. Dengan pengisian pada barang anda, perlindungan berterusan tanpa perlu perawat hadir setiap masa.' },
  { num: '03', title: 'Ikatan Sihir Perlu Diputuskan Dari Akar', desc: 'Sihir yang lama bertapak memerlukan ayat khusus pembatal dibacakan secara konsisten. Pengisian memastikan ayat ini sentiasa aktif pada barang anda.' },
  { num: '04', title: 'Benteng Mesti Ada Agar Sihir Baru Tidak Masuk', desc: 'Selepas ikatan sihir diputuskan, perlu ada benteng perlindungan. Pengisian menyediakan lapisan benteng yang tidak pernah pudar.' },
  { num: '05', title: 'Rawatan Berterusan Tanpa Kos Tambahan', desc: 'Berbanding pergi ke perawat berulang kali, pengisian sekali bayar memberikan rawatan berterusan seumur hidup dengan pelarasan mingguan percuma.' },
  { num: '06', title: 'Buat Air Penawar Sendiri Bila-Bila Masa', desc: 'Tidak perlu bergantung pada sesiapa untuk dapatkan air penawar. Gunakan barang berisian anda — buat sendiri, bila-bila masa, di rumah.' },
];

const GOALS = [
  { num: '01', title: 'Memutuskan & Membatalkan Ikatan Sihir', desc: 'Ayat-ayat pembatal sihir yang diisikan bertindak memutuskan setiap ikatan dan simpulan sihir — dari punca asalnya.' },
  { num: '02', title: 'Memulihkan Tidur & Menghentikan Gangguan Malam', desc: 'Menghentikan mimpi buruk, terjaga terkejut dan gangguan waktu malam yang menjadi tanda khas serangan sihir.' },
  { num: '03', title: 'Melegakan Kesakitan Fizikal Berkaitan Sihir', desc: 'Kesakitan di belakang, belikat, kepala dan sensasi benda merayap yang berpunca dari sihir akan beransur reda.' },
  { num: '04', title: 'Memulihkan Keharmonian Rumah Tangga', desc: 'Memecahkan sihir pemisah yang menyebabkan pertengkaran, dingin antara pasangan dan kehancuran rumahtangga.' },
  { num: '05', title: 'Membuka Semula Pintu Rezeki Yang Tersekat', desc: 'Sihir penghalang rezeki yang membelit kehidupan anda diputuskan, memberi ruang kepada berkat dan peluang untuk mengalir semula.' },
];

const LAYERS = [
  { num: 'I', accent: '#EF4444', title: 'Ayat Ruqyah Pembakar & Pemusnah Jin Sihir', desc: 'Membakar dan memusnahkan jin yang dihantar melalui sihir. Bertindak balas secara aktif apabila ada entiti yang cuba mendekat atau mengganggu.' },
  { num: 'II', accent: '#F59E0B', title: 'Ayat Khusus Pembatal Sihir', desc: 'Memutuskan dan membatalkan setiap ikatan, simpulan dan amalan sihir yang pernah dihantar atau sedang aktif — dari punca asalnya.' },
  { num: 'III', accent: '#4ADE80', title: 'Ayat Benteng Anti-Sihir', desc: 'Membina dinding perlindungan kuat di sekeliling barang dan pemiliknya. Sihir baru yang cuba masuk akan dihalang dan dipukul balik.' },
  { num: 'IV', accent: '#34D399', title: 'Ayat-Ayat Kesembuhan & Pemulihan', desc: 'Memulihkan kesan-kesan sihir yang masih tinggal dalam badan dan jiwa — membantu proses penyembuhan spiritual dan fizikal secara berterusan.' },
];

const DALIL = [
  {
    arabic: 'وَنُنَزِّلُ مِنَ ٱلْقُرْءَانِ مَا هُوَ شِفَآءٌ وَرَحْمَةٌ لِّلْمُؤْمِنِينَ',
    trans: '"Dan Kami turunkan dari Al-Quran sesuatu yang menjadi penawar dan rahmat bagi orang-orang yang beriman."',
    ref: "Surah Al-Isra' (17:82)",
  },
  {
    arabic: 'وَإِذَا مَرِضْتُ فَهُوَ يَشْفِينِ',
    trans: '"Dan apabila aku sakit, Dialah (Allah) yang menyembuhkanku."',
    ref: "Surah Ash-Shu'ara (26:80)",
  },
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
  '/images/testimonials/testimoni_pengisian_5.png',
  '/images/testimonials/testimoni_pengisian_6.png',
  '/images/testimonials/testimoni_pengisian_7.png',
];

/* ══════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════ */
export default function PengisianSihirPage() {
  useReveal();

  return (
    <main style={{ minHeight: '100vh', background: '#042E23', fontFamily: "'Inter', -apple-system, sans-serif", color: '#FFF' }}>
      <style>{GLOBAL_CSS}</style>
      <PageViewTracker slug="pengisian-sihir" />

      {/* ══════════ HERO ══════════ */}
      <section style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(160deg, #010E09 0%, #021812 50%, #042E23 100%)', padding: '5rem 1rem 4rem', textAlign: 'center' }}>
        <div className="orb" style={{ width: 400, height: 400, background: 'radial-gradient(circle, rgba(5,150,105,0.18) 0%, transparent 70%)', top: '-100px', left: '-100px' }} />
        <div className="orb" style={{ width: 300, height: 300, background: 'radial-gradient(circle, rgba(253,224,71,0.08) 0%, transparent 70%)', bottom: '-50px', right: '-50px' }} />

        <div style={{ maxWidth: '860px', margin: '0 auto', position: 'relative', animation: 'fadeInUp 0.8s ease both' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(253,224,71,0.1)', border: '1px solid rgba(253,224,71,0.4)', padding: '0.4rem 1.2rem', borderRadius: '50px', marginBottom: '1.5rem', fontSize: '0.75rem', fontWeight: 800, color: '#FDE047', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Aura Assyifa · Pengisian Khusus Kes Sihir
          </div>

          <h1 className="hero-h1" style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3rem)', fontWeight: 900, color: '#FEF3C7', lineHeight: 1.18, letterSpacing: '-0.03em', marginBottom: '1.25rem' }}>
            Ramai Yang Menderita Akibat Sihir Tidak Sedar Bahawa{' '}
            <span style={{ color: '#FDE047', textShadow: '0 0 30px rgba(253,224,71,0.3)' }}>Mereka Sedang Ditimpa Bala</span>
          </h1>

          <p style={{ fontSize: '1.05rem', color: '#FCA5A5', lineHeight: 1.75, maxWidth: '640px', margin: '0 auto 1.75rem' }}>
            Sihir boleh hadir dalam pelbagai bentuk — memusnahkan kesihatan fizikal, emosi, rumahtangga dan rezeki anda.{' '}
            <strong style={{ color: '#FEF3C7' }}>Dan ia tidak akan berhenti sendiri tanpa tindakan.</strong>
          </p>

          {/* Checklist glassmorphism box */}
          <div style={{ backdropFilter: 'blur(12px)', background: 'rgba(239,68,68,0.06)', border: '1.5px solid rgba(239,68,68,0.35)', borderRadius: '20px', padding: '1.5rem 2rem', maxWidth: '620px', margin: '0 auto 2rem', textAlign: 'left', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#F87171', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.9rem' }}>Tanda-Tanda Anda Mungkin Terkena Sihir</div>
            {SIGNS_CHECKLIST.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', marginBottom: '0.5rem' }}>
                <span style={{ width: '20px', height: '20px', borderRadius: '4px', background: 'rgba(253,224,71,0.15)', border: '1px solid rgba(253,224,71,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 3.5L4 6.5L9 1" stroke="#FDE047" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
                <span style={{ fontSize: '0.875rem', color: '#FEF3C7', lineHeight: 1.55 }}>{s}</span>
              </div>
            ))}
          </div>

          {/* Pill tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.6rem', marginBottom: '2.5rem' }}>
            {['Jarak Jauh — Tanpa Pos', '100% Patuh Syariah', 'Pelarasan Mingguan Percuma', 'Siap Dalam 7 Hari'].map(t => (
              <span key={t} style={{ background: 'rgba(167,243,208,0.08)', border: '1px solid rgba(167,243,208,0.2)', color: '#A7F3D0', fontSize: '0.82rem', fontWeight: 600, padding: '0.35rem 1rem', borderRadius: '999px' }}>{t}</span>
            ))}
          </div>

          {/* Medallion */}
          <div style={{ width: '140px', height: '140px', borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%, #065F46, #010E09)', border: '2px solid rgba(253,224,71,0.6)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2.5rem', animation: 'pulseGlow 3s ease-in-out infinite', boxShadow: '0 0 0 8px rgba(253,224,71,0.05)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #FDE047, #F59E0B)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.4rem', boxShadow: '0 4px 16px rgba(253,224,71,0.4)' }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="#042E23">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
              </svg>
            </div>
            <span style={{ fontSize: '0.5rem', color: '#FDE047', fontWeight: 800, letterSpacing: '0.06em', textAlign: 'center', lineHeight: 1.4 }}>PENGISIAN<br />PEMUSNAH<br />SIHIR</span>
          </div>

          <WAButton id="cta-hero" label="Hubungi Kami — Tempah Sekarang" />
          <p style={{ marginTop: '0.85rem', fontSize: '0.8rem', color: '#6EE7B7', fontStyle: 'italic', opacity: 0.8 }}>Hubungi via WhatsApp · 100% Patuh Syariah</p>
        </div>
      </section>

      {/* ══════════ TESTI 1 ══════════ */}
      <section style={{ background: '#FFFFFF', color: '#0F172A', padding: '4.5rem 1rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '980px', margin: '0 auto' }} className="anim-section">
          <span style={{ display: 'inline-block', fontSize: '0.72rem', fontWeight: 800, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '0.5rem', background: 'rgba(5,150,105,0.08)', padding: '0.3rem 1rem', borderRadius: '50px', border: '1px solid rgba(5,150,105,0.2)' }}>Testimoni Pesakit — Bahagian 1</span>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 800, color: '#0F172A', marginTop: '0.5rem', marginBottom: '0.5rem', letterSpacing: '-0.02em', lineHeight: 1.25 }}>Apa Kata Mereka Yang Dah Cuba Rawatan Aura Assyifa?</h2>
          <p style={{ fontSize: '1rem', color: '#4B5563', marginBottom: '2.5rem', lineHeight: 1.6 }}>Bukan kami yang cakap — biar pesakit sendiri yang kongsikan pengalaman mereka.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', alignItems: 'start' }}>
            {TESTI1.map((src, i) => (
              <div key={i} className="testi-img anim-card" style={{ borderRadius: '16px', overflow: 'hidden', border: '2px solid #059669', boxShadow: '0 8px 25px rgba(0,0,0,0.08)', background: '#F8FAFC', transitionDelay: `${i * 0.1}s` }}>
                <img src={src} alt={`Testimoni Pesakit Aura Assyifa ${i + 1}`} style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
            ))}
          </div>
          <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
            {[{ target: 500, suffix: '+', label: 'Pesakit Dirawat' }, { target: 98, suffix: '%', label: 'Puas Hati' }, { target: 100, suffix: '%', label: 'Patuh Syariah' }].map(({ target, suffix, label }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'clamp(2rem, 5vw, 2.8rem)', fontWeight: 900, color: '#047857', lineHeight: 1 }}><StatNum target={target} suffix={suffix} /></div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '0.3rem' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ TANDA-TANDA SIHIR ══════════ */}
      <section style={{ background: '#042E23', padding: '4.5rem 1rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }} className="anim-section">
          <span style={{ display: 'inline-block', fontSize: '0.72rem', fontWeight: 800, color: '#F87171', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '0.5rem', background: 'rgba(248,113,113,0.1)', padding: '0.3rem 1rem', borderRadius: '50px', border: '1px solid rgba(248,113,113,0.3)' }}>Tanda-Tanda Sihir</span>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 800, color: '#FDE047', marginTop: '0.5rem', marginBottom: '0.75rem', letterSpacing: '-0.02em', lineHeight: 1.25 }}>Adakah Anda Mengalami Masalah Ini?</h2>
          <p style={{ fontSize: '1rem', color: '#D1FAE5', lineHeight: 1.65, maxWidth: '680px', margin: '0 auto 2.5rem', opacity: 0.9 }}>
            Sihir boleh hadir dalam pelbagai bentuk. Ini adalah <strong style={{ color: '#FDE047' }}>tanda-tanda paling kerap</strong> yang dilaporkan oleh mangsa sihir. Jika anda mengalami lebih dari 3 perkara ini — kemungkinan besar anda perlu rawatan segera.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1.2rem', textAlign: 'left' }}>
            {SYMPTOMS.map((s, i) => (
              <div key={s.num} className="anim-card" style={{ background: '#FFFFFF', border: '2px solid rgba(253,224,71,0.35)', borderRadius: '14px', padding: '1.35rem 1.25rem', display: 'flex', alignItems: 'flex-start', gap: '0.85rem', boxShadow: '0 4px 16px rgba(0,0,0,0.2)', transitionDelay: `${i * 0.08}s` }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#DC2626', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M13 1L1 13M1 1l12 12" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
                </div>
                <div>
                  <p style={{ margin: '0 0 0.25rem', fontWeight: 800, fontSize: '0.92rem', color: '#0F172A' }}>{s.title}</p>
                  <p style={{ margin: 0, fontSize: '0.82rem', color: '#374151', lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ KENAPA PENGISIAN ══════════ */}
      <section style={{ background: 'linear-gradient(160deg, #0B1A0F 0%, #031208 100%)', padding: '4.5rem 1rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }} className="anim-section">
          <span style={{ display: 'inline-block', fontSize: '0.72rem', fontWeight: 800, color: '#FDE047', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '0.5rem', background: 'rgba(253,224,71,0.1)', padding: '0.3rem 1rem', borderRadius: '50px', border: '1px solid rgba(253,224,71,0.3)' }}>Kenapa Rawatan Biasa Tidak Cukup</span>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 800, color: '#FDE047', marginTop: '0.5rem', marginBottom: '0.75rem', letterSpacing: '-0.02em', lineHeight: 1.25 }}>Kenapa Mangsa Sihir Perlu Pengisian — Bukan Sekadar Rawatan Biasa?</h2>
          <p style={{ fontSize: '1rem', color: '#D1FAE5', lineHeight: 1.65, maxWidth: '680px', margin: '0 auto 2.5rem', opacity: 0.9 }}>
            Rawatan biasa membuang sihir untuk sementara. Tapi tanpa perlindungan yang sentiasa aktif —{' '}
            <strong style={{ color: '#FDE047' }}>sihir baru boleh dihantar semula bila-bila masa.</strong>
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', textAlign: 'left' }}>
            {WHY_PENGISIAN.map((p, i) => (
              <div key={p.num} className="anim-card" style={{ background: 'linear-gradient(135deg, #064E3B 0%, #065F46 100%)', border: '1px solid rgba(253,224,71,0.15)', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.25)', transitionDelay: `${i * 0.08}s` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.7rem' }}>
                  <span style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(253,224,71,0.15)', border: '1px solid rgba(253,224,71,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 900, color: '#FDE047', flexShrink: 0 }}>{p.num}</span>
                  <div style={{ fontWeight: 800, color: '#FDE047', fontSize: '0.92rem', lineHeight: 1.3 }}>{p.title}</div>
                </div>
                <p style={{ margin: 0, fontSize: '0.84rem', color: '#D1FAE5', lineHeight: 1.65, opacity: 0.9 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ DALIL ISLAM ══════════ */}
      <section style={{ background: '#042E23', padding: '4.5rem 1rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '920px', margin: '0 auto' }} className="anim-section">
          <span style={{ display: 'inline-block', fontSize: '0.72rem', fontWeight: 800, color: '#FDE047', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '0.5rem', background: 'rgba(253,224,71,0.1)', padding: '0.3rem 1rem', borderRadius: '50px', border: '1px solid rgba(253,224,71,0.3)' }}>Dalil & Asas</span>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 800, color: '#FDE047', marginTop: '0.5rem', marginBottom: '0.75rem', letterSpacing: '-0.02em', lineHeight: 1.25 }}>Rawatan Sihir Melalui Al-Quran — Perintah &amp; Janji Allah</h2>
          <p style={{ fontSize: '1rem', color: '#D1FAE5', lineHeight: 1.65, maxWidth: '700px', margin: '0 auto 2.5rem', opacity: 0.9 }}>Allah SWT telah menjanjikan bahawa Al-Quran adalah penawar. Konsep pengisian ayat ruqyah pada barang adalah qias kepada amalan yang diiktiraf ulama.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
            {DALIL.map((d, i) => (
              <div key={i} className="anim-card" style={{ background: 'rgba(253,224,71,0.05)', border: '1.5px solid rgba(253,224,71,0.25)', borderRadius: '16px', padding: '1.75rem 1.5rem', transitionDelay: `${i * 0.15}s` }}>
                <div style={{ fontSize: '1.1rem', fontFamily: 'serif', color: '#FDE047', lineHeight: 2.2, marginBottom: '1rem', direction: 'rtl', textAlign: 'right' }}>{d.arabic}</div>
                <div style={{ borderTop: '1px solid rgba(253,224,71,0.15)', paddingTop: '1rem', textAlign: 'left' }}>
                  <p style={{ margin: '0 0 0.4rem', fontSize: '0.875rem', color: '#FEF3C7', lineHeight: 1.7, fontStyle: 'italic' }}>{d.trans}</p>
                  <span style={{ fontSize: '0.75rem', color: '#6EE7B7', fontWeight: 700 }}>{d.ref}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: 'rgba(74,222,128,0.06)', border: '1.5px solid rgba(74,222,128,0.2)', borderRadius: '14px', padding: '1.5rem 1.8rem' }} className="anim-card">
            <p style={{ margin: '0 0 0.4rem', fontSize: '1rem', color: '#FEF3C7', fontStyle: 'italic', lineHeight: 1.75 }}>&quot;Gunakanlah ruqyah (bacaan doa perlindungan) selama ia tidak mengandungi syirik.&quot;</p>
            <span style={{ fontSize: '0.8rem', color: '#6EE7B7', fontWeight: 700 }}>Hadith Riwayat Muslim</span>
          </div>
        </div>
      </section>

      {/* ══════════ MATLAMAT / GOALS ══════════ */}
      <section style={{ background: '#F8FAFC', color: '#0F172A', padding: '4.5rem 1rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }} className="anim-section">
          <span style={{ display: 'inline-block', fontSize: '0.72rem', fontWeight: 800, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '0.5rem', background: 'rgba(5,150,105,0.08)', padding: '0.3rem 1rem', borderRadius: '50px', border: '1px solid rgba(5,150,105,0.2)' }}>Matlamat Rawatan</span>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 800, color: '#042E23', marginTop: '0.5rem', marginBottom: '0.75rem', letterSpacing: '-0.02em', lineHeight: 1.25 }}>Apa Yang Ingin Dicapai Melalui Pengisian Pemusnah Sihir Aura Assyifa?</h2>
          <p style={{ fontSize: '1rem', color: '#4B5563', lineHeight: 1.65, marginBottom: '2.5rem' }}>Pengisian ini dirangka khusus untuk menyelesaikan tanda-tanda gangguan sihir yang anda alami secara tuntas dan patuh syariah.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
            {GOALS.map((g, i) => (
              <div key={g.num} className="anim-card" style={{ background: '#FFFFFF', border: '1.5px solid #E2E8F0', borderRadius: '14px', padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'flex-start', gap: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', transitionDelay: `${i * 0.1}s` }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'linear-gradient(135deg, #042E23, #065F46)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 12px rgba(4,46,35,0.3)' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#FDE047' }}>{g.num}</span>
                </div>
                <div>
                  <p style={{ margin: '0 0 0.25rem', fontWeight: 800, fontSize: '0.97rem', color: '#042E23' }}>{g.title}</p>
                  <p style={{ margin: 0, fontSize: '0.84rem', color: '#374151', lineHeight: 1.6 }}>{g.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 4 LAYERS ══════════ */}
      <section style={{ background: '#031E17', padding: '4.5rem 1rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '920px', margin: '0 auto' }} className="anim-section">
          <span style={{ display: 'inline-block', fontSize: '0.72rem', fontWeight: 800, color: '#FDE047', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '0.5rem', background: 'rgba(253,224,71,0.1)', padding: '0.3rem 1rem', borderRadius: '50px', border: '1px solid rgba(253,224,71,0.3)' }}>Apa Yang Diisikan</span>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 800, color: '#FDE047', marginTop: '0.5rem', marginBottom: '0.75rem', letterSpacing: '-0.02em', lineHeight: 1.25 }}>4 Lapisan Ayat Ruqyah Khusus Kes Sihir</h2>
          <p style={{ fontSize: '1rem', color: '#D1FAE5', lineHeight: 1.7, maxWidth: '680px', margin: '0 auto 2.5rem', opacity: 0.9 }}>Setiap barang diisi dengan 4 lapisan ayat ruqyah syar&apos;iyyah yang berbeza fungsi — direka khusus untuk merawat dan melindungi mangsa sihir secara menyeluruh.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
            {LAYERS.map((l, i) => (
              <div key={l.num} className="anim-card" style={{ background: '#042E23', border: `2px solid ${l.accent}33`, borderRadius: '16px', padding: '1.75rem', boxShadow: `0 8px 24px rgba(0,0,0,0.3), inset 0 0 0 1px ${l.accent}11`, transitionDelay: `${i * 0.12}s` }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${l.accent}20`, border: `1.5px solid ${l.accent}60`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '1rem', fontWeight: 900, color: l.accent, fontFamily: 'serif' }}>{l.num}</span>
                </div>
                <div style={{ fontWeight: 800, color: '#FDE047', marginBottom: '0.6rem', fontSize: '0.95rem', lineHeight: 1.3 }}>{l.title}</div>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#D1FAE5', lineHeight: 1.65, opacity: 0.9 }}>{l.desc}</p>
              </div>
            ))}
          </div>
          {/* Callout */}
          <div style={{ background: 'linear-gradient(135deg, #065F46 0%, #047857 100%)', border: '2px solid rgba(16,185,129,0.4)', borderRadius: '18px', padding: '1.75rem', display: 'flex', alignItems: 'flex-start', gap: '1.25rem', textAlign: 'left' }} className="anim-card">
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>
            </div>
            <div>
              <div style={{ fontWeight: 800, color: '#FEF3C7', fontSize: '1.05rem', marginBottom: '0.5rem' }}>Kekuatan Tidak Berkurang — Pelarasan Setiap Minggu</div>
              <p style={{ margin: 0, color: '#D1FAE5', fontSize: '0.92rem', lineHeight: 1.7 }}>Perawat Aura Assyifa akan buat <strong style={{ color: '#FDE047' }}>pelarasan dan pengisian semula setiap minggu secara automatik</strong> — memastikan kekuatan ayat ruqyah pada barang anda sentiasa pada kapasiti penuh. Berbeza dengan air penawar yang habis.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ TESTI 2 ══════════ */}
      <section style={{ background: '#0B382D', padding: '4.5rem 1rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '980px', margin: '0 auto' }} className="anim-section">
          <span style={{ display: 'inline-block', fontSize: '0.72rem', fontWeight: 800, color: '#FDE047', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '0.5rem', background: 'rgba(253,224,71,0.1)', padding: '0.3rem 1rem', borderRadius: '50px', border: '1px solid rgba(253,224,71,0.3)' }}>Testimoni Pesakit — Bahagian 2</span>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 800, color: '#FDE047', marginTop: '0.5rem', marginBottom: '0.5rem', letterSpacing: '-0.02em', lineHeight: 1.25 }}>Betulkah Aura Assyifa Berkesan Untuk Selesaikan Gangguan Sihir?</h2>
          <p style={{ fontSize: '1rem', color: '#FFFFFF', marginBottom: '2.5rem', opacity: 0.85, lineHeight: 1.6 }}>Jom baca apa kata mereka yang dah cuba rawatan Aura Assyifa</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', alignItems: 'start' }}>
            {TESTI2.map((src, i) => (
              <div key={i} className="testi-img anim-card" style={{ borderRadius: '16px', overflow: 'hidden', border: '2px solid rgba(253,224,71,0.4)', boxShadow: '0 8px 30px rgba(0,0,0,0.3)', background: '#042E23', transitionDelay: `${i * 0.12}s` }}>
                <img src={src} alt={`Testimoni Pesakit Aura Assyifa ${i + 4}`} style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
            ))}
          </div>
          <p style={{ marginTop: '2rem', fontSize: '0.88rem', color: '#A7F3D0', fontStyle: 'italic', lineHeight: 1.6, opacity: 0.8 }}>Semua testimoni di atas adalah daripada pesakit sebenar. Alhamdulillah — semoga Allah terus permudahkan urusan mereka.</p>
        </div>
      </section>

      {/* ══════════ COMPARISON TABLE ══════════ */}
      <section style={{ background: '#031E17', padding: '4.5rem 1rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '920px', margin: '0 auto' }} className="anim-section">
          <span style={{ display: 'inline-block', fontSize: '0.72rem', fontWeight: 800, color: '#FDE047', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '0.5rem', background: 'rgba(253,224,71,0.1)', padding: '0.3rem 1rem', borderRadius: '50px', border: '1px solid rgba(253,224,71,0.3)' }}>Perbandingan</span>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 800, color: '#FDE047', marginTop: '0.5rem', marginBottom: '0.75rem', letterSpacing: '-0.02em', lineHeight: 1.25 }}>Pengisian Aura Assyifa vs Air Penawar vs Rawatan Luar Biasa</h2>
          <p style={{ fontSize: '1rem', color: '#D1FAE5', lineHeight: 1.65, maxWidth: '680px', margin: '0 auto 2.5rem', opacity: 0.9 }}>Tiga pilihan — tapi hanya satu yang memberikan perlindungan <strong style={{ color: '#FDE047' }}>berterusan tanpa had</strong>.</p>
          <div style={{ borderRadius: '16px', border: '1px solid rgba(253,224,71,0.15)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '480px' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.8rem', color: '#6EE7B7', fontWeight: 700, borderBottom: '2px solid rgba(255,255,255,0.08)' }}>Ciri-Ciri</th>
                  <th style={{ padding: '1rem 0.5rem', textAlign: 'center', fontSize: '0.82rem', fontWeight: 800, color: '#94A3B8', borderBottom: '2px solid rgba(255,255,255,0.08)' }}>Air Penawar</th>
                  <th style={{ padding: '1rem 0.5rem', textAlign: 'center', fontSize: '0.82rem', fontWeight: 800, color: '#94A3B8', borderBottom: '2px solid rgba(255,255,255,0.08)' }}>Rawatan Luar</th>
                  <th style={{ padding: '1rem 0.5rem', textAlign: 'center', fontSize: '0.82rem', fontWeight: 800, color: '#FDE047', borderBottom: '2px solid rgba(253,224,71,0.3)', background: 'rgba(253,224,71,0.05)' }}>Pengisian Aura Assyifa</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row, i) => (
                  <tr key={row.label} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                    <td style={{ padding: '0.85rem 1rem', fontSize: '0.85rem', color: '#FEF3C7', fontWeight: 600, textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{row.label}</td>
                    <td style={{ padding: '0.85rem 0.5rem', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}><span style={{ color: row.air ? '#4ADE80' : '#EF4444', fontSize: '1rem', fontWeight: 700 }}>{row.air ? '✓' : '✗'}</span></td>
                    <td style={{ padding: '0.85rem 0.5rem', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}><span style={{ color: row.rawatan ? '#4ADE80' : '#EF4444', fontSize: '1rem', fontWeight: 700 }}>{row.rawatan ? '✓' : '✗'}</span></td>
                    <td style={{ padding: '0.85rem 0.5rem', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(253,224,71,0.04)' }}><span style={{ color: '#4ADE80', fontSize: '1rem', fontWeight: 700 }}>✓</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ══════════ PRICING + FAQ ══════════ */}
      <section id="borang" style={{ background: 'linear-gradient(160deg, #042E23 0%, #021812 100%)', padding: '4.5rem 1rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }} className="anim-section">
          <span style={{ display: 'inline-block', fontSize: '0.72rem', fontWeight: 800, color: '#FDE047', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '0.5rem', background: 'rgba(253,224,71,0.1)', padding: '0.3rem 1rem', borderRadius: '50px', border: '1px solid rgba(253,224,71,0.3)' }}>Tempahan</span>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 800, color: '#FDE047', marginTop: '0.5rem', marginBottom: '0.75rem', letterSpacing: '-0.02em', lineHeight: 1.25 }}>Dapatkan Pengisian Pemusnah Sihir Aura Assyifa</h2>
          <p style={{ fontSize: '1rem', color: '#D1FAE5', lineHeight: 1.65, maxWidth: '560px', margin: '0 auto 2rem', opacity: 0.9 }}>Satu pelaburan untuk perlindungan seumur hidup. Pelarasan mingguan percuma selama-lamanya.</p>

          {/* Price card */}
          <div style={{ background: 'linear-gradient(160deg, #031E17 0%, #042E23 100%)', border: '2px solid rgba(253,224,71,0.4)', borderRadius: '24px', padding: '2.5rem 2rem', marginBottom: '2rem', boxShadow: '0 24px 60px rgba(0,0,0,0.5), 0 0 60px rgba(253,224,71,0.06)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(253,224,71,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#FDE047', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>Pengisian Pemusnah Sihir Aura Assyifa</div>
            <div style={{ fontSize: 'clamp(3.5rem, 10vw, 5rem)', fontWeight: 900, color: '#FDE047', lineHeight: 1, marginBottom: '0.25rem', textShadow: '0 0 30px rgba(253,224,71,0.3)' }}>RM90</div>
            <div style={{ fontSize: '0.88rem', color: '#A7F3D0', marginBottom: '2rem', opacity: 0.85 }}>Bayar Sekali · Guna Seumur Hidup</div>

            <div style={{ textAlign: 'left', marginBottom: '2rem' }}>
              {[
                'Pengisian pada barang anda (cincin, tasbih, dll)',
                '4 lapisan ayat ruqyah khusus kes sihir',
                'Proses jarak jauh — tanpa perlu pos barang',
                'Siap dalam 7 hari bekerja',
                'Pelarasan setiap minggu automatik (percuma)',
                'Panduan penggunaan lengkap disertakan',
                "100% Patuh Syariah — tiada unsur syirik",
              ].map(item => (
                <div key={item} className="check-row">
                  <span style={{ fontSize: '0.875rem', color: '#D1FAE5', lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>

            <WAButton id="cta-borang" label="Hubungi Kami — Tempah Sekarang" />
            <p style={{ marginTop: '0.85rem', fontSize: '0.78rem', color: '#6EE7B7', fontStyle: 'italic', opacity: 0.8 }}>Hubungi via WhatsApp · 100% Patuh Syariah</p>
          </div>

          {/* FAQ */}
          <div style={{ textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FDE047', marginBottom: '1.25rem', textAlign: 'center' }}>Soalan Lazim</h3>
            {[
              { q: 'Adakah ini untuk kes sihir sahaja?', a: 'Pengisian Pemusnah Sihir ini dirangka khusus dengan 4 lapisan ayat yang ditujukan untuk kes sihir. Namun ia juga membantu gangguan jin yang berkait dengan sihir yang dihantar.' },
              { q: 'Barang apa yang boleh diisi?', a: 'Cincin, tasbih, gelang, rantai, atau mana-mana barang peribadi yang sentiasa dibawa bersama. Barang tidak perlu dihantar — proses dilakukan jarak jauh.' },
              { q: 'Berapa lama proses pengisian?', a: 'Pengisian penuh mengambil masa 7 hari bekerja. Selepas itu, pelarasan mingguan dilakukan secara automatik tanpa kos tambahan.' },
              { q: "Adakah ini patuh syariah?", a: "Ya, 100%. Pengisian hanya menggunakan ayat-ayat Al-Quran dan doa bersandarkan Sunnah. Tiada unsur syirik, jampi atau azimat haram." },
              { q: 'Macam mana nak guna barang berisian untuk kes sihir?', a: 'Panduan lengkap akan diberikan selepas tempahan — termasuk cara buat air penawar, cara rawat diri sendiri bila berasa diserang dan cara benteng rumah.' },
              { q: 'Adakah kekuatan pengisian berkurang dengan masa?', a: 'Tidak. Perawat Aura Assyifa buat pelarasan setiap minggu secara automatik. Kekuatan ayat ruqyah pada barang anda sentiasa dikekalkan pada tahap penuh.' },
            ].map((faq, i) => (
              <div key={faq.q} className="anim-card" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(253,224,71,0.12)', borderRadius: '12px', padding: '1.1rem 1.25rem', marginBottom: '0.75rem', transitionDelay: `${i * 0.08}s` }}>
                <p style={{ margin: '0 0 0.4rem', fontWeight: 800, color: '#FDE047', fontSize: '0.88rem' }}>S: {faq.q}</p>
                <p style={{ margin: 0, color: '#D1FAE5', fontSize: '0.84rem', lineHeight: 1.65, opacity: 0.9 }}>J: {faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CLOSING CTA ══════════ */}
      <section style={{ background: '#010E09', padding: '5rem 1rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="orb" style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(5,150,105,0.1) 0%, transparent 70%)', top: '-200px', left: '50%', transform: 'translateX(-50%)' }} />
        <div style={{ maxWidth: '680px', margin: '0 auto', position: 'relative' }} className="anim-section">
          <DIVIDER />
          <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', fontWeight: 800, color: '#FDE047', letterSpacing: '-0.02em', lineHeight: 1.3, margin: '2rem 0 1rem' }}>
            Jangan biarkan sihir terus menghancurkan hidup anda. Ambil tindakan hari ini.
          </h2>
          <p style={{ fontSize: '1rem', color: '#A7F3D0', lineHeight: 1.7, marginBottom: '2.5rem', opacity: 0.9 }}>
            Dengan Pengisian Pemusnah Sihir Aura Assyifa, setiap kali diserang — anda bersedia. Setiap malam — anda terlindung. Sihir tidak tidur, tapi perlindungan anda juga tidak.
          </p>
          <WAButton id="cta-closing" label="Hubungi Kami — Mula Perlindungan Sekarang" />
          <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#6EE7B7', opacity: 0.7 }}>RM90 sekali bayar · Seumur Hidup · Percuma Pelarasan Mingguan</p>
          <DIVIDER />
        </div>
      </section>
    </main>
  );
}
