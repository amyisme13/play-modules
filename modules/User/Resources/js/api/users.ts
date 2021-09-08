import { Paginated } from '@/types/api';
import req from '@/utils/request';

import { CreateUserDTO, ListUserDTO, UpdateUserDTO, User } from '@user/types';

export const list = (params: ListUserDTO = {}) => req.get<Paginated<User>>('users', { params });

export const create = (data: CreateUserDTO) => req.post<User>('users', data);

export const show = (id: number) => req.get<User>(`users/${id}`);

export const update = (data: UpdateUserDTO) => req.put<User>(`users/${data.id}`, data);

export const destroy = (id: number) => req.delete(`users/${id}`);
