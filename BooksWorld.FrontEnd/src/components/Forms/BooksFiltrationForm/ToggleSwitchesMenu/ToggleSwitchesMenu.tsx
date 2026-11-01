import { ToggleSwitchField } from "../ToggleSwitchField/ToggleSwitchField"
import { useLanguage } from "../../../../hooks/contexts/useLanguage"

type Props = {
  data: {
    id: number
    icon: string
    value: string
    name: Record<string, string>
  }[]
}

export function ToggleSwitchesMenu({ data } : Props){
  const { language } = useLanguage()

  return (
    <ul className="toggles-menu">
      {data.map(d => 
        <ToggleSwitchField 
          key={d.id} 
          name={d.name[language]} 
          icon={d.icon}  
          value={d.value}
        />)}
    </ul>
  )
}