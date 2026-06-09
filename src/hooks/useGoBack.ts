import { useRouter } from 'next/navigation';
import { useI18n } from '@/shared/providers/i18n/i18n.context';
import { localizePath } from '@/shared/lib/localized-path.utils';

const useGoBack = () => {
  const router = useRouter();
  const { lang } = useI18n();

  const goBack = () => {
    if (window.history.length > 1) {
      router.back(); // Navigate to the previous route
    } else {
      router.push(localizePath('/', lang)); // Redirect to home if no history exists
    }
  };

  return goBack;
};

export default useGoBack;
