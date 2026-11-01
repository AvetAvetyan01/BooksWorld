import { Link } from "react-router"
import type { IBook } from "../../../interfaces/entities/IBook"
import BookCard from "../../Cards/BookCard/BookCard"
import "../collection.scss"

type Props = {
  title: string
  link?: string
  data?: IBook[]
}

export default function BooksCollection({ title, link, data } : Props){
  return (
    <article className="collection">
      <Link to={link || ''} className={`title ` + (!link && `disabled`)}>{title}</Link>

      <ul className={`books-horizontal-list`}>
        {data?.map(d => <BookCard key={d.id} {...d} />)}
      </ul>
    </article>
  )
}