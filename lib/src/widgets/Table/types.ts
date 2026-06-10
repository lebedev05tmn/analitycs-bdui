import type { AxiosError } from "axios";

export type ServerError = AxiosError<{ error: string }>

type ColumnType = 'string' | 'number' | 'boolean'

type ContextMenuContent = ['id', 'add', 'delete', 'edit', 'copy', 'export', 'clear', 'refresh']

export type TableColumnType = {
  id: string
  type: ColumnType;
  contextMenu?: ContextMenuContent;
}

export type TableRowType = {
  id: string
  [columnId: string]: string
}