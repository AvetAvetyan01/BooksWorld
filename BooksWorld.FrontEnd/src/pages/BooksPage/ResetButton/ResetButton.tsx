import { useTranslation } from "react-i18next"
import { useFormContext } from "react-hook-form"
import { useBooksForm } from "../../../hooks/contexts/useBooksForm"
import "./resetButton.scss"

export function ResetButton(){
  const { t } = useTranslation()
  const { reset } = useFormContext()
  const { submitForm } = useBooksForm()

  const handleClick = () => {
    reset()
    submitForm()  
  }

  return (
    <button onClick={handleClick} className="reset-button">
      <i className="fa-solid fa-arrow-rotate-right"></i>
      <p>{t(`pages.books.reset-button`)}</p>
    </button>
  )
}