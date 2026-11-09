import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router"
import "./notFoundPage.scss"

export default function NotFoundPage() {
  const navigate = useNavigate();
  const { t } = useTranslation()

  const goBack = () => navigate(-1)

  return (
    <section className="not-found-page">
      <h2 className="status-code">404</h2> 

      <h2 className="error-name">
        {t(`pages.not-found.title`)}
      </h2>

      <p className="description">{t(`pages.not-found.description`)}</p>

      <button onClick={goBack}>
        <i className="fa-solid fa-arrow-left"></i>
        <p>{t(`pages.not-found.button-text`)}</p>
      </button>
    </section>
  )
}