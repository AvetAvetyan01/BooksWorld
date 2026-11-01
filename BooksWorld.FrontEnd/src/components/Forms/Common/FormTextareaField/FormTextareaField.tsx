import { useFormContext } from "react-hook-form"
import { get } from "react-hook-form"
import { useTranslation } from "react-i18next"

type Props = {
  fieldName: string
  registerName: string
  type?: string
  defaultValue?: string
  rows: number
  isRequired?: boolean
}

export function FormTextareaField
  ({ fieldName, registerName, defaultValue="", rows, isRequired=false } : Props){
  const { t } = useTranslation()
  const { register, formState } = useFormContext()

  const fieldError = get(formState?.errors, registerName)?.message
  const errorMessage = t("form-fields.errors.required", { fieldName: fieldName })

  return (
    <li className="field">
      <p className="field-title">
        {fieldName}
        {isRequired && <span> *</span>}
      </p>

      <div className="textarea-container">
        <textarea 
          defaultValue={defaultValue}
          spellCheck={false}
          rows={rows} 
          
          {...register(registerName, { required: isRequired && errorMessage })} />
      </div>

      {fieldError && <p className="error">{fieldError}</p>}
    </li>
  )
}