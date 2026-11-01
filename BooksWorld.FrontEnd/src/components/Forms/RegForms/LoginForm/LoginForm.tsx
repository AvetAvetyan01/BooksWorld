import { FormProvider, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useLogin } from "../../../../hooks/mutations/userMutations/useLogin"
import type { LoginReqest } from "../../../../types/requests/LoginRequest"
import FormField from "../../Common/FormField/FormField"
import "./loginForm.scss"

export default function LoginForm() {
  const methods = useForm<LoginReqest>({ 
    mode: "onChange",
    values: {
      // Email: "someone@gmail.com",
      Email : "admin@gmail.com",
      Password: "11111111"
    } 
  })

  const { t } = useTranslation()
  const { handleSubmit } = methods
  const { mutate: login, isPending } = useLogin()

  const onSubmit = (data: LoginReqest) => login(data)

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="reg-form">
        <p className="form-title">{t(`login-form.title`)}</p>

        <ul className="fields">
          <FormField 
            fieldName={t(`form-fields.email`)} 
            registerName={"Email"}    
            type="email" 
            isRequired={true} />

          <FormField 
            fieldName={t(`form-fields.password`)} 
            registerName={"Password"} 
            type="password" 
            isRequired={true} />  
        </ul>

        
        {/* <ul className="agreements">
          <AgreementField>{t(`form-fields.remember-me`)}</AgreementField>
        </ul> */}

        {/* {responseError && <p className="error-response">{responseError}</p>} */}

        <button disabled={isPending}>{t(`login-form.button-text`)}</button>
      </form>
    </FormProvider>
  )
}