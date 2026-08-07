'use client';

import { useEffect } from 'react';

/**
 * PixelProvider — fetches pixel ID from DB on every render (no cache).
 * Injects the FB Pixel script inline so it's never cached by browser or CDN.
 * Used by salespage pages that cannot use layout.js (e.g. root / page).
 */
export default function PixelProvider() {
  useEffect(() => {
    // Fetch latest pixel config from DB — always no-cache
    fetch('/api/tracking/config', { cache: 'no-store' })
      .then((r) => r.json())
      .then((json) => {
        if (!json.pixel_id || window.fbq) return;

        // Inject FB Pixel inline
        const script = document.createElement('script');
        script.innerHTML = `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${json.pixel_id}');
          fbq('track', 'PageView');
          fbq('track', 'ViewContent');
        `;
        document.head.appendChild(script);
      })
      .catch(() => {});
  }, []);

  return null;
}
