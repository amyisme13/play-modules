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

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  two_factor_enabled: boolean;
  permissions: string[];
  roles: string[];
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

export interface ResetPasswordDTO {
  email: string;
  token: string;
  password: string;
  password_confirmation: string;
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

/**
 * Permissions
 */

export interface Permission {
  id: number;
  name: string;
}

export interface Role {
  id: number;
  name: string;
  permissions: string[];
}
