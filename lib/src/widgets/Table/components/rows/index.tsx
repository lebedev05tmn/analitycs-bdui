import { Skeleton } from "@/components/ui/skeleton"
import { TableBody, TableCell, TableRow } from "@/components/ui/table"
import { useEffect, useRef, type FC } from "react"
import { useTableSelector } from "../../store"
import EmptyOverlay from "../overlays/empty"

type RowsProps = {
  id: string
}

const Rows: FC<RowsProps> = ({ id }) => {
  const rows = useTableSelector(id, (state) => state.data)
  const columns = useTableSelector(id, (state) => state.columns)
  const loading = useTableSelector(id, (state) => state.loading)

  const tbodyRef = useRef<HTMLTableSectionElement>(null)

  useEffect(() => {
    const scrollContainer = tbodyRef.current?.closest(".overflow-scroll")

    if (scrollContainer) {
      scrollContainer.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }
  }, [rows])

  if (!loading && rows.length === 0)
    return (
      <tbody>
        <tr>
          <td colSpan={columns.length} className="pt-[25vh]">
            <EmptyOverlay />
          </td>
        </tr>
      </tbody>
    )

  return (
    <TableBody ref={tbodyRef}>
      {!loading
        ? rows.map((row) => {
            return (
              <TableRow key={row.id}>
                {columns.map((column) => (
                  <TableCell
                    key={`${row.id}-${column.header}`} // проверить на fancy в соответствии с https://guides.kontur.ru/principles/tables/table-filters/#Dizain_i_rabota_s_klaviaturoi
                    className="p-0 pt-2 pb-2 pl-4"
                  >
                    {String(row[column.header]) || ""}
                  </TableCell>
                ))}
              </TableRow>
            )
          })
        : Array.from({ length: 14 }).map((_, index) => {
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
  )
}

export default Rows
