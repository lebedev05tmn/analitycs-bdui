import axios from "axios"
import { useEffect } from "react"
import { useStore } from "./store"
import { Router } from "./router"

const App = () => {
  const setSidebar = useStore((state) => state.setSidebar)

  useEffect(() => {
    ;(async () =>
      setSidebar(
        (await axios.get("http://localhost:8000/api/sidebar")).data.sidebar
      ))()
  }, [setSidebar])

  return <Router />
}

export default App
