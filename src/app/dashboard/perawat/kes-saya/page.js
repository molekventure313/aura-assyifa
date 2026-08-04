'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import StatusBadge from '@/components/dashboard/StatusBadge';
import { useToast } from '@/components/ui/Toast';

export default function PractitionerKesSayaPage() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
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

  const fetchMyCases = async () => {
    try {
      const res = await fetch('/api/cases?myCases=true');
      const json = await res.json();
      if (res.ok && json.success) {
        setCases(json.data || []);
      } else {
        throw new Error(json.error || 'Gagal memuatkan kes saya');
      }
    } catch (err) {
      showToast(err.message || 'Ralat memuatkan senarai kes', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyCases();
    const interval = setInterval(fetchMyCases, 8000); // Live 8s auto-refresh
    return () => clearInterval(interval);
  }, []);

  const updateCaseStatus = async (caseId, newStatus) => {
    try {
      const res = await fetch(`/api/cases/${caseId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update_status', status: newStatus })
      });
      const json = await res.json();
      if (res.ok && json.success) {
        showToast(`Status kes berjaya dikemaskini kepada: ${newStatus}`, 'success');
        fetchMyCases();
      } else {
        throw new Error(json.error || 'Gagal mengemaskini status');
      }
    } catch (err) {
      showToast(err.message || 'Ralat kemaskini status', 'error');
    }
  };

  const filteredCases = cases.filter(c => {
    if (filterStatus === 'all') return true;
    return c.status === filterStatus;
  });

  const cardBg = isLightMode ? '#FFFFFF' : '#10131A';
  const subCardBg = isLightMode ? '#F8FAFC' : '#090A0F';
  const cardBorder = isLightMode ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)';
  const textPrimary = isLightMode ? '#0F172A' : '#F9FAFB';
  const textSecondary = isLightMode ? '#475569' : '#9CA3AF';
  const textMuted = isLightMode ? '#64748B' : '#6B7280';

  return (
    <div style={{ fontFamily: 'var(--font-inter), -apple-system, sans-serif', color: textPrimary, padding: '0.25rem 0' }}>
      
      {/* Header Banner */}
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
              PORTAL PERAWAT · TUGASAN AUTO-ASSIGN
            </span>
          </div>
          
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, color: textPrimary, letterSpacing: '-0.02em' }}>
            Senarai Kes Saya ({cases.length})
          </h1>
          <p style={{ margin: '0.2rem 0 0', fontSize: '0.85rem', color: textSecondary }}>
            Semua permohonan rawatan yang diagihkan secara bergilir-gilir kepada anda dalam masa nyata.
          </p>
        </div>

        {/* Status Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.8rem', color: textSecondary, fontWeight: 600 }}>Tapis Status:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              padding: '0.45rem 0.85rem',
              borderRadius: '6px',
              border: isLightMode ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.12)',
              background: cardBg,
              color: textPrimary,
              fontSize: '0.8rem',
              fontWeight: 600,
              outline: 'none'
            }}
          >
            <option value="all">Semua Status ({cases.length})</option>
            <option value="Sedang Diurus">Sedang Diurus</option>
            <option value="Perlu Follow-up">Perlu Follow-up</option>
            <option value="Rawatan Selesai">Rawatan Selesai</option>
            <option value="Tidak Dapat Dihubungi">Tidak Dapat Dihubungi</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px', flexDirection: 'column', gap: '0.75rem' }}>
          <div className="spinner" style={{ width: '32px', height: '32px', borderColor: 'rgba(16,185,129,0.2)', borderTopColor: '#10B981' }}></div>
          <span style={{ color: textSecondary, fontSize: '0.85rem' }}>Memuatkan senarai kes anda...</span>
        </div>
      ) : filteredCases.length === 0 ? (
        <div style={{ padding: '3rem 1.5rem', textAlign: 'center', background: cardBg, border: cardBorder, borderRadius: '8px' }}>
          <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.5rem' }}>📋</span>
          <h3 style={{ margin: '0 0 0.4rem 0', color: textPrimary, fontSize: '1.1rem' }}>Tiada Kes Di bawah Status Ini</h3>
          <p style={{ margin: 0, color: textMuted, fontSize: '0.85rem' }}>
            Kes baharu yang dihantar pelanggan akan muncul di sini secara automatik bila status anda Aktif.
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
          {filteredCases.map((c) => {
            const phoneClean = (c.customer_phone || '').replace(/[^0-9]/g, '');
            const waLink = `https://wa.me/${phoneClean}`;

            return (
              <div 
                key={c.id}
                style={{
                  background: cardBg,
                  border: cardBorder,
                  borderRadius: '8px',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  boxShadow: isLightMode ? '0 1px 3px rgba(0,0,0,0.05)' : 'none'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: textPrimary }}>
                        {c.customer_name}
                      </h3>
                      <div style={{ fontSize: '0.775rem', color: textMuted, marginTop: '0.15rem' }}>
                        Tel: {c.customer_phone || 'N/A'}
                      </div>
                    </div>
                    <StatusBadge status={c.status} />
                  </div>

                  <div style={{ background: subCardBg, padding: '0.75rem', borderRadius: '6px', border: isLightMode ? '1px solid #E2E8F0' : '1px solid rgba(255,255,255,0.05)', marginBottom: '0.85rem', fontSize: '0.8rem' }}>
                    <div style={{ fontWeight: 600, color: isLightMode ? '#047857' : '#34D399', marginBottom: '0.25rem' }}>
                      Maklumat Simptom &amp; Temujanji:
                    </div>
                    <div style={{ color: textSecondary, lineHeight: 1.6, fontSize: '0.8rem' }}>
                      {c.problem_description && c.problem_description !== 'Tiada penerangan simptom'
                        ? c.problem_description
                        : 'Tiada simptom dinyatakan.'}
                    </div>
                  </div>
                </div>

                {/* Actions Bar */}
                <div style={{ borderTop: isLightMode ? '1px solid #E2E8F0' : '1px solid rgba(255,255,255,0.06)', paddingTop: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                  
                  {/* WhatsApp Direct Action */}
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      background: '#25D366',
                      color: '#FFFFFF',
                      padding: '0.45rem 1rem',
                      borderRadius: '50px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                      boxShadow: '0 2px 10px rgba(37,211,102,0.4)',
                      transition: 'all 0.2s ease',
                      letterSpacing: '0.01em'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.background = '#1ebe5d'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(37,211,102,0.55)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.background = '#25D366'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(37,211,102,0.4)'; }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp
                  </a>

                  {/* Status Change Selector */}
                  <select
                    value={c.status}
                    onChange={(e) => updateCaseStatus(c.id, e.target.value)}
                    style={{
                      padding: '0.35rem 0.55rem',
                      borderRadius: '6px',
                      border: isLightMode ? '1px solid #CBD5E1' : '1px solid rgba(255,255,255,0.12)',
                      background: subCardBg,
                      color: textPrimary,
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      outline: 'none'
                    }}
                  >
                    <option value="Sedang Diurus">Sedang Diurus</option>
                    <option value="Perlu Follow-up">Perlu Follow-up</option>
                    <option value="Rawatan Selesai">Rawatan Selesai</option>
                    <option value="Tidak Dapat Dihubungi">Tidak Dapat Dihubungi</option>
                  </select>

                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
