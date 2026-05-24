import type { AxiosError } from "axios";

export type ServerError = AxiosError<{ error: string }>

export type TableColumnType = {
  header: string
}

export type TableRowType = {
  id: string
  [header: string]: string
}