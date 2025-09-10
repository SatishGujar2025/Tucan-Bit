import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { config } from "../config/load-config";

interface ApiServiceConfig {
  baseUrl: string;
  timeout?: number;
}

interface ApiResponse<T> {
  message: string;
  success: boolean;
  status: number;
  data?: T;
}

class ApiService {
  private axiosInstance: AxiosInstance;
  private readonly ACCESS_TOKEN_KEY = "access_token";

  constructor(config: ApiServiceConfig) {
    this.axiosInstance = axios.create({
      baseURL: config.baseUrl,
      timeout: 100000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem(this.ACCESS_TOKEN_KEY);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );
  }

  private async request<T>(
    method: string,
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.axiosInstance({
        method,
        url,
        data,
        ...config,
      });

      return {
        data: response.data.data,
        status: response.status,
        success: response.data.success,
        message: response.data.message,
      };
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred";
      const status = error.response?.status || 500;
      const apiResponse: ApiResponse<T> = {
        message,
        success: false,
        status,
      };
      throw apiResponse;
    }
  }

  async get<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.request<T>("GET", url, undefined, config);
  }

  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.request<T>("POST", url, data, config);
  }

  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.request<T>("PUT", url, data, config);
  }

  async patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.request<T>("PATCH", url, data, config);
  }

  async delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.request<T>("DELETE", url, undefined, config);
  }
}

export const createApiService = (
  baseUrl: string,
  timeout?: number,
): ApiService => {
  return new ApiService({ baseUrl, timeout });
};

export const walletManagementSvc = createApiService(
  config.walletApiUrl,
  100000,
);
