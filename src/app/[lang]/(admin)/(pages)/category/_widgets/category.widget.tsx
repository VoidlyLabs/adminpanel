'use client';

import { useCategories } from '@/shared/api/services/category/category.queries';
import FetchProvider from '@/shared/providers/fetch-provider/fetch.provider';
import CategoriesListFeature from '../_features/categories-list.feature';
import CreateCategoryFormFeature from '../_features/create-category-form.feature';

export default function CategoryContent() {
  const categories = useCategories();

  return (
    <FetchProvider
      queryObject={categories}
      loaderClassName="min-h-[320px]"
      loaderSize={32}
    >
      {(response) => (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <CategoriesListFeature categories={response.data.body} />
          </div>

          <CreateCategoryFormFeature />
        </div>
      )}
    </FetchProvider>
  );
}
