import type { SidebarType } from "@/components/app-sidebar"
import { create } from "zustand"

interface AppStore {
  sidebarContent: SidebarType[]
  setSidebar: (sidebar: SidebarType[]) => void
}

export const useAppStore = create<AppStore>((set) => ({
  sidebarContent: [],
  setSidebar: (sidebar) =>
    set((state) => ({
      ...state,
      sidebarContent: sidebar,
    })),
}))