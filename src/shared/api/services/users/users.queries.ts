import BasicQueryClient from '@/shared/api/core/basic-query.client';
import { UsersService } from '@/shared/api/services/users/users.service';
import { TimeUtils } from '@/shared/lib/time.utils';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const usersQueryKey = ['users'];

const refetchUsers = () =>
  BasicQueryClient.refetchQueries({
    queryKey: usersQueryKey,
  });

export const useUsers = () =>
  useQuery({
    queryKey: usersQueryKey,
    queryFn: () => UsersService.find(),
    staleTime: TimeUtils.toMilliseconds(0, 3),
  });

export const useCreateUser = () =>
  useMutation({
    mutationKey: ['userCreate'],
    mutationFn: UsersService.create,

    onSuccess() {
      void refetchUsers();
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      toast.error('Error occurred!');

      console.error(error);
    },
  });

export const useUpdateUser = () =>
  useMutation({
    mutationKey: ['userUpdate'],
    mutationFn: UsersService.update,

    onSuccess() {
      void refetchUsers();
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      toast.error('Error occurred!');

      console.error(error);
    },
  });

export const useDeleteUser = () =>
  useMutation({
    mutationKey: ['userDelete'],
    mutationFn: UsersService.deleteById,

    onSuccess() {
      void refetchUsers();
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      toast.error('Error occurred!');

      console.error(error);
    },
  });
