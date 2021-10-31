import { UpdateModuleDTO } from '@/types/api';
import req from '@/utils/request';

export const listEnabled = () => req.get<string[]>('modules');

export const saveModules = (data: UpdateModuleDTO) => req.post<string[]>('modules', data);
