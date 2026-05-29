'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { useI18n } from '@/shared/providers/i18n/i18n.context';

const labels = {
  en: 'EN',
  uk: 'UK',
} as const;

const localeNames = {
  en: 'English',
  uk: 'Ukrainian',
} as const;

export function LanguageToggleButton() {
  const { lang } = useI18n();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const nextLang = lang === 'en' ? 'uk' : 'en';

  const href = useMemo(() => {
    const segments = pathname.split('/');
    segments[1] = nextLang;

    const nextPathname = segments.join('/') || `/${nextLang}`;
    const query = searchParams.toString();

    return query ? `${nextPathname}?${query}` : nextPathname;
  }, [nextLang, pathname, searchParams]);

  return (
    <Link
      href={href}
      hrefLang={nextLang}
      aria-label={`Switch language to ${localeNames[nextLang]}`}
      className="relative flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-sm font-semibold text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
    >
      {labels[nextLang]}
    </Link>
  );
}

export default LanguageToggleButton;
