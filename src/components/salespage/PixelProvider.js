'use client';

import Script from 'next/script';

/**
 * PixelProvider — used ONLY for the root / page (cannot have its own layout).
 * Variant salespages (sihir, saka, etc.) use layout.js instead.
 *
 * Loads /api/pixel-init which serves the FB pixel JS with pixel ID from database.
 * Events fired: PageView + ViewContent (Lead funnel).
 * Lead event fired separately when form is submitted (ApplicationForm).
 */
export default function PixelProvider() {
  return (
    <Script
      src="/api/pixel-init"
      strategy="afterInteractive"
    />
  );
}
