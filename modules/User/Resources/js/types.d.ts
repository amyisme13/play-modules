/**
 * API
 */

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  created_at: string;
  updated_at: string;
  roles: string[];
}

export interface ListUserDTO {
  page?: number;
  per_page?: number;
  search?: string;
  order_by?: string;
  order_desc?: boolean;
}

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  roles?: string[];
}

interface UpdateUserDTO extends CreateUserDTO {
  id: number;
}
