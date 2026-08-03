'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';

/**
 * PixelProvider — used ONLY for pages that cannot use a server layout (e.g. root / page).
 * For variant salespages (sihir, saka, etc.), pixel is injected server-side via layout.js.
 *
 * Events fired: PageView, ViewContent (Lead funnel — not Purchase).
 * Lead event is fired separately when form is submitted (ApplicationForm).
 */
export default function PixelProvider() {
  const [pixelId, setPixelId] = useState(null);

  useEffect(() => {
    fetch('/api/tracking/config')
      .then(r => r.ok ? r.json() : null)
      .then(json => {
        if (json?.is_active && json?.pixel_id) {
          setPixelId(json.pixel_id);
        }
      })
      .catch(() => {});
  }, []);

  if (!pixelId) return null;

  return (
    <Script
      id="facebook-pixel"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${pixelId}');
          fbq('track', 'PageView');
          fbq('track', 'ViewContent');
        `
      }}
    />
  );
}
