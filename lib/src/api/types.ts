import type { SidebarType } from "@/components/app-sidebar"
import type { TableColumn, TableRow } from "@/widgets/Table"

type SidebarResponse = {
    sidebar: SidebarType[]
}

type TableResponse = {
    columns: TableColumn[];
    rows: TableRow[];
}

export type { SidebarResponse, TableResponse }