import "./starsGrade.scss"

type Props = {
  grade: number
  onlyActive?: boolean
}

export function StarsGrade({ grade, onlyActive = false } : Props){
  return (
    <div className="stars-grade">
      {onlyActive 
      ?
      <>
        <i className="active fa-solid fa-star star"></i>
        {2 - grade <= 0 && <i className="active fa-solid fa-star"></i>}
        {3 - grade <= 0 && <i className="active fa-solid fa-star"></i>}
        {4 - grade <= 0 && <i className="active fa-solid fa-star"></i>}
        {5 - grade <= 0 && <i className="active fa-solid fa-star"></i>}
      </>
      :
      <>
        <i className={(1 - grade <= 0 ? "active fa-solid" : "passive fa-regular") + " fa-star star"}></i>
        <i className={(2 - grade <= 0 ? "active fa-solid" : "passive fa-regular") + " fa-star star"}></i>
        <i className={(3 - grade <= 0 ? "active fa-solid" : "passive fa-regular") + " fa-star star"}></i>
        <i className={(4 - grade <= 0 ? "active fa-solid" : "passive fa-regular") + " fa-star star"}></i>
        <i className={(5 - grade <= 0 ? "active fa-solid" : "passive fa-regular") + " fa-star star"}></i>
      </>}
    </div>  
  )
}