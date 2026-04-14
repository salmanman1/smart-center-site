import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from '@/context/LanguageContext';

export const metadata: Metadata = {
  title: 'Smart Center - Certified Home Appliance Repair',
  description: 'The leading certified engineering center for maintaining all home appliances with over 20 years of experience. We reach you wherever you are.',
  icons: {
    icon: '/favicon.png', // ← المسار الصحيح بدون public
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800;900&family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-primary/30">
        <LanguageProvider>
          {children}
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}