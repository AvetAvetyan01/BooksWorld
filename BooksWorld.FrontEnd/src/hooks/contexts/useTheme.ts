import { useContext } from "react";
import { ThemeContext } from "../../contextProviders/Theme/ThemeContext";

export function useTheme(){
  return useContext(ThemeContext)
}