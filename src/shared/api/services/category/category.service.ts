import { AuthAPI } from '@/shared/api/core/auth/auth-api.instance';
import {
  Category_Create_Request,
  Category_List_Response,
  Category_Response,
  Category_Update_Request,
} from '@/shared/api/services/category/category.model';

export class CategoryService {
  static find(): Promise<Category_List_Response> {
    return AuthAPI.request({
      method: 'GET',
      url: '/common/category',
    });
  }

  static findById(id: string): Promise<Category_Response> {
    return AuthAPI.request({
      method: 'GET',
      url: `/common/category/${id}`,
    });
  }

  static create(data: Category_Create_Request): Promise<Category_Response> {
    return AuthAPI.request({
      method: 'POST',
      url: '/admin/category',
      data,
    });
  }

  static update(data: Category_Update_Request): Promise<Category_Response> {
    const { id, ...body } = data;

    return AuthAPI.request({
      method: 'PATCH',
      url: `/admin/category/${id}`,
      data: body,
    });
  }

  static deleteById(id: string) {
    return AuthAPI.request({
      method: 'DELETE',
      url: `/admin/category/${id}`,
    });
  }
}
