import BasicQueryClient from '@/shared/api/core/basic-query.client';
import { CategoryService } from '@/shared/api/services/category/category.service';
import { TimeUtils } from '@/shared/lib/time.utils';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const categoriesQueryKey = ['categories'];

const refetchCategories = () =>
  BasicQueryClient.refetchQueries({
    queryKey: categoriesQueryKey,
  });

export const useCategories = () =>
  useQuery({
    queryKey: categoriesQueryKey,
    queryFn: () => CategoryService.find(),
    staleTime: TimeUtils.toMilliseconds(0, 3),
  });

export const useCategory = (id: string) =>
  useQuery({
    queryKey: [...categoriesQueryKey, id],
    queryFn: () => CategoryService.findById(id),
    staleTime: TimeUtils.toMilliseconds(0, 3),
  });

export const useCreateCategory = () =>
  useMutation({
    mutationKey: ['categoryCreate'],
    mutationFn: CategoryService.create,

    onSuccess() {
      void refetchCategories();
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      toast.error('Error occurred!');

      console.error(error);
    },
  });

export const useUpdateCategory = () =>
  useMutation({
    mutationKey: ['categoryUpdate'],
    mutationFn: CategoryService.update,

    onSuccess() {
      void refetchCategories();
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      toast.error('Error occurred!');

      console.error(error);
    },
  });

export const useDeleteCategory = () =>
  useMutation({
    mutationKey: ['categoryDelete'],
    mutationFn: CategoryService.deleteById,

    onSuccess() {
      void refetchCategories();
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      toast.error('Error occurred!');

      console.error(error);
    },
  });
