import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AlertProvider from "./AlertProvider"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="h-screen w-full">
        <SidebarTrigger className="absolute bottom-0 mt-auto" />
        <AlertProvider>{children}</AlertProvider>
      </main>
    </SidebarProvider>
  )
}
