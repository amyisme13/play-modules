import axios from 'axios';

import { useErrorStore } from '@/store/error';
import config from './config';

export function createParams(params: Record<string, any>) {
  const output: typeof params = {};

  for (const key in params) {
    const value = params[key];
    if (typeof value === 'boolean') {
      output[key] = value ? 1 : 0;
    } else if (value) {
      output[key] = value;
    }
  }

  return output;
}

export function createData(data: Record<string, any>) {
  const output: typeof data = {};

  for (const key in data) {
    const value = data[key];
    if (value) {
      output[key] = value;
    }
  }

  return output;
}

const req = axios.create({
  baseURL: config.baseApi,
  withCredentials: true,
});

req.interceptors.request.use((config) => {
  if (config.params) {
    config.params = createParams(config.params);
  }

  if (config.data && typeof config.data === 'object') {
    config.data = createData(config.data);
  }

  return config;
});

req.interceptors.response.use(
  (res) => {
    const errorStore = useErrorStore();
    errorStore.$reset();

    return res;
  },
  (error) => {
    const errorStore = useErrorStore();
    if (error.response) {
      errorStore.setError(error.response.data, error.response.status);
    } else {
      // Unknown network error
    }

    return Promise.reject(error);
  }
);

export default req;
