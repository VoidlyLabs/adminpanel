import { AuthAPI } from '@/shared/api/core/auth/auth-api.instance';
import { BasicAPIResponse } from '@/shared/api/core/basic/basic.models';
import {
  BasicUser,
  User_Create_Request,
  User_Update_Request,
} from '@/shared/api/services/users/users.model';
import { AxiosResponse } from 'axios';

export type Users_Response = AxiosResponse<BasicAPIResponse<BasicUser[]>>;
export type User_Response = AxiosResponse<BasicAPIResponse<BasicUser>>;

export class UsersService {
  static find(): Promise<Users_Response> {
    return AuthAPI.request({
      method: 'GET',
      url: '/admin/users',
    });
  }

  static create(data: User_Create_Request): Promise<User_Response> {
    return AuthAPI.request({
      method: 'POST',
      url: '/admin/users',
      data,
    });
  }

  static update(data: User_Update_Request): Promise<User_Response> {
    const { _id, ...body } = data;

    return AuthAPI.request({
      method: 'PATCH',
      url: `/admin/users/${_id}`,
      data: body,
    });
  }

  static deleteById(id: string) {
    return AuthAPI.request({
      method: 'DELETE',
      url: `/admin/users/${id}`,
    });
  }
}
