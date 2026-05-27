import { AuthAPI } from '@/shared/api/core/auth/auth-api.instance';
import {
  Auth_Me_Response,
  Auth_SignIn_Request,
} from '@/shared/api/services/auth/auth.model';

export class AuthService {
  static signIn(data: Auth_SignIn_Request) {
    return AuthAPI.request({
      method: 'POST',
      url: '/admin/auth/sign-in',
      data,
    });
  }

  static signOut() {
    return AuthAPI.request({
      method: 'POST',
      url: '/admin/auth/sign-out',
    });
  }

  static getMe(): Promise<Auth_Me_Response> {
    return AuthAPI.request({
      method: 'GET',
      url: '/admin/auth/me',
    });
  }
}
