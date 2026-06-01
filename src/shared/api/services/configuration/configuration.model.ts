import { BasicAPIResponse } from '@/shared/api/core/basic/basic.models';
import { AxiosResponse } from 'axios';

export interface BasicConfiguration {
  name: string;
  description: string;
  logoUrl: string;
}

// Requests

export type Configuration_Update_Request = Partial<
  Pick<BasicConfiguration, 'name' | 'description'>
>;

export interface Configuration_UpdateLogo_Request {
  logo: File;
}

// Responses

export type Configuration_Response = AxiosResponse<
  BasicAPIResponse<BasicConfiguration>
>;
