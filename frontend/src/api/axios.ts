import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

let isRefreshing = false;

let refreshSubscribers: Array<() => void> = [];

const subscribeToRefresh = (callback: () => void) => {
  refreshSubscribers.push(callback);
};

const notifyRefreshSubscribers = () => {
  refreshSubscribers.forEach((callback) => callback);
  refreshSubscribers = [];
};

api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      error.response?.status !== 401 ||
      originalRequest?._retry ||
      originalRequest?.url?.includes("/user/refresh")
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        subscribeToRefresh(async () => {
          try {
            resolve(api(originalRequest));
          } catch (refreshError) {
            reject(refreshError);
          }
        });
      });
    }

    isRefreshing = true;

    try {
      await api.post("/user/refresh");

      notifyRefreshSubscribers();

      return api(originalRequest);
    } catch (refreshError) {
      refreshSubscribers = [];

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);
