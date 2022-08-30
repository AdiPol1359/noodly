import axios from 'axios';

import type { ApiError, InferResponse } from 'types';
import type { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';
import type { FastifySchemaTypeBox } from '@noodly/common';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AXIOS_BASEURL,
  withCredentials: true,
});

export const axiosWrapper = {
  get: <T extends FastifySchemaTypeBox, R = AxiosResponse<InferResponse<T>>, D = unknown>(
    url: string,
    config?: AxiosRequestConfig<D>
  ) => axiosInstance.get<InferResponse<T>, R, D>(url, config),

  post: <T extends FastifySchemaTypeBox, R = AxiosResponse<InferResponse<T>>, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ) => axiosInstance.post<InferResponse<T>, R, D>(url, data, config),

  patch: <T extends FastifySchemaTypeBox, R = AxiosResponse<InferResponse<T>>, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ) => axiosInstance.patch<InferResponse<T>, R, D>(url, data, config),

  put: <T extends FastifySchemaTypeBox, R = AxiosResponse<InferResponse<T>>, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ) => axiosInstance.put<InferResponse<T>, R, D>(url, data, config),

  delete: <T extends FastifySchemaTypeBox, R = AxiosResponse<InferResponse<T>>, D = unknown>(
    url: string,
    config?: AxiosRequestConfig<D>
  ) => axiosInstance.delete<InferResponse<T>, R, D>(url, config),
};

export const isApiError = (err: unknown): err is AxiosError<ApiError> => {
  if (!axios.isAxiosError(err) || !err.response) {
    return false;
  }

  const { data } = err.response;

  return !!data && typeof data === 'object' && 'statusCode' in data && 'error' in data && 'message' in data;
};
