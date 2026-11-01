import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { useRole } from "../hooks/queries/userQueries/useRole";
import { Loader } from "../components/Loading/Loader";

export function UserRoute({ children } : { children: ReactNode }){
  const { data: role, isLoading } = useRole()

  return !isLoading
    // ? !role || role == "User"
    ? role != "Admin"
      ? children
      : <Navigate to={role == "Admin" ? "admin/not-found" : "not-found"} replace />
      // : <Navigate to={"not-found"} replace />
    : <Loader message={"Loading"}/>
}