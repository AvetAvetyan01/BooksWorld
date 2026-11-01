import { FormProvider, useForm } from "react-hook-form"
import { FormTextareaField } from "../../../../components/Forms/Common/FormTextareaField/FormTextareaField"
import { useEditAuthor } from "../../../../hooks/mutations/authorMutations/useEditAuthor"
import { useCreateAuthor } from "../../../../hooks/mutations/authorMutations/useCreateAuthor"
import type { AuthorConfigModel } from "../../../../types/requests/configModels/AuthorConfigModel"
import { useDeleteAuthor } from "../../../../hooks/mutations/authorMutations/useDeleteAuthor"
import { FormFileField } from "../../../../components/Forms/Common/FormFileField/FormFileField"
import { BucketsNames } from "../../../../constants/BucketsNames"
import { ConfigHeader } from "../Common/ConfigHeader/ConfigHeader"
import { useAuthor } from "../../../../hooks/queries/authorQueries/useAuthor"
import { useParams } from "react-router"
import { supabase } from "../../../../utilities/supabase"
import FormField from "../../../../components/Forms/Common/FormField/FormField"
import "./authorConfigPage.scss"
import { useTranslation } from "react-i18next"

export function AuthorConfigPage(){
  const params = useParams()
  const authorId = params.id ? +params.id : undefined
  const { t } = useTranslation()
  const { data: author } = useAuthor(authorId)
  const { mutate: createAuthor, isPending: createAuthorPending } = useCreateAuthor()
  const { mutate: deleteAuthor, isPending: deleteAuthorPending } = useDeleteAuthor()
  const { mutate: editAuthor  , isPending: editAuthorPending   } = useEditAuthor()

  const authorImage = author?.imagePath && supabase.storage.from(BucketsNames.public).getPublicUrl(author.imagePath)

  const methods = useForm<AuthorConfigModel>({ 
    mode: "onChange",
    values: author && {
      Id: author.id,
      FullName_AM: author.fullName_AM,
      FullName_EN: author.fullName_EN,
      FullName_RU: author.fullName_RU,
      Autobiographical_AM: author.autobiographical_AM,
      Autobiographical_EN: author.autobiographical_EN,
      Autobiographical_RU: author.autobiographical_RU,
    } as AuthorConfigModel
  })
    
  const onDelete = () => authorId && deleteAuthor(authorId)
  const onCreate = (data: AuthorConfigModel) => createAuthor(data)
  const onEdit   = (data: AuthorConfigModel) => editAuthor(data)

  return (
    <div className="author-config-page">
      <FormProvider {...methods}>
        <ConfigHeader 
          id={author?.id}
          mutations={{
            create: { mutation: onCreate, pending: createAuthorPending },
            delete: { mutation: onDelete, pending: deleteAuthorPending },
            edit:   { mutation: onEdit,   pending: editAuthorPending   }
          }}/>

        <div className="top-fields">
          <div className="left-side">
            <FormField 
              fieldName={t("pages.author-config.fullname_am")}
              registerName={"FullName_AM"} 
              isRequired={true}/>
              
            <FormField 
              fieldName={t("pages.author-config.fullname_en")}
              registerName={"FullName_EN"} 
              isRequired={true}/>
              
            <FormField 
              fieldName={t("pages.author-config.fullname_ru")}
              registerName={"FullName_RU"} 
              isRequired={true}/>
            
            <FormFileField 
              title={t("pages.author-config.image")} 
              fieldName={"Image"} 
              fileType="image/*"
              isRequired={true}/>
          </div>

          <div className="right-side">
            {/* <img src={author?.imagePath} /> */}
            {authorImage && <img src={authorImage?.data.publicUrl} />}
          </div>
        </div>
        
        <FormTextareaField 
          fieldName={t("pages.author-config.autobiographical_am")}
          registerName={"Autobiographical_AM"}
          rows={5}
          isRequired={true}/>

        <FormTextareaField 
          fieldName={t("pages.author-config.autobiographical_en")}
          registerName={"Autobiographical_EN"}
          rows={5}
          isRequired={true}/>

        <FormTextareaField 
          fieldName={t("pages.author-config.autobiographical_ru")}
          registerName={"Autobiographical_RU"}
          rows={5}
          isRequired={true}/>
      </FormProvider>
    </div>
  )
}