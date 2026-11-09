import { useTranslation } from "react-i18next"
import "./reviewFormButton.scss"

type Props = {
  isLeaved: boolean
  opener: () => void
}

export function ReviewFormButton(props: Props){
  const { t } = useTranslation()

  return (
    // <button className="review-form-button" onClick={() => opener()}>
    // <button className="review-form-button" onClick={opener}>
    //   <i className={`fa-solid ${leaved ? 'fa-arrows-rotate' : 'fa-plus'}`}></i>
    //   <p>{leaved ? t(`review-form.change-review`) : t(`review-form.leave-review`)}</p>
    // </button>
    <button className="review-form-button" onClick={props.opener}>
      <i className={`fa-solid ${props.isLeaved ? 'fa-arrows-rotate' : 'fa-plus'}`}></i>
      <p>{props.isLeaved ? t(`review-form.change-review`) : t(`review-form.leave-review`)}</p>
    </button>
  )
}