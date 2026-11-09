import { Link } from "react-router"
import BookCard from "../../Cards/BookCard/BookCard"
import "../collection.scss"
import type { IBookCard } from "../../../interfaces/cards/IBookCard"

type Props = {
  title: string
  link?: string
  data?: IBookCard[]
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