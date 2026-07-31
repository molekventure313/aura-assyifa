'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/Toast';

export default function PractitionersPage() {
  const [practitioners, setPractitioners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    password: '',
    max_active_cases: 10
  });

  const { showToast } = useToast();

  const fetchPractitioners = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/users?role=perawat');
      const result = await res.json();
      if (res.ok && result.data) {
        setPractitioners(Array.isArray(result.data) ? result.data : []);
      } else {
        throw new Error(result.error || 'Gagal memuatkan senarai perawat');
      }
    } catch (err) {
      showToast(err.message || 'Ralat memuatkan perawat', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPractitioners();
  }, []);

  const handleStatusChange = async (practitionerId, newIsActive, pName) => {
    setUpdatingId(practitionerId);
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: practitionerId,
          is_active: newIsActive
        })
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Gagal mengemaskini status perawat');

      showToast(
        newIsActive 
          ? `Akaun perawat ${pName} telah DILULUSKAN!` 
          : `Akaun perawat ${pName} telah DITOLAK / DINYAHAKTIFKAN!`, 
        newIsActive ? 'success' : 'error'
      );
      fetchPractitioners();
    } catch (err) {
      showToast(err.message || 'Ralat mengemaskini status perawat', 'error');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleAddPractitioner = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          role: 'practitioner'
        })
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Gagal menambah perawat');

      showToast('Perawat baharu berjaya ditambah dan diluluskan!', 'success');
      setModalOpen(false);
      setFormData({ full_name: '', email: '', phone: '', password: '', max_active_cases: 10 });
      fetchPractitioners();
    } catch (err) {
      showToast(err.message || 'Ralat menambah perawat', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const pendingCount = practitioners.filter(p => !p.is_active).length;
  const approvedCount = practitioners.filter(p => p.is_active).length;

  return (
    <div style={{ fontFamily: 'var(--font-inter), -apple-system, sans-serif', color: '#F9FAFB', padding: '0.25rem 0' }}>
      
      {/* Page Header */}
      <div 
        style={{ 
          padding: '1.25rem 1.5rem', 
          borderRadius: '8px', 
          marginBottom: '1.75rem',
          background: '#10131A',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
            <span style={{ fontSize: '0.725rem', fontWeight: 600, color: '#34D399', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              PENGESAHAN &amp; PENGURUSAN PERAWAT
            </span>
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, color: '#F9FAFB', letterSpacing: '-0.02em' }}>
            Kelulusan &amp; Senarai Perawat
          </h1>
          <p style={{ margin: '0.2rem 0 0', fontSize: '0.85rem', color: '#9CA3AF' }}>
            Luluskan permohonan pendaftaran perawat baharu, pantau beban kerja, dan tentukan akses sistem.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          style={{
            padding: '0.6rem 1.25rem',
            borderRadius: '6px',
            background: '#064E3B',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            color: '#34D399',
            fontSize: '0.85rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          + Tambah Perawat Baharu
        </button>
      </div>

      {/* Summary Status Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '1.75rem' }}>
        <div style={{ background: '#10131A', padding: '1rem 1.25rem', borderRadius: '8px', border: pendingCount > 0 ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 600, color: pendingCount > 0 ? '#F59E0B' : '#9CA3AF', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>
            Menunggu Kelulusan
          </span>
          <span style={{ fontSize: '1.5rem', fontWeight: 700, color: pendingCount > 0 ? '#F59E0B' : '#F9FAFB' }}>
            {pendingCount} Perawat
          </span>
        </div>

        <div style={{ background: '#10131A', padding: '1rem 1.25rem', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#34D399', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>
            Diluluskan &amp; Aktif
          </span>
          <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#10B981' }}>
            {approvedCount} Perawat
          </span>
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px', flexDirection: 'column', gap: '0.75rem' }}>
          <div className="spinner" style={{ width: '32px', height: '32px', borderColor: 'rgba(16,185,129,0.2)', borderTopColor: '#10B981' }}></div>
          <span style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Memuatkan senarai perawat...</span>
        </div>
      ) : (
        <>
          {practitioners.length === 0 ? (
            <div style={{ padding: '3rem', borderRadius: '8px', background: '#10131A', border: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
              <p style={{ color: '#9CA3AF', margin: 0, fontSize: '0.9rem' }}>
                Tiada perawat berdaftar ditemui. Perawat yang mendaftar melalui portal akan muncul di sini untuk kelulusan Admin.
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.25rem' }}>
              {practitioners.map((p) => {
                const maxCases = p.max_active_cases || 10;
                const activeCount = p.active_cases || 0;
                const completedCount = p.completed_cases || 0;
                const activePct = Math.min(Math.round((activeCount / maxCases) * 100), 100);
                const pName = p.full_name || p.name || 'Perawat';

                return (
                  <div 
                    key={p.id}
                    style={{
                      background: '#10131A',
                      border: p.is_active ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(245, 158, 11, 0.4)',
                      borderRadius: '8px',
                      padding: '1.35rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      position: 'relative'
                    }}
                  >
                    <div>
                      {/* Top Header Card */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.85rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                          <div 
                            style={{ 
                              width: '38px', 
                              height: '38px', 
                              borderRadius: '50%', 
                              background: p.is_active ? '#064E3B' : 'rgba(245, 158, 11, 0.15)', 
                              border: p.is_active ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)',
                              color: p.is_active ? '#34D399' : '#F59E0B', 
                              fontWeight: 700, 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center', 
                              fontSize: '0.85rem' 
                            }}
                          >
                            {pName.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#F9FAFB', margin: 0 }}>
                              {pName}
                            </h3>
                            <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>
                              {p.email}
                            </span>
                          </div>
                        </div>

                        {/* Approval Status Badge */}
                        <span 
                          style={{
                            padding: '0.25rem 0.6rem',
                            borderRadius: '4px',
                            fontSize: '0.675rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                            background: p.is_active ? 'rgba(16, 185, 129, 0.12)' : 'rgba(245, 158, 11, 0.15)',
                            color: p.is_active ? '#10B981' : '#F59E0B',
                            border: p.is_active ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(245, 158, 11, 0.4)'
                          }}
                        >
                          {p.is_active ? 'LULUS (AKTIF)' : 'MENUNGGU KELULUSAN'}
                        </span>
                      </div>

                      {/* Phone & Info */}
                      <div style={{ fontSize: '0.775rem', color: '#6B7280', marginBottom: '1rem' }}>
                        No. Telefon: <span style={{ color: '#D1D5DB' }}>{p.phone || 'Tiada'}</span>
                      </div>

                      {/* Workload Metric Bar */}
                      <div style={{ background: '#090A0F', padding: '0.85rem 1rem', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.06)', marginBottom: '1.15rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.4rem' }}>
                          <span style={{ color: '#9CA3AF', fontWeight: 500 }}>Beban Kes Aktif</span>
                          <span style={{ color: '#F9FAFB', fontWeight: 700 }}>{activeCount} / {maxCases} maks</span>
                        </div>

                        <div style={{ width: '100%', height: '5px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden', marginBottom: '0.65rem' }}>
                          <div 
                            style={{ 
                              width: `${activePct}%`, 
                              height: '100%', 
                              background: activePct >= 80 ? '#EF4444' : activePct >= 50 ? '#F59E0B' : '#10B981',
                              borderRadius: '3px',
                              transition: 'width 0.3s ease'
                            }} 
                          />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.725rem', color: '#6B7280' }}>
                          <span>Kes Selesai: <strong style={{ color: '#10B981' }}>{completedCount}</strong></span>
                          <span>Peranan: <strong style={{ color: '#34D399', textTransform: 'capitalize' }}>Perawat</strong></span>
                        </div>
                      </div>
                    </div>

                    {/* APPROVE & REJECT ACTION BUTTONS */}
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                      {!p.is_active ? (
                        <>
                          <button 
                            disabled={updatingId === p.id}
                            onClick={() => handleStatusChange(p.id, true, pName)}
                            style={{
                              flex: 1,
                              padding: '0.55rem',
                              borderRadius: '6px',
                              background: '#064E3B',
                              border: '1px solid rgba(16, 185, 129, 0.4)',
                              color: '#34D399',
                              fontSize: '0.8rem',
                              fontWeight: 700,
                              cursor: updatingId === p.id ? 'not-allowed' : 'pointer'
                            }}
                          >
                            {updatingId === p.id ? 'Mengemaskini...' : 'Luluskan Akaun'}
                          </button>

                          <button 
                            disabled={updatingId === p.id}
                            onClick={() => handleStatusChange(p.id, false, pName)}
                            style={{
                              padding: '0.55rem 0.85rem',
                              borderRadius: '6px',
                              background: 'rgba(239, 68, 68, 0.1)',
                              border: '1px solid rgba(239, 68, 68, 0.3)',
                              color: '#EF4444',
                              fontSize: '0.8rem',
                              fontWeight: 600,
                              cursor: updatingId === p.id ? 'not-allowed' : 'pointer'
                            }}
                          >
                            Tolak
                          </button>
                        </>
                      ) : (
                        <button 
                          disabled={updatingId === p.id}
                          onClick={() => handleStatusChange(p.id, false, pName)}
                          style={{
                            flex: 1,
                            padding: '0.55rem',
                            borderRadius: '6px',
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            color: '#EF4444',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            cursor: updatingId === p.id ? 'not-allowed' : 'pointer'
                          }}
                        >
                          {updatingId === p.id ? 'Mengemaskini...' : 'Nyahaktif / Sekat Akaun'}
                        </button>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* Add Practitioner Modal */}
      {modalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}>
          <div style={{ maxWidth: '440px', width: '100%', background: '#10131A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#F9FAFB' }}>
                Tambah Perawat Baharu (Terus Lulus)
              </h3>
              <button onClick={() => setModalOpen(false)} style={{ background: 'none', border: 'none', color: '#9CA3AF', fontSize: '1.1rem', cursor: 'pointer' }}>
                ✕
              </button>
            </div>

            <form onSubmit={handleAddPractitioner}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: '#D1D5DB', marginBottom: '0.3rem' }}>
                  Nama Penuh Perawat
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ustaz Ahmad..."
                  value={formData.full_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                  style={{ width: '100%', padding: '0.65rem 0.75rem', background: '#090A0F', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '6px', color: '#F9FAFB', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: '#D1D5DB', marginBottom: '0.3rem' }}>
                  Alamat E-mel
                </label>
                <input
                  type="email"
                  required
                  placeholder="perawat@mvsifaa.com"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  style={{ width: '100%', padding: '0.65rem 0.75rem', background: '#090A0F', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '6px', color: '#F9FAFB', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: '#D1D5DB', marginBottom: '0.3rem' }}>
                  Nombor Telefon
                </label>
                <input
                  type="tel"
                  placeholder="01XXXXXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  style={{ width: '100%', padding: '0.65rem 0.75rem', background: '#090A0F', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '6px', color: '#F9FAFB', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: '#D1D5DB', marginBottom: '0.3rem' }}>
                  Kata Laluan Sementara
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  style={{ width: '100%', padding: '0.65rem 0.75rem', background: '#090A0F', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '6px', color: '#F9FAFB', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: '#D1D5DB', marginBottom: '0.3rem' }}>
                  Kapasiti Kes Aktif Maksimum
                </label>
                <input
                  type="number"
                  defaultValue={10}
                  value={formData.max_active_cases}
                  onChange={(e) => setFormData(prev => ({ ...prev, max_active_cases: parseInt(e.target.value) || 10 }))}
                  style={{ width: '100%', padding: '0.65rem 0.75rem', background: '#090A0F', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '6px', color: '#F9FAFB', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  style={{ flex: 1, padding: '0.65rem', borderRadius: '6px', background: 'transparent', border: '1px solid rgba(255,255,255,0.12)', color: '#9CA3AF', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{ flex: 1, padding: '0.65rem', borderRadius: '6px', background: '#064E3B', border: '1px solid rgba(16,185,129,0.3)', color: '#34D399', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}
                >
                  {isSubmitting ? 'Menyimpan...' : 'Cipta &amp; Luluskan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
