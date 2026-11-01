import { useLanguage } from "../../../../hooks/contexts/useLanguage"
import CheckboxField from "./CheckboxField/CheckboxField"
import "./checkboxesMenu.scss"

type Props = {
  title: string
  data: {
    id: number
    value: string
    image?: string
    icon?: string
    name: Record<string, string>
  }[]
}

export function CheckboxesMenu({ title, data } : Props){
  const { language } = useLanguage()

  return (
    <article className="checkbox-menu">
      <p className="title">{title}</p>  

      <ul className="menu">
        {data.map(d =>
          <CheckboxField 
            key={d.id} 
            value={d.value} 
            image={d.image} 
            icon={d.icon}
            name={d.name[language]}
          /> )}
      </ul>
    </article>
  )
}