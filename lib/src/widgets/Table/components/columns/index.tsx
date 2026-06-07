import { type FC } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { useTableSelector } from "../../store"
import ColumnMenu from "./columnMenu"

type ColumnsProps = {
  id: string
}

const Columns: FC<ColumnsProps> = ({ id }) => {
  const columns = useTableSelector(id, (state) => state.columns)

  return (
    <TableHeader>
      <TableRow>
        {columns.length
          ? columns.map((item) => (
              <TableHead
                className="sticky top-0 bg-muted/80 py-3 pl-2 backdrop-blur"
                key={item.id}
              >
                <ColumnMenu id={id} column={item.id}>
                  <Button className="flex items-center bg-transparent text-card-foreground hover:bg-accent-foreground hover:text-primary-foreground">
                    <p>{item.id}</p>
                    <ChevronDown />
                  </Button>
                </ColumnMenu>
              </TableHead>
            ))
          : Array.from({ length: 5 }).map((_, index) => (
              <TableHead key={`column-${index}`}>
                <Skeleton className="mt-2 mb-2 h-10" />
              </TableHead>
            ))}
      </TableRow>
    </TableHeader>
  )
}

export default Columns
