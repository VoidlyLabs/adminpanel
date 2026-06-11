'use client';

import ComponentCard from '@/components/common/ComponentCard';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { BasicUser } from '@/shared/api/services/users/users.model';
import { useDeleteUser } from '@/shared/api/services/users/users.queries';
import { useT } from '@/shared/hooks/use-t/use-t.hook';
import toast from 'react-hot-toast';

interface UsersListFeatureProps {
  users: BasicUser[];
  onEdit: (user: BasicUser) => void;
  editingUserId?: string | null;
}

export default function UsersListFeature({
  users,
  onEdit,
  editingUserId,
}: UsersListFeatureProps) {
  const deleteUser = useDeleteUser();
  const t = useT();

  const removeUser = (user: BasicUser) => {
    if (!window.confirm(t('users.confirmDelete'))) {
      return;
    }

    deleteUser.mutate(user._id, {
      onSuccess() {
        toast.success(t('users.toasts.deleted'));
      },
    });
  };

  return (
    <ComponentCard title={t('users.list')}>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  {t('users.username')}
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  {t('users.createdAt')}
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-end text-theme-xs dark:text-gray-400"
                >
                  {t('users.actions')}
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {users.length === 0 ? (
                <TableRow>
                  <TableCell className="px-5 py-6 text-sm text-gray-500 dark:text-gray-400">
                    {t('users.noUsers')}
                  </TableCell>
                  <TableCell className="px-5 py-6"> </TableCell>
                  <TableCell className="px-5 py-6"> </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell className="px-5 py-4 text-start text-sm font-medium text-gray-800 dark:text-white/90">
                      {user.username}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-start text-sm text-gray-500 dark:text-gray-400">
                      {new Date(user.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-end text-sm">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          type="button"
                          className="font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 dark:hover:text-gray-300"
                          disabled={deleteUser.isPending}
                          onClick={() => onEdit(user)}
                        >
                          {editingUserId === user._id
                            ? t('users.editing')
                            : t('users.edit')}
                        </button>
                        <button
                          type="button"
                          className="font-medium text-error-500 hover:text-error-600 disabled:opacity-50"
                          disabled={deleteUser.isPending}
                          onClick={() => removeUser(user)}
                        >
                          {t('users.delete')}
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </ComponentCard>
  );
}
