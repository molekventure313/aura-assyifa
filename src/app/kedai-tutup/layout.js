import Script from 'next/script';
import { createAdminClient } from '@/lib/supabase/admin';

export default async function SalespageLayout({ children }) {
  let pixelId = null;
  try {
    const adminClient = createAdminClient();
    const { data } = await adminClient
      .from('tracking_config')
      .select('meta_pixel_id, is_active')
      .limit(1)
      .maybeSingle();
    if (data?.is_active && data?.meta_pixel_id) {
      pixelId = data.meta_pixel_id;
    }
  } catch (e) {
    // Non-blocking — pixel failure must not break salespage
    console.warn('Pixel layout fetch failed:', e?.message);
  }

  return (
    <>
      {pixelId && (
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
      )}
      {children}
    </>
  );
}
