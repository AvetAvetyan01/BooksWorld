import { useTranslation } from "react-i18next"
import { DropdownMenu } from "../DropdownMenu/DropdownMenu"
import { HeaderSearch } from "./Navigation/HeaderSearch/HeaderSearch"
import { useLanguage } from "../../hooks/contexts/useLanguage"
import { useCurrency } from "../../hooks/contexts/useCurrency"
import { useSidebar } from "../../hooks/contexts/useSidebar"
import { useAuth } from "../../hooks/contexts/useAuth"
import { Link } from "react-router"
import DarkLightModeButton from "./Navigation/DarkLightModeButton/DarkLightModeButton"
import HorizontalMenu from "./HorizontalMenu/HorizontalMenu"
import currenciesData from "./data/currencies.json"
import languagesData from "./data/languages.json"
import Logo from "./Logo/Logo"
import "./header.scss"
import type { Currency } from "../../types/unions/Currency";
import type { Language } from "../../types/unions/Language";

export default function Header() {
  const { user } = useAuth()
  // const { data: cartBooks } = useCartBooks(user?.id)
  // const { data: cartBooks } = []
  const cartBooks = []
  const { setSidebarIsOpen } = useSidebar()
  const { language, setLanguage } = useLanguage()
  const { currency, setCurrency } = useCurrency()
  const { t } = useTranslation()

  return (
    <header>
      <section className="navigation">
        <Logo />

        <nav className="right-side">
          <HeaderSearch />

          <DropdownMenu
            activeValue={currency.toString()}
            searchingTypesData={currenciesData} 
            submit={(v) => setCurrency(v as Currency)}
            translatable={false}/>
          
          <DropdownMenu
            activeValue={language.toString()} 
            searchingTypesData={languagesData}  
            submit={(v) => setLanguage(v as Language)}/>
            
          <DarkLightModeButton />
          
          <Link to="likeds" className="button-t1">
            <i className="fa-solid fa-heart"></i>
          </Link>

          {user 
            ? 
            <>
              <Link to="cart" className="button-t1">
                <i className="fa-solid fa-cart-shopping"></i>
                {cartBooks?.length ? <p className="indicator">{cartBooks.length}</p> : <></>}
              </Link>

              <Link to="profile" className="button-t1">
                <i className="fa-regular fa-user"></i>
              </Link> 
            </>
            : 
            <>
              <Link to="/auth/login" className="button-t2">
                <p>{t("header.buttons.login")}</p>
              </Link>

              <Link to="/auth/signin" className="button-t2">
                <p>{t("header.buttons.signin")}</p>
              </Link>
            </>}
          
          <button className="button-t1 menu-button" onClick={() => setSidebarIsOpen(p => !p)}>
            <i className="fa-solid fa-bars"></i>
          </button>
        </nav>
      </section>
      
      <HorizontalMenu />
    </header>
  )
}