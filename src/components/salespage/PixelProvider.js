'use client';

import { useEffect } from 'react';
import { initPixel, trackEvent } from '@/lib/tracking/pixel';

/**
 * PixelProvider — loads Meta Pixel dynamically from tracking_config in DB.
 * Place this inside each salespage to enable auto pixel tracking.
 * Fires: PageView + ViewContent on mount.
 * Lead events are fired separately when form is submitted (ApplicationForm).
 */
export default function PixelProvider() {
  useEffect(() => {
    const loadAndInitPixel = async () => {
      try {
        const res = await fetch('/api/tracking/config');
        if (!res.ok) return;
        const json = await res.json();

        if (json.is_active && json.pixel_id) {
          // Initialize pixel with ID from database
          initPixel(json.pixel_id);
          // Fire standard salespage events (Lead-funnel, not Purchase)
          trackEvent('PageView');
          trackEvent('ViewContent');
        }
      } catch (err) {
        // Non-blocking — tracking failure must not break salespage
        console.warn('Pixel init skipped:', err?.message);
      }
    };

    loadAndInitPixel();
  }, []);

  return null; // Renders nothing — purely functional
}
