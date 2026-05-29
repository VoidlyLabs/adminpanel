'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/context/ThemeContext';
import { SidebarProvider } from '@/context/SidebarContext';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { I18nProvider } from '@/shared/providers/i18n/i18n.provider';
import { Locale } from '@/app/[lang]/dictionaries';

export interface ProvidersProps {
  children?: React.ReactNode;
  dictionary: any;
  lang: Locale;
}

export function Providers({ children, dictionary, lang }: ProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider lang={lang} dictionary={dictionary}>
        <ThemeProvider>
          <Toaster containerClassName="z-99" position="bottom-right" />
          <SidebarProvider>{children}</SidebarProvider>
        </ThemeProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
}
