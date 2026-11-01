import NotificationAccess from "./NotificationAccess/NotificationAccess"
import SocialMediaMenu from "./SocialMediaMenu/SocialMediaMenu"
import FooterMenu from "./FooterMenu/FooterMenu"
import "./footer.scss"

export default function Footer() {
  return (
    <footer>
      <FooterMenu />

      <NotificationAccess />

      <SocialMediaMenu />
    </footer>
  )
}