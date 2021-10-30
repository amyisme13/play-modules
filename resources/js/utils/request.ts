import axios from 'axios';

import { useErrorStore } from '@/store/error';
import config from './config';
import { transformData, transformParams } from './transformers';

const req = axios.create({
  baseURL: config.baseApi,
  withCredentials: true,
});

req.interceptors.request.use((config) => {
  if (config.params) {
    config.params = transformParams(config.params);
  }

  if (config.data && typeof config.data === 'object') {
    config.data = transformData(config.data);
  }

  // For some reason axios.put with formdata cant be parsed in the server
  const method = config.method?.toLowerCase() || 'post';
  const notPost = ['put', 'patch'];
  if (config.data instanceof FormData && notPost.includes(method)) {
    config.method = 'post';
    config.data.append('_method', method);
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
