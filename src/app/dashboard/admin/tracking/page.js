'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/Toast';

export default function TrackingSettingsPage() {
  const [settings, setSettings] = useState({
    meta_pixel_id: '',
    meta_access_token: '',
    meta_test_code: '',
    is_active: false
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testingEvent, setTestingEvent] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/tracking');
        if (res.ok) {
          const json = await res.json();
          const d = json.data || {};
          setSettings({
            meta_pixel_id: d.meta_pixel_id || '',
            meta_access_token: d.meta_access_token || '',
            meta_test_code: d.meta_test_event_code || d.meta_test_code || '',
            is_active: !!d.is_active
          });
        }
      } catch (e) {
        showToast('Gagal memuatkan tetapan tracking', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/tracking', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      const json = await res.json();
      if (res.ok && json.success) {
        showToast('Tetapan tracking berjaya disimpan!', 'success');
      } else {
        throw new Error(json.error || 'Gagal menyimpan tetapan');
      }
    } catch (err) {
      showToast(err.message || 'Ralat semasa menyimpan tetapan', 'error');
    } finally {
      setSaving(false);
    }
  };

  const [togglingActive, setTogglingActive] = useState(false);

  const handleToggleActive = async (newValue) => {
    // Optimistically update UI
    setSettings(prev => ({ ...prev, is_active: newValue }));
    setTogglingActive(true);
    try {
      const res = await fetch('/api/tracking', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...settings, is_active: newValue })
      });
      const json = await res.json();
      if (res.ok && json.success) {
        showToast(newValue ? 'Pixel Tracking diaktifkan!' : 'Pixel Tracking dinyahaktifkan.', 'success');
      } else {
        // Revert on failure
        setSettings(prev => ({ ...prev, is_active: !newValue }));
        throw new Error(json.error || 'Gagal menyimpan status');
      }
    } catch (err) {
      setSettings(prev => ({ ...prev, is_active: !newValue }));
      showToast(err.message || 'Ralat semasa menyimpan status', 'error');
    } finally {
      setTogglingActive(false);
    }
  };

  const handleSendTestEvent = async () => {
    setTestingEvent(true);
    try {
      const res = await fetch('/api/tracking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_name: 'TestEvent',
          event_id: `test_${Date.now()}`,
          url: typeof window !== 'undefined' ? window.location.href : '',
          user_data: {}
        })
      });
      const json = await res.json();
      if (res.ok && json.success) {
        showToast('Acara Ujian Meta Pixel/CAPI berjaya dihantar!', 'success');
      } else {
        throw new Error(json.error || 'Ujian sambungan Meta CAPI gagal');
      }
    } catch (err) {
      showToast(err.message || 'Ujian Meta CAPI gagal', 'error');
    } finally {
      setTestingEvent(false);
    }
  };

  return (
    <div style={{ fontFamily: 'var(--font-inter), -apple-system, sans-serif', color: '#F9FAFB', padding: '0.25rem 0', maxWidth: '880px', margin: '0 auto' }}>
      
      {/* Enterprise Header */}
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
              INTEGRASI ANALITIK &amp; PIXEL
            </span>
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, color: '#F9FAFB', letterSpacing: '-0.02em' }}>
            Tetapan Tracking &amp; Meta CAPI
          </h1>
          <p style={{ margin: '0.2rem 0 0', fontSize: '0.85rem', color: '#9CA3AF' }}>
            Uruskan tetapan Meta Pixel, Conversions API (CAPI), dan tracking borang salespage.
          </p>
        </div>

        <div 
          style={{ 
            padding: '0.4rem 0.85rem', 
            borderRadius: '6px', 
            background: settings.is_active ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)', 
            border: settings.is_active ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
            color: settings.is_active ? '#10B981' : '#EF4444',
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase'
          }}
        >
          {settings.is_active ? 'Pixel Aktif' : 'Pixel Dinyahaktifkan'}
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px', flexDirection: 'column', gap: '0.75rem' }}>
          <div className="spinner" style={{ width: '32px', height: '32px', borderColor: 'rgba(16,185,129,0.2)', borderTopColor: '#10B981' }}></div>
          <span style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Memuatkan tetapan tracking...</span>
        </div>
      ) : (
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Meta Pixel & CAPI Card */}
          <div 
            style={{ 
              background: '#10131A', 
              borderRadius: '8px', 
              border: '1px solid rgba(255, 255, 255, 0.08)', 
              padding: '1.75rem' 
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F9FAFB', margin: '0 0 0.2rem 0' }}>
                  Meta Pixel &amp; Conversions API (CAPI)
                </h2>
                <p style={{ fontSize: '0.8rem', color: '#9CA3AF', margin: 0 }}>
                  Menghantar acara Lead dari salespage terus ke Facebook Pixel &amp; CAPI.
                </p>
              </div>

              {/* Custom Switch Toggle */}
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: togglingActive ? 'not-allowed' : 'pointer', opacity: togglingActive ? 0.7 : 1 }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: settings.is_active ? '#34D399' : '#9CA3AF' }}>
                  {togglingActive ? 'Menyimpan...' : (settings.is_active ? 'Aktif' : 'Nyahaktif')}
                </span>
                <input 
                  type="checkbox" 
                  checked={settings.is_active}
                  disabled={togglingActive}
                  onChange={(e) => handleToggleActive(e.target.checked)}
                  style={{ display: 'none' }}
                />
                <div 
                  style={{ 
                    width: '42px', 
                    height: '24px', 
                    background: settings.is_active ? '#064E3B' : '#090A0F', 
                    borderRadius: '999px', 
                    padding: '2px',
                    border: settings.is_active ? '1px solid rgba(16, 185, 129, 0.5)' : '1px solid rgba(255,255,255,0.15)',
                    transition: 'all 0.2s ease',
                    position: 'relative'
                  }}
                >
                  <div 
                    style={{ 
                      width: '18px', 
                      height: '18px', 
                      background: settings.is_active ? '#34D399' : '#9CA3AF', 
                      borderRadius: '50%',
                      transform: settings.is_active ? 'translateX(18px)' : 'translateX(0)',
                      transition: 'transform 0.2s ease'
                    }} 
                  />
                </div>
              </label>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#D1D5DB', marginBottom: '0.4rem' }}>
                  Meta Pixel ID
                </label>
                <input 
                  type="text" 
                  value={settings.meta_pixel_id || ''}
                  onChange={(e) => setSettings({ ...settings, meta_pixel_id: e.target.value })}
                  placeholder="Contoh: 123456789012345"
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.85rem',
                    background: '#090A0F',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '6px',
                    color: '#F9FAFB',
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#D1D5DB', marginBottom: '0.4rem' }}>
                  Conversions API Access Token
                </label>
                <textarea 
                  rows="3"
                  value={settings.meta_access_token || ''}
                  onChange={(e) => setSettings({ ...settings, meta_access_token: e.target.value })}
                  placeholder="EAAB..."
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.85rem',
                    background: '#090A0F',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '6px',
                    color: '#F9FAFB',
                    fontFamily: 'monospace',
                    fontSize: '0.825rem',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#D1D5DB', marginBottom: '0.4rem' }}>
                  Test Event Code (Pilihan / Kod Ujian Event Manager)
                </label>
                <input 
                  type="text" 
                  value={settings.meta_test_code || ''}
                  onChange={(e) => setSettings({ ...settings, meta_test_code: e.target.value })}
                  placeholder="Contoh: TEST12345"
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.85rem',
                    background: '#090A0F',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '6px',
                    color: '#F9FAFB',
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ paddingTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={handleSendTestEvent}
                  disabled={testingEvent}
                  style={{
                    padding: '0.55rem 1.1rem',
                    borderRadius: '6px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#D1D5DB',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: testingEvent ? 'not-allowed' : 'pointer'
                  }}
                >
                  {testingEvent ? 'Hantar Acara Ujian...' : 'Hantar Acara Ujian CAPI'}
                </button>
              </div>
            </div>
          </div>

          {/* TikTok & Google Analytics Placeholder Card */}
          <div 
            style={{ 
              background: '#10131A', 
              borderRadius: '8px', 
              border: '1px solid rgba(255, 255, 255, 0.08)', 
              padding: '1.5rem',
              opacity: 0.6
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#F9FAFB', margin: '0 0 0.2rem 0' }}>
                  Integrasi TikTok Pixel &amp; Google Analytics GA4
                </h3>
                <p style={{ fontSize: '0.775rem', color: '#9CA3AF', margin: 0 }}>
                  Akan datang dalam kemaskini versi akan datang.
                </p>
              </div>
              <span style={{ fontSize: '0.675rem', padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(255,255,255,0.08)', color: '#9CA3AF', fontWeight: 600 }}>
                AKAN DATANG
              </span>
            </div>
          </div>

          {/* Submit Action */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '1rem' }}>
            <button 
              type="submit" 
              disabled={saving}
              style={{
                padding: '0.75rem 2.25rem',
                background: '#064E3B',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '6px',
                color: '#34D399',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: saving ? 'not-allowed' : 'pointer',
                opacity: saving ? 0.7 : 1,
                boxShadow: '0 4px 12px rgba(6, 78, 59, 0.3)'
              }}
            >
              {saving ? 'Menyimpan Tetapan...' : 'Simpan Tetapan Tracking'}
            </button>
          </div>

        </form>
      )}

    </div>
  );
}
