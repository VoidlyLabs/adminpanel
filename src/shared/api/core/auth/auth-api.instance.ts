import axios, { AxiosInstance } from 'axios';

export const AuthAPI: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

const defaultAPIVersion = 1;

AuthAPI.interceptors.request.use(
  async (config) => {
    if (config.apiVersion !== undefined) {
      config.url = `/v${config.apiVersion}` + config.url;
    } else {
      config.url = `/v${defaultAPIVersion}` + config.url;
    }

    config.apiVersion = undefined;

    return config;
  },
  async (error) => {
    return Promise.reject(error);
  },
);

AuthAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status == 401) {
      console.error(
        '[AuthAPI]: Unauthorized access - redirecting to login',
        error,
      );

      if (
        typeof window !== 'undefined' &&
        window.location.pathname !== '/signin'
      ) {
        window.location.replace('/signin');
      }
    }

    if (status == 500) {
      console.error('[AuthAPI]: Server error - please try again later', error);
    }

    return Promise.reject(error);
  },
);
