import PixelProviderServer from '@/components/salespage/PixelProviderServer';

// Pixel ID fetched server-side from DB on every request — no CDN caching.
export default function SalespageLayout({ children }) {
  return (
    <>
      <PixelProviderServer />
      {children}
    </>
  );
}
