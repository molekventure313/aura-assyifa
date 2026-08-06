import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import { headers } from 'next/headers';
import './globals.css';
import { ToastProvider } from '@/components/ui/Toast';
import { createAdminClient } from '@/lib/supabase/admin';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata = {
  title: "MV SYIFAA' | Rawatan Jarak Jauh Gangguan Jin, Sihir, Santau & Saka",
  description: "Rawatan secara jarak jauh menggunakan bacaan ayat-ayat al-Quran dan doa berlandaskan syarak untuk membantu anda kembali tenang.",
};

// Fetch pixel ID server-side — runs at request time, always fresh from DB
async function getPixelId() {
  try {
    const adminClient = createAdminClient();
    const { data } = await adminClient
      .from('tracking_config')
      .select('meta_pixel_id, is_active')
      .limit(1)
      .maybeSingle();

    if (data?.is_active && data?.meta_pixel_id) {
      return data.meta_pixel_id;
    }
  } catch (e) {
    console.warn('layout: failed to fetch pixel_id', e?.message);
  }
  return null;
}

export default async function RootLayout({ children }) {
  const pixelId = await getPixelId();

  // Detect current route via middleware-injected header
  // /terima-kasih → fire Lead, semua lain → fire PageView
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  const isTQPage = pathname === '/terima-kasih';
  const pixelEvent = isTQPage ? 'Lead' : 'PageView';

  // Official Meta Pixel base code — swap PageView → Lead on TQ page
  const pixelScript = pixelId ? `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${pixelId}');
    fbq('track', '${pixelEvent}');
  ` : null;

  return (
    <html lang="ms" className={`${inter.variable} ${jakarta.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Meta Pixel — loaded in <head> exactly per FB official template */}
        {pixelScript && (
          <script
            dangerouslySetInnerHTML={{ __html: pixelScript }}
          />
        )}
      </head>
      <body>
        {/* noscript fallback — for users with JS disabled */}
        {pixelId && (
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        )}
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
