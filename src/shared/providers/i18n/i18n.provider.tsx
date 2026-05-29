'use client';

import { Locale } from '@/app/[lang]/dictionaries';
import { I18nContext } from './i18n.context';

export function I18nProvider({
  children,
  dictionary,
  lang,
}: {
  children: React.ReactNode;
  dictionary: any;
  lang: Locale;
}) {
  return (
    <I18nContext.Provider value={{ lang, dictionary }}>
      {children}
    </I18nContext.Provider>
  );
}
