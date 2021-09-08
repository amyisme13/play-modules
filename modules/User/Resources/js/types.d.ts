/**
 * API
 */

export interface User {
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
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
}

interface UpdateUserDTO extends Partial<CreateUserDTO> {
  id: number;
}
