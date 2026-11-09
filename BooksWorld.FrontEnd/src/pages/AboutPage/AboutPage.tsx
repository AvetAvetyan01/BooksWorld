import { useTranslation } from "react-i18next"
import galleryData from "./galleryData.json"
import "./aboutPage.scss"
// import { supabase } from "../../utilities/supabase"
// import { BucketsNames } from "../../constansts/BucketsNames"

export default function AboutPage() {
  const { t } = useTranslation() 
  
  return (
    <section className="about-page">  
      <article className="info">
        <h2 className="title">{t(`pages.about.titles.about-us`)}</h2>

        <div className="content">
          <p className="description">{t(`pages.about.description`)}</p>
          <img src="./images/gallery/10.jpg" />
        </div>
      </article>

      <article className="gallery">
        <h2 className="title">{t(`pages.about.titles.gallery`)}</h2>
        
        <div className="content">
          <ul className="photos-list">
            {galleryData.map(d => 
              <li key={d.id}><img src={d.imagePath}/></li>)} 
              {/* <li key={d.id}>
                <img src={supabase.storage
                  .from(BucketsNames.public)
                  .getPublicUrl(d.imagePath).data.publicUrl}/>
              </li>)}  */}
          </ul>
        </div>
      </article>
    </section>
  )
}
