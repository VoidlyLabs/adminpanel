import { BasicAPIResponse } from '@/shared/api/core/basic/basic.models';
import { AxiosResponse } from 'axios';

export interface Product {
  id: string;
  categoryId: string;
  name: {
    uk?: string;
    en?: string;
  };
  description: {
    uk?: string;
    en?: string;
  };
  price: number;
  isAvailable: boolean;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

// Requests

export type Product_Create_Request = Pick<
  Product,
  'categoryId' | 'name' | 'description' | 'price' | 'isAvailable'
>;
export type Product_Update_Request = Pick<Product, 'id'> &
  Partial<
    Pick<
      Product,
      'categoryId' | 'name' | 'description' | 'price' | 'isAvailable'
    >
  >;
export interface Product_UpdateImage_Request {
  id: string;
  image: File;
}

// Responses

export type Product_Response = AxiosResponse<BasicAPIResponse<Product>>;
export type Product_List_Response = AxiosResponse<BasicAPIResponse<Product[]>>;
