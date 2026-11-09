import { useEffect, useRef, useState, type MouseEvent  } from "react"
import { useLanguage } from "../../hooks/contexts/useLanguage"
import "./dropdownMenu.scss"
// import { supabase } from "../../utilities/supabase"
// import { BucketsNames } from "../../constansts/BucketsNames"

type Props = {
  activeValue: string
  searchingTypesData: {
    id: number 
    icon?: string
    image?: string 
    value: string
    name?: Record<string, string>
  }[] 
  submit: (value: string) => void
  translatable?: boolean
}

export function DropdownMenu({ activeValue, searchingTypesData, submit, translatable = true } : Props){
  const menuRef = useRef<HTMLUListElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { language } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  // const [activeData, setActiveData] = useState(() => searchingTypesData?.find(d => d.value == activeValue))

  const activeData = searchingTypesData?.find(d => d.value === activeValue)

  const changeValue = (e: MouseEvent<HTMLLIElement>) => { 
    const newValue = e.currentTarget.dataset.value;

    if (!newValue) return;

    // setActiveData(searchingTypesData.find(d => d.value == newValue))
    setIsOpen(false)
    submit(newValue)
  }

  useEffect(() => {
    const clickHandler = (e: globalThis.PointerEvent) => {
      // console.log(e.currentTarget)
      // if (dropdownRef.current && !dropdownRef.current.contains(e.currentTarget as Node)) // or check 'currentTarget' also
      //   setIsOpen(false)

      const path = e.composedPath();
      // console.log(path)

      // check, did click to button or inside him (if yes - just do nothing - event inside button will do changing)
      if (buttonRef.current && path.includes(buttonRef.current)) return;
      
      // we also can check - are we click inside options menu 
      // if (buttonRef.current && path.includes(menuRef.current)) return;
      
      // if button or menu not clicked - we close 
      setIsOpen(false);
    }
    
    document.addEventListener("click", clickHandler)
    
    const closestForm = dropdownRef.current?.closest("form") 
    const wrapper = dropdownRef.current?.closest("#wrapper") as HTMLDivElement | null
    
    wrapper?.addEventListener("click", clickHandler)
    closestForm?.addEventListener("click", clickHandler)
    
    return () => {
      document.removeEventListener("click", clickHandler)
      closestForm?.removeEventListener("click", clickHandler)
      wrapper?.removeEventListener("click", clickHandler)
    } 
  }, [])

  return (
    <div ref={dropdownRef} className="dropdown-menu">
      <button ref={buttonRef} onClick={() => setIsOpen((p) => !p)}>
        {/* {activeData?.image && <img src={supabase.storage.from(BucketsNames.public).getPublicUrl(activeData.image).data.publicUrl} />} */}
        {activeData?.image && <img src={activeData.image} /> }
        {activeData?.icon  && <i className={activeData.icon}></i> }
        
        <p>{translatable && activeData?.name ? activeData?.name[language] : activeData?.value}</p>
        <i className="fa-solid fa-chevron-down"></i>
      </button>

      <ul ref={menuRef} className={`options ${isOpen ? "active" : ""}`}>  
        {searchingTypesData?.map(elm =>
          <li
            key={elm.id}
            data-value={elm.value}
            onClick={changeValue}
            className="option"
            >
            {elm?.icon  && <i className={elm.icon}></i>}
            {elm?.image && <img src={elm.image} />}
            {/* {elm?.image && <img src={supabase.storage.from(BucketsNames.public).getPublicUrl(elm.image).data.publicUrl} />} */}
            <p>{translatable && elm?.name ? elm.name[language] : elm.value}</p>
          </li>
        )}
      </ul>
    </div>
  )
}