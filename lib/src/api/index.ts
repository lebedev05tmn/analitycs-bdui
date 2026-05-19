import axios from 'axios';
import type { TableResponse,  SidebarResponse } from './types';

export const get = async <T = unknown,>(path: string, params?: unknown): Promise<T> => {
  const { data } = await axios.get(path, { params });

  return data;
};

export const getSidebar = async () => {
    const { sidebar } = await get<SidebarResponse>("/api/sidebar");

    return sidebar
}

export const getTable = async (id:string) => {
  return await get<TableResponse>('/api/getTable', { id })
}
