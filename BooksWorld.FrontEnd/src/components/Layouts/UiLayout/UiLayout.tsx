import { BottomNavigation } from "../../BottomNavigation/BottomNavigation"
import { ScrollLifter } from "../../ScrollChanger/ScrollChanger"
import { useLanguage } from "../../../hooks/contexts/useLanguage"
import { useTheme } from "../../../hooks/contexts/useTheme"
import { Sidebar } from "../../Sidebar/Sidebar"
import { Outlet } from "react-router"
import Header from "../../Header/Header"
import Footer from "../../Footer/Footer"
import "./uiLayout.scss"

export function UiLayout(){
  const { theme } = useTheme()
  const { language } = useLanguage()
  
  return (
    <div 
      className={`ui-app`} 
      data-theme={theme} data-language={language}>

      <ScrollLifter />

      <Header/>
      
      <Sidebar />

      <BottomNavigation />

      <main>
        <Outlet />
      </main>

      <Footer/>
    </div>
  )
}