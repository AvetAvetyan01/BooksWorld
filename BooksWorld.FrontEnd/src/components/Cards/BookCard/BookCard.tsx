import type { IBook } from "../../../interfaces/entities/IBook"
import { pickAuthorFullname, pickBookTitle } from "../../../utilities/languagePickers"
import { useUnlikeBook } from "../../../hooks/mutations/userMutations/useUnlikeBook"
import { BucketsNames } from "../../../constants/BucketsNames"
import { useLikeBook } from "../../../hooks/mutations/userMutations/useLikeBook"
import { useLanguage } from "../../../hooks/contexts/useLanguage"
import { supabase } from "../../../utilities/supabase"
import { useAuth } from "../../../hooks/contexts/useAuth"
import { Link } from "react-router"
import FlagIcons from "../../FlagIcons/FlagIcons"
import "./bookCard.scss"

export default function BookCard(book : IBook) {
  const { language } = useLanguage()
  const { isBookLiked } = useAuth()
  const { mutate: like,  } = useLikeBook()
  const { mutate: unlike } = useUnlikeBook()

  const bookImg = book?.imagePath && supabase.storage.from(BucketsNames.public).getPublicUrl(book.imagePath).data.publicUrl

  return (
    <li className="book-card">
      <Link className="link" to={`/book/${book.id}`}>
        <div className="top-icons">
          {book.discountPercent ? <p className="discount">{`-${book.discountPercent}%`}</p> : <p></p>}

          <i 
            onClick={(e) => {e.preventDefault(); if (!isBookLiked(book?.id)) like(book?.id); else unlike(book?.id) }}   
            className={`heart-icon fa-heart ${isBookLiked(book.id) ? "fa-solid visible" : "fa-regular"}`}>
          </i>
        </div>  

        {/* <img className="image" src={book.imageUrl} alt="book" /> */}
        {/* <img className="image" src={book.imagePath} alt="book" /> */}
        {/* <img className="image" src={bookImg ? bookImg.data.publicUrl : ''} alt="book" /> */}
        <img className="image" src={bookImg} alt="book" />
      </Link>

      <div className="title-and-author">
        <Link 
          to={`/book/${book.id}`} 
          title={pickBookTitle(language, book)} 
          className="title">
          {pickBookTitle(language, book)}
        </Link>

        <Link 
          to={`/author/${book.author.id}`}  
          className="author">
          {pickAuthorFullname(language, book.author)}
        </Link>
      </div>

      <div className="rating-and-formats">
        {book.rating 
          ? <div className="rating">
              <i className="star-icon fa-solid fa-star"></i>
              <p className="value">{book.rating}</p>
            </div> 
          : <div></div>}

        <ul className="formats">
          <FlagIcons flags={book.formats} />
        </ul>
      </div>
    </li>
  )
}