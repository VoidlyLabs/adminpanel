'use client';

import ComponentCard from '@/components/common/ComponentCard';
import Input from '@/components/form/input/InputField';
import TextArea from '@/components/form/input/TextArea';
import Label from '@/components/form/Label';
import Button from '@/components/ui/button/Button';
import { useUpdateConfiguration } from '@/shared/api/services/configuration/configuration.queries';
import {
  BasicConfiguration,
  Configuration_Update_Request,
} from '@/shared/api/services/configuration/configuration.model';
import { useT } from '@/shared/hooks/use-t/use-t.hook';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import debounce from 'debounce';

interface ConfigurationFormFeatureProps {
  configuration: BasicConfiguration;
}

export default function ConfigurationFormFeature({
  configuration,
}: ConfigurationFormFeatureProps) {
  const updateConfiguration = useUpdateConfiguration();
  const t = useT();

  const [form, setForm] = useState<Configuration_Update_Request | null>(null);

  const currentConfiguration = {
    name: form?.name ?? configuration.name,
    description: form?.description ?? configuration.description,
    accentColor: form?.accentColor ?? configuration.accentColor,
    backgroundColor: form?.backgroundColor ?? configuration.backgroundColor,
    secondaryColor: form?.secondaryColor ?? configuration.secondaryColor,
    phoneNumber: form?.phoneNumber ?? configuration.phoneNumber,
    email: form?.email ?? configuration.email,
  };

  const setField = <Key extends keyof Configuration_Update_Request>(
    key: Key,
    value: Configuration_Update_Request[Key],
  ) => {
    setForm((previousForm) => ({
      ...(previousForm ?? {}),
      [key]: value,
    }));
  };

  const isHexColor = (color: string) => /^#[\da-f]{6}$/i.test(color);

  const getColorPickerValue = (color: string) =>
    isHexColor(color) ? color : '#000000';

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateConfiguration.mutate(
      {
        ...currentConfiguration,
      },
      {
        onSuccess() {
          toast.success(t('configuration.toasts.updated'));
          setForm(null);
        },
      },
    );
  };

  const handleColorChange = debounce(
    (key: keyof Configuration_Update_Request, value: string) => {
      setField(key, value);
    },
    250,
  );

  return (
    <ComponentCard title={t('configuration.basicInformation')}>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="configuration-name">{t('configuration.name')}</Label>
          <Input
            id="configuration-name"
            value={currentConfiguration.name}
            onChange={(event) => setField('name', event.target.value)}
            placeholder={t('configuration.namePlaceholder')}
            disabled={updateConfiguration.isPending}
          />
        </div>

        <div>
          <Label>{t('configuration.description')}</Label>
          <TextArea
            value={currentConfiguration.description}
            onChange={(value) => setField('description', value)}
            placeholder={t('configuration.descriptionPlaceholder')}
            rows={6}
            disabled={updateConfiguration.isPending}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <Label htmlFor="configuration-accent-color">
              {t('configuration.accentColor')}
            </Label>
            <div className="grid grid-cols-[44px_1fr] items-center gap-3">
              <input
                type="color"
                value={getColorPickerValue(currentConfiguration.accentColor)}
                onChange={(event) =>
                  handleColorChange('accentColor', event.target.value)
                }
                disabled={updateConfiguration.isPending}
                aria-label={t('configuration.accentColor')}
                className="size-11 cursor-pointer rounded-lg border border-gray-200 bg-transparent p-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700"
              />
              <Input
                id="configuration-accent-color"
                value={currentConfiguration.accentColor}
                onChange={(event) =>
                  handleColorChange('accentColor', event.target.value)
                }
                placeholder={t('configuration.colorPlaceholder')}
                disabled={updateConfiguration.isPending}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="configuration-background-color">
              {t('configuration.backgroundColor')}
            </Label>
            <div className="grid grid-cols-[44px_1fr] items-center gap-3">
              <input
                type="color"
                value={getColorPickerValue(
                  currentConfiguration.backgroundColor,
                )}
                onChange={(event) =>
                  handleColorChange('backgroundColor', event.target.value)
                }
                disabled={updateConfiguration.isPending}
                aria-label={t('configuration.backgroundColor')}
                className="size-11 cursor-pointer rounded-lg border border-gray-200 bg-transparent p-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700"
              />
              <Input
                id="configuration-background-color"
                value={currentConfiguration.backgroundColor}
                onChange={(event) =>
                  handleColorChange('backgroundColor', event.target.value)
                }
                placeholder={t('configuration.colorPlaceholder')}
                disabled={updateConfiguration.isPending}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="configuration-secondary-color">
              {t('configuration.secondaryColor')}
            </Label>
            <div className="grid grid-cols-[44px_1fr] items-center gap-3">
              <input
                type="color"
                value={getColorPickerValue(currentConfiguration.secondaryColor)}
                onChange={(event) =>
                  handleColorChange('secondaryColor', event.target.value)
                }
                disabled={updateConfiguration.isPending}
                aria-label={t('configuration.secondaryColor')}
                className="size-11 cursor-pointer rounded-lg border border-gray-200 bg-transparent p-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700"
              />
              <Input
                id="configuration-secondary-color"
                value={currentConfiguration.secondaryColor}
                onChange={(event) =>
                  handleColorChange('secondaryColor', event.target.value)
                }
                placeholder={t('configuration.colorPlaceholder')}
                disabled={updateConfiguration.isPending}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <Label htmlFor="configuration-phone-number">
              {t('configuration.phoneNumber')}
            </Label>
            <Input
              id="configuration-phone-number"
              value={currentConfiguration.phoneNumber}
              onChange={(event) => setField('phoneNumber', event.target.value)}
              placeholder={t('configuration.phoneNumberPlaceholder')}
              disabled={updateConfiguration.isPending}
            />
          </div>

          <div>
            <Label htmlFor="configuration-email">
              {t('configuration.email')}
            </Label>
            <Input
              id="configuration-email"
              type="email"
              value={currentConfiguration.email}
              onChange={(event) => setField('email', event.target.value)}
              placeholder={t('configuration.emailPlaceholder')}
              disabled={updateConfiguration.isPending}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button size="sm" disabled={updateConfiguration.isPending}>
            {updateConfiguration.isPending
              ? t('configuration.saving')
              : t('configuration.saveChanges')}
          </Button>
        </div>
      </form>
    </ComponentCard>
  );
}
