/**
 * Common
 */

export interface ValidationError {
  [key: string]: string[];
}

export interface LaravelError {
  message: string;
  errors?: ValidationError;
}

export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface Paginated<T> {
  data: T[];
  meta: PaginationMeta;
}

/**
 * Auth
 */

export interface User {
  id: number;
  name: string;
  email: string;
  two_factor_secret: string;
}

export interface LoginDTO {
  email: string;
  password: string;
  remember: boolean;
}

export interface TwoFactorDTO {
  code?: string;
  recovery_code?: string;
}

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface UpdatePasswordDTO {
  current_password: string;
  password: string;
  password_confirmation: string;
}

export interface UpdateProfileDTO {
  name: string;
  email: string;
}
