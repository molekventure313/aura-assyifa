'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/Toast';
import StatusBadge from '@/components/dashboard/StatusBadge';
import { CASE_STATUSES } from '@/lib/utils/constants';

export default function AdminCasesPage() {
  const [cases, setCases] = useState([]);
  const [practitioners, setPractitioners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');
  const [deletingId, setDeletingId] = useState(null);
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

  const statusList = Object.values(CASE_STATUSES);

  // Fetch practitioners list for Admin re-assign dropdown
  const fetchPractitioners = async () => {
    try {
      const res = await fetch('/api/admin/users?role=perawat');
      const json = await res.json();
      if (res.ok && json.success) {
        setPractitioners(json.data || []);
      }
    } catch (e) {
      console.error('Fetch practitioners error:', e);
    }
  };

  const fetchCases = async () => {
    try {
      const query = statusFilter !== 'all' ? `?status=${encodeURIComponent(statusFilter)}` : '';
      const res = await fetch(`/api/cases${query}`);
      const json = await res.json();
      if (res.ok && json.success) {
        setCases(Array.isArray(json.data) ? json.data : []);
        setLastUpdated(new Date().toLocaleTimeString('ms-MY'));
      } else {
        throw new Error(json.error || 'Gagal memuatkan senarai kes');
      }
    } catch (err) {
      showToast(err.message || 'Ralat mengambil senarai kes', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPractitioners();
    fetchCases();
    const interval = setInterval(fetchCases, 4000); // Live 4s auto-refresh for real-time monitoring
    return () => clearInterval(interval);
  }, [statusFilter]);

  const handleReassign = async (caseId, newPractitionerId) => {
    try {
      const res = await fetch(`/api/cases/${caseId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reassign', assigned_to: newPractitionerId })
      });
      const json = await res.json();
      if (res.ok && json.success) {
        showToast('Agihan kes berjaya dikemaskini!', 'success');
        fetchCases();
      } else {
        throw new Error(json.error || 'Gagal menukar perawat');
      }
    } catch (err) {
      showToast(err.message || 'Ralat semasa menukar agihan kes', 'error');
    }
  };

  const handleStatusChange = async (caseId, newStatus) => {
    try {
      const res = await fetch(`/api/cases/${caseId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update_status', status: newStatus })
      });
      const json = await res.json();
      if (res.ok && json.success) {
        showToast(`Status kes dikemaskini kepada ${newStatus}`, 'success');
        fetchCases();
      } else {
        throw new Error(json.error || 'Gagal mengemaskini status');
      }
    } catch (err) {
      showToast(err.message || 'Ralat semasa mengemaskini status', 'error');
    }
  };

  const handleDeleteCase = async (caseId, customerName) => {
    const confirmed = window.confirm(
      `Anda pasti mahu memadam kes pesakit "${customerName}"?\n\nTindakan ini tidak boleh diundur. Kes akan dipadam secara kekal termasuk dari paparan perawat.`
    );
    if (!confirmed) return;

    setDeletingId(caseId);
    try {
      const res = await fetch(`/api/cases/${caseId}`, { method: 'DELETE' });
      const json = await res.json();
      if (res.ok && json.success) {
        showToast('Kes berjaya dipadam.', 'success');
        fetchCases();
      } else {
        throw new Error(json.error || 'Gagal memadam kes');
      }
    } catch (err) {
      showToast(err.message || 'Ralat semasa memadam kes', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('ms-MY', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatTime = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleTimeString('ms-MY', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  const filteredCases = (Array.isArray(cases) ? cases : []).filter(c => {
    const custName = (c.customer_name || c.customers?.full_name || '').toLowerCase();
    const phone = (c.customer_phone || c.customers?.phone || '').toLowerCase();
    const practitioner = (c.practitioner_name || c.practitioner?.full_name || '').toLowerCase();
    const term = (searchTerm || '').toLowerCase().trim();
    return custName.includes(term) || phone.includes(term) || practitioner.includes(term);
  });

  const cardBg = isLightMode ? '#FFFFFF' : '#10131A';
  const subCardBg = isLightMode ? '#F8FAFC' : '#090A0F';
  const cardBorder = isLightMode ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)';
  const textPrimary = isLightMode ? '#0F172A' : '#F9FAFB';
  const textSecondary = isLightMode ? '#475569' : '#9CA3AF';
  const textMuted = isLightMode ? '#64748B' : '#6B7280';

  return (
    <div style={{ fontFamily: 'var(--font-inter), -apple-system, sans-serif', color: textPrimary, padding: '0.25rem 0' }}>
      
      {/* Header with Live Real-time Indicator */}
      <div 
        style={{ 
          padding: '1.25rem 1.5rem', 
          borderRadius: '8px', 
          marginBottom: '1.75rem',
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
            <span style={{ fontSize: '0.725rem', fontWeight: 700, color: isLightMode ? '#047857' : '#34D399', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              PEMANTAUAN MASA NYATA (LIVE ROTATION MONITORING)
            </span>
          </div>
          
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, color: textPrimary, letterSpacing: '-0.02em' }}>
            Pengurusan Semua Kes &amp; Agihan Perawat
          </h1>
          <p style={{ margin: '0.2rem 0 0', fontSize: '0.85rem', color: textSecondary }}>
            Senarai permohonan masuk dari salespage yang diagihkan secara automatik (round-robin) kepada perawat aktif.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ fontSize: '0.75rem', color: textMuted, background: subCardBg, padding: '0.4rem 0.85rem', borderRadius: '6px', border: isLightMode ? '1px solid #CBD5E1' : '1px solid rgba(255,255,255,0.08)' }}>
            Dikemaskini: <strong style={{ color: isLightMode ? '#047857' : '#34D399' }}>{lastUpdated || 'Baru sahaja'}</strong>
          </div>
          <div style={{ fontSize: '0.8rem', color: textPrimary, fontWeight: 700, background: subCardBg, padding: '0.4rem 0.85rem', borderRadius: '6px', border: isLightMode ? '1px solid #CBD5E1' : '1px solid rgba(255,255,255,0.08)' }}>
            {filteredCases.length} Kes
          </div>
        </div>
      </div>

      {/* Filter & Search Controls */}
      <div 
        style={{ 
          padding: '1rem', 
          borderRadius: '8px', 
          marginBottom: '1.5rem',
          background: cardBg,
          border: cardBorder,
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          alignItems: 'center',
          boxShadow: isLightMode ? '0 1px 3px rgba(0,0,0,0.05)' : 'none'
        }}
      >
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: '0.65rem 0.85rem',
            background: subCardBg,
            border: isLightMode ? '1px solid #CBD5E1' : '1px solid rgba(255,255,255,0.12)',
            borderRadius: '6px',
            color: textPrimary,
            fontSize: '0.85rem',
            minWidth: '180px',
            outline: 'none',
            fontWeight: 600
          }}
        >
          <option value="all">Semua Status Kes</option>
          {statusList.map(s => (
            <option key={s.id} value={s.id}>{s.label}</option>
          ))}
        </select>

        <input 
          type="text" 
          placeholder="Cari nama pesakit, nombor telefon, atau nama perawat..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            minWidth: '220px',
            padding: '0.65rem 0.85rem',
            background: subCardBg,
            border: isLightMode ? '1px solid #CBD5E1' : '1px solid rgba(255,255,255,0.12)',
            borderRadius: '6px',
            color: textPrimary,
            fontSize: '0.85rem',
            outline: 'none',
            fontWeight: 500
          }}
        />
      </div>

      {/* Cases Live Table */}
      <div style={{ background: cardBg, borderRadius: '8px', border: cardBorder, padding: '1.25rem', overflowX: 'auto', boxShadow: isLightMode ? '0 1px 3px rgba(0,0,0,0.05)' : 'none' }}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '3rem 0', flexDirection: 'column', gap: '0.75rem' }}>
            <div className="spinner" style={{ width: '32px', height: '32px', borderColor: 'rgba(16,185,129,0.2)', borderTopColor: '#10B981' }}></div>
            <span style={{ color: textSecondary, fontSize: '0.85rem' }}>Memuatkan senarai kes masa nyata...</span>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: isLightMode ? '1px solid #E2E8F0' : '1px solid rgba(255,255,255,0.08)' }}>
                <th style={{ padding: '0.7rem 0.5rem', color: textSecondary, fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase' }}>Nama Pesakit &amp; Simptom</th>
                <th style={{ padding: '0.7rem 0.5rem', color: textSecondary, fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase' }}>Telefon &amp; Negeri</th>
                <th style={{ padding: '0.7rem 0.5rem', color: textSecondary, fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase' }}>Status Rawatan</th>
                <th style={{ padding: '0.7rem 0.5rem', color: textSecondary, fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase' }}>Perawat Ditugaskan (Auto / Tukar)</th>
                <th style={{ padding: '0.7rem 0.5rem', color: textSecondary, fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase' }}>Tindakan</th>
                <th style={{ padding: '0.7rem 0.5rem', color: textSecondary, fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase', textAlign: 'right' }}>Masa Permohonan</th>
              </tr>
            </thead>
            <tbody>
              {filteredCases.map(c => {
                const customerName = c.customer_name || 'Pesakit';
                const phone = c.customer_phone || 'N/A';
                const state = c.state || 'N/A';
                const practitionerName = c.practitioner_name;
                const assignedToId = c.assigned_to;
                const isAssigned = practitionerName && practitionerName !== 'Belum Diambil' && practitionerName !== 'Unassigned';

                return (
                  <tr key={c.id} style={{ borderBottom: isLightMode ? '1px solid #F1F5F9' : '1px solid rgba(255,255,255,0.04)' }}>
                    {/* Pesakit & Simptom */}
                    <td style={{ padding: '0.85rem 0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ fontWeight: 700, color: textPrimary, fontSize: '0.875rem' }}>{customerName}</span>
                        {c.is_repeat && (
                          <span style={{ fontSize: '0.6rem', padding: '0.1rem 0.35rem', borderRadius: '3px', background: 'rgba(167, 139, 250, 0.15)', color: '#7C3AED', fontWeight: 600, textTransform: 'uppercase' }}>
                            Berulang
                          </span>
                        )}
                      </div>
                      {c.problem_description && (
                        <div style={{ fontSize: '0.75rem', color: textSecondary, marginTop: '0.2rem', maxWidth: '280px', lineHeight: 1.4 }}>
                          {c.problem_description}
                        </div>
                      )}
                    </td>

                    {/* Telefon & Negeri */}
                    <td style={{ padding: '0.85rem 0.5rem' }}>
                      <div style={{ fontWeight: 600, color: textPrimary }}>{phone}</div>
                      <div style={{ fontSize: '0.725rem', color: textMuted }}>Negeri: {state}</div>
                    </td>

                    {/* Status Rawatan Dropdown / Badge */}
                    <td style={{ padding: '0.85rem 0.5rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', alignItems: 'flex-start' }}>
                        <StatusBadge status={c.status} />
                        <select
                          value={c.status}
                          onChange={(e) => handleStatusChange(c.id, e.target.value)}
                          style={{
                            padding: '0.25rem 0.45rem',
                            borderRadius: '4px',
                            border: isLightMode ? '1px solid #CBD5E1' : '1px solid rgba(255,255,255,0.12)',
                            background: subCardBg,
                            color: textSecondary,
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            outline: 'none'
                          }}
                        >
                          <option value="Sedang Diurus">Sedang Diurus</option>
                          <option value="Perlu Follow-up">Perlu Follow-up</option>
                          <option value="Telah Dibayar">Telah Dibayar</option>
                          <option value="Rawatan Selesai">Rawatan Selesai</option>
                          <option value="Tidak Dapat Dihubungi">Tidak Dapat Dihubungi</option>
                        </select>
                      </div>
                    </td>

                    {/* Perawat Ditugaskan (Live Round-Robin Badge & Admin Reassign Selector) */}
                    <td style={{ padding: '0.85rem 0.5rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', alignItems: 'flex-start' }}>
                        {isAssigned ? (
                          <div 
                            style={{ 
                              padding: '0.3rem 0.6rem', 
                              borderRadius: '4px', 
                              background: isLightMode ? '#ECFDF5' : '#064E3B', 
                              border: isLightMode ? '1px solid #A7F3D0' : '1px solid rgba(16, 185, 129, 0.3)', 
                              color: isLightMode ? '#047857' : '#34D399', 
                              fontWeight: 700, 
                              fontSize: '0.8rem',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.35rem'
                            }}
                          >
                            <span>🌿</span>
                            <span>{practitionerName}</span>
                          </div>
                        ) : (
                          <span style={{ color: '#EF4444', fontSize: '0.725rem', fontWeight: 600, background: 'rgba(239, 68, 68, 0.12)', padding: '0.2rem 0.55rem', borderRadius: '4px', border: '1px solid rgba(239, 68, 68, 0.3)', textTransform: 'uppercase' }}>
                            Belum Diagih
                          </span>
                        )}

                        {/* Admin Transfer / Reassign Dropdown */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.15rem' }}>
                          <span style={{ fontSize: '0.675rem', color: textMuted }}>Tukar:</span>
                          <select
                            value={assignedToId || ''}
                            onChange={(e) => handleReassign(c.id, e.target.value)}
                            style={{
                              padding: '0.25rem 0.45rem',
                              borderRadius: '4px',
                              border: isLightMode ? '1px solid #CBD5E1' : '1px solid rgba(255,255,255,0.12)',
                              background: subCardBg,
                              color: textPrimary,
                              fontSize: '0.725rem',
                              fontWeight: 600,
                              outline: 'none'
                            }}
                          >
                            <option value="" disabled>Pilih Perawat...</option>
                            {practitioners.map(p => (
                              <option key={p.id} value={p.id}>
                                {p.name || p.full_name} ({p.active_cases || 0} kes)
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </td>

                    {/* Tindakan - WhatsApp + Delete Buttons */}
                    <td style={{ padding: '0.85rem 0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {phone && phone !== 'N/A' && (
                          <a
                            href={`https://wa.me/${phone.replace(/[^0-9]/g, '').replace(/^0/, '60')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={`WhatsApp ${customerName}`}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.4rem',
                              padding: '0.4rem 0.75rem',
                              borderRadius: '6px',
                              background: '#25D366',
                              color: '#FFFFFF',
                              fontWeight: 700,
                              fontSize: '0.75rem',
                              textDecoration: 'none',
                              whiteSpace: 'nowrap',
                              boxShadow: '0 2px 8px rgba(37,211,102,0.35)',
                              transition: 'opacity 0.15s ease'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.opacity = '0.85'}
                            onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                            </svg>
                            WhatsApp
                          </a>
                        )}

                        {/* Delete Button — Admin Only */}
                        <button
                          onClick={() => handleDeleteCase(c.id, customerName)}
                          disabled={deletingId === c.id}
                          title="Padam kes ini"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '0.4rem',
                            borderRadius: '6px',
                            background: deletingId === c.id ? 'rgba(239,68,68,0.08)' : 'rgba(239,68,68,0.12)',
                            border: '1px solid rgba(239,68,68,0.35)',
                            color: '#EF4444',
                            cursor: deletingId === c.id ? 'not-allowed' : 'pointer',
                            transition: 'all 0.15s ease',
                            opacity: deletingId === c.id ? 0.5 : 1,
                          }}
                          onMouseOver={(e) => { if (deletingId !== c.id) { e.currentTarget.style.background = 'rgba(239,68,68,0.22)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.6)'; }}}
                          onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(239,68,68,0.12)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.35)'; }}
                        >
                          {deletingId === c.id ? (
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}>
                              <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                            </svg>
                          ) : (
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3,6 5,6 21,6"/>
                              <path d="M19,6l-1,14a2,2,0,0,1-2,2H8a2,2,0,0,1-2-2L5,6"/>
                              <path d="M10,11v6"/>
                              <path d="M14,11v6"/>
                              <path d="M9,6V4a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1V6"/>
                            </svg>
                          )}
                        </button>
                      </div>
                    </td>

                    {/* Masa Permohonan */}
                    <td style={{ padding: '0.85rem 0.5rem', textAlign: 'right', color: textMuted, fontSize: '0.775rem' }}>
                      <div style={{ fontWeight: 600, color: textPrimary }}>{formatDate(c.created_at)}</div>
                      <div style={{ fontSize: '0.675rem', opacity: 0.85 }}>{formatTime(c.created_at)}</div>
                    </td>
                  </tr>
                );
              })}

              {filteredCases.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ padding: '3rem 0', textAlign: 'center', color: textMuted, fontSize: '0.85rem' }}>
                    Tiada kes ditemui mengikut kriteria carian anda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}
