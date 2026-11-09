import type { BooksRequest } from "../../types/requests/BooksRequest"
import { useTranslation } from "react-i18next"
import { GoBackButton } from "../../components/GoBackButton/GoBackButton"
import { useLanguage } from "../../hooks/contexts/useLanguage"
import { useAuthor } from "../../hooks/queries/authorQueries/useAuthor"
import { useParams } from "react-router"
import { useBooks } from "../../hooks/queries/bookQueries/useBooks"
import { BucketsNames } from "../../constants/BucketsNames"
import { supabase } from "../../utilities/supabase"
import BooksCollection from "../../components/Collections/BooksCollection/BooksCollection"
import "./authorPage.scss"
import { pickAuthorAutobiographical, pickAuthorFullname } from "../../utilities/languagePickers"

export default function AuthorPage(){
  const params = useParams()
  // const authorId = Number.isNaN(+params.id) || params.id  ? +params.id : 0 
  const authorId = params.id ? +params.id : 0 
  const { t } = useTranslation()
  const { language } = useLanguage()
  const { data: author } = useAuthor(authorId ? Number(authorId) : 0)
  const { data: books } = useBooks({
    page: 1,
    size: 15,
    authorId: authorId
  } as BooksRequest)
  
  const authorImg = author?.imagePath &&
      supabase.storage.from(BucketsNames.public).getPublicUrl(author?.imagePath).data.publicUrl
  
  return author && (
    <section className="author-page">
      <GoBackButton />

      <article className="author-info">
        <img className="image" src={authorImg} />
        <h2 className="fullname">{pickAuthorFullname(language, author)}</h2>
        <p className="autobiographical">{pickAuthorAutobiographical(language, author)}</p>
      </article>

      {books && books.collection.length &&
        <BooksCollection
          title={t(`pages.author.titles.authoral-books`)} 
          data={books.collection}/>}
    </section>
  )
}
