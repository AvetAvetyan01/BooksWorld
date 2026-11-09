import type { ISubbook } from "../../../../../../interfaces/entities/ISubbook"
import type { SubbookConfigModel } from "../../../../../../types/requests/configModels/SubbookConfigModel"
import { FormProvider, useForm, useWatch, type FieldErrors } from "react-hook-form"
import { useDeleteSubbook } from "../../../../../../hooks/mutations/subbookMutations/useDeleteSubbook"
import { useCreateSubbook } from "../../../../../../hooks/mutations/subbookMutations/useCreateSubbook"
import { useEditSubbook } from "../../../../../../hooks/mutations/subbookMutations/useEditSubbook"
import { FormFileField } from "../../../../../../components/Forms/Common/FormFileField/FormFileField"
import { DropdownField } from "../../../../../../components/Forms/Common/DropdownField/DropdownField"
import languagesData from "./languagesData.json"
import formatsData from "./formatsData.json"
import FormField from "../../../../../../components/Forms/Common/FormField/FormField"
import "./subbookForm.scss"
import { useTranslation } from "react-i18next"

type Props = {
  subbook: ISubbook
  closer: () => void
} 

export function SubbookForm({ subbook, closer } : Props){
  const { t } = useTranslation()
  const { mutate: createSubbook, isPending: isCreateSubbookPending } = useCreateSubbook()
  const { mutate: deleteSubbook, isPending: isDeleteSubbookPending } = useDeleteSubbook()
  const { mutate: editSubbook,   isPending: isEditSubbookPending   } = useEditSubbook()
  
  const methods = useForm<SubbookConfigModel>({ 
    mode: "onChange", 
    values: subbook && {
      Id: subbook?.id,
      BookId: subbook?.bookId,
      Publisher: subbook?.publisher,
      Language: subbook?.language || "English",
      Format: subbook?.format || "Paper",   
      Price: subbook?.price,
      Year: subbook?.year,
      File: undefined,
      IntroductionFile : undefined,
      Details: {
        PagesCount: +subbook?.details?.PagesCount || undefined,
        Quantity: +subbook?.details?.Quantity || undefined,
        Duration: subbook?.details?.Duration || undefined,
        Reader: subbook?.details?.Reader || undefined
      }
      // else - empty model
    }
  })
  
  const { handleSubmit, control } = methods

  const formatWatch = useWatch({
    control,
    name: "Format"
  })

  const onCreate = (data: SubbookConfigModel) => {    
    createSubbook(data)
    closer()  
  }
  const onDelete = () => {
    deleteSubbook({ bookId: subbook.bookId, subbookId: subbook.id })
    closer()
  }
  const onEdit = (data: SubbookConfigModel) => {
    editSubbook(data)
    closer()
  }

  const onError = (error: FieldErrors<SubbookConfigModel>) => console.log("Error", error)

  return (
    <FormProvider {...methods} >
      <form
        className="subbook-form"
        onClick={(e) => { e.stopPropagation(); e.preventDefault(); }}>

        {subbook?.id && <h3 className="title">ID: {subbook.id}</h3>}

        <FormField 
          fieldName={t("pages.subbook-config.publisher")} 
          registerName={"Publisher"}
          isRequired={true}/>

        <FormField 
          fieldName={t("pages.subbook-config.year")} 
          registerName={"Year"}
          isRequired={true}/>

        <div className="dropdowns">
          <DropdownField  
            fieldName={t("pages.subbook-config.format")}
            registerName={"Format"}
            dropdownData={formatsData} />

          <DropdownField 
            fieldName={t("pages.subbook-config.language")}
            registerName={"Language"}
            dropdownData={languagesData} />
        </div>

        {formatWatch != "Paper" &&
          <FormFileField 
            title={t("pages.subbook-config.file")}
            fieldName={"File"}
            fileType={formatWatch == "Audio" ? ".mp3" : ".pdf,application/pdf"}
            isRequired={true}/>}

        <FormFileField 
          title={t("pages.subbook-config.introduction-file")}
          fieldName={"IntroductionFile"}
          fileType={formatWatch == "Audio" ? ".mp3" : ".pdf,application/pdf"}
          isRequired={true}/>

        <FormField 
          fieldName={t("pages.subbook-config.price")}   
          registerName={"Price"}
          isRequired={true}/>

        {formatWatch == "Audio" &&
          <>
            <FormField 
              fieldName={t("pages.subbook-config.duration")}
              registerName={"Details.Duration"}
              isRequired={true} />

            <FormField 
              fieldName={t("pages.subbook-config.reader")}
              registerName={"Details.Reader"}
              isRequired={true} />        
          </>}

        {formatWatch == "Electronic" &&       
          <>
            <FormField 
              fieldName={t("pages.subbook-config.pages-count")}
              registerName={"Details.PagesCount"}
              isRequired={true} /> 
          </>}

        {formatWatch == "Paper" &&       
          <>
            <FormField 
              fieldName={t("pages.subbook-config.pages-count")}
              registerName={"Details.PagesCount"}
              isRequired={true} /> 

            <FormField 
              fieldName={t("pages.subbook-config.quantity")}
              registerName={"Details.Quantity"}
              isRequired={true} />
          </>}

        <div className="buttons">
          {subbook?.id
            ?
            <>
              <button 
                className="edit" 
                disabled={isEditSubbookPending}
                onClick={handleSubmit(onEdit, onError)}>
                {t("pages.subbook-config.edit-button")}
              </button>

              <button 
                className="delete" 
                disabled={isDeleteSubbookPending}
                onClick={handleSubmit(onDelete, onError)}>
                {t("pages.subbook-config.delete-button")}
              </button>
            </>
            : 
            <button 
              className="create" 
              disabled={isCreateSubbookPending}
              onClick={handleSubmit(onCreate, onError)}>
              {t("pages.subbook-config.create-button")}
            </button>}
        </div>
      </form>
    </FormProvider>
  )
}