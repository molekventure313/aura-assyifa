'use client';

import { useEffect, useRef, useState } from 'react';
import PageViewTracker from '@/components/salespage/PageViewTracker';

const WA_NUMBER = '60133892002';
const WA_MESSAGE = encodeURIComponent(
  "Assalamualaikum, saya berminat untuk mendapatkan Pengisian Pemusnah Saka dari Aura Assyifa (RM90). Boleh saya tahu langkah seterusnya?"
);
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

/* ─── CSS & Keyframes with Islamic Royal Navy & Gold Aesthetic ─── */
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

  @keyframes fadeInUp { from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)} }
  @keyframes shimmer { 0%{background-position:-200% center}100%{background-position:200% center} }
  @keyframes pulseGlow {
    0%,100%{box-shadow:0 0 25px rgba(229,184,105,0.25),0 10px 40px rgba(0,0,0,0.5)}
    50%{box-shadow:0 0 50px rgba(229,184,105,0.55),0 10px 40px rgba(0,0,0,0.5)}
  }

  .font-serif-title { font-family: 'Playfair Display', Georgia, serif; }
  .font-arabic { font-family: 'Amiri', serif; }

  .anim-card {
    opacity: 0;
    transform: translateY(22px);
    transition: opacity 0.55s ease, transform 0.55s ease, box-shadow 0.25s ease;
  }
  .anim-card.visible { opacity: 1; transform: translateY(0); }
  .anim-card:hover {
    transform: translateY(-4px) !important;
    box-shadow: 0 20px 40px rgba(0,0,0,0.45), 0 0 25px rgba(229,184,105,0.15) !important;
  }
  .anim-section {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .anim-section.visible { opacity: 1; transform: translateY(0); }

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

  .islamic-arch-box { border-radius: 40px 40px 20px 20px; position: relative; }
  .islamic-border-glow {
    border: 1.5px solid rgba(229,184,105,0.35);
    box-shadow: 0 10px 35px rgba(0,0,0,0.45), inset 0 0 20px rgba(229,184,105,0.03);
  }
  .islamic-pattern-bg {
    background-image: radial-gradient(rgba(229,184,105,0.06) 1px, transparent 1px);
    background-size: 24px 24px;
  }

  .testi-img { transition: transform 0.3s ease, box-shadow 0.3s ease; }
  .testi-img:hover { transform: scale(1.02); box-shadow: 0 16px 40px rgba(0,0,0,0.3) !important; }

  .check-row-islamic { display: flex; align-items: flex-start; gap: 0.75rem; margin-bottom: 0.75rem; }
  .orb { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; }

  @media(max-width:640px){ .hero-h1{font-size:1.85rem !important} }
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

/* ─── DATA (KHUSUS SAKA) ─── */
const SIGNS_CHECKLIST = [
  'Kerap bermimpi berjumpa orang lama atau keturunan yang sudah meninggal',
  'Banyak kali bermimpi menerima atau menyusukan bayi tanpa sebab',
  'Selalu bermimpi rumah lama atau haiwan ganas seperti ular, harimau atau buaya',
  'Tiba-tiba terasa boleh merawat orang lain walaupun tidak pernah belajar merawat',
  'Mimpi jatuh dari tempat tinggi secara berulang kali',
  'Ahli keluarga lain turut mengalami nasib buruk atau sakit yang sama',
];

const SYMPTOMS = [
  { num: '01', title: 'Mimpi Berulang Yang Mengganggu Jiwa', desc: 'Bermimpi orang-orang lama, keturunan, haiwan ganas atau rumah lama berulang kali — sehingga mengganggu tidur dan keseimbangan jiwa.' },
  { num: '02', title: 'Keturunan Turut Terjejas & Mewarisi Nasib Sama', desc: 'Saka berpindah dari satu generasi ke generasi berikutnya. Anak cucu turut mengalami masalah kesihatan, rezeki dan kehidupan yang sama.' },
  { num: '03', title: 'Rezeki & Kemajuan Hidup Tersekat', desc: 'Berusaha keras tetapi kehidupan tidak maju, rezeki sentiasa sempit dan peluang kerap tertutup tanpa sebab yang dapat dikenal pasti.' },
  { num: '04', title: 'Dorongan Kuat Untuk Merawat Orang Lain', desc: 'Terasa terpanggil atau dipaksa untuk merawat orang lain walaupun tidak pernah mempelajari ilmu perubatan atau ruqyah — tanda saka sedang menuntut.' },
  { num: '05', title: 'Gangguan Kesihatan Turun-Temurun', desc: 'Penyakit atau gangguan yang tidak dapat dijelaskan oleh perubatan moden berlaku berulang kali dalam keluarga dari satu generasi ke generasi.' },
  { num: '06', title: 'Suasana Keluarga Sentiasa Bergolak', desc: 'Pertengkaran, salah faham dan ketegangan berterusan dalam keluarga tanpa punca yang jelas — mengganggu keharmonian dan ketenangan rumah tangga.' },
];

const WHY_PENGISIAN = [
  { num: '01', title: 'Saka Diwarisi Turun-Temurun — Tidak Akan Hilang Sendiri', desc: 'Ikatan saka berpindah dari ibu bapa kepada anak, kemudian cucu. Tanpa tindakan yang betul, ia akan terus membebankan generasi demi generasi.' },
  { num: '02', title: 'Saka Aktif Dalam Kalangan Seluruh Keluarga', desc: 'Saka bukan sekadar gangguan kepada satu individu. Ia menjejaskan seluruh keluarga. Perlu perlindungan menyeluruh, bukan rawatan seorang sahaja.' },
  { num: '03', title: 'Ikatan Saka Perlu Diputuskan Dari Akar Keturunan', desc: 'Saka yang lama bertapak memerlukan ayat khusus pembatal yang dibacakan secara konsisten. Pengisian memastikan ayat ini sentiasa aktif pada barang anda.' },
  { num: '04', title: 'Benteng Mesti Ada Supaya Saka Tidak Kembali', desc: 'Selepas ikatan saka diputuskan, perlu ada benteng perlindungan generasi. Pengisian menyediakan lapisan benteng yang tidak pernah pudar.' },
  { num: '05', title: 'Rawatan Berterusan Tanpa Kos Tambahan', desc: 'Berbanding pergi ke perawat berulang kali, pengisian sekali bayar memberikan rawatan berterusan seumur hidup dengan pelarasan mingguan percuma.' },
  { num: '06', title: 'Buat Air Penawar Sendiri Untuk Seluruh Keluarga', desc: 'Tidak perlu bergantung pada sesiapa. Gunakan barang berisian untuk buat air penawar untuk seluruh ahli keluarga — bila-bila masa, di rumah.' },
];

const GOALS = [
  { num: '01', title: 'Memutuskan Ikatan Saka Dari Akar Keturunan', desc: 'Ayat-ayat pembatal saka yang diisikan bertindak memutuskan setiap ikatan turun-temurun yang mengikat keluarga anda — dari punca asalnya.' },
  { num: '02', title: 'Menghentikan Mimpi-Mimpi Berulang Yang Mengganggu', desc: 'Menghentikan mimpi orang lama, haiwan ganas, rumah lama dan mimpi lain yang menjadi tanda saka aktif mengganggu jiwa.' },
  { num: '03', title: 'Melindungi Keturunan Dari Mewarisi Saka Yang Sama', desc: 'Membina benteng perlindungan generasi agar anak cucu tidak turut mewarisi beban saka yang telah lama mengikat keluarga.' },
  { num: '04', title: 'Memulihkan Rezeki & Kemajuan Yang Lama Tersekat', desc: 'Saka penghalang rezeki yang membelit kehidupan keluarga diputuskan, memberi ruang kepada berkat dan peluang untuk mengalir semula.' },
  { num: '05', title: 'Mengembalikan Keharmonian & Ketenangan Keluarga', desc: 'Memecahkan ikatan saka yang menyebabkan pergaduhan, ketegangan dan ketidakharmonian berterusan dalam keluarga.' },
];

const LAYERS = [
  { num: 'I', accent: '#EF4444', title: 'Ayat Ruqyah Pemusnah Jin & Entiti Saka', desc: 'Membakar dan memusnahkan jin atau entiti saka yang diwarisi dari keturunan. Bertindak balas secara aktif apabila ada entiti saka yang cuba menuntut.' },
  { num: 'II', accent: '#E5B869', title: 'Ayat Khusus Pembatal & Pemutusan Ikatan Saka', desc: 'Memutuskan dan membatalkan setiap ikatan saka turun-temurun yang aktif — dari punca asal keturunan hingga ke generasi semasa.' },
  { num: 'III', accent: '#4ADE80', title: 'Ayat Benteng Anti-Saka & Perlindungan Generasi', desc: 'Membina dinding perlindungan generasi yang kuat. Saka tidak dapat masuk semula dan tidak dapat berpindah kepada anak cucu.' },
  { num: 'IV', accent: '#93C5FD', title: 'Ayat-Ayat Kesembuhan & Pemulihan Jiwa', desc: 'Memulihkan kesan-kesan saka yang masih tinggal dalam badan, jiwa dan kehidupan — membantu proses penyembuhan dan pembukaan rezeki secara berterusan.' },
];

const DALIL = [
  {
    arabic: 'وَنُنَزِّLُ مِنَ ٱلْقُرْءَانِ مَا هُوَ شِفَآءٌ وَرَحْمَةٌ لِّلْمُؤْمِنِينَ',
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

/* ─── TESTIMONI 1: Testimoni Hadi 1-4 (IKUT PENGISIAN-AURA-ASSYIFA) ─── */
const TESTI1 = [
  '/images/testimonials/testimoni_hadi_1.jpeg',
  '/images/testimonials/testimoni_hadi_2.jpg',
  '/images/testimonials/testimoni_hadi_3.jpeg',
  '/images/testimonials/testimoni_hadi_4.jpg',
];

/* ─── TESTIMONI 2: KEKALKAN 3 GAMBAR ASAL ─── */
const TESTI2 = [
  '/images/testimonials/testimoni_pengisian_5.png',
  '/images/testimonials/testimoni_pengisian_6.png',
  '/images/testimonials/testimoni_pengisian_7.png',
];

export default function PengisianSakaPage() {
  useReveal();

  return (
    <main style={{ minHeight: '100vh', background: '#070D20', fontFamily: "'Inter', -apple-system, sans-serif", color: '#FFF' }} className="islamic-pattern-bg">
      <style>{GLOBAL_CSS}</style>
      <PageViewTracker slug="pengisian-saka" />

      {/* ══════════ HERO SECTION ══════════ */}
      <section style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(175deg, #050B1A 0%, #070D20 50%, #0B1528 100%)', padding: '5rem 1.25rem 4.5rem', textAlign: 'center' }}>
        <MihrabArchBackdrop />
        <div className="orb" style={{ width: 450, height: 450, background: 'radial-gradient(circle, rgba(229,184,105,0.12) 0%, transparent 70%)', top: '-100px', left: '-100px' }} />
        <div className="orb" style={{ width: 380, height: 380, background: 'radial-gradient(circle, rgba(13,27,74,0.6) 0%, transparent 70%)', bottom: '-50px', right: '-50px' }} />

        <div style={{ maxWidth: '880px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          {/* Top Islamic Badge - Dead Center */}
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', background: 'rgba(229,184,105,0.08)', border: '1px solid rgba(229,184,105,0.4)', padding: '0.45rem 1.3rem', borderRadius: '50px', marginBottom: '2rem', fontSize: '0.74rem', fontWeight: 800, color: '#E5B869', letterSpacing: '0.14em', textTransform: 'uppercase', backdropFilter: 'blur(6px)' }}>
            <IslamicStar size={14} color="#E5B869" />
            IKHTIAR RAWATAN ISLAM · PENGISIAN PEMUSNAH SAKA
            <IslamicStar size={14} color="#E5B869" />
          </div>

          <h1 className="hero-h1 font-serif-title" style={{ fontSize: 'clamp(2.1rem, 4.8vw, 3.4rem)', fontWeight: 800, color: '#FBF7EE', lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: '1.4rem' }}>
            Bertahun Menanggung Beban Saka,{' '}
            <span style={{ color: '#E5B869', textShadow: '0 0 35px rgba(229,184,105,0.35)', display: 'inline-block' }}>
              Jangan Sampai Anak Cucu Menderita
            </span>
          </h1>

          <p style={{ fontSize: '1.08rem', color: '#BFDBFE', lineHeight: 1.8, maxWidth: '660px', margin: '0 auto 1.8rem' }}>
            Saka adalah gangguan turun-temurun yang boleh mempengaruhi kesihatan, rezeki dan keharmonian keluarga.{' '}
            <strong style={{ color: '#FBF7EE' }}>Ia tidak akan hilang sendiri tanpa tindakan yang betul.</strong>
          </p>

          {/* Checklist glassmorphism box with Islamic Styling */}
          <div className="islamic-border-glow" style={{ backdropFilter: 'blur(12px)', background: 'linear-gradient(160deg, rgba(14,26,52,0.85) 0%, rgba(7,13,32,0.95) 100%)', borderRadius: '20px', padding: '1.8rem 2rem', maxWidth: '640px', margin: '0 auto 2.2rem', textAlign: 'left' }}>
            <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#E5B869', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <IslamicStar size={14} color="#E5B869" />
              Tanda-Tanda Gangguan Saka Keturunan
            </div>
            {SIGNS_CHECKLIST.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.65rem' }}>
                <span style={{ marginTop: '2px' }}>
                  <IslamicStar size={14} color="#E5B869" />
                </span>
                <span style={{ fontSize: '0.9rem', color: '#EFF6FF', lineHeight: 1.55 }}>{s}</span>
              </div>
            ))}
          </div>

          {/* Dual CTA Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'center', marginBottom: '2.5rem' }}>
            <a href="#borang" className="cta-btn-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '1.05rem 2.4rem', fontSize: '1rem' }}>
              <IslamicStar size={16} color="#070D20" />
              Tempah Sekarang
            </a>
            <WAButton id="cta-hero" label="WhatsApp Kami" outline={true} size="medium" />
          </div>

          {/* Trust Badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.85rem', maxWidth: '780px', margin: '0 auto' }}>
            {['Jarak Jauh — Tanpa Pos', '100% Patuh Syariah', 'Pelarasan Mingguan Percuma', 'Siap Dalam 7 Hari'].map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', background: 'rgba(229,184,105,0.06)', border: '1px solid rgba(229,184,105,0.25)', padding: '0.45rem 1.1rem', borderRadius: '50px' }}>
                <IslamicStar size={14} color="#E5B869" />
                <span style={{ fontSize: '0.84rem', color: '#E2E8F0', fontWeight: 600 }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ TESTIMONI 1 (TESTIMONI HADI 1-4) ══════════ */}
      <section style={{ background: '#050B1A', color: '#FFF', padding: '4.5rem 1rem', textAlign: 'center', position: 'relative' }}>
        <div style={{ maxWidth: '1040px', margin: '0 auto' }} className="anim-section">
          <IslamicDivider label="Testimoni Pesakit — Bahagian 1" />
          <h2 className="font-serif-title" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.3rem)', fontWeight: 800, color: '#FBF7EE', marginTop: '0.5rem', marginBottom: '0.6rem', lineHeight: 1.3 }}>
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

      {/* ══════════ SIMPTOM / MASALAH SAKA ══════════ */}
      <section style={{ background: 'linear-gradient(180deg, #070D20 0%, #0B1528 100%)', padding: '4.5rem 1rem', textAlign: 'center', position: 'relative' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }} className="anim-section">
          <IslamicDivider label="Kenali Tanda Saka Keturunan" />
          <h2 className="font-serif-title" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.3rem)', fontWeight: 800, color: '#FBF7EE', marginTop: '0.5rem', marginBottom: '0.85rem', lineHeight: 1.3 }}>
            Adakah Anda Atau Keluarga Mengalami Simptom Saka Ini?
          </h2>
          <p style={{ fontSize: '1rem', color: '#EFF6FF', lineHeight: 1.7, maxWidth: '680px', margin: '0 auto 2.8rem', opacity: 0.9 }}>
            Saka diwarisi secara ghaib dari generasi terdahulu. <strong style={{ color: '#E5B869' }}>Jika terdapat tanda-tanda berikut</strong> — putuskan rantai ikatan ini segera sebelum ia mengganggu anak cucu anda.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.4rem', textAlign: 'left' }}>
            {SYMPTOMS.map((s, i) => (
              <div
                key={s.num}
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
                      background: 'rgba(239,68,68,0.15)',
                      border: '1px solid rgba(239,68,68,0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.72rem',
                      fontWeight: 900,
                      color: '#EF4444',
                      flexShrink: 0,
                    }}
                  >
                    {s.num}
                  </span>
                  <div style={{ fontWeight: 800, color: '#EF4444', fontSize: '0.94rem', lineHeight: 1.35 }}>{s.title}</div>
                </div>
                <p style={{ margin: 0, fontSize: '0.86rem', color: '#FFFFFF', lineHeight: 1.68, opacity: 0.95 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ KENAPA PERLU PENGISIAN SAKA ══════════ */}
      <section style={{ background: '#070D20', padding: '4.5rem 1rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }} className="anim-section">
          <IslamicDivider label="Penyelesaian Syari'i" />
          <h2 className="font-serif-title" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.3rem)', fontWeight: 800, color: '#FBF7EE', marginTop: '0.5rem', marginBottom: '0.85rem', lineHeight: 1.3 }}>
            Kenapa Saka Perlu Diputuskan Melalui Pengisian Berterusan?
          </h2>
          <p style={{ fontSize: '1rem', color: '#BFDBFE', lineHeight: 1.7, maxWidth: '680px', margin: '0 auto 2.5rem' }}>
            Saka bukan jin luar biasa yang sekali buang terus selesai. Ia mengikat salur darah dan keturunan — <strong style={{ color: '#E5B869' }}>ia memerlukan benteng berterusan dan pemutusan akar umbi.</strong>
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', textAlign: 'left' }}>
            {WHY_PENGISIAN.map((p, i) => (
              <div
                key={p.num}
                className="anim-card islamic-border-glow"
                style={{
                  background: '#0E1A34',
                  borderRadius: '16px',
                  padding: '1.4rem 1.25rem',
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

      {/* ══════════ DALIL & ASAS RUQYAH ══════════ */}
      <section style={{ background: '#050B1A', padding: '4.5rem 1rem', textAlign: 'center', position: 'relative' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }} className="anim-section">
          <div className="font-arabic" style={{ fontSize: '1.8rem', color: '#E5B869', marginBottom: '0.5rem', letterSpacing: '0.02em', textShadow: '0 0 20px rgba(229,184,105,0.3)' }}>
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>
          <IslamicDivider label="Dalil &amp; Asas Syarak" />
          <h2 className="font-serif-title" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.3rem)', fontWeight: 800, color: '#FBF7EE', marginTop: '0.5rem', marginBottom: '0.85rem', lineHeight: 1.3 }}>
            Pemutusan Saka Berlandaskan Syariat Islam
          </h2>
          <p style={{ fontSize: '1rem', color: '#EFF6FF', lineHeight: 1.7, maxWidth: '720px', margin: '0 auto 2.5rem', opacity: 0.9 }}>
            Al-Quran adalah nur yang menghapuskan kegelapan perjanjian syaitan dan jin saka lampau.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.4rem', marginBottom: '1.8rem' }}>
            {DALIL.map((v, i) => (
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

          <div className="anim-card islamic-border-glow" style={{ background: 'rgba(229,184,105,0.06)', borderRadius: '16px', padding: '1.5rem 1.8rem' }}>
            <p className="font-serif-title" style={{ margin: '0 0 0.4rem', fontSize: '1.05rem', color: '#FBF7EE', fontStyle: 'italic', lineHeight: 1.75 }}>
              &quot;Gunakanlah ruqyah (bacaan doa perlindungan) selama ia tidak mengandungi syirik.&quot;
            </p>
            <span style={{ fontSize: '0.82rem', color: '#E5B869', fontWeight: 700 }}>Hadith Riwayat Muslim</span>
          </div>
        </div>
      </section>

      {/* ══════════ MATLAMAT RAWATAN ══════════ */}
      <section style={{ background: 'linear-gradient(180deg, #070D20 0%, #0B1528 100%)', color: '#FFF', padding: '4.5rem 1rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }} className="anim-section">
          <IslamicDivider label="Matlamat Rawatan" />
          <h2 className="font-serif-title" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.3rem)', fontWeight: 800, color: '#FBF7EE', marginTop: '0.5rem', marginBottom: '0.85rem', lineHeight: 1.3 }}>
            Matlamat Pengisian Pemusnah Saka Aura Assyifa
          </h2>
          <p style={{ fontSize: '1rem', color: '#BFDBFE', lineHeight: 1.7, maxWidth: '680px', margin: '0 auto 2.5rem' }}>
            Langkah tuntas membersihkan nasab keturunan daripada perjanjian ghaib yang membebankan.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left', maxWidth: '820px', margin: '0 auto' }}>
            {GOALS.map((g, i) => (
              <div
                key={g.num}
                className="anim-card islamic-border-glow"
                style={{
                  background: '#0E1A34',
                  borderRadius: '16px',
                  padding: '1.35rem 1.5rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1.1rem',
                  transitionDelay: `${i * 0.08}s`,
                }}
              >
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(229,184,105,0.15)', border: '1px solid rgba(229,184,105,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 900, color: '#E5B869' }}>{g.num}</span>
                </div>
                <div>
                  <p style={{ margin: '0 0 0.25rem', fontWeight: 800, fontSize: '0.98rem', color: '#E5B869' }}>{g.title}</p>
                  <p style={{ margin: 0, fontSize: '0.86rem', color: '#BFDBFE', lineHeight: 1.65 }}>{g.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 4 LAPISAN AYAT RUQYAH ══════════ */}
      <section style={{ background: '#050B1A', padding: '4.5rem 1rem', textAlign: 'center', position: 'relative' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }} className="anim-section">
          <IslamicDivider label="Struktur Ayat Ruqyah" />
          <h2 className="font-serif-title" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.3rem)', fontWeight: 800, color: '#FBF7EE', marginTop: '0.5rem', marginBottom: '0.85rem', lineHeight: 1.3 }}>
            4 Lapisan Ayat Ruqyah Khusus Pemutus Saka
          </h2>
          <p style={{ fontSize: '1rem', color: '#EFF6FF', lineHeight: 1.7, maxWidth: '700px', margin: '0 auto 2.8rem', opacity: 0.9 }}>
            Setiap barangan dipasakkan dengan 4 lapisan ayat ruqyah syar&apos;iyyah yang dirangka khas untuk membatalkan ikatan perjanjian saka dan melindungi generasi akan datang.
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
                Perawat Aura Assyifa akan membuat <strong style={{ color: '#E5B869' }}>pelarasan dan pengisian semula setiap minggu secara automatik</strong> — memastikan kekuatan pemusnah saka sentiasa aktif memagar diri dan keturunan anda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ TESTIMONI 2 (KEKALKAN 3 GAMBAR ASAL) ══════════ */}
      <section style={{ background: '#070D20', padding: '4.5rem 1rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }} className="anim-section">
          <IslamicDivider label="Testimoni Pesakit — Bahagian 2" />
          <h2 className="font-serif-title" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.3rem)', fontWeight: 800, color: '#FBF7EE', marginTop: '0.5rem', marginBottom: '0.5rem', lineHeight: 1.3 }}>
            Betulkah Aura Assyifa Berkesan Untuk Putuskan Saka?
          </h2>
          <p style={{ fontSize: '1rem', color: '#BFDBFE', marginBottom: '2.5rem', lineHeight: 1.6 }}>
            Jom baca pengalaman pesakit yang telah berikhtiar dengan Pengisian Pemusnah Saka dari Aura Assyifa.
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
            Semua testimoni di atas adalah daripada pesakit sebenar. Alhamdulillah — semoga Allah terus melindungi keluarga dan anak cucu mereka.
          </p>
        </div>
      </section>

      {/* ══════════ JADUAL PERBANDINGAN (IKUT PENGISIAN-AURA-ASSYIFA: 2 KOLUM) ══════════ */}
      <section style={{ background: 'linear-gradient(180deg, #070D20 0%, #050B1A 100%)', padding: '4.5rem 1rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }} className="anim-section">
          <IslamicDivider label="Jadual Perbandingan" />
          <h2 className="font-serif-title" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.3rem)', fontWeight: 800, color: '#FBF7EE', marginTop: '0.5rem', marginBottom: '0.85rem', lineHeight: 1.3 }}>
            Pengisian Aura Assyifa vs Rawatan Luar
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
                    Pengisian Pemusnah Saka
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
            Dapatkan Pengisian Pemusnah Saka Aura Assyifa
          </h2>
          <p style={{ fontSize: '1rem', color: '#EFF6FF', lineHeight: 1.7, maxWidth: '580px', margin: '0 auto 2.2rem', opacity: 0.9 }}>
            Satu pelaburan untuk memutuskan beban saka seumur hidup. Pelarasan mingguan percuma selama-lamanya.
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
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.8rem' }}>
              <IslamicStar size={24} color="#E5B869" />
            </div>

            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#E5B869', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '0.6rem' }}>
              Pengisian Pemusnah Saka Aura Assyifa
            </div>

            <div className="font-serif-title" style={{ fontSize: 'clamp(3.5rem, 10vw, 5rem)', fontWeight: 900, color: '#E5B869', lineHeight: 1, marginBottom: '0.35rem', textShadow: '0 0 30px rgba(229,184,105,0.35)' }}>
              RM90
            </div>

            <div style={{ fontSize: '0.9rem', color: '#BFDBFE', marginBottom: '2.2rem', fontWeight: 600 }}>
              Bayar Sekali · Guna Seumur Hidup
            </div>

            <div style={{ textAlign: 'left', marginBottom: '2.2rem', maxWidth: '520px', margin: '0 auto 2.2rem' }}>
              {[
                'Pengisian pada barang anda (cincin, tasbih, dll)',
                '4 lapisan ayat ruqyah pemutus ikatan saka',
                'Proses jarak jauh — tanpa perlu pos barang',
                'Siap dalam 7 hari bekerja',
                'Pelarasan setiap minggu automatik (percuma)',
                'Panduan penggunaan lengkap disertakan',
                '100% Patuh Syariah — tiada unsur syirik & jin',
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
              { q: 'Barang apa yang sesuai diisi?', a: 'Cincin, tasbih, gelang, rantai, atau barangan peribadi yang sentiasa anda bawa bersama. Barang tidak perlu dihantar — proses dilakukan secara jarak jauh.' },
              { q: 'Bolehkah saka benar-benar diputuskan?', a: 'Dengan izin Allah SWT, ya. Ayat-ayat ruqyah syar\'iyyah yang diisikan khusus untuk memutuskan ikatan jin saka dari akar umbi keturunan.' },
              { q: 'Adakah ini patuh syariah?', a: 'Ya, 100%. Pengisian hanya menggunakan ayat-ayat Al-Quran dan doa-doa masyhur berlandaskan Sunnah Nabi SAW. Tiada unsur khurafat, perjanjian atau azimat.' },
              { q: 'Bolehkah barang ini bantu lindungi anak cucu?', a: 'Boleh. Satu barang berisian boleh digunakan untuk membuat air penawar dan air mandian ruqyah untuk seluruh ahli keluarga anda.' },
              { q: 'Berapa lama proses pengisian?', a: 'Pengisian penuh mengambil masa 7 hari bekerja. Selepas itu, pelarasan mingguan berjalan secara automatik setiap minggu.' },
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
            Jangan Biarkan Saka Terus Membebankan Generasi Demi Generasi. Putuskan Ikatannya Hari Ini.
          </h2>
          <p style={{ fontSize: '1.02rem', color: '#BFDBFE', lineHeight: 1.75, marginBottom: '2.5rem', opacity: 0.92 }}>
            Dengan Pengisian Pemusnah Saka Aura Assyifa, anda melindungi diri anda dan memagar masa depan anak cucu daripada diwarisi beban yang sama.
          </p>
          <WAButton id="cta-closing" label="Hubungi Kami — Mula Perlindungan Sekarang" size="large" />
          <p style={{ marginTop: '1.2rem', fontSize: '0.82rem', color: '#E5B869', opacity: 0.85 }}>
            RM90 Sekali Bayar · Khidmat Seumur Hidup · Pelarasan Mingguan Percuma
          </p>
          <IslamicDivider />
        </div>
      </section>
    </main>
  );
}
