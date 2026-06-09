import { BasicAPIResponse } from '@/shared/api/core/basic/basic.models';
import { AxiosResponse } from 'axios';

export interface Category {
  _id: string;
  name: {
    uk?: string;
    en?: string;
  };
  createdAt: string;
  updatedAt: string;
}

// Requests

export type Category_Create_Request = Pick<Category, 'name'>;
export type Category_Update_Request = Pick<Category, '_id' | 'name'>;

// Responses

export type Category_Response = AxiosResponse<BasicAPIResponse<Category>>;
export type Category_List_Response = AxiosResponse<
  BasicAPIResponse<Category[]>
>;
