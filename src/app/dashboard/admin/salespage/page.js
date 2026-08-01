'use client';

import SalespageManagement from '@/components/dashboard/SalespageManagement';
import { useState, useEffect } from 'react';

export default function SalespageManagementPage() {
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const isLight = document.body.classList.contains('light-mode') || document.documentElement.getAttribute('data-theme') === 'light';
      setIsLightMode(isLight);
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const cardBg     = isLightMode ? '#FFFFFF' : '#10131A';
  const cardBorder = isLightMode ? '1px solid #E2E8F0' : '1px solid rgba(255,255,255,0.08)';
  const textPrimary   = isLightMode ? '#0F172A' : '#F9FAFB';
  const textSecondary = isLightMode ? '#475569' : '#9CA3AF';

  return (
    <div style={{ fontFamily: 'var(--font-inter), -apple-system, sans-serif', color: textPrimary, padding: '0.25rem 0' }}>

      {/* Page Header */}
      <div
        style={{
          padding: '1.25rem 1.5rem',
          borderRadius: '8px',
          marginBottom: '1.75rem',
          background: cardBg,
          border: cardBorder,
          boxShadow: isLightMode ? '0 1px 3px rgba(0,0,0,0.05)' : 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
          <span style={{ fontSize: '0.725rem', fontWeight: 600, color: isLightMode ? '#047857' : '#34D399', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            TETAPAN HOMEPAGE
          </span>
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.2rem 0', color: textPrimary, letterSpacing: '-0.02em' }}>
          Salespage Management
        </h1>
        <p style={{ margin: 0, fontSize: '0.85rem', color: textSecondary }}>
          Pilih dan tetapkan salespage yang akan dipaparkan di halaman utama{' '}
          <code style={{ background: isLightMode ? '#F1F5F9' : '#1E2230', padding: '0.1rem 0.4rem', borderRadius: '4px', fontSize: '0.78rem', color: isLightMode ? '#047857' : '#34D399' }}>
            localhost:3000/
          </code>
          . Salespage lain kekal boleh diakses melalui slug URL masing-masing.
        </p>
      </div>

      {/* Salespage Management Component */}
      <SalespageManagement
        isLightMode={isLightMode}
        cardBg={cardBg}
        cardBorder={cardBorder}
        textPrimary={textPrimary}
        textSecondary={textSecondary}
      />
    </div>
  );
}
