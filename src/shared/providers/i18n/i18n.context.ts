import { createContext, useContext } from 'react';
import { Locale } from '@/app/[lang]/dictionaries';

export interface I18nContextProps {
  lang: Locale;
  dictionary: any;
}

export const I18nContext = createContext<I18nContextProps>(
  {} as I18nContextProps,
);

export function useI18n() {
  const ctx = useContext(I18nContext);

  if (!ctx) {
    throw new Error('Missing I18nProvider');
  }

  return ctx;
}
