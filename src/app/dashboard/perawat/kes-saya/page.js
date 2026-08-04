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
                      gap: '0.35rem',
                      background: '#059669',
                      color: '#FFFFFF',
                      padding: '0.4rem 0.85rem',
                      borderRadius: '6px',
                      fontSize: '0.775rem',
                      fontWeight: 600,
                      textDecoration: 'none'
                    }}
                  >
                    💬 WhatsApp Pesakit
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
