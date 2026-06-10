import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { DynamicIcon, type IconName } from "lucide-react/dynamic"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible"
import { ChevronDown } from "lucide-react"
import { useAppStore } from "@/app/store"
import { Link } from "react-router"

export type SidebarContent = {
  id: string
  type: "chart" | "table" | "gantt" | "form"
}

export type SidebarPage = {
  id: string
  icon?: IconName
  content: SidebarContent[][]
  type: "page"
}

export type SidebarFolder = {
  id: string
  icon?: IconName
  children: SidebarType[]
  type: "folder"
}

export type SidebarType = SidebarPage | SidebarFolder

const RenderSidebar = ({ data, path }: { data: SidebarType; path: string }) => {
  const { type } = data

  if (type === "page")
    return <SidebarContentComponent path={path} data={data} />
  return <SidebarFolderComponent path={path} data={data} />
}

const SidebarContentComponent = ({
  data,
  path,
}: {
  data: SidebarPage
  path: string
}) => {
  const { icon, id } = data

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link to={`${path}/${data.id}`}>
          {icon && <DynamicIcon name={icon} />}
          <span className="flex-1 text-left">{id}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

const SidebarFolderComponent = ({
  data,
  path,
}: {
  data: SidebarFolder
  path: string
}) => {
  const { id, icon, children } = data

  return (
    <Collapsible defaultOpen>
      <SidebarGroup>
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger className="flex w-full items-center [&[data-state=open]>.chevron]:rotate-180">
            {icon && <DynamicIcon name={icon} />}
            <span className="flex-1 text-left">{id}</span>
            <ChevronDown className="chevron ml-auto h-4 w-4 transition-transform duration-200" />{" "}
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarMenu>
            {children.map((item) => (
              <RenderSidebar key={item.id} data={item} path={`${path}/${id}`} />
            ))}
          </SidebarMenu>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  )
}

export function AppSidebar() {
  const sidebarContent = useAppStore((state) => state.sidebarContent)
  return (
    <Sidebar>
      <SidebarHeader>
        <Link to="/">LOGO</Link>
      </SidebarHeader>
      <SidebarContent>
        {sidebarContent.map((data) => (
          <RenderSidebar key={data.id} data={data} path="" />
        ))}
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
