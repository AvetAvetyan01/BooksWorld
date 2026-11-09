import { SidebarContext } from "../../contextProviders/Sidebar/SidebarContext";
import { useContext } from "react";

export function useSidebar(){
  return useContext(SidebarContext)
}