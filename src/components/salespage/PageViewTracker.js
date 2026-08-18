'use client';

import { useEffect } from 'react';

/**
 * PageViewTracker — Client component untuk record page view.
 * Letak dalam setiap salespage page.js.
 * Fail silently — tidak crash salespage jika tracking gagal.
 *
 * @param {string} slug - Slug salespage (e.g. 'sihir', 'saka')
 */
export default function PageViewTracker({ slug }) {
  useEffect(() => {
    if (!slug) return;
    // Fire and forget — tidak perlu await
    fetch('/api/track-visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug }),
    }).catch(() => {}); // Silent fail
  }, [slug]);

  return null; // Tiada UI
}
