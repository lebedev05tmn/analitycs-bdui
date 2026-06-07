import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import {
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
  Funnel,
  ListRestart,
  RefreshCcw,
} from "lucide-react"
import { type FC, type PropsWithChildren } from "react"
import {
  getColumnStateActions,
  getTableActions,
  getTableSelectors,
  useColumnStateSelector,
} from "../../store"

type ColumnMenuProps = {
  column: string
  id: string
}

const ColumnMenu: FC<PropsWithChildren<ColumnMenuProps>> = ({
  children,
  column,
  id,
}) => {
  const search = useColumnStateSelector(id, column, (state) => state.search)
  const sort = useColumnStateSelector(id, column, (state) => state.sort)
  const { setSearch, setSort, resetColumnState } = getColumnStateActions(
    id,
    column
  )
  const { fetchData, resetTableColumnState } = getTableActions(id)
  const { getColumnState } = getTableSelectors(id)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex items-center justify-between gap-1">
          {children}
          <div className="flex">
            <div className="flex w-3 justify-center">
              {sort === "asc" && <ArrowUpNarrowWide />}
              {sort === "desc" && <ArrowDownWideNarrow />}
            </div>

            <div className="flex w-3 justify-center">
              {search && <Funnel />}
            </div>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent align="start">
        <PopoverHeader>
          <Input
            onChange={(event) => {
              const value = event.target.value

              setSearch(value)
              const columnState = new Map(getColumnState())
              columnState.set(column, {
                ...(columnState.get(column) ?? { id: column }),
                search: value,
              })
              fetchData({ columnState: Array.from(columnState.values()) }) // сделать отдельный экшн
            }}
            value={search ?? ""}
            placeholder="Search..."
          />
        </PopoverHeader>
        <Separator />
        <Button
          onClick={() => {
            setSort("desc")
            const columnState = new Map(getColumnState())
            columnState.set(column, {
              ...(columnState.get(column) ?? { id: column }),
              sort:
                columnState.get(column)?.sort !== "desc" ? undefined : "desc",
            })
            fetchData({
              columnState: Array.from(columnState.values()),
            })
          }}
          variant={sort === "desc" ? "default" : "ghost"}
          className="justify-start"
        >
          <ArrowDownWideNarrow />
          Sort by descending
        </Button>
        <Button
          onClick={() => {
            setSort("asc")
            const columnState = new Map(getColumnState())
            columnState.set(column, {
              ...(columnState.get(column) ?? { id: column }),
              sort: columnState.get(column)?.sort !== "asc" ? undefined : "asc",
            })
            fetchData({
              columnState: Array.from(columnState.values()),
            })
          }}
          variant={sort === "asc" ? "default" : "ghost"}
          className="justify-start"
        >
          <ArrowUpNarrowWide />
          Sort by ascending
        </Button>
        <Separator />
        <Button
          onClick={() => {
            const columnState = new Map(getColumnState())
            columnState.delete(column)
            resetColumnState()
            fetchData({ columnState: Array.from(columnState.values()) })
          }}
          variant="ghost"
          className="justify-start"
        >
          <RefreshCcw />
          Reset this search and sorting
        </Button>
        <Button
          onClick={() => {
            resetTableColumnState()
            fetchData({
              columnState: [],
            })
          }}
          variant={sort === "asc" ? "default" : "ghost"}
          className="justify-start"
        >
          <ListRestart />
          Reset all search ans sorting
        </Button>
      </PopoverContent>
    </Popover>
  )
}

export default ColumnMenu
