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
import { useDeleteCategory } from '@/shared/api/services/category/category.queries';
import { useT } from '@/shared/hooks/use-t/use-t.hook';
import { useI18n } from '@/shared/providers/i18n/i18n.context';
import LocalizedLink from '@/shared/ui/localized-link/localized-link';
import toast from 'react-hot-toast';

interface CategoriesListFeatureProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  editingCategoryId?: string | null;
}

export default function CategoriesListFeature({
  categories,
  onEdit,
  editingCategoryId,
}: CategoriesListFeatureProps) {
  const { lang } = useI18n();
  const t = useT();
  const deleteCategory = useDeleteCategory();

  const removeCategory = (category: Category) => {
    if (!window.confirm(t('category.confirmDeleteCategory'))) {
      return;
    }

    deleteCategory.mutate(category._id, {
      onSuccess() {
        toast.success(t('category.toasts.categoryDeleted'));
      },
    });
  };

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
                  {t('category.categoryName.default')}
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
                  <TableRow key={category._id}>
                    <TableCell className="px-5 py-4 text-start text-sm font-medium text-gray-800 dark:text-white/90">
                      {category.name[lang]}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-end text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center justify-end gap-3">
                        <LocalizedLink
                          href={`/category/${category._id}`}
                          className="font-medium text-brand-500 hover:text-brand-600"
                        >
                          {t('category.open')}
                        </LocalizedLink>
                        <button
                          type="button"
                          className="font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 dark:hover:text-gray-300"
                          disabled={deleteCategory.isPending}
                          onClick={() => onEdit(category)}
                        >
                          {editingCategoryId === category._id
                            ? t('category.editing')
                            : t('category.edit')}
                        </button>
                        <button
                          type="button"
                          className="font-medium text-error-500 hover:text-error-600 disabled:opacity-50"
                          disabled={deleteCategory.isPending}
                          onClick={() => removeCategory(category)}
                        >
                          {t('category.delete')}
                        </button>
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
