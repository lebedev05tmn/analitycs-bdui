import { useEffect } from "react"
import { useStore } from "./store"
import { Router } from "./router"
import { getSidebar } from "@/api"

const App = () => {
  const setSidebar = useStore((state) => state.setSidebar)
  const sidebar = useStore((state) => state.sidebarContent)

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
