import { createAdminClient } from '@/lib/supabase/admin';

/**
 * PixelProviderServer — Server Component.
 * Runs on every request (no CDN/browser cache).
 * Fetches pixel ID fresh from DB and injects FB Pixel inline.
 * This guarantees that any change to Meta Pixel ID in the admin panel
 * is reflected immediately on all salespages.
 */
export default async function PixelProviderServer() {
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
  } catch {
    // Fail silently — pixel won't fire but page still loads
  }

  if (!pixelId) return null;

  const pixelScript = `
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
  `;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: pixelScript }}
    />
  );
}
