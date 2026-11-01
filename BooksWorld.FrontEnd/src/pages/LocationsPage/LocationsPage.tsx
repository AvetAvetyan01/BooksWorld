import { useRef, useState } from "react"
import { useLanguage } from "../../hooks/contexts/useLanguage"
import { useTranslation } from "react-i18next"
import locationsData from "./locationsData.json"
import "./locationsPage.scss"

type Location = {
  id: number
  imagePath: string
  city: Record<string, string>
  address: Record<string, string>
}

export function LocationsPage(){
  const { t } = useTranslation() 
  const { language } = useLanguage()
  const locationsListRef = useRef(null)
  const [activeWingIndex, setActiveWingIndex] = useState(0)

  return (
    <section className="locations-page">
      <h2 className="title">{t(`pages.about.titles.our-locations`)}</h2>

      <div className="wings-menu">
        <ul ref={locationsListRef} className="locations-list">
          {locationsData.map((location: Location, index: number) =>  
            <li 
              key={location.id} 
              className={`location` + (activeWingIndex == index ? ` active`: ` `) }
              onClick={() => setActiveWingIndex(index)}
              >
              <p className="city">{location.city[language]}</p>
              <p className="address">{location.address[language]}</p>
            </li>
          )}
        </ul>
        
        <img className="wing-img" src={locationsData[activeWingIndex].imagePath} alt="map" />
        {/* <img 
          alt="map"
          className="wing-img" 
          src={supabase.storage
            .from(BucketsNames.public)
            .getPublicUrl(locationsData[activeWingIndex].imagePath)
            .data.publicUrl} /> */}
      </div>
    </section>
  )
}