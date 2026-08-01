'use client';

import { useEffect } from 'react';
import { trackPageView, trackEvent } from '@/lib/tracking/pixel';
import TestimonialSection from '@/components/salespage/TestimonialSection';
import TestimonialPart2Section from '@/components/salespage/TestimonialPart2Section';
import FearsSection from '@/components/salespage/FearsSection';
import PricingSection from '@/components/salespage/PricingSection';
import GuaranteeSection from '@/components/salespage/GuaranteeSection';
import ProcessSection from '@/components/salespage/ProcessSection';
import ApplicationForm from '@/components/salespage/ApplicationForm';

// ─── Shared Salespage Template ───────────────────────────────────────────────
// Used by all 6 angle variants. Pass angle-specific content as props.
// Components that are FIXED across all angles: Testimonial, Fears, Pricing,
// Guarantee, Process, ApplicationForm.
// Components that are CUSTOMISED per angle: Hero, Problem, Matlamat, CTA,
// FAQ, Closing.

export default function SalespageTemplate({
  // Hero
  heroBadge = '🌿 ESyifaa · Rawatan Jarak Jauh Islam',
  heroHeadline,
  heroSubPoints = [],
  heroDescription,

  // Problem Section
  problemLabel = 'KENAL PASTI SIMPTOM',
  problemHeadline,
  problemSubtext,
  problems = [],

  // Matlamat Section
  matlamatLabel = 'MATLAMAT UTAMA',
  matlamatHeadline = 'Apa Yang Ingin Dicapai Melalui Rawatan ESyifaa?',
  goals = [],

  // CTA Section
  ctaHeadline,
  ctaSubtext = 'Ambil langkah pertama dengan mendapatkan konsultasi dan rawatan bersama ESyifaa.',

  // FAQ
  faqs = [],

  // Closing
  closingHeadline = 'Jangan Hadapi Semua Ini Seorang Diri',
  closingParagraphs = [],
}) {
  useEffect(() => {
    try {
      trackPageView();
      trackEvent('ViewContent');
    } catch(err) {}
  }, []);

  const scrollToForm = (e) => {
    e.preventDefault();
    const target = document.getElementById('apply-form');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProcess = (e) => {
    e.preventDefault();
    const target = document.getElementById('proses');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main style={{ minHeight: '100vh', background: '#042E23' }}>

      {/* ── SECTION 1: HERO ────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(180deg, #042E23 0%, #0B382D 100%)',
        color: '#FFFFFF',
        padding: '3.5rem 1rem 4rem 1rem',
        fontFamily: 'var(--font-inter), -apple-system, sans-serif',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(254,224,71,0.15)', border: '1px solid #FDE047', padding: '0.4rem 1.1rem', borderRadius: '50px', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#FDE047', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{heroBadge}</span>
          </div>

          <h1 style={{ fontSize: 'clamp(1.8rem, 4.2vw, 2.7rem)', fontWeight: 800, lineHeight: 1.25, color: '#FDE047', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
            {heroHeadline}
          </h1>

          {heroSubPoints.length > 0 && (
            <div style={{ background: '#064E3B', border: '2px solid #FDE047', borderRadius: '12px', padding: '1.35rem 1.5rem', marginBottom: '1.75rem', textAlign: 'left', boxShadow: '0 8px 20px rgba(0,0,0,0.3)' }}>
              <div style={{ fontWeight: 800, fontSize: '1rem', color: '#FDE047', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Adakah anda mengalami:
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.975rem', color: '#FFFFFF' }}>
                {heroSubPoints.map((pt, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                    <span style={{ color: '#FDE047', fontWeight: 800 }}>✔</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p style={{ fontSize: '1.05rem', lineHeight: 1.65, color: '#FFFFFF', marginBottom: '2rem', maxWidth: '780px', margin: '0 auto 2rem auto' }}>
            {heroDescription}
          </p>

          <a href="#apply-form" onClick={scrollToForm} style={{ display: 'inline-block', padding: '1.15rem 2.4rem', fontSize: '1.15rem', fontWeight: 800, color: '#042E23', background: 'linear-gradient(180deg, #FDE047 0%, #EAB308 100%)', borderRadius: '50px', textDecoration: 'none', boxShadow: '0 10px 25px rgba(234,179,8,0.45)', border: '2px solid #FEF08A' }}>
            👉 Tempah Temujanji Sekarang
          </a>
        </div>
      </section>

      {/* ── SECTION 2: TESTIMONI PART 1 ────────────────────── */}
      <TestimonialSection />

      {/* ── SECTION 3: MASALAH ─────────────────────────────── */}
      <section style={{ background: '#042E23', color: '#FFFFFF', padding: '3.5rem 1rem', fontFamily: 'var(--font-inter), -apple-system, sans-serif' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FDE047', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{problemLabel}</span>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 800, color: '#FDE047', marginTop: '0.4rem', marginBottom: '0.8rem', letterSpacing: '-0.02em' }}>
            {problemHeadline}
          </h2>
          {problemSubtext && (
            <p style={{ fontSize: '1rem', color: '#FFFFFF', marginBottom: '2.5rem', maxWidth: '750px', margin: '0 auto 2.5rem auto', lineHeight: 1.6 }}>{problemSubtext}</p>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {problems.map((p, idx) => (
              <div key={idx} style={{ background: '#FFFFFF', border: '2px solid #FDE047', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 8px 20px rgba(0,0,0,0.25)', textAlign: 'left' }}>
                {p.img && <img src={p.img} alt={p.title} style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block' }} />}
                <div style={{ padding: '1.1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <span style={{ color: '#047857', fontWeight: 800, fontSize: '1.1rem' }}>✔</span>
                    <span style={{ fontWeight: 800, fontSize: '0.925rem', color: '#0F172A', lineHeight: 1.4 }}>{p.title}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: FEARS (shared) ──────────────────────── */}
      <FearsSection />

      {/* ── SECTION 5: MATLAMAT ────────────────────────────── */}
      <section style={{ background: '#042E23', color: '#FFFFFF', padding: '3.5rem 1rem', fontFamily: 'var(--font-inter), -apple-system, sans-serif' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FDE047', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{matlamatLabel}</span>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 800, color: '#FDE047', marginTop: '0.4rem', marginBottom: '2rem', letterSpacing: '-0.02em' }}>
            {matlamatHeadline}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
            {goals.map((g, idx) => (
              <div key={idx} style={{ background: '#FFFFFF', border: '2px solid #FDE047', borderRadius: '10px', padding: '1.1rem 1.35rem', display: 'flex', alignItems: 'center', gap: '0.75rem', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#059669', color: '#FFFFFF', fontWeight: 800, fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>✔</div>
                <span style={{ fontWeight: 800, fontSize: '1.025rem', color: '#0F172A' }}>{g}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 6: TESTIMONI PART 2 (shared) ──────────── */}
      <TestimonialPart2Section />

      {/* ── SECTION 7: CTA ─────────────────────────────────── */}
      <section style={{ background: 'linear-gradient(180deg, #0B382D 0%, #042E23 100%)', color: '#FFFFFF', padding: '3.5rem 1rem', fontFamily: 'var(--font-inter), -apple-system, sans-serif', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FDE047', textTransform: 'uppercase', letterSpacing: '0.1em' }}>TINDAKAN SEGERA</span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3.8vw, 2.3rem)', fontWeight: 800, color: '#FDE047', marginTop: '0.4rem', marginBottom: '1.25rem', lineHeight: 1.3, letterSpacing: '-0.02em' }}>
            {ctaHeadline}
          </h2>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.65, color: '#FFFFFF', marginBottom: '2rem', maxWidth: '720px', margin: '0 auto 2rem auto' }}>{ctaSubtext}</p>
          <a href="#proses" onClick={scrollToProcess} style={{ display: 'inline-block', padding: '1.15rem 2.4rem', fontSize: '1.15rem', fontWeight: 800, color: '#042E23', background: 'linear-gradient(180deg, #FDE047 0%, #EAB308 100%)', borderRadius: '50px', textDecoration: 'none', boxShadow: '0 10px 25px rgba(234,179,8,0.45)', border: '2px solid #FEF08A' }}>
            👉 Tempah Temujanji Sekarang
          </a>
        </div>
      </section>

      {/* ── SECTION 8: HARGA (shared) ──────────────────────── */}
      <PricingSection />

      {/* ── SECTION 8B: JAMINAN (shared) ───────────────────── */}
      <GuaranteeSection />

      {/* ── SECTION 9: PROSES + BORANG (shared) ────────────── */}
      <ProcessSection />
      <ApplicationForm />

      {/* ── SECTION 10: FAQ ────────────────────────────────── */}
      <section style={{ background: '#FFFFFF', color: '#0F172A', padding: '3.5rem 1rem', fontFamily: 'var(--font-inter), -apple-system, sans-serif' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.25rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.1em' }}>SOALAN LAZIM</span>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 800, color: '#0F172A', marginTop: '0.4rem', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Soalan Lazim (FAQ)</h2>
          </div>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      {/* ── SECTION 11: PENUTUP ────────────────────────────── */}
      <section style={{ background: 'linear-gradient(180deg, #042E23 0%, #0B382D 100%)', color: '#FFFFFF', padding: '4rem 1rem', fontFamily: 'var(--font-inter), -apple-system, sans-serif', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FDE047', textTransform: 'uppercase', letterSpacing: '0.1em' }}>HASRAT &amp; HARAPAN</span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3.8vw, 2.4rem)', fontWeight: 800, color: '#FDE047', marginTop: '0.4rem', marginBottom: '1.5rem', lineHeight: 1.25, letterSpacing: '-0.02em' }}>
            {closingHeadline}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '1.05rem', lineHeight: 1.65, color: '#FFFFFF', marginBottom: '2.5rem', maxWidth: '750px', margin: '0 auto 2.5rem auto' }}>
            {closingParagraphs.map((p, i) => (
              <p key={i} style={{ margin: 0, fontWeight: i === closingParagraphs.length - 1 ? 800 : 400, color: i === closingParagraphs.length - 1 ? '#FDE047' : '#FFFFFF' }}>{p}</p>
            ))}
          </div>
          <a href="#apply-form" onClick={scrollToForm} style={{ display: 'inline-block', padding: '1.15rem 2.4rem', fontSize: '1.15rem', fontWeight: 800, color: '#042E23', background: 'linear-gradient(180deg, #FDE047 0%, #EAB308 100%)', borderRadius: '50px', textDecoration: 'none', boxShadow: '0 10px 25px rgba(234,179,8,0.45)', border: '2px solid #FEF08A' }}>
            👉 Tempah Temujanji Sekarang
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#021812', color: '#FFFFFF', padding: '2rem 1rem', textAlign: 'center', fontSize: '0.85rem', borderTop: '1px solid rgba(254,243,199,0.15)' }}>
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <p style={{ margin: '0 0 0.5rem 0', fontWeight: 800, fontSize: '1.05rem', color: '#FEF3C7' }}>
            🌿 ESyifaa · Rawatan Jarak Jauh Gangguan Jin, Sihir, Santau &amp; Saka
          </p>
          <p style={{ margin: 0, opacity: 0.85, fontSize: '0.8rem', color: '#D1D5DB' }}>
            © {new Date().getFullYear()} ESyifaa. Hak cipta terpelihara. Rawatan berasaskan bacaan Al-Quran dan doa berlandaskan syarak.
          </p>
        </div>
      </footer>

    </main>
  );
}

// ── Internal FAQ Accordion ───────────────────────────────────────────────────
function FAQAccordion({ faqs }) {
  const { useState } = require('react');
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {faqs.map((faq, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div key={idx} style={{ background: '#F8FAFC', border: isOpen ? '2px solid #059669' : '1px solid #E2E8F0', borderRadius: '10px', overflow: 'hidden' }}>
            <button onClick={() => setOpenIdx(isOpen ? null : idx)} style={{ width: '100%', padding: '1.1rem 1.25rem', background: 'transparent', border: 'none', textAlign: 'left', fontWeight: 800, fontSize: '1rem', color: isOpen ? '#047857' : '#0F172A', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
              <span>{faq.q}</span>
              <span style={{ fontSize: '1.25rem', color: '#059669', fontWeight: 800 }}>{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && (
              <div style={{ padding: '0 1.25rem 1.1rem 1.25rem', fontSize: '0.925rem', color: '#374151', lineHeight: 1.6, borderTop: '1px solid #E2E8F0', fontWeight: 500 }}>
                {faq.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
