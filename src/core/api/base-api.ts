import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import { ApiError, type BackendResponse } from "./api-types";

export class BaseApi {
  private client: AxiosInstance | undefined;
  private readonly controller: string;

  constructor(controller: string) {
    this.controller = this._normalizePath(controller);
  }

  private _getClient(): AxiosInstance {
    if (!this.client) {
      const { public: config } = useRuntimeConfig();
      this.client = axios.create({
        baseURL: config.apiBase,
      });
    }

    return this.client;
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
    const response =
      await this._getClient().request<BackendResponse<T>>(config);
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
