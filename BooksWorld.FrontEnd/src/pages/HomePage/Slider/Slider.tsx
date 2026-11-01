import { useEffect, useRef } from "react";
import { useLanguage } from "../../../hooks/contexts/useLanguage";
import { Link } from "react-router";
// import { supabase } from "../../../utilities/supabase"
// import { BucketsNames } from "../../../constansts/BucketsNames"
import sliderData from "./sliderData.json"
import "./slider.scss"

type SliderItem = {
  id: number
  url: string
  imagePath: string
  title: Record<string,string>
  description: Record<string,string>
}
export default function Slider() {
  const { language } = useLanguage()
  const slidesRef = useRef<HTMLUListElement>(null)
  const dotsRef = useRef<HTMLUListElement>(null)
  const activeIndexRef = useRef(0)

  useEffect(() => {
    const slides = slidesRef.current?.querySelectorAll("li")
    const dots = dotsRef.current?.querySelectorAll("li")

    if (slides && dots)
    {
      let activeIndex = activeIndexRef.current
      
      slides[activeIndex].classList.add("active")
      dots[activeIndex].classList.add("active")
      
      setInterval(() => {
      const nextIndex = activeIndex < sliderData.length - 1 ? activeIndex + 1 : 0
      
      slides[activeIndex].classList.remove("active")
      dots[activeIndex].classList.remove("active")
      
      activeIndex = nextIndex
      
      slides[activeIndex].classList.add("active")
      dots[activeIndex].classList.add("active")
      }, 3000)
    }
  })

  return (
    <div className="slider">
      <ul ref={slidesRef} id="slides" className="slides">
        {sliderData.map((d: SliderItem) =>
          <li key={d.id} className="slide">
            <img 
              alt="slider image"
              src={d.imagePath}
              // src={supabase.storage
              //   .from(BucketsNames.public)
              //   .getPublicUrl(d.imagePath).data.publicUrl} 
              />

            <div className="info">
              <p className="title">{d.title[language]}</p>
              <p className="description">{d.description[language]}</p>
              <Link to={d.url}>See More</Link>
            </div>
          </li>)}
      </ul>

      <ul ref={dotsRef} id="dots" className="dots">
        {sliderData.map(data =>
          <li
            key={data.id}
            data-id={data.id}
            className="dot"></li>)}
      </ul>
    </div>
  )
}