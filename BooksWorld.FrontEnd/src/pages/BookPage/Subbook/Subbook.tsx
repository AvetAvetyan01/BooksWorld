import { useTranslation } from "react-i18next"
import type { ISubbook } from "../../../interfaces/entities/ISubbook";
import type { Currency } from "../../../types/unions/Currency";
import FlagIcons from "../../../components/FlagIcons/FlagIcons"
import "./subbook.scss"

type Props = {
  onClick: () => void
  subbook: ISubbook
  isSelected: boolean
  currency: Currency
}
export default function Subbook({ onClick, subbook, isSelected, currency } : Props){  
  const { t } = useTranslation()
    
  return (
    <li 
      onClick={onClick}
      data-id={subbook.id} 
      className={`subbook ${isSelected ? "selected" : ""}`}>

      <p className="publisher">{subbook.publisher}</p>

      <div className="info-list">
        <ul className="info">
          <FlagIcons flags={subbook.language}/>
          <li className="language">{t(`language.${subbook.language}`)}</li>
        </ul>

        <ul className="info">
          <FlagIcons flags={subbook.format}/>
          <li className="format">{t(`format.${subbook.format}`)}</li>
        </ul>

        <ul className="info">
          <i className="fa-regular fa-calendar-days"></i>
          <li className="year">{subbook.year}</li>
        </ul>
      </div>

      <div className="price">
        {subbook.discountedPrice
          ?
            <>
              <p className="previous">{subbook.price}</p>
              <p className="discounted">{subbook.discountedPrice} {currency}</p>
            </>
          : <p className="current">{subbook.price} {currency}</p>}
      </div>
    </li>
  )
}
