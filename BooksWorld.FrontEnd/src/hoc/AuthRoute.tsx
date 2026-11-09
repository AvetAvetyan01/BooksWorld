import { Navigate, useLocation } from "react-router";
import { useRole } from "../hooks/queries/userQueries/useRole";
import { Loader } from "../components/Loading/Loader";
import type { ReactNode } from "react";

export function AuthRoute({ children } : { children: ReactNode }){
  const location = useLocation()
  const { data: role, isLoading } = useRole()

  return !isLoading
    ? role == "User"
      ? children  
      : <Navigate to="/auth/login" replace state={{from: location}}/>  
    : <Loader message={"Loading"}/>
}