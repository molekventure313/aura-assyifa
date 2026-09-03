'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import StatusBadge from '@/components/dashboard/StatusBadge';
import { useToast } from '@/components/ui/Toast';

export default function AdminDashboardPage() {
  const [period, setPeriod] = useState('today');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adsData, setAdsData] = useState(null);
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
      const res = await fetch(`/api/stats?role=admin&period=${period}`);
      const json = await res.json();
      if (res.ok && json.success) {
        setData(json.data);
      } else {
        throw new Error(json.error || 'Gagal memuatkan statistik');
      }
    } catch (err) {
      showToast(err.message || 'Gagal mengambil statistik', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchAds = async () => {
    try {
      const res = await fetch(`/api/admin/ads-spend?period=${period}`);
      const json = await res.json();
      if (json.success) setAdsData(json.data.summary);
    } catch {}
  };

  useEffect(() => {
    fetchStats();
    fetchAds();
  }, [period]);

  const dashboard = data?.dashboard || {};
  const practitioners = data?.practitionerPerformance || [];
  const recentCases = data?.recentCases || [];
  const salespageBreakdown = data?.salespageBreakdown || [];

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
      
      {/* Executive Header Banner */}
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
            <span style={{ fontSize: '0.725rem', fontWeight: 600, color: isLightMode ? '#047857' : '#34D399', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Aura Assyifa EXECUTIVE CONTROL
            </span>
            <span style={{ fontSize: '0.75rem', color: textMuted, marginLeft: '0.5rem' }}>
              {currentDateFormatted}
            </span>
          </div>
          
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, color: textPrimary, letterSpacing: '-0.02em' }}>
            Pengurusan Rawatan Jarak Jauh
          </h1>
          <p style={{ margin: '0.2rem 0 0', fontSize: '0.85rem', color: textSecondary }}>
            Pemantauan permohonan pesakit, agihan perawat, dan prestasi perkhidmatan.
          </p>
        </div>

        {/* Period Selector Segmented Control */}
        <div style={{ display: 'flex', alignItems: 'center', background: isLightMode ? '#F1F5F9' : '#090A0F', padding: '3px', borderRadius: '6px', border: isLightMode ? '1px solid #CBD5E1' : '1px solid rgba(255,255,255,0.08)' }}>
          {[
            { id: 'today', label: 'Hari Ini' },
            { id: 'yesterday', label: 'Kelmarin' },
            { id: 'week', label: 'Mingguan' },
            { id: 'month', label: 'Bulanan' },
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
          <span style={{ color: textSecondary, fontSize: '0.85rem' }}>Memuatkan statistik papan pemuka...</span>
        </div>
      ) : (
        <>
          {/* Ads Metrics Row — 5 cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', marginBottom: '1.25rem' }}>
            {[
              { label: 'Total Sales', value: adsData ? `RM ${(adsData.total_sales ?? 0).toFixed(2)}` : '—', color: '#10B981' },
              { label: 'Total Spent', value: adsData ? `RM ${(adsData.total_spent ?? 0).toFixed(2)}` : '—', color: '#F59E0B' },
              { label: 'Lead', value: adsData ? adsData.total_leads ?? 0 : '—', color: textPrimary },
              { label: 'Kos Per Lead', value: adsData && adsData.total_leads > 0 ? `RM ${(adsData.avg_cost_per_lead ?? 0).toFixed(2)}` : '—', color: textSecondary },
              { label: 'Total Komisen', value: adsData ? `RM ${(adsData.total_komisen ?? 0).toFixed(2)}` : '—', color: '#10B981' },
            ].map((card, i) => (
              <div key={i} style={{ padding: '1rem 1.25rem', borderRadius: '8px', background: cardBg, border: cardBorder, boxShadow: isLightMode ? '0 1px 3px rgba(0,0,0,0.05)' : 'none' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 700, color: textSecondary, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.45rem' }}>{card.label}</div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: card.color, letterSpacing: '-0.02em', lineHeight: 1 }}>{card.value}</div>
              </div>
            ))}
          </div>

          {/* Key Metrics Grid (4 Main Cards) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.75rem' }}>
            
            {/* Total Customers */}
            <div style={{ background: cardBg, padding: '1.35rem 1.5rem', borderRadius: '8px', border: cardBorder, boxShadow: isLightMode ? '0 1px 3px rgba(0,0,0,0.05)' : 'none' }}>
              <div style={{ fontSize: '0.725rem', fontWeight: 600, color: textSecondary, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                JUMLAH PESAKIT
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: textPrimary, letterSpacing: '-0.03em', lineHeight: 1 }}>
                {dashboard.totalCustomers ?? 0}
              </div>
              <p style={{ margin: '0.5rem 0 0', fontSize: '0.75rem', color: textMuted }}>
                Pesakit berdaftar
              </p>
            </div>

            {/* New Cases */}
            <div style={{ background: cardBg, padding: '1.35rem 1.5rem', borderRadius: '8px', border: isLightMode ? '1px solid #A7F3D0' : '1px solid rgba(6, 78, 59, 0.4)', boxShadow: isLightMode ? '0 1px 3px rgba(0,0,0,0.05)' : 'none' }}>
              <div style={{ fontSize: '0.725rem', fontWeight: 600, color: isLightMode ? '#047857' : '#34D399', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                PERMOHONAN BAHARU
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: textPrimary, letterSpacing: '-0.03em', lineHeight: 1 }}>
                {dashboard.newCases ?? 0}
              </div>
              <p style={{ margin: '0.5rem 0 0', fontSize: '0.75rem', color: textMuted }}>
                Sepanjang tempoh dipilih
              </p>
            </div>

            {/* In Progress */}
            <div style={{ background: cardBg, padding: '1.35rem 1.5rem', borderRadius: '8px', border: cardBorder, boxShadow: isLightMode ? '0 1px 3px rgba(0,0,0,0.05)' : 'none' }}>
              <div style={{ fontSize: '0.725rem', fontWeight: 600, color: textSecondary, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                KES DALAM RAWATAN
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: textPrimary, letterSpacing: '-0.03em', lineHeight: 1 }}>
                {dashboard.inProgress ?? 0}
              </div>
              <p style={{ margin: '0.5rem 0 0', fontSize: '0.75rem', color: textMuted }}>
                Sedang dikendalikan perawat
              </p>
            </div>

            {/* Completed */}
            <div style={{ background: cardBg, padding: '1.35rem 1.5rem', borderRadius: '8px', border: cardBorder, boxShadow: isLightMode ? '0 1px 3px rgba(0,0,0,0.05)' : 'none' }}>
              <div style={{ fontSize: '0.725rem', fontWeight: 600, color: textSecondary, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                RAWATAN SELESAI
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: textPrimary, letterSpacing: '-0.03em', lineHeight: 1 }}>
                {dashboard.completed ?? 0}
              </div>
              <p style={{ margin: '0.5rem 0 0', fontSize: '0.75rem', color: textMuted }}>
                Selesai sepenuhnya
              </p>
            </div>

          </div>

          {/* Secondary Operational Metrics Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2.25rem' }}>
            
            <div style={{ padding: '1rem 1.25rem', borderRadius: '8px', background: cardBg, border: cardBorder, display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: isLightMode ? '0 1px 3px rgba(0,0,0,0.05)' : 'none' }}>
              <div>
                <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: textSecondary, fontWeight: 600, display: 'block', marginBottom: '0.15rem', letterSpacing: '0.05em' }}>
                  Kes Belum Diambil
                </span>
                <span style={{ fontSize: '1.4rem', fontWeight: 700, color: textPrimary }}>
                  {dashboard.unclaimedCases ?? 0}
                </span>
              </div>
              <span style={{ fontSize: '0.65rem', padding: '0.2rem 0.5rem', borderRadius: '4px', background: isLightMode ? '#ECFDF5' : 'rgba(16, 185, 129, 0.12)', color: isLightMode ? '#047857' : '#10B981', fontWeight: 600 }}>
                SELESAI
              </span>
            </div>

            <div style={{ padding: '1rem 1.25rem', borderRadius: '8px', background: cardBg, border: cardBorder, display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: isLightMode ? '0 1px 3px rgba(0,0,0,0.05)' : 'none' }}>
              <div>
                <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: textSecondary, fontWeight: 600, display: 'block', marginBottom: '0.15rem', letterSpacing: '0.05em' }}>
                  Pesakit Berulang
                </span>
                <span style={{ fontSize: '1.4rem', fontWeight: 700, color: textPrimary }}>
                  {dashboard.repeatCustomers ?? 0}
                </span>
              </div>
            </div>

            <div style={{ padding: '1rem 1.25rem', borderRadius: '8px', background: cardBg, border: cardBorder, display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: isLightMode ? '0 1px 3px rgba(0,0,0,0.05)' : 'none' }}>
              <div>
                <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: textSecondary, fontWeight: 600, display: 'block', marginBottom: '0.15rem', letterSpacing: '0.05em' }}>
                  Tidak Dapat Dihubungi
                </span>
                <span style={{ fontSize: '1.4rem', fontWeight: 700, color: textPrimary }}>
                  {dashboard.unreachable ?? 0}
                </span>
              </div>
            </div>

            <div style={{ padding: '1rem 1.25rem', borderRadius: '8px', background: cardBg, border: cardBorder, display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: isLightMode ? '0 1px 3px rgba(0,0,0,0.05)' : 'none' }}>
              <div>
                <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: textSecondary, fontWeight: 600, display: 'block', marginBottom: '0.15rem', letterSpacing: '0.05em' }}>
                  Perawat Aktif
                </span>
                <span style={{ fontSize: '1.4rem', fontWeight: 700, color: isLightMode ? '#047857' : '#34D399' }}>
                  {dashboard.totalPractitioners ?? 0}
                </span>
              </div>
            </div>

          </div>




          {/* Main 2-Column Section: Practitioner Performance & Recent Incoming Stream */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.75rem' }}>
            
            {/* Left Column: Beban Kerja Perawat */}
            <div style={{ padding: '1.5rem', borderRadius: '8px', background: cardBg, border: cardBorder, boxShadow: isLightMode ? '0 1px 3px rgba(0,0,0,0.05)' : 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0, color: textPrimary }}>
                    Beban Kerja Perawat
                  </h2>
                  <p style={{ margin: '0.15rem 0 0', fontSize: '0.775rem', color: textMuted }}>
                    Agihan tugasan dan kapasiti kes aktif
                  </p>
                </div>
                <Link href="/dashboard/admin/perawat" style={{ fontSize: '0.775rem', fontWeight: 600, color: isLightMode ? '#047857' : '#34D399', textDecoration: 'none' }}>
                  Urus Perawat →
                </Link>
              </div>

              {practitioners.length === 0 ? (
                <div style={{ padding: '2rem 0', textAlign: 'center', color: textMuted, fontSize: '0.85rem' }}>
                  Tiada perawat berdaftar. <Link href="/dashboard/admin/perawat" style={{ color: isLightMode ? '#047857' : '#34D399' }}>Tambah perawat</Link>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {practitioners.map((p) => {
                    const maxCases = p.max_active_cases || 10;
                    const pct = Math.min(Math.round((p.pending / maxCases) * 100), 100);

                    return (
                      <div key={p.id} style={{ background: subCardBg, padding: '0.85rem 1rem', borderRadius: '6px', border: isLightMode ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.05)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                          <span style={{ fontWeight: 600, fontSize: '0.875rem', color: textPrimary }}>{p.name}</span>
                          <span style={{ fontSize: '0.775rem', color: textMuted, fontWeight: 500 }}>
                            {p.pending} / {maxCases} kes aktif
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div style={{ width: '100%', height: '4px', background: isLightMode ? '#CBD5E1' : 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
                          <div 
                            style={{ 
                              width: `${pct}%`, 
                              height: '100%', 
                              background: pct >= 80 ? '#EF4444' : pct >= 50 ? '#F59E0B' : '#10B981',
                              borderRadius: '2px',
                              transition: 'width 0.3s ease'
                            }} 
                          />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.725rem', color: textMuted, marginTop: '0.4rem' }}>
                          <span>Selesai: <strong style={{ color: isLightMode ? '#047857' : '#10B981' }}>{p.completed}</strong></span>
                          <span>Status: <strong style={{ color: p.is_active ? (isLightMode ? '#047857' : '#34D399') : '#EF4444' }}>{p.is_active ? 'Aktif' : 'Nyahaktif'}</strong></span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right Column: Permohonan Kes Terkini */}
            <div style={{ padding: '1.5rem', borderRadius: '8px', background: cardBg, border: cardBorder, boxShadow: isLightMode ? '0 1px 3px rgba(0,0,0,0.05)' : 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0, color: textPrimary }}>
                    Permohonan Kes Terkini
                  </h2>
                  <p style={{ margin: '0.15rem 0 0', fontSize: '0.775rem', color: textMuted }}>
                    Aliran permohonan pesakit mengikut masa nyata
                  </p>
                </div>
                <Link href="/dashboard/admin/kes" style={{ fontSize: '0.775rem', fontWeight: 600, color: isLightMode ? '#047857' : '#34D399', textDecoration: 'none' }}>
                  Lihat Semua →
                </Link>
              </div>

              {recentCases.length === 0 ? (
                <div style={{ padding: '2rem 0', textAlign: 'center', color: textMuted, fontSize: '0.85rem' }}>
                  Tiada kes permohonan terkini.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {recentCases.map((c) => (
                    <div 
                      key={c.id} 
                      style={{ 
                        padding: '0.85rem 1rem', 
                        borderRadius: '6px', 
                        background: subCardBg, 
                        border: isLightMode ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.05)',
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
                          <span>Perawat: {c.practitioner_name}</span>
                          <span>{formatTimeAgo(c.created_at)}</span>
                        </div>
                      </div>

                      <StatusBadge status={c.status} />
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Navigation Quick Links (3 Boxes - Pangkalan Data Pesakit Removed) */}
          <div style={{ marginTop: '1.75rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <Link 
              href="/dashboard/admin/kes" 
              style={{ 
                padding: '1.15rem 1.25rem', 
                borderRadius: '8px', 
                background: cardBg, 
                border: cardBorder,
                textDecoration: 'none',
                boxShadow: isLightMode ? '0 1px 3px rgba(0,0,0,0.05)' : 'none'
              }}
            >
              <h4 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 700, color: textPrimary }}>Pengurusan Semua Kes</h4>
              <p style={{ margin: '0.2rem 0 0', fontSize: '0.75rem', color: textSecondary }}>Agih &amp; kemaskini perawat</p>
            </Link>

            <Link 
              href="/dashboard/admin/perawat" 
              style={{ 
                padding: '1.15rem 1.25rem', 
                borderRadius: '8px', 
                background: cardBg, 
                border: cardBorder,
                textDecoration: 'none',
                boxShadow: isLightMode ? '0 1px 3px rgba(0,0,0,0.05)' : 'none'
              }}
            >
              <h4 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 700, color: textPrimary }}>Pengurusan Perawat</h4>
              <p style={{ margin: '0.2rem 0 0', fontSize: '0.75rem', color: textSecondary }}>Beban kerja &amp; akaun perawat</p>
            </Link>

            <Link 
              href="/dashboard/admin/tracking" 
              style={{ 
                padding: '1.15rem 1.25rem', 
                borderRadius: '8px', 
                background: cardBg, 
                border: cardBorder,
                textDecoration: 'none',
                boxShadow: isLightMode ? '0 1px 3px rgba(0,0,0,0.05)' : 'none'
              }}
            >
              <h4 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 700, color: textPrimary }}>Tracking &amp; Pixel</h4>
              <p style={{ margin: '0.2rem 0 0', fontSize: '0.75rem', color: textSecondary }}>Integrasi Meta Pixel &amp; CAPI</p>
            </Link>
          </div>
        </>
      )}

    </div>
  );
}

