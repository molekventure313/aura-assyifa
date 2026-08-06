import React from 'react';

export default function Badge({
  status,
  children,
  variant,
  pulse = false,
  className = '',
}) {
  const baseClass = 'badge';
  let variantClass = '';

  if (variant) {
    variantClass = `badge-${variant}`;
  } else if (status) {
    // Map status to variant
    const statusMap = {
      'Baru': 'primary',
      'Belum Diambil': 'warning',
      'Sedang Diurus': 'info',
      'Tidak Dapat Dihubungi': 'danger',
      'Perlu Follow-up': 'warning',
      'Rawatan Selesai': 'success',
      'Telah Dibayar': 'info',
      'Pelanggan Batal': 'danger',
      'Kes Berulang': 'secondary',
      'Diarkibkan': 'ghost'
    };
    variantClass = `badge-${statusMap[status] || 'default'}`;
  }
  
  const pulseClass = pulse ? 'animate-pulse' : '';

  return (
    <span className={`${baseClass} ${variantClass} ${pulseClass} ${className}`.trim()}>
      {children || status}
    </span>
  );
}
