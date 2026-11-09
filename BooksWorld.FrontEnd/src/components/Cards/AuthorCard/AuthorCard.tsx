import type { IAuthorCard } from "../../../interfaces/cards/IAuthorCard";
import { BucketsNames } from "../../../constants/BucketsNames";
import { supabase } from "../../../utilities/supabase";
import { Link } from "react-router";
import "./authorCard.scss"

export default function AuthorCard(author: IAuthorCard) {
  return (
    <li key={author.id} className="author-card">
      <Link className="link" to={`/author/${author.id}`}>
        <div className="image-wrapper">
          <img className="image" src={author.imagePath ? supabase.storage.from(BucketsNames.public).getPublicUrl(author.imagePath).data.publicUrl : ''} alt={author.fullName} />
        </div>

        <p className="fullname">{author.fullName}</p>
      </Link>
    </li>
  )
} 