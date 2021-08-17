import { LoginDTO, RegisterDTO, User } from '@/types/api';
import config from '@/utils/config';
import req from '@/utils/request';

// Sanctum, login & logout url is not located in api namespace
export const csrf = () => req.get(`${config.appUrl}/sanctum/csrf-cookie`);

export const login = (credentials: LoginDTO) => req.post(`${config.appUrl}/login`, credentials);

export const register = (userData: RegisterDTO) => req.post(`${config.appUrl}/register`, userData);

export const logout = () => req.post(`${config.appUrl}/logout`);

export const user = () => req.get<User>('user');
