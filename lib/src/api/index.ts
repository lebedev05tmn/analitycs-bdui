import axios from 'axios';
import type { SidebarResponse, RowsResponse } from './types';
import type { TableColumn } from '@/widgets/Table';

export const get = async <T = unknown,>(path: string, params?: unknown): Promise<T> => {
  const { data } = await axios.get(path, { params });

  return data;
};

export const getSidebar = async () => {
    const { sidebar } = await get<SidebarResponse>("/api/sidebar");

    return sidebar
}

export const getRows = async () => {
  return await get<RowsResponse>('/api/getRows', { offset: 100, limit: 100 })
}

export const getColumns = async () => {
  return await get<TableColumn[]>('/api/getColumns')
}
