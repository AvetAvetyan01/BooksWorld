import { WindowSizeContext } from "../../contextProviders/WindowSize/WindowSizeContext";
import { useContext } from "react";

export function useWindowSize(){
  return useContext(WindowSizeContext)
}