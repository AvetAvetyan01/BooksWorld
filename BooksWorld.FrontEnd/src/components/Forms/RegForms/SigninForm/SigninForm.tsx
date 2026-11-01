import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSignin } from "../../../../hooks/mutations/userMutations/useSignin";
import type { SigninReqest } from "../../../../types/requests/SigninRequest"
import FormField from "../../Common/FormField/FormField";
import "./signinForm.scss"

export default function SigninForm() {
  const methods = useForm<SigninReqest>({ 
    mode: "onChange",
    values: {
      Name: "Someone",
      Email: "someone@gmail.com",
      Phone: "011223344",
      Password: "11111111"
    }
  })
  const { t } = useTranslation()
  const { handleSubmit } = methods
  const { mutate: signin, isPending } = useSignin()

  const onSubmit = (data: SigninReqest) => signin(data)

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} id="signinForm" className="reg-form">
        <p className="form-title">{t(`reg-form.title`)}</p>

        <ul className="fields">
          <FormField 
            fieldName={t(`form-fields.name`)}      
            registerName={"Name"} 
            isRequired={true} />

          <FormField 
            fieldName={t(`form-fields.email`)}     
            registerName={"Email"}    
            type="email" 
            isRequired={true} />

          <FormField 
            fieldName={t(`form-fields.phone`)}     
            registerName={"Phone"}    
            type="number" 
            isRequired={true} />

          <FormField 
            fieldName={t(`form-fields.password`)}  
            registerName={"Password"} 
            type="password" 
            isRequired={true} />
        </ul>

        {/* use span form inline links design */}
        {/* <ul className="agreements">
          <AgreementField>
            <p>{t(`reg-form.permission-aggree`)}</p>
          </AgreementField>
        </ul> */}

        <button disabled={isPending}>{t(`reg-form.button-text`)}</button>
      </form>
    </FormProvider>
  )
}