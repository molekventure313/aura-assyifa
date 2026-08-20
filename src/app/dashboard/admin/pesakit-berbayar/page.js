'use client';

import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/components/ui/Toast';

const PAYMENT_STATUS_LABELS = {
  completed: { label: 'Bayaran Lengkap', color: '#10B981', bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.3)', icon: '✅' },
  pending:   { label: 'Menunggu Bayaran', color: '#F59E0B', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.3)', icon: '⏳' },
  failed:    { label: 'Bayaran Gagal', color: '#EF4444', bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.3)', icon: '❌' },
};

const CASE_STATUS_OPTIONS = [
  'Sedang Diurus', 'Perlu Follow-up', 'Berjaya Dihubungi',
  'Tidak Dapat Dihubungi', 'Rawatan Selesai', 'Pelanggan Batal',
];

export default function PesakitBerbayarPage() {
  const [payments, setPayments] = useState([]);
  const [practitioners, setPractitioners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');
  const [stats, setStats] = useState({ total_completed: 0, total_pending: 0, total_failed: 0, total_revenue_rm: 0 });
  const [deletingId, setDeletingId] = useState(null);
  const { showToast } = useToast();

  const [isLightMode, setIsLightMode] = useState(false);
  useEffect(() => {
    const checkTheme = () => {
      const isLight = document.body.classList.contains('light-mode') ||
        document.documentElement.getAttribute('data-theme') === 'light';
      setIsLightMode(isLight);
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const cardBg = isLightMode ? '#FFFFFF' : '#10131A';
  const subCardBg = isLightMode ? '#F8FAFC' : '#090A0F';
  const cardBorder = isLightMode ? '1px solid #E2E8F0' : '1px solid rgba(255,255,255,0.08)';
  const textPrimary = isLightMode ? '#0F172A' : '#F9FAFB';
  const textSecondary = isLightMode ? '#475569' : '#9CA3AF';
  const textMuted = isLightMode ? '#64748B' : '#6B7280';

  const fetchPractitioners = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/users?role=perawat');
      const json = await res.json();
      if (res.ok && json.success) setPractitioners(json.data || []);
    } catch (e) { console.error(e); }
  }, []);

  const fetchPayments = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (paymentStatusFilter !== 'all') params.set('payment_status', paymentStatusFilter);
      if (searchTerm.trim()) params.set('search', searchTerm.trim());
      const res = await fetch(`/api/payments/list?${params.toString()}`);
      const json = await res.json();
      if (res.ok && json.success) {
        setPayments(json.data || []);
        setStats(json.stats || { total_completed: 0, total_pending: 0, total_failed: 0, total_revenue_rm: 0 });
        setLastUpdated(new Date().toLocaleTimeString('ms-MY'));
      }
    } catch (err) {
      showToast('Ralat memuatkan senarai pesakit berbayar', 'error');
    } finally {
      setLoading(false);
    }
  }, [paymentStatusFilter, searchTerm]);

  useEffect(() => {
    fetchPractitioners();
    fetchPayments();
    const interval = setInterval(fetchPayments, 10000);
    return () => clearInterval(interval);
  }, [fetchPayments]);

  const handleReassign = async (caseId, newPractitionerId) => {
    if (!caseId) return showToast('Kes belum wujud. Bayaran mungkin belum disahkan.', 'warning');
    try {
      const res = await fetch(`/api/cases/${caseId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reassign', assigned_to: newPractitionerId }),
      });
      const json = await res.json();
      if (res.ok && json.success) { showToast('Agihan perawat berjaya!', 'success'); fetchPayments(); }
      else throw new Error(json.error || 'Gagal');
    } catch (err) { showToast(err.message, 'error'); }
  };

  const handleStatusChange = async (caseId, newStatus) => {
    if (!caseId) return showToast('Kes belum wujud. Bayaran mungkin belum disahkan.', 'warning');
    try {
      const res = await fetch(`/api/cases/${caseId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update_status', status: newStatus }),
      });
      const json = await res.json();
      if (res.ok && json.success) { showToast(`Status dikemaskini: ${newStatus}`, 'success'); fetchPayments(); }
      else throw new Error(json.error || 'Gagal');
    } catch (err) { showToast(err.message, 'error'); }
  };

  const formatDate = (d) => d ? new Date(d).toLocaleDateString('ms-MY', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';
  const formatTime = (d) => d ? new Date(d).toLocaleTimeString('ms-MY', { hour: '2-digit', minute: '2-digit', hour12: false }) : '';

  const filteredPayments = payments.filter(p => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase().trim();
    return (p.full_name || '').toLowerCase().includes(term) || (p.phone || '').toLowerCase().includes(term);
  });

  const PaymentBadge = ({ status }) => {
    const s = PAYMENT_STATUS_LABELS[status] || PAYMENT_STATUS_LABELS.pending;
    return (
      <span style={{ fontSize: '0.7rem', padding: '0.25rem 0.6rem', borderRadius: '12px', background: s.bg, border: `1px solid ${s.border}`, color: s.color, fontWeight: 700, whiteSpace: 'nowrap' }}>
        {s.icon} {s.label}
      </span>
    );
  };

  return (
    <div style={{ fontFamily: 'var(--font-inter), -apple-system, sans-serif', color: textPrimary, padding: '0.25rem 0' }}>

      {/* ─── Header ─── */}
      <div style={{ padding: '1.25rem 1.5rem', borderRadius: '8px', marginBottom: '1.5rem', background: cardBg, border: cardBorder, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', boxShadow: isLightMode ? '0 1px 3px rgba(0,0,0,0.05)' : 'none' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
            <span style={{ fontSize: '0.725rem', fontWeight: 700, color: isLightMode ? '#1D4ED8' : '#60A5FA', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              💳 PESAKIT BERBAYAR FPX
            </span>
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, color: textPrimary, letterSpacing: '-0.02em' }}>
            Senarai Pesakit Berbayar
          </h1>
          <p style={{ margin: '0.2rem 0 0', fontSize: '0.85rem', color: textSecondary }}>
            Pesakit yang telah membuat pembayaran terus melalui FPX (Chip Payment Gateway)
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ fontSize: '0.75rem', color: textMuted, background: subCardBg, padding: '0.4rem 0.85rem', borderRadius: '6px', border: cardBorder }}>
            Dikemaskini: <strong style={{ color: '#60A5FA' }}>{lastUpdated || 'Baru sahaja'}</strong>
          </div>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, background: subCardBg, padding: '0.4rem 0.85rem', borderRadius: '6px', border: cardBorder }}>
            {filteredPayments.length} rekod
          </div>
        </div>
      </div>

      {/* ─── Stats Cards ─── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {[
          { label: 'Bayaran Lengkap', value: stats.total_completed, color: '#10B981', icon: '✅' },
          { label: 'Kutipan FPX (RM50/pax)', value: `RM ${(stats.total_revenue_rm || 0).toFixed(2)}`, color: '#10B981', icon: '💰' },
          { label: 'Menunggu Bayaran', value: stats.total_pending, color: '#F59E0B', icon: '⏳' },
          { label: 'Bayaran Gagal', value: stats.total_failed, color: '#EF4444', icon: '❌' },
        ].map((stat) => (
          <div key={stat.label} style={{ background: cardBg, border: cardBorder, borderRadius: '8px', padding: '1rem 1.25rem', boxShadow: isLightMode ? '0 1px 3px rgba(0,0,0,0.05)' : 'none' }}>
            <div style={{ fontSize: '1.4rem', marginBottom: '0.35rem' }}>{stat.icon}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: stat.color }}>{stat.value}</div>
            <div style={{ fontSize: '0.75rem', color: textMuted, marginTop: '0.2rem' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* ─── Filters ─── */}
      <div style={{ padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', background: cardBg, border: cardBorder, display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        {/* Tab Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {[
            { value: 'all', label: '📋 Semua' },
            { value: 'completed', label: '✅ Berjaya' },
            { value: 'pending', label: '⏳ Pending' },
            { value: 'failed', label: '❌ Gagal' },
          ].map(tab => (
            <button
              key={tab.value}
              onClick={() => setPaymentStatusFilter(tab.value)}
              style={{
                padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', border: 'none',
                background: paymentStatusFilter === tab.value
                  ? (isLightMode ? '#1D4ED8' : '#3B82F6') : subCardBg,
                color: paymentStatusFilter === tab.value ? '#fff' : textSecondary,
                transition: 'all 0.15s ease',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Cari nama atau nombor telefon..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ flex: 1, minWidth: '200px', padding: '0.6rem 0.85rem', background: subCardBg, border: isLightMode ? '1px solid #CBD5E1' : '1px solid rgba(255,255,255,0.12)', borderRadius: '6px', color: textPrimary, fontSize: '0.85rem', outline: 'none' }}
        />
      </div>

      {/* ─── Table ─── */}
      <div style={{ background: cardBg, borderRadius: '8px', border: cardBorder, padding: '1.25rem', overflowX: 'auto' }}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '3rem 0', flexDirection: 'column', gap: '0.75rem' }}>
            <div className="spinner" style={{ width: '32px', height: '32px', borderColor: 'rgba(59,130,246,0.2)', borderTopColor: '#3B82F6' }} />
            <span style={{ color: textSecondary, fontSize: '0.85rem' }}>Memuatkan senarai pesakit berbayar...</span>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: isLightMode ? '1px solid #E2E8F0' : '1px solid rgba(255,255,255,0.08)' }}>
                {['Pesakit & Simptom', 'Telefon', 'Status Bayaran', 'Status Kes & Perawat', 'Tindakan', 'Tarikh'].map(h => (
                  <th key={h} style={{ padding: '0.7rem 0.5rem', color: textSecondary, fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map(p => {
                const isCompleted = p.payment_status === 'completed';
                const hasCase = !!p.case_id;

                return (
                  <tr key={p.id} style={{ borderBottom: isLightMode ? '1px solid #F1F5F9' : '1px solid rgba(255,255,255,0.04)' }}>
                    
                    {/* Pesakit & Simptom */}
                    <td style={{ padding: '0.85rem 0.5rem' }}>
                      <div style={{ fontWeight: 700, color: textPrimary, fontSize: '0.875rem' }}>{p.full_name}</div>
                      {p.problem && (
                        <div style={{ fontSize: '0.75rem', color: textSecondary, marginTop: '0.2rem', maxWidth: '260px', lineHeight: 1.4 }}>
                          {p.problem.replace(/\[.*?\]/g, '').trim().substring(0, 100)}
                        </div>
                      )}
                      {p.source && (
                        <div style={{ fontSize: '0.65rem', color: textMuted, marginTop: '0.15rem' }}>
                          Dari: <span style={{ fontWeight: 600 }}>{p.source}</span>
                        </div>
                      )}
                    </td>

                    {/* Telefon */}
                    <td style={{ padding: '0.85rem 0.5rem' }}>
                      <div style={{ fontWeight: 600, color: textPrimary }}>{p.phone}</div>
                    </td>

                    {/* Status Bayaran */}
                    <td style={{ padding: '0.85rem 0.5rem' }}>
                      <PaymentBadge status={p.payment_status} />
                      {p.chip_bill_id && (
                        <div style={{ fontSize: '0.625rem', color: textMuted, marginTop: '0.35rem', fontFamily: 'monospace' }}>
                          #{p.chip_bill_id.substring(0, 12)}...
                        </div>
                      )}
                    </td>

                    {/* Status Kes & Agihan Perawat */}
                    <td style={{ padding: '0.85rem 0.5rem', minWidth: '200px' }}>
                      {!isCompleted ? (
                        <span style={{ fontSize: '0.72rem', color: textMuted, fontStyle: 'italic' }}>
                          Kes akan diwujudkan selepas bayaran disahkan
                        </span>
                      ) : !hasCase ? (
                        <span style={{ fontSize: '0.72rem', color: '#F59E0B' }}>
                          ⏳ Kes sedang diproses...
                        </span>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                          {/* Perawat Badge */}
                          {p.practitioner_name ? (
                            <div style={{ padding: '0.3rem 0.6rem', borderRadius: '4px', background: isLightMode ? '#ECFDF5' : '#064E3B', border: isLightMode ? '1px solid #A7F3D0' : '1px solid rgba(16,185,129,0.3)', color: isLightMode ? '#047857' : '#34D399', fontWeight: 700, fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                              🌿 {p.practitioner_name}
                            </div>
                          ) : (
                            <span style={{ color: '#EF4444', fontSize: '0.72rem', fontWeight: 600, background: 'rgba(239,68,68,0.12)', padding: '0.2rem 0.55rem', borderRadius: '4px', border: '1px solid rgba(239,68,68,0.3)' }}>
                              Belum Diagih
                            </span>
                          )}

                          {/* Case Status Dropdown */}
                          <select
                            value={p.case_status || ''}
                            onChange={e => handleStatusChange(p.case_id, e.target.value)}
                            style={{ padding: '0.25rem 0.4rem', borderRadius: '4px', border: isLightMode ? '1px solid #CBD5E1' : '1px solid rgba(255,255,255,0.12)', background: subCardBg, color: textSecondary, fontSize: '0.7rem', fontWeight: 600, outline: 'none', maxWidth: '175px' }}
                          >
                            <option value="" disabled>Tukar status kes...</option>
                            {CASE_STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>

                          {/* Reassign Dropdown */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                            <span style={{ fontSize: '0.65rem', color: textMuted }}>Tukar Perawat:</span>
                            <select
                              value={p.assigned_to || ''}
                              onChange={e => handleReassign(p.case_id, e.target.value)}
                              style={{ padding: '0.25rem 0.4rem', borderRadius: '4px', border: isLightMode ? '1px solid #CBD5E1' : '1px solid rgba(255,255,255,0.12)', background: subCardBg, color: textPrimary, fontSize: '0.7rem', fontWeight: 600, outline: 'none' }}
                            >
                              <option value="" disabled>Pilih...</option>
                              {practitioners.map(pr => (
                                <option key={pr.id} value={pr.id}>{pr.name || pr.full_name}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      )}
                    </td>

                    {/* Tindakan — WhatsApp */}
                    <td style={{ padding: '0.85rem 0.5rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {p.phone && (
                          <a
                            href={`https://wa.me/${p.phone.replace(/[^0-9]/g, '').replace(/^0/, '60')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.75rem', borderRadius: '6px', background: '#25D366', color: '#fff', fontWeight: 700, fontSize: '0.75rem', textDecoration: 'none', whiteSpace: 'nowrap', boxShadow: '0 2px 8px rgba(37,211,102,0.35)' }}
                          >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                            WhatsApp
                          </a>
                        )}
                      </div>
                    </td>

                    {/* Tarikh */}
                    <td style={{ padding: '0.85rem 0.5rem', color: textMuted, fontSize: '0.775rem', textAlign: 'right' }}>
                      <div style={{ fontWeight: 600, color: textPrimary }}>{formatDate(p.created_at)}</div>
                      <div style={{ fontSize: '0.675rem' }}>{formatTime(p.created_at)}</div>
                    </td>
                  </tr>
                );
              })}

              {filteredPayments.length === 0 && !loading && (
                <tr>
                  <td colSpan={6} style={{ padding: '3rem 0', textAlign: 'center', color: textMuted, fontSize: '0.85rem' }}>
                    {paymentStatusFilter === 'all'
                      ? 'Tiada rekod pesakit berbayar lagi. Rekod akan muncul selepas pelanggan membuat pembayaran FPX.'
                      : `Tiada rekod untuk status "${paymentStatusFilter}" pada masa ini.`}
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
