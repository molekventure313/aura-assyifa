'use client';

import { useEffect, useRef, useState } from 'react';
import PageViewTracker from '@/components/salespage/PageViewTracker';

const WA_NUMBER = '60133892002';
const WA_MESSAGE = encodeURIComponent(
  "Assalamualaikum, saya berminat untuk mendapatkan Pengisian Aura Assyifa' (RM90). Boleh saya tahu langkah seterusnya?"
);
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

/* ─── CSS & Keyframes with Islamic Aesthetic ─── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Cinzel:wght@600;700;800;900&family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,600;0,700;0,800;0,900;1,600&display=swap');

  :root {
    --gold-primary: #E5B869;
    --gold-light: #FDE047;
    --gold-dark: #C5A059;
    --navy-dark: #050B1A;
    --navy-card: #070D20;
    --navy-section: #0B1528;
    --navy-surface: #0E1A34;
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes pulseGlow {
    0%,100% { box-shadow: 0 0 25px rgba(229,184,105,0.25), 0 10px 40px rgba(0,0,0,0.5); }
    50%     { box-shadow: 0 0 50px rgba(229,184,105,0.55), 0 10px 40px rgba(0,0,0,0.5); }
  }
  @keyframes floatSlow {
    0%,100% { transform: translateY(0); }
    50%     { transform: translateY(-8px); }
  }

  .font-serif-title {
    font-family: 'Playfair Display', Georgia, serif;
  }
  .font-arabic {
    font-family: 'Amiri', serif;
  }

  .anim-card {
    opacity: 0;
    transform: translateY(22px);
    transition: opacity 0.55s ease, transform 0.55s ease, box-shadow 0.25s ease;
  }
  .anim-card.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .anim-card:hover {
    transform: translateY(-4px) !important;
    box-shadow: 0 20px 40px rgba(0,0,0,0.45), 0 0 25px rgba(229,184,105,0.15) !important;
  }
  .anim-section {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .anim-section.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .cta-btn-gold {
    position: relative;
    overflow: hidden;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    background: linear-gradient(135deg, #E5B869 0%, #D4AF37 50%, #C5A059 100%);
    color: #070D20;
    font-weight: 800;
    border-radius: 50px;
    text-decoration: none;
    box-shadow: 0 10px 30px rgba(212,175,55,0.35);
    border: 1px solid rgba(255,255,255,0.4);
    letter-spacing: -0.01em;
  }
  .cta-btn-gold::after {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
    animation: shimmer 2.6s infinite;
  }
  .cta-btn-gold:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 16px 40px rgba(212,175,55,0.55) !important;
  }

  .cta-btn-outline {
    transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
    background: rgba(7, 13, 32, 0.6);
    backdrop-filter: blur(8px);
    color: #FDE047;
    font-weight: 700;
    border-radius: 50px;
    text-decoration: none;
    border: 1.5px solid rgba(229,184,105,0.5);
    box-shadow: 0 8px 24px rgba(0,0,0,0.3);
  }
  .cta-btn-outline:hover {
    transform: translateY(-2px);
    background: rgba(229,184,105,0.15);
    border-color: #FDE047;
  }

  .islamic-arch-box {
    border-radius: 40px 40px 20px 20px;
    position: relative;
  }

  .islamic-border-glow {
    border: 1.5px solid rgba(229,184,105,0.35);
    box-shadow: 0 10px 35px rgba(0,0,0,0.45), inset 0 0 20px rgba(229,184,105,0.03);
  }

  .islamic-pattern-bg {
    background-image: radial-gradient(rgba(229,184,105,0.06) 1px, transparent 1px);
    background-size: 24px 24px;
  }

  .testi-img {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .testi-img:hover {
    transform: scale(1.02);
    box-shadow: 0 16px 40px rgba(0,0,0,0.3) !important;
  }

  .check-row-islamic {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
  }

  .orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
  }

  @media (max-width: 900px) {
    .hero-split-grid {
      grid-template-columns: 1fr !important;
      gap: 2.5rem !important;
    }
  }
  @media (max-width: 640px) {
    .hero-h1 { font-size: 1.85rem !important; }
  }
`;

/* ─── Scroll Observer Hook ─── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.anim-card, .anim-section');
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ─── Animated Stat Counter ─── */
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

