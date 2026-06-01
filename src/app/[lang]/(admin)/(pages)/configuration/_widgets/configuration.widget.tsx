'use client';

import ConfigurationBasicInformationForm from '../_features/configuration-form.feature';
import ConfigurationLogoCard from '../_features/configuration-logo-card.feature';
import { useConfiguration } from '@/shared/api/services/configuration/configuration.queries';
import { BasicConfiguration } from '@/shared/api/services/configuration/configuration.model';
import FetchProvider from '@/shared/providers/fetch-provider/fetch.provider';

export default function ConfigurationContent() {
  const configuration = useConfiguration();

  return (
    <FetchProvider
      queryObject={configuration}
      loaderClassName="min-h-[320px]"
      loaderSize={32}
    >
      {(response) => {
        const data: BasicConfiguration = response.data.body;

        return (
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <ConfigurationBasicInformationForm configuration={data} />
            </div>

            <ConfigurationLogoCard configuration={data} />
          </div>
        );
      }}
    </FetchProvider>
  );
}
