import { BucketsNames } from "../../../constants/BucketsNames";
import { useLanguage } from "../../../hooks/contexts/useLanguage";
import { supabase } from "../../../utilities/supabase";
import { Link } from "react-router";
import "./authorCard.scss"

// export default function AuthorCard({ id, imagePath, fullName } : IAuthor) {
export default function AuthorCard(props: { id: number, imagePath: string, fullName: string }) {
  const { language } = useLanguage()
  const imageUrl = supabase.storage.from(BucketsNames.public).getPublicUrl(props.imagePath).data.publicUrl

  if (language)
  return (
    <li key={props.id} className="author-card">
      <Link className="link" to={`/author/${props.id}`}>
        <div className="image-wrapper">
          {/* <img className="image" src={imagePath} alt={fullName[language]} /> */}
          {/* <img className="image" src={imageUrl} alt={fullName[language]} /> */}
          <img className="image" src={imageUrl} alt={props.fullName} />
        </div>
        {/* <p className="fullname">{pickAuthorFullname(language, props.fullName)}</p> */}
        <p className="fullname">{props.fullName}</p>
      </Link>
    </li>
  )
}