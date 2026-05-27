import { createContext, useContext } from 'react';
import { BasicUser } from '@/shared/api/services/users/users.model';

export type OwnUserContextProps = BasicUser;

export const OwnUserContext = createContext<OwnUserContextProps>(
  {} as OwnUserContextProps,
);

export const useOwnUser = () => useContext(OwnUserContext);
