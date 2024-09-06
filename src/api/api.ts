import axios, { AxiosInstance } from "axios";

interface AxiosConfig {
  baseURL: string;
}

const config: AxiosConfig = {
  baseURL: "https://readjourney.b.goit.study/api",
};

export const instance: AxiosInstance = axios.create(config);

export const setToken = (token: string): void => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = (): void => {
  instance.defaults.headers.common.Authorization = "";
};