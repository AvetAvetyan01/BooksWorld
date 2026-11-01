import { FormProvider, useForm } from "react-hook-form"
import { FormTextareaField } from "../../components/Forms/Common/FormTextareaField/FormTextareaField"
import { useAuth } from "../../hooks/contexts/useAuth"
import { useTranslation } from "react-i18next"
import { useLanguage } from "../../hooks/contexts/useLanguage"
import FormField from "../../components/Forms/Common/FormField/FormField"
import "./feedbackPage.scss"

export default function FeedbackPage() {
  const { user } = useAuth()
  const { t } = useTranslation()
  const { language } = useLanguage()
  
  const methods = useForm({
    mode: "onChange",
    values: {
      Email: user?.email || '',
      Phone: user?.phone || '',
      Message: ''
    }
  })

  return (
    <div className="feedback-page">
      <FormProvider {...methods}>

        <form className="feedback-form">
          <h3 className="title">Feedback</h3>

          {!user
            ?
            <>
              <FormField
                fieldName={t("form-fields.email")} 
                registerName={"Email"} 
                isRequired={true} />

              <FormField
                fieldName={t("form-fields.phone")} 
                registerName={"Phone"} 
                isRequired={true} />
            </>
            :
            <></>
            // <ul className="account-fields">
            //   <li><span>Email</span> <span>{user?.email}</span></li>
            //   <li><span>Phone</span> <span>{user?.phone}</span></li>
            // </ul>
          }
          
          <FormTextareaField
            fieldName={t("form-fields.message")} 
            registerName={"Message"} 
            rows={10}
            isRequired={true} />

          <p className="info">
            {(() => 
              {
                switch (language)
                {
                  case "English":
                    return `We value your feedback and carefully review every submission.
                    Our team may contact you via email or phone using the information you provide if additional details or clarification are needed.
                    If you are registered on our website, updates regarding your feedback may also be sent to your account notifications or inbox.
                    Your information will be handled in accordance with our privacy policy.`

                  case "Armenian":
                    return `Մենք կարևորում ենք ձեր կարծիքը և ուշադիր ուսումնասիրում ենք յուրաքանչյուր ուղարկված հաղորդագրություն։ 
                    Եթե լրացուցիչ մանրամասների կամ պարզաբանումների կարիք լինի, մեր թիմը կարող է կապ հաստատել ձեզ հետ՝ օգտագործելով ձեր տրամադրած էլ․ փոստի հասցեն կամ հեռախոսահամարը։ 
                    Եթե գրանցված եք մեր կայքում, ապա ձեր ուղարկած կարծիքի վերաբերյալ թարմացումները կարող են ուղարկվել նաև ձեր հաշվի ծանուցումների բաժին կամ էլ․ փոստի արկղ։ 
                    Ձեր տվյալները կմշակվեն՝ համաձայն մեր գաղտնիության քաղաքականության։`

                  case "Russian":
                    return `Мы ценим ваши отзывы и внимательно изучаем каждое обращение. 
                    Если потребуются дополнительные сведения или уточнения, наша команда может связаться с вами по электронной почте или телефону, используя предоставленные вами контактные данные. 
                    Если вы зарегистрированы на нашем сайте, информация о ходе рассмотрения вашего обращения может также поступить в виде уведомления в вашем личном кабинете или прийти на электронную почту. 
                    Ваши данные будут обрабатываться в соответствии с нашей политикой конфиденциальности.`
                }
              }
            )()}
          </p>

          {/* <button onClick={handleSubmit}>Send</button>     */}
          <button>Send</button>    
        </form>
     </FormProvider>
    </div>
  )
}