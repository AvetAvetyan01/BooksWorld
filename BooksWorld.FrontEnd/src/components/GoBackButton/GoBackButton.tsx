import { useNavigate } from "react-router";
import "./goBackButton.scss"

export function GoBackButton(){
  const navigate = useNavigate()
  const goBack = () => navigate(-1)

  return (
    <button onClick={goBack} className="go-back-button">
      <i className="fa-solid fa-arrow-left"></i>
      {/* <p>Go Back</p> */}
    </button>
  )
}