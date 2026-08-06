'use client';

import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/components/ui/Toast';

const PERIODS = [
  { id: 'today', label: 'Hari Ini' },
  { id: 'week', label: 'Minggu Ini' },
  { id: 'month', label: 'Bulan Ini' },
  { id: 'all', label: 'Keseluruhan' },
];

function fmt(num, dec = 2) {
  return parseFloat(num || 0).toFixed(dec);
}

function getTodayMY() {
  const now = new Date();
  const myNow = new Date(now.getTime() + 8 * 60 * 60 * 1000);
  return myNow.toISOString().split('T')[0];
}

export default function AdsSpendPage() {
  const { showToast } = useToast();
  const [period, setPeriod] = useState('today');
  const [data, setData] = useState({ records: [], summary: { total_spent: 0, total_leads: 0, avg_cost_per_lead: 0 } });
  const [loading, setLoading] = useState(true);
  const [expandedRow, setExpandedRow] = useState(null);

  // Form state
  const [formDate, setFormDate] = useState(getTodayMY());
  const [formAmount, setFormAmount] = useState('');
  const [formNotes, setFormNotes] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Theme
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

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/ads-spend?period=${period}`);
      const json = await res.json();
      if (json.success) setData(json.data);
      else throw new Error(json.error);
    } catch (err) {
      showToast(err.message || 'Gagal memuatkan data iklan', 'error');
    } finally {
      setLoading(false);
    }
  }, [period]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleEdit = (record) => {
    setEditingId(record.id);
    setFormDate(record.spend_date);
    setFormAmount(String(record.amount));
    setFormNotes(record.notes || '');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormDate(getTodayMY());
    setFormAmount('');
    setFormNotes('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formAmount || isNaN(parseFloat(formAmount)) || parseFloat(formAmount) < 0) {
      showToast('Sila masukkan jumlah yang sah', 'error');
      return;
    }
    setSubmitting(true);
    try {
      const isEdit = !!editingId;
      const res = await fetch('/api/admin/ads-spend', {
        method: isEdit ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(isEdit
          ? { id: editingId, amount: parseFloat(formAmount), notes: formNotes }
          : { spend_date: formDate, amount: parseFloat(formAmount), notes: formNotes }
        ),
      });
      const json = await res.json();
      if (json.success) {
        showToast(isEdit ? 'Rekod berjaya dikemaskini!' : 'Perbelanjaan iklan berjaya disimpan!', 'success');
        handleCancelEdit();
        fetchData();
      } else {
        throw new Error(json.error);
      }
    } catch (err) {
      showToast(err.message || 'Ralat semasa menyimpan', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // Styles
  const cardBg = isLightMode ? '#FFFFFF' : '#10131A';
  const subCardBg = isLightMode ? '#F8FAFC' : '#090A0F';
  const cardBorder = isLightMode ? '1px solid #E2E8F0' : '1px solid rgba(255,255,255,0.08)';
  const textPrimary = isLightMode ? '#0F172A' : '#F9FAFB';
  const textSecondary = isLightMode ? '#475569' : '#9CA3AF';
  const textMuted = isLightMode ? '#64748B' : '#6B7280';
  const inputBg = isLightMode ? '#F8FAFC' : '#0D1017';
  const inputBorder = isLightMode ? '1px solid #CBD5E1' : '1px solid rgba(255,255,255,0.12)';

  const { summary, records } = data;

  return (
    <div style={{ fontFamily: 'var(--font-inter), -apple-system, sans-serif', color: textPrimary, padding: '0.25rem 0' }}>

      {/* Header */}
      <div style={{ padding: '1.25rem 1.5rem', borderRadius: '8px', marginBottom: '1.5rem', background: cardBg, border: cardBorder, boxShadow: isLightMode ? '0 1px 3px rgba(0,0,0,0.05)' : 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' }}>
          <span style={{ fontSize: '1.2rem' }}>📊</span>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: isLightMode ? '#047857' : '#34D399', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            ANALITIK KOS IKLAN
          </span>
        </div>
        <h1 style={{ fontSize: '1.45rem', fontWeight: 700, margin: '0 0 0.2rem', letterSpacing: '-0.02em' }}>
          Perbelanjaan Iklan & Kos Per Lead
        </h1>
        <p style={{ margin: 0, fontSize: '0.85rem', color: textSecondary }}>
          Masukkan perbelanjaan iklan harian dan sistem akan mengira kos per lead secara automatik mengikut agihan perawat.
        </p>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        {[
          { label: 'Jumlah Spent', value: `RM ${fmt(summary.total_spent)}`, icon: '💰', color: '#F59E0B', desc: 'Perbelanjaan iklan' },
          { label: 'Jumlah Lead Baharu', value: summary.total_leads, icon: '👥', color: '#10B981', desc: 'Pelanggan baharu' },
          { label: 'Purata Kos / Lead', value: `RM ${fmt(summary.avg_cost_per_lead)}`, icon: '📉', color: '#8B5CF6', desc: 'Kos per lead purata' },
        ].map((card, i) => (
          <div key={i} style={{ padding: '1.25rem', borderRadius: '8px', background: cardBg, border: cardBorder, boxShadow: isLightMode ? '0 1px 3px rgba(0,0,0,0.05)' : 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '1.1rem' }}>{card.icon}</span>
              <span style={{ fontSize: '0.7rem', color: textMuted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{card.label}</span>
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: card.color, letterSpacing: '-0.03em', lineHeight: 1 }}>{card.value}</div>
            <div style={{ fontSize: '0.72rem', color: textMuted, marginTop: '0.3rem' }}>{card.desc}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1.25rem', alignItems: 'start' }}>

        {/* Main Table Section */}
        <div>
          {/* Period Tabs */}
          <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1rem', background: subCardBg, padding: '0.3rem', borderRadius: '8px', border: cardBorder, width: 'fit-content' }}>
            {PERIODS.map(p => (
              <button
                key={p.id}
                onClick={() => setPeriod(p.id)}
                style={{
                  padding: '0.4rem 1rem',
                  borderRadius: '6px',
                  border: 'none',
                  background: period === p.id ? (isLightMode ? '#10B981' : '#065F46') : 'transparent',
                  color: period === p.id ? '#FFFFFF' : textMuted,
                  fontWeight: period === p.id ? 700 : 500,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Records Table */}
          <div style={{ background: cardBg, borderRadius: '8px', border: cardBorder, overflow: 'hidden', boxShadow: isLightMode ? '0 1px 3px rgba(0,0,0,0.05)' : 'none' }}>
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '3rem', flexDirection: 'column', gap: '0.75rem' }}>
                <div className="spinner" style={{ width: '28px', height: '28px', borderColor: 'rgba(16,185,129,0.2)', borderTopColor: '#10B981' }} />
                <span style={{ color: textSecondary, fontSize: '0.82rem' }}>Memuatkan data...</span>
              </div>
            ) : records.length === 0 ? (
              <div style={{ padding: '3rem', textAlign: 'center', color: textMuted, fontSize: '0.85rem' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📭</div>
                Tiada rekod perbelanjaan iklan untuk tempoh ini.
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ borderBottom: isLightMode ? '1px solid #E2E8F0' : '1px solid rgba(255,255,255,0.08)' }}>
                    {['Tarikh', 'Spent (RM)', 'Lead Baharu', 'Kos / Lead', 'Breakdown Perawat', ''].map((h, i) => (
                      <th key={i} style={{ padding: '0.75rem 1rem', color: textSecondary, fontWeight: 700, fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: i >= 1 && i <= 3 ? 'center' : 'left' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {records.map((rec) => (
                    <>
                      <tr
                        key={rec.id}
                        style={{ borderBottom: isLightMode ? '1px solid #F1F5F9' : '1px solid rgba(255,255,255,0.04)', cursor: 'pointer' }}
                        onClick={() => setExpandedRow(expandedRow === rec.id ? null : rec.id)}
                      >
                        {/* Tarikh */}
                        <td style={{ padding: '0.85rem 1rem' }}>
                          <div style={{ fontWeight: 700, color: textPrimary }}>
                            {new Date(rec.spend_date + 'T00:00:00').toLocaleDateString('ms-MY', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </div>
                          {rec.notes && <div style={{ fontSize: '0.7rem', color: textMuted, marginTop: '0.15rem' }}>{rec.notes}</div>}
                        </td>
                        {/* Spent */}
                        <td style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>
                          <span style={{ fontWeight: 800, color: '#F59E0B', fontSize: '0.9rem' }}>RM {fmt(rec.amount)}</span>
                        </td>
                        {/* Total Leads */}
                        <td style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>
                          <span style={{ fontWeight: 700, color: '#10B981', fontSize: '0.9rem' }}>{rec.total_leads}</span>
                        </td>
                        {/* Kos per lead */}
                        <td style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>
                          {rec.total_leads > 0
                            ? <span style={{ fontWeight: 700, color: '#8B5CF6', fontSize: '0.88rem' }}>RM {fmt(rec.cost_per_lead)}</span>
                            : <span style={{ color: textMuted, fontSize: '0.78rem' }}>–</span>}
                        </td>
                        {/* Breakdown preview */}
                        <td style={{ padding: '0.85rem 1rem' }}>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                            {rec.breakdown.slice(0, 3).map(b => (
                              <span key={b.practitioner_id} style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem', borderRadius: '4px', background: isLightMode ? '#ECFDF5' : 'rgba(16,185,129,0.1)', border: isLightMode ? '1px solid #A7F3D0' : '1px solid rgba(16,185,129,0.25)', color: isLightMode ? '#047857' : '#34D399', fontWeight: 600 }}>
                                {b.practitioner_name}: <strong>RM {fmt(b.cost)}</strong>
                              </span>
                            ))}
                            {rec.breakdown.length > 3 && (
                              <span style={{ fontSize: '0.68rem', color: textMuted }}>+{rec.breakdown.length - 3} lagi</span>
                            )}
                          </div>
                        </td>
                        {/* Actions */}
                        <td style={{ padding: '0.85rem 1rem' }}>
                          <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleEdit(rec); }}
                              style={{ padding: '0.3rem 0.65rem', borderRadius: '5px', background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.3)', color: '#60A5FA', fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer' }}
                            >
                              Edit
                            </button>
                            <span style={{ color: textMuted, fontSize: '0.7rem' }}>
                              {expandedRow === rec.id ? '▲' : '▼'}
                            </span>
                          </div>
                        </td>
                      </tr>

                      {/* Expanded breakdown row */}
                      {expandedRow === rec.id && (
                        <tr key={`${rec.id}-expand`} style={{ background: isLightMode ? '#F8FAFC' : 'rgba(16,185,129,0.03)' }}>
                          <td colSpan={6} style={{ padding: '1rem 1.25rem' }}>
                            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: isLightMode ? '#047857' : '#34D399', marginBottom: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                              Breakdown Kos Per Perawat — {new Date(rec.spend_date + 'T00:00:00').toLocaleDateString('ms-MY', { day: '2-digit', month: 'long', year: 'numeric' })}
                            </div>
                            {rec.breakdown.length === 0 ? (
                              <p style={{ color: textMuted, fontSize: '0.8rem', margin: 0 }}>Tiada lead pada tarikh ini.</p>
                            ) : (
                              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.6rem' }}>
                                {rec.breakdown.map(b => (
                                  <div key={b.practitioner_id} style={{ padding: '0.75rem', borderRadius: '6px', background: cardBg, border: cardBorder }}>
                                    <div style={{ fontWeight: 700, color: textPrimary, fontSize: '0.82rem', marginBottom: '0.4rem' }}>🌿 {b.practitioner_name}</div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                      <span style={{ fontSize: '0.72rem', color: textMuted }}>{b.leads_count} lead</span>
                                      <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#F59E0B' }}>RM {fmt(b.cost)}</span>
                                    </div>
                                    <div style={{ marginTop: '0.35rem', height: '3px', borderRadius: '2px', background: isLightMode ? '#E2E8F0' : 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                                      <div style={{ height: '100%', borderRadius: '2px', background: '#10B981', width: `${rec.total_leads > 0 ? (b.leads_count / rec.total_leads) * 100 : 0}%`, transition: 'width 0.5s ease' }} />
                                    </div>
                                    <div style={{ fontSize: '0.68rem', color: textMuted, marginTop: '0.25rem' }}>
                                      {rec.total_leads > 0 ? Math.round((b.leads_count / rec.total_leads) * 100) : 0}% daripada jumlah
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Input Form */}
        <div style={{ position: 'sticky', top: '1rem' }}>
          <div style={{ background: cardBg, borderRadius: '8px', border: editingId ? '1px solid rgba(59,130,246,0.4)' : cardBorder, padding: '1.25rem', boxShadow: isLightMode ? '0 1px 3px rgba(0,0,0,0.05)' : 'none' }}>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: textPrimary, marginBottom: '0.25rem' }}>
              {editingId ? '✏️ Kemaskini Rekod' : '➕ Tambah Perbelanjaan'}
            </div>
            <p style={{ fontSize: '0.75rem', color: textMuted, margin: '0 0 1rem' }}>
              {editingId ? 'Ubah jumlah perbelanjaan untuk tarikh yang dipilih.' : 'Masukkan jumlah perbelanjaan iklan untuk hari ini atau mana-mana tarikh.'}
            </p>

            <form onSubmit={handleSubmit}>
              {/* Date */}
              <div style={{ marginBottom: '0.85rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: textSecondary, marginBottom: '0.4rem' }}>Tarikh</label>
                <input
                  type="date"
                  value={formDate}
                  onChange={(e) => setFormDate(e.target.value)}
                  disabled={!!editingId}
                  style={{ width: '100%', padding: '0.55rem 0.75rem', background: editingId ? (isLightMode ? '#F1F5F9' : '#0A0C12') : inputBg, border: inputBorder, borderRadius: '6px', color: textPrimary, fontSize: '0.82rem', outline: 'none', boxSizing: 'border-box', opacity: editingId ? 0.6 : 1 }}
                />
              </div>

              {/* Amount */}
              <div style={{ marginBottom: '0.85rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: textSecondary, marginBottom: '0.4rem' }}>Jumlah Spent (RM)</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', fontWeight: 700, color: '#F59E0B', fontSize: '0.85rem' }}>RM</span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formAmount}
                    onChange={(e) => setFormAmount(e.target.value)}
                    placeholder="0.00"
                    required
                    style={{ width: '100%', padding: '0.55rem 0.75rem 0.55rem 2.5rem', background: inputBg, border: inputBorder, borderRadius: '6px', color: textPrimary, fontSize: '0.9rem', fontWeight: 700, outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              {/* Notes */}
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: textSecondary, marginBottom: '0.4rem' }}>Platform Iklan</label>
                <select
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  style={{ width: '100%', padding: '0.55rem 0.75rem', background: inputBg, border: inputBorder, borderRadius: '6px', color: formNotes ? textPrimary : textMuted, fontSize: '0.82rem', fontWeight: 600, outline: 'none', boxSizing: 'border-box', cursor: 'pointer' }}
                >
                  <option value="">-- Pilih Platform --</option>
                  <option value="Facebook Ads">📘 Facebook Ads</option>
                  <option value="TikTok Ads">🎵 TikTok Ads</option>
                </select>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', background: editingId ? 'rgba(59,130,246,0.85)' : '#10B981', color: '#FFFFFF', fontWeight: 700, fontSize: '0.85rem', border: 'none', cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.7 : 1, transition: 'all 0.15s ease' }}
              >
                {submitting ? 'Menyimpan...' : editingId ? 'Kemaskini Rekod' : 'Simpan Perbelanjaan'}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  style={{ width: '100%', marginTop: '0.5rem', padding: '0.55rem', borderRadius: '6px', background: 'transparent', color: textMuted, fontWeight: 600, fontSize: '0.8rem', border: inputBorder, cursor: 'pointer' }}
                >
                  Batal
                </button>
              )}
            </form>

            {/* Guide */}
            <div style={{ marginTop: '1.25rem', padding: '0.85rem', borderRadius: '6px', background: isLightMode ? '#ECFDF5' : 'rgba(16,185,129,0.06)', border: isLightMode ? '1px solid #A7F3D0' : '1px solid rgba(16,185,129,0.15)' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: isLightMode ? '#047857' : '#34D399', marginBottom: '0.4rem' }}>📌 Cara Pengiraan</div>
              <div style={{ fontSize: '0.7rem', color: textSecondary, lineHeight: 1.6 }}>
                <strong>Kos/Lead</strong> = Spent ÷ Lead Baharu<br/>
                <strong>Kos Perawat</strong> = Lead Perawat × Kos/Lead<br/>
                <em>Hanya lead baharu (bukan pelanggan berulang) dikira.</em>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
