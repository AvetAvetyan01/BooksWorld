import type { ISubbook } from "../../interfaces/entities/ISubbook"
import type { BooksRequest } from "../../types/requests/BooksRequest";
import { pickAuthorFullname, pickBookDescription, pickBookTitle, pickGenreName } from "../../utilities/languagePickers";
import { useState } from "react"
import { DocuemntViewer } from "../../components/DocumentViewer/DocumentViewer"
import Subbook from "./Subbook/Subbook"
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { useBook } from "../../hooks/queries/bookQueries/useBook";
import { useBookPrivateFile } from "../../hooks/queries/filesQueries/useBookPrivateFile";
import { useBookSubbooks } from "../../hooks/queries/subbookQueries/useBookSubbooks";
import { useBooks } from "../../hooks/queries/bookQueries/useBooks";
import { useLikeBook } from "../../hooks/mutations/userMutations/useLikeBook";
import { useUnlikeBook } from "../../hooks/mutations/userMutations/useUnlikeBook";
import { useAddCartBook } from "../../hooks/mutations/cartMutations/useAddCartBook";
import { useDeleteCartBook } from "../../hooks/mutations/cartMutations/useDeleteCartBook";
import { GoBackButton } from "../../components/GoBackButton/GoBackButton"
import { useAuth } from "../../hooks/contexts/useAuth"
import { useLanguage } from "../../hooks/contexts/useLanguage"
import { useCurrency } from "../../hooks/contexts/useCurrency"
import { CartBookCounter } from "../../components/CartBookCounter/CartBookCounter"
import { Link } from "react-router"
import { Wrapper } from "../../components/Wrapper/Wrapper"
import { AudioPlayer } from "../../components/AudioPlayer/AudioPlayer"
import { BucketsNames } from "../../constants/BucketsNames";
import { supabase } from "../../utilities/supabase";
import { useUserBoughtSubbooks } from "../../hooks/queries/userQueries/useUserBoughtSubbooks";
import BooksCollection from "../../components/Collections/BooksCollection/BooksCollection"
import ReviewsSection from "./ReviewsSection/ReviewsSection"
import BookDetail from "./BookDetail/BookDetail"
import "./bookPage.scss"

