import FspHeroSection from '@/components/salespage/fsp/HeroSection';
import FspTestimonialSection from '@/components/salespage/fsp/TestimonialSection';
import FspProblemSection from '@/components/salespage/fsp/ProblemSection';
import FspFearsSection from '@/components/salespage/fsp/FearsSection';
import FspExpertSection from '@/components/salespage/fsp/ExpertSection';
import FspSolutionSection from '@/components/salespage/fsp/SolutionSection';
import FspMethodSection from '@/components/salespage/fsp/MethodSection';
import FspGoalsSection from '@/components/salespage/fsp/GoalsSection';
import FspProcessSection from '@/components/salespage/fsp/ProcessSection';
import FspChipCheckoutForm from '@/components/salespage/fsp/FspChipCheckoutForm';
import FspTestimonialPart2Section from '@/components/salespage/fsp/TestimonialPart2Section';
import FspPaymentSection from '@/components/salespage/fsp/PaymentSection';
import FspGuaranteeSection from '@/components/salespage/fsp/GuaranteeSection';
import FspAirTawarSection from '@/components/salespage/fsp/AirTawarSection';
import FspCTASection from '@/components/salespage/fsp/CTASection';
import FspWhatsappSection from '@/components/salespage/fsp/WhatsappSection';
import FspFAQSection from '@/components/salespage/fsp/FAQSection';
import FspClosingSection from '@/components/salespage/fsp/ClosingSection';

export const metadata = {
  title: 'ESyifaa — Rawatan Gangguan Jin, Sihir & Saka | Bayar Terus RM50 FPX',
  description: 'Rawatan jarak jauh 100% patuh syariah untuk gangguan jin, sihir, saka & penyakit misteri. Bayar terus RM50 melalui FPX — perawat hubungi anda segera.',
};

/**
 * FSP Direct FPX Checkout — Bayar Terus RM50
 * Route: /fsp-checkout
 *
 * Flow:
 * #1  Hero Banner (Bayar RM50 Sekarang)
 * #2  Testimoni Part 1
 * #3  Problems (6 masalah)
 * #4  Fears (akibat jika tidak dirawat)
 * #5  Pakar / Authority (dalil Al-Quran & Hadith)
 * #6  Solution (ESyifaa intro + 10 manfaat)
 * #7  Fungsi Elemen / Method (kaedah rawatan)
 * #8  Goals (5 perubahan selepas rawatan)
 * #9  Cara Rawatan (4 langkah: Bayar → Perawat Hubungi → Rawatan → Susulan)
 * [FspChipCheckoutForm] (Borang Direct FPX Online Payment)
 * #10 Testimoni Part 2
 * #11 Payment Info (cara bayar FPX)
 * #12 Jaminan (guarantee + refund)
 * [NEW] #13 Air Tawar Section (untuk yang masih ragu-ragu)
 * #14 CTA + Pakej (Bayar RM50)
 * #15 Whatsapp CTA
 * #16 FAQ
 * Closing
 */
export default function FspCheckoutPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#042E23' }}>

      {/* SECTION #1 — Hero Banner */}
      <FspHeroSection />

      {/* SECTION #2 — Testimoni Part 1 */}
      <FspTestimonialSection />

      {/* SECTION #3 — Problems */}
      <FspProblemSection />

      {/* SECTION #4 — Fears (Akibat Jika Tidak Dirawat) */}
      <FspFearsSection />

      {/* SECTION #5 — Pakar / Authority (Dalil Al-Quran & Hadith) */}
      <FspExpertSection />

      {/* SECTION #6 — Solution (Perkenalkan ESyifaa + 10 Manfaat) */}
      <FspSolutionSection />

      {/* SECTION #7 — Fungsi Elemen / Kaedah Rawatan */}
      <FspMethodSection />

      {/* SECTION #8 — Goals (5 Perubahan Selepas Rawatan) */}
      <FspGoalsSection />

      {/* SECTION #9 — Cara Rawatan (4 Langkah: Bayar Terus) */}
      <FspProcessSection />

      {/* BORANG DIRECT FPX CHECKOUT (CHIP PAYMENT GATEWAY) */}
      <FspChipCheckoutForm source="fsp-checkout" />

      {/* SECTION #10 — Testimoni Part 2 */}
      <FspTestimonialPart2Section />

      {/* SECTION #11 — Cara Bayar FPX & Pakej */}
      <FspPaymentSection />

      {/* SECTION #12 — Jaminan */}
      <FspGuaranteeSection />

      {/* SECTION #13 — Masih Ragu-Ragu? Cuba Scanning Air Tawar Percuma */}
      <FspAirTawarSection />

      {/* SECTION #14 — CTA & Pakej (Bayar RM50) */}
      <FspCTASection />

      {/* SECTION #15 — Whatsapp / Hubungi Kami */}
      <FspWhatsappSection />

      {/* SECTION #16 — Soalan Lazim */}
      <FspFAQSection />

      {/* Closing */}
      <FspClosingSection />

      {/* Footer */}
      <footer style={{
        background: '#021812', color: '#FFFFFF',
        padding: '2rem 1rem', textAlign: 'center',
        fontSize: '0.85rem', borderTop: '1px solid rgba(254, 243, 199, 0.15)'
      }}>
        <div style={{ maxWidth: '850px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ margin: '0 0 0.5rem 0', fontWeight: 800, fontSize: '1.05rem', color: '#FEF3C7' }}>
            ESyifaa · Rawatan Jarak Jauh Gangguan Jin, Sihir, Santau & Saka
          </p>
          <p style={{ margin: 0, opacity: 0.85, fontSize: '0.8rem', color: '#D1D5DB' }}>
            © {new Date().getFullYear()} ESyifaa. Hak cipta terpelihara. Rawatan berasaskan bacaan Al-Quran dan doa berlandaskan syarak.
          </p>
        </div>
      </footer>

    </main>
  );
}
