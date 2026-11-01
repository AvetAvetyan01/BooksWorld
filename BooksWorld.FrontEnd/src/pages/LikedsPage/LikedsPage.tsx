import { EmptyDataPopup } from "../../components/EmptyDataPopup/EmptyDataPopup"
import { useTranslation } from "react-i18next"
import { useBooksList } from "../../hooks/queries/bookQueries/useBooksList"
import { useAuth } from "../../hooks/contexts/useAuth"
import { Loader } from "../../components/Loading/Loader"
import BookCard from "../../components/Cards/BookCard/BookCard"
import "./likedsPage.scss"  

export function LikedsPage(){
  const { t } = useTranslation()
  const { user, anonymousUserLikeds } = useAuth()
  const { data: likedBooks, isLoading } = useBooksList(user ? user?.likedBooksIds : anonymousUserLikeds)

  return (
    <section className="likeds-page">
      {!isLoading
        ? likedBooks?.length 
          ? 
          <>
            <article className="title">
              <i className="fa-heart fa-solid"></i>
              <h2>{t(`pages.likeds.title`)}</h2>
            </article>

            <ul className="books-vertical-list">
              {likedBooks?.map(book => <BookCard key={book.id} {...book} />)}
            </ul>
          </>
          :
          <EmptyDataPopup 
            type={"likeds"}
            title={t(`pages.likeds.empty-popup.title`)}
            description={t(`pages.likeds.empty-popup.description`)}
          />
        : 
        <Loader message={t(`pages.likeds.loading-message`)} />
      }
    </section>
  ) 
}