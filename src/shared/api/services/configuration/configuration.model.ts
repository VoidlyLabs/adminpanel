import { BasicAPIResponse } from '@/shared/api/core/basic/basic.models';
import { AxiosResponse } from 'axios';

export interface BasicConfiguration {
  name: {
    uk?: string;
    en?: string;
  };
  description: {
    uk?: string;
    en?: string;
  };
  logoUrl: string;
  accentColor: string;
  backgroundColor: string;
  secondaryColor: string;
  phoneNumber: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

// Requests

export type Configuration_Update_Request = Partial<
  Pick<
    BasicConfiguration,
    | 'name'
    | 'description'
    | 'accentColor'
    | 'backgroundColor'
    | 'secondaryColor'
    | 'phoneNumber'
    | 'email'
  >
>;

export interface Configuration_UpdateLogo_Request {
  logo: File;
}

// Responses

export type Configuration_Response = AxiosResponse<
  BasicAPIResponse<BasicConfiguration>
>;
