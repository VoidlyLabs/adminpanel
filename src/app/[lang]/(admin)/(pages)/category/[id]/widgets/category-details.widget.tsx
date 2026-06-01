'use client';

import ComponentCard from '@/components/common/ComponentCard';
import { useCategory } from '@/shared/api/services/category/category.queries';
import { useProducts } from '@/shared/api/services/products/products.queries';
import { useT } from '@/shared/hooks/use-t/use-t.hook';
import FetchProvider from '@/shared/providers/fetch-provider/fetch.provider';
import CreateProductFormFeature from '../../_features/create-product-form.feature';
import ProductsListFeature from '../../_features/products-list.feature';

interface CategoryDetailsContentProps {
  categoryId: string;
}

export default function CategoryDetailsContent({
  categoryId,
}: CategoryDetailsContentProps) {
  const category = useCategory(categoryId);
  const products = useProducts();
  const t = useT();

  return (
    <FetchProvider
      queryObject={category}
      loaderClassName="min-h-[320px]"
      loaderSize={32}
    >
      {(response) => (
        <FetchProvider
          queryObject={products}
          loaderClassName="min-h-[320px]"
          loaderSize={32}
        >
          {(productsResponse) => {
            const categoryProducts = productsResponse.data.body.filter(
              (product) => product.categoryId === categoryId,
            );

            return (
              <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                <div className="space-y-6 xl:col-span-2">
                  <ProductsListFeature products={categoryProducts} />
                  <CreateProductFormFeature categoryId={categoryId} />
                </div>

                <ComponentCard title={t('category.selectedCategory')}>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t('category.name')}
                    </p>
                    <p className="mt-1 text-base font-medium text-gray-800 dark:text-white/90">
                      {response.data.body.name}
                    </p>
                  </div>
                </ComponentCard>
              </div>
            );
          }}
        </FetchProvider>
      )}
    </FetchProvider>
  );
}
