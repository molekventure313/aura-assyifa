'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const submissionId = searchParams.get('submission_id') || searchParams.get('order_id');
  const isMock = searchParams.get('mock') === 'true';

  const [status, setStatus] = useState(isMock ? 'completed' : 'pending');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(!isMock);
  const [fpxPixelId, setFpxPixelId] = useState(null);

  // Inject FPX pixel script + fetch pixel ID for client-side Purchase backup
  // Mirrors FspChipCheckoutForm pattern — fbq('init', fpxPixelId) MUST be called
  // before fbq('trackSingle') or the event is silently dropped by Meta
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/api/pixel-fpx-init';
    script.async = true;
    document.head.appendChild(script);

    fetch('/api/tracking/fpx-pixel-id')
      .then(r => r.json())
      .then(json => { if (json.fpx_pixel_id) setFpxPixelId(json.fpx_pixel_id); })
      .catch(() => {});

    return () => { try { document.head.removeChild(script); } catch (_) {} };
  }, []);

  // Poll payment status from Chip
  useEffect(() => {
    if (isMock) {
      setData({
        submission_id: submissionId || 'MOCK-12345',
        full_name: 'Pelanggan Ujian',
        phone: '0123456789',
        payment_status: 'completed',
      });
      setLoading(false);
      return;
    }

    if (!submissionId) {
      setLoading(false);
      return;
    }

    let isSubscribed = true;
    let pollCount = 0;
    const maxPolls = 8;

    const checkStatus = async () => {
      try {
        const res = await fetch(`/api/payments/chip/status?submission_id=${submissionId}`);
        const json = await res.json();

        if (isSubscribed && json.success) {
          setData(json);
          setStatus(json.payment_status);

          if (json.payment_status === 'completed') {
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.error('Error checking payment status:', err);
      }

      pollCount++;
      if (pollCount < maxPolls && isSubscribed) {
        setTimeout(checkStatus, 2000);
      } else if (isSubscribed) {
        setLoading(false);
      }
    };

    checkStatus();

    return () => {
      isSubscribed = false;
    };
  }, [submissionId, isMock]);

  // Backup Purchase pixel event when status becomes completed
  // This covers cases where CAPI webhook was delayed or missed
  useEffect(() => {
    if (status !== 'completed' || !fpxPixelId) return;
    try {
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('trackSingle', fpxPixelId, 'Purchase', {
          value: 50.00,
          currency: 'MYR',
          content_name: 'Pakej Rawatan FPX RM50',
        });
      }
    } catch (_) {}
  }, [status, fpxPixelId]);

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto' }}>

      {loading ? (
        <div style={{ background: '#090A0F', border: '1px solid rgba(253,224,71,0.3)', borderRadius: '20px', padding: '3rem 2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FDE047', marginBottom: '0.5rem' }}>
            Mengesahkan Pembayaran FPX Anda...
          </h2>
          <p style={{ color: '#D1FAE5', fontSize: '0.95rem', lineHeight: 1.6 }}>
            Sila tunggu sebentar. Sistem sedang mengesahkan transaksi daripada bank anda.
          </p>
        </div>
      ) : status === 'completed' ? (
        <div style={{
          background: 'linear-gradient(135deg, #064E3B 0%, #042E23 100%)',
          border: '3px solid #22C55E',
          borderRadius: '24px',
          padding: '3rem 2rem',
          boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
          textAlign: 'center'
        }}>
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%',
            background: '#22C55E', color: '#FFFFFF',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2.8rem', margin: '0 auto 1.5rem auto',
            boxShadow: '0 10px 25px rgba(34,197,94,0.4)'
          }}>
            ✓
          </div>

          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#4ADE80', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            TRANSAKSI BERJAYA
          </span>
          <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.3rem)', fontWeight: 900, color: '#FDE047', marginTop: '0.4rem', marginBottom: '0.8rem', lineHeight: 1.25 }}>
            Pembayaran RM50 Diterima!
          </h1>

          <p style={{ fontSize: '1rem', color: '#D1FAE5', lineHeight: 1.7, marginBottom: '2rem' }}>
            Alhamdulillah, borang dan pembayaran anda telah disahkan.
            Perawat kami telah diagihkan dan akan menghubungi anda melalui <strong style={{ color: '#FDE047' }}>WhatsApp</strong> untuk sesi diagnos &amp; rawatan.
          </p>

          {/* Details Card */}
          <div style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(253,224,71,0.25)',
            borderRadius: '16px',
            padding: '1.25rem 1.5rem',
            textAlign: 'left',
            marginBottom: '2rem',
            fontSize: '0.9rem',
            color: '#FEF3C7'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px dashed rgba(255,255,255,0.1)', marginBottom: '0.5rem' }}>
              <span>Nama Pesakit:</span>
              <strong style={{ color: '#FFFFFF' }}>{data?.full_name || 'Terima kasih'}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px dashed rgba(255,255,255,0.1)', marginBottom: '0.5rem' }}>
              <span>Jumlah Bayaran:</span>
              <strong style={{ color: '#4ADE80' }}>RM50.00 (FPX Online Banking)</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Status Pakej:</span>
              <span style={{ background: '#22C55E', color: '#fff', padding: '1px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800 }}>
                AKTIF (5 BONUS DISERTAKAN)
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', alignItems: 'center' }}>
            <Link
              href="/fsp-checkout"
              style={{
                display: 'inline-block',
                padding: '1rem 2.2rem',
                fontSize: '1rem',
                fontWeight: 800,
                color: '#042E23',
                background: 'linear-gradient(180deg, #FDE047 0%, #EAB308 100%)',
                borderRadius: '50px',
                textDecoration: 'none',
                boxShadow: '0 8px 25px rgba(234,179,8,0.4)',
                border: '2px solid #FEF08A'
              }}
            >
              🏠 Kembali Ke Halaman Utama
            </Link>
          </div>
        </div>
      ) : (
        <div style={{ background: '#181010', border: '2px solid #F87171', borderRadius: '20px', padding: '3rem 2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FCA5A5', marginBottom: '0.5rem' }}>
            Pembayaran Belum Disahkan
          </h2>
          <p style={{ color: '#FEF3C7', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
            Sistem belum menerima sah status bayaran FPX anda. Sekiranya anda telah membuat bayaran, sila simpan resit dan hubungi kami.
          </p>
          <Link
            href="/fsp-checkout"
            style={{
              display: 'inline-block',
              padding: '0.85rem 1.8rem',
              fontSize: '0.95rem',
              fontWeight: 800,
              color: '#FFFFFF',
              background: '#DC2626',
              borderRadius: '50px',
              textDecoration: 'none'
            }}
          >
            🔄 Cuba Lagi Pembayaran
          </Link>
        </div>
      )}

    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <main style={{
      minHeight: '100vh',
      background: '#042E23',
      color: '#FFFFFF',
      padding: '4rem 1rem',
      fontFamily: 'var(--font-inter), -apple-system, sans-serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Suspense fallback={
        <div style={{ textAlign: 'center', color: '#FDE047' }}>
          Memuatkan pengesahan pembayaran...
        </div>
      }>
        <PaymentSuccessContent />
      </Suspense>
    </main>
  );
}
