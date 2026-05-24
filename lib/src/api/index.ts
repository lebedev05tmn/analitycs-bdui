import axios from "axios"
import type { SidebarResponse, RowsResponse, RowsRequest } from "./types"
import type { TableColumnType } from "@/widgets/Table/types"

export const get = async <T = unknown>(
  path: string,
  params?: unknown
): Promise<T> => {
  const { data } = await axios.get(path, { params })

  return data
}

export const getSidebar = async () => {
  const { sidebar } = await get<SidebarResponse>("/api/resources/sidebar")

  return sidebar
}

export const getRows = (request: RowsRequest) => {
  return get<RowsResponse>("/api/getRows", request)
}

export const getColumns = (id: string) => {
  return get<TableColumnType[]>("/api/getColumns", { id })
}
