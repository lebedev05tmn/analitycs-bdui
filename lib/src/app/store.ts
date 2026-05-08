import type { SidebarType } from "@/components/app-sidebar"
import { create } from "zustand"

interface Store {
  sidebarContent: SidebarType[]
  setSidebar: (sidebar: SidebarType[]) => void
}

export const useStore = create<Store>((set) => ({
  sidebarContent: [],
  setSidebar: (sidebar) =>
    set((state) => ({
      ...state,
      sidebarContent: sidebar,
    })),
}))