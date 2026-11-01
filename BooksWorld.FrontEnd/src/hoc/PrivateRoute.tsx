import { Navigate } from "react-router";
import { useRole } from "../hooks/queries/userQueries/useRole";
import { Loader } from "../components/Loading/Loader";
import type { ReactNode } from "react";

export function PrivateRoute({ children } : { children: ReactNode }){
  const { data: role, isLoading } = useRole()

  // we can write access denied, not found or go to login page
  // useEffect(() => console.log(role), [role])

  return !isLoading
    ? role == "Admin"
      ? children
      : <Navigate to="/not-found" replace />
    : <Loader message={"Loading"}/>
}