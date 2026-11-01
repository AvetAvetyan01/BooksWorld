import { NavLink } from "react-router";
import { useAuth } from "../../hooks/contexts/useAuth";
import adminSidebarData from "./AdminSidebarData.json"
import DarkLightModeButton from "../Header/Navigation/DarkLightModeButton/DarkLightModeButton";
import "./adminSidebar.scss";
import { DropdownMenu } from "../DropdownMenu/DropdownMenu";
import { useLanguage } from "../../hooks/contexts/useLanguage";
import type { Language } from "../../types/unions/Language";
import languagesData from "./languages.json"

export default function AdminSidebar(){
  const { language, setLanguage } = useLanguage()
  const { user } = useAuth()

  return (
    <aside className="admin-sidebar">
      <h1>
        Books World <br/> Administrator
      </h1>
      
      <ul className="menu">
        {adminSidebarData.map((d) => 
          <li key={d.id}>
            <NavLink to={d.url}>
              <i className={d.icon}></i>
              <p>{d.name[language as keyof typeof d.name] ?? d.name.English}</p>
            </NavLink>
          </li>
        )}
      </ul>

      
      <DropdownMenu
        activeValue={language.toString()} 
        searchingTypesData={languagesData}  
        submit={(v) => setLanguage(v as Language)}/>
      
      <DarkLightModeButton />

      <section className="user-info">
        <img className="avatar" src="/images/banners/avatar.jpg"/>

        <div className="info">
          <p className="name">{user?.name}</p>
          <p className="email">{user?.email}</p>
        </div>
      </section>
    </aside>
  )
}