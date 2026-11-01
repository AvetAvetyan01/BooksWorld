import type { ICartBook } from "../../../interfaces/entities/ICartBook"
import type { Currency } from "../../../types/unions/Currency"
import type { Language } from "../../../types/unions/Language"
import { useDeleteCartBook } from "../../../hooks/mutations/cartMutations/useDeleteCartBook"
import { pickCartBookTitle } from "../../../utilities/languagePickers"
import { CartBookCounter } from "../../../components/CartBookCounter/CartBookCounter"
import { useTranslation } from "react-i18next"
import { useUnlikeBook } from "../../../hooks/mutations/userMutations/useUnlikeBook"
import { useLikeBook } from "../../../hooks/mutations/userMutations/useLikeBook"
import { useAuth } from "../../../hooks/contexts/useAuth"
import { Link } from "react-router"
import "./cartBook.scss"

type Props = {
  cartBook: ICartBook
  currency: Currency
  language: Language
}

export function CartBook({ cartBook, currency, language } : Props){
  const { t } = useTranslation()
  const { isBookLiked } = useAuth()
  const { mutate: like } = useLikeBook()
  const { mutate: unlike } = useUnlikeBook()
  const { mutate: deleteCartBook } = useDeleteCartBook()
  
  return (  
    <li className="cart-book">
      <Link className="link" to={"/book/" + cartBook.bookId}>
        <img src={cartBook.bookImgUrl} alt="book img" />

        {cartBook.discountPercent && 
          <p className="discount-percent">{cartBook.discountPercent}%</p>}
      </Link>

      <div className="details-and-actions">
        <Link to={"/book/" + cartBook.bookId} className="title">{pickCartBookTitle(language, cartBook)}</Link>

        <div className="details-list">
          <p className="publisher">{cartBook.subbook.publisher}</p>
          <p className="language">{t(`language.${cartBook.subbook.language}`)}</p>
          <p className="format">{t(`format.${cartBook.subbook.format}`)}</p>
        </div>

        <div className="action-buttons">
          <i onClick={() => !isBookLiked(cartBook.bookId) ? like(cartBook.bookId) : unlike(cartBook.bookId)}
            className={`fa-heart ${isBookLiked(cartBook.bookId) ? `liked fa-solid` : `fa-regular`}`}></i>

          <i onClick={() => cartBook?.id && deleteCartBook(cartBook?.id)} 
            className="fa-regular fa-trash-can"></i>
        </div>
      </div>


      <div className="price-counter-container">
        <div className="price">
          {cartBook.subbook.price 
            ?
            cartBook.discountPercent   
            ?
              <> 
                <p className="current">{cartBook.subbook.discountedPrice} {currency}</p>
                <p className="previous">{cartBook.subbook.price} {currency}</p>
              </>
              : <p className="current">{cartBook.subbook.price} {currency}</p> 
            : <></>}
        </div>

        {cartBook?.subbook.format == "Paper"
          ? <CartBookCounter subbookId={cartBook.subbook.id} />
          : <div></div>}
      </div>
    </li>
  )
}