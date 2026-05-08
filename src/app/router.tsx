import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router"
import Layout from "./layout"
import { useStore } from "./store"
import type { SidebarPage, SidebarType } from "@/components/app-sidebar"
import { Spinner } from "@/components/ui/spinner"

import { Bar, BarChart } from "recharts"

import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import { Card } from "@/components/ui/card"

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
    <Card>
      <ChartContainer config={chartConfig} className="min-h-50 w-full">
        <BarChart accessibilityLayer data={chartData}>
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        </BarChart>
      </ChartContainer>
    </Card>
  )
}

const getPageComponent = (content: SidebarPage["content"]) => {
  switch (content) {
    case "dashboard":
      return (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            width: "100%",
            gap: 50,
            padding: 50,
          }}
        >
          <ChartExample />
          <ChartExample />
          <ChartExample />
          <ChartExample />
        </div>
      )
    case "table":
      return "table"
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
        element: <Layout>{getPageComponent(item.content)}</Layout>,
        handle: { sidebarItem: item },
      })
    } else if (item.type === "folder") {
      // Добавляем базовый путь для папки
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
  const sidebarContent = useStore((state) => state.sidebarContent)

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
