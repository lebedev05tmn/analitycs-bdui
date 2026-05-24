import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router"
import Layout from "./layout"
import { useAppStore } from "./store"
import type { SidebarPage, SidebarType } from "@/components/app-sidebar"
import { Spinner } from "@/components/ui/spinner"

import { Bar, BarChart } from "recharts"

import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import { Card } from "@/components/ui/card"
import Table from "@/widgets/Table"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig

export function ChartExample() {
  return (
    <ChartContainer config={chartConfig} className="min-h-50 w-full">
      <BarChart accessibilityLayer data={chartData}>
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}

const getPageComponent = (content: SidebarPage["content"][number][number]) => {
  switch (content.type) {
    case "chart":
      return <ChartExample />
    case "table":
      return <Table id={content.id} />
    case "gantt":
      return "gantt"
    case "form":
      return "form"
    default:
      return <div>Page not found</div>
  }
}

const generateNestedRoutes = (
  items: SidebarType[],
  basePath = ""
): RouteObject[] => {
  const routes: RouteObject[] = []

  for (const item of items) {
    if (item.type === "page") {
      routes.push({
        path: `${basePath}/${item.id}`,
        element: (
          <Layout>
            <div className="flex h-full w-full flex-col gap-6 pt-15 pr-5 pb-10 pl-5">
              {item.content.map((block, index) => (
                <div
                  className="grid h-full w-full min-w-0 grid-flow-col gap-6 overflow-x-auto"
                  key={`block-${index}`}
                >
                  {block.map((item) => (
                    <Card
                      className="flex h-auto w-auto flex-col justify-between gap-0 py-0"
                      key={item.id}
                    >
                      {getPageComponent(item)}
                    </Card>
                  ))}
                </div>
              ))}
            </div>
          </Layout>
        ),
        handle: { sidebarItem: item },
      })
    } else if (item.type === "folder") {
      const folderPath = `${basePath}/${item.id}`

      routes.push({
        path: folderPath,
        children: generateNestedRoutes(item.children, folderPath),
      })
    }
  }

  return routes
}

export const Router = () => {
  const sidebarContent = useAppStore((state) => state.sidebarContent)

  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        {
          index: true,
          element: (
            <Layout>
              <div>Welcome Page</div>
            </Layout>
          ),
        },
        ...generateNestedRoutes(sidebarContent),
      ],
    },
  ])

  return sidebarContent?.length ? (
    <RouterProvider router={router} />
  ) : (
    <div className="flex h-screen w-screen items-center justify-center">
      <Spinner className="h-20" />
    </div>
  )
}
