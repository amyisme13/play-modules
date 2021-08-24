import { Permission, Role } from '@/types/api';
import req from '@/utils/request';

export const listPermissions = () => req.get<Permission[]>('permissions');

export const listRoles = () => req.get<Role[]>('roles');

export const createRole = (name: string) => req.post<Role>('roles', { name });

export const updateRole = (role: Role) => req.put<Role>(`roles/${role.id}`, role);

export const deleteRole = (id: number) => req.delete(`roles/${id}`);
