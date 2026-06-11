'use client';

import ComponentCard from '@/components/common/ComponentCard';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import Button from '@/components/ui/button/Button';
import { BasicUser } from '@/shared/api/services/users/users.model';
import {
  useCreateUser,
  useUpdateUser,
} from '@/shared/api/services/users/users.queries';
import { useT } from '@/shared/hooks/use-t/use-t.hook';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

interface UserFormFeatureProps {
  editingUser?: BasicUser | null;
  onCancelEdit?: () => void;
}

export default function UserFormFeature({
  editingUser,
  onCancelEdit,
}: UserFormFeatureProps) {
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const t = useT();

  const [username, setUsername] = useState(editingUser?.username ?? '');
  const [password, setPassword] = useState('');

  const isEditMode = Boolean(editingUser);
  const isPending = createUser.isPending || updateUser.isPending;
  const canSubmit = isEditMode
    ? Boolean(username.trim())
    : Boolean(username.trim() && password.length >= 5);

  const resetForm = () => {
    setUsername('');
    setPassword('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (editingUser) {
      updateUser.mutate(
        {
          _id: editingUser._id,
          username: username.trim(),
        },
        {
          onSuccess() {
            toast.success(t('users.toasts.updated'));
            resetForm();
            onCancelEdit?.();
          },
        },
      );

      return;
    }

    createUser.mutate(
      {
        username: username.trim(),
        password,
      },
      {
        onSuccess() {
          toast.success(t('users.toasts.created'));
          resetForm();
        },
      },
    );
  };

  const handleCancel = () => {
    resetForm();
    onCancelEdit?.();
  };

  return (
    <ComponentCard
      title={isEditMode ? t('users.editUser') : t('users.addUser')}
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="user-username">{t('users.username')}</Label>
          <Input
            id="user-username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder={t('users.usernamePlaceholder')}
            disabled={isPending}
          />
        </div>

        {!isEditMode && (
          <div>
            <Label htmlFor="user-password">{t('users.password')}</Label>
            <Input
              id="user-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder={t('users.passwordPlaceholder')}
              disabled={isPending}
            />
            <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
              {t('users.passwordHint')}
            </p>
          </div>
        )}

        <div className="flex justify-end gap-3">
          {isEditMode && (
            <Button
              size="sm"
              variant="outline"
              type="button"
              disabled={isPending}
              onClick={handleCancel}
            >
              {t('users.cancel')}
            </Button>
          )}
          <Button size="sm" disabled={isPending || !canSubmit}>
            {isPending
              ? isEditMode
                ? t('users.saving')
                : t('users.creating')
              : isEditMode
                ? t('users.save')
                : t('users.add')}
          </Button>
        </div>
      </form>
    </ComponentCard>
  );
}
