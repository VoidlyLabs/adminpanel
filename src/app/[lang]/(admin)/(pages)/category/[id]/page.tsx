'use client';

import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import { useT } from '@/shared/hooks/use-t/use-t.hook';
import { useParams } from 'next/navigation';
import CategoryDetailsContent from './widgets/category-details.widget';

export default function CategoryDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const t = useT();

  return (
    <div>
      <PageBreadcrumb pageTitle={t('category.categoryDetails')} />

      <CategoryDetailsContent categoryId={id} />
    </div>
  );
}
