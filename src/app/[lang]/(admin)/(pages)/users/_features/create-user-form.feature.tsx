'use client';

import ComponentCard from '@/components/common/ComponentCard';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import Button from '@/components/ui/button/Button';
import { useCreateUser } from '@/shared/api/services/users/users.queries';
import { useT } from '@/shared/hooks/use-t/use-t.hook';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

export default function CreateUserFormFeature() {
  const createUser = useCreateUser();
  const t = useT();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const canSubmit = username.trim() && password.length >= 5;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createUser.mutate(
      {
        username: username.trim(),
        password,
      },
      {
        onSuccess() {
          toast.success(t('users.toasts.created'));
          setUsername('');
          setPassword('');
        },
      },
    );
  };

  return (
    <ComponentCard title={t('users.createUser')}>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="user-username">{t('users.username')}</Label>
          <Input
            id="user-username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder={t('users.usernamePlaceholder')}
            disabled={createUser.isPending}
          />
        </div>

        <div>
          <Label htmlFor="user-password">{t('users.password')}</Label>
          <Input
            id="user-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder={t('users.passwordPlaceholder')}
            disabled={createUser.isPending}
          />
          <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
            {t('users.passwordHint')}
          </p>
        </div>

        <div className="flex justify-end">
          <Button size="sm" disabled={createUser.isPending || !canSubmit}>
            {createUser.isPending ? t('users.creating') : t('users.create')}
          </Button>
        </div>
      </form>
    </ComponentCard>
  );
}
