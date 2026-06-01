'use client';

import ComponentCard from '@/components/common/ComponentCard';
import Input from '@/components/form/input/InputField';
import TextArea from '@/components/form/input/TextArea';
import Label from '@/components/form/Label';
import Button from '@/components/ui/button/Button';
import { useUpdateConfiguration } from '@/shared/api/services/configuration/configuration.queries';
import { BasicConfiguration } from '@/shared/api/services/configuration/configuration.model';
import { useT } from '@/shared/hooks/use-t/use-t.hook';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

interface ConfigurationFormFeatureProps {
  configuration: BasicConfiguration;
}

export default function ConfigurationFormFeature({
  configuration,
}: ConfigurationFormFeatureProps) {
  const updateConfiguration = useUpdateConfiguration();
  const t = useT();

  const [name, setName] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);

  const currentName = name ?? configuration.name;
  const currentDescription = description ?? configuration.description;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateConfiguration.mutate(
      {
        name: currentName,
        description: currentDescription,
      },
      {
        onSuccess() {
          toast.success(t('configuration.toasts.updated'));
          setName(null);
          setDescription(null);
        },
      },
    );
  };

  return (
    <ComponentCard title={t('configuration.basicInformation')}>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="configuration-name">{t('configuration.name')}</Label>
          <Input
            id="configuration-name"
            value={currentName}
            onChange={(event) => setName(event.target.value)}
            placeholder={t('configuration.namePlaceholder')}
            disabled={updateConfiguration.isPending}
          />
        </div>

        <div>
          <Label>{t('configuration.description')}</Label>
          <TextArea
            value={currentDescription}
            onChange={setDescription}
            placeholder={t('configuration.descriptionPlaceholder')}
            rows={6}
            disabled={updateConfiguration.isPending}
          />
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
