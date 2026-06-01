'use client';

import ComponentCard from '@/components/common/ComponentCard';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import Button from '@/components/ui/button/Button';
import { useCreateCategory } from '@/shared/api/services/category/category.queries';
import { useT } from '@/shared/hooks/use-t/use-t.hook';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

export default function CreateCategoryFormFeature() {
  const createCategory = useCreateCategory();
  const t = useT();

  const [name, setName] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createCategory.mutate(
      {
        name: name.trim(),
      },
      {
        onSuccess() {
          toast.success(t('category.toasts.categoryCreated'));
          setName('');
        },
      },
    );
  };

  return (
    <ComponentCard title={t('category.createCategory')}>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="category-name">{t('category.name')}</Label>
          <Input
            id="category-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={t('category.namePlaceholder')}
            disabled={createCategory.isPending}
          />
        </div>

        <div className="flex justify-end">
          <Button size="sm" disabled={createCategory.isPending || !name.trim()}>
            {createCategory.isPending
              ? t('category.creating')
              : t('category.create')}
          </Button>
        </div>
      </form>
    </ComponentCard>
  );
}
