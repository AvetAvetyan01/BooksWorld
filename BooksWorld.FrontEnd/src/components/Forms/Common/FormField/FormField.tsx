import { useFormContext } from "react-hook-form"
import { get } from "react-hook-form"
import "./formField.scss"
import { useTranslation } from "react-i18next"

type Props = {
  fieldName: string
  registerName: string
  type?: string
  isRequired?: boolean
}

export default function FormField
  ({ fieldName, registerName, type="text", isRequired=false } : Props){
  const { t } = useTranslation()
  const { register, formState } = useFormContext()

  const fieldError = get(formState.errors, registerName)?.message
  const errorMessage = t("form-fields.errors.required", { fieldName: fieldName })

  return (
    <li className="field">
      {/* we can do experiment - placeing error message near title */}
      <p className="field-title">
        {fieldName} 
        {isRequired && <span> *</span>}
      </p>  

      <input 
        type={type}
        spellCheck={false}
        // check this
        // onChange={(e) => setValue(registerName, e.currentTarget.value)}
        autoComplete="off"

        {...register(
          registerName,
          {
            "text" : {
              required: isRequired && errorMessage,
            },
            "email" : {
              required: isRequired && errorMessage,
              pattern: {
                value: /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: "incorrect email"
              }
            },
            "password" : {
              required: isRequired && errorMessage,
              // minLength: 8,
              // min: 8
            },
            "textarea" : {
            }
          }[type]
          )}
        />

      {fieldError && <p className="error">{fieldError}</p>}
    </li>
  )
}