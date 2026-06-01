'use client';

import Checkbox from '@/components/form/input/Checkbox';
import ComponentCard from '@/components/common/ComponentCard';
import FileInput from '@/components/form/input/FileInput';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Product } from '@/shared/api/services/products/products.model';
import {
  useDeleteProductImage,
  useDeleteProduct,
  useUpdateProductImage,
  useUpdateProduct,
} from '@/shared/api/services/products/products.queries';
import { useT } from '@/shared/hooks/use-t/use-t.hook';
import ImageLoader from '@/shared/ui/image-loader/image-loader';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface ProductsListFeatureProps {
  products: Product[];
}

type ProductFormState = {
  name: string;
  description: string;
  price: string;
  isAvailable: boolean;
};

export default function ProductsListFeature({
  products,
}: ProductsListFeatureProps) {
  const t = useT();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  const updateProductImage = useUpdateProductImage();
  const deleteProductImage = useDeleteProductImage();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedImages, setSelectedImages] = useState<Record<string, File>>(
    {},
  );
  const [fileInputKeys, setFileInputKeys] = useState<Record<string, number>>(
    {},
  );
  const [form, setForm] = useState<ProductFormState>({
    name: '',
    description: '',
    price: '',
    isAvailable: true,
  });

  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      description: product.description,
      price: String(product.price),
      isAvailable: product.isAvailable,
    });
  };

  const cancelEdit = () => {
    if (editingId) {
      resetImageInput(editingId);
    }

    setEditingId(null);
    setForm({
      name: '',
      description: '',
      price: '',
      isAvailable: true,
    });
  };

  const updateForm = <K extends keyof ProductFormState>(
    key: K,
    value: ProductFormState[K],
  ) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const saveProduct = (product: Product) => {
    updateProduct.mutate(
      {
        id: product.id,
        categoryId: product.categoryId,
        name: form.name.trim(),
        description: form.description.trim(),
        price: Number(form.price),
        isAvailable: form.isAvailable,
      },
      {
        onSuccess() {
          toast.success(t('category.toasts.productUpdated'));
          cancelEdit();
        },
      },
    );
  };

  const removeProduct = (product: Product) => {
    if (!window.confirm(t('category.confirmDeleteProduct'))) {
      return;
    }

    deleteProduct.mutate(product.id, {
      onSuccess() {
        toast.success(t('category.toasts.productDeleted'));
      },
    });
  };

  const selectImage = (productId: string, file?: File) => {
    if (!file) {
      return;
    }

    setSelectedImages((current) => ({
      ...current,
      [productId]: file,
    }));
  };

  const resetImageInput = (productId: string) => {
    setSelectedImages((current) => {
      const next = { ...current };

      delete next[productId];

      return next;
    });
    setFileInputKeys((current) => ({
      ...current,
      [productId]: (current[productId] ?? 0) + 1,
    }));
  };

  const uploadImage = (product: Product) => {
    const image = selectedImages[product.id];

    if (!image) {
      return;
    }

    updateProductImage.mutate(
      {
        id: product.id,
        image,
      },
      {
        onSuccess() {
          toast.success(t('category.toasts.productImageUploaded'));
          resetImageInput(product.id);
        },
      },
    );
  };

  const removeImage = (product: Product) => {
    deleteProductImage.mutate(product.id, {
      onSuccess() {
        toast.success(t('category.toasts.productImageDeleted'));
        resetImageInput(product.id);
      },
    });
  };

  const price = Number(form.price);
  const canSave =
    form.name.trim() &&
    form.description.trim() &&
    form.price !== '' &&
    !Number.isNaN(price) &&
    price >= 0;
  const isPending =
    updateProduct.isPending ||
    deleteProduct.isPending ||
    updateProductImage.isPending ||
    deleteProductImage.isPending;

  return (
    <ComponentCard title={t('category.products')}>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  {t('category.image')}
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  {t('category.productName')}
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  {t('category.description')}
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  {t('category.price')}
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  {t('category.isAvailable')}
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-end text-theme-xs dark:text-gray-400"
                >
                  {t('category.actions')}
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {products.length === 0 ? (
                <TableRow>
                  <TableCell className="px-5 py-6 text-sm text-gray-500 dark:text-gray-400">
                    {t('category.noProducts')}
                  </TableCell>
                  <TableCell className="px-5 py-6"> </TableCell>
                  <TableCell className="px-5 py-6"> </TableCell>
                  <TableCell className="px-5 py-6"> </TableCell>
                  <TableCell className="px-5 py-6"> </TableCell>
                  <TableCell className="px-5 py-6"> </TableCell>
                </TableRow>
              ) : (
                products.map((product) => {
                  const isEditing = editingId === product.id;

                  return (
                    <TableRow key={product.id}>
                      <TableCell className="px-5 py-4 text-start text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex min-w-52 flex-col gap-3">
                          <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
                            {product.imageUrl ? (
                              <ImageLoader
                                src={product.imageUrl}
                                alt={product.name}
                                width={120}
                                height={120}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <span className="px-2 text-center text-xs text-gray-500 dark:text-gray-400">
                                {t('category.noImage')}
                              </span>
                            )}
                          </div>

                          {isEditing && (
                            <>
                              <FileInput
                                key={`${product.id}-${fileInputKeys[product.id] ?? 0}`}
                                onChange={(event) =>
                                  selectImage(
                                    product.id,
                                    event.target.files?.[0],
                                  )
                                }
                                disabled={isPending}
                              />

                              {selectedImages[product.id] && (
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {selectedImages[product.id].name}
                                </p>
                              )}

                              <div className="flex gap-3">
                                <button
                                  type="button"
                                  className="font-medium text-brand-500 hover:text-brand-600 disabled:opacity-50"
                                  disabled={
                                    !selectedImages[product.id] || isPending
                                  }
                                  onClick={() => uploadImage(product)}
                                >
                                  {updateProductImage.isPending
                                    ? t('category.uploading')
                                    : t('category.uploadImage')}
                                </button>
                                <button
                                  type="button"
                                  className="font-medium text-error-500 hover:text-error-600 disabled:opacity-50"
                                  disabled={!product.imageUrl || isPending}
                                  onClick={() => removeImage(product)}
                                >
                                  {deleteProductImage.isPending
                                    ? t('category.deleting')
                                    : t('category.deleteImage')}
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start text-sm text-gray-800 dark:text-white/90">
                        {isEditing ? (
                          <input
                            value={form.name}
                            onChange={(event) =>
                              updateForm('name', event.target.value)
                            }
                            className="h-9 w-full rounded-lg border border-gray-300 bg-transparent px-3 text-sm text-gray-800 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                            disabled={isPending}
                          />
                        ) : (
                          product.name
                        )}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start text-sm text-gray-500 dark:text-gray-400">
                        {isEditing ? (
                          <textarea
                            value={form.description}
                            onChange={(event) =>
                              updateForm('description', event.target.value)
                            }
                            className="h-40 w-full rounded-lg border border-gray-300 bg-transparent px-3 text-sm text-gray-800 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                            disabled={isPending}
                          />
                        ) : (
                          <div className={'max-h-[150px] overflow-y-auto'}>
                            <p>{product.description}</p>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start text-sm text-gray-500 dark:text-gray-400">
                        {isEditing ? (
                          <input
                            type="number"
                            min="0"
                            step={0.01}
                            value={form.price}
                            onChange={(event) =>
                              updateForm('price', event.target.value)
                            }
                            className="h-9 w-28 rounded-lg border border-gray-300 bg-transparent px-3 text-sm text-gray-800 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                            disabled={isPending}
                          />
                        ) : (
                          product.price
                        )}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start text-sm text-gray-500 dark:text-gray-400">
                        {isEditing ? (
                          <Checkbox
                            checked={form.isAvailable}
                            onChange={(checked) =>
                              updateForm('isAvailable', checked)
                            }
                            disabled={isPending}
                          />
                        ) : product.isAvailable ? (
                          t('category.yes')
                        ) : (
                          t('category.no')
                        )}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-end text-sm">
                        <div className="flex items-center justify-end gap-3">
                          {isEditing ? (
                            <>
                              <button
                                type="button"
                                className="font-medium text-brand-500 hover:text-brand-600 disabled:opacity-50"
                                disabled={isPending || !canSave}
                                onClick={() => saveProduct(product)}
                              >
                                {t('category.save')}
                              </button>
                              <button
                                type="button"
                                className="font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 dark:hover:text-gray-300"
                                disabled={isPending}
                                onClick={cancelEdit}
                              >
                                {t('category.cancel')}
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                type="button"
                                className="font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 dark:hover:text-gray-300"
                                disabled={isPending}
                                onClick={() => startEdit(product)}
                              >
                                {t('category.edit')}
                              </button>
                              <button
                                type="button"
                                className="font-medium text-error-500 hover:text-error-600 disabled:opacity-50"
                                disabled={isPending}
                                onClick={() => removeProduct(product)}
                              >
                                {t('category.delete')}
                              </button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </ComponentCard>
  );
}
