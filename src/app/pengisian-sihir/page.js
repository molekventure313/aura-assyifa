'use client';

import { useEffect, useRef, useState } from 'react';
import PageViewTracker from '@/components/salespage/PageViewTracker';

const WA_NUMBER = '60133892002';
const WA_MESSAGE = encodeURIComponent(
  "Assalamualaikum, saya berminat untuk mendapatkan Pengisian Pemusnah Sihir dari Aura Assyifa (RM90). Boleh saya tahu langkah seterusnya?"
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

  @media (max-width: 640px) {
    .hero-h1 { font-size: 1.85rem !important; }
  }
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
      <path
        d="M720 20 L720 90 M710 40 L730 40 M715 30 Q720 10 725 30"
        stroke="rgba(229,184,105,0.4)"
        strokeWidth="1.5"
      />
    </svg>
  </div>
);

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

/* ─── DATA KHUSUS SIHIR ─── */
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
  { num: 'II', accent: '#E5B869', title: 'Ayat Khusus Pembatal Ikatan Sihir', desc: 'Memutuskan dan membatalkan setiap ikatan, simpulan dan amalan sihir yang pernah dihantar atau sedang aktif — dari punca asalnya.' },
  { num: 'III', accent: '#4ADE80', title: 'Ayat Benteng Anti-Sihir Syariah', desc: 'Membina dinding perlindungan kuat di sekeliling barang dan pemiliknya. Sihir baru yang cuba masuk akan dihalang dan dipukul balik.' },
  { num: 'IV', accent: '#93C5FD', title: 'Ayat-Ayat Kesembuhan & Pemulihan Ruhani', desc: 'Memulihkan kesan-kesan sihir yang masih tinggal dalam badan dan jiwa — membantu proses penyembuhan spiritual dan fizikal secara berterusan.' },
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
  { label: 'Boleh digunakan berulang kali', rawatan: false, pengisian: true },
  { label: 'Tidak pernah habis / tamat', rawatan: false, pengisian: true },
  { label: 'Rawat sendiri tanpa perawat', rawatan: false, pengisian: true },
  { label: 'Bertindak balas waktu malam', rawatan: false, pengisian: true },
  { label: 'Tiada had bilangan rawatan', rawatan: false, pengisian: true },
  { label: 'Jimat kos jangka panjang', rawatan: false, pengisian: true },
  { label: 'Pelarasan mingguan automatik', rawatan: false, pengisian: true },
  { label: 'Bantu seluruh keluarga', rawatan: false, pengisian: true },
];

/* Testimoni Hadi 1 - 4 (Sama 100% dengan pengisian-aura-assyifa) */
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

