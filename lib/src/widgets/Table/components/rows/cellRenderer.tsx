import type { FC } from "react"
import type { TableColumnType } from "../../types"
import { Check, X } from "lucide-react"

type DefaultRendererProps = {
  value: unknown
}

const DefaultRenderer: FC<DefaultRendererProps> = ({ value }) => {
  return String(value)
}

type BooleanRendererProps = {
  value: boolean
}

const BooleanRenderer: FC<BooleanRendererProps> = ({ value }) => {
  return (
    <div className="pl-2">{value ? <Check size="16" /> : <X size="16" />}</div>
  )
}

type CellRendererProps = {
  column: TableColumnType
  value: unknown
}

const CellRenderer = ({ column, value }: CellRendererProps) => {
  if (value === null || value === undefined) return ""

  if (column.type === "boolean")
    return <BooleanRenderer value={value as boolean} />

  return <DefaultRenderer value={value} />
}

export default CellRenderer