export default function BookPage(){
  const params = useParams()
  const bookId = params?.id ? +params.id : undefined
  const { t } = useTranslation()
  const { user, isBookLiked, subbookIsInCart } = useAuth();
  const { currency } = useCurrency()
  const { language } = useLanguage()
  const { data: book } = useBook(bookId) 
  const { data: subbooks } = useBookSubbooks(bookId, book?.discountPercent)
  // in future we need to search books, with same genre, author, 
  // probably format or language. and if their count are small for example from 15
  // we need to fill collection with second request books, witch selected randomly or staticly 
  const { data: recomendedBooks } = useBooks({ page: 1, size: 15 } as BooksRequest)
  const { data: boughtSubbooks } = useUserBoughtSubbooks()
  const { mutate: unlike, isPending: unlikeIsPending } = useUnlikeBook()
  const { mutate: like, isPending: likeIsPending } = useLikeBook()
  const { mutate: addCartBook, isPending: addCartBookPending } = useAddCartBook()
  const { mutate: deleteCartBook, isPending: deleteCartBookPending } = useDeleteCartBook()
  const [activeSubbook, setActiveSubbook] = useState<ISubbook | undefined>()
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isFullViewierOpen, setIsFullViewerOpen] = useState(false)
  const { data: file } = useBookPrivateFile({ subbookId: activeSubbook?.id, isPaperbook: activeSubbook?.format == "Paper"})
  
  const subbookPreviewFile = activeSubbook?.introductionFilePath && 
    supabase.storage
      .from(BucketsNames.public)
      .getPublicUrl(activeSubbook?.introductionFilePath).data.publicUrl

  const bookImg = book?.imagePath && 
    supabase.storage
      .from(BucketsNames.public)
      .getPublicUrl(book?.imagePath).data.publicUrl
  
  if (subbooks && !activeSubbook) setActiveSubbook(subbooks?.[0])

  const handleCartButton = (subbookId: number) => 
    subbookIsInCart(subbookId) 
      ? deleteCartBook(user?.cartBooks.find(cb => cb.subbookId == subbookId)?.id) 
      : addCartBook(subbookId)

  return book && (
    <>
      <Wrapper isActive={isPreviewOpen} closer={() => setIsPreviewOpen(false)} >
        {activeSubbook && activeSubbook?.format == "Audio"
          ? subbookPreviewFile && <div className="audio-preview"><AudioPlayer audioSrc={subbookPreviewFile} /></div>
          : subbookPreviewFile && <DocuemntViewer fileSrc={subbookPreviewFile}/>}
      </Wrapper>

      <Wrapper isActive={isFullViewierOpen} closer={() => setIsFullViewerOpen(false)} >
        {activeSubbook && activeSubbook?.format == "Audio"
          ? file && <div className="audio-preview"><AudioPlayer audioSrc={file?.data} /></div>
          : file && <DocuemntViewer fileSrc={file?.data}/>}
      </Wrapper>

      <section className="book-page">
        <section className="top-section">
          <GoBackButton />
          
          <article className="left-side">
            <img src={bookImg} alt="book image" />
            <button onClick={() => setIsPreviewOpen(p => !p)}>{t('pages.book.preview')}</button>          
          </article>

          <article className="right-side">
            <h1 className="title">{pickBookTitle(language, book)}</h1>

            <div className="rating">
              <i className="fa-solid fa-star"></i>
              <p className="value">{book.rating}</p>
            </div>

            <Link to={`/author/${book.author.id}`} className="author-info">
              <img src={book.author.imagePath} alt="author image" />
              <h2 className="fullname">{pickAuthorFullname(language, book.author)}</h2>  
            </Link>

            <div className="action-buttons">
              <button 
                disabled={likeIsPending || unlikeIsPending}
                onClick={() => !isBookLiked(book.id) ? like(book.id) : unlike(book.id)}
                >
                <i className={`fa-heart ${isBookLiked(book.id) ? `fa-solid ` : `fa-regular`}`}></i>
                <p>
                  {isBookLiked(book.id) 
                    ? t(`pages.book.buttons.unlike`) 
                    : t(`pages.book.buttons.like`)}
                </p>
              </button>
            
              {user && activeSubbook 
                ? activeSubbook.format != "Paper" && boughtSubbooks?.some(bs => bs.subbookId == activeSubbook?.id)
                  ? (() => 
                    {
                      switch(activeSubbook.format)
                      {
                        case "Electronic":
                          return (
                            <button disabled={!file?.data} onClick={() => setIsPreviewOpen(p => !p)}>
                              <i className="fa-brands fa-readme"></i>
                              <p>{t("pages.book.buttons.read-online")}</p>
                            </button>
                          )
                        case "Audio":
                          return (
                            <button disabled={!file?.data} onClick={() => setIsPreviewOpen(p => !p)}>
                              <i className="fa-solid fa-headphones"></i>
                              <p>{t("pages.book.buttons.listen-online")}</p>
                            </button>
                          )
                      }
                    })()  
                  : 
                    <>
                      <button 
                        disabled={addCartBookPending || deleteCartBookPending}
                        onClick={() => handleCartButton(activeSubbook?.id)}
                        >
                        <i className={(subbookIsInCart(activeSubbook.id) ? "fa-solid " : "fa-solid ") + "fa-cart-shopping" }></i>
                        <p>
                          {subbookIsInCart(activeSubbook.id) 
                            ? t(`pages.book.buttons.remove-from-cart`) 
                            : t(`pages.book.buttons.add-to-cart`) }
                        </p>
                      </button>
                      
                      {subbookIsInCart(activeSubbook.id) && activeSubbook.format == "Paper"
                        ? <CartBookCounter subbookId={activeSubbook.id}/> : <></>}
                    </>
                : <></>}
            </div>

            {book?.discountPercent &&
              <div className="discount">
                <i className="fa-solid fa-tags"></i>
                <p>{book.discountPercent}%</p>
              </div>}

            <ul className="subbooks">
              {subbooks?.map(s =>
                <Subbook
                  key={s.id}
                  onClick={() => setActiveSubbook(s)}
                  currency={currency}
                  isSelected={s.id == activeSubbook?.id}
                  subbook={s} />)}
            </ul>
          </article>
        </section>
        
        <section className="details-section">
          <article className="details">
            <h4 className="title">{t(`pages.book.titles.details`)}</h4>

            <ul className="details-list">
              {book && <BookDetail name={t(`pages.book.details.genre`)} value={pickGenreName(language, book.genre)} /> }

              {activeSubbook?.year       && <BookDetail name={t(`pages.book.details.year`)}      value={activeSubbook.year.toString()} />}
              {activeSubbook?.format     && <BookDetail name={t(`pages.book.details.format`)}    value={t(`format.${activeSubbook.format}`)}/> }
              {activeSubbook?.publisher  && <BookDetail name={t(`pages.book.details.publisher`)} value={activeSubbook.publisher}/> }
              {activeSubbook?.language   && <BookDetail name={t(`pages.book.details.language`)}  value={t(`language.${activeSubbook.language}`)}/> }

              {activeSubbook?.format == "Paper" || activeSubbook?.format == "Electronic" ? 
                <BookDetail name={t(`pages.book.details.pages-count`)} value={activeSubbook?.details.PagesCount}/> : <></>} 

              {activeSubbook?.format == "Audio" && 
                <>
                  <BookDetail name={t(`pages.book.details.reader`)} value={activeSubbook?.details?.Reader}/>  
                  <BookDetail name={t(`pages.book.details.duration`)} value={activeSubbook?.details?.Duration}/>     
                </>}
            </ul>
          </article>

          <article className="description">
            <p className="title">{t(`pages.book.titles.description`)}</p>
            <p className="text">{pickBookDescription(language, book)}</p>
          </article>
        </section>
        
        <ReviewsSection bookId={book.id}/>
        
        <section className="recomended-books">
          <BooksCollection 
            title={t(`pages.book.titles.recommended-books`)}
            data={recomendedBooks?.collection} />
        </section>
      </section>
    </>
  )
}