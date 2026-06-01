import BasicQueryClient from '@/shared/api/core/basic-query.client';
import { ConfigurationService } from '@/shared/api/services/configuration/configuration.service';
import { TimeUtils } from '@/shared/lib/time.utils';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const configurationQueryKey = ['configuration'];

const refetchConfiguration = () =>
  BasicQueryClient.refetchQueries({
    queryKey: configurationQueryKey,
  });

export const useConfiguration = () =>
  useQuery({
    queryKey: configurationQueryKey,
    queryFn: () => ConfigurationService.get(),
    staleTime: TimeUtils.toMilliseconds(0, 3),
  });

export const useUpdateConfiguration = () =>
  useMutation({
    mutationKey: ['configurationUpdate'],
    mutationFn: ConfigurationService.update,

    onSuccess() {
      void refetchConfiguration();
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      toast.error('Error occurred!');

      console.error(error);
    },
  });

export const useUpdateConfigurationLogo = () =>
  useMutation({
    mutationKey: ['configurationUpdateLogo'],
    mutationFn: ConfigurationService.updateLogo,

    onSuccess() {
      void refetchConfiguration();
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      toast.error('Error occurred!');

      console.error(error);
    },
  });

export const useDeleteConfigurationLogo = () =>
  useMutation({
    mutationKey: ['configurationDeleteLogo'],
    mutationFn: ConfigurationService.deleteLogo,

    onSuccess() {
      void refetchConfiguration();
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      toast.error('Error occurred!');

      console.error(error);
    },
  });
