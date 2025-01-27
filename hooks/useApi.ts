"use client";

import type { AxiosRequestConfig, AxiosResponse, CancelToken } from "axios";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import useAuth from "./useAuth";

export type ApiClient = {
  query: <T extends any>(
    q: string,
    headers?: AxiosRequestConfig
  ) => Promise<AxiosResponse<T, any>>;
  delete: (q: string, headers?: AxiosRequestConfig) => Promise<any>;
  post: <T extends any, D extends any>(
    q: string,
    data: D,
    headers?: AxiosRequestConfig
  ) => Promise<AxiosResponse<T, any>>;
  putMutation: <T extends any, D extends any>(
    q: string,
    data: any,
    headers?: AxiosRequestConfig
  ) => Promise<AxiosResponse<T, any>>;
  patchMutation: <T extends any, D extends any>(
    q: string,
    data: any,
    headers?: AxiosRequestConfig
  ) => Promise<AxiosResponse<T, any>>;
};

const client = ({
  token,
  withCredentials = true,
  cancelToken,
}: {
  token?: string | null;
  withCredentials?: boolean;
  cancelToken?: CancelToken;
}) => {
  let baseURL = "/api";

  return axios.create({
    baseURL,
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
      "Content-Type": "application/json",
    },
    withCredentials,
    cancelToken,
  });
};

function httpClient({ token }: { token?: string }) {

  const { logout } = useAuth();
  
  return {
    query: async <T extends any>(q: string, headers?: AxiosRequestConfig) => {
      try {
        const resp = client({ token }).get(q, headers);
        const result: AxiosResponse<T, any> = await Promise.resolve(resp);
        return result;
      } catch (err:any) {
        console.log('error check', err?.response?.status);
        if (err?.response?.status === 401) {
          logout();
        }
        return Promise.reject(err);
      }
    },
    delete: async (q: string, headers?: AxiosRequestConfig) => {
      try {
        return await Promise.resolve(client({ token }).delete(q, headers));
      } catch (err:any) {
        console.log('error check', err?.response?.status);
        if (err?.response?.status === 401) {
          logout();
        }
        return Promise.reject(err);
      }
    },
    post: async <T extends any, D extends any>(
      q: string,
      data: D,
      headers?: AxiosRequestConfig
    ) => {
      try {
        const resp = client({ token }).post(q, data, headers);
        const result: AxiosResponse<T, any> = await Promise.resolve(resp);
        return result.data;
      } catch (err:any) {
        console.log('error check', err?.response?.status);
        if (err?.response?.status === 401) {
          logout();
        }
        return Promise.reject(err);
      }
    },
    putMutation: async <T extends any, D extends any>(
      q: string,
      data: D,
      headers?: AxiosRequestConfig
    ) => {

      try {
      
        const resp = client({ token }).put(q, data, headers);
        const result: AxiosResponse<T, any> = await Promise.resolve(resp);
        return result.data;
      } catch (err:any) {
        console.log('error check', err?.response?.status);
        if (err?.response?.status === 401) {
          logout();
        }
        return Promise.reject(err);
      }
    },
    patchMutation: async <T extends any, D extends any>(
      q: string,
      data: D,
      headers?: AxiosRequestConfig
    ) => {
      try {
        const resp = client({ token }).patch(q, data, headers);
        const result: AxiosResponse<T, any> = await Promise.resolve(resp);
        return result.data;
      } catch (err:any) {
        console.log('error check', err?.response?.status);
        if (err?.response?.status === 401) {
          logout();
        }
        return Promise.reject(err);
      }
    },
  };
}

export function useApiUrl() {
  const userFromLocalStorage = typeof window !=='undefined'? window?.localStorage.getItem("userData"):null;

  const token = userFromLocalStorage? JSON.parse(userFromLocalStorage)?.token: "";

  const apiClient = useCallback(() => client({ token }), [token]);

  return apiClient();
}

export default httpClient;
