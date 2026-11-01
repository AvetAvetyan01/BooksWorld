import { useUserBoughtSubbooks } from "../../hooks/queries/userQueries/useUserBoughtSubbooks"
import { useBooksList } from "../../hooks/queries/bookQueries/useBooksList"
import { useTranslation } from "react-i18next"
import { Loader } from "../../components/Loading/Loader"
import { EmptyDataPopup } from "../../components/EmptyDataPopup/EmptyDataPopup"
import BookCard from "../../components/Cards/BookCard/BookCard"
import "./shoppingsPage.scss"

export function ShoppingsPage(){
  const { data: boughtSubbooks, isLoading: isBoughtsLoading } = useUserBoughtSubbooks()
  const { data: boughtBooks, isLoading: isBooksLoading } = useBooksList([...new Set(boughtSubbooks?.map(bs => bs.bookId))])
  const { t } = useTranslation()

  return (
    <section className="shoppings-page">
      {!isBooksLoading && !isBoughtsLoading
        ? boughtBooks?.length 
          ? 
          <>
            <article className="title">
              <i className="fa-solid fa-basket-shopping"></i>
              <h2>{t(`pages.shoppings.title`)}</h2>
            </article>

            <ul className="books-vertical-list">
              {boughtBooks?.map(book => <BookCard key={book.id} {...book} />)}
            </ul>
          </>
          :
          <EmptyDataPopup
            type={"shoppings"}
            title={t(`pages.shoppings.empty-popup.title`)}
            description={t(`pages.shoppings.empty-popup.description`)}/>
        : 
        <Loader message={t(`pages.shoppings.loading-message`)} />
      }
    </section>
  )
}