import { useTranslation } from "react-i18next"
import { useLanguage } from "../../hooks/contexts/useLanguage"
import faqData from "./faqData.json"
import "./faqPage.scss"

type FAQ_Item = {
  id: number
  question: Record<string, string>
  answer: Record<string, string>
}

export function FAQPage(){
  const { t } = useTranslation()
  const { language } = useLanguage()

  return (
    <section className="faq-page">  
      <h3 className="title">{t(`pages.faq.title`)}</h3>

      <ul className="list">
        {faqData.map((d: FAQ_Item) => 
          <li key={d.id} onClick={(e) => e.currentTarget.classList.toggle("selected")}>
            <div className="question">
              <p>{d.question[language]}</p>
              <i className="fa-regular fa-plus"></i>
            </div>

            <div className="answer">
              <p className="text">{d.answer[language]}</p>
            </div>
          </li>
        )}
      </ul>
    </section>
  )
}