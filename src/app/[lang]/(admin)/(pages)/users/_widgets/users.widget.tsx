'use client';

import { BasicUser } from '@/shared/api/services/users/users.model';
import { useUsers } from '@/shared/api/services/users/users.queries';
import FetchProvider from '@/shared/providers/fetch-provider/fetch.provider';
import { useState } from 'react';
import UserFormFeature from '../_features/user-form.feature';
import UsersListFeature from '../_features/users-list.feature';

export default function UsersContent() {
  const users = useUsers();
  const [editingUser, setEditingUser] = useState<BasicUser | null>(null);

  return (
    <FetchProvider
      queryObject={users}
      loaderClassName="min-h-[320px]"
      loaderSize={32}
    >
      {(response) => (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <UsersListFeature
              users={response.data.body}
              editingUserId={editingUser?._id}
              onEdit={setEditingUser}
            />
          </div>

          <UserFormFeature
            key={editingUser?._id ?? 'add-user'}
            editingUser={editingUser}
            onCancelEdit={() => setEditingUser(null)}
          />
        </div>
      )}
    </FetchProvider>
  );
}
