import type { SidebarType } from "@/components/app-sidebar"
import type { TableRow } from "@/widgets/Table"

type SidebarResponse = {
    sidebar: SidebarType[]
}

type RowsResponse = {
    data: TableRow[],
    totalCount: number,
    totalPages: number,
    currentPage: number,
}

export type { SidebarResponse, RowsResponse }