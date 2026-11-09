import type { IAuthorCard } from "../../../interfaces/cards/IAuthorCard"
import { Link } from "react-router"
import AuthorCard from "../../Cards/AuthorCard/AuthorCard"
import "../collection.scss"

type Props = {
  title: string
  link?: string
  data?: IAuthorCard[]
}

export default function AuthorsCollection({ title, link, data: authors } : Props){
  return (
    <article className="collection">
      <Link to={link || ''} className={`title ` + (!link && `disabled`)}>{title}</Link>

      <ul className={`authors-horizontal-list`}>
        {authors?.map(a => 
          <AuthorCard key={a.id} {...a} />)}
      </ul>
    </article>
  )
}