'use client';

import ComponentCard from '@/components/common/ComponentCard';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import Button from '@/components/ui/button/Button';
import { Category } from '@/shared/api/services/category/category.model';
import {
  useCreateCategory,
  useUpdateCategory,
} from '@/shared/api/services/category/category.queries';
import { useT } from '@/shared/hooks/use-t/use-t.hook';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

interface CategoryFormFeatureProps {
  editingCategory?: Category | null;
  onCancelEdit?: () => void;
}

export default function CategoryFormFeature({
  editingCategory,
  onCancelEdit,
}: CategoryFormFeatureProps) {
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const t = useT();

  const [ukName, ukSetName] = useState(editingCategory?.name.uk ?? '');
  const [enName, enSetName] = useState(editingCategory?.name.en ?? '');

  const isEditMode = Boolean(editingCategory);
  const isPending = createCategory.isPending || updateCategory.isPending;
  const canSubmit = Boolean(enName.trim());

  const resetForm = () => {
    enSetName('');
    ukSetName('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (editingCategory) {
      updateCategory.mutate(
        {
          _id: editingCategory._id,
          name: {
            uk: ukName.trim(),
            en: enName.trim(),
          },
        },
        {
          onSuccess() {
            toast.success(t('category.toasts.categoryUpdated'));
            resetForm();
            onCancelEdit?.();
          },
        },
      );

      return;
    }

    createCategory.mutate(
      {
        name: {
          uk: ukName.trim(),
          en: enName.trim(),
        },
      },
      {
        onSuccess() {
          toast.success(t('category.toasts.categoryCreated'));
          resetForm();
        },
      },
    );
  };

  const handleCancel = () => {
    resetForm();

    onCancelEdit?.();
  };

  return (
    <ComponentCard
      title={
        isEditMode ? t('category.editCategory') : t('category.addCategory')
      }
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="category-name-en">
            {t('category.categoryName.en')}
          </Label>
          <Input
            id="category-name-en"
            value={enName}
            onChange={(event) => enSetName(event.target.value)}
            placeholder={t('category.namePlaceholder')}
            disabled={isPending}
          />
        </div>

        <div>
          <Label htmlFor="category-name-uk">
            {t('category.categoryName.uk')}
          </Label>
          <Input
            id="category-name-uk"
            value={ukName}
            onChange={(event) => ukSetName(event.target.value)}
            placeholder={t('category.namePlaceholder')}
            disabled={isPending}
          />
        </div>

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
