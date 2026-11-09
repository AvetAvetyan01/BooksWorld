import { get, useFormContext } from "react-hook-form";
import { DropdownMenu } from "../../../DropdownMenu/DropdownMenu";
import { useState } from "react";
import "./dropdownField.scss"

type Props = {
  fieldName: string
  registerName: string
  dropdownData: {
    id: number
    icon?: string
    image?: string
    value: string
    name: Record<string, string>
  }[]
}

export function DropdownField({ fieldName, registerName, dropdownData } : Props){
  const { register, setValue, getValues, formState } = useFormContext()
  const [activeValue, setActiveValue] = useState(getValues(registerName))

  const error = get(formState.errors, registerName)?.message

  return (
    <div className="dropdown-field">  
      <input {...register(registerName)} value={activeValue} hidden />

      <p className="title">{fieldName}</p>   
      
      <DropdownMenu 
        searchingTypesData={dropdownData} 
        activeValue={activeValue}
        submit={(v) => { setActiveValue(v); setValue(registerName,v) }}/>

      <p className="error">{error}</p>
    </div>
  )
}