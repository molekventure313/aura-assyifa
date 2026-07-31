'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PelangganRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard/admin/kes');
  }, [router]);

  return (
    <div style={{ padding: '3rem', textAlign: 'center', color: '#6B7280', fontFamily: 'var(--font-inter), sans-serif' }}>
      <div className="spinner" style={{ margin: '0 auto 1rem auto', width: '32px', height: '32px' }}></div>
      <p>Memindahkan ke Pengurusan Kes...</p>
    </div>
  );
}
