import { Outfit } from 'next/font/google';
import '../globals.css';
import 'flatpickr/dist/flatpickr.css';
import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Toaster } from 'react-hot-toast';
import { QueryClientProvider } from '@tanstack/react-query';
import BasicQueryClient from '@/shared/api/core/basic-query.client';
import OwnUserProvider from '@/shared/providers/own-user/own-user.provider';
import { ReactNode } from 'react';
import { Providers } from '@/app/[lang]/providers';
import { getDictionary, Locale } from '@/app/[lang]/dictionaries';
import type { Metadata } from 'next';

const outfit = Outfit({
  subsets: ['latin'],
});

export interface RootLayoutProps {
  children: ReactNode;
  params: Promise<{
    lang: Locale;
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
