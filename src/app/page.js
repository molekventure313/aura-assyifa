'use client';

import { useEffect } from 'react';
import HeroSection from '@/components/salespage/HeroSection';
import TestimonialSection from '@/components/salespage/TestimonialSection';
import ProblemSection from '@/components/salespage/ProblemSection';
import ProcessSection from '@/components/salespage/ProcessSection';
import ServiceSection from '@/components/salespage/ServiceSection';
import BenefitsSection from '@/components/salespage/BenefitsSection';
import CTASection from '@/components/salespage/CTASection';
import ApplicationForm from '@/components/salespage/ApplicationForm';
import FAQSection from '@/components/salespage/FAQSection';
import { trackPageView, trackEvent } from '@/lib/tracking/pixel';

export default function Home() {
  useEffect(() => {
    try {
      trackPageView();
      trackEvent('ViewContent');
    } catch(err) {
      console.log('Pixel tracking issue', err);
    }
  }, []);

  return (
    <main className="salespage-esyifaa-layout">
      <HeroSection />
      <TestimonialSection />
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
            🌿 E-SYIFAA' · Rawatan Jarak Jauh Gangguan Jin, Sihir, Santau &amp; Saka
          </p>
          <p style={{ margin: 0, opacity: 0.85, fontSize: '0.8rem' }}>
            © {new Date().getFullYear()} E-SYIFAA'. Hak cipta terpelihara. Rawatan berasaskan bacaan Al-Quran dan doa berlandaskan syarak.
          </p>
        </div>
      </footer>
    </main>
  );
}
