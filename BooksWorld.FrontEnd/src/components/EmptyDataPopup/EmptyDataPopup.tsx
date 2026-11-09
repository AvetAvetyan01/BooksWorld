import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import "./emptyDataPopup.scss"

type Props = {
  type: 'likeds' | 'cart' | 'review' | "shoppings"
  title: string
  description: string
  homeButton?: boolean
}

export function EmptyDataPopup({ type, title, description, homeButton = true } : Props) {
  const { t } = useTranslation()

  return (
    <article className="empty-data-popup">
      {type == "likeds"     && <i className="fa-solid fa-heart"></i>}
      {type == "cart"       && <i className="fa-solid fa-cart-shopping"></i>}
      {type == "review"     && <i className="fa-solid fa-comments"></i>}
      {type == "shoppings"  && <i className="fa-solid fa-basket-shopping"></i>}

      <p className="title">{title}</p>
      <p className="description">{description}</p>

      {homeButton && <Link to={"/home"}>{t(`empty-popup.home-button`)}</Link>}
    </article>
  )
}