'use client';

import ComponentCard from '@/components/common/ComponentCard';
import Checkbox from '@/components/form/input/Checkbox';
import FileInput from '@/components/form/input/FileInput';
import Input from '@/components/form/input/InputField';
import TextArea from '@/components/form/input/TextArea';
import Label from '@/components/form/Label';
import Button from '@/components/ui/button/Button';
import { Product } from '@/shared/api/services/products/products.model';
import {
  useCreateProduct,
  useDeleteProductImage,
  useUpdateProduct,
  useUpdateProductImage,
} from '@/shared/api/services/products/products.queries';
import { useT } from '@/shared/hooks/use-t/use-t.hook';
import ImageLoader from '@/shared/ui/image-loader/image-loader';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

interface ProductFormFeatureProps {
  categoryId: string;
  editingProduct?: Product | null;
  onCancelEdit?: () => void;
}

export default function ProductFormFeature({
  categoryId,
  editingProduct,
  onCancelEdit,
}: ProductFormFeatureProps) {
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const updateProductImage = useUpdateProductImage();
  const deleteProductImage = useDeleteProductImage();
  const t = useT();

  const [ukName, ukSetName] = useState(editingProduct?.name.uk ?? '');
  const [enName, enSetName] = useState(editingProduct?.name.en ?? '');
  const [enDescription, enSetDescription] = useState(
    editingProduct?.description.en ?? '',
  );
  const [ukDescription, ukSetDescription] = useState(
    editingProduct?.description.uk ?? '',
  );
  const [price, setPrice] = useState(
    editingProduct ? String(editingProduct.price) : '',
  );
  const [isAvailable, setIsAvailable] = useState(
    editingProduct?.isAvailable ?? true,
  );
  const [currentImageUrl, setCurrentImageUrl] = useState(
    editingProduct?.imageUrl ?? '',
  );
  const [image, setImage] = useState<File | null>(null);
  const [fileInputKey, setFileInputKey] = useState(0);

  const isEditMode = Boolean(editingProduct);
  const numericPrice = Number(price);
  const canSubmit =
    enName.trim() &&
    enDescription.trim() &&
    price !== '' &&
    !Number.isNaN(numericPrice) &&
    numericPrice >= 0;
  const isPending =
    createProduct.isPending ||
    updateProduct.isPending ||
    updateProductImage.isPending ||
    deleteProductImage.isPending;

  const resetForm = () => {
    enSetName('');
    ukSetName('');
    enSetDescription('');
    ukSetDescription('');
    setPrice('');
    setIsAvailable(true);
    setImage(null);
    setFileInputKey((key) => key + 1);
  };

  const finishEdit = () => {
    resetForm();
    onCancelEdit?.();
  };

  const uploadSelectedImage = (productId: string, onSuccess: () => void) => {
    if (!image) {
      onSuccess();

      return;
    }

    updateProductImage.mutate(
      {
        id: productId,
        image,
      },
      {
        onSuccess() {
          toast.success(t('category.toasts.productImageUploaded'));
          onSuccess();
        },
      },
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (editingProduct) {
      updateProduct.mutate(
        {
          id: editingProduct.id,
          categoryId,
          name: {
            uk: ukName,
            en: enName,
          },
          description: {
            uk: ukDescription.trim(),
            en: enDescription.trim(),
          },
          price: numericPrice,
          isAvailable,
        },
        {
          onSuccess() {
            toast.success(t('category.toasts.productUpdated'));
            uploadSelectedImage(editingProduct.id, finishEdit);
          },
        },
      );

      return;
    }

    createProduct.mutate(
      {
        categoryId,
        name: {
          uk: ukName.trim(),
          en: enName.trim(),
        },
        description: {
          uk: ukDescription.trim(),
          en: enDescription.trim(),
        },
        price: numericPrice,
        isAvailable,
      },
      {
        onSuccess(response) {
          toast.success(t('category.toasts.productCreated'));
          uploadSelectedImage(response.data.body.id, resetForm);
        },
      },
    );
  };

  const handleCancel = () => {
    resetForm();
    onCancelEdit?.();
  };

  const handleDeleteImage = () => {
    if (!editingProduct || !currentImageUrl) {
      return;
    }

    deleteProductImage.mutate(editingProduct.id, {
      onSuccess() {
        toast.success(t('category.toasts.productImageDeleted'));
        setCurrentImageUrl('');
        setImage(null);
        setFileInputKey((key) => key + 1);
      },
    });
  };

  return (
    <ComponentCard
      title={isEditMode ? t('category.editProduct') : t('category.addProduct')}
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="product-name">{t('category.productName.en')}</Label>
          <Input
            id="product-name"
            value={enName}
            onChange={(event) => enSetName(event.target.value)}
            placeholder={t('category.productNamePlaceholder')}
            disabled={isPending}
          />
        </div>

        <div>
          <Label htmlFor="product-name">{t('category.productName.uk')}</Label>
          <Input
            id="product-name"
            value={ukName}
            onChange={(event) => ukSetName(event.target.value)}
            placeholder={t('category.productNamePlaceholder')}
            disabled={isPending}
          />
        </div>

        <div>
          <Label>{t('category.description.en')}</Label>
          <TextArea
            value={enDescription}
            onChange={enSetDescription}
            placeholder={t('category.descriptionPlaceholder')}
            rows={5}
            disabled={isPending}
          />
        </div>

        <div>
          <Label>{t('category.description.uk')}</Label>
          <TextArea
            value={ukDescription}
            onChange={ukSetDescription}
            placeholder={t('category.descriptionPlaceholder')}
            rows={5}
            disabled={isPending}
          />
        </div>

        <div>
          <Label htmlFor="product-price">{t('category.price')}</Label>
          <Input
            id="product-price"
            type="number"
            min="0"
            step={0.01}
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            placeholder={t('category.pricePlaceholder')}
            disabled={isPending}
          />
        </div>

        <div>
          <Label>{t('category.image')}</Label>
          {currentImageUrl && editingProduct && (
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
                <ImageLoader
                  src={currentImageUrl}
                  alt={editingProduct.name.en}
                  width={120}
                  height={120}
                  className="h-full w-full object-cover"
                />
              </div>
              <button
                type="button"
                className="text-sm font-medium text-error-500 hover:text-error-600 disabled:opacity-50"
                disabled={isPending}
                onClick={handleDeleteImage}
              >
                {deleteProductImage.isPending
                  ? t('category.deleting')
                  : t('category.deleteImage')}
              </button>
            </div>
          )}
          <FileInput
            key={fileInputKey}
            onChange={(event) => setImage(event.target.files?.[0] ?? null)}
            disabled={isPending}
          />
          {image && (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {image.name}
            </p>
          )}
        </div>

        <Checkbox
          id="product-is-available"
          checked={isAvailable}
          onChange={setIsAvailable}
          label={t('category.isAvailable')}
          disabled={isPending}
        />

        <div className="flex justify-end gap-3">
          {isEditMode && (
            <Button
              size="sm"
              variant="outline"
              type="button"
              disabled={isPending}
              onClick={handleCancel}
            >
              {t('category.cancel')}
            </Button>
          )}
          <Button size="sm" disabled={isPending || !canSubmit}>
            {isPending
              ? isEditMode
                ? t('category.saving')
                : t('category.creating')
              : isEditMode
                ? t('category.save')
                : t('category.add')}
          </Button>
        </div>
      </form>
    </ComponentCard>
  );
}
