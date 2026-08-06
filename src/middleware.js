import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function middleware(request) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://cvygzimtwhezxulvydrn.supabase.co';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_3PZP6cp7K4VpTTMEGM2UlQ_u8ldC3dz';

  const supabase = createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isPublicRoute = 
    request.nextUrl.pathname === '/' ||
    request.nextUrl.pathname === '/login' ||
    request.nextUrl.pathname === '/setup' ||
    request.nextUrl.pathname === '/daftar-perawat' ||
    request.nextUrl.pathname === '/terima-kasih' ||
    request.nextUrl.pathname.startsWith('/sihir') ||
    request.nextUrl.pathname.startsWith('/saka') ||
    request.nextUrl.pathname.startsWith('/penyakit-misteri') ||
    request.nextUrl.pathname.startsWith('/gangguan-berulang') ||
    request.nextUrl.pathname.startsWith('/gangguan-mistik') ||
    request.nextUrl.pathname.startsWith('/belum-zuriat') ||
    request.nextUrl.pathname.startsWith('/kedai-tutup') ||
    request.nextUrl.pathname.startsWith('/api/submissions') ||
    request.nextUrl.pathname.startsWith('/api/tracking') ||
    request.nextUrl.pathname.startsWith('/api/setup') ||
    request.nextUrl.pathname.startsWith('/api/register-perawat') ||
    request.nextUrl.pathname.startsWith('/api/settings') ||
    request.nextUrl.pathname.startsWith('/api/perawat') ||
    request.nextUrl.pathname.startsWith('/api/pixel-init') ||   // ← pixel script
    request.nextUrl.pathname.startsWith('/api/pixel-debug');    // ← debug endpoint

  if (!user && !isPublicRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
