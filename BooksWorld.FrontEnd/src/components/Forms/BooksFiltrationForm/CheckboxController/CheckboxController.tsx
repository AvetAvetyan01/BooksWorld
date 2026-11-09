import { Controller, useFormContext } from "react-hook-form"
import { useBooksForm } from "../../../../hooks/contexts/useBooksForm"
import { useEffect } from "react"

type Props = {
  name: string
  defaultValue: string
}

export function CheckboxController({ name, defaultValue } : Props) {
  // probably we need to set submit function from outside
  const { register, control } = useFormContext()
  const { submitForm } = useBooksForm()
  const { setValue } = useFormContext()

  useEffect(() => 
    {setValue(name,defaultValue);},
  [defaultValue, name, setValue])

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) =>
        <input
          {...register(name)}
          name={name}
          type="checkbox"
          onChange={(e) => {
            field.onChange(e.target.checked)
            setValue("page", 1)
            submitForm()
          }}
        />
      }
    />
  )
}