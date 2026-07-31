import React from 'react';

export function PageLoader({ message = 'Loading...' }) {
  return (
    <div className="page-loader fixed inset-0 flex flex-col items-center justify-center bg-dark-900/80 backdrop-blur-sm z-50">
      <div className="spinner lg w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      {message && <p className="loader-text mt-4 text-gray-300 font-medium">{message}</p>}
    </div>
  );
}

export function InlineLoader({ size = 'md', className = '' }) {
  return (
    <div className={`inline-loader spinner ${size} animate-spin rounded-full border-2 border-primary border-t-transparent ${className}`.trim()} aria-label="Loading"></div>
  );
}

export function SkeletonCard({ className = '' }) {
  return (
    <div className={`skeleton-card skeleton glass-panel p-6 rounded-xl animate-pulse ${className}`.trim()}>
      <div className="skeleton-title mb-4 h-6 bg-white/10 rounded w-1/3"></div>
      <div className="skeleton-line mb-2 h-4 bg-white/5 rounded w-full"></div>
      <div className="skeleton-line mb-2 h-4 bg-white/5 rounded w-full"></div>
      <div className="skeleton-line w-2/3 h-4 bg-white/5 rounded"></div>
    </div>
  );
}

export function SkeletonTable({ rows = 5, columns = 4, className = '' }) {
  return (
    <div className={`skeleton-table animate-pulse ${className}`.trim()}>
      <div className="skeleton-header flex justify-between mb-4 border-b border-white/10 pb-4">
        {Array.from({ length: columns }).map((_, i) => (
          <div key={`h-${i}`} className="skeleton-line h-6 bg-white/10 rounded w-1/4 mx-2"></div>
        ))}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={`r-${r}`} className="skeleton-row flex justify-between py-4 border-b border-white/5">
          {Array.from({ length: columns }).map((_, c) => (
             <div key={`c-${c}`} className="skeleton-line h-4 bg-white/5 rounded w-1/4 mx-2"></div>
          ))}
        </div>
      ))}
    </div>
  );
}