export default function PengisianSihirPage() {
  useReveal();

  return (
    <main style={{ minHeight: '100vh', background: '#070D20', fontFamily: "'Inter', -apple-system, sans-serif", color: '#FFF' }} className="islamic-pattern-bg">
      <style>{GLOBAL_CSS}</style>
      <PageViewTracker slug="pengisian-sihir" />

      {/* ══════════ HERO SECTION ══════════ */}
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
              IKHTIAR RAWATAN ISLAM PREMIUM · PENGISIAN PEMUSNAH SIHIR
              <IslamicStar size={14} color="#E5B869" />
            </div>

            <h1 className="hero-h1 font-serif-title" style={{ fontSize: 'clamp(2.1rem, 4.8vw, 3.4rem)', fontWeight: 800, color: '#FBF7EE', lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: '1.4rem' }}>
              Sakit Bertahun-Tahun,{' '}
              <span style={{ color: '#E5B869', textShadow: '0 0 35px rgba(229,184,105,0.35)', display: 'inline-block' }}>
                Rupanya Asbab Terkena Sihir
              </span>
            </h1>

            <p style={{ fontSize: '1.08rem', color: '#BFDBFE', lineHeight: 1.8, marginBottom: '2.2rem', maxWidth: '680px', margin: '0 auto 2.2rem' }}>
              Sihir boleh hadir dalam pelbagai bentuk — memusnahkan kesihatan fizikal, emosi, rumahtangga dan rezeki anda. Ikhtiar pemusnah sihir jarak jauh dengan 4 lapisan ayat ruqyah syar&apos;iyyah.
            </p>

            {/* Checklist glassmorphism box */}
            <div className="islamic-border-glow" style={{ background: 'rgba(14,26,52,0.7)', borderRadius: '20px', padding: '1.6rem 2rem', maxWidth: '640px', margin: '0 auto 2.2rem', textAlign: 'left' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#E5B869', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.9rem' }}>
                Tanda-Tanda Serangan Sihir Yang Kerap Berlaku
              </div>
              {SIGNS_CHECKLIST.map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', marginBottom: '0.55rem' }}>
                  <IslamicStar size={16} color="#E5B869" />
                  <span style={{ fontSize: '0.88rem', color: '#EFF6FF', lineHeight: 1.55 }}>{s}</span>
                </div>
              ))}
            </div>

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
                { text: 'Jarak Jauh — Tanpa Pos' },
                { text: '100% Patuh Syariah' },
                { text: 'Pelarasan Mingguan Percuma' },
                { text: 'Siap Dalam 7 Hari' },
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

      {/* ══════════ TESTIMONI 1 (HADI 1-4) ══════════ */}
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

          {/* Stats */}
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

      {/* ══════════ SIMPTOM / MASALAH ══════════ */}
      <section style={{ background: 'linear-gradient(180deg, #070D20 0%, #0B1528 100%)', padding: '4.5rem 1rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }} className="anim-section">
          <IslamicDivider label="Peringatan Penting" />
          <h2 className="font-serif-title" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.3rem)', fontWeight: 800, color: '#E5B869', marginTop: '0.5rem', marginBottom: '0.75rem', lineHeight: 1.3, textShadow: '0 0 25px rgba(229,184,105,0.25)' }}>
            Jika Gangguan Berulang Ini Tidak Diselesaikan Segera...
          </h2>
          <p style={{ fontSize: '1rem', color: '#BFDBFE', lineHeight: 1.65, maxWidth: '680px', margin: '0 auto 2.5rem', opacity: 0.9 }}>
            Sihir yang tidak dimusnahkan hingga ke akar akan terus bertapak dan membesar.{' '}
            <strong style={{ color: '#E5B869' }}>Jika anda mengalami perkara di bawah</strong> — segera mulakan ikhtiar pemutus sihir.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.3rem', textAlign: 'left' }}>
            {SYMPTOMS.map((s, i) => (
              <div
                key={s.num}
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
                    {s.num}
                  </span>
                  <h3 style={{ margin: 0, fontSize: '0.94rem', fontWeight: 800, color: '#EF4444', lineHeight: 1.35 }}>{s.title}</h3>
                </div>
                <p style={{ margin: 0, fontSize: '0.86rem', color: '#FFFFFF', lineHeight: 1.65, opacity: 0.95 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ KENAPA PENGISIAN ══════════ */}
      <section style={{ background: '#050B1A', padding: '4.5rem 1rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }} className="anim-section">
          <IslamicDivider label="Kenapa Rawatan Biasa Tidak Cukup" />
          <h2 className="font-serif-title" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.3rem)', fontWeight: 800, color: '#FBF7EE', marginTop: '0.5rem', marginBottom: '0.85rem', lineHeight: 1.3 }}>
            Kenapa Pesakit Sihir Perlu Pengisian — Bukan Sekadar Rawatan Sekali?
          </h2>
          <p style={{ fontSize: '1rem', color: '#BFDBFE', lineHeight: 1.7, maxWidth: '680px', margin: '0 auto 2.5rem' }}>
            Rawatan sekali mungkin melegakan seketika. Tetapi tanpa benteng yang dipasakkan secara berterusan —{' '}
            <strong style={{ color: '#E5B869' }}>tukang sihir masih boleh menghantar serangan baru pada bila-bila masa.</strong>
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', textAlign: 'left' }}>
            {WHY_PENGISIAN.map((p, i) => (
              <div
                key={p.num}
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
                  {p.num}
                </span>
                <div>
                  <p style={{ margin: '0 0 0.25rem', fontWeight: 800, fontSize: '0.92rem', color: '#E5B869' }}>{p.title}</p>
                  <p style={{ margin: 0, fontSize: '0.84rem', color: '#BFDBFE', lineHeight: 1.6 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ DALIL ISLAM ══════════ */}
      <section style={{ background: 'linear-gradient(180deg, #070D20 0%, #0B1528 100%)', padding: '4.5rem 1rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }} className="anim-section">
          <div className="font-arabic" style={{ fontSize: '1.8rem', color: '#E5B869', marginBottom: '0.5rem', letterSpacing: '0.02em', textShadow: '0 0 20px rgba(229,184,105,0.3)' }}>
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>

          <IslamicDivider label="Dalil &amp; Asas Syarak" />

          <h2 className="font-serif-title" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.3rem)', fontWeight: 800, color: '#FBF7EE', marginTop: '0.5rem', marginBottom: '0.85rem', lineHeight: 1.3 }}>
            Pemusnahan Sihir Melalui Al-Quran — Perintah &amp; Janji Allah
          </h2>
          <p style={{ fontSize: '1rem', color: '#EFF6FF', lineHeight: 1.7, maxWidth: '700px', margin: '0 auto 2.5rem', opacity: 0.9 }}>
            Allah SWT telah menjanjikan bahawa Al-Quran adalah penawar dan pembatal sihir. Pengisian ruqyah adalah ikhtiar qias yang berlandaskan sunnah.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.4rem', marginBottom: '1.8rem' }}>
            {DALIL.map((d, i) => (
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
                  {d.arabic}
                </div>
                <div style={{ borderTop: '1px solid rgba(229,184,105,0.2)', paddingTop: '1rem', textAlign: 'left' }}>
                  <p style={{ margin: '0 0 0.4rem', fontSize: '0.88rem', color: '#FEF3C7', lineHeight: 1.7, fontStyle: 'italic' }}>{d.trans}</p>
                  <span style={{ fontSize: '0.78rem', color: '#E5B869', fontWeight: 700 }}>{d.ref}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="anim-card islamic-border-glow" style={{ background: 'rgba(229,184,105,0.06)', borderRadius: '16px', padding: '1.5rem 1.8rem' }}>
            <p className="font-serif-title" style={{ margin: '0 0 0.4rem', fontSize: '1.05rem', color: '#FBF7EE', fontStyle: 'italic', lineHeight: 1.75 }}>
              &quot;Gunakanlah ruqyah (bacaan doa perlindungan) selama ia tidak mengandungi syirik.&quot;
            </p>
            <span style={{ fontSize: '0.82rem', color: '#E5B869', fontWeight: 700 }}>Hadith Riwayat Muslim</span>
          </div>
        </div>
      </section>

      {/* ══════════ MATLAMAT RAWATAN ══════════ */}
      <section style={{ background: '#050B1A', color: '#FFF', padding: '4.5rem 1rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }} className="anim-section">
          <IslamicDivider label="Matlamat Rawatan" />
          <h2 className="font-serif-title" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.3rem)', fontWeight: 800, color: '#FBF7EE', marginTop: '0.5rem', marginBottom: '0.85rem', lineHeight: 1.3 }}>
            Apa Yang Ingin Dicapai Melalui Pengisian Pemusnah Sihir Aura Assyifa?
          </h2>
          <p style={{ fontSize: '1rem', color: '#BFDBFE', lineHeight: 1.7, maxWidth: '680px', margin: '0 auto 2.5rem' }}>
            Pengisian ini dirangka khusus untuk memusnahkan ikatan sihir secara tuntas, membuang punca dari akar dan membina benteng kekal.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', textAlign: 'left' }}>
            {GOALS.map((g, i) => (
              <div
                key={g.num}
                className="anim-card islamic-border-glow"
                style={{
                  background: '#0E1A34',
                  borderRadius: '16px',
                  padding: '1.35rem 1.25rem',
                  display: 'flex',
                  gap: '0.9rem',
                  alignItems: 'flex-start',
                  transitionDelay: `${i * 0.08}s`,
                }}
              >
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(229,184,105,0.15)', border: '1px solid rgba(229,184,105,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: '0.74rem', fontWeight: 900, color: '#E5B869' }}>{g.num}</span>
                </div>
                <div>
                  <p style={{ margin: '0 0 0.25rem', fontWeight: 800, fontSize: '0.94rem', color: '#E5B869' }}>{g.title}</p>
                  <p style={{ margin: 0, fontSize: '0.84rem', color: '#BFDBFE', lineHeight: 1.6 }}>{g.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 4 LAPISAN AYAT ══════════ */}
      <section style={{ background: '#070D20', padding: '4.5rem 1rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }} className="anim-section">
          <IslamicDivider label="Struktur Ayat Ruqyah" />
          <h2 className="font-serif-title" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.3rem)', fontWeight: 800, color: '#FBF7EE', marginTop: '0.5rem', marginBottom: '0.85rem', lineHeight: 1.3 }}>
            4 Lapisan Ayat Ruqyah Khusus Pemusnah Sihir
          </h2>
          <p style={{ fontSize: '1rem', color: '#EFF6FF', lineHeight: 1.7, maxWidth: '680px', margin: '0 auto 2.8rem', opacity: 0.9 }}>
            Setiap barang diisi dengan 4 lapisan ayat ruqyah syar&apos;iyyah yang berbeza fungsi — direka khusus untuk menghapuskan sihir secara menyeluruh.
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
                  transitionDelay: `${i * 0.12}s`,
                }}
              >
                <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: `${l.accent}15`, border: `1.5px solid ${l.accent}60`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.2rem' }}>
                  <span className="font-serif-title" style={{ fontSize: '1.15rem', fontWeight: 800, color: l.accent }}>{l.num}</span>
                </div>
                <div style={{ fontWeight: 800, color: '#E5B869', marginBottom: '0.65rem', fontSize: '0.98rem', lineHeight: 1.35 }}>{l.title}</div>
                <p style={{ margin: 0, fontSize: '0.86rem', color: '#BFDBFE', lineHeight: 1.68 }}>{l.desc}</p>
              </div>
            ))}
          </div>

          {/* Recalibration callout */}
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
                Perawat Aura Assyifa akan membuat <strong style={{ color: '#E5B869' }}>pelarasan dan pengisian semula setiap minggu secara automatik</strong> — memastikan benteng anti-sihir anda sentiasa kekal utuh melawan sebarang serangan baru.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ TESTIMONI 2 ══════════ */}
      <section style={{ background: '#050B1A', padding: '4.5rem 1rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }} className="anim-section">
          <IslamicDivider label="Testimoni Pesakit — Bahagian 2" />
          <h2 className="font-serif-title" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.3rem)', fontWeight: 800, color: '#FBF7EE', marginTop: '0.5rem', marginBottom: '0.5rem', lineHeight: 1.3 }}>
            Betulkah Aura Assyifa Berkesan Untuk Selesaikan Masalah Sihir?
          </h2>
          <p style={{ fontSize: '1rem', color: '#BFDBFE', marginBottom: '2.5rem', lineHeight: 1.6 }}>
            Lihat pengalaman sebenar mereka yang telah bebas daripada belenggu sihir selepas berikhtiar bersama kami.
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
            Semua testimoni di atas adalah daripada pesakit sebenar. Alhamdulillah — dengan izin dan pertolongan Allah SWT semata-mata.
          </p>
        </div>
      </section>

      {/* ══════════ JADUAL PERBANDINGAN (2 COLUMNS) ══════════ */}
      <section style={{ background: 'linear-gradient(180deg, #070D20 0%, #050B1A 100%)', padding: '4.5rem 1rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }} className="anim-section">
          <IslamicDivider label="Jadual Perbandingan" />
          <h2 className="font-serif-title" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.3rem)', fontWeight: 800, color: '#FBF7EE', marginTop: '0.5rem', marginBottom: '0.85rem', lineHeight: 1.3 }}>
            Pengisian Pemusnah Sihir vs Rawatan Luar
          </h2>
          <p style={{ fontSize: '1rem', color: '#EFF6FF', lineHeight: 1.7, maxWidth: '680px', margin: '0 auto 2.5rem', opacity: 0.9 }}>
            Pilihlah kaedah yang memberi anda <strong style={{ color: '#E5B869' }}>perlindungan berpanjangan dan kebebasan merawat diri sendiri</strong>.
          </p>

          <div style={{ overflowX: 'auto', borderRadius: '20px', border: '1.5px solid rgba(229,184,105,0.3)', boxShadow: '0 10px 40px rgba(0,0,0,0.45)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '450px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(14,26,52,0.85)' }}>
                  <th style={{ padding: '1.2rem 1rem', fontSize: '0.85rem', color: '#E5B869', fontWeight: 800, borderBottom: '2px solid rgba(229,184,105,0.25)' }}>Ciri-Ciri</th>
                  <th style={{ padding: '1.2rem 0.75rem', textAlign: 'center', fontSize: '0.84rem', fontWeight: 700, color: '#94A3B8', borderBottom: '2px solid rgba(255,255,255,0.08)' }}>Rawatan Luar</th>
                  <th style={{ padding: '1.2rem 1rem', textAlign: 'center', fontSize: '0.88rem', fontWeight: 900, color: '#070D20', background: 'linear-gradient(135deg, #E5B869, #D4AF37)', borderBottom: '2px solid #E5B869' }}>
                    Pengisian Pemusnah Sihir
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row, i) => (
                  <tr key={row.label} style={{ background: i % 2 === 0 ? 'rgba(14,26,52,0.3)' : 'transparent' }}>
                    <td style={{ padding: '0.9rem 1rem', fontSize: '0.86rem', color: '#FEF3C7', fontWeight: 600, borderBottom: '1px solid rgba(229,184,105,0.1)' }}>{row.label}</td>
                    <td style={{ padding: '0.9rem 0.75rem', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <span style={{ color: row.rawatan ? '#4ADE80' : '#EF4444', fontSize: '1.05rem', fontWeight: 700 }}>{row.rawatan ? '✓' : '✗'}</span>
                    </td>
                    <td style={{ padding: '0.9rem 1rem', textAlign: 'center', borderBottom: '1px solid rgba(229,184,105,0.15)', background: 'rgba(229,184,105,0.08)' }}>
                      <span style={{ color: '#E5B869', fontSize: '1.15rem', fontWeight: 900 }}>✓</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ══════════ PRICING + FAQ ══════════ */}
      <section id="borang" style={{ background: 'linear-gradient(180deg, #050B1A 0%, #080F2E 100%)', padding: '5rem 1rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }} className="anim-section">
          <IslamicDivider label="Borang Tempahan Rasmi" />
          <h2 className="font-serif-title" style={{ fontSize: 'clamp(1.7rem, 3.8vw, 2.4rem)', fontWeight: 800, color: '#FBF7EE', marginTop: '0.5rem', marginBottom: '0.75rem', lineHeight: 1.3 }}>
            Dapatkan Pengisian Pemusnah Sihir Anda
          </h2>
          <p style={{ fontSize: '1rem', color: '#EFF6FF', lineHeight: 1.7, maxWidth: '580px', margin: '0 auto 2.2rem', opacity: 0.9 }}>
            Satu ikhtiar kecil untuk memusnahkan sihir seumur hidup, lengkap dengan pelarasan mingguan percuma.
          </p>

          {/* Price Card */}
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
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.8rem' }}>
              <IslamicStar size={24} color="#E5B869" />
            </div>

            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#E5B869', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '0.6rem' }}>
              Pakej Pengisian Pemusnah Sihir Aura Assyifa
            </div>

            <div className="font-serif-title" style={{ fontSize: 'clamp(3.5rem, 10vw, 5rem)', fontWeight: 900, color: '#E5B869', lineHeight: 1, marginBottom: '0.35rem', textShadow: '0 0 30px rgba(229,184,105,0.35)' }}>
              RM90
            </div>

            <div style={{ fontSize: '0.9rem', color: '#BFDBFE', marginBottom: '2.2rem', fontWeight: 600 }}>
              Bayar Sekali · Guna Seumur Hidup
            </div>

            <div style={{ textAlign: 'left', marginBottom: '2.2rem', maxWidth: '520px', margin: '0 auto 2.2rem' }}>
              {[
                'Pengisian pada barang peribadi anda (cincin, tasbih, dll)',
                '4 lapisan ayat ruqyah khusus pemusnah sihir',
                'Proses jarak jauh — tanpa perlu pos barang',
                'Siap dalam 7 hari bekerja',
                'Pelarasan setiap minggu automatik (percuma)',
                'Panduan penggunaan lengkap disertakan',
                '100% Patuh Syariah — tiada unsur khurafat & syirik',
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

          {/* FAQ */}
          <div style={{ textAlign: 'left', marginTop: '3.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <IslamicStar size={18} color="#E5B869" />
              <h3 className="font-serif-title" style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FBF7EE', marginTop: '0.4rem' }}>
                Soalan Lazim (FAQ)
              </h3>
            </div>
            {[
              { q: 'Bagaimana pengisian ini bertindak ke atas sihir?', a: 'Barang yang telah diisikan memancarkan getaran ayat-ayat ruqyah pemusnah dan pembatal sihir secara berterusan. Apabila ada serangan sihir menghampiri, ayat-ayat tersebut bertindak balas mematahkan ikatan sihir tersebut serta-merta.' },
              { q: 'Barang apa yang boleh diisi?', a: 'Cincin, tasbih, gelang, rantai, atau mana-mana barang peribadi yang sentiasa dibawa bersama. Barang tidak perlu dihantar — proses dilakukan jarak jauh.' },
              { q: 'Berapa lama sebelum saya rasa perubahan?', a: 'Kebanyakan pesakit mula merasakan perubahan dalam tempoh 7-14 hari pertama. Proses pemulihan berbeza-beza bergantung kepada keparahan sihir yang dihadapi.' },
              { q: 'Adakah ini patuh syariah?', a: 'Ya, 100%. Pengisian hanya menggunakan ayat-ayat Al-Quran dan doa bersandarkan Sunnah. Tiada unsur syirik, jampi atau azimat haram.' },
              { q: 'Boleh saya guna barang berisian untuk buat air penawar?', a: 'Ya! Panduan lengkap cara buat air penawar menggunakan barang berisian akan diberikan selepas tempahan. Anda boleh buat sendiri setiap hari tanpa had.' },
              { q: 'Adakah kekuatan pengisian berkurang dengan masa?', a: 'Tidak. Perawat Aura Assyifa buat pelarasan setiap minggu secara automatik. Kekuatan ayat ruqyah pada barang anda sentiasa dikekalkan pada tahap penuh.' },
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

      {/* ══════════ CLOSING CTA ══════════ */}
      <section style={{ background: '#050B1A', padding: '5rem 1rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="orb" style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(229,184,105,0.1) 0%, transparent 70%)', top: '-200px', left: '50%', transform: 'translateX(-50%)' }} />
        <div style={{ maxWidth: '720px', margin: '0 auto', position: 'relative', zIndex: 2 }} className="anim-section">
          <IslamicDivider />
          <h2 className="font-serif-title" style={{ fontSize: 'clamp(1.6rem, 3.8vw, 2.2rem)', fontWeight: 800, color: '#FBF7EE', letterSpacing: '-0.01em', lineHeight: 1.35, margin: '1.5rem 0 1rem' }}>
            Jangan biarkan sihir terus mengawal dan merosakkan kehidupan anda.
          </h2>
          <p style={{ fontSize: '1.02rem', color: '#BFDBFE', lineHeight: 1.75, marginBottom: '2.5rem', opacity: 0.92 }}>
            Dengan Pengisian Pemusnah Sihir Aura Assyifa, anda tidak lagi keseorangan menanggung derita. Bentengi diri dan keluarga anda hari ini dengan ayat-ayat Allah.
          </p>
          <WAButton id="cta-closing" label="Hubungi Kami — Mula Pemusnahan Sihir Sekarang" size="large" />
          <p style={{ marginTop: '1.2rem', fontSize: '0.82rem', color: '#E5B869', opacity: 0.85 }}>
            RM90 Sekali Bayar · Khidmat Seumur Hidup · Pelarasan Mingguan Percuma
          </p>
          <IslamicDivider />
        </div>
      </section>
    </main>
  );
}
