import { useLanguage } from "../../hooks/contexts/useLanguage"
import { useAuth } from "../../hooks/contexts/useAuth"
import { useUserInfo } from "../../hooks/queries/userQueries/useUserInfo"
import { useLogout } from "../../hooks/mutations/userMutations/useLogout"
import { Link } from "react-router"
import profileMenuData from "./profileMenuData.json"
import "./profilePage.scss"

type Props = { 
  id: number
  url: string
  icon: string
  name: Record<string, string>
}

export default function ProfilePage(){
  const { language } = useLanguage()
  const { user } = useAuth()
  const { data: userInfo } = useUserInfo()

  const { mutate: logout } = useLogout()

  const events = { 7 : logout } as Record<number, () => void>

  return (
    <section className="profile-page">
      <article className="user">  
        <img className="background" src="/images/banners/profile-banner.avif" />

        <img className="avatar" src="/images/banners/avatar.jpg" />

        <div className="info">
          <p className="name">{user?.name}</p>
          <p className="email">{userInfo?.email}</p>
        </div>
      </article>

      <ul className="menu">
        {profileMenuData.map((d : Props) => 
          <li onClick={events[d.id]} key={d.id}>
            <Link to={d.url}>
              <i className={d.icon}></i>
              <p>{d.name[language]}</p>
            </Link>
          </li>
        )}
      </ul>      
    </section>
  )
}