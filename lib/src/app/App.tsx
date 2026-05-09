import axios from "axios"
import { useEffect } from "react"
import { useStore } from "./store"
import { Router } from "./router"

const App = () => {
  const setSidebar = useStore((state) => state.setSidebar)

  useEffect(() => {
    ;(async () =>
      setSidebar(
        (await axios.get(`${import.meta.env.VITE_API_URL}/api/sidebar`)).data
          .sidebar
      ))()
  }, [setSidebar])

  return <Router />
}

export default App
