import axios from 'axios';

import { ErrorModule } from '@/store/error';
import { snackbar } from '@/plugins/vuetify';
import config from './config';

const req = axios.create({
  baseURL: config.baseApi,
  withCredentials: true,
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
