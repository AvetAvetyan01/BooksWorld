import { useContext } from "react";
import { AuthContext } from "../../contextProviders/Auth/AuthContext";

export function useAuth() {
  return useContext(AuthContext)
}