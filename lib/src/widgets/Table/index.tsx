import { useEffect, type FC } from "react"
import Pagination from "./components/pagination"
import { getTableActions, useTableSelector } from "./store"
import Columns from "./components/columns"
import { Table } from "@/components/ui/table"
import Rows from "./components/rows"
import ErrorOverlay from "./components/overlays/error"

type TableProps = {
  id: string
}

const TableComponent: FC<TableProps> = ({ id }) => {
  const error = useTableSelector(id, (state) => state.error)

  const { fetchTable } = getTableActions(id)

  useEffect(() => {
    fetchTable()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  if (error) return <ErrorOverlay error={error} />
  return (
    <>
      <Table>
        <Columns id={id} />
        <Rows id={id} />
      </Table>
      <Pagination id={id} />
    </>
  )
}

export default TableComponent
