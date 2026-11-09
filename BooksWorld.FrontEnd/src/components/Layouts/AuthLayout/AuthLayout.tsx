import { GoBackButton } from "../../GoBackButton/GoBackButton";
import { useTheme } from "../../../hooks/contexts/useTheme";
import { Outlet } from "react-router";
import "./authLayout.scss"

export default function AuthLayout() {
  const { theme } = useTheme()

  return (
    <main className="auth-layout" data-theme={theme}>
      <GoBackButton />

      <Outlet />
    </main>
  )
}