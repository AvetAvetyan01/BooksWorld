import { ReviewFormButton } from "../../ReviewsPage/ReviewFormButton/ReviewFormButton";
import { useBookReviews } from "../../../hooks/queries/reviewQueries/useBookReviews";
import { useTranslation } from "react-i18next";
import { useUserReview } from "../../../hooks/queries/reviewQueries/useUserReview";
import { ReviewForm } from "../../../components/Forms/ReviewForm/ReviewForm";
import { useState } from "react";
import { useAuth } from "../../../hooks/contexts/useAuth";
import { Wrapper } from "../../../components/Wrapper/Wrapper";
import { Loader } from "../../../components/Loading/Loader";
import { Link } from "react-router";
import Review from "./Review/Review";
import "./reviewsSection.scss"

export default function ReviewsSection({ bookId } : { bookId: number }) {
  const { t } = useTranslation()
  const { user } = useAuth()
  const [page, setPage] = useState(1)
  const [reviewFormIsOpen, setReviewFormIsOpen] = useState(false)
  const { data: reviews, isLoading: isReviwsLoading } = useBookReviews({ bookId: bookId, page: page, size: 10 })
  const { data: userReview } = useUserReview({ bookId: bookId })

  return (
    <>
    <Wrapper closer={() => setReviewFormIsOpen(false)} isActive={reviewFormIsOpen}>
      <ReviewForm 
        page={page}
        bookId={bookId} 
        isActive={reviewFormIsOpen}
        closer={() => setReviewFormIsOpen(false)} />
    </Wrapper>

    <section className="reviews-section">
      <article className="header">
        <h3 className="title">{t(`pages.book.titles.reviews`)}</h3>  

        {(reviews?.pagesCount && reviews?.collection?.length) && 
          <Link to={`/reviews/${bookId}/1`}>
            <i className="fa-solid fa-border-all"></i>
            <p>{t(`pages.book.buttons.view-all-reviews`)}</p>
          </Link>}

        {user && <ReviewFormButton isLeaved={!!userReview} opener={() => setReviewFormIsOpen(true)} />}
      </article>
      
      {!isReviwsLoading
        ? reviews?.collection?.length
          ? 
          <ul className="reviews">
            {reviews?.collection?.map((review) => 
              <Review key={review.id} {...review} />)}
          </ul>
          : 
          <div className="error-message">
            <i className="fa-solid fa-ban"></i>
            <p>There are no reviews for this book</p>
          </div>
        :
        <Loader message={"Reviews are being searched"}/>}
    
      {reviews && reviews?.pagesCount > 1 &&
        <article className="pagination-buttons">
          <button 
            disabled={!reviews?.hasPrevious}
            onClick={() => setPage(page - 1)}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>

          <button 
            disabled={!reviews?.hasNext}
            onClick={() => setPage(page + 1)}>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </article>}
    </section>
    </>
  )
}