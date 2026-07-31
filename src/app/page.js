'use client';

import HeroSection from '@/components/salespage/HeroSection';
import ProblemSection from '@/components/salespage/ProblemSection';
import ProcessSection from '@/components/salespage/ProcessSection';
import ServiceSection from '@/components/salespage/ServiceSection';
import BenefitsSection from '@/components/salespage/BenefitsSection';
import CTASection from '@/components/salespage/CTASection';
import ApplicationForm from '@/components/salespage/ApplicationForm';
import FAQSection from '@/components/salespage/FAQSection';

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-main)', color: 'var(--font-dark-green)' }}>
      {/* 
        SALESPAGE SECTION STRUCTURE (ALL 9 SECTIONS IN ORDER)
        Section 1 – Hero Section (Headline, Subhead, Video/Image)
        Section 2 – Problem Section (Simptom Gangguan / Emosi)
        Section 3 – Process Section (Cara Rawatan Jarak Jauh Berfungsi)
        Section 4 – Service Section (Solusi & Kelebihan Rawatan)
        Section 5 – Benefits Section (Manfaat Selepas Rawatan)
        Section 6 – CTA Section (Testimoni & Banner Panggilan Tindakan)
        Section 7 – Application Form (Borang Pendaftaran Rawatan)
        Section 8 – FAQ Section (Soalan Lazim)
        Section 9 – Footer
      */}

      <HeroSection />
      <ProblemSection />
      <ProcessSection />
      <ServiceSection />
      <BenefitsSection />
      <CTASection />
      <ApplicationForm />
      <FAQSection />

      <footer style={{ background: 'var(--turquoise-dark)', color: '#fff', padding: '1.75rem 1rem', textAlign: 'center', fontSize: '0.85rem' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ margin: '0 0 0.5rem 0', fontWeight: 700, fontSize: '1rem', color: 'var(--yellow-accent)' }}>
            🌿 ESYIFAA' · Rawatan Jarak Jauh Gangguan Jin, Sihir, Santau &amp; Saka
          </p>
          <p style={{ margin: 0, opacity: 0.85, fontSize: '0.8rem' }}>
            © {new Date().getFullYear()} ESYIFAA'. Hak cipta terpelihara. Rawatan berasaskan bacaan Al-Quran dan doa berlandaskan syarak.
          </p>
        </div>
      </footer>
    </main>
  );
}
