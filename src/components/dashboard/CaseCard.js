'use client';

import StatusBadge from './StatusBadge';
import { formatPhoneForDisplay } from '@/lib/utils/phone';

/**
 * CaseCard - Displays a case summary card used in practitioner & admin dashboards
 * 
 * @param {Object} props
 * @param {Object} props.data - Case data with joined customer info
 * @param {string} props.type - 'available' | 'active' | 'completed'
 * @param {Function} props.onClick - Click handler for the card
 * @param {React.ReactNode} props.actions - Additional action buttons
 */
export default function CaseCard({ data, type = 'active', onClick, actions }) {
  const customer = data.customers || data.customer || {};
  const practitioner = data.practitioner || {};
  const isRepeat = customer.is_repeat || false;
  const submissionCount = customer.submission_count || 1;

  // Calculate time elapsed
  const getTimeAgo = (dateStr) => {
    if (!dateStr) return '';
    const now = new Date();
    const date = new Date(dateStr);
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-MY', { day: 'numeric', month: 'short' });
  };

  // Mask phone number for display in list (privacy)
  const maskPhone = (phone) => {
    if (!phone || phone.length < 6) return phone;
    return phone.slice(0, 4) + '•••' + phone.slice(-4);
  };

  return (
    <div
      className={`card case-card ${type === 'available' ? 'case-card-available' : ''}`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="card-body">
        {/* Header row: Name + Status */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0, color: 'var(--text-primary)' }}>
              {customer.full_name || 'Unknown'}
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.25rem 0 0' }}>
              {maskPhone(customer.phone)} • {customer.state || 'N/A'}
            </p>
          </div>
          <StatusBadge status={data.status} />
        </div>

        {/* Repeat customer badge */}
        {isRepeat && (
          <div className="badge badge-kes-berulang" style={{ marginBottom: '0.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            🔄 Repeat Customer ({submissionCount}x)
          </div>
        )}

        {/* Problem snippet */}
        {customer.problem && (
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0.5rem 0', lineHeight: 1.5 }}>
            {customer.problem.length > 120
              ? customer.problem.substring(0, 120) + '...'
              : customer.problem}
          </p>
        )}

        {/* Footer: metadata */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            ⏱ {getTimeAgo(data.created_at)}
          </span>

          {practitioner?.full_name && (
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              👤 {practitioner.full_name}
            </span>
          )}

          {data.submissions?.source && data.submissions.source !== 'Direct' && (
            <span className="badge badge-baru" style={{ fontSize: '0.65rem', padding: '0.15rem 0.5rem' }}>
              {data.submissions.source}
            </span>
          )}
        </div>
      </div>

      {/* Optional action buttons (passed from parent) */}
      {actions && (
        <div className="card-footer" style={{ padding: '0.75rem 1rem', borderTop: '1px solid var(--border-color)' }}>
          {actions}
        </div>
      )}
    </div>
  );
}
