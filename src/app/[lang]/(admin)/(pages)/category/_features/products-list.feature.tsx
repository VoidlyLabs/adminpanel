'use client';

import ComponentCard from '@/components/common/ComponentCard';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Product } from '@/shared/api/services/products/products.model';
import { useDeleteProduct } from '@/shared/api/services/products/products.queries';
import { useT } from '@/shared/hooks/use-t/use-t.hook';
import ImageLoader from '@/shared/ui/image-loader/image-loader';
import toast from 'react-hot-toast';

interface ProductsListFeatureProps {
  products: Product[];
  onEdit: (product: Product) => void;
  editingProductId?: string | null;
}

export default function ProductsListFeature({
  products,
  onEdit,
  editingProductId,
}: ProductsListFeatureProps) {
  const t = useT();
  const deleteProduct = useDeleteProduct();

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
                products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="px-5 py-4 text-start text-sm text-gray-500 dark:text-gray-400">
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
                    </TableCell>
                    <TableCell className="px-5 py-4 text-start text-sm text-gray-800 dark:text-white/90">
                      {product.name}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-start text-sm text-gray-500 dark:text-gray-400">
                      <div className="max-h-[150px] overflow-y-auto">
                        <p>{product.description}</p>
                      </div>
                    </TableCell>
                    <TableCell className="px-5 py-4 text-start text-sm text-gray-500 dark:text-gray-400">
                      {product.price}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-start text-sm text-gray-500 dark:text-gray-400">
                      {product.isAvailable
                        ? t('category.yes')
                        : t('category.no')}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-end text-sm">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          type="button"
                          className="font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 dark:hover:text-gray-300"
                          disabled={deleteProduct.isPending}
                          onClick={() => onEdit(product)}
                        >
                          {editingProductId === product.id
                            ? t('category.editing')
                            : t('category.edit')}
                        </button>
                        <button
                          type="button"
                          className="font-medium text-error-500 hover:text-error-600 disabled:opacity-50"
                          disabled={deleteProduct.isPending}
                          onClick={() => removeProduct(product)}
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
