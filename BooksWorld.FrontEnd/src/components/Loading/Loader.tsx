import "./loader.scss";

export function Loader({ message } : { message: string }){
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <p className="text">{message}</p>
    </div>
  )
}