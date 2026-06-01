import { AuthAPI } from '@/shared/api/core/auth/auth-api.instance';
import {
  Configuration_Response,
  Configuration_Update_Request,
  Configuration_UpdateLogo_Request,
} from '@/shared/api/services/configuration/configuration.model';

export class ConfigurationService {
  static get(): Promise<Configuration_Response> {
    return AuthAPI.request({
      method: 'GET',
      url: '/admin/configuration',
    });
  }

  static update(data: Configuration_Update_Request) {
    return AuthAPI.request({
      method: 'PATCH',
      url: '/admin/configuration',
      data,
    });
  }

  static updateLogo(data: Configuration_UpdateLogo_Request) {
    const formData = new FormData();

    formData.append('logo', data.logo);

    return AuthAPI.request({
      method: 'POST',
      url: '/admin/configuration/logo',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  static deleteLogo() {
    return AuthAPI.request({
      method: 'DELETE',
      url: '/admin/configuration/logo',
    });
  }
}
