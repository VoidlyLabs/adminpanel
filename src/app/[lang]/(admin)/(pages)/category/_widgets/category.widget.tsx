'use client';

import { Category } from '@/shared/api/services/category/category.model';
import { useCategories } from '@/shared/api/services/category/category.queries';
import FetchProvider from '@/shared/providers/fetch-provider/fetch.provider';
import { useState } from 'react';
import CategoriesListFeature from '../_features/categories-list.feature';
import CategoryFormFeature from '../_features/category-form.feature';

export default function CategoryContent() {
  const categories = useCategories();
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  return (
    <FetchProvider
      queryObject={categories}
      loaderClassName="min-h-[320px]"
      loaderSize={32}
    >
      {(response) => (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <CategoriesListFeature
              categories={response.data.body}
              editingCategoryId={editingCategory?.id}
              onEdit={setEditingCategory}
            />
          </div>

          <CategoryFormFeature
            key={editingCategory?.id ?? 'add-category'}
            editingCategory={editingCategory}
            onCancelEdit={() => setEditingCategory(null)}
          />
        </div>
      )}
    </FetchProvider>
  );
}
