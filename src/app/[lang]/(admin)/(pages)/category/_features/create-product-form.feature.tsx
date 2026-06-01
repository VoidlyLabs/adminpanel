'use client';

import ComponentCard from '@/components/common/ComponentCard';
import Checkbox from '@/components/form/input/Checkbox';
import FileInput from '@/components/form/input/FileInput';
import Input from '@/components/form/input/InputField';
import TextArea from '@/components/form/input/TextArea';
import Label from '@/components/form/Label';
import Button from '@/components/ui/button/Button';
import {
  useCreateProduct,
  useUpdateProductImage,
} from '@/shared/api/services/products/products.queries';
import { useT } from '@/shared/hooks/use-t/use-t.hook';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

interface CreateProductFormFeatureProps {
  categoryId: string;
}

export default function CreateProductFormFeature({
  categoryId,
}: CreateProductFormFeatureProps) {
  const createProduct = useCreateProduct();
  const updateProductImage = useUpdateProductImage();
  const t = useT();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const [image, setImage] = useState<File | null>(null);
  const [fileInputKey, setFileInputKey] = useState(0);

  const numericPrice = Number(price);
  const canSubmit =
    name.trim() &&
    description.trim() &&
    price !== '' &&
    !Number.isNaN(numericPrice) &&
    numericPrice >= 0;

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setIsAvailable(true);
    setImage(null);
    setFileInputKey((key) => key + 1);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createProduct.mutate(
      {
        categoryId,
        name: name.trim(),
        description: description.trim(),
        price: numericPrice,
        isAvailable,
      },
      {
        onSuccess(response) {
          toast.success(t('category.toasts.productCreated'));

          if (!image) {
            resetForm();

            return;
          }

          updateProductImage.mutate(
            {
              id: response.data.body.id,
              image,
            },
            {
              onSuccess() {
                toast.success(t('category.toasts.productImageUploaded'));
                resetForm();
              },
            },
          );
        },
      },
    );
  };

  const isPending = createProduct.isPending || updateProductImage.isPending;

  return (
    <ComponentCard title={t('category.createProduct')}>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="product-name">{t('category.productName')}</Label>
          <Input
            id="product-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={t('category.productNamePlaceholder')}
            disabled={isPending}
          />
        </div>

        <div>
          <Label>{t('category.description')}</Label>
          <TextArea
            value={description}
            onChange={setDescription}
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

        <div className="flex justify-end">
          <Button size="sm" disabled={isPending || !canSubmit}>
            {isPending ? t('category.creating') : t('category.create')}
          </Button>
        </div>
      </form>
    </ComponentCard>
  );
}
