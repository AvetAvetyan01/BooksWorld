import { Link } from "react-router"
import "./genreCard.scss"
// import { supabase } from "../../../utilities/supabase"
// import { BucketsNames } from "../../../constansts/BucketsNames"

type Props = {
  id: number
  imagePath: string
  name: string
  // name: Record<string, string>
}

export default function GenreCard(genre : Props){
  // const imageUrl = supabase.storage
  //   .from(BucketsNames.public)
  //   .getPublicUrl(genre.imagePath)
  //   .data.publicUrl

  return (
    <li className="genre-card">
      <Link to={`/books?genreId=${genre.id}`}> 
        {/* <img src={imageUrl} /> */}
        <img src={genre.imagePath} />
        <p>{genre.name}</p>
      </Link>
    </li>
  )
}