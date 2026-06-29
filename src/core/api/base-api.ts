import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import { ApiError, type BackendResponse } from "./api-types";

export const DEFAULT_API_BASE_URL = "http://api.fixent.ir/api";

export class BaseApi {
  private readonly client: AxiosInstance;
  private readonly controller: string;

  constructor(controller = "", baseURL = DEFAULT_API_BASE_URL) {
    this.controller = this._normalizePath(controller);
    this.client = axios.create({
      baseURL,
    });
  }

  protected get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this._request<T>({
      ...config,
      method: "GET",
      url: this._resolveUrl(url),
    });
  }

  protected post<T, TBody = unknown>(
    url: string,
    data?: TBody,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this._request<T>({
      ...config,
      method: "POST",
      url: this._resolveUrl(url),
      data,
    });
  }

  protected put<T, TBody = unknown>(
    url: string,
    data?: TBody,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this._request<T>({
      ...config,
      method: "PUT",
      url: this._resolveUrl(url),
      data,
    });
  }

  protected delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this._request<T>({
      ...config,
      method: "DELETE",
      url: this._resolveUrl(url),
    });
  }

  private async _request<T>(config: AxiosRequestConfig): Promise<T> {
    const response = await this.client.request<BackendResponse<T>>(config);
    const payload = response.data;

    if (!payload.isSuccess) {
      throw new ApiError(payload);
    }

    return payload.data;
  }

  private _resolveUrl(endpoint: string): string {
    const normalizedEndpoint = this._normalizePath(endpoint);

    if (!this.controller) {
      return `/${normalizedEndpoint}`;
    }

    if (!normalizedEndpoint) {
      return `/${this.controller}`;
    }

    return `/${this.controller}/${normalizedEndpoint}`;
  }

  private _normalizePath(path: string): string {
    return path.replace(/^\/+|\/+$/g, "");
  }
}
