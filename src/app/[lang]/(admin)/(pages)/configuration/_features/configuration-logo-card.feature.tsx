'use client';

import ComponentCard from '@/components/common/ComponentCard';
import FileInput from '@/components/form/input/FileInput';
import Label from '@/components/form/Label';
import Button from '@/components/ui/button/Button';
import {
  useDeleteConfigurationLogo,
  useUpdateConfigurationLogo,
} from '@/shared/api/services/configuration/configuration.queries';
import { BasicConfiguration } from '@/shared/api/services/configuration/configuration.model';
import { useT } from '@/shared/hooks/use-t/use-t.hook';
import ImageLoader from '@/shared/ui/image-loader/image-loader';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface ConfigurationLogoCardProps {
  configuration: BasicConfiguration;
}

export default function ConfigurationLogoCardFeature({
  configuration,
}: ConfigurationLogoCardProps) {
  const updateConfigurationLogo = useUpdateConfigurationLogo();
  const deleteConfigurationLogo = useDeleteConfigurationLogo();
  const t = useT();

  const [logo, setLogo] = useState<File | null>(null);
  const [fileInputKey, setFileInputKey] = useState(0);

  const isPending =
    updateConfigurationLogo.isPending || deleteConfigurationLogo.isPending;

  const resetLogoInput = () => {
    setLogo(null);
    setFileInputKey((key) => key + 1);
  };

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedLogo = event.target.files?.[0];

    if (!selectedLogo) {
      return;
    }

    setLogo(selectedLogo);
  };

  const handleUpdateLogo = () => {
    if (!logo) {
      return;
    }

    updateConfigurationLogo.mutate(
      {
        logo,
      },
      {
        onSuccess() {
          toast.success(t('configuration.toasts.logoUploaded'));
          resetLogoInput();
        },
      },
    );
  };

  const handleDeleteLogo = () => {
    deleteConfigurationLogo.mutate(undefined, {
      onSuccess() {
        toast.success(t('configuration.toasts.logoDeleted'));
        resetLogoInput();
      },
    });
  };

  return (
    <ComponentCard title={t('configuration.logo')}>
      <div className="space-y-5">
        <div className="flex h-36 w-full items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
          {configuration.logoUrl ? (
            <ImageLoader
              src={configuration.logoUrl}
              alt={`${configuration.name} ${t('configuration.logoAltSuffix')}`}
              className="h-full w-full object-contain"
              width={500}
              height={500}
            />
          ) : (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {t('configuration.noLogoUploaded')}
            </span>
          )}
        </div>

        <div>
          <Label>{t('configuration.uploadLogo')}</Label>
          <FileInput key={fileInputKey} onChange={handleLogoChange} />
          {logo && (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {t('configuration.selectedFilePrefix')}: {logo.name}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            size="sm"
            className="w-full sm:w-auto"
            disabled={!logo || isPending}
            onClick={handleUpdateLogo}
          >
            {updateConfigurationLogo.isPending
              ? t('configuration.uploading')
              : t('configuration.uploadLogo')}
          </Button>

          <Button
            size="sm"
            variant="outline"
            className="w-full sm:w-auto"
            disabled={!configuration.logoUrl || isPending}
            onClick={handleDeleteLogo}
          >
            {deleteConfigurationLogo.isPending
              ? t('configuration.deleting')
              : t('configuration.deleteLogo')}
          </Button>
        </div>
      </div>
    </ComponentCard>
  );
}
