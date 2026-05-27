import React from 'react';
import { OwnUserContext } from '@/shared/providers/own-user/own-user.context';
import { useMe } from '@/shared/api/services/auth/auth.queries';
import FetchProvider from '@/shared/providers/fetch-provider/fetch.provider';

export interface OwnUserProviderProps {
  children?: React.ReactNode;
}

const OwnUserProvider = ({ children }: OwnUserProviderProps) => {
  const data = useMe();

  return (
    <FetchProvider
      loaderClassName={'!h-screen'}
      loaderSize={32}
      queryObject={data}
    >
      {(response) => {
        return (
          <OwnUserContext.Provider value={response.data.body.user}>
            {children}
          </OwnUserContext.Provider>
        );
      }}
    </FetchProvider>
  );
};

export default OwnUserProvider;
