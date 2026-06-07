import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination"
import type { FC } from "react"
import {
  getTableActions,
  getTableSelectors,
  useTableSelector,
} from "../../store"

type Props = {
  id: string
}

const Previous: FC<Props> = ({ id }) => {
  const page = useTableSelector(id, (state) => state.page)
  const loading = useTableSelector(id, (state) => state.loading)
  const error = useTableSelector(id, (state) => state.error)

  const { fetchData } = getTableActions(id)
  const { getPage } = getTableSelectors(id)

  return (
    <PaginationPrevious
      disabled={page === 0 || loading || !!error}
      onClick={() => {
        getTableActions(id).prevPage()
        fetchData({ page: getPage() - 1 })
      }}
    />
  )
}

const Next: FC<Props> = ({ id }) => {
  const page = useTableSelector(id, (state) => state.page)
  const totalPages = useTableSelector(id, (state) => state.totalPages)
  const loading = useTableSelector(id, (state) => state.loading)
  const error = useTableSelector(id, (state) => state.error)

  const { fetchData } = getTableActions(id)
  const { getPage } = getTableSelectors(id)

  return (
    <PaginationNext
      disabled={page + 1 === totalPages || loading || !!error}
      onClick={() => {
        getTableActions(id).nextPage()
        fetchData({ page: getPage() + 1 })
      }}
    />
  )
}

const NavigationComponent: FC<Props> = ({ id }) => {
  return (
    <Pagination className="mx-0 w-auto">
      <PaginationContent>
        <PaginationItem>
          <Previous id={id} />
        </PaginationItem>
        <PaginationItem>
          <Next id={id} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default NavigationComponent
