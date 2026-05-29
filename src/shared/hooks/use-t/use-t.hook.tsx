'use client';

import { useI18n } from '@/shared/providers/i18n/i18n.context';

export function useT() {
  const { dictionary } = useI18n();

  return (key: string) => {
    return key.split('.').reduce((obj, part) => obj?.[part], dictionary);
  };
}
