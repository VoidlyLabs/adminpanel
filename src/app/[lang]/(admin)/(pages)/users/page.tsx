'use client';

import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import { useT } from '@/shared/hooks/use-t/use-t.hook';
import UsersContent from './_widgets/users.widget';

export default function UsersPage() {
  const t = useT();

  return (
    <div>
      <PageBreadcrumb pageTitle={t('users.title')} />

      <UsersContent />
    </div>
  );
}
