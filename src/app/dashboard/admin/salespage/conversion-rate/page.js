'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/Toast';

export default function ConversionRatePage() {
  const [period, setPeriod] = useState('all');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

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

  const cardBg       = isLightMode ? '#FFFFFF' : '#10131A';
  const subCardBg    = isLightMode ? '#F8FAFC' : '#090A0F';
  const cardBorder   = isLightMode ? '1px solid #E2E8F0' : '1px solid rgba(255,255,255,0.08)';
  const textPrimary  = isLightMode ? '#0F172A' : '#F9FAFB';
  const textSecondary = isLightMode ? '#475569' : '#9CA3AF';
  const textMuted    = isLightMode ? '#64748B' : '#6B7280';
  const green        = isLightMode ? '#047857' : '#34D399';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/stats/conversion-rate?period=${period}`);
        const json = await res.json();
        if (res.ok && json.success) {
          setData(json.data);
        } else {
          throw new Error(json.error || 'Gagal memuatkan data');
        }
      } catch (err) {
        showToast(err.message || 'Ralat memuatkan conversion rate', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [period]);

  const totalLeads    = data.reduce((s, d) => s + d.total_leads, 0);
  const totalVisitors = data.reduce((s, d) => s + d.unique_visitors, 0);
  const overallRate   = totalVisitors > 0 ? ((totalLeads / totalVisitors) * 100).toFixed(1) : null;

  return (
    <div style={{ fontFamily: 'var(--font-inter), -apple-system, sans-serif', color: textPrimary, padding: '0.25rem 0' }}>

      {/* Header */}
      <div style={{
        padding: '1.25rem 1.5rem', borderRadius: '8px', marginBottom: '1.75rem',
        background: cardBg, border: cardBorder,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: '1rem',
        boxShadow: isLightMode ? '0 1px 3px rgba(0,0,0,0.05)' : 'none',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
            <span style={{ fontSize: '0.725rem', fontWeight: 600, color: green, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              ANALISIS PRESTASI
            </span>
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.2rem', color: textPrimary, letterSpacing: '-0.02em' }}>
            Conversion Rate Salespage
          </h1>
          <p style={{ margin: 0, fontSize: '0.85rem', color: textSecondary }}>
            Unique visitor, total lead & conversion rate bagi setiap salespage
          </p>
        </div>

        {/* Period Selector */}
        <div style={{ display: 'flex', alignItems: 'center', background: isLightMode ? '#F1F5F9' : '#090A0F', padding: '3px', borderRadius: '6px', border: isLightMode ? '1px solid #CBD5E1' : '1px solid rgba(255,255,255,0.08)' }}>
          {[
            { id: 'today',     label: 'Hari Ini' },
            { id: 'yesterday', label: 'Kelmarin' },
            { id: 'week',      label: 'Mingguan' },
            { id: 'month',     label: 'Bulanan' },
            { id: 'all',       label: 'Keseluruhan' },
          ].map(p => (
            <button
              key={p.id}
              onClick={() => setPeriod(p.id)}
              style={{
                padding: '0.4rem 0.85rem', borderRadius: '4px',
                fontSize: '0.8rem', fontWeight: period === p.id ? 600 : 500,
                border: 'none', cursor: 'pointer', transition: 'all 0.15s ease',
                background: period === p.id ? (isLightMode ? '#FFFFFF' : '#064E3B') : 'transparent',
                color: period === p.id ? green : textSecondary,
                boxShadow: period === p.id && isLightMode ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '320px', flexDirection: 'column', gap: '0.75rem' }}>
          <div className="spinner" style={{ width: '32px', height: '32px', borderColor: 'rgba(16,185,129,0.2)', borderTopColor: '#10B981' }} />
          <span style={{ color: textSecondary, fontSize: '0.85rem' }}>Memuatkan data conversion rate...</span>
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.75rem' }}>
            {[
              { label: 'JUMLAH VISITOR',     value: totalVisitors.toLocaleString(), color: textPrimary },
              { label: 'JUMLAH LEAD',         value: totalLeads.toLocaleString(),    color: green },
              { label: 'OVERALL CONV. RATE',  value: overallRate ? `${overallRate}%` : '—', color: overallRate >= 3 ? '#10B981' : overallRate >= 1 ? '#F59E0B' : '#EF4444' },
            ].map((card, i) => (
              <div key={i} style={{ padding: '1.25rem 1.5rem', borderRadius: '8px', background: cardBg, border: cardBorder, boxShadow: isLightMode ? '0 1px 3px rgba(0,0,0,0.05)' : 'none' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 700, color: textSecondary, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.45rem' }}>{card.label}</div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: card.color, letterSpacing: '-0.02em', lineHeight: 1 }}>{card.value}</div>
              </div>
            ))}
          </div>

          {/* Table */}
          <div style={{ background: cardBg, border: cardBorder, borderRadius: '8px', overflow: 'hidden', boxShadow: isLightMode ? '0 1px 3px rgba(0,0,0,0.05)' : 'none' }}>
            {/* Table Header */}
            <div style={{
              display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr',
              padding: '0.85rem 1.5rem',
              background: isLightMode ? '#F8FAFC' : '#090A0F',
              borderBottom: isLightMode ? '1px solid #E2E8F0' : '1px solid rgba(255,255,255,0.06)',
              fontSize: '0.7rem', fontWeight: 700, color: textSecondary,
              textTransform: 'uppercase', letterSpacing: '0.06em',
            }}>
              <span>Salespage</span>
              <span style={{ textAlign: 'right' }}>Unique Visitor</span>
              <span style={{ textAlign: 'right' }}>Total Lead</span>
              <span style={{ textAlign: 'right' }}>Conv. Rate</span>
            </div>

            {data.length === 0 ? (
              <div style={{ padding: '3rem', textAlign: 'center', color: textMuted, fontSize: '0.875rem' }}>
                Tiada data untuk tempoh ini.
              </div>
            ) : (
              data.map((sp, idx) => {
                const rate = sp.conversion_rate;
                const rateColor = !rate ? textMuted : parseFloat(rate) >= 3 ? '#10B981' : parseFloat(rate) >= 1 ? '#F59E0B' : '#EF4444';
                const isTop = idx === 0 && sp.total_leads > 0;

                return (
                  <div
                    key={sp.slug}
                    style={{
                      display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr',
                      padding: '1rem 1.5rem',
                      borderBottom: isLightMode ? '1px solid #F1F5F9' : '1px solid rgba(255,255,255,0.04)',
                      alignItems: 'center',
                      background: isTop ? (isLightMode ? 'rgba(16,185,129,0.04)' : 'rgba(16,185,129,0.05)') : 'transparent',
                      transition: 'background 0.15s ease',
                    }}
                  >
                    {/* Salespage Name */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <span style={{ fontSize: '0.875rem', fontWeight: 600, color: textPrimary }}>{sp.label}</span>
                      {isTop && (
                        <span style={{ fontSize: '0.6rem', padding: '0.1rem 0.4rem', borderRadius: '3px', background: 'rgba(16,185,129,0.15)', color: green, fontWeight: 700, textTransform: 'uppercase' }}>
                          Teratas
                        </span>
                      )}
                    </div>

                    {/* Visitors */}
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '1rem', fontWeight: 700, color: sp.unique_visitors > 0 ? textPrimary : textMuted }}>
                        {sp.unique_visitors > 0 ? sp.unique_visitors.toLocaleString() : '—'}
                      </span>
                    </div>

                    {/* Leads */}
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '1rem', fontWeight: 700, color: sp.total_leads > 0 ? green : textMuted }}>
                        {sp.total_leads > 0 ? sp.total_leads : '0'}
                      </span>
                    </div>

                    {/* Conv Rate */}
                    <div style={{ textAlign: 'right' }}>
                      <span style={{
                        fontSize: '0.95rem', fontWeight: 800, color: rateColor,
                        background: rate ? (isLightMode ? `${rateColor}15` : `${rateColor}20`) : 'transparent',
                        padding: rate ? '0.2rem 0.55rem' : '0',
                        borderRadius: '4px',
                      }}>
                        {rate ? `${rate}%` : '—'}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Note about visitor tracking */}
          <div style={{
            marginTop: '1rem', padding: '0.85rem 1.25rem',
            background: isLightMode ? '#FFFBEB' : 'rgba(245,158,11,0.08)',
            border: isLightMode ? '1px solid #FDE68A' : '1px solid rgba(245,158,11,0.2)',
            borderRadius: '8px', fontSize: '0.8rem', color: isLightMode ? '#92400E' : '#FCD34D',
          }}>
            💡 <strong>Nota:</strong> Data visitor dikumpul dari setiap lawatan ke salespage. Conv. Rate = Lead ÷ Visitor × 100. Data &quot;—&quot; bermakna visitor tracking belum aktif untuk salespage berkenaan.
          </div>
        </>
      )}
    </div>
  );
}
