import type { RowsResponse } from "@/api/types"
import type { SidebarContent } from "@/components/app-sidebar"
import { create } from "zustand"
import type { ServerError, TableColumnType } from "./types"
import { getColumns, getRows } from "@/api"

export const COUNT_VALUES = [50, 100, 500, 1000]
export const DEFAULT_COUNT = COUNT_VALUES.at(0)!

export type SortType = "asc" | "desc"

export type ColumnState = {
  sort?: SortType
  search?: string
  id: string
}

type TableStateType = {
  count: number
  page: number
  loading: boolean
  error?: ServerError
  columns: TableColumnType[]
  columnState: Map<string, ColumnState>
  totalCount?: number
  totalPages?: number
} & Pick<RowsResponse, "data">

type TableState = {
  tables: { [id: SidebarContent["id"]]: TableStateType }
  getActions: (id: SidebarContent["id"]) => PaginationActions
  getColumnStateActions: (
    id: SidebarContent["id"],
    columns: string
  ) => ColumnStateActions
  getSelectors: (id: SidebarContent["id"]) => PaginationSelectors
}

type PaginationActions = {
  resetTableColumnState: () => void;
  setCount: (count: number) => void
  nextPage: () => void
  prevPage: () => void
  setPage: (page: number) => void
  fetchData: (params?: {
    page?: number
    count?: number
    columnState?: ColumnState[]
  }) => void
  fetchTable: () => void
  setLoading: (loading: boolean) => void
  setError: (error?: ServerError) => void
}

type ColumnStateActions = {
  setSort: (sort?: SortType) => void
  setSearch: (search?: string) => void
  resetColumnState: () => void;
}

type PaginationSelectors = {
  getCount: () => number
  getPage: () => number
  getColumnState: () => Map<string, ColumnState>
}

const defaultState: TableStateType = {
  count: DEFAULT_COUNT,
  page: 0,
  totalCount: undefined,
  totalPages: undefined,
  data: [],
  columns: [],
  error: undefined,
  loading: false,
  columnState: new Map(),
}

const useTableStore = create<TableState>()((set, get) => ({
  tables: {},

  getActions: (id) => {
    const currentSet = (updater: (prev: TableStateType) => TableStateType) => {
      set((state) => ({
        tables: {
          ...state.tables,
          [id]: updater(state.tables[id] ?? defaultState),
        },
      }))
    }
    return {
      resetTableColumnState: () => currentSet(prev => ({...prev, columnState: new Map()})),
      nextPage: () => currentSet((prev) => ({ ...prev, page: prev.page + 1 })),
      prevPage: () => currentSet((prev) => ({ ...prev, page: prev.page - 1 })),
      setCount: (count) => currentSet((prev) => ({ ...prev, count })),
      setPage: (page) => currentSet((prev) => ({ ...prev, page })),
      setLoading: (loading) => currentSet((prev) => ({ ...prev, loading })),
      setError: (error) => currentSet((prev) => ({ ...prev, error })),
      fetchData: async (params) => {
        const {
          page = 0,
          count = DEFAULT_COUNT,
          columnState = [],
        } = params ?? {}
        const { setLoading, setError } = get().getActions(id)
        try {
          setLoading(true)
          const response = await getRows({
            id,
            offset: page * count,
            limit: count,
            columnState,
          })
          currentSet((prev) => ({
            ...prev,
            ...response,
          }))
        } catch (e) {
          setError(e as ServerError)
        } finally {
          setLoading(false)
        }
      },
      fetchTable: async () => {
        const { setLoading, setError, fetchData } = get().getActions(id)

        try {
          setError(undefined)
          setLoading(true)
          const [columns] = await Promise.all([getColumns(id), fetchData()])
          currentSet((prev) => ({ ...prev, columns }))
        } catch (e) {
          setError(e as ServerError)
        } finally {
          setLoading(false)
        }
      },
    }
  },

  getColumnStateActions: (id, column) => {
    const currentSet = (updater: (prev: ColumnState) => ColumnState) => {
      set((state) => {
        const currentTable = state.tables[id] ?? defaultState
        const updatedColumnState = currentTable.columnState.set(
          column,
          updater(currentTable.columnState.get(column) ?? { id: column })
        )

        return {
          tables: {
            ...state.tables,
            [id]: {
              ...currentTable,
              columnState: updatedColumnState,
            },
          },
        }
      })
    }

    return {
      setSort: (sort) =>
        currentSet((prev) => ({
          ...prev,
          sort: sort === prev.sort ? undefined : sort,
        })),

      setSearch: (search) =>
        currentSet((prev) => ({
          ...prev,
          search,
        })),
      resetColumnState: () => currentSet(prev=> ({...prev, search: undefined, sort: undefined}))
    }
  },

  getSelectors: (id) => {
    const currentTable: TableStateType = get().tables[id] ?? defaultState
    return {
      getCount: () => currentTable.count,
      getPage: () => currentTable.page,
      getColumnState: () => currentTable.columnState,
    }
  },
}))

export const getTableActions = (id: SidebarContent["id"]) =>
  useTableStore.getState().getActions(id)
export const getColumnStateActions = (
  id: SidebarContent["id"],
  column: string
) => useTableStore.getState().getColumnStateActions(id, column)
export const getTableSelectors = (id: SidebarContent["id"]) =>
  useTableStore.getState().getSelectors(id)

export const useTableSelector = <T>(
  id: SidebarContent["id"],
  selector: (state: TableStateType) => T
): T => useTableStore((state) => selector(state.tables[id] ?? defaultState))
export const useColumnStateSelector = <T>(
  id: SidebarContent["id"],
  column: string,
  selector: (state: ColumnState) => T
): T =>
  useTableSelector(id, (state) =>
    selector(state.columnState.get(column) ?? { id: column })
  )

export default useTableStore
