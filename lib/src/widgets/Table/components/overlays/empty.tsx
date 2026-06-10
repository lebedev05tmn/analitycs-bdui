import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty"
import { FolderX } from "lucide-react"
import type { FC } from "react"

const EmptyOverlay: FC = () => (
  <Empty>
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <FolderX />
      </EmptyMedia>
      <EmptyTitle>No Data</EmptyTitle>
      <EmptyDescription>
        There is no data in the table. Set up the integration or add entry
        manually.
      </EmptyDescription>
    </EmptyHeader>
  </Empty>
)

export default EmptyOverlay
