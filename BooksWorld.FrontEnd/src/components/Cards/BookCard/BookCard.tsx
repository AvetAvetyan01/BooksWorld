import type { IBookCard } from "../../../interfaces/cards/IBookCard"
import { useUnlikeBook } from "../../../hooks/mutations/userMutations/useUnlikeBook"
import { BucketsNames } from "../../../constants/BucketsNames"
import { useLikeBook } from "../../../hooks/mutations/userMutations/useLikeBook"
import { supabase } from "../../../utilities/supabase"
import { useAuth } from "../../../hooks/contexts/useAuth"
import { Link } from "react-router"
import FlagIcons from "../../FlagIcons/FlagIcons"
import "./bookCard.scss"

export default function BookCard(book : IBookCard) {
  const { isBookLiked } = useAuth()
  const { mutate: like,  } = useLikeBook()
  const { mutate: unlike } = useUnlikeBook()

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

        <img className="image" src={book?.imagePath ? supabase.storage.from(BucketsNames.public).getPublicUrl(book.imagePath).data.publicUrl : ''} alt="book" />
      </Link>

      <div className="title-and-author">
        <Link 
          to={`/book/${book.id}`} 
          title={book.title}
          className="title">
          {book.title}
        </Link>

        <Link 
          to={`/author/${book.authorId}`}  
          className="author">
          {book.authorFullName}
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