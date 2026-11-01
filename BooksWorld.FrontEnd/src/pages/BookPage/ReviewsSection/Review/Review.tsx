import { StarsGrade } from "../../../../components/StarsGrade/StarsGrade"
import "./review.scss"

type Props = {
  grade: number
  userName: string
  comment?: string
}

export default function Review({ grade, userName, comment } : Props) {
  return (
    <li className="review">
      <div className="info">
        <p className="username">{userName}</p>
        <StarsGrade grade={grade}/>
      </div>

      {comment && <div className="comment">“{comment}”</div>}
    </li>
  )
}
