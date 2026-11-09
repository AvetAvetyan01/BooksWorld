import { Link, useNavigate, useParams } from "react-router"
import { ReviewFormButton } from "./ReviewFormButton/ReviewFormButton"
import { EmptyDataPopup } from "../../components/EmptyDataPopup/EmptyDataPopup"
import { useBookReviews } from "../../hooks/queries/reviewQueries/useBookReviews"
import { useTranslation } from "react-i18next"
import { useBookGrades } from "../../hooks/queries/bookQueries/useBookGrades"
import { useUserReview } from "../../hooks/queries/reviewQueries/useUserReview"
import { GoBackButton } from "../../components/GoBackButton/GoBackButton"
import { pickAuthorFullname, pickBookTitle } from "../../utilities/languagePickers"
import { supabase } from "../../utilities/supabase"
import { BucketsNames } from "../../constants/BucketsNames"
import { useLanguage } from "../../hooks/contexts/useLanguage"
import { ReviewForm } from "../../components/Forms/ReviewForm/ReviewForm"
import { StarsGrade } from "../../components/StarsGrade/StarsGrade"
import { useState } from "react"
import { useBook } from "../../hooks/queries/bookQueries/useBook"
import { useAuth } from "../../hooks/contexts/useAuth"
import { Wrapper } from "../../components/Wrapper/Wrapper"
import { Loader } from "../../components/Loading/Loader"
import { Pager } from "../../components/Pager/Pager"
import Review from "../BookPage/ReviewsSection/Review/Review"
import "./reviewsPage.scss"

export function ReviewsPage(){
  const navigate = useNavigate()
  const params = useParams()
  const page = params?.page ? +params.page : 1
  const bookId = params?.bookId ? +params.bookId : undefined
  const { t } = useTranslation()
  const { language } = useLanguage()
  const { user } = useAuth();
  const { data: grades } = useBookGrades(bookId)
  const { data: book } = useBook(bookId)
  const { data: userReview } = useUserReview({ bookId: book?.id })
  const { data: reviews, isLoading: reviewsIsLoading } = useBookReviews({ bookId: bookId, page: page, size: 10 })
  const [reviewFormIsOpen, setReviewFormIsOpen] = useState(false)

  const pagerData = {
    size: 15,
    page: page,
    pagesCount: reviews?.pagesCount || 0,
    hasPrevious: reviews?.hasPrevious || false, 
    hasNext: reviews?.hasNext || false
  }

  const changePage = (newPage: number) => navigate(`/reviews/${book?.id}/${newPage}`)

  const reviewsCount = grades
    ? Object.values(grades).reduce<number>((acc, val) => acc + (Number(val) || 0), 0)
    : 0

  return (
    <section className="reviews-page">
      {reviewsIsLoading && reviews &&
        <Pager 
          data={{
            page: page,
            size: 15,
            hasNext: true,
            hasPrevious: false,
            pagesCount: 11
          }}
          submit={changePage} />}

      {(book?.id && reviews?.page) &&
        <Wrapper isActive={reviewFormIsOpen} closer={() => setReviewFormIsOpen(false)}>
          <ReviewForm 
            page={reviews?.page}
            bookId={book?.id} 
            isActive={reviewFormIsOpen}  
            closer={() => setReviewFormIsOpen(false)}/> 
        </Wrapper>}

      <article className="content">
        <div className="top">
          <GoBackButton />

          <h3 className="title">{t(`pages.reviews.title`, { title: book ? pickBookTitle(language, book) : '' })}</h3>

          {!!user && <ReviewFormButton isLeaved={!!userReview} opener={() => setReviewFormIsOpen(true)}/>}
        </div>

        {!reviewsIsLoading
          ? reviews?.collection?.length
            ?
            <ul className="reviews">
              {reviews?.collection?.map(r => <Review key={r.id} {...r}/>)}
            </ul>
            :
             <EmptyDataPopup
                type={"review"}
                title={t("pages.reviews.empty-popup.title")}
                description={t("pages.reviews.empty-popup.description")}
                homeButton={false}
              />
          : <Loader message={"Reviews are being searched"}/>} 

          <Pager 
            data={pagerData}
            submit={changePage} />
      </article>

      <article className="details">
        <div className="book-info">
          <Link to={`/book/` + book?.id} className="book-title">
            <img src={book?.imagePath ? supabase.storage.from(BucketsNames.public).getPublicUrl(book?.imagePath).data.publicUrl : ''}/>
          </Link>

          <Link to={`/book/` + book?.id} className="book-title">{book && pickBookTitle(language, book)}</Link>
          <Link to={`/author/` + book?.author?.id} className="author-fullname">{book?.author && pickAuthorFullname(language, book.author)}</Link>
        </div>

        <div className="rating-info">
          <div className="info">
            <i className="fa-solid fa-star"></i>
            <h3 className="rating-value">{book?.rating}</h3>
            <p className="reviews-count">{reviewsCount} {t(`pages.reviews.rates`)}</p>
          </div>

          <ul className="grades">
            {grades && Object.entries(grades).reverse()?.map(g => 
              <li key={g[0]} className="grade">
                <StarsGrade grade={Number(g[0])} onlyActive={true}/>
                
                <div className="right-side">
                  <div className="line-container">
                    <div style={{width: `${reviewsCount ? (Number(g[1]) * 100) / reviewsCount : 0}%`}} className="line"></div>
                  </div>

                  <p className="value">{Number(g[1])}</p>
                </div>
              </li>)}
          </ul>
        </div>
      </article>
    </section>
  )
}