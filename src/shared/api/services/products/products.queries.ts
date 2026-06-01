import BasicQueryClient from '@/shared/api/core/basic-query.client';
import { ProductsService } from '@/shared/api/services/products/products.service';
import { TimeUtils } from '@/shared/lib/time.utils';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const productsQueryKey = ['products'];

const refetchProducts = () =>
  BasicQueryClient.refetchQueries({
    queryKey: productsQueryKey,
  });

export const useProducts = () =>
  useQuery({
    queryKey: productsQueryKey,
    queryFn: () => ProductsService.find(),
    staleTime: TimeUtils.toMilliseconds(0, 3),
  });

export const useCreateProduct = () =>
  useMutation({
    mutationKey: ['productCreate'],
    mutationFn: ProductsService.create,

    onSuccess() {
      void refetchProducts();
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      toast.error('Error occurred!');

      console.error(error);
    },
  });

export const useUpdateProduct = () =>
  useMutation({
    mutationKey: ['productUpdate'],
    mutationFn: ProductsService.update,

    onSuccess() {
      void refetchProducts();
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      toast.error('Error occurred!');

      console.error(error);
    },
  });

export const useUpdateProductImage = () =>
  useMutation({
    mutationKey: ['productUpdateImage'],
    mutationFn: ProductsService.updateImage,

    onSuccess() {
      void refetchProducts();
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      toast.error('Error occurred!');

      console.error(error);
    },
  });

export const useDeleteProductImage = () =>
  useMutation({
    mutationKey: ['productDeleteImage'],
    mutationFn: ProductsService.deleteImage,

    onSuccess() {
      void refetchProducts();
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      toast.error('Error occurred!');

      console.error(error);
    },
  });

export const useDeleteProduct = () =>
  useMutation({
    mutationKey: ['productDelete'],
    mutationFn: ProductsService.deleteById,

    onSuccess() {
      void refetchProducts();
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      toast.error('Error occurred!');

      console.error(error);
    },
  });
