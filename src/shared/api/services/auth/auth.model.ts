// Requests

import { BasicUser } from '@/shared/api/services/users/users.model';
import { BasicAPIResponse } from '@/shared/api/core/basic';
import { AxiosResponse } from 'axios';

export interface Auth_SignIn_Request {
  username: string;
  password: string;
}

// Responses

export interface Auth_SignIn_Response {}

export type Auth_Me_Response = AxiosResponse<
  BasicAPIResponse<{
    user: BasicUser;
  }>
>;
