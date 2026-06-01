'use client';

import { useUsers } from '@/shared/api/services/users/users.queries';
import FetchProvider from '@/shared/providers/fetch-provider/fetch.provider';
import CreateUserFormFeature from '../_features/create-user-form.feature';
import UsersListFeature from '../_features/users-list.feature';

export default function UsersContent() {
  const users = useUsers();

  return (
    <FetchProvider
      queryObject={users}
      loaderClassName="min-h-[320px]"
      loaderSize={32}
    >
      {(response) => (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <UsersListFeature users={response.data.body} />
          </div>

          <CreateUserFormFeature />
        </div>
      )}
    </FetchProvider>
  );
}
