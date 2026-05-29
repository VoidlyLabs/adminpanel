'use client';
import { Outfit } from 'next/font/google';
import '../globals.css';
import 'flatpickr/dist/flatpickr.css';
import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Toaster } from 'react-hot-toast';
import { QueryClientProvider } from '@tanstack/react-query';
import BasicQueryClient from '@/shared/api/core/basic-query.client';
import OwnUserProvider from '@/shared/providers/own-user/own-user.provider';

const outfit = Outfit({
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <QueryClientProvider client={BasicQueryClient}>
          <ThemeProvider>
            <Toaster containerClassName={'z-99'} position={'bottom-right'} />
            <SidebarProvider>{children}</SidebarProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
