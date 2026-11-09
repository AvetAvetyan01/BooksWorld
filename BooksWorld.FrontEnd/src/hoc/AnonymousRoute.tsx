import { Navigate } from "react-router";
import { useRole } from "../hooks/queries/userQueries/useRole";
import { Loader } from "../components/Loading/Loader";
import type { ReactNode } from "react";

export function AnonymousRoute({ children } : { children: ReactNode } ){
  const { data: role, isLoading } = useRole()  
  
  return !isLoading
    ? !role
      ? children
      : <Navigate to={"/"} replace />  
    : <Loader message={"Loading"}/>
}