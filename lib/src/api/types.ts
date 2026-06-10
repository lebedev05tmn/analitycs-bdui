import type { SidebarType } from "@/components/app-sidebar"
import type { ColumnState } from "@/widgets/Table/store"
import type { TableRowType } from "@/widgets/Table/types"

type SidebarResponse = {
  sidebar: SidebarType[]
}

type RowsResponse = {
  data: TableRowType[]
  totalCount: number
  totalPages: number
}

type RowsRequest = {
  id: string
  offset: number
  limit: number
  columnState: ColumnState[]
}

export type { SidebarResponse, RowsResponse, RowsRequest }
