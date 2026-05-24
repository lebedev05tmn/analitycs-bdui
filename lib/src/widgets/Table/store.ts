import type { RowsResponse } from "@/api/types"
import type { SidebarContent } from "@/components/app-sidebar"
import { create } from "zustand"
import type { ServerError, TableColumnType } from "./types"
import { getColumns, getRows } from "@/api"

export const COUNT_VALUES = [50, 100, 500, 1000]
export const DEFAULT_COUNT = COUNT_VALUES.at(0)!

type TableStateType = {
  count: number
  page: number
  loading: boolean
  error: ServerError | null
  columns: TableColumnType[]
} & Partial<RowsResponse> &
  Pick<RowsResponse, "data">

type TableState = {
  tables: { [id: SidebarContent["id"]]: TableStateType }
  getActions: (id: SidebarContent["id"]) => PaginationActions
  getSelectors: (id: SidebarContent["id"]) => PaginationSelectors
}

type PaginationActions = {
  setCount: (count: number) => void
  nextPage: () => void
  prevPage: () => void
  setPage: (page: number) => void
  fetchData: (page?: number, count?: number) => void
  fetchTable: () => void
  setLoading: (loading: boolean) => void
  setError: (error: ServerError | null) => void
}

type PaginationSelectors = {
  getCount: () => number
  getPage: () => number
}

const defaultState: TableStateType = {
  count: DEFAULT_COUNT,
  page: 0,
  totalCount: undefined,
  totalPages: undefined,
  data: [],
  columns: [],
  error: null,
  loading: false,
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
      nextPage: () => currentSet((prev) => ({ ...prev, page: prev.page + 1 })),
      prevPage: () => currentSet((prev) => ({ ...prev, page: prev.page - 1 })),
      setCount: (count) => currentSet((prev) => ({ ...prev, count })),
      setPage: (page) => currentSet((prev) => ({ ...prev, page })),
      setLoading: (loading) => currentSet((prev) => ({ ...prev, loading })),
      setError: (error) => currentSet((prev) => ({ ...prev, error })),
      fetchData: async (
        page = get().getSelectors(id).getPage(),
        count = get().getSelectors(id).getCount()
      ) => {
        const { setLoading, setError } = get().getActions(id)
        try {
          setLoading(true)
          const response = await getRows({
            id,
            offset: page * count,
            limit: count,
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
          setError(null)
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

  getSelectors: (id) => {
    const currentTable: TableStateType = get().tables[id] ?? defaultState
    return {
      getCount: () => currentTable.count,
      getPage: () => currentTable.page,
    }
  },
}))

export const getTableActions = (id: SidebarContent["id"]) =>
  useTableStore.getState().getActions(id)
export const getTableSelectors = (id: SidebarContent["id"]) =>
  useTableStore.getState().getSelectors(id)

export const useTableSelector = <T>(
  id: SidebarContent["id"],
  selector: (state: TableStateType) => T
): T =>
  useTableStore((state) => selector(state.tables[id] ?? defaultState))

export default useTableStore
