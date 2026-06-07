import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import type { FC, PropsWithChildren } from "react"
import type { TableColumnType, TableRowType } from "../../types"
import { useAlert } from "@/app/AlertProvider"

type CellMenuProps = {
  column: TableColumnType
  row: TableRowType
}
//'id', 'add', 'delete', 'edit', 'copy', 'export', 'clear', 'refresh'
const CellMenu: FC<PropsWithChildren<CellMenuProps>> = ({ children, row }) => {
  // const {
  //   id: idMenuItem,
  //   add,
  //   delete: deleteMenuItem,
  //   edit,
  //   copy,
  //   export: exportMenuItem,
  //   clear,
  //   refresh,
  // } = {
  //   id: true,
  //   add: true,
  //   delete: true,
  //   edit: true,
  //   copy: true,
  //   export: true,
  //   clear: true,
  //   refresh: true,
  // }

  const { showAlert } = useAlert()

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="h-full w-full">{children}</div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuGroup>
          <ContextMenuItem
            onClick={() =>
              showAlert({
                title: "Record ID",
                description: `ID: ${row.id}`,
                duration: 40000,
                id: "showId",
              })
            }
          >
            Show Id
          </ContextMenuItem>
          <ContextMenuItem disabled>
            Forward
            <ContextMenuShortcut>⌘]</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Reload
            <ContextMenuShortcut>⌘R</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-44">
              <ContextMenuGroup>
                <ContextMenuItem>Save Page...</ContextMenuItem>
                <ContextMenuItem>Create Shortcut...</ContextMenuItem>
                <ContextMenuItem>Name Window...</ContextMenuItem>
              </ContextMenuGroup>
              <ContextMenuSeparator />
              <ContextMenuGroup>
                <ContextMenuItem>Developer Tools</ContextMenuItem>
              </ContextMenuGroup>
              <ContextMenuSeparator />
              <ContextMenuGroup>
                <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
              </ContextMenuGroup>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuCheckboxItem checked>
            Show Bookmarks
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuRadioGroup value="pedro">
            <ContextMenuLabel>People</ContextMenuLabel>
            <ContextMenuRadioItem value="pedro">
              Pedro Duarte
            </ContextMenuRadioItem>
            <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default CellMenu
