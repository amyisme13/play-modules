import axios from 'axios';

import { ErrorModule } from '@/store/error';
import { snackbar } from '@/plugins/vuetify';
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
    ErrorModule.RESET();

    return res;
  },
  (error) => {
    if (error.response) {
      ErrorModule.setError({ error: error.response.data, status: error.response.status });
    } else {
      snackbar('Unknown network error', 'error');
    }

    return Promise.reject(error);
  }
);

export default req;
