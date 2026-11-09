// import { Link } from "react-router"
// import GenreCard from "../../Cards/GenreCard/GenreCard"
// import "../collection.scss"
// import { pickGenreName } from "../../../utilities/languagePickers"
// import { useLanguage } from "../../../hooks/contexts/useLanguage"

// type Props = {
//   title: string
//   link?: string
//   data?: {
//     id: number
//     imagePath: string
//     name: Record<string, string>
//   }[]
// }

// export default function GenresCollection({ title, link, data } : Props){
//   const { language } = useLanguage()

//   return (
//     <article className="collection">
//       <Link to={link || ''} className={`title ` + (!link && `disabled`)}>{title}</Link>
//     {/* 
//       <ul className="genres-collection">
//         {genres?.collection?.map(d => <li className="genre">{d.name[language]}</li>)}
//       </ul> */}
//       <ul className={`genres-horizontal-list`}>
//         {data?.map(g => <GenreCard key={g.id} {...g} name={pickGenreName(language, g)} />)}
//       </ul>
//     </article>
//   )
// }