import { useLanguage } from "../../../hooks/contexts/useLanguage"
import { useTheme } from "../../../hooks/contexts/useTheme"
import { Outlet } from "react-router"
import AdminSidebar from "../../AdminSidebar/AdminSidebar"
import "./adminLayout.scss"

export default function AdminLayout() {
  const { theme } = useTheme()
  const { language } = useLanguage()

  return (
    <div 
      className="admin-app"
      data-theme={theme} data-language={language}>

      <AdminSidebar />
      
      <main className="admin-layout">
        <Outlet />  
      </main>
    </div>
  )
}