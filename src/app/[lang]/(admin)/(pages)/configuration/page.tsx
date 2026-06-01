'use client';

import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import { useT } from '@/shared/hooks/use-t/use-t.hook';
import ConfigurationContent from './_widgets/configuration.widget';

export default function ConfigurationPage() {
  const t = useT();

  return (
    <div>
      <PageBreadcrumb pageTitle={t('configuration.title')} />

      <ConfigurationContent />
    </div>
  );
}
