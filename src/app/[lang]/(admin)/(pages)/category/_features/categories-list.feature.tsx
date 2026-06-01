'use client';

import ComponentCard from '@/components/common/ComponentCard';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Category } from '@/shared/api/services/category/category.model';
import {
  useDeleteCategory,
  useUpdateCategory,
} from '@/shared/api/services/category/category.queries';
import { useT } from '@/shared/hooks/use-t/use-t.hook';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface CategoriesListFeatureProps {
  categories: Category[];
}

export default function CategoriesListFeature({
  categories,
}: CategoriesListFeatureProps) {
  const t = useT();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');

  const startEdit = (category: Category) => {
    setEditingId(category.id);
    setName(category.name);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setName('');
  };

  const saveCategory = (id: string) => {
    updateCategory.mutate(
      { id, name: name.trim() },
      {
        onSuccess() {
          toast.success(t('category.toasts.categoryUpdated'));
          cancelEdit();
        },
      },
    );
  };

  const removeCategory = (category: Category) => {
    if (!window.confirm(t('category.confirmDeleteCategory'))) {
      return;
    }

    deleteCategory.mutate(category.id, {
      onSuccess() {
        toast.success(t('category.toasts.categoryDeleted'));
      },
    });
  };

  const isPending = updateCategory.isPending || deleteCategory.isPending;

  return (
    <ComponentCard title={t('category.categories')}>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  {t('category.name')}
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
              {categories.length === 0 ? (
                <TableRow>
                  <TableCell className="px-5 py-6 text-sm text-gray-500 dark:text-gray-400">
                    {t('category.noCategories')}
                  </TableCell>
                  <TableCell className="px-5 py-6"> </TableCell>
                </TableRow>
              ) : (
                categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="px-5 py-4 text-start text-sm font-medium text-gray-800 dark:text-white/90">
                      {editingId === category.id ? (
                        <input
                          value={name}
                          onChange={(event) => setName(event.target.value)}
                          className="h-9 w-full rounded-lg border border-gray-300 bg-transparent px-3 text-sm text-gray-800 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                          disabled={isPending}
                        />
                      ) : (
                        category.name
                      )}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-end text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center justify-end gap-3">
                        {editingId === category.id ? (
                          <>
                            <button
                              type="button"
                              className="font-medium text-brand-500 hover:text-brand-600 disabled:opacity-50"
                              disabled={isPending || !name.trim()}
                              onClick={() => saveCategory(category.id)}
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
                            <Link
                              href={`/category/${category.id}`}
                              className="font-medium text-brand-500 hover:text-brand-600"
                            >
                              {t('category.open')}
                            </Link>
                            <button
                              type="button"
                              className="font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 dark:hover:text-gray-300"
                              disabled={isPending}
                              onClick={() => startEdit(category)}
                            >
                              {t('category.edit')}
                            </button>
                            <button
                              type="button"
                              className="font-medium text-error-500 hover:text-error-600 disabled:opacity-50"
                              disabled={isPending}
                              onClick={() => removeCategory(category)}
                            >
                              {t('category.delete')}
                            </button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </ComponentCard>
  );
}
