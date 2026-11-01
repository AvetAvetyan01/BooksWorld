import { useSidebar } from "../../hooks/contexts/useSidebar"
import { Link } from "react-router"
import { useTranslation } from "react-i18next"
import { useAuth } from "../../hooks/contexts/useAuth"
import "./bottomNavigation.scss"

// type NavigationProps = {
//   id: number,
//   url: string,
//   icon: string,
//   name: Record<string, string>
// }

export function BottomNavigation(){
  const { user } = useAuth()
  const { t } = useTranslation()
  const { setSidebarIsOpen } = useSidebar()
  
  return (  
    <section className="bottom-navigation">
      {/* <li onClick={() => setSidebarIsOpen(p => !p)}>
        <span>
          <i className="fa-solid fa-bars"></i>
          <p>Menu</p>
        </span>
      </li> */}

      <li>
        <Link to={"/home"}>
          <i className="fa-solid fa-home"></i>
          <p>{t("bottom-navigation.buttons.home")}</p>
        </Link>
      </li>
      
      <li>
        <Link to={"/likeds"}>
          <i className="fa-regular fa-heart"></i>
          <p>{t("bottom-navigation.buttons.likeds")}</p>
        </Link>
      </li>
      
      {user 
        ?
          <>
            <li>
              <Link to={"/cart"}>
                <i className="fa-solid fa-shopping-cart"></i>
                <p>{t("bottom-navigation.buttons.cart")}</p>
              </Link>
            </li>
            
            <li>
              <Link to={"/profile"}>
                <i className="fa-regular fa-user"></i>
                <p>{t("bottom-navigation.buttons.profile")}</p>
              </Link>
            </li>
          </>
        :
          <>
            <li>
              <Link to={"/tops"}>
                <i className="fa-solid fa-ranking-star"></i>
                <p>{t("bottom-navigation.buttons.tops")}</p>
              </Link>
            </li>
            
            <li>
              <Link to={"/books"}>
                <i className="fa-solid fa-book"></i>
                <p>{t("bottom-navigation.buttons.books")}</p>
              </Link>
            </li>
          </>
        }
      

      <li onClick={() => setSidebarIsOpen(p => !p)}>
        <span>
          <i className="fa-solid fa-bars"></i>
          <p>{t("bottom-navigation.buttons.menu")}</p>
        </span>
      </li>
    </section>
  )
}