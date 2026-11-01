import { useRef, useState, type ChangeEvent } from "react"
import { get, useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
import "./formFileField.scss"

type Props = {
  isRequired?: boolean
  title:     string 
  fileType : string
  fieldName: string 
}

export function FormFileField(props : Props){
  const inputRef = useRef<HTMLInputElement>(null)
  const { t } = useTranslation()
  const { setValue, formState } = useFormContext()

  const fieldError = get(formState.errors, props.fieldName)?.message

  const [fileName, setFileName] = useState('')

  const handleFileButtonClick = () => inputRef.current?.click()
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) 
      {setValue(props.fieldName, file); setFileName(file.name)} 
  }

  return (
    <div className="form-file-field">
      <p className="title">{props.title}{props.isRequired && <span> *</span>}</p>

      <button className="file-button" onClick={handleFileButtonClick}>
        <i className="fa-solid fa-upload"></i>
        <p>{t("form-fields.file.button-text")}</p>
      </button>

      <span className="filename">{fileName || t("form-fields.file.no-file-chosen")}</span>
      {fieldError && <p className="error">{fieldError}</p>}
      
      <input 
        ref={inputRef}
        hidden
        type="file"
        accept={props.fileType}
        onClick={(e) => e.stopPropagation()}
        onChange={handleFileChange}/>
    </div>
  )
}