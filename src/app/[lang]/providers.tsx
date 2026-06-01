'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/context/ThemeContext';
import { SidebarProvider } from '@/context/SidebarContext';
import { Toaster } from 'react-hot-toast';
import { I18nProvider } from '@/shared/providers/i18n/i18n.provider';
import type { Locale } from '@/app/[lang]/dictionaries';
import BasicQueryClient from '@/shared/api/core/basic-query.client';

export interface ProvidersProps {
  children?: React.ReactNode;
  dictionary: unknown;
  lang: Locale;
}

export function Providers({ children, dictionary, lang }: ProvidersProps) {
  return (
    <QueryClientProvider client={BasicQueryClient}>
      <I18nProvider lang={lang} dictionary={dictionary}>
        <ThemeProvider>
          <Toaster containerClassName="z-99" position="bottom-right" />
          <SidebarProvider>{children}</SidebarProvider>
        </ThemeProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
}
