import React from 'react';

export default function StatusBadge({ status, className = '' }) {
  const getBadgeStyle = (st) => {
    switch (st) {
      case 'Baru':
      case 'Belum Diambil':
        return { bg: 'rgba(239, 68, 68, 0.12)', border: 'rgba(239, 68, 68, 0.3)', text: '#EF4444' };
      case 'Sedang Diurus':
      case 'Perlu Follow-up':
        return { bg: 'rgba(245, 158, 11, 0.12)', border: 'rgba(245, 158, 11, 0.3)', text: '#F59E0B' };
      case 'Rawatan Selesai':
        return { bg: 'rgba(16, 185, 129, 0.12)', border: 'rgba(16, 185, 129, 0.3)', text: '#10B981' };
      case 'Telah Dibayar':
        return { bg: 'rgba(14, 165, 233, 0.12)', border: 'rgba(14, 165, 233, 0.3)', text: '#0EA5E9' };
      case 'Pelanggan Batal':
      case 'Tidak Teruskan':
      case 'Tidak Dapat Dihubungi':
        return { bg: 'rgba(107, 114, 128, 0.15)', border: 'rgba(107, 114, 128, 0.3)', text: '#9CA3AF' };
      default:
        return { bg: 'rgba(6, 78, 59, 0.3)', border: 'rgba(16, 185, 129, 0.3)', text: '#34D399' };
    }
  };

  const style = getBadgeStyle(status);

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.2rem 0.55rem',
        borderRadius: '4px',
        fontSize: '0.7rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
        background: style.bg,
        border: `1px solid ${style.border}`,
        color: style.text
      }}
      className={className}
    >
      {status}
    </span>
  );
}
