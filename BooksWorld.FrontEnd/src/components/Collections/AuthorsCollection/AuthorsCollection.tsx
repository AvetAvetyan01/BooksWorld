import type { IAuthor } from "../../../interfaces/entities/IAuthor"
import { pickAuthorFullname } from "../../../utilities/languagePickers"
import { useLanguage } from "../../../hooks/contexts/useLanguage"
import { Link } from "react-router"
import AuthorCard from "../../Cards/AuthorCard/AuthorCard"
import "../collection.scss"

type Props = {
  title: string
  link?: string
  data?: IAuthor[]
}

export default function AuthorsCollection({ title, link, data: authors } : Props){
  const { language } = useLanguage()

  return (
    <article className="collection">
      <Link to={link || ''} className={`title ` + (!link && `disabled`)}>{title}</Link>

      <ul className={`authors-horizontal-list`}>
        {authors?.map(a => 
          <AuthorCard key={a.id} {...a} fullName={pickAuthorFullname(language, a)} />)}
      </ul>
    </article>
  )
}