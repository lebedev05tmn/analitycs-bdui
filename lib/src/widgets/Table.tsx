import { getTable } from "@/api"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect, useState, type FC } from "react"

type TableProps = {
  id: string
}

export type TableColumn = {
  header: string
}

export type TableRow = {
  id: string
  [header: string]: string
}

const TableComponent: FC<TableProps> = ({ id }) => {
  const [rows, setRows] = useState<TableRow[]>([])
  const [columns, setColumns] = useState<TableColumn[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchTable = async () => {
      setLoading(true)
      const { rows, columns } = await getTable(id)
      setRows(rows)
      setColumns(columns)
      setLoading(false)
    }

    fetchTable()
  }, [id])

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {!loading
            ? columns.map((item) => (
                <TableHead key={item.header}>{item.header}</TableHead>
              ))
            : Array.from({ length: 5 }).map((_, index) => (
                <TableHead key={`column-${index}`}>
                  <Skeleton className="mt-2 mb-2 h-10" />
                </TableHead>
              ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {!loading
          ? rows.map((row) => {
              return (
                <TableRow key={row.id}>
                  {columns.map((column) => (
                    <TableCell
                      key={`${row.id}-${column.header}`}
                      className="text-zinc-400"
                    >
                      {row[column.header] || ""}
                    </TableCell>
                  ))}
                </TableRow>
              )
            })
          : Array.from({ length: 5 }).map((_, index) => {
              return (
                <TableRow key={`row-${index}`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <TableCell key={`row-column-${index * 10 + i}`}>
                      <Skeleton className="mt-2 mb-2 h-5 opacity-90" />
                    </TableCell>
                  ))}
                </TableRow>
              )
            })}
      </TableBody>
    </Table>
  )
}

export default TableComponent
