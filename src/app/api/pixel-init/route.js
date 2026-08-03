import { createAdminClient } from '@/lib/supabase/admin';

// Returns JavaScript pixel init code — called as external script src
// No auth needed — only returns public pixel_id when tracking is active
export async function GET() {
  let pixelId = null;

  try {
    const adminClient = createAdminClient();
    const { data, error } = await adminClient
      .from('tracking_config')
      .select('meta_pixel_id, is_active')
      .limit(1)
      .maybeSingle();

    if (!error && data?.is_active && data?.meta_pixel_id) {
      pixelId = data.meta_pixel_id;
    }
  } catch (e) {
    console.warn('pixel-init: DB query failed:', e?.message);
  }

  // If no pixel configured or not active, return empty JS (no-op)
  if (!pixelId) {
    return new Response('/* Meta Pixel: not configured or inactive */', {
      headers: {
        'Content-Type': 'application/javascript',
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  }

  // Return the Facebook Pixel base code with pixel ID embedded
  // Events: PageView + ViewContent (Lead funnel — not Purchase)
  const pixelScript = `
(function() {
  if (window.fbq) return;
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
})();
`;

  return new Response(pixelScript, {
    headers: {
      'Content-Type': 'application/javascript',
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}
