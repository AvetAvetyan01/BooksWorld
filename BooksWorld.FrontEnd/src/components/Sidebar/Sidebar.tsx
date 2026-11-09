import type { Currency } from "../../types/unions/Currency"
import type { Language } from "../../types/unions/Language"
import { DropdownMenu } from "../DropdownMenu/DropdownMenu"
import { useCurrency } from "../../hooks/contexts/useCurrency"
import { useLanguage } from "../../hooks/contexts/useLanguage"
import { useSidebar } from "../../hooks/contexts/useSidebar"
import { Wrapper } from "../Wrapper/Wrapper"
import { Link } from "react-router"
import horizontalMenuData from "../Header/HorizontalMenu/HorizontalMenuData.json"
import currenciesData from "../Header/data/currencies.json"
import languagesData from "../Header/data/languages.json"
import DarkLightModeButton from "../Header/Navigation/DarkLightModeButton/DarkLightModeButton"
import "./sidebar.scss"

export function Sidebar() {
  const { currency, setCurrency } = useCurrency()
  const { language, setLanguage } = useLanguage()
  const { sidebarIsOpen, setSidebarIsOpen } = useSidebar() 

  return (
    <Wrapper isActive={sidebarIsOpen} closer={() => setSidebarIsOpen(false)}>  
      <section 
        onClick={(e) => {e.stopPropagation(); e.preventDefault()}} 
        className={`sidebar ${sidebarIsOpen ? "active" : ""}` }>

        <article className="top"> 
          <DarkLightModeButton />

          <DropdownMenu 
            activeValue={currency}
            searchingTypesData={currenciesData}   
            submit={(v) => setCurrency(v as Currency)}
            translatable={false} />
          
          <DropdownMenu 
            activeValue={language} 
            searchingTypesData={languagesData}  
            submit={(v) => setLanguage(v as Language)} />

          <i onClick={() => setSidebarIsOpen(p => !p)} className="fa-solid fa-xmark close-button"></i>
        </article>

        <ul className="sidebar-menu">
          {horizontalMenuData.map((data : { url: string, name: Record<string, string> }) =>
            <li key={data.name[language]}>
              <Link to={data.url} onClick={() => setSidebarIsOpen(false)}>
                {data.name[language]}
              </Link>
            </li>
          )}
        </ul>
      </section>
    </Wrapper>    
  )
}