import { useContext } from "react";
import { OpenedMenuIdContext } from "../../contextProviders/OpenedMenuId/OpenedMenuIdContext";

export function useOpenedMenuId(){
  return useContext(OpenedMenuIdContext)
}