import { useTranslation } from "react-i18next"
import "./notificationAccess.scss"

export default function NotificationAccess() {
  const { t } = useTranslation()

  return (
    <article className="notification-access">
      <p className="title">{t("footer.notification-access.title")}</p>

      <div className="input-space">
        <input type="email" placeholder={t("footer.notification-access.input-placeholder")} />
        <button><i className="fa-solid fa-arrow-right"></i></button>
      </div>

      <p className="info">{t("footer.notification-access.info")}</p>
    </article>
  )
}