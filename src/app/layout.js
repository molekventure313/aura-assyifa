import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { ToastProvider } from '@/components/ui/Toast';

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
  title: "ESYIFAA' | Rawatan Jarak Jauh Gangguan Jin, Sihir, Santau & Saka",
  description: "Rawatan secara jarak jauh menggunakan bacaan ayat-ayat al-Quran dan doa berlandaskan syarak untuk membantu anda kembali tenang.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ms" className={`${inter.variable} ${jakarta.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
