'use client';

import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import { useT } from '@/shared/hooks/use-t/use-t.hook';
import CategoryContent from './_widgets/category.widget';

export default function CategoryPage() {
  const t = useT();

  return (
    <div>
      <PageBreadcrumb pageTitle={t('category.title')} />

      <CategoryContent />
    </div>
  );
}
