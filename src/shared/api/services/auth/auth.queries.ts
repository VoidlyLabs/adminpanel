import { AuthService } from '@/shared/api/services/auth/auth.service';
import { TimeUtils } from '@/shared/lib/time.utils';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useI18n } from '@/shared/providers/i18n/i18n.context';

export const useSignIn = () => {
  const { lang } = useI18n();

  useMutation({
    mutationKey: ['authSignIn'],
    mutationFn: AuthService.signIn,

    onSuccess() {
      window.location.replace(`/${lang}/`);
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      toast.error('Error occurred! Check your credentials.');

      console.error(error);
    },
  });
};

export const useSignOut = () =>
  useMutation({
    mutationKey: ['authSignOut'],
    mutationFn: AuthService.signOut,

    onSuccess() {
      window.location.replace('/signin');
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      toast.error('Error occurred!');

      console.error(error);
    },
  });

export const useMe = () =>
  useQuery({
    queryKey: ['authMe'],
    queryFn: () => AuthService.getMe(),
    staleTime: TimeUtils.toMilliseconds(0, 3),
  });
