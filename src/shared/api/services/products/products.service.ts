import { AuthAPI } from '@/shared/api/core/auth/auth-api.instance';
import {
  Product_Create_Request,
  Product_List_Response,
  Product_Response,
  Product_UpdateImage_Request,
  Product_Update_Request,
} from '@/shared/api/services/products/products.model';

export class ProductsService {
  static find(): Promise<Product_List_Response> {
    return AuthAPI.request({
      method: 'GET',
      url: '/admin/products',
    });
  }

  static create(data: Product_Create_Request): Promise<Product_Response> {
    return AuthAPI.request({
      method: 'POST',
      url: '/admin/products',
      data,
    });
  }

  static update(data: Product_Update_Request): Promise<Product_Response> {
    const { id, ...body } = data;

    return AuthAPI.request({
      method: 'PATCH',
      url: `/admin/products/${id}`,
      data: body,
    });
  }

  static updateImage(
    data: Product_UpdateImage_Request,
  ): Promise<Product_Response> {
    const formData = new FormData();

    formData.append('image', data.image);

    return AuthAPI.request({
      method: 'POST',
      url: `/admin/products/${data.id}/image`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  static deleteImage(id: string): Promise<Product_Response> {
    return AuthAPI.request({
      method: 'DELETE',
      url: `/admin/products/${id}/image`,
    });
  }

  static deleteById(id: string) {
    return AuthAPI.request({
      method: 'DELETE',
      url: `/admin/products/${id}`,
    });
  }
}
