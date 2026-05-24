import { useEffect } from "react"
import { useAppStore } from "./store"
import { Router } from "./router"
import { getSidebar } from "@/api"

const App = () => {
  const setSidebar = useAppStore((state) => state.setSidebar)
  const sidebar = useAppStore((state) => state.sidebarContent)

  useEffect(() => {
    const fetchSidebar = async () => {
      const fetchData = await getSidebar()
      setSidebar(fetchData)
    }

    if (!sidebar.length) fetchSidebar()
  }, [sidebar, setSidebar])

  return <Router />
}

export default App
