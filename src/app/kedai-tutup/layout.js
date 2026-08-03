import Script from 'next/script';

// Pixel injected via /api/pixel-init which serves FB pixel JS with embedded pixel ID from database.
// This works even without SUPABASE_SERVICE_ROLE_KEY in Netlify env vars.
export default function SalespageLayout({ children }) {
  return (
    <>
      <Script
        src="/api/pixel-init"
        strategy="afterInteractive"
      />
      {children}
    </>
  );
}