/* ─── Islamic Eight-Pointed Star Icon (Rub el Hizb ۞) ─── */
const IslamicStar = ({ size = 18, color = "#E5B869" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
    <path
      d="M12 2L14.8 5.6L19.4 4.6L18.4 9.2L22 12L18.4 14.8L19.4 19.4L14.8 18.4L12 22L9.2 18.4L4.6 19.4L5.6 14.8L2 12L5.6 9.2L4.6 4.6L9.2 5.6L12 2Z"
      stroke={color}
      strokeWidth="1.5"
      fill={`${color}22`}
    />
    <circle cx="12" cy="12" r="3" fill={color} />
  </svg>
);

/* ─── Islamic Mihrab Arch Frame Background ─── */
const MihrabArchBackdrop = () => (
  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', opacity: 0.45 }}>
    <svg width="100%" height="100%" viewBox="0 0 1440 900" fill="none" preserveAspectRatio="xMidYMin slice">
      <path
        d="M200 900 V400 C200 200 450 60 720 30 C990 60 1240 200 1240 400 V900"
        stroke="rgba(229,184,105,0.22)"
        strokeWidth="1.5"
        strokeDasharray="6 4"
      />
      <path
        d="M260 900 V420 C260 250 480 120 720 90 C960 120 1180 250 1180 420 V900"
        stroke="rgba(229,184,105,0.15)"
        strokeWidth="1"
      />
      {/* Decorative minaret / dome silhouettes */}
      <path
        d="M720 20 L720 90 M710 40 L730 40 M715 30 Q720 10 725 30"
        stroke="rgba(229,184,105,0.4)"
        strokeWidth="1.5"
      />
    </svg>
  </div>
);

/* ─── Islamic Geometric Arabesque Divider ─── */
const IslamicDivider = ({ label = '' }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.85rem', margin: '2rem auto', maxWidth: '700px', padding: '0 1rem' }}>
    <div style={{ height: '1px', flex: 1, background: 'linear-gradient(90deg, transparent, rgba(229,184,105,0.4))' }} />
    <IslamicStar size={16} color="#E5B869" />
    {label && (
      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#E5B869', textTransform: 'uppercase', letterSpacing: '0.14em', padding: '0 0.3rem' }}>
        {label}
      </span>
    )}
    <IslamicStar size={16} color="#E5B869" />
    <div style={{ height: '1px', flex: 1, background: 'linear-gradient(90deg, rgba(229,184,105,0.4), transparent)' }} />
  </div>
);

/* ─── Call To Action Button ─── */
function WAButton({ label = 'Hubungi Kami Sekarang', size = 'large', id = 'cta', outline = false }) {
  const large = size === 'large';
  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      id={id}
      className={outline ? 'cta-btn-outline' : 'cta-btn-gold'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.65rem',
        padding: large ? '1.1rem 2.4rem' : '0.85rem 1.75rem',
        fontSize: large ? '1.02rem' : '0.92rem',
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      {label}
    </a>
  );
}

/* ─── DATA ─── */
const PROBLEMS = [
  { num: '01', title: 'Jin Keluar Masa Rawatan — Tapi Datang Balik', desc: 'Perawat bantu buang jin semasa sesi. Tapi apabila balik rumah, sihir dihantar semula. Kitaran ini tidak pernah selesai tanpa perlindungan berterusan.' },
  { num: '02', title: 'Sihir Dihantar Berkali-Kali', desc: 'Ada pihak yang sengaja menghantar sihir berulang kali. Setiap kali rawatan selesai, serangan baru datang. Satu sesi tidak pernah cukup untuk kes sebegini.' },
  { num: '03', title: 'Kos & Tenaga Terkuras — Ulang Alik Tak Habis', desc: 'Setiap kali serangan baru, kena pergi semula berjumpa perawat. Kos tambang, kos rawatan, masa terbuang — masalah tetap berulang tanpa penghujung.' },
  { num: '04', title: 'Air Penawar Habis, Perlindungan Terputus', desc: 'Air yang dibacakan berkesan, tapi ia habis. Bila habis, tiada perlindungan. Terpaksa tunggu dapatkan bekalan baru — sementara itu anda terdedah.' },
  { num: '05', title: 'Diserang Waktu Malam — Tiada Siapa Nak Hubungi', desc: 'Serangan datang tengah malam. Perawat tidak boleh dihubungi. Tiada air penawar. Anda terpaksa tahan seorang diri hingga pagi.' },
  { num: '06', title: 'Kes Berat Perlukan Rawatan Berterusan', desc: 'Kes sihir berat atau saka lama tidak boleh selesai dengan satu atau dua sesi. Ia memerlukan rawatan konsisten, berterusan — sesuatu yang mahal.' },
];

const DANGERS = [
  { num: '01', col: '#FCA5A5', title: 'Gangguan Makin Parah Bila Dibiarkan', desc: 'Setiap hari tanpa rawatan, gangguan mengakar lebih dalam. Apa yang boleh diselesaikan awal, menjadi semakin sukar apabila ditangguh.' },
  { num: '02', col: '#FCA5A5', title: 'Sihir Penghalang Rezeki Terus Mengikat', desc: 'Selagi sihir tidak dinyahkan sepenuhnya, pintu rezeki kekal terkunci. Perniagaan terus sunyi. Peluang datang tapi hilang begitu sahaja.' },
  { num: '03', col: '#FCA5A5', title: 'Keluarga & Anak-Anak Turut Terdedah', desc: 'Gangguan di dalam rumah boleh merebak kepada ahli keluarga lain — terutama anak-anak yang lebih sensitif.' },
  { num: '04', col: '#FCA5A5', title: 'Mental & Emosi Terhakis Perlahan-Lahan', desc: 'Serangan berulang tanpa perlindungan menyebabkan tekanan, anxiety, dan kemurungan. Kekuatan diri semakin lemah.' },
  { num: '05', col: '#FCA5A5', title: 'Rumahtangga Retak Kerana Sihir Pemisah', desc: 'Sihir pemisah yang tidak dirawat boleh membuatkan pasangan berubah hati. Perbalahan tanpa sebab. Rumah tangga perlahan-lahan hancur.' },
  { num: '06', col: '#FCA5A5', title: 'Kos Rawatan Berulang Terus Membebankan', desc: 'Tanpa cara rawatan sendiri, anda terpaksa terus bergantung pada perawat luar. Kos bertimbun. Ini semua boleh dielakkan.' },
];

const BENEFITS = [
  { num: '01', title: 'Rawatan Tanpa Had — Seumur Hidup', desc: 'Tidak ada had bilangan rawatan. Guna setiap hari, setiap minggu — kekuatan barang berisian tidak pernah habis.' },
  { num: '02', title: 'Bertindak Balas Bila-Bila Masa Diserang', desc: 'Diserang malam-malam? Tidak perlu tunggu appointment. Guna barang berisian anda terus ketika itu juga.' },
  { num: '03', title: 'Rawat Di Rumah Sendiri — Tiada Perlu Keluar', desc: 'Dalam keselesaan rumah anda sendiri. Tiada perlu keluar, tiada appointment, tiada tunggu giliran.' },
  { num: '04', title: 'Buat Air Penawar Sendiri Bila Perlu', desc: 'Gunakan barang berisian untuk buat air penawar sendiri — tidak perlu bergantung pada sesiapa.' },
  { num: '05', title: 'Buat Air Mandian Ruqyah Sendiri', desc: 'Boleh digunakan untuk buat air mandian — membersihkan badan dan melindungi diri dari gangguan luar.' },
  { num: '06', title: 'Perlindungan 24 Jam Setiap Hari', desc: 'Ibarat ada perawat private di rumah. Perlindungan berterusan tanpa henti — siang atau malam.' },
  { num: '07', title: 'Boleh Bantu Seluruh Keluarga', desc: 'Satu barang berisian boleh membantu semua ahli keluarga. Jimat kos berbanding rawatan berasingan.' },
  { num: '08', title: 'Jimat Kos Jangka Panjang', desc: 'Bayar sekali sahaja, guna seumur hidup. Penjimatan yang luar biasa berbanding ke perawat berulang kali.' },
  { num: '09', title: "100% Ruqyah Syar'iyyah", desc: "Diisi dengan bacaan Al-Quran dan doa berlandaskan syarak semata-mata. Tiada unsur syirik." },
  { num: '10', title: 'Kekuatan Sentiasa Penuh — Pelarasan Mingguan', desc: 'Perawat Aura Assyifa buat pelarasan setiap minggu secara automatik. Kekuatan tidak pernah berkurang.' },
];

const LAYERS = [
  { num: 'I', accent: '#EF4444', title: 'Ayat Ruqyah Pembakar & Pemusnah Jin', desc: 'Ayat-ayat yang membakar dan memusnahkan jin yang menetap atau menyerang. Bertindak balas secara aktif apabila ada gangguan yang cuba mendekat.' },
  { num: 'II', accent: '#E5B869', title: 'Ayat Pembatal Sihir & Ikatan Ghaib', desc: 'Memutuskan dan membatalkan ikatan sihir yang pernah dihantar atau sedang aktif. Melemahkan setiap serangan sihir dari punca asalnya.' },
  { num: 'III', accent: '#4ADE80', title: 'Ayat Benteng Pertahanan Syariah', desc: 'Membina dinding perlindungan di sekeliling barang dan pemiliknya. Jin dan sihir yang cuba mendekat akan dihalang dan dipukul balik.' },
  { num: 'IV', accent: '#93C5FD', title: 'Ayat-Ayat Kesembuhan & Nur Syifa', desc: 'Memulihkan kesan-kesan gangguan yang masih tinggal dalam badan. Membantu proses penyembuhan spiritual dan fizikal secara berterusan.' },
];

const CHANGES = [
  { num: '01', title: 'Boleh Rawat Diri Sendiri Bila Diserang', desc: 'Sebaik sahaja berasa diserang atau tidak selesa, anda boleh terus bertindak — tanpa hubungi perawat, tanpa tunggu appointment.' },
  { num: '02', title: 'Perlindungan 24/7 — Malam Pun Selamat', desc: 'Serangan paling kerap berlaku waktu malam. Dengan barang berisian di tangan, anda bersedia setiap masa.' },
  { num: '03', title: 'Jimat Kos — Tidak Perlu Ulang Alik Ke Perawat', desc: 'Kos perjalanan, kos rawatan, masa terbuang — semua ini berkurangan drastik apabila anda mampu rawat sendiri.' },
  { num: '04', title: 'Buat Air Penawar Sendiri Bila Perlu', desc: 'Tidak perlu bergantung pada orang lain. Buat sendiri, bila-bila masa, menggunakan barang yang telah diisikan.' },
  { num: '05', title: 'Rasa Lebih Tenang & Selamat Di Rumah', desc: 'Mengetahui anda ada perlindungan yang sentiasa bersama memberikan ketenangan jiwa yang tidak ternilai.' },
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
  '/images/testimonials/testimoni_hadi_1.jpeg',
  '/images/testimonials/testimoni_hadi_2.jpg',
  '/images/testimonials/testimoni_hadi_3.jpeg',
  '/images/testimonials/testimoni_hadi_4.jpg',
];

const TESTI2 = [
  '/images/testimonials/testimoni_pengisian_5.png',
  '/images/testimonials/testimoni_pengisian_6.png',
  '/images/testimonials/testimoni_pengisian_7.png',
];

export default function PengisianAuraAssyifaPage() {
  useReveal();

  return (
    <main style={{ minHeight: '100vh', background: '#070D20', fontFamily: "'Inter', -apple-system, sans-serif", color: '#FFF' }} className="islamic-pattern-bg">
      <style>{GLOBAL_CSS}</style>
      <PageViewTracker slug="pengisian-aura-assyifa" />

      {/* ══════════════════════════════════════
          HERO SECTION (ISLAMIC ARCH ARCHITECTURE)
      ══════════════════════════════════════ */}
      <section style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(175deg, #050B1A 0%, #070D20 50%, #0B1528 100%)', padding: '4.5rem 1.25rem 5rem' }}>
        <MihrabArchBackdrop />
        <div className="orb" style={{ width: 450, height: 450, background: 'radial-gradient(circle, rgba(229,184,105,0.12) 0%, transparent 70%)', top: '-100px', left: '-100px' }} />
        <div className="orb" style={{ width: 380, height: 380, background: 'radial-gradient(circle, rgba(13,27,74,0.6) 0%, transparent 70%)', bottom: '-50px', right: '-50px' }} />

        <div style={{ maxWidth: '1160px', margin: '0 auto', position: 'relative', zIndex: 2, textAlign: 'center' }}>
          {/* Centered Hero Content */}
          <div style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
            {/* Top Islamic Badge - Dead Center */}
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', background: 'rgba(229,184,105,0.08)', border: '1px solid rgba(229,184,105,0.4)', padding: '0.45rem 1.3rem', borderRadius: '50px', marginBottom: '2rem', fontSize: '0.74rem', fontWeight: 800, color: '#E5B869', letterSpacing: '0.14em', textTransform: 'uppercase', backdropFilter: 'blur(6px)' }}>
              <IslamicStar size={14} color="#E5B869" />
              IKHTIAR RAWATAN ISLAM PREMIUM · AURA ASSYIFA
              <IslamicStar size={14} color="#E5B869" />
            </div>

            <h1 className="hero-h1 font-serif-title" style={{ fontSize: 'clamp(2.1rem, 4.8vw, 3.4rem)', fontWeight: 800, color: '#FBF7EE', lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: '1.4rem' }}>
              Ingatkan Dah Sihat…{' '}
              <span style={{ color: '#E5B869', textShadow: '0 0 35px rgba(229,184,105,0.35)', display: 'inline-block' }}>
                Tapi Gangguan Datang Balik?
              </span>
            </h1>

            <p style={{ fontSize: '1.08rem', color: '#BFDBFE', lineHeight: 1.8, marginBottom: '2.2rem', maxWidth: '680px', margin: '0 auto 2.2rem' }}>
              Pengisian doa, ayat-ayat syifa, zikir dan ruqyah syar&apos;iyyah pada barangan peribadi anda — disertai panduan lengkap, bimbingan berterusan dan pelarasan mingguan percuma.
            </p>

            {/* Dual CTA Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'center', marginBottom: '2.5rem' }}>
              <a href="#borang" className="cta-btn-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '1.05rem 2.4rem', fontSize: '1rem' }}>
                <IslamicStar size={16} color="#070D20" />
                Tempah Sekarang
              </a>
              <WAButton id="cta-hero-wa" label="WhatsApp Kami" outline={true} size="medium" />
            </div>

            {/* Islamic Trust Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.85rem', maxWidth: '780px', margin: '0 auto' }}>
              {[
                { text: 'Bimbingan Disediakan' },
                { text: '100% Patuh Syariah' },
                { text: 'Pelarasan Mingguan Percuma' },
                { text: 'Sokongan Sepanjang Hayat' },
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', background: 'rgba(229,184,105,0.06)', border: '1px solid rgba(229,184,105,0.25)', padding: '0.45rem 1.1rem', borderRadius: '50px' }}>
                  <IslamicStar size={14} color="#E5B869" />
                  <span style={{ fontSize: '0.84rem', color: '#E2E8F0', fontWeight: 600 }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TESTIMONIALS 1
      ══════════════════════════════════════ */}
      <section style={{ background: '#050B1A', color: '#FFF', padding: '4.5rem 1rem', textAlign: 'center', position: 'relative' }}>
        <div style={{ maxWidth: '1040px', margin: '0 auto' }} className="anim-section">
          <IslamicDivider label="Testimoni Pesakit — Bahagian 1" />
          <h2 className="font-serif-title" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.3rem)', fontWeight: 800, color: '#FBF7EE', marginTop: '0.5rem', marginBottom: '0.6rem', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
            Apa Kata Mereka Yang Telah Ikhtiar Bersama Aura Assyifa?
          </h2>
          <p style={{ fontSize: '1rem', color: '#BFDBFE', marginBottom: '2.5rem', lineHeight: 1.6 }}>
            Bukan kami yang berkata — biar pesakit sendiri yang berkongsi pengalaman kesembuhan dengan izin Allah SWT.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.4rem', alignItems: 'start' }}>
            {TESTI1.map((src, i) => (
              <div
                key={i}
                className="testi-img anim-card islamic-border-glow"
                style={{
                  borderRadius: '18px',
                  overflow: 'hidden',
                  background: '#070D20',
                  padding: '6px',
                  transitionDelay: `${i * 0.1}s`,
                }}
              >
                <div style={{ borderRadius: '12px', overflow: 'hidden' }}>
                  <img src={src} alt={`Testimoni Pesakit Aura Assyifa ${i + 1}`} style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
              </div>
            ))}
          </div>

          {/* Islamic Stats Counter Cards */}
          <div style={{ marginTop: '3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem', maxWidth: '820px', margin: '3rem auto 0' }}>
            {[
              { target: 500, suffix: '+', label: 'Pesakit Dirawat' },
              { target: 98, suffix: '%', label: 'Tahap Puas Hati' },
              { target: 100, suffix: '%', label: 'Patuh Syariah' },
            ].map(({ target, suffix, label }) => (
              <div
                key={label}
                className="islamic-border-glow"
                style={{
                  background: 'linear-gradient(160deg, #0B1528 0%, #070D20 100%)',
                  padding: '1.4rem 1rem',
                  borderRadius: '16px',
                  textAlign: 'center',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.4rem' }}>
                  <IslamicStar size={16} color="#E5B869" />
                </div>
                <div className="font-serif-title" style={{ fontSize: 'clamp(2rem, 4.5vw, 2.6rem)', fontWeight: 800, color: '#E5B869', lineHeight: 1 }}>
                  <StatNum target={target} suffix={suffix} />
                </div>
                <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#BFDBFE', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '0.4rem' }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          KENALI MASALAH (WHY REPEATING FAILS)
      ══════════════════════════════════════ */}
      <section style={{ background: 'linear-gradient(180deg, #070D20 0%, #0B1528 100%)', padding: '4.5rem 1rem', textAlign: 'center', position: 'relative' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }} className="anim-section">
          <IslamicDivider label="Kenali Masalah Anda" />
          <h2 className="font-serif-title" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.3rem)', fontWeight: 800, color: '#FBF7EE', marginTop: '0.5rem', marginBottom: '0.85rem', lineHeight: 1.3 }}>
            Kenapa Rawatan Luar Sahaja Tidak Cukup Untuk Kes Berat &amp; Berulang?
          </h2>
          <p style={{ fontSize: '1rem', color: '#EFF6FF', lineHeight: 1.7, maxWidth: '680px', margin: '0 auto 2.8rem', opacity: 0.9 }}>
            Ramai pesakit rasa lega selepas rawatan — tapi gangguan datang balik. Ini bukan salah perawat. Ini realiti kes sihir &amp; gangguan berat yang memerlukan <strong style={{ color: '#E5B869' }}>perlindungan berterusan tanpa henti.</strong>
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.4rem', textAlign: 'left' }}>
            {PROBLEMS.map((p, i) => (
              <div
                key={p.num}
                className="anim-card islamic-border-glow"
                style={{
                  background: 'linear-gradient(160deg, #0E1A34 0%, #070D20 100%)',
                  borderRadius: '18px',
                  padding: '1.6rem 1.4rem',
                  transitionDelay: `${i * 0.07}s`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.8rem' }}>
                  <span
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '8px',
                      background: 'rgba(229,184,105,0.12)',
                      border: '1px solid rgba(229,184,105,0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.72rem',
                      fontWeight: 900,
                      color: '#E5B869',
                      flexShrink: 0,
                    }}
                  >
                    {p.num}
                  </span>
                  <div style={{ fontWeight: 800, color: '#E5B869', fontSize: '0.94rem', lineHeight: 1.35 }}>{p.title}</div>
                </div>
                <p style={{ margin: 0, fontSize: '0.86rem', color: '#BFDBFE', lineHeight: 1.68 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          DANGER WARNING
      ══════════════════════════════════════ */}
      <section style={{ background: 'linear-gradient(180deg, #0B1528 0%, #050B1A 100%)', padding: '4.5rem 1rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '980px', margin: '0 auto' }} className="anim-section">
          <span style={{ display: 'inline-block', fontSize: '0.74rem', fontWeight: 800, color: '#EF4444', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '0.6rem', background: 'rgba(239,68,68,0.12)', padding: '0.4rem 1.3rem', borderRadius: '50px', border: '1.5px solid rgba(239,68,68,0.45)' }}>
            Peringatan Penting
          </span>
          <h2 className="font-serif-title" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.3rem)', fontWeight: 800, color: '#E5B869', marginTop: '0.5rem', marginBottom: '0.75rem', lineHeight: 1.3, textShadow: '0 0 25px rgba(229,184,105,0.25)' }}>
            Jika Gangguan Berulang Ini Tidak Diselesaikan Segera...
          </h2>
          <p style={{ fontSize: '1rem', color: '#BFDBFE', lineHeight: 1.65, maxWidth: '680px', margin: '0 auto 2.5rem', opacity: 0.9 }}>
            Ramai yang cuba mengabaikan. Namun hakikatnya —{' '}
            <strong style={{ color: '#E5B869' }}>semakin lama dibiarkan, semakin kukuh cengkaman gangguan pada tubuh dan kehidupan.</strong>
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1.25rem', textAlign: 'left', marginBottom: '2rem' }}>
            {DANGERS.map((d, i) => (
              <div
                key={d.num}
                className="anim-card"
                style={{
                  background: 'rgba(239,68,68,0.06)',
                  border: '1.5px solid rgba(239,68,68,0.3)',
                  borderRadius: '16px',
                  padding: '1.4rem 1.25rem',
                  transitionDelay: `${i * 0.08}s`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
                  <span style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(239,68,68,0.18)', border: '1px solid rgba(239,68,68,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 900, color: '#EF4444', flexShrink: 0 }}>
                    {d.num}
                  </span>
                  <h3 style={{ margin: 0, fontSize: '0.94rem', fontWeight: 800, color: '#EF4444', lineHeight: 1.35 }}>{d.title}</h3>
                </div>
                <p style={{ margin: 0, fontSize: '0.86rem', color: '#FFFFFF', lineHeight: 1.65, opacity: 0.95 }}>{d.desc}</p>
              </div>
            ))}
          </div>

          {/* Islamic Solusi Callout Box */}
          <div
            className="islamic-border-glow"
            style={{
              background: 'linear-gradient(135deg, rgba(14,26,52,0.9) 0%, rgba(7,13,32,0.95) 100%)',
              borderLeft: '4px solid #E5B869',
              borderRadius: '16px',
              padding: '1.6rem 1.8rem',
              display: 'flex',
              gap: '1.2rem',
              alignItems: 'flex-start',
              textAlign: 'left',
            }}
          >
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(229,184,105,0.15)', border: '1px solid rgba(229,184,105,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <IslamicStar size={20} color="#E5B869" />
            </div>
            <div>
              <p className="font-serif-title" style={{ margin: '0 0 0.35rem', fontSize: '1.05rem', color: '#FBF7EE', fontWeight: 700 }}>
                Penyelesaian Syari&apos;i: Perlindungan Yang Sentiasa Bersama
              </p>
              <p style={{ margin: 0, fontSize: '0.88rem', color: '#BFDBFE', lineHeight: 1.75 }}>
                Dengan Pengisian Aura Assyifa pada barangan peribadi anda, anda tidak perlu bergantung pada jadual perawat setiap kali serangan muncul. Anda boleh merawat diri sendiri bila-bila masa, di mana sahaja — dengan sandaran doa dan ayat ruqyah syar&apos;iyyah.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          DALIL & ASAS RUQYAH (ILLUMINATED MASHAF)
      ══════════════════════════════════════ */}
      <section style={{ background: '#070D20', padding: '4.5rem 1rem', textAlign: 'center', position: 'relative' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }} className="anim-section">
          {/* Bismillah Calligraphy Header */}
          <div className="font-arabic" style={{ fontSize: '1.8rem', color: '#E5B869', marginBottom: '0.5rem', letterSpacing: '0.02em', textShadow: '0 0 20px rgba(229,184,105,0.3)' }}>
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>

          <IslamicDivider label="Dalil &amp; Asas Syarak" />

          <h2 className="font-serif-title" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.3rem)', fontWeight: 800, color: '#FBF7EE', marginTop: '0.5rem', marginBottom: '0.85rem', lineHeight: 1.3 }}>
            Amalan Ruqyah Yang Berlandaskan Al-Quran &amp; Sunnah
          </h2>
          <p style={{ fontSize: '1rem', color: '#EFF6FF', lineHeight: 1.7, maxWidth: '720px', margin: '0 auto 2.5rem', opacity: 0.9 }}>
            Konsep pengisian ayat-ayat suci pada barangan adalah qias kepada bacaan ruqyah pada air, minyak atau kain yang telah sabit dalam amalan para ulama muktabar.
          </p>

          {/* Ayat Al-Quran in Illuminated Mosque Tile Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.4rem', marginBottom: '1.8rem' }}>
            {[
              {
                arabic: 'وَنُنَزِّلُ مِنَ ٱلْقُرْءَانِ مَا هُوَ شِفَآءٌ وَرَحْمَةٌ لِّلْمُؤْمِنِينَ',
                trans: '"Dan Kami turunkan dari Al-Quran suatu yang menjadi penawar dan rahmat bagi orang-orang yang beriman."',
                ref: "Surah Al-Isra' (17:82)",
              },
              {
                arabic: 'وَإِذَا مَرِضْتُ فَهُوَ يَشْفِينِ',
                trans: '"Dan apabila aku sakit, Dialah (Allah) yang menyembuhkan aku."',
                ref: "Surah Ash-Shu'ara (26:80)",
              },
            ].map((v, i) => (
              <div
                key={i}
                className="anim-card islamic-border-glow"
                style={{
                  background: 'linear-gradient(160deg, #0B1528 0%, #070D20 100%)',
                  borderRadius: '20px',
                  padding: '2rem 1.6rem',
                  textAlign: 'center',
                  transitionDelay: `${i * 0.15}s`,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.8rem' }}>
                  <IslamicStar size={16} color="#E5B869" />
                </div>
                <div className="font-arabic" style={{ fontSize: '1.4rem', color: '#FDE047', lineHeight: 2.2, marginBottom: '1rem', direction: 'rtl' }}>
                  {v.arabic}
                </div>
                <div style={{ borderTop: '1px solid rgba(229,184,105,0.2)', paddingTop: '1rem', textAlign: 'left' }}>
                  <p style={{ margin: '0 0 0.4rem', fontSize: '0.88rem', color: '#FEF3C7', lineHeight: 1.7, fontStyle: 'italic' }}>{v.trans}</p>
                  <span style={{ fontSize: '0.78rem', color: '#E5B869', fontWeight: 700 }}>{v.ref}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Hadith Box */}
          <div className="anim-card islamic-border-glow" style={{ background: 'rgba(229,184,105,0.06)', borderRadius: '16px', padding: '1.5rem 1.8rem', marginBottom: '1.6rem' }}>
            <p className="font-serif-title" style={{ margin: '0 0 0.4rem', fontSize: '1.05rem', color: '#FBF7EE', fontStyle: 'italic', lineHeight: 1.75 }}>
              &quot;Perlihatkanlah ruqyah-ruqyahmu kepadaku. Tidak mengapa melakukan ruqyah selama tidak mengandungi syirik.&quot;
            </p>
            <span style={{ fontSize: '0.82rem', color: '#E5B869', fontWeight: 700 }}>Hadith Riwayat Muslim (No. 2200)</span>
          </div>

          {/* Qias Clarification Card */}
          <div style={{ background: 'rgba(14,26,52,0.6)', border: '1px solid rgba(229,184,105,0.25)', borderRadius: '16px', padding: '1.4rem 1.8rem', textAlign: 'left', display: 'flex', gap: '1.1rem', alignItems: 'flex-start' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(229,184,105,0.12)', border: '1px solid rgba(229,184,105,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <IslamicStar size={18} color="#E5B869" />
            </div>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#EFF6FF', lineHeight: 1.75 }}>
              <strong style={{ color: '#E5B869' }}>Konsep Pengisian Aura Assyifa</strong> adalah qias kepada amalan membaca doa syifa pada air penawar. Kelebihannya — air akan habis diminum, manakala barangan yang dipasakkan bacaan ruqyah kekal selagi dijaga dengan baik, disokong oleh pelarasan mingguan secara percuma dari perawat kami.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          10 KELEBIHAN UTAMA
      ══════════════════════════════════════ */}
      <section style={{ background: 'linear-gradient(180deg, #070D20 0%, #0B1528 100%)', color: '#FFF', padding: '4.5rem 1rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }} className="anim-section">
          <IslamicDivider label="Ikhtiar Rawatan Mandiri" />
          <h2 className="font-serif-title" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.3rem)', fontWeight: 800, color: '#FBF7EE', marginTop: '0.5rem', marginBottom: '0.85rem', lineHeight: 1.3 }}>
            Pengisian Aura Assyifa — Pendamping Ruqyah Yang Sentiasa Bersama Anda
          </h2>
          <p style={{ fontSize: '1rem', color: '#BFDBFE', lineHeight: 1.7, maxWidth: '680px', margin: '0 auto 2.5rem' }}>
            Satu ikhtiar yang telus. Rawatan tanpa had masa. Tidak perlu menunggu temujanji —{' '}
            <strong style={{ color: '#E5B869' }}>setiap kali diserang, bertindak terus di rumah sendiri.</strong>
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', textAlign: 'left' }}>
            {BENEFITS.map((b, i) => (
              <div
                key={b.num}
                className="anim-card islamic-border-glow"
                style={{
                  background: '#0E1A34',
                  borderRadius: '16px',
                  padding: '1.35rem 1.25rem',
                  display: 'flex',
                  gap: '0.9rem',
                  alignItems: 'flex-start',
                  transitionDelay: `${i * 0.05}s`,
                }}
              >
                <span
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: 'rgba(229,184,105,0.15)',
                    border: '1px solid rgba(229,184,105,0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.72rem',
                    fontWeight: 900,
                    color: '#E5B869',
                    flexShrink: 0,
                  }}
                >
                  {b.num}
                </span>
                <div>
                  <p style={{ margin: '0 0 0.25rem', fontWeight: 800, fontSize: '0.92rem', color: '#E5B869' }}>{b.title}</p>
                  <p style={{ margin: 0, fontSize: '0.84rem', color: '#BFDBFE', lineHeight: 1.6 }}>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          4 LAPISAN AYAT RUQYAH (4 KUBAH BENTENG)
      ══════════════════════════════════════ */}
      <section style={{ background: '#050B1A', padding: '4.5rem 1rem', textAlign: 'center', position: 'relative' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }} className="anim-section">
          <IslamicDivider label="Struktur Ayat Ruqyah" />
          <h2 className="font-serif-title" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.3rem)', fontWeight: 800, color: '#FBF7EE', marginTop: '0.5rem', marginBottom: '0.85rem', lineHeight: 1.3 }}>
            4 Lapisan Ayat Ruqyah Syar&apos;iyyah — Benteng Pertahanan Menyeluruh
          </h2>
          <p style={{ fontSize: '1rem', color: '#EFF6FF', lineHeight: 1.7, maxWidth: '700px', margin: '0 auto 2.8rem', opacity: 0.9 }}>
            Setiap barangan diisi dengan 4 lapisan ayat ruqyah yang berbeza fungsi mengikut tertib syarak — membakar, membatal, membenteng dan menyembuhkan.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.4rem', marginBottom: '2.5rem' }}>
            {LAYERS.map((l, i) => (
              <div
                key={l.num}
                className="anim-card islamic-arch-box islamic-border-glow"
                style={{
                  background: 'linear-gradient(170deg, #0E1A34 0%, #070D20 100%)',
                  padding: '2rem 1.4rem',
                  textAlign: 'center',
                  transitionDelay: `${i * 0.1}s`,
                }}
              >
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    background: `${l.accent}15`,
                    border: `1.5px solid ${l.accent}60`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.2rem',
                  }}
                >
                  <span className="font-serif-title" style={{ fontSize: '1.15rem', fontWeight: 800, color: l.accent }}>{l.num}</span>
                </div>
                <div style={{ fontWeight: 800, color: '#E5B869', marginBottom: '0.65rem', fontSize: '0.98rem', lineHeight: 1.35 }}>
                  {l.title}
                </div>
                <p style={{ margin: 0, fontSize: '0.86rem', color: '#BFDBFE', lineHeight: 1.68 }}>{l.desc}</p>
              </div>
            ))}
          </div>

          {/* Weekly recalibration callout */}
          <div
            className="islamic-border-glow"
            style={{
              background: 'linear-gradient(135deg, #0B1528 0%, #070D20 100%)',
              borderRadius: '20px',
              padding: '1.8rem 2rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1.3rem',
              textAlign: 'left',
            }}
          >
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(229,184,105,0.15)', border: '1px solid rgba(229,184,105,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <IslamicStar size={24} color="#E5B869" />
            </div>
            <div>
              <div className="font-serif-title" style={{ fontWeight: 800, color: '#FBF7EE', fontSize: '1.1rem', marginBottom: '0.45rem' }}>
                Kekuatan Tidak Berkurang — Pelarasan Setiap Minggu
              </div>
              <p style={{ margin: 0, color: '#EFF6FF', fontSize: '0.92rem', lineHeight: 1.75 }}>
                Berbeza dengan air penawar yang habis diminum, perawat Aura Assyifa akan melakukan <strong style={{ color: '#E5B869' }}>pelarasan dan pengisian semula setiap minggu secara automatik</strong>. Barangan anda sentiasa mengekalkan daya kekuatan doa ruqyah secara optimum.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TESTIMONIALS 2
      ══════════════════════════════════════ */}
      <section style={{ background: '#070D20', padding: '4.5rem 1rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }} className="anim-section">
          <IslamicDivider label="Testimoni Pesakit — Bahagian 2" />
          <h2 className="font-serif-title" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.3rem)', fontWeight: 800, color: '#FBF7EE', marginTop: '0.5rem', marginBottom: '0.5rem', lineHeight: 1.3 }}>
            Bukti Nyata Kesan Ikhtiar Bersama Aura Assyifa
          </h2>
          <p style={{ fontSize: '1rem', color: '#BFDBFE', marginBottom: '2.5rem', lineHeight: 1.6 }}>
            Lihat perbualan dan pengakuan pesakit yang telah merasai perubahan ketara selepas mengamalkan pengisian ini.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', alignItems: 'start' }}>
            {TESTI2.map((src, i) => (
              <div
                key={i}
                className="testi-img anim-card islamic-border-glow"
                style={{
                  borderRadius: '18px',
                  overflow: 'hidden',
                  background: '#0B1528',
                  padding: '6px',
                  transitionDelay: `${i * 0.12}s`,
                }}
              >
                <div style={{ borderRadius: '12px', overflow: 'hidden' }}>
                  <img src={src} alt={`Testimoni Pesakit Aura Assyifa ${i + 4}`} style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
              </div>
            ))}
          </div>
          <p style={{ marginTop: '2.2rem', fontSize: '0.88rem', color: '#BFDBFE', fontStyle: 'italic', lineHeight: 1.6, opacity: 0.85 }}>
            Alhamdulillah — segala kesembuhan adalah mutlak dari Allah SWT. Kita hanya berikhtiar dengan jalan yang patuh syariah.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          JADUAL PERBANDINGAN
      ══════════════════════════════════════ */}
      <section style={{ background: 'linear-gradient(180deg, #070D20 0%, #050B1A 100%)', padding: '4.5rem 1rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }} className="anim-section">
          <IslamicDivider label="Jadual Perbandingan" />
          <h2 className="font-serif-title" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.3rem)', fontWeight: 800, color: '#FBF7EE', marginTop: '0.5rem', marginBottom: '0.85rem', lineHeight: 1.3 }}>
            Pengisian Aura Assyifa vs Air Penawar vs Rawatan Luar
          </h2>
          <p style={{ fontSize: '1rem', color: '#EFF6FF', lineHeight: 1.7, maxWidth: '680px', margin: '0 auto 2.5rem', opacity: 0.9 }}>
            Pilihlah kaedah yang memberi anda <strong style={{ color: '#E5B869' }}>perlindungan berpanjangan dan kebebasan merawat diri sendiri</strong>.
          </p>

          <div style={{ overflowX: 'auto', borderRadius: '20px', border: '1.5px solid rgba(229,184,105,0.3)', boxShadow: '0 10px 40px rgba(0,0,0,0.45)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '500px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(14,26,52,0.85)' }}>
                  <th style={{ padding: '1.2rem 1rem', fontSize: '0.85rem', color: '#E5B869', fontWeight: 800, borderBottom: '2px solid rgba(229,184,105,0.25)' }}>Ciri-Ciri</th>
                  <th style={{ padding: '1.2rem 0.5rem', textAlign: 'center', fontSize: '0.84rem', fontWeight: 700, color: '#94A3B8', borderBottom: '2px solid rgba(255,255,255,0.08)' }}>Air Penawar</th>
                  <th style={{ padding: '1.2rem 0.5rem', textAlign: 'center', fontSize: '0.84rem', fontWeight: 700, color: '#94A3B8', borderBottom: '2px solid rgba(255,255,255,0.08)' }}>Rawatan Luar</th>
                  <th style={{ padding: '1.2rem 0.75rem', textAlign: 'center', fontSize: '0.88rem', fontWeight: 900, color: '#070D20', background: 'linear-gradient(135deg, #E5B869, #D4AF37)', borderBottom: '2px solid #E5B869' }}>
                    Pengisian Aura Assyifa
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row, i) => (
                  <tr key={row.label} style={{ background: i % 2 === 0 ? 'rgba(14,26,52,0.3)' : 'transparent' }}>
                    <td style={{ padding: '0.9rem 1rem', fontSize: '0.86rem', color: '#FEF3C7', fontWeight: 600, borderBottom: '1px solid rgba(229,184,105,0.1)' }}>{row.label}</td>
                    <td style={{ padding: '0.9rem 0.5rem', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <span style={{ color: row.air ? '#4ADE80' : '#EF4444', fontSize: '1.05rem', fontWeight: 700 }}>{row.air ? '✓' : '✗'}</span>
                    </td>
                    <td style={{ padding: '0.9rem 0.5rem', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <span style={{ color: row.rawatan ? '#4ADE80' : '#EF4444', fontSize: '1.05rem', fontWeight: 700 }}>{row.rawatan ? '✓' : '✗'}</span>
                    </td>
                    <td style={{ padding: '0.9rem 0.5rem', textAlign: 'center', borderBottom: '1px solid rgba(229,184,105,0.15)', background: 'rgba(229,184,105,0.08)' }}>
                      <span style={{ color: '#E5B869', fontSize: '1.15rem', fontWeight: 900 }}>✓</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          PRICING & BORANG TEMPAHAN
      ══════════════════════════════════════ */}
      <section id="borang" style={{ background: 'linear-gradient(180deg, #050B1A 0%, #080F2E 100%)', padding: '5rem 1rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }} className="anim-section">
          <IslamicDivider label="Borang Tempahan Rasmi" />
          <h2 className="font-serif-title" style={{ fontSize: 'clamp(1.7rem, 3.8vw, 2.4rem)', fontWeight: 800, color: '#FBF7EE', marginTop: '0.5rem', marginBottom: '0.75rem', lineHeight: 1.3 }}>
            Dapatkan Pengisian Aura Assyifa Anda
          </h2>
          <p style={{ fontSize: '1rem', color: '#EFF6FF', lineHeight: 1.7, maxWidth: '580px', margin: '0 auto 2.2rem', opacity: 0.9 }}>
            Satu pelaburan kecil untuk perlindungan rohani sepanjang hayat, lengkap dengan pelarasan mingguan secara percuma.
          </p>

          {/* Grand Islamic Arch Price Card */}
          <div
            className="islamic-arch-box islamic-border-glow"
            style={{
              background: 'linear-gradient(170deg, #0E1A34 0%, #070D20 100%)',
              padding: '3rem 2rem 2.5rem',
              marginBottom: '2.5rem',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Top Emblem */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.8rem' }}>
              <IslamicStar size={24} color="#E5B869" />
            </div>

            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#E5B869', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '0.6rem' }}>
              Pakej Lengkap Pengisian Ruqyah
            </div>

            <div className="font-serif-title" style={{ fontSize: 'clamp(3.5rem, 10vw, 5rem)', fontWeight: 900, color: '#E5B869', lineHeight: 1, marginBottom: '0.35rem', textShadow: '0 0 30px rgba(229,184,105,0.35)' }}>
              RM90
            </div>

            <div style={{ fontSize: '0.9rem', color: '#BFDBFE', marginBottom: '2.2rem', fontWeight: 600 }}>
              Bayar Sekali · Ikhtiar Seumur Hidup
            </div>

            <div style={{ textAlign: 'left', marginBottom: '2.2rem', maxWidth: '520px', margin: '0 auto 2.2rem' }}>
              {[
                'Pengisian pada barangan peribadi anda (cincin, tasbih, dll)',
                '4 Lapisan ayat ruqyah syar\'iyyah lengkap',
                'Proses rawatan jarak jauh — tanpa perlu pos barang',
                'Siap dalam tempoh 7 hari bekerja',
                'Pelarasan setiap minggu secara automatik (percuma)',
                'Panduan amalan rawatan kendiri disertakan',
                '100% Patuh Syariah — tiada unsur khurafat & azimat',
              ].map(item => (
                <div key={item} className="check-row-islamic">
                  <IslamicStar size={16} color="#E5B869" />
                  <span style={{ fontSize: '0.9rem', color: '#EFF6FF', lineHeight: 1.55 }}>{item}</span>
                </div>
              ))}
            </div>

            <WAButton id="cta-borang" label="Hubungi Kami — Tempah Sekarang" size="large" />
            <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#BFDBFE', fontStyle: 'italic', opacity: 0.85 }}>
              Hubungi Terus Melalui WhatsApp Rasmi · 100% Patuh Syariah
            </p>
          </div>

          {/* FAQ with Islamic Design */}
          <div style={{ textAlign: 'left', marginTop: '3.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <IslamicStar size={18} color="#E5B869" />
              <h3 className="font-serif-title" style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FBF7EE', marginTop: '0.4rem' }}>
                Soalan Lazim (FAQ)
              </h3>
            </div>

            {[
              { q: 'Barang apa yang boleh diisi?', a: 'Cincin, tasbih, gelang, loket, atau barangan peribadi yang sentiasa anda bawa bersama. Barangan TIDAK perlu dipos kerana proses dilakukan secara jarak jauh.' },
              { q: 'Berapa lama proses pengisian mengambil masa?', a: 'Pengisian penuh mengambil masa 7 hari bekerja bagi memastikan bacaan ruqyah disempurnakan mengikut tertib. Selepas itu, pelarasan mingguan berjalan secara berterusan.' },
              { q: 'Adakah kaedah ini 100% patuh syariah?', a: 'Ya, sepenuhnya. Pengisian hanya menggunakan ayat-ayat suci Al-Quran dan doa-doa masyhur yang bersandarkan Sunnah Rasulullah SAW. Tiada sebarang tangkal, azimat atau jampi pemujaan.' },
              { q: 'Bagaimana cara menggunakan barangan yang telah diisi?', a: 'Panduan lengkap dan tatacara amalan akan diberikan kepada anda selepas tempahan disahkan. Kaedahnya mudah dan boleh diamalkan sendiri di kediaman anda.' },
              { q: 'Adakah kekuatan pengisian akan luput atau berkurang?', a: 'Tidak dengan izin Allah, kerana perawat kami melaksanakan pelarasan mingguan secara automatik untuk memastikan kekal berkesan pada tahap terbaik.' },
            ].map((faq, i) => (
              <div
                key={faq.q}
                className="anim-card islamic-border-glow"
                style={{
                  background: 'rgba(14,26,52,0.7)',
                  borderRadius: '14px',
                  padding: '1.25rem 1.4rem',
                  marginBottom: '0.9rem',
                  transitionDelay: `${i * 0.08}s`,
                }}
              >
                <p style={{ margin: '0 0 0.45rem', fontWeight: 800, color: '#E5B869', fontSize: '0.92rem' }}>
                  Soalan: {faq.q}
                </p>
                <p style={{ margin: 0, color: '#EFF6FF', fontSize: '0.86rem', lineHeight: 1.7, opacity: 0.9 }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CLOSING SECTION & DOA SYIFA
      ══════════════════════════════════════ */}
      <section style={{ background: '#050B1A', padding: '5rem 1rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="orb" style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(229,184,105,0.1) 0%, transparent 70%)', top: '-200px', left: '50%', transform: 'translateX(-50%)' }} />
        <div style={{ maxWidth: '720px', margin: '0 auto', position: 'relative', zIndex: 2 }} className="anim-section">
          <IslamicDivider />
          <h2 className="font-serif-title" style={{ fontSize: 'clamp(1.6rem, 3.8vw, 2.2rem)', fontWeight: 800, color: '#FBF7EE', letterSpacing: '-0.01em', lineHeight: 1.35, margin: '1.5rem 0 1rem' }}>
            Aura Assyifa Hadir Membantu Anda Bangkit — Tenang, Terlindung &amp; Istiqamah
          </h2>
          <p style={{ fontSize: '1.02rem', color: '#BFDBFE', lineHeight: 1.75, marginBottom: '2.5rem', opacity: 0.92 }}>
            Dengan Pengisian Aura Assyifa, setiap kali diserang anda bersedia. Setiap malam anda dilindungi dengan kalimah Allah. Mulakan langkah ikhtiar anda hari ini.
          </p>
          <WAButton id="cta-closing" label="Hubungi Kami — Mula Ikhtiar Sekarang" size="large" />
          <p style={{ marginTop: '1.2rem', fontSize: '0.82rem', color: '#E5B869', opacity: 0.85 }}>
            RM90 Sekali Bayar · Khidmat Seumur Hidup · Pelarasan Mingguan Percuma
          </p>
          <IslamicDivider />
        </div>
      </section>
    </main>
  );
}
