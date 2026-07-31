'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import StatusBadge from '@/components/dashboard/StatusBadge';
import { useToast } from '@/components/ui/Toast';

export default function PractitionerDashboard() {
  const [period, setPeriod] = useState('today');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  // Theme observer state
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

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/stats?period=${period}`);
      const json = await res.json();
      if (res.ok && json.success) {
        setData(json.data);
      } else {
        throw new Error(json.error || 'Gagal memuatkan statistik papan pemuka');
      }
    } catch (err) {
      showToast(err.message || 'Gagal mengambil data', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 8000); // Live 8s auto-refresh
    return () => clearInterval(interval);
  }, [period]);

  const dashboard = data?.dashboard || {};
  const activeCases = data?.activeCases || [];
  const recentCases = data?.recentCases || [];

  const formatTimeAgo = (dateStr) => {
    if (!dateStr) return '';
    const diffMs = new Date() - new Date(dateStr);
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Baru sahaja';
    if (diffMins < 60) return `${diffMins}m lepas`;
    if (diffHours < 24) return `${diffHours}j lepas`;
    return `${diffDays}h lepas`;
  };

  const currentDateFormatted = new Date().toLocaleDateString('ms-MY', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const cardBg = isLightMode ? '#FFFFFF' : '#10131A';
  const subCardBg = isLightMode ? '#F8FAFC' : '#090A0F';
  const cardBorder = isLightMode ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)';
  const textPrimary = isLightMode ? '#0F172A' : '#F9FAFB';
  const textSecondary = isLightMode ? '#475569' : '#9CA3AF';
  const textMuted = isLightMode ? '#64748B' : '#6B7280';

  return (
    <div style={{ fontFamily: 'var(--font-inter), -apple-system, sans-serif', color: textPrimary, padding: '0.25rem 0' }}>
      
      {/* Enterprise Header Control Bar */}
      <div 
        style={{ 
          padding: '1.25rem 1.5rem', 
          borderRadius: '8px', 
          marginBottom: '2rem',
          background: cardBg,
          border: cardBorder,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          boxShadow: isLightMode ? '0 1px 3px rgba(0,0,0,0.05)' : 'none'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
            <span style={{ fontSize: '0.725rem', fontWeight: 600, color: isLightMode ? '#047857' : '#10B981', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              MV SYIFAA' · PORTAL UTAMA PERAWAT (AUTO-ASSIGN)
            </span>
            <span style={{ fontSize: '0.75rem', color: textMuted, marginLeft: '0.5rem' }}>
              {currentDateFormatted}
            </span>
          </div>
          
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, color: textPrimary, letterSpacing: '-0.02em' }}>
            Papan Pemuka Rawatan Jarak Jauh
          </h1>
          <p style={{ margin: '0.2rem 0 0', fontSize: '0.85rem', color: textSecondary }}>
            Kes baharu diagih secara automatik dan bergilir-gilir kepada perawat yang statusnya Aktif.
          </p>
        </div>

        {/* Period Selector Segmented Control */}
        <div style={{ display: 'flex', alignItems: 'center', background: isLightMode ? '#F1F5F9' : '#090A0F', padding: '3px', borderRadius: '6px', border: isLightMode ? '1px solid #CBD5E1' : '1px solid rgba(255,255,255,0.08)' }}>
          {[
            { id: 'today', label: 'Hari Ini' },
            { id: 'week', label: 'Minggu Ini' },
            { id: 'month', label: 'Bulan Ini' },
            { id: 'all', label: 'Keseluruhan' }
          ].map((p) => (
            <button
              key={p.id}
              onClick={() => setPeriod(p.id)}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: '4px',
                fontSize: '0.8rem',
                fontWeight: period === p.id ? 600 : 500,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                background: period === p.id ? (isLightMode ? '#FFFFFF' : '#064E3B') : 'transparent',
                color: period === p.id ? (isLightMode ? '#047857' : '#34D399') : textSecondary,
                boxShadow: period === p.id && isLightMode ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '320px', flexDirection: 'column', gap: '0.75rem' }}>
          <div className="spinner" style={{ width: '32px', height: '32px', borderColor: 'rgba(16,185,129,0.2)', borderTopColor: '#10B981' }}></div>
          <span style={{ color: textSecondary, fontSize: '0.85rem' }}>Memuatkan papan pemuka perawat...</span>
        </div>
      ) : (
        <>
          {/* Top Key Metrics Grid (4 Cards Grid) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.75rem' }}>
            
            {/* Jumlah Kes Ditugaskan */}
            <div style={{ background: cardBg, padding: '1.35rem 1.5rem', borderRadius: '8px', border: cardBorder, boxShadow: isLightMode ? '0 1px 3px rgba(0,0,0,0.05)' : 'none' }}>
              <div style={{ fontSize: '0.725rem', fontWeight: 600, color: textSecondary, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                JUMLAH KES SAYA
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: textPrimary, letterSpacing: '-0.03em', lineHeight: 1 }}>
                {dashboard.totalMyCases ?? 0}
              </div>
              <p style={{ margin: '0.5rem 0 0', fontSize: '0.75rem', color: textMuted }}>
                Di bawah pengendalian anda
              </p>
            </div>

            {/* Kes Aktif Dalam Rawatan */}
            <div style={{ background: cardBg, padding: '1.35rem 1.5rem', borderRadius: '8px', border: isLightMode ? '1px solid #A7F3D0' : '1px solid rgba(6, 78, 59, 0.4)', boxShadow: isLightMode ? '0 1px 3px rgba(0,0,0,0.05)' : 'none' }}>
              <div style={{ fontSize: '0.725rem', fontWeight: 600, color: isLightMode ? '#047857' : '#34D399', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                KES AKTIF DALAM RAWATAN
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: textPrimary, letterSpacing: '-0.03em', lineHeight: 1 }}>
                {dashboard.activeCases ?? 0}
              </div>
              <p style={{ margin: '0.5rem 0 0', fontSize: '0.75rem', color: textMuted }}>
                Sedang diuruskan perawat
              </p>
            </div>

            {/* Kes Perlu Follow-up */}
            <div style={{ background: cardBg, padding: '1.35rem 1.5rem', borderRadius: '8px', border: cardBorder, boxShadow: isLightMode ? '0 1px 3px rgba(0,0,0,0.05)' : 'none' }}>
              <div style={{ fontSize: '0.725rem', fontWeight: 600, color: '#D97706', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                KES PERLU FOLLOW-UP
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#D97706', letterSpacing: '-0.03em', lineHeight: 1 }}>
                {dashboard.followUpCases ?? 0}
              </div>
              <p style={{ margin: '0.5rem 0 0', fontSize: '0.75rem', color: textMuted }}>
                Memerlukan tindakan susulan
              </p>
            </div>

            {/* Rawatan Selesai */}
            <div style={{ background: cardBg, padding: '1.35rem 1.5rem', borderRadius: '8px', border: cardBorder, boxShadow: isLightMode ? '0 1px 3px rgba(0,0,0,0.05)' : 'none' }}>
              <div style={{ fontSize: '0.725rem', fontWeight: 600, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                RAWATAN SELESAI
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#059669', letterSpacing: '-0.03em', lineHeight: 1 }}>
                {dashboard.completedCases ?? 0}
              </div>
              <p style={{ margin: '0.5rem 0 0', fontSize: '0.75rem', color: textMuted }}>
                Selesai sepenuhnya
              </p>
            </div>

          </div>

          {/* Main Content Area: Senarai Kes Auto-Assign Terkini */}
          <div style={{ padding: '1.5rem', borderRadius: '8px', background: cardBg, border: cardBorder, boxShadow: isLightMode ? '0 1px 3px rgba(0,0,0,0.05)' : 'none', marginBottom: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h2 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0, color: textPrimary }}>
                  Kes Aktif Dalam Rawatan Saya
                </h2>
                <p style={{ margin: '0.15rem 0 0', fontSize: '0.775rem', color: textMuted }}>
                  Permohonan pesakit yang diagihkan secara automatik (round-robin) kepada anda
                </p>
              </div>
              <Link href="/dashboard/perawat/kes-saya" style={{ fontSize: '0.775rem', fontWeight: 600, color: isLightMode ? '#047857' : '#34D399', textDecoration: 'none' }}>
                Buka Kes Saya →
              </Link>
            </div>

            {activeCases.length === 0 ? (
              <div style={{ padding: '2.5rem 0', textAlign: 'center', color: textMuted, fontSize: '0.85rem' }}>
                Tiada kes aktif buat masa ini. Kes baharu akan muncul secara automatik di sini bila pelanggan mengemas kini borang salespage.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {activeCases.map((c) => (
                  <div 
                    key={c.id} 
                    style={{ 
                      padding: '0.85rem 1rem', 
                      borderRadius: '6px', 
                      background: subCardBg, 
                      border: isLightMode ? '1px solid #E2E8F0' : '1px solid rgba(255,255,255,0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '0.75rem'
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.15rem' }}>
                        <span style={{ fontWeight: 600, color: textPrimary, fontSize: '0.875rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {c.customer_name}
                        </span>
                        {c.is_repeat && (
                          <span style={{ fontSize: '0.6rem', padding: '0.05rem 0.35rem', borderRadius: '3px', background: 'rgba(167, 139, 250, 0.15)', color: '#7C3AED', fontWeight: 600, textTransform: 'uppercase' }}>
                            Berulang
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: textMuted, display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <span>Tel: {c.customer_phone || 'N/A'}</span>
                        <span>{formatTimeAgo(c.created_at)}</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <StatusBadge status={c.status} />
                      <a
                        href={`https://wa.me/${(c.customer_phone || '').replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          background: isLightMode ? '#047857' : '#064E3B',
                          border: isLightMode ? '1px solid #059669' : '1px solid rgba(16, 185, 129, 0.3)',
                          color: '#FFFFFF',
                          padding: '0.3rem 0.6rem',
                          borderRadius: '4px',
                          fontSize: '0.725rem',
                          fontWeight: 600,
                          textDecoration: 'none'
                        }}
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Action Navigation Bar */}
          <div style={{ marginTop: '1.75rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <Link 
              href="/dashboard/perawat/kes-saya" 
              style={{ 
                padding: '1.15rem 1.25rem', 
                borderRadius: '8px', 
                background: cardBg, 
                border: cardBorder,
                textDecoration: 'none',
                boxShadow: isLightMode ? '0 1px 3px rgba(0,0,0,0.05)' : 'none'
              }}
            >
              <h4 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 700, color: isLightMode ? '#047857' : '#34D399' }}>Kes Saya</h4>
              <p style={{ margin: '0.2rem 0 0', fontSize: '0.75rem', color: textSecondary }}>Senarai permohonan yang auto-assigned</p>
            </Link>

            <Link 
              href="/dashboard/perawat/follow-up" 
              style={{ 
                padding: '1.15rem 1.25rem', 
                borderRadius: '8px', 
                background: cardBg, 
                border: cardBorder,
                textDecoration: 'none',
                boxShadow: isLightMode ? '0 1px 3px rgba(0,0,0,0.05)' : 'none'
              }}
            >
              <h4 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 700, color: textPrimary }}>Follow-up Rawatan</h4>
              <p style={{ margin: '0.2rem 0 0', fontSize: '0.75rem', color: textSecondary }}>Jadual susulan pesakit</p>
            </Link>

            <div 
              style={{ 
                padding: '1.15rem 1.25rem', 
                borderRadius: '8px', 
                background: cardBg, 
                border: cardBorder,
                boxShadow: isLightMode ? '0 1px 3px rgba(0,0,0,0.05)' : 'none'
              }}
            >
              <h4 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 700, color: isLightMode ? '#059669' : '#10B981' }}>Tugasan Selesai</h4>
              <p style={{ margin: '0.2rem 0 0', fontSize: '0.75rem', color: textSecondary }}>{dashboard.completedCases || 0} kes berjaya dirawat</p>
            </div>
          </div>
        </>
      )}

    </div>
  );
}
