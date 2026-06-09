import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/shared/providers/i18n/i18n.context';
import { localizePath } from '@/shared/lib/localized-path.utils';

export interface NavigateProps {
  to?: string;
}

const Navigate = ({ to = '/' }: NavigateProps) => {
  const router = useRouter();
  const { lang } = useI18n();

  useEffect(() => {
    router.push(localizePath(to, lang));
  }, [lang, router, to]);

  return null;
};

export default Navigate;
