import { Field, FieldLabel } from "@/components/ui/field"

import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  Select,
} from "@/components/ui/select"
import type { FC } from "react"
import { COUNT_VALUES, DEFAULT_COUNT, getTableActions } from "../../store"
import NavigationComponent from "./navigation"

type TablePaginationProps = {
  id: string
}

const TablePagination: FC<TablePaginationProps> = ({ id }) => {
  const { setCount, setPage, fetchData } = getTableActions(id)

  return (
    <div className="flex items-center justify-between gap-4 pt-3 pr-4 pb-3 pl-4">
      <Field orientation="horizontal" className="w-fit">
        <FieldLabel htmlFor="select-rows-per-page">Rows per page</FieldLabel>
        <Select
          onValueChange={(value) => {
            setCount(Number(value))
            setPage(0)
            fetchData({ page: 0, count: Number(value) })
          }}
          defaultValue={String(DEFAULT_COUNT)}
        >
          <SelectTrigger className="w-20" id="select-rows-per-page">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="start">
            <SelectGroup>
              {COUNT_VALUES.map((value) => (
                <SelectItem key={value} value={String(value)}>
                  {value}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
      <NavigationComponent id={id} />
    </div>
  )
}

export default TablePagination
