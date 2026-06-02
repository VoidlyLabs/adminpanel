import { Outfit } from 'next/font/google';
import '../globals.css';
import 'flatpickr/dist/flatpickr.css';
import { ReactNode } from 'react';
import { Providers } from '@/app/[lang]/providers';
import { getDictionary, hasLocale } from '@/app/[lang]/dictionaries';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

const outfit = Outfit({
  subsets: ['latin'],
});

export interface RootLayoutProps {
  children: ReactNode;
  params: Promise<{
    lang: string;
  }>;
}

export const metadata: Metadata = {
  title: 'VoidlyAdmin',
};

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dictionary = await getDictionary(lang);

  return (
    <html lang={lang}>
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <Providers lang={lang} dictionary={dictionary}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
