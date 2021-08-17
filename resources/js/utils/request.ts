import axios from 'axios';
import config from './config';

const req = axios.create({
  baseURL: config.baseApi,
  withCredentials: true,
});

export default req;
